import { OWN_RESULTS, ownKeyOf, type LocalResult, type SerpResult, type SerpRow } from "@/lib/rankings/types";

// Google-style view of one SerpApi result (light theme). Every piece of text here came from SerpApi,
// so it is rendered as plain React text only. No favicons or other third-party images are requested.

function safeHref(link: string): string | null {
  try {
    const u = new URL(link);
    return u.protocol === "http:" || u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

function crumbs(link: string): string {
  try {
    const u = new URL(link);
    const parts = u.pathname.split("/").filter(Boolean).map((p) => decodeURIComponent(p).replace(/[-_]+/g, " "));
    const text = [u.hostname.replace(/^www\./, ""), ...parts].join(" › ");
    return text.length > 90 ? text.slice(0, 89) + "…" : text;
  } catch {
    return link;
  }
}

function ownOf(row: SerpRow) {
  // Older checks have no `own`: fall back to the stored isOurs flag, then to the link itself.
  const key = row.own ?? (row.isOurs ? "website" : ownKeyOf(row.link));
  return key;
}

function Chip({ children, tone }: { children: React.ReactNode; tone: "own" | "none" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
        tone === "own" ? "border-[#F97316]/40 bg-[#F97316]/10 text-[#9a3f06]" : "border-[#dde5f0] bg-slate-50 text-slate-700"
      }`}
    >
      {children}
    </span>
  );
}

function LocalBlock({ items }: { items: LocalResult[] }) {
  return (
    <div className="mb-4 rounded-lg border border-[#dde5f0] bg-slate-50 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#1B3A6B]">Map results (local businesses)</p>
      <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {items.map((l, i) => (
          <li key={`${l.name}-${i}`} className="rounded-md border border-[#dde5f0] bg-white px-3 py-2">
            <p className="break-words text-sm font-semibold text-slate-900">{l.name}</p>
            {typeof l.rating === "number" ? <p className="text-xs text-slate-600">★ {l.rating.toFixed(1)}</p> : null}
            {l.address ? <p className="break-words text-xs text-slate-500">{l.address}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function GoogleView({ serp, older = false, notFoundText }: { serp: SerpResult; older?: boolean; notFoundText?: string }) {
  // `older`: a saved check. If none of its rows has a snippet, say so once instead of on every row.
  const noSnippets = older && serp.rows.every((r) => !r.snippet);
  const top = serp.depth * 10;
  const ownBest = new Map<string, number>();
  for (const row of serp.rows) {
    const k = ownOf(row);
    if (k && !ownBest.has(k)) ownBest.set(k, row.position);
  }
  const website = OWN_RESULTS[0];
  const others = OWN_RESULTS.filter((o) => o.key !== "website");

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {ownBest.has("website") ? (
          <Chip tone="own">
            {website.label}: position {ownBest.get("website")}
          </Chip>
        ) : (
          <Chip tone="none">
            {website.label}: {notFoundText ?? `not in the top ${top}`}
          </Chip>
        )}
        {others.map((o) => (ownBest.has(o.key) ? <Chip key={o.key} tone="own">{o.label}: position {ownBest.get(o.key)}</Chip> : null))}
      </div>

      {noSnippets ? <p className="mb-3 text-xs italic text-slate-500">Older check: no snippet saved</p> : null}

      {serp.localResults && serp.localResults.length > 0 ? <LocalBlock items={serp.localResults.slice(0, 3)} /> : null}

      <ol className="space-y-3">
        {serp.rows.map((row) => {
          const own = ownOf(row);
          const href = safeHref(row.link);
          return (
            <li
              key={row.link}
              className={`flex gap-3 rounded-lg border px-3 py-3 sm:px-4 ${
                own ? "border-[#dde5f0] border-l-4 border-l-[#F97316] bg-gradient-to-r from-[#F97316]/10 to-white" : "border-[#dde5f0] bg-white"
              }`}
            >
              <span
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  own ? "bg-[#F97316] text-white" : "bg-[#e8eef7] text-[#1B3A6B]"
                }`}
              >
                {row.position}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold uppercase text-slate-600" aria-hidden="true">
                    {(row.domain || "?").charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 text-sm text-slate-800">
                      <span className="break-all">{row.domain || "unknown site"}</span>
                      {own ? <span className="rounded-full bg-[#F97316] px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">YOURS</span> : null}
                    </p>
                    <p className="truncate text-xs text-[#4d5156]">{crumbs(row.link)}</p>
                  </div>
                </div>
                <p className="mt-1.5 break-words text-lg leading-snug">
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#1a0dab] hover:underline">
                      {row.title}
                    </a>
                  ) : (
                    <span className="text-[#1a0dab]">{row.title}</span>
                  )}
                </p>
                {row.snippet ? (
                  <p className="mt-1 break-words text-sm text-[#4d5156]">{row.snippet}</p>
                ) : noSnippets ? null : (
                  <p className="mt-1 text-xs italic text-slate-400">No snippet saved for this older check</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      {serp.rows.length === 0 ? <p className="mt-3 text-sm text-slate-600">Google returned no results for this search.</p> : null}
    </div>
  );
}
