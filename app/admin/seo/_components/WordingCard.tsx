import type { WordingMatch } from "@/lib/seo-audit/types";

function Highlight({ snippet, phrase }: { snippet: string; phrase: string }) {
  const i = snippet.toLowerCase().indexOf(phrase.toLowerCase());
  if (i < 0) return <>{snippet}</>;
  return (
    <>
      {snippet.slice(0, i)}
      <mark className="rounded bg-[var(--seo-cautionBg)] px-0.5 font-semibold text-[color:var(--seo-cautionText)]">{snippet.slice(i, i + phrase.length)}</mark>
      {snippet.slice(i + phrase.length)}
    </>
  );
}

/** One wording match: the phrase as a tag and the text around it, on a grey card. */
export default function WordingCard({ match }: { match: WordingMatch }) {
  return (
    <div className="rounded-[10px] bg-[var(--seo-greyCard)] px-4 py-3 text-sm leading-relaxed">
      <span className="inline-block rounded-md bg-[var(--seo-warnBg)] px-2.5 py-0.5 text-xs font-bold text-[color:var(--seo-warnText)]">{match.phrase}</span>
      {match.note && <span className="ml-2 text-xs text-[color:var(--seo-mutedText)]">{match.note}</span>}
      <p className="mt-1.5 break-words text-[color:var(--seo-inkSoft)]">
        <Highlight snippet={match.snippet} phrase={match.phrase} />
      </p>
    </div>
  );
}
