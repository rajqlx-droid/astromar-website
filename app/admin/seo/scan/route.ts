import { resolveAccess } from "@/lib/seo-audit/access";
import { isAdminEnabled, isScanEnabled } from "@/lib/seo-audit/auth";
import { DEFAULT_LOCAL_BASE, LIVE_BASE, runScan } from "@/lib/seo-audit/scan";
import { saveScan } from "@/lib/seo-audit/storage";
import type { BaseKey, ScanEvent } from "@/lib/seo-audit/types";
import { isServiceClientConfigured } from "@/lib/supabase/admin";

// First gate is proxy.ts; this route checks everything again on its own.
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

function localBase(request: Request): string {
  // Prefer the port this dev server is actually running on.
  const origin = new URL(request.url);
  return LOCAL_HOSTS.has(origin.hostname) ? origin.origin : DEFAULT_LOCAL_BASE;
}

export async function POST(request: Request) {
  if (!isAdminEnabled()) return new Response("Not found", { status: 404 });
  if (!(await resolveAccess()).allowed) return Response.json({ error: "Not logged in" }, { status: 401 });
  if (!isScanEnabled()) {
    return Response.json({ error: "Scanning is disabled here. Set ENABLE_SEO_ADMIN_SCAN=true in .env.local on your own machine." }, { status: 403 });
  }

  let base: BaseKey = "local";
  try {
    const body = (await request.json()) as { base?: string };
    if (body.base === "live") base = "live";
  } catch {
    // default to local
  }
  const baseUrl = base === "live" ? LIVE_BASE : localBase(request);
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: ScanEvent) => {
        try {
          controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
        } catch {
          // client went away; keep scanning so the result still gets saved
        }
      };
      try {
        const { result, imageRows } = await runScan(base, baseUrl, send, { includeBlogPosts: false });
        send({ type: "progress", phase: "Saving to Supabase", done: 0, total: 1 });
        let saved = false;
        let saveError: string | null = null;
        if (!isServiceClientConfigured()) {
          saveError = "Not saved (Supabase not set up).";
        } else {
          try {
            result.id = await saveScan(result, imageRows);
            saved = true;
          } catch (err) {
            saveError = err instanceof Error ? err.message : String(err);
          }
        }
        send({ type: "result", data: result, saved, saveError });
      } catch (err) {
        send({ type: "error", message: err instanceof Error ? err.message : String(err) });
      } finally {
        try {
          controller.close();
        } catch {
          // already closed
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "application/x-ndjson; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}
