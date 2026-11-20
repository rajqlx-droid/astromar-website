import { Clock } from "lucide-react";
import PageHeader from "@/components/pitch/PageHeader";
import Reveal from "@/components/pitch/Reveal";
import { pitchVideos } from "@/data/pitch";

export default function VideosPage() {
  return (
    <main>
      <PageHeader eyebrow="Videos" title="See it before you read it" intro="Short silent videos with keyword captions, made to play while you talk." />
      <section className="mx-auto w-full max-w-7xl px-6 py-14 md:px-12 lg:px-16">
        <div className="grid gap-8 md:grid-cols-2">
          {pitchVideos.map((v, i) => (
            <Reveal key={v.src} delay={0.08 * i}>
              <article className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-xl">
                <div className="bg-brand-navy p-2">
                  <video controls preload="metadata" poster={v.poster} className="aspect-video w-full rounded-lg bg-black">
                    <source src={v.src} type="video/mp4" />
                  </video>
                </div>
                <div className="flex items-start justify-between gap-4 p-6">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">{v.title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-navy-soft px-3 py-1 text-xs font-bold text-primary">
                    <Clock size={12} /> {v.duration}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
