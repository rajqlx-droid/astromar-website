import Reveal from "./Reveal";

export default function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="relative overflow-hidden bg-brand-navy text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-orange/25 blur-3xl" />
      <div className="relative mx-auto w-full max-w-7xl px-6 py-14 md:px-12 lg:px-16">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-orange">
            <span className="h-px w-10 bg-brand-orange" />
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 md:text-lg">{intro}</p>
        </Reveal>
      </div>
    </section>
  );
}
