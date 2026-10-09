import { NEEDS_SUPABASE, resolveAccess } from "@/lib/seo-audit/access";
import { isAdminEnabled } from "@/lib/seo-audit/auth";
import { applyMark, type MarkAction } from "@/lib/seo-audit/storage";

// Saves "Mark as expected" and "Ignore this flag". Runs as the logged-in admin, so RLS applies.
export const dynamic = "force-dynamic";

function isMarkAction(v: unknown): v is MarkAction {
  if (!v || typeof v !== "object") return false;
  const m = v as Record<string, unknown>;
  const strs = (...keys: string[]) => keys.every((k) => typeof m[k] === "string" && (m[k] as string).length > 0 && (m[k] as string).length < 500);
  switch (m.action) {
    case "expected-add":
      return strs("url") && (m.reason === undefined || typeof m.reason === "string");
    case "expected-remove":
      return strs("url");
    case "ignore-add":
    case "ignore-remove":
      return strs("url", "flag");
    default:
      return false;
  }
}

export async function POST(request: Request) {
  if (!isAdminEnabled()) return new Response("Not found", { status: 404 });
  const access = await resolveAccess();
  if (!access.allowed) return Response.json({ error: "Not logged in" }, { status: 401 });
  if (!access.client) return Response.json({ error: NEEDS_SUPABASE }, { status: 503 });

  const body: unknown = await request.json().catch(() => null);
  if (!isMarkAction(body)) return Response.json({ error: "Bad request" }, { status: 400 });
  try {
    await applyMark(access.client, body);
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
