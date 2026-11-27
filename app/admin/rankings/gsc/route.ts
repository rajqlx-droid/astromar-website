import { describeError } from "@/lib/rankings/errors";
import { json, readBody, requireAdmin } from "@/lib/rankings/guard";
import { queryGsc } from "@/lib/rankings/gsc";
import { friendlyDbError, saveGsc } from "@/lib/rankings/storage";
import { normaliseKeyword } from "@/lib/rankings/types";

// Search Console check (free). Admin check runs here too, not only in proxy.ts.
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  const gate = await requireAdmin(request);
  if ("response" in gate) return gate.response;

  const body = await readBody(request);
  const kw = normaliseKeyword(body?.keyword);
  if (!kw.ok) return json({ error: kw.error }, 400);

  try {
    const result = await queryGsc(kw.value);
    let storageWarning: string | null = null;
    if (gate.access.client) {
      try {
        await saveGsc(gate.access.client, result);
      } catch (err) {
        storageWarning = friendlyDbError(err);
      }
    }
    return json({ result, storageWarning });
  } catch (err) {
    const { status, message } = describeError(err);
    return json({ error: message }, status);
  }
}
