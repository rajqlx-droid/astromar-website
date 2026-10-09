"use client";

import { useState } from "react";
import type { RobotsInfo, SitemapInfo } from "@/lib/seo-audit/types";
import { Chip } from "./ui";

interface Props {
  robots: RobotsInfo;
  sitemap: SitemapInfo;
  expected: Set<string>;
  onToggleExpected: (path: string) => void;
  /** Small message shown next to the button that triggered it. */
  inlineNote?: { target: string; text: string } | null;
}

const outlined =
  "inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-[#B8C2D6] bg-white px-3 text-xs font-semibold text-[#1B3A6B] transition-colors hover:border-[#F97316] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F97316]";

export default function SitePanels({ robots, sitemap, expected, onToggleExpected, inlineNote }: Props) {
  const [showRobots, setShowRobots] = useState(false);
  const unexpectedMissing = sitemap.missingFromSitemap.filter((p) => !expected.has(p));
  const mismatches = unexpectedMissing.length + sitemap.sitemapWithoutRoute.length;

  return (
    <section className="shrink-0 rounded-xl border border-[#C5D0E4] bg-[#EAF0FA] p-3.5" aria-labelledby="files-heading">
      <h2 id="files-heading" className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#1B3A6B]">
        Site files
      </h2>

      {/* robots.txt */}
      <div className="mt-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-[13px] font-semibold text-[#1A2233]">robots.txt</h3>
          {robots.content === null ? (
            <Chip tone="bad">{robots.error ? "Not reachable" : `Not found (HTTP ${robots.status})`}</Chip>
          ) : robots.referencesSitemap ? (
            <Chip tone="ok">Found</Chip>
          ) : (
            <Chip tone="warn">No Sitemap line</Chip>
          )}
        </div>
        {robots.content !== null && (
          <>
            <button type="button" aria-expanded={showRobots} aria-controls="robots-content" onClick={() => setShowRobots((v) => !v)} className={`mt-2 ${outlined}`}>
              {showRobots ? "Hide file" : "Show file"}
            </button>
            {showRobots && (
              <pre id="robots-content" className="mt-2 max-h-48 overflow-auto rounded-lg bg-white p-2 font-mono text-[11px] leading-relaxed text-[#1A2233]">
                {robots.content.trim()}
              </pre>
            )}
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Chip tone={robots.disallowsAdmin ? "ok" : "bad"}>{robots.disallowsAdmin ? "Disallows /admin/" : "Allows /admin/"}</Chip>
              <Chip tone={robots.disallowsApi ? "ok" : "warn"}>{robots.disallowsApi ? "Disallows /api/" : "Allows /api/"}</Chip>
            </div>
          </>
        )}
      </div>

      {/* sitemap.xml */}
      <div className="mt-3 border-t border-[#C5D0E4] pt-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-[13px] font-semibold text-[#1A2233]">sitemap.xml</h3>
          <Chip tone={mismatches === 0 ? "ok" : "warn"}>{mismatches === 0 ? "In sync" : `${mismatches} mismatch${mismatches === 1 ? "" : "es"}`}</Chip>
        </div>
        <p className="mt-1 text-[11px] text-[#4A5670]">
          {sitemap.sitemapCount} sitemap URLs, {sitemap.routeCount} routes
          {sitemap.source !== "sitemap.xml" ? ` (fell back to app/sitemap.ts: ${sitemap.fetchError})` : ""}
        </p>

        {sitemap.missingFromSitemap.length > 0 && (
          <div className="mt-2">
            <div className="text-[11px] font-semibold text-[#1A2233]">Route, not in sitemap</div>
            <ul className="mt-1 space-y-2">
              {sitemap.missingFromSitemap.map((p) => {
                const isExpected = expected.has(p);
                return (
                  <li key={p}>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="break-all font-mono text-[11px] text-[#1B3A6B]">{p}</span>
                      {isExpected && <Chip tone="ok">Expected</Chip>}
                    </div>
                    <button type="button" onClick={() => onToggleExpected(p)} className={`mt-1.5 ${outlined}`}>
                      {isExpected ? "Undo expected" : "Mark as expected"}
                    </button>
                    {inlineNote?.target === p && (
                      <p role="status" className="mt-1 text-[11px] text-[#4A5670]">
                        {inlineNote.text}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {sitemap.sitemapWithoutRoute.length > 0 && (
          <div className="mt-2">
            <div className="text-[11px] font-semibold text-[#1A2233]">In sitemap, no route</div>
            <ul className="mt-1 space-y-1">
              {sitemap.sitemapWithoutRoute.map((p) => (
                <li key={p} className="flex flex-wrap items-center gap-1.5">
                  <span className="break-all font-mono text-[11px] text-[#1B3A6B]">{p}</span>
                  <Chip tone="bad">No route</Chip>
                </li>
              ))}
            </ul>
          </div>
        )}
        {sitemap.unresolvedRoutes.length > 0 && (
          <p className="mt-2 text-[11px] text-[#4A5670]">
            Dynamic routes not expanded (check by hand): <span className="font-mono">{sitemap.unresolvedRoutes.join(", ")}</span>
          </p>
        )}
      </div>
    </section>
  );
}
