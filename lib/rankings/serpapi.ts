import "server-only";
import { RankError } from "./errors";
import { SITE_DOMAIN, cleanText, ownKeyOf, type Depth, type LocalResult, type SerpResult, type SerpRow } from "./types";

// SerpApi (Google results). SERPAPI_KEY is read on the server only. It is placed in request
// URLs but never logged, and error messages built here never include the URL.

export interface Account {
  remaining: number;
  limit: number | null;
}

function apiKey(): string {
  const key = process.env.SERPAPI_KEY?.trim();
  if (!key) throw new RankError(503, "SerpApi is not configured: SERPAPI_KEY is missing.");
  return key;
}

/** Remaining searches from the SerpApi account endpoint (does not use a search). Fails closed. */
export async function getAccount(): Promise<Account> {
  const url = "https://serpapi.com/account?" + new URLSearchParams({ api_key: apiKey() }).toString();
  let res: Response;
  try {
    res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(15000) });
  } catch {
    throw new RankError(502, "Could not reach SerpApi to read the remaining searches. No search was made.");
  }
  if (!res.ok) throw new RankError(502, `SerpApi account check failed (HTTP ${res.status}). No search was made.`);
  const json = (await res.json().catch(() => null)) as Record<string, unknown> | null;
  const left = Number(json?.total_searches_left ?? json?.plan_searches_left);
  if (!json || !Number.isFinite(left)) throw new RankError(502, "SerpApi did not report the remaining searches. No search was made.");
  const limit = Number(json.searches_per_month);
  return { remaining: Math.max(0, Math.floor(left)), limit: Number.isFinite(limit) ? limit : null };
}

let accountCache: { at: number; value: Account } | null = null;

/** Short-lived cache for display only (dashboard, tracker header). The guard never uses it. */
export async function getAccountCached(ttlMs = 60_000): Promise<Account> {
  if (accountCache && Date.now() - accountCache.at < ttlMs) return accountCache.value;
  const value = await getAccount();
  accountCache = { at: Date.now(), value };
  return value;
}

export function invalidateAccountCache(): void {
  accountCache = null;
}

function domainOf(link: string): string {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function isOurDomain(domain: string): boolean {
  return domain === SITE_DOMAIN || domain.endsWith("." + SITE_DOMAIN);
}

interface OrganicResult {
  position?: unknown;
  title?: unknown;
  link?: unknown;
  snippet?: unknown;
}

const SNIPPET_MAX = 300;
const LOCAL_MAX = 3;

/**
 * The one place that turns a SerpApi response into rows and local results.
 * Pure: no network. Both the manual check and the weekly job reach it through runCompetitorCheck.
 * All text is untrusted and is kept as plain text.
 */
export function parseSerpPage(json: unknown, page: number): { rows: SerpRow[]; local: LocalResult[] } {
  const j = (json && typeof json === "object" ? json : {}) as { organic_results?: unknown; local_results?: unknown };
  const rows: SerpRow[] = [];
  const organic = Array.isArray(j.organic_results) ? (j.organic_results as OrganicResult[]) : [];
  for (const r of organic) {
    if (!r || typeof r.position !== "number" || typeof r.link !== "string") continue;
    const domain = domainOf(r.link);
    const row: SerpRow = {
      position: r.position,
      page,
      title: typeof r.title === "string" ? r.title : r.link,
      link: r.link,
      domain,
      isOurs: isOurDomain(domain),
    };
    const snippet = cleanText(r.snippet, SNIPPET_MAX);
    if (snippet) row.snippet = snippet;
    const own = ownKeyOf(r.link);
    if (own) row.own = own;
    rows.push(row);
  }

  const local: LocalResult[] = [];
  if (page === 0) {
    const lr = j.local_results;
    const places = Array.isArray(lr) ? lr : lr && typeof lr === "object" && Array.isArray((lr as { places?: unknown }).places) ? (lr as { places: unknown[] }).places : [];
    for (const p of places) {
      if (local.length >= LOCAL_MAX) break;
      if (!p || typeof p !== "object") continue;
      const o = p as { title?: unknown; name?: unknown; rating?: unknown; address?: unknown };
      const name = cleanText(o.title ?? o.name, 120);
      if (!name) continue;
      const item: LocalResult = { name };
      if (typeof o.rating === "number" && Number.isFinite(o.rating) && o.rating >= 0 && o.rating <= 5) item.rating = o.rating;
      const address = cleanText(o.address, 160);
      if (address) item.address = address;
      local.push(item);
    }
  }
  return { rows, local };
}

/** One SerpApi request (one search). Returns the organic rows and local results of that page. */
async function fetchPage(keyword: string, location: string, page: number): Promise<{ rows: SerpRow[]; local: LocalResult[] }> {
  const params = new URLSearchParams({
    engine: "google",
    q: keyword,
    google_domain: "google.co.in",
    gl: "in",
    hl: "en",
    location,
    start: String(page * 10),
    api_key: apiKey(),
  });
  let res: Response;
  try {
    res = await fetch("https://serpapi.com/search.json?" + params.toString(), { cache: "no-store", signal: AbortSignal.timeout(30000) });
  } catch {
    throw new RankError(502, "Could not reach SerpApi.");
  }
  const json = (await res.json().catch(() => null)) as { error?: unknown; organic_results?: OrganicResult[] } | null;
  if (!res.ok || !json) {
    const detail = json && typeof json.error === "string" ? `: ${json.error.slice(0, 120)}` : "";
    throw new RankError(502, `SerpApi returned an error (HTTP ${res.status})${detail}`);
  }
  if (typeof json.error === "string" && !json.organic_results) {
    if (/hasn't returned any results/i.test(json.error)) return { rows: [], local: [] };
    throw new RankError(502, `SerpApi returned an error: ${json.error.slice(0, 120)}`);
  }
  return parseSerpPage(json, page);
}

export type CompetitorOutcome =
  | { ok: true; result: SerpResult; remainingAfter: number }
  | { ok: false; status: number; error: string; remaining: number | null; needed: number; reserve: number };

let running = false;

/**
 * The only function that spends SerpApi searches.
 * 1. Reads the remaining searches fresh from the account endpoint (fails closed if it cannot).
 * 2. Refuses unless remaining - depth >= reserve (reserve is 0 for manual checks, 20 for the weekly job).
 * 3. Makes at most `depth` requests (start = 0, 10, 20), one at a time, and stops at the first error.
 * One check runs at a time, so two clicks cannot race the balance.
 */
export async function runCompetitorCheck(args: { keyword: string; location: string; depth: Depth; reserve?: number }): Promise<CompetitorOutcome> {
  const { keyword, location } = args;
  const depth = args.depth;
  const reserve = args.reserve ?? 0;
  if (depth !== 1 && depth !== 2 && depth !== 3) throw new RankError(400, "Depth must be 1, 2 or 3.");

  if (running) return { ok: false, status: 409, error: "Another competitor check is already running. Wait for it to finish.", remaining: null, needed: depth, reserve };
  running = true;
  try {
    let account: Account;
    try {
      account = await getAccount();
    } catch (err) {
      const message = err instanceof RankError ? err.message : "Could not read the SerpApi balance. No search was made.";
      return { ok: false, status: err instanceof RankError ? err.status : 502, error: message, remaining: null, needed: depth, reserve };
    }
    if (account.remaining - depth < reserve) {
      const error =
        reserve > 0
          ? `Skipped: ${account.remaining} SerpApi searches left, and the weekly job keeps a reserve of ${reserve}. It needs ${depth}. No search was made.`
          : `Not enough SerpApi searches left: this check needs ${depth}, and ${account.remaining} remain. No search was made.`;
      return { ok: false, status: 429, error, remaining: account.remaining, needed: depth, reserve };
    }

    const seen = new Set<string>();
    const rows: SerpRow[] = [];
    let localResults: LocalResult[] = [];
    let used = 0;
    try {
      for (let page = 0; page < depth; page++) {
        const { rows: pageRows, local } = await fetchPage(keyword, location, page);
        used++;
        if (page === 0) localResults = local;
        for (const row of pageRows) {
          if (seen.has(row.link)) continue;
          seen.add(row.link);
          rows.push(row);
        }
      }
    } catch (err) {
      invalidateAccountCache();
      const message = err instanceof RankError ? err.message : "SerpApi request failed.";
      return {
        ok: false,
        status: err instanceof RankError ? err.status : 502,
        error: `${message} ${used} of ${depth} searches were completed before it stopped.`,
        remaining: Math.max(0, account.remaining - used),
        needed: depth,
        reserve,
      };
    }
    invalidateAccountCache();
    rows.sort((a, b) => a.position - b.position);
    const firstMatch = rows.find((r) => r.isOurs)?.position ?? null;
    return {
      ok: true,
      result: { keyword, location, depth, rows, firstMatchPosition: firstMatch, searchesUsed: used, ...(localResults.length ? { localResults } : {}) },
      remainingAfter: Math.max(0, account.remaining - used),
    };
  } finally {
    running = false;
  }
}
