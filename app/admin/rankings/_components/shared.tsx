// Small helpers shared by the GSC and SerpApi tracker pages (client components import these).

export interface ApiReply {
  error?: string;
  [key: string]: unknown;
}

/** JSON call to one of the /admin/rankings data routes. Never throws. */
export async function api(
  url: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  body?: unknown,
): Promise<{ ok: boolean; status: number; data: ApiReply }> {
  try {
    const res = await fetch(url, {
      method,
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    });
    const data = (await res.json().catch(() => ({ error: `Unexpected response (HTTP ${res.status}).` }))) as ApiReply;
    return { ok: res.ok, status: res.status, data };
  } catch {
    return { ok: false, status: 0, data: { error: "Could not reach the server." } };
  }
}

// Fixed locale and time zone so the server render and the browser render identical text.
const whenFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata", hour12: true });
export const when = (v: string) => whenFormat.format(new Date(v));

export const fieldClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#1B3A6B] focus:outline-none focus:ring-2 focus:ring-[#1B3A6B]/20 disabled:opacity-60";

export function Tile({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-1 font-bold text-[#1B3A6B] ${small ? "break-all text-base" : "text-2xl"}`}>{value}</p>
    </div>
  );
}
