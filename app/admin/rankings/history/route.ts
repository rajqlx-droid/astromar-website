import { json, requireAdmin } from "@/lib/rankings/guard";
import { NEEDS_TABLES, friendlyDbError, listSerpHistory } from "@/lib/rankings/storage";

// SerpApi history, step 1: one entry per keyword. Read-only; never calls SerpApi.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const gate = await requireAdmin(request);
  if ("response" in gate) return gate.response;
  if (!gate.access.client) return json({ error: "Needs Supabase: add the Supabase variables to .env.local to see past checks." }, 503);
  try {
    return json({ keywords: await listSerpHistory(gate.access.client) });
  } catch (err) {
    const message = friendlyDbError(err);
    return json({ error: message }, message === NEEDS_TABLES ? 503 : 500);
  }
}
