import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cleanText, type Depth, type GscResult, type LocalResult, type RecentCheck, type SavedKeyword, type SerpResult, type SerpRow } from "./types";

export const NEEDS_TABLES = "The ranking tables do not exist yet. Run supabase/rankings.sql in the Supabase SQL editor.";

export function friendlyDbError(err: unknown): string {
  const msg = err instanceof Error ? err.message : typeof err === "object" && err && "message" in err ? String((err as { message: unknown }).message) : String(err);
  return /relation .* does not exist|schema cache|Could not find the table/i.test(msg) ? NEEDS_TABLES : `Database error: ${msg.slice(0, 200)}`;
}

const KEYWORD_COLUMNS = "id, keyword, location, depth, track_competitors, active, created_at, last_checked_at";

export async function listSaved(client: SupabaseClient): Promise<SavedKeyword[]> {
  const { data, error } = await client.from("rank_keywords").select(KEYWORD_COLUMNS).order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as SavedKeyword[];
}

export async function addSaved(
  client: SupabaseClient,
  v: { keyword: string; location: string; depth: Depth; trackCompetitors: boolean },
): Promise<SavedKeyword> {
  const { data, error } = await client
    .from("rank_keywords")
    .upsert(
      { keyword: v.keyword, location: v.location, depth: v.depth, track_competitors: v.trackCompetitors, active: true },
      { onConflict: "keyword,location" },
    )
    .select(KEYWORD_COLUMNS)
    .single();
  if (error) throw error;
  return data as SavedKeyword;
}

export async function updateSaved(client: SupabaseClient, id: string, patch: { track_competitors?: boolean; active?: boolean }): Promise<void> {
  const { error } = await client.from("rank_keywords").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteSaved(client: SupabaseClient, id: string): Promise<void> {
  const { error } = await client.from("rank_keywords").delete().eq("id", id);
  if (error) throw error;
}

async function findKeywordId(client: SupabaseClient, keyword: string, location: string | null): Promise<string | null> {
  let q = client.from("rank_keywords").select("id").eq("keyword", keyword);
  if (location) q = q.eq("location", location);
  const { data } = await q.limit(1);
  return (data?.[0]?.id as string | undefined) ?? null;
}

/** Stores one check with its date. Linked to the saved keyword when there is one. */
export async function saveGsc(client: SupabaseClient, r: GscResult, keywordId?: string | null): Promise<void> {
  const id = keywordId === undefined ? await findKeywordId(client, r.keyword, null) : keywordId;
  const { error } = await client.from("rank_results").insert({
    keyword_id: id,
    keyword: r.keyword,
    source: "gsc",
    location: null,
    data: {
      avg_position: r.avgPosition,
      impressions: r.impressions,
      clicks: r.clicks,
      page: r.pages[0]?.page ?? null,
      pages: r.pages,
      start_date: r.startDate,
      end_date: r.endDate,
      daily: r.daily,
    },
    searches_used: 0,
  });
  if (error) throw error;
}

export async function saveSerp(client: SupabaseClient, r: SerpResult, keywordId?: string | null): Promise<void> {
  const id = keywordId === undefined ? await findKeywordId(client, r.keyword, r.location) : keywordId;
  const { error } = await client.from("rank_results").insert({
    keyword_id: id,
    keyword: r.keyword,
    source: "serpapi",
    location: r.location,
    data: { first_match_position: r.firstMatchPosition, depth: r.depth, results: r.rows, local_results: r.localResults ?? [] },
    searches_used: r.searchesUsed,
  });
  if (error) throw error;
}

export async function touchChecked(client: SupabaseClient, id: string): Promise<void> {
  await client.from("rank_keywords").update({ last_checked_at: new Date().toISOString() }).eq("id", id);
}

const RECENT_COLUMNS = "id, keyword, source, location, checked_at, searches_used, avg_position:data->avg_position, first_match:data->first_match_position";

export async function recentChecks(client: SupabaseClient, limit = 15): Promise<RecentCheck[]> {
  const { data, error } = await client.from("rank_results").select(RECENT_COLUMNS).order("checked_at", { ascending: false }).limit(limit);
  if (error) throw error;
  return (data ?? []) as unknown as RecentCheck[];
}

export interface PageOneStats {
  /** Saved keywords whose latest stored check puts the site on Google page 1. */
  onPageOne: number;
  /** Saved keywords that have at least one stored check. */
  withResults: number;
}

/** Page 1 = SerpApi first match at position 10 or better, or a Search Console average of 10 or better. */
export async function pageOneStats(client: SupabaseClient): Promise<PageOneStats> {
  const { data, error } = await client
    .from("rank_results")
    .select("keyword, source, avg_position:data->avg_position, first_match:data->first_match_position")
    .not("keyword_id", "is", null)
    .order("checked_at", { ascending: false })
    .limit(1000);
  if (error) throw error;
  const latest = new Map<string, { avg_position: number | null; first_match: number | null }>();
  const keywords = new Set<string>();
  for (const row of (data ?? []) as unknown as { keyword: string; source: string; avg_position: number | null; first_match: number | null }[]) {
    keywords.add(row.keyword);
    const k = `${row.keyword}|${row.source}`;
    if (!latest.has(k)) latest.set(k, { avg_position: row.avg_position, first_match: row.first_match });
  }
  const onPage = new Set<string>();
  for (const [k, v] of latest) {
    const keyword = k.slice(0, k.lastIndexOf("|"));
    const source = k.slice(k.lastIndexOf("|") + 1);
    const pos = source === "serpapi" ? v.first_match : v.avg_position;
    if (typeof pos === "number" && pos <= 10) onPage.add(keyword);
  }
  return { onPageOne: onPage.size, withResults: keywords.size };
}

// ---- SerpApi history (read-only; never calls SerpApi) ----

export interface HistoryKeyword {
  keyword: string;
  checks: number;
  latestPosition: number | null;
  latestAt: string;
}

export interface HistoryCheck {
  id: number;
  checkedAt: string;
  location: string | null;
  searchesUsed: number;
  position: number | null;
}

type HistoryRow = { id: number; keyword: string; checked_at: string; location: string | null; searches_used: number; first_match: unknown };

const posOf = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null);

/** Pure: groups rows (newest first) into one entry per keyword, ordered by latest check. */
export function groupSerpHistory(rows: HistoryRow[]): HistoryKeyword[] {
  const map = new Map<string, HistoryKeyword>();
  for (const r of rows) {
    const g = map.get(r.keyword);
    if (g) g.checks++;
    else map.set(r.keyword, { keyword: r.keyword, checks: 1, latestPosition: posOf(r.first_match), latestAt: r.checked_at });
  }
  return Array.from(map.values());
}

export async function listSerpHistory(client: SupabaseClient): Promise<HistoryKeyword[]> {
  const { data, error } = await client
    .from("rank_results")
    .select("id, keyword, checked_at, location, searches_used, first_match:data->first_match_position")
    .eq("source", "serpapi")
    .order("checked_at", { ascending: false })
    .limit(1000);
  if (error) throw error;
  return groupSerpHistory((data ?? []) as unknown as HistoryRow[]);
}

export async function listSerpChecks(client: SupabaseClient, keyword: string): Promise<HistoryCheck[]> {
  const { data, error } = await client
    .from("rank_results")
    .select("id, keyword, checked_at, location, searches_used, first_match:data->first_match_position")
    .eq("source", "serpapi")
    .eq("keyword", keyword)
    .order("checked_at", { ascending: false })
    .limit(200);
  if (error) throw error;
  return ((data ?? []) as unknown as HistoryRow[]).map((r) => ({
    id: r.id,
    checkedAt: r.checked_at,
    location: r.location,
    searchesUsed: typeof r.searches_used === "number" ? r.searches_used : 0,
    position: posOf(r.first_match),
  }));
}

/** Pure: rebuilds a SerpResult from the saved jsonb. Defensive: older checks have no snippet, own or local_results. */
export function rebuildSerpResult(row: { keyword: string; location: string | null; searches_used: number; data: unknown }): SerpResult {
  const d = (row.data && typeof row.data === "object" ? row.data : {}) as { results?: unknown; local_results?: unknown; depth?: unknown; first_match_position?: unknown };
  const rows: SerpRow[] = [];
  for (const r of Array.isArray(d.results) ? d.results : []) {
    if (!r || typeof r !== "object") continue;
    const o = r as Record<string, unknown>;
    if (typeof o.position !== "number" || typeof o.link !== "string") continue;
    const out: SerpRow = {
      position: o.position,
      page: typeof o.page === "number" ? o.page : 0,
      title: cleanText(o.title, 300) ?? o.link,
      link: o.link,
      domain: typeof o.domain === "string" ? o.domain.slice(0, 200) : "",
      isOurs: o.isOurs === true,
    };
    const snippet = cleanText(o.snippet, 300);
    if (snippet) out.snippet = snippet;
    if (o.own === "website" || o.own === "facebook") out.own = o.own;
    rows.push(out);
  }
  const localResults: LocalResult[] = [];
  for (const l of Array.isArray(d.local_results) ? d.local_results : []) {
    if (localResults.length >= 3) break;
    if (!l || typeof l !== "object") continue;
    const o = l as Record<string, unknown>;
    const name = cleanText(o.name, 120);
    if (!name) continue;
    const item: LocalResult = { name };
    if (typeof o.rating === "number" && o.rating >= 0 && o.rating <= 5) item.rating = o.rating;
    const address = cleanText(o.address, 160);
    if (address) item.address = address;
    localResults.push(item);
  }
  const depth: Depth = d.depth === 2 || d.depth === 3 ? d.depth : 1;
  return {
    keyword: row.keyword,
    location: row.location ?? "",
    depth,
    rows,
    firstMatchPosition: posOf(d.first_match_position),
    searchesUsed: typeof row.searches_used === "number" ? row.searches_used : 0,
    ...(localResults.length ? { localResults } : {}),
  };
}

export async function getSerpCheck(client: SupabaseClient, id: number): Promise<{ id: number; checkedAt: string; result: SerpResult } | null> {
  const { data, error } = await client
    .from("rank_results")
    .select("id, keyword, source, checked_at, location, searches_used, data")
    .eq("id", id)
    .eq("source", "serpapi")
    .limit(1);
  if (error) throw error;
  const row = (data ?? [])[0] as { id: number; keyword: string; checked_at: string; location: string | null; searches_used: number; data: unknown } | undefined;
  if (!row) return null;
  return { id: row.id, checkedAt: row.checked_at, result: rebuildSerpResult(row) };
}

export interface LatestSerp {
  position: number | null;
  checkedAt: string;
  depth: Depth;
}

/** Latest saved SerpApi check per keyword for one location. A keyword with no entry was never checked. */
export async function listLatestSerp(client: SupabaseClient, location: string, keywords: string[]): Promise<Record<string, LatestSerp>> {
  const { data, error } = await client
    .from("rank_results")
    .select("keyword, checked_at, first_match:data->first_match_position, depth:data->depth")
    .eq("source", "serpapi")
    .eq("location", location)
    .in("keyword", keywords)
    .order("checked_at", { ascending: false })
    .limit(1000);
  if (error) throw error;
  const out: Record<string, LatestSerp> = {};
  for (const r of (data ?? []) as unknown as { keyword: string; checked_at: string; first_match: unknown; depth: unknown }[]) {
    if (out[r.keyword]) continue;
    out[r.keyword] = { position: posOf(r.first_match), checkedAt: r.checked_at, depth: r.depth === 2 || r.depth === 3 ? r.depth : 1 };
  }
  return out;
}
