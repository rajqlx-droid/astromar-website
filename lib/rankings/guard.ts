import "server-only";
import { resolveAccess, type Access } from "@/lib/seo-audit/access";
import { isAdminEnabled } from "@/lib/seo-audit/auth";

// Server-side admin check for every /admin/rankings API route. It re-uses the same
// resolveAccess() as /admin/seo, so it does not depend on proxy.ts alone.

const noStore = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" };

export function json(body: unknown, status = 200): Response {
  return Response.json(body, { status, headers: noStore });
}

export async function requireAdmin(request: Request): Promise<{ access: Access } | { response: Response }> {
  if (!isAdminEnabled()) return { response: new Response("Not found", { status: 404, headers: noStore }) };

  const access = await resolveAccess();
  if (!access.allowed) return { response: json({ error: "Not logged in" }, 401) };

  if (request.method !== "GET") {
    // Cookie-authenticated writes: only same-origin JSON requests are accepted.
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (origin) {
      let originHost = "";
      try {
        originHost = new URL(origin).host;
      } catch {
        originHost = "";
      }
      if (!host || originHost !== host) return { response: json({ error: "Forbidden" }, 403) };
    }
    if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
      return { response: json({ error: "Bad request" }, 400) };
    }
  }

  return { access };
}

export async function readBody(request: Request): Promise<Record<string, unknown> | null> {
  const body: unknown = await request.json().catch(() => null);
  return body && typeof body === "object" && !Array.isArray(body) ? (body as Record<string, unknown>) : null;
}
