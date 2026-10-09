// Server-only scanner for the private SEO audit (/admin/seo). Read-only: it only
// fetches pages and reads files; it never writes to the site.
import { promises as fs } from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";
import sitemap from "@/app/sitemap";
import { blogPosts } from "@/data/blogPosts";
import { HIDDEN_PAGES } from "@/data/seoHiddenPages";
import { ftwzLocationDetails } from "@/data/ftwzLocations";
import { getFocusKeyword } from "@/data/seoKeywords";
import { seoWordingRules } from "@/data/seoWordingRules";
import type {
  AuditIssue,
  BaseKey,
  ImageFlag,
  ImageRow,
  PageAudit,
  PageGroup,
  PageImage,
  RedirectCheck,
  RobotsInfo,
  ScanEvent,
  ScanResult,
  SitemapInfo,
  WordingMatch,
} from "./types";
import { groupImages } from "./images";

export const CANONICAL_HOST = "https://www.astromarfreezone.com";
export const LIVE_BASE = CANONICAL_HOST;
export const DEFAULT_LOCAL_BASE = "http://localhost:3000";

const CONCURRENCY = 5;
const PAGE_TIMEOUT_MS = 30_000;
const SMALL_TIMEOUT_MS = 10_000;
const MAX_IMAGE_BYTES = 200 * 1024;
const USER_AGENT = "Mozilla/5.0 (compatible; AstromarSEOAudit/1.0; read-only)";

export const REDIRECT_PATHS = [
  "/about",
  "/contact",
  "/blog",
  "/services",
  "/ftz-in-india",
  "/free-zone-chennai",
  "/ecommerce-scm-ftz",
  "/value-added-services-in-free-trade-warehousing-zone-india",
  "/coastal-shipping-free-trade-zone",
  "/custom-clearance",
  "/supply-chain",
  "/projects",
  "/locations/chennai-hq",
];

// Guards against two scans running at once in this server process.
let scanRunning = false;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function fetchWithTimeout(url: string, init: RequestInit = {}, ms = PAGE_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, {
      ...init,
      cache: "no-store",
      signal: controller.signal,
      headers: { "user-agent": USER_AGENT, ...(init.headers ?? {}) },
    });
  } finally {
    clearTimeout(timer);
  }
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) {
    if (err.name === "AbortError") return "Timed out";
    const cause = (err as Error & { cause?: { code?: string } }).cause;
    return cause?.code ? `${err.message} (${cause.code})` : err.message;
  }
  return String(err);
}

async function mapLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
  onDone?: (done: number, item: T) => void,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  let done = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
      done++;
      onDone?.(done, items[i]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function normalizePath(p: string): string {
  const clean = p.split("#")[0].split("?")[0] || "/";
  return clean.length > 1 ? clean.replace(/\/+$/, "") : "/";
}

function pathFromUrl(url: string): string {
  try {
    return normalizePath(new URL(url).pathname);
  } catch {
    return normalizePath(url);
  }
}

function groupFor(p: string): PageGroup {
  if (p === "/free-trade-zone-services" || p.startsWith("/free-trade-zone-services/")) return "Service";
  if (p === "/locations" || p.startsWith("/locations/")) return "Locations";
  if (p === "/blogs" || p.startsWith("/blogs/")) return "Blogs";
  return "Core";
}

function isIgnoredPath(p: string): boolean {
  return p === "/admin" || p.startsWith("/admin/") || p === "/api" || p.startsWith("/api/");
}

const squash = (s: string) => s.replace(/\s+/g, " ").trim();

/** A single blog article (/blogs/<slug>). The blog index (/blogs) is not one. */
export function isBlogPostPath(p: string): boolean {
  return p.startsWith("/blogs/");
}

function sitemapPaths(): string[] {
  return Array.from(new Set(sitemap().map((entry) => pathFromUrl(entry.url))));
}

// ---------------------------------------------------------------------------
// Real routes from the app directory
// ---------------------------------------------------------------------------

const DYNAMIC_EXPANSIONS: Record<string, () => string[]> = {
  "/blogs/[slug]": () => blogPosts.filter((p) => !p.externalUrl).map((p) => `/blogs/${p.slug}`),
  "/locations/[slug]": () => ftwzLocationDetails.map((l) => `/locations/${l.slug}`),
};

async function discoverRoutes(): Promise<{ routes: string[]; unresolved: string[] }> {
  const appDir = path.join(process.cwd(), "app");
  const routes = new Set<string>();
  const unresolved: string[] = [];

  async function walk(dir: string, segments: string[]) {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    if (entries.some((e) => e.isFile() && /^page\.(tsx|ts|jsx|js|mdx)$/.test(e.name))) {
      const route = "/" + segments.join("/");
      const template = route === "/" ? "/" : route;
      if (template.includes("[")) {
        const expand = DYNAMIC_EXPANSIONS[template];
        if (expand) expand().forEach((r) => routes.add(r));
        else unresolved.push(template);
      } else {
        routes.add(template);
      }
    }
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const name = e.name;
      if (name.startsWith("_") || name.startsWith("@") || name === "node_modules") continue;
      if (segments.length === 0 && (name === "api" || name === "admin")) continue;
      const isGroup = name.startsWith("(") && name.endsWith(")");
      await walk(path.join(dir, name), isGroup ? segments : [...segments, name]);
    }
  }

  await walk(appDir, []);
  return { routes: Array.from(routes).sort(), unresolved };
}

// ---------------------------------------------------------------------------
// robots.txt and sitemap.xml
// ---------------------------------------------------------------------------

async function checkRobots(baseUrl: string): Promise<RobotsInfo> {
  const url = `${baseUrl}/robots.txt`;
  const info: RobotsInfo = {
    url,
    status: null,
    content: null,
    sitemapLines: [],
    referencesSitemap: false,
    disallowsAdmin: false,
    disallowsApi: false,
    error: null,
  };
  try {
    const res = await fetchWithTimeout(url, {}, SMALL_TIMEOUT_MS);
    info.status = res.status;
    if (res.ok) {
      const text = await res.text();
      info.content = text;
      info.sitemapLines = text.split(/\r?\n/).filter((l) => /^\s*sitemap\s*:/i.test(l)).map((l) => l.trim());
      info.referencesSitemap = info.sitemapLines.length > 0;
      info.disallowsAdmin = /^\s*disallow\s*:\s*\/admin/im.test(text);
      info.disallowsApi = /^\s*disallow\s*:\s*\/api/im.test(text);
    }
  } catch (err) {
    info.error = errorMessage(err);
  }
  return info;
}

async function checkSitemap(baseUrl: string): Promise<SitemapInfo> {
  const url = `${baseUrl}/sitemap.xml`;
  let source: SitemapInfo["source"] = "sitemap.xml";
  let fetchError: string | null = null;
  let paths: string[] = [];
  try {
    const res = await fetchWithTimeout(url, {}, PAGE_TIMEOUT_MS);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const $ = cheerio.load(await res.text(), { xml: true });
    paths = $("loc")
      .map((_, el) => pathFromUrl($(el).text().trim()))
      .get();
    if (paths.length === 0) throw new Error("No <loc> entries found");
  } catch (err) {
    fetchError = errorMessage(err);
    source = "app/sitemap.ts";
    paths = sitemapPaths();
  }
  const inSitemap = new Set(paths.filter((p) => !isIgnoredPath(p)));
  const { routes, unresolved } = await discoverRoutes();
  const routeSet = new Set(routes.filter((p) => !isIgnoredPath(p)));
  return {
    url,
    source,
    fetchError,
    sitemapCount: inSitemap.size,
    routeCount: routeSet.size,
    missingFromSitemap: Array.from(routeSet).filter((p) => !inSitemap.has(p)).sort(),
    sitemapWithoutRoute: Array.from(inSitemap).filter((p) => !routeSet.has(p)).sort(),
    unresolvedRoutes: unresolved,
  };
}

// ---------------------------------------------------------------------------
// Page extraction
// ---------------------------------------------------------------------------

function resolveImageSrc(src: string, pageUrl: string, baseUrl: string): { resolved: string; external: boolean } | null {
  if (!src || src.startsWith("data:") || src.startsWith("blob:")) return null;
  let u: URL;
  try {
    u = new URL(src, pageUrl);
    if (u.pathname === "/_next/image") {
      const original = u.searchParams.get("url");
      if (original) u = new URL(original, pageUrl);
    }
  } catch {
    return { resolved: src, external: false };
  }
  const localHosts = new Set([new URL(baseUrl).host, new URL(CANONICAL_HOST).host, "astromarfreezone.com"]);
  if (localHosts.has(u.host)) return { resolved: decodeURI(u.pathname), external: false };
  return { resolved: u.toString(), external: true };
}

function collectJsonLdTypes(node: unknown, out: Set<string>) {
  if (Array.isArray(node)) {
    node.forEach((n) => collectJsonLdTypes(n, out));
  } else if (node && typeof node === "object") {
    const obj = node as Record<string, unknown>;
    const t = obj["@type"];
    if (typeof t === "string") out.add(t);
    else if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && out.add(x));
    for (const [key, value] of Object.entries(obj)) {
      if (key !== "@type" && value && typeof value === "object") collectJsonLdTypes(value, out);
    }
  }
}

interface Extracted {
  page: Omit<PageAudit, "issues" | "hasProblem" | "keyword" | "keywordIn" | "wording" | "canonicalState" | "group" | "path" | "url" | "status" | "error">;
  text: string;
}

function extractPage(html: string, pageUrl: string, baseUrl: string, robotsHeader: string | null): Extracted {
  const $ = cheerio.load(html);
  // Search the whole document (metadata can be streamed into <body>), skipping SVG <title>s.
  const title = squash(
    $("title")
      .filter((_, el) => $(el).closest("svg").length === 0)
      .first()
      .text(),
  );
  const descAttr = $('meta[name="description"]').first().attr("content");
  const canonicalHref = $('link[rel="canonical"]').first().attr("href");
  let canonical: string | null = null;
  if (canonicalHref !== undefined) {
    try {
      canonical = new URL(canonicalHref, pageUrl).toString();
    } catch {
      canonical = canonicalHref;
    }
  }
  const robotsMeta = $('meta[name="robots"]').first().attr("content") ?? null;
  const robots = [robotsMeta, robotsHeader ? `X-Robots-Tag: ${robotsHeader}` : null].filter(Boolean).join(" | ") || null;
  const noindex = /noindex/i.test(robotsMeta ?? "") || /noindex/i.test(robotsHeader ?? "");

  const og: Record<string, string> = {};
  $('meta[property^="og:"]').each((_, el) => {
    const k = $(el).attr("property");
    if (k && og[k] === undefined) og[k] = $(el).attr("content") ?? "";
  });
  const twitter: Record<string, string> = {};
  $('meta[name^="twitter:"]').each((_, el) => {
    const k = $(el).attr("name");
    if (k && twitter[k] === undefined) twitter[k] = $(el).attr("content") ?? "";
  });

  const h1 = $("h1").map((_, el) => squash($(el).text())).get();
  const h2 = $("h2").map((_, el) => squash($(el).text())).get();

  const types = new Set<string>();
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      collectJsonLdTypes(JSON.parse($(el).html() ?? ""), types);
    } catch {
      types.add("(invalid JSON-LD)");
    }
  });

  const images: PageImage[] = [];
  $("img").each((_, el) => {
    const $el = $(el);
    const src = $el.attr("src") ?? $el.attr("data-src") ?? "";
    const resolved = resolveImageSrc(src, pageUrl, baseUrl);
    if (!resolved) return;
    const alt = $el.attr("alt");
    images.push({
      src,
      resolvedSrc: resolved.resolved,
      alt: alt === undefined ? null : alt,
      width: $el.attr("width") ?? null,
      height: $el.attr("height") ?? null,
      loading: $el.attr("loading") ?? null,
      fill: $el.attr("data-nimg") === "fill",
    });
  });

  // Visible body text without site chrome, used for word count and wording check.
  const body = $("body").clone();
  body.find("script, style, noscript, template, svg, header, footer, nav").remove();
  const text = squash(body.text());
  const wordCount = text ? text.split(" ").filter((w) => /[\p{L}\p{N}]/u.test(w)).length : 0;

  return {
    page: {
      title,
      description: descAttr === undefined ? null : squash(descAttr),
      canonical,
      robots,
      noindex,
      og,
      twitter,
      h1,
      h2,
      wordCount,
      jsonLdTypes: Array.from(types),
      images,
    },
    text,
  };
}

function expectedCanonical(p: string): string {
  return p === "/" ? `${CANONICAL_HOST}/` : `${CANONICAL_HOST}${p}`;
}

function canonicalStateFor(canonical: string | null, p: string): PageAudit["canonicalState"] {
  if (!canonical) return "missing";
  const want = expectedCanonical(p).replace(/\/$/, "");
  return canonical.replace(/\/$/, "") === want ? "matches" : "mismatch";
}

async function scanPage(p: string, baseUrl: string): Promise<{ page: PageAudit; text: string }> {
  const url = p === "/" ? `${baseUrl}/` : `${baseUrl}${p}`;
  const keyword = getFocusKeyword(p);
  const empty: PageAudit = {
    path: p,
    url,
    group: groupFor(p),
    status: null,
    error: null,
    title: "",
    description: null,
    canonical: null,
    canonicalState: "missing",
    robots: null,
    noindex: false,
    og: {},
    twitter: {},
    h1: [],
    h2: [],
    wordCount: 0,
    jsonLdTypes: [],
    images: [],
    keyword,
    keywordIn: { title: false, description: false, h1: false, url: false },
    issues: [],
    hasProblem: false,
    wording: [],
  };
  try {
    const res = await fetchWithTimeout(url);
    const html = await res.text();
    const { page, text } = extractPage(html, res.url || url, baseUrl, res.headers.get("x-robots-tag"));
    const kw = keyword.toLowerCase();
    const has = (s: string | null | undefined) => !!kw && !!s && s.toLowerCase().includes(kw);
    return {
      page: {
        ...empty,
        ...page,
        status: res.status,
        canonicalState: canonicalStateFor(page.canonical, p),
        keywordIn: {
          title: has(page.title),
          description: has(page.description),
          h1: page.h1.some((h) => has(h)),
          url: !!kw && p.toLowerCase().includes(kw.replace(/\s+/g, "-")),
        },
      },
      text,
    };
  } catch (err) {
    return { page: { ...empty, error: errorMessage(err) }, text: "" };
  }
}

function buildPageIssues(page: PageAudit, titleDupes: Map<string, string[]>, descDupes: Map<string, string[]>): AuditIssue[] {
  const issues: AuditIssue[] = [];
  if (page.error) {
    issues.push({ code: "fetch-error", severity: "fix", text: `Could not fetch the page: ${page.error}.` });
    return issues;
  }
  if (page.status !== 200) issues.push({ code: "http-status", severity: "fix", text: `Page returned HTTP ${page.status}.` });

  const tl = page.title.length;
  if (tl === 0) issues.push({ code: "title-missing", severity: "fix", text: "SEO title is missing." });
  else if (tl > 60) issues.push({ code: "title-long", severity: "check", text: `Title is long (${tl} chars) and may be cut off in Google. Aim for 30 to 60.` });
  else if (tl < 30) issues.push({ code: "title-short", severity: "check", text: `Title is short (${tl} chars). Aim for 30 to 60.` });

  const dl = page.description?.length ?? 0;
  if (!page.description) issues.push({ code: "desc-missing", severity: "fix", text: "Meta description is missing." });
  else if (dl > 160) issues.push({ code: "desc-long", severity: "check", text: `Description is long (${dl} chars). Aim for 70 to 160.` });
  else if (dl < 70) issues.push({ code: "desc-short", severity: "check", text: `Description is short (${dl} chars). Aim for 70 to 160.` });

  if (page.h1.length === 0) issues.push({ code: "h1-missing", severity: "fix", text: "No H1 on this page." });
  else if (page.h1.length > 1) issues.push({ code: "h1-multiple", severity: "fix", text: `${page.h1.length} H1 tags found. Use exactly one.` });

  if (page.canonicalState === "missing") issues.push({ code: "canonical-missing", severity: "fix", text: "No canonical tag found." });
  else if (page.canonicalState === "mismatch")
    issues.push({ code: "canonical-mismatch", severity: "check", text: `Canonical does not match ${expectedCanonical(page.path)} (found ${page.canonical}).` });

  if (page.noindex) issues.push({ code: "noindex", severity: "fix", text: `Page is set to noindex (${page.robots}).` });

  // Blog posts are not held to the focus-keyword-in-title/H1 rule; every other page is.
  if (page.keyword && !isBlogPostPath(page.path) && (!page.keywordIn.title || !page.keywordIn.h1)) {
    const where = !page.keywordIn.title && !page.keywordIn.h1 ? "title and H1" : !page.keywordIn.title ? "title" : "H1";
    issues.push({ code: "keyword-missing", severity: "check", text: `Focus keyword "${page.keyword}" missing from ${where}.` });
  }

  const tKey = page.title.toLowerCase();
  const tClash = tKey ? (titleDupes.get(tKey) ?? []).filter((x) => x !== page.path) : [];
  if (tClash.length) issues.push({ code: "title-duplicate", severity: "check", text: `Same title as another page: ${tClash.join(", ")}.` });
  const dKey = (page.description ?? "").toLowerCase();
  const dClash = dKey ? (descDupes.get(dKey) ?? []).filter((x) => x !== page.path) : [];
  if (dClash.length) issues.push({ code: "desc-duplicate", severity: "check", text: `Same description as another page: ${dClash.join(", ")}.` });

  return issues;
}

// ---------------------------------------------------------------------------
// Images
// ---------------------------------------------------------------------------

function fileNameOf(resolved: string): string {
  try {
    const p = resolved.startsWith("http") ? new URL(resolved).pathname : resolved;
    return decodeURIComponent(p.split("/").filter(Boolean).pop() ?? resolved);
  } catch {
    return resolved;
  }
}

async function imageSize(resolved: string, external: boolean): Promise<{ bytes: number | null; note: string | null }> {
  if (!external) {
    const publicDir = path.join(process.cwd(), "public");
    const file = path.join(publicDir, resolved);
    if (!file.startsWith(publicDir)) return { bytes: null, note: "Outside /public" };
    try {
      const st = await fs.stat(file);
      return { bytes: st.size, note: null };
    } catch {
      return { bytes: null, note: "Not found in /public" };
    }
  }
  try {
    const res = await fetchWithTimeout(resolved, { method: "HEAD" }, SMALL_TIMEOUT_MS);
    const len = res.headers.get("content-length");
    if (!res.ok) return { bytes: null, note: `HEAD returned ${res.status}` };
    return len ? { bytes: Number(len), note: null } : { bytes: null, note: "No content-length" };
  } catch (err) {
    return { bytes: null, note: errorMessage(err) };
  }
}

function imageFlags(img: { alt: string | null; fileName: string; sizeBytes: number | null; sized: boolean }): ImageFlag[] {
  const flags: ImageFlag[] = [];
  const { alt } = img;
  if (alt === null) flags.push({ severity: "fix", text: "Alt missing" });
  else if (alt.trim() === "") flags.push({ severity: "check", text: "Alt empty" });
  else {
    const len = alt.trim().length;
    if (len < 5) flags.push({ severity: "check", text: `Alt too short (${len})` });
    if (len > 125) flags.push({ severity: "check", text: `Alt too long (${len})` });
    const norm = (s: string) => s.toLowerCase().replace(/[-_\s]+/g, " ").trim();
    const stem = img.fileName.replace(/\.[a-z0-9]+$/i, "");
    if (norm(alt) === norm(img.fileName) || norm(alt) === norm(stem)) flags.push({ severity: "fix", text: "Alt equals file name" });
  }
  if (img.sizeBytes !== null && img.sizeBytes > MAX_IMAGE_BYTES) flags.push({ severity: "check", text: "Over 200 KB" });
  if (!img.sized) flags.push({ severity: "check", text: "No width/height" });
  return flags;
}

// ---------------------------------------------------------------------------
// Wording
// ---------------------------------------------------------------------------

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findWording(p: string, text: string): WordingMatch[] {
  const out: WordingMatch[] = [];
  for (const rule of seoWordingRules) {
    const re = new RegExp(`(?<![A-Za-z0-9])${escapeRegExp(rule.phrase)}`, "gi");
    let m: RegExpExecArray | null;
    let count = 0;
    while ((m = re.exec(text)) && count < 5) {
      const start = Math.max(0, m.index - 90);
      const end = Math.min(text.length, m.index + m[0].length + 90);
      out.push({
        phrase: rule.phrase,
        note: rule.note,
        path: p,
        snippet: `${start > 0 ? "..." : ""}${text.slice(start, end)}${end < text.length ? "..." : ""}`,
      });
      count++;
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Status and redirects
// ---------------------------------------------------------------------------

async function checkRedirect(p: string, baseUrl: string, sitemapSet: Set<string>): Promise<RedirectCheck> {
  const hops: RedirectCheck["hops"] = [];
  let url = `${baseUrl}${p}`;
  let firstStatus: number | null = null;
  let firstLocation: string | null = null;
  try {
    for (let i = 0; i < 6; i++) {
      const res = await fetchWithTimeout(url, { redirect: "manual" });
      void res.body?.cancel();
      if (i === 0) firstStatus = res.status;
      const loc = res.headers.get("location");
      if (res.status >= 300 && res.status < 400 && loc) {
        const nextUrl = new URL(loc, url).toString();
        if (i === 0) firstLocation = nextUrl;
        hops.push({ url: nextUrl, status: res.status });
        url = nextUrl;
        continue;
      }
      hops.push({ url, status: res.status });
      break;
    }
  } catch (err) {
    return {
      path: p,
      status: firstStatus,
      location: firstLocation,
      hops,
      finalStatus: null,
      result: "Error",
      severity: "fix",
      note: errorMessage(err),
    };
  }
  const redirectsCount = hops.filter((h) => h.status !== null && h.status >= 300 && h.status < 400).length;
  const finalStatus = hops[hops.length - 1]?.status ?? null;
  const base: Omit<RedirectCheck, "result" | "severity" | "note"> = {
    path: p,
    status: firstStatus,
    location: firstLocation,
    hops,
    finalStatus,
  };
  if (firstStatus === 200) {
    return sitemapSet.has(p)
      ? { ...base, result: "Live, in sitemap", severity: "good", note: null }
      : { ...base, result: "Live, not in sitemap", severity: "check", note: null };
  }
  if (redirectsCount === 0) {
    const code = firstStatus ?? 0;
    return { ...base, result: code === 404 ? "Broken: 404" : `Broken: ${code}`, severity: "fix", note: null };
  }
  if (redirectsCount > 1) {
    return { ...base, result: "Redirect chain", severity: "check", note: `${redirectsCount} hops, ends with HTTP ${finalStatus}` };
  }
  if (finalStatus === 200) return { ...base, result: "Redirects correctly", severity: "good", note: null };
  return { ...base, result: `Broken target: ${finalStatus ?? 0}`, severity: "fix", note: null };
}

// ---------------------------------------------------------------------------
// Main scan
// ---------------------------------------------------------------------------

export async function runScan(
  base: BaseKey,
  baseUrl: string,
  emit: (e: ScanEvent) => void,
  options: { includeBlogPosts: boolean } = { includeBlogPosts: true },
): Promise<{ result: ScanResult; imageRows: ImageRow[] }> {
  if (scanRunning) throw new Error("A scan is already running. Wait for it to finish.");
  scanRunning = true;
  const started = Date.now();
  try {
    emit({ type: "progress", phase: "Reading robots.txt and sitemap", done: 0, total: 2 });
    const [robots, sitemapInfo] = await Promise.all([checkRobots(baseUrl), checkSitemap(baseUrl)]);
    emit({ type: "progress", phase: "Reading robots.txt and sitemap", done: 2, total: 2 });

    const allPaths = sitemapPaths();
    // The blog index (/blogs) is always scanned; only /blogs/<slug> posts are optional.
    // Pages listed in data/seoHiddenPages.ts are left out of the audit entirely.
    const hidden = new Set(HIDDEN_PAGES);
    const paths = allPaths.filter((p) => !hidden.has(p) && (options.includeBlogPosts || !isBlogPostPath(p)));
    emit({ type: "progress", phase: "Scanning pages", done: 0, total: paths.length });
    const scanned = await mapLimit(paths, CONCURRENCY, (p) => scanPage(p, baseUrl), (done, p) =>
      emit({ type: "progress", phase: "Scanning pages", done, total: paths.length, label: p }),
    );

    // Duplicate titles / descriptions
    const titleDupes = new Map<string, string[]>();
    const descDupes = new Map<string, string[]>();
    for (const { page } of scanned) {
      if (page.error) continue;
      const t = page.title.toLowerCase();
      if (t) titleDupes.set(t, [...(titleDupes.get(t) ?? []), page.path]);
      const d = (page.description ?? "").toLowerCase();
      if (d) descDupes.set(d, [...(descDupes.get(d) ?? []), page.path]);
    }
    const pages: PageAudit[] = scanned.map(({ page, text }) => {
      const issues = buildPageIssues(page, titleDupes, descDupes);
      const hasProblem = issues.length > 0;
      return {
        ...page,
        issues: hasProblem ? issues : [{ code: "good", severity: "good", text: "No problems found on this page." }],
        hasProblem,
        wording: findWording(page.path, text),
      };
    });
    const duplicateTitles = Array.from(titleDupes.values())
      .filter((v) => v.length > 1)
      .reduce((n, v) => n + v.length, 0);
    const wording = pages.flatMap((p) => p.wording);

    // Images: one stored row per image per page; sizes looked up once per file
    const uniqueSrcs = Array.from(new Set(pages.flatMap((p) => p.images.map((i) => i.resolvedSrc))));
    const sizes = new Map<string, { bytes: number | null; note: string | null }>();
    emit({ type: "progress", phase: "Checking image sizes", done: 0, total: uniqueSrcs.length });
    await mapLimit(
      uniqueSrcs,
      CONCURRENCY,
      async (src) => {
        sizes.set(src, await imageSize(src, src.startsWith("http")));
      },
      (done) => emit({ type: "progress", phase: "Checking image sizes", done, total: uniqueSrcs.length }),
    );
    const imageRows: ImageRow[] = pages.flatMap((page) =>
      page.images.map((img) => {
        const fileName = fileNameOf(img.resolvedSrc);
        const size = sizes.get(img.resolvedSrc) ?? { bytes: null, note: null };
        const sized = img.fill || (!!img.width && !!img.height);
        return {
          pageUrl: page.path,
          data: {
            src: img.resolvedSrc,
            fileName,
            external: img.resolvedSrc.startsWith("http"),
            alt: img.alt,
            sizeBytes: size.bytes,
            sizeNote: size.note,
            flags: imageFlags({ alt: img.alt, fileName, sizeBytes: size.bytes, sized }),
          },
        };
      }),
    );
    const images = groupImages(imageRows);

    // Status and redirects
    const sitemapSet = new Set(allPaths);
    emit({ type: "progress", phase: "Checking status and redirects", done: 0, total: REDIRECT_PATHS.length });
    const redirects = await mapLimit(REDIRECT_PATHS, CONCURRENCY, (p) => checkRedirect(p, baseUrl, sitemapSet), (done) =>
      emit({ type: "progress", phase: "Checking status and redirects", done, total: REDIRECT_PATHS.length }),
    );

    const finished = Date.now();
    const result: ScanResult = {
      id: null,
      includeBlogPosts: options.includeBlogPosts,
      base,
      baseUrl,
      startedAt: new Date(started).toISOString(),
      finishedAt: new Date(finished).toISOString(),
      durationMs: finished - started,
      robots,
      sitemap: sitemapInfo,
      // Images are stored in their own table; wording lives on each page.
      pages: pages.map((p) => ({ ...p, images: [] })),
      images,
      wording,
      redirects,
      summary: {
        pagesScanned: pages.length,
        pagesWithIssues: pages.filter((p) => p.hasProblem).length,
        imagesMissingAlt: images.filter((i) => i.alt === null).length,
        imagesEmptyAlt: images.filter((i) => i.alt !== null && i.alt.trim() === "").length,
        duplicateTitles,
        wordingMatches: wording.length,
      },
    };
    return { result, imageRows };
  } finally {
    scanRunning = false;
  }
}
