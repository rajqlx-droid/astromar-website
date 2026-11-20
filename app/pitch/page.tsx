import Link from "next/link";
import { ArrowUpRight, FileText, Play, Presentation } from "lucide-react";
import Reveal from "@/components/pitch/Reveal";
import { pitchDecks, pitchVideos } from "@/data/pitch";

const tiles: { n: string; href: string; title: string; text: string; count: number; unit: string; Icon: typeof Play; soon?: boolean }[] = [
  { n: "01", href: "/pitch/slides", title: "Slides", text: "Walk through the SMI and BMI models, slide by slide.", count: pitchDecks.length, unit: "deck", Icon: Presentation },
  { n: "02", href: "/pitch/videos", title: "Videos", text: "Short explainers and a tour of our warehouses.", count: pitchVideos.length, unit: "video", Icon: Play },
  { n: "03", href: "/pitch/documents", title: "Documents", text: "Sample trade documents such as BL and BoE.", count: 0, unit: "file", Icon: FileText, soon: true },
];

export default function PitchHome() {
  return (
    <main>
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-orange/25 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-brand-blue/30 blur-3xl" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-20 md:px-12 md:py-28 lg:px-16">
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-orange">
              <span className="h-px w-10 bg-brand-orange" />
              Astromar pitch room
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl">
              Your goods. Our free zone.
              <span className="block text-brand-orange">Explained simply.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/70 md:text-lg">
              Everything for the call in one place: the SMI and BMI slides and our explainer videos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/pitch/slides" className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-strong">
                Open the slides <ArrowUpRight size={16} />
              </Link>
              <Link href="/pitch/videos" className="inline-flex items-center rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                Watch a video
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-14 md:px-12 lg:px-16">
        <div className="grid gap-6 md:grid-cols-3">
          {tiles.map((t, i) => (
            <Reveal key={t.href} delay={0.1 + i * 0.08}>
              <Link
                href={t.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/60 hover:shadow-xl"
              >
                <span aria-hidden className="absolute right-5 top-3 text-7xl font-extrabold text-brand-navy/[0.05]">{t.n}</span>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-white transition-colors group-hover:bg-brand-orange">
                  <t.Icon size={22} />
                </span>
                <h2 className="mt-6 text-2xl font-bold text-foreground">{t.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm">
                  <span className="font-medium text-muted-foreground">{t.soon ? "Coming soon" : `${t.count} ${t.unit}${t.count === 1 ? "" : "s"}`}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-primary">Open <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
