import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Depth, GscResult, RecentCheck, SavedKeyword, SerpResult } from "./types";

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
    data: { first_match_position: r.firstMatchPosition, depth: r.depth, results: r.rows },
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
