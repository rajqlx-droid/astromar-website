import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServiceClient } from "@/lib/supabase/admin";
import { groupImages } from "./images";
import type {
  BaseKey,
  ExpectedMark,
  IgnoredFlag,
  ImageOccurrence,
  ImageRow,
  PageAudit,
  PageGroup,
  ScanListItem,
  ScanResult,
} from "./types";

// Server-only storage helpers.
// - Saving a scan uses the service-role client (after the caller verified the admin).
// - Everything else uses the logged-in user's client, so Row Level Security applies.

const BATCH = 200;
const PAGE_SIZE = 1000;
const GROUP_ORDER: Record<PageGroup, number> = { Core: 0, Service: 1, Locations: 2, Blogs: 3 };

/** Everything in seo_scans.summary besides the headline counts. */
type StoredSummary = Pick<ScanResult, "summary" | "robots" | "sitemap" | "redirects" | "durationMs" | "base" | "includeBlogPosts">;

export async function saveScan(result: ScanResult, imageRows: ImageRow[]): Promise<string> {
  const db = createSupabaseServiceClient();
  const stored: StoredSummary = {
    summary: result.summary,
    robots: result.robots,
    sitemap: result.sitemap,
    redirects: result.redirects,
    durationMs: result.durationMs,
    base: result.base,
    includeBlogPosts: result.includeBlogPosts,
  };
  const { data: scan, error } = await db
    .from("seo_scans")
    .insert({ base_url: result.baseUrl, started_at: result.startedAt, finished_at: result.finishedAt, summary: stored })
    .select("id")
    .single();
  if (error || !scan) throw new Error(`Could not save the scan: ${error?.message ?? "no id returned"}`);
  const scanId = scan.id as string;

  try {
    // Wording matches live inside each page's data; images are in their own table.
    const pageRows = result.pages.map((p) => ({ scan_id: scanId, url: p.path, data: { ...p, images: [] } }));
    for (let i = 0; i < pageRows.length; i += BATCH) {
      const { error: e } = await db.from("seo_pages").insert(pageRows.slice(i, i + BATCH));
      if (e) throw new Error(e.message);
    }
    const imgRows = imageRows.map((r) => ({ scan_id: scanId, page_url: r.pageUrl, data: r.data }));
    for (let i = 0; i < imgRows.length; i += BATCH) {
      const { error: e } = await db.from("seo_images").insert(imgRows.slice(i, i + BATCH));
      if (e) throw new Error(e.message);
    }
  } catch (err) {
    // Remove the half-saved scan (child rows cascade).
    await db.from("seo_scans").delete().eq("id", scanId);
    throw new Error(`Could not save the scan: ${err instanceof Error ? err.message : String(err)}`);
  }
  return scanId;
}

export async function listScans(supabase: SupabaseClient): Promise<ScanListItem[]> {
  const { data, error } = await supabase
    .from("seo_scans")
    .select("id, base_url, started_at, finished_at, summary")
    .order("finished_at", { ascending: false })
    .limit(100);
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => ({
    id: r.id as string,
    baseUrl: r.base_url as string,
    startedAt: r.started_at as string,
    finishedAt: r.finished_at as string,
    pagesScanned: ((r.summary as Partial<StoredSummary> | null)?.summary?.pagesScanned as number | undefined) ?? 0,
  }));
}

async function fetchAll<T>(build: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await build(from, from + PAGE_SIZE - 1);
    if (error) throw new Error(error.message);
    out.push(...(data ?? []));
    if (!data || data.length < PAGE_SIZE) break;
  }
  return out;
}

export async function loadScan(supabase: SupabaseClient, id: string): Promise<ScanResult | null> {
  const { data: scan, error } = await supabase
    .from("seo_scans")
    .select("id, base_url, started_at, finished_at, summary")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!scan) return null;

  const pageRows = await fetchAll<{ data: PageAudit }>((from, to) =>
    supabase.from("seo_pages").select("data").eq("scan_id", id).order("id", { ascending: true }).range(from, to),
  );
  const imageRows = await fetchAll<{ page_url: string; data: ImageOccurrence }>((from, to) =>
    supabase.from("seo_images").select("page_url, data").eq("scan_id", id).order("id", { ascending: true }).range(from, to),
  );

  const pages = pageRows
    .map((r) => ({ ...r.data, images: [], wording: r.data.wording ?? [] }))
    .sort((a, b) => GROUP_ORDER[a.group] - GROUP_ORDER[b.group] || a.path.localeCompare(b.path));
  const stored = scan.summary as StoredSummary;

  return {
    id: scan.id as string,
    base: (stored.base ?? "local") as BaseKey,
    baseUrl: scan.base_url as string,
    startedAt: scan.started_at as string,
    finishedAt: scan.finished_at as string,
    // Scans saved before this option existed scanned everything.
    includeBlogPosts: stored.includeBlogPosts ?? true,
    durationMs: stored.durationMs ?? 0,
    robots: stored.robots,
    sitemap: stored.sitemap,
    pages,
    images: groupImages(imageRows.map((r) => ({ pageUrl: r.page_url, data: r.data }))),
    wording: pages.flatMap((p) => p.wording),
    redirects: stored.redirects ?? [],
    summary: stored.summary,
  };
}

export async function loadMarks(supabase: SupabaseClient): Promise<{ expected: ExpectedMark[]; ignored: IgnoredFlag[] }> {
  const [exp, ign] = await Promise.all([
    supabase.from("seo_expected").select("url, reason"),
    supabase.from("seo_flags_ignored").select("url, flag"),
  ]);
  if (exp.error) throw new Error(exp.error.message);
  if (ign.error) throw new Error(ign.error.message);
  return {
    expected: (exp.data ?? []).map((r) => ({ url: r.url as string, reason: (r.reason as string | null) ?? null })),
    ignored: (ign.data ?? []).map((r) => ({ url: r.url as string, flag: r.flag as string })),
  };
}

export type MarkAction =
  | { action: "expected-add"; url: string; reason?: string }
  | { action: "expected-remove"; url: string }
  | { action: "ignore-add"; url: string; flag: string }
  | { action: "ignore-remove"; url: string; flag: string };

export async function applyMark(supabase: SupabaseClient, m: MarkAction): Promise<void> {
  let error: { message: string } | null = null;
  switch (m.action) {
    case "expected-add":
      ({ error } = await supabase.from("seo_expected").upsert({ url: m.url, reason: m.reason ?? null }));
      break;
    case "expected-remove":
      ({ error } = await supabase.from("seo_expected").delete().eq("url", m.url));
      break;
    case "ignore-add":
      ({ error } = await supabase.from("seo_flags_ignored").upsert({ url: m.url, flag: m.flag }, { onConflict: "url,flag" }));
      break;
    case "ignore-remove":
      ({ error } = await supabase.from("seo_flags_ignored").delete().eq("url", m.url).eq("flag", m.flag));
      break;
  }
  if (error) throw new Error(error.message);
}
