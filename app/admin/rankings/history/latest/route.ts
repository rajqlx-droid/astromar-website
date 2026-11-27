import { json, requireAdmin } from "@/lib/rankings/guard";
import { NEEDS_TABLES, friendlyDbError, listLatestSerp } from "@/lib/rankings/storage";
import { isLocation, normaliseKeyword } from "@/lib/rankings/types";
import { TRACKER_KEYWORDS } from "@/data/trackerKeywords";

// "Before" values for Track all: the latest saved SerpApi check per tracked keyword for one location.
// Read-only; never calls SerpApi.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const gate = await requireAdmin(request);
  if ("response" in gate) return gate.response;
  if (!gate.access.client) return json({ error: "Needs Supabase: add the Supabase variables to .env.local to see past checks." }, 503);

  const location = new URL(request.url).searchParams.get("location");
  if (!isLocation(location)) return json({ error: "Choose a location from the list." }, 400);

  const keywords = TRACKER_KEYWORDS.map((k) => {
    const n = normaliseKeyword(k.value);
    return n.ok ? n.value : k.value;
  });
  try {
    return json({ previous: await listLatestSerp(gate.access.client, location, keywords) });
  } catch (err) {
    const message = friendlyDbError(err);
    return json({ error: message }, message === NEEDS_TABLES ? 503 : 500);
  }
}
