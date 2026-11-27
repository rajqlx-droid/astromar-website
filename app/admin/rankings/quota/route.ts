import { describeError } from "@/lib/rankings/errors";
import { json, requireAdmin } from "@/lib/rankings/guard";
import { getAccountCached } from "@/lib/rankings/serpapi";

// Remaining SerpApi searches, for display (cached for 60 seconds). Reading the account does not use a search.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const gate = await requireAdmin(request);
  if ("response" in gate) return gate.response;
  try {
    const account = await getAccountCached();
    return json({ remaining: account.remaining, limit: account.limit });
  } catch (err) {
    const { status, message } = describeError(err);
    return json({ error: message }, status);
  }
}
