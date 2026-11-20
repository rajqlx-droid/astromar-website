"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import OpenDeckLink from "./OpenDeckLink";
import type { PitchDeck } from "@/data/pitch";

export default function DeckCard({ deck, children }: { deck: PitchDeck; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const models = deck.models ?? [];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const body = (
    <>
      <div className="h-36 overflow-hidden">{children}</div>
      <div className="p-6 text-left">
        <div className="flex gap-2">
          {models.map((m) => (
            <span key={m.key} className="rounded-full bg-brand-navy-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
              {m.label}
            </span>
          ))}
        </div>
        <h2 className="mt-3 text-xl font-bold text-foreground">{deck.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{deck.description}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          Open deck <ArrowUpRight size={15} />
        </span>
      </div>
    </>
  );
  const cls = "group block w-full overflow-hidden rounded-2xl border border-border bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";

  if (models.length === 0) {
    return <OpenDeckLink href={`/pitch/slides/${deck.slug}`} className={cls}>{body}</OpenDeckLink>;
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={cls}>{body}</button>
      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-brand-navy/80 p-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Choose a model"
          onClick={() => setOpen(false)}
        >
          <div className="relative w-full max-w-xl rounded-2xl bg-white p-7 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-secondary">
              <X size={18} />
            </button>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange-strong">{deck.title}</p>
            <h3 className="mt-2 text-2xl font-extrabold text-foreground">Which model do you want to present?</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {models.map((m) => (
                <OpenDeckLink
                  key={m.key}
                  href={`/pitch/slides/${deck.slug}?m=${m.key}`}
                  className="group flex flex-col rounded-xl border-2 border-border p-5 transition-all hover:-translate-y-0.5 hover:border-brand-orange hover:shadow-lg"
                >
                  <span className="text-4xl font-extrabold text-brand-navy group-hover:text-brand-orange-strong">{m.label}</span>
                  <span className="mt-1 text-sm text-muted-foreground">{m.full}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Present <ArrowUpRight size={15} />
                  </span>
                </OpenDeckLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
