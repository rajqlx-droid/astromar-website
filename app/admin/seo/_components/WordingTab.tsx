import type { WordingMatch } from "@/lib/seo-audit/types";
import { Card, EmptyRow } from "./ui";

function Highlight({ snippet, phrase }: { snippet: string; phrase: string }) {
  const i = snippet.toLowerCase().indexOf(phrase.toLowerCase());
  if (i < 0) return <>{snippet}</>;
  return (
    <>
      {snippet.slice(0, i)}
      <mark className="rounded bg-[#FFE9B8] px-0.5 font-semibold text-[#5A3A00]">{snippet.slice(i, i + phrase.length)}</mark>
      {snippet.slice(i + phrase.length)}
    </>
  );
}

export default function WordingTab({ matches }: { matches: WordingMatch[] }) {
  return (
    <div className="flex flex-col gap-3 p-3">
      <p className="text-sm leading-relaxed text-[#2B364D]">
        Phrases from data/seoWordingRules.ts found in page text (header, footer and nav excluded). Review only: some matches may be fine in
        context.
      </p>
      {matches.length === 0 ? (
        <EmptyRow>No wording matches for the current filters.</EmptyRow>
      ) : (
        matches.map((m, i) => (
          <Card
            key={`${m.path}-${m.phrase}-${i}`}
            className="grid gap-3 px-5 py-4 text-sm leading-relaxed md:grid-cols-[minmax(140px,200px)_minmax(180px,260px)_1fr] md:gap-5"
          >
            <div>
              <span className="inline-block rounded-md bg-[#FDE3E3] px-2.5 py-0.5 font-semibold text-[#7A1010]">{m.phrase}</span>
              {m.note && <div className="mt-1 text-xs text-[#4A5670]">{m.note}</div>}
            </div>
            <div className="break-all font-mono text-[13px] text-[#1B3A6B]">{m.path}</div>
            <div className="min-w-0 break-words text-[#2B364D]">
              <Highlight snippet={m.snippet} phrase={m.phrase} />
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
