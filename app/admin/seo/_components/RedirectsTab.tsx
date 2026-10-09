import type { RedirectCheck } from "@/lib/seo-audit/types";
import { Chip, EmptyRow, toneFor } from "./ui";

const COLS = "grid-cols-[minmax(180px,2fr)_80px_minmax(200px,2fr)_minmax(170px,1.3fr)]";

function shortUrl(url: string, baseUrl: string): string {
  return url.startsWith(baseUrl) ? url.slice(baseUrl.length) || "/" : url;
}

export default function RedirectsTab({ checks, baseUrl, expected }: { checks: RedirectCheck[]; baseUrl: string; expected: Set<string> }) {
  if (checks.length === 0) return <EmptyRow>No URLs match the current filters.</EmptyRow>;
  return (
    <div className="min-w-[760px]" role="table" aria-label="Status and redirects">
        <div
          role="row"
          className={`sticky top-0 z-10 grid ${COLS} gap-4 bg-[#EDF1F8] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#3A4560]`}
        >
          <div role="columnheader">Old URL</div>
          <div role="columnheader">Status</div>
          <div role="columnheader">Goes to</div>
          <div role="columnheader">Result</div>
        </div>
        {checks.map((c) => {
          const redirectHops = c.hops.filter((h) => h.status !== null && h.status >= 300 && h.status < 400);
          const isExpected = c.result === "Live, not in sitemap" && expected.has(c.path);
          return (
            <div role="row" key={c.path} className={`grid ${COLS} items-start gap-4 border-t border-[#E6EAF2] px-5 py-3.5 text-sm`}>
              <div role="cell" className="break-all font-mono text-[13px] text-[#1A2233]">
                {c.path}
              </div>
              <div role="cell" className="font-semibold text-[#1A2233]">
                {c.status ?? "-"}
              </div>
              <div role="cell" className="min-w-0 font-mono text-[13px] text-[#2B364D]">
                {redirectHops.length === 0 ? (
                  <span>{c.status === 200 ? "(live page)" : "(none)"}</span>
                ) : (
                  <ol className="space-y-0.5">
                    {redirectHops.map((h, i) => (
                      <li key={i} className="break-all">
                        {i > 0 && <span className="font-sans text-xs text-[#4A5670]">then </span>}
                        {shortUrl(h.url, baseUrl)}
                      </li>
                    ))}
                    <li className="font-sans text-xs text-[#4A5670]">Final status: {c.finalStatus ?? "-"}</li>
                  </ol>
                )}
              </div>
              <div role="cell" className="flex flex-col items-start gap-1">
                <Chip tone={isExpected ? "ok" : toneFor(c.severity)}>{c.result}</Chip>
                {isExpected && <span className="text-xs text-[#4A5670]">Marked as expected</span>}
                {c.note && <span className="text-xs text-[#4A5670]">{c.note}</span>}
              </div>
            </div>
          );
        })}
    </div>
  );
}
