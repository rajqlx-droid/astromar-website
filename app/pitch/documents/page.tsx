import { ArrowDownToLine, FileText } from "lucide-react";
import PageHeader from "@/components/pitch/PageHeader";
import Reveal from "@/components/pitch/Reveal";
import { pitchDocuments } from "@/data/pitch";

export default function DocumentsPage() {
  return (
    <main>
      <PageHeader eyebrow="Documents" title="Sample documents" intro="Sample trade documents for your clients." />
      <section className="mx-auto w-full max-w-4xl px-6 py-14 md:px-12">
        {pitchDocuments.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border bg-white p-8 text-center text-muted-foreground">
            Sample documents such as BL and BoE will be added here.
          </p>
        )}
        <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          {pitchDocuments.map((d, i) => (
            <Reveal key={d.href} delay={0.06 * i}>
              <a
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-5 transition-colors hover:bg-brand-light md:p-6"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-white transition-colors group-hover:bg-brand-orange">
                  <FileText size={24} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-base font-bold text-foreground md:text-lg">{d.title}</span>
                    <span className="rounded bg-brand-orange-soft/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-orange-strong">{d.type}</span>
                  </span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{d.description}</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                  <ArrowDownToLine size={16} /> <span className="hidden sm:inline">Open</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
