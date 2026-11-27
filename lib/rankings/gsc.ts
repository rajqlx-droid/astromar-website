import "server-only";
import { RankError } from "./errors";
import { getGoogleAccessToken } from "./google-auth";
import { GSC_PROPERTY, type GscDay, type GscPage, type GscResult } from "./types";

// Google Search Console, read-only. Data is 2 to 3 days behind, so the range ends 3 days ago
// and covers 28 days. The query filter is "contains", which also matches an exact query.

const DAY_MS = 86_400_000;
const iso = (d: Date) => d.toISOString().slice(0, 10);

function dateRange(): { startDate: string; endDate: string } {
  const end = new Date(Date.now() - 3 * DAY_MS);
  const start = new Date(end.getTime() - 27 * DAY_MS);
  return { startDate: iso(start), endDate: iso(end) };
}

interface ApiRow {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  position?: number;
}

async function query(dimension: "date" | "page", keyword: string, rowLimit: number): Promise<ApiRow[]> {
  const token = await getGoogleAccessToken();
  const { startDate, endDate } = dateRange();
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_PROPERTY)}/searchAnalytics/query`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: [dimension],
        dimensionFilterGroups: [{ filters: [{ dimension: "query", operator: "contains", expression: keyword }] }],
        rowLimit,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });
  } catch {
    throw new RankError(502, "Could not reach Search Console.");
  }
  if (res.status === 403) {
    throw new RankError(
      403,
      `Search Console refused access (403). Check that the service account is added as a user on ${GSC_PROPERTY} and that the Search Console API is enabled in its Google Cloud project.`,
    );
  }
  if (!res.ok) throw new RankError(502, `Search Console returned an error (HTTP ${res.status}).`);
  const json = (await res.json().catch(() => null)) as { rows?: ApiRow[] } | null;
  return json?.rows ?? [];
}

export async function queryGsc(keyword: string): Promise<GscResult> {
  const { startDate, endDate } = dateRange();
  const [dateRows, pageRows] = await Promise.all([query("date", keyword, 100), query("page", keyword, 10)]);

  const byDate = new Map<string, ApiRow>();
  for (const r of dateRows) if (r.keys?.[0]) byDate.set(r.keys[0], r);

  // One entry per day, including days with no impressions, so the chart has no gaps.
  const daily: GscDay[] = [];
  let clicks = 0;
  let impressions = 0;
  let weighted = 0;
  for (let t = Date.parse(startDate + "T00:00:00Z"); t <= Date.parse(endDate + "T00:00:00Z"); t += DAY_MS) {
    const date = iso(new Date(t));
    const r = byDate.get(date);
    const c = r?.clicks ?? 0;
    const i = r?.impressions ?? 0;
    clicks += c;
    impressions += i;
    if (r && typeof r.position === "number") weighted += r.position * i;
    daily.push({ date, clicks: c, impressions: i, position: r && typeof r.position === "number" ? round(r.position) : null });
  }

  const pages: GscPage[] = pageRows
    .filter((r) => r.keys?.[0])
    .map((r) => ({ page: r.keys![0], clicks: r.clicks ?? 0, impressions: r.impressions ?? 0, position: round(r.position ?? 0) }))
    .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions);

  const hasData = impressions > 0;
  return {
    keyword,
    startDate,
    endDate,
    hasData,
    avgPosition: hasData ? round(weighted / impressions) : null,
    impressions,
    clicks,
    pages,
    daily,
  };
}

function round(n: number): number {
  return Math.round(n * 10) / 10;
}
