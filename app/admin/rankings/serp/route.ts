import { describeError } from "@/lib/rankings/errors";
import { json, readBody, requireAdmin } from "@/lib/rankings/guard";
import { runCompetitorCheck } from "@/lib/rankings/serpapi";
import { friendlyDbError, saveSerp } from "@/lib/rankings/storage";
import { isDepth, isLocation, normaliseKeyword } from "@/lib/rankings/types";

// SerpApi competitor check. The quota guard lives in runCompetitorCheck: it reads the
// remaining searches first and refuses when fewer remain than the depth needs.
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  const gate = await requireAdmin(request);
  if ("response" in gate) return gate.response;

  const body = await readBody(request);
  const kw = normaliseKeyword(body?.keyword);
  if (!kw.ok) return json({ error: kw.error }, 400);
  if (!isLocation(body?.location)) return json({ error: "Choose a location from the list." }, 400);
  if (!isDepth(body?.depth)) return json({ error: "Depth must be Top 10, Top 20 or Top 30." }, 400);

  try {
    const outcome = await runCompetitorCheck({ keyword: kw.value, location: body.location, depth: body.depth });
    if (!outcome.ok) {
      return json({ error: outcome.error, remaining: outcome.remaining, needed: outcome.needed, refused: true }, outcome.status);
    }
    let storageWarning: string | null = null;
    if (gate.access.client) {
      try {
        await saveSerp(gate.access.client, outcome.result);
      } catch (err) {
        storageWarning = friendlyDbError(err);
      }
    }
    return json({ result: outcome.result, remainingAfter: outcome.remainingAfter, storageWarning });
  } catch (err) {
    const { status, message } = describeError(err);
    return json({ error: message }, status);
  }
}
