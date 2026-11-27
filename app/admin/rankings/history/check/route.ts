import { json, requireAdmin } from "@/lib/rankings/guard";
import { NEEDS_TABLES, friendlyDbError, getSerpCheck } from "@/lib/rankings/storage";

// SerpApi history, step 3: one saved check with its full results. Read-only; never calls SerpApi.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const gate = await requireAdmin(request);
  if ("response" in gate) return gate.response;
  if (!gate.access.client) return json({ error: "Needs Supabase: add the Supabase variables to .env.local to see past checks." }, 503);

  const raw = new URL(request.url).searchParams.get("id") ?? "";
  if (!/^[1-9]\d{0,9}$/.test(raw)) return json({ error: "Bad request" }, 400);
  try {
    const check = await getSerpCheck(gate.access.client, Number(raw));
    if (!check) return json({ error: "That check was not found." }, 404);
    return json({ check });
  } catch (err) {
    const message = friendlyDbError(err);
    return json({ error: message }, message === NEEDS_TABLES ? 503 : 500);
  }
}
