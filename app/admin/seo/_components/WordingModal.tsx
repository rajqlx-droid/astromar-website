"use client";

import { useMemo } from "react";
import type { WordingMatch } from "@/lib/seo-audit/types";
import Dialog from "./Dialog";
import { pageName } from "./pageTree";
import WordingCard from "./WordingCard";

interface Props {
  /** All wording matches of the shown scan (hidden pages already removed). */
  matches: WordingMatch[];
  returnFocusTo: HTMLElement | null;
  onClose: () => void;
  /** Close this dialog and open the details of that page. */
  onOpenPage: (path: string) => void;
}

/** Sitewide wording list, grouped by page. */
export default function WordingModal({ matches, returnFocusTo, onClose, onOpenPage }: Props) {
  const groups = useMemo(() => {
    const map = new Map<string, WordingMatch[]>();
    for (const m of matches) map.set(m.path, [...(map.get(m.path) ?? []), m]);
    return Array.from(map.entries());
  }, [matches]);

  return (
    <Dialog
      label="Wording check"
      closeLabel="Close wording check"
      header={<div className="text-lg font-bold leading-tight text-[color:var(--seo-onNavy)]">Wording check</div>}
      returnFocusTo={returnFocusTo}
      onClose={onClose}
    >
      <p className="text-sm leading-relaxed text-[color:var(--seo-inkSoft)]">
        Phrases from your wording rules found in page text. Review only; some matches may be fine in context.
      </p>
      {groups.length === 0 ? (
        <p className="mt-4 text-sm text-[color:var(--seo-mutedText)]">No risky phrases found on the pages scanned.</p>
      ) : (
        <div className="mt-4 flex flex-col gap-5">
          {groups.map(([path, list]) => (
            <section key={path} aria-label={`Wording on ${pageName(path)}`}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-[color:var(--seo-divider)] pb-2">
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-bold text-[color:var(--seo-navy)]">{pageName(path)}</div>
                  <div className="break-all font-mono text-xs text-[color:var(--seo-subtleText)]">
                    {path} - {list.length} {list.length === 1 ? "match" : "matches"}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenPage(path)}
                  className="inline-flex min-h-11 items-center rounded-lg border border-[color:var(--seo-borderStrong)] bg-[var(--seo-cardBg)] px-3 text-xs font-semibold text-[color:var(--seo-navy)] transition-colors hover:border-[color:var(--seo-orange)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--seo-orange)]"
                >
                  Open page
                </button>
              </div>
              <div className="mt-2 flex flex-col gap-2">
                {list.map((m, i) => (
                  <WordingCard key={`${m.phrase}-${i}`} match={m} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </Dialog>
  );
}
