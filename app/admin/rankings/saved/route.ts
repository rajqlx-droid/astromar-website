import { json, readBody, requireAdmin } from "@/lib/rankings/guard";
import { NEEDS_TABLES, addSaved, deleteSaved, friendlyDbError, listSaved, recentChecks, updateSaved } from "@/lib/rankings/storage";
import { isDepth, isLocation, normaliseKeyword } from "@/lib/rankings/types";

// Saved keywords (weekly tracking) and recent checks. Runs as the logged-in admin, so RLS applies.
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const NO_DB = "Needs Supabase: add the Supabase variables to .env.local to save keywords.";

export async function GET(request: Request) {
  const gate = await requireAdmin(request);
  if ("response" in gate) return gate.response;
  if (!gate.access.client) return json({ error: NO_DB }, 503);
  try {
    const [saved, recent] = await Promise.all([listSaved(gate.access.client), recentChecks(gate.access.client)]);
    return json({ saved, recent });
  } catch (err) {
    const message = friendlyDbError(err);
    return json({ error: message }, message === NEEDS_TABLES ? 503 : 500);
  }
}

export async function POST(request: Request) {
  const gate = await requireAdmin(request);
  if ("response" in gate) return gate.response;
  if (!gate.access.client) return json({ error: NO_DB }, 503);

  const body = await readBody(request);
  const kw = normaliseKeyword(body?.keyword);
  if (!kw.ok) return json({ error: kw.error }, 400);
  if (!isLocation(body?.location)) return json({ error: "Choose a location from the list." }, 400);
  if (!isDepth(body?.depth)) return json({ error: "Depth must be Top 10, Top 20 or Top 30." }, 400);
  try {
    const saved = await addSaved(gate.access.client, {
      keyword: kw.value,
      location: body.location,
      depth: body.depth,
      trackCompetitors: body?.trackCompetitors === true,
    });
    return json({ saved });
  } catch (err) {
    return json({ error: friendlyDbError(err) }, 500);
  }
}

export async function PATCH(request: Request) {
  const gate = await requireAdmin(request);
  if ("response" in gate) return gate.response;
  if (!gate.access.client) return json({ error: NO_DB }, 503);

  const body = await readBody(request);
  if (typeof body?.id !== "string" || !UUID.test(body.id)) return json({ error: "Bad request" }, 400);
  const patch: { track_competitors?: boolean; active?: boolean } = {};
  if (typeof body.trackCompetitors === "boolean") patch.track_competitors = body.trackCompetitors;
  if (typeof body.active === "boolean") patch.active = body.active;
  if (Object.keys(patch).length === 0) return json({ error: "Bad request" }, 400);
  try {
    await updateSaved(gate.access.client, body.id, patch);
    return json({ ok: true });
  } catch (err) {
    return json({ error: friendlyDbError(err) }, 500);
  }
}

export async function DELETE(request: Request) {
  const gate = await requireAdmin(request);
  if ("response" in gate) return gate.response;
  if (!gate.access.client) return json({ error: NO_DB }, 503);

  const body = await readBody(request);
  if (typeof body?.id !== "string" || !UUID.test(body.id)) return json({ error: "Bad request" }, 400);
  try {
    await deleteSaved(gate.access.client, body.id);
    return json({ ok: true });
  } catch (err) {
    return json({ error: friendlyDbError(err) }, 500);
  }
}
