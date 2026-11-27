import { createHash, timingSafeEqual } from "node:crypto";
import { isAdminEnabled } from "@/lib/seo-audit/auth";
import { describeError } from "@/lib/rankings/errors";
import { queryGsc } from "@/lib/rankings/gsc";
import { runCompetitorCheck } from "@/lib/rankings/serpapi";
import { friendlyDbError, saveGsc, saveSerp, touchChecked } from "@/lib/rankings/storage";
import { SERP_RESERVE, type Depth } from "@/lib/rankings/types";
import { createSupabaseServiceClient, isServiceClientConfigured } from "@/lib/supabase/admin";

// Weekly job (see vercel.json). Vercel calls it with "Authorization: Bearer <CRON_SECRET>".
// Not behind proxy.ts (it has no session), so it authenticates itself and fails closed.
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_KEYWORDS_PER_RUN = 20;
const TIME_BUDGET_MS = 50_000;

const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" };
const reply = (body: unknown, status = 200) => Response.json(body, { status, headers });

function secretMatches(header: string | null, secret: string): boolean {
  if (!header?.startsWith("Bearer ")) return false;
  // Hash both sides so timingSafeEqual always compares equal-length buffers.
  const a = createHash("sha256").update(header.slice(7)).digest();
  const b = createHash("sha256").update(secret).digest();
  return timingSafeEqual(a, b);
}

interface KeywordRow {
  id: string;
  keyword: string;
  location: string;
  depth: Depth;
  track_competitors: boolean;
}

export async function GET(request: Request) {
  if (!isAdminEnabled()) return new Response("Not found", { status: 404, headers });

  // Fail closed: no secret configured (or a weak one) means nobody can run this.
  const secret = process.env.CRON_SECRET;
  if (!secret || secret.length < 16 || !secretMatches(request.headers.get("authorization"), secret)) {
    return reply({ error: "Unauthorized" }, 401);
  }
  if (!isServiceClientConfigured()) return reply({ error: "Supabase service key is not configured." }, 503);

  const started = Date.now();
  const client = createSupabaseServiceClient();
  const { data, error } = await client
    .from("rank_keywords")
    .select("id, keyword, location, depth, track_competitors")
    .eq("active", true)
    .order("last_checked_at", { ascending: true, nullsFirst: true });
  if (error) return reply({ error: friendlyDbError(error) }, 500);

  const all = (data ?? []) as KeywordRow[];
  const batch = all.slice(0, MAX_KEYWORDS_PER_RUN);
  const summary = {
    saved: all.length,
    processed: 0,
    skippedKeywords: 0,
    gscChecked: 0,
    competitorChecked: 0,
    competitorSkipped: 0,
    searchesUsed: 0,
    reserve: SERP_RESERVE,
    errors: [] as { keyword: string; error: string }[],
  };

  let serpStopped = false; // set once the reserve is reached, so later keywords skip without extra calls
  for (const row of batch) {
    if (Date.now() - started > TIME_BUDGET_MS) break;
    summary.processed++;

    try {
      await saveGsc(client, await queryGsc(row.keyword), row.id);
      summary.gscChecked++;
    } catch (err) {
      summary.errors.push({ keyword: row.keyword, error: describeError(err).message });
    }

    if (row.track_competitors) {
      if (serpStopped) {
        summary.competitorSkipped++;
      } else {
        try {
          const outcome = await runCompetitorCheck({ keyword: row.keyword, location: row.location, depth: row.depth, reserve: SERP_RESERVE });
          if (outcome.ok) {
            await saveSerp(client, outcome.result, row.id);
            summary.competitorChecked++;
            summary.searchesUsed += outcome.result.searchesUsed;
          } else {
            summary.competitorSkipped++;
            if (outcome.status === 429 || outcome.remaining === null) serpStopped = true;
            summary.errors.push({ keyword: row.keyword, error: outcome.error });
          }
        } catch (err) {
          summary.competitorSkipped++;
          summary.errors.push({ keyword: row.keyword, error: describeError(err).message });
        }
      }
    }
    await touchChecked(client, row.id);
  }

  summary.skippedKeywords = all.length - summary.processed;
  return reply(summary);
}
