import DeckCard from "@/components/pitch/DeckCard";
import PageHeader from "@/components/pitch/PageHeader";
import Reveal from "@/components/pitch/Reveal";
import { pitchDecks } from "@/data/pitch";

function Strip() {
  return (
    <svg viewBox="0 0 320 90" className="h-full w-full" aria-hidden>
      <rect x="0" y="0" width="320" height="90" fill="hsl(var(--brand-navy))" />
      <polygon points="70,48 130,14 190,48" fill="hsl(var(--brand-orange))" />
      <rect x="78" y="48" width="104" height="30" fill="#fff" fillOpacity=".12" stroke="hsl(var(--brand-orange))" strokeWidth="2" />
      {[18, 214, 262].map((x) => (
        <g key={x}>
          <rect x={x} y="50" width="40" height="28" rx="3" fill="hsl(var(--brand-blue))" />
          <rect x={x + 32} y="53" width="5" height="22" rx="1" fill="hsl(var(--brand-orange))" />
        </g>
      ))}
      <line x1="0" y1="80" x2="320" y2="80" stroke="#fff" strokeOpacity=".35" strokeWidth="2" />
    </svg>
  );
}

export default function SlidesPage() {
  return (
    <main>
      <PageHeader eyebrow="Slides" title="Presentations for your call" intro="Open a deck, share your screen and walk the client through it. Tabs inside each slide let you drill into the detail." />
      <section className="mx-auto w-full max-w-7xl px-6 py-14 md:px-12 lg:px-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pitchDecks.map((d, i) => (
            <Reveal key={d.slug} delay={0.08 * i}>
              <DeckCard deck={d}><Strip /></DeckCard>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
