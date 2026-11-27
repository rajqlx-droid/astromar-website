import { json, requireAdmin } from "@/lib/rankings/guard";
import { NEEDS_TABLES, friendlyDbError, listSerpChecks } from "@/lib/rankings/storage";
import { normaliseKeyword } from "@/lib/rankings/types";

// SerpApi history, step 2: the checks for one keyword, newest first. Read-only; never calls SerpApi.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const gate = await requireAdmin(request);
  if ("response" in gate) return gate.response;
  if (!gate.access.client) return json({ error: "Needs Supabase: add the Supabase variables to .env.local to see past checks." }, 503);

  const kw = normaliseKeyword(new URL(request.url).searchParams.get("keyword"));
  if (!kw.ok) return json({ error: kw.error }, 400);
  try {
    return json({ keyword: kw.value, checks: await listSerpChecks(gate.access.client, kw.value) });
  } catch (err) {
    const message = friendlyDbError(err);
    return json({ error: message }, message === NEEDS_TABLES ? 503 : 500);
  }
}
