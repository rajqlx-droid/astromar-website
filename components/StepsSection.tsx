"use client"
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    num: "01",
    title: "Import Goods into FTWZ",
    desc: "Goods enter the FTWZ directly from the port without paying customs duty or GST. No domestic tariff area entry required.",
  },
  {
    num: "02",
    title: "Store & Add Value",
    desc: "Duty-free storage for unlimited duration. Perform labelling, repacking, quality checks, and consolidation within the zone.",
  },
  {
    num: "03",
    title: "Re-export or Clear for Domestic Use",
    desc: "Re-export goods duty-free to any country, or clear into domestic market paying duty only on what you need, when you need it.",
  },
];

const StepsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3">
            HOW IT WORKS
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-12">
            FTWZ in 3 Simple Steps
          </h2>
        </ScrollReveal>

        <div className="space-y-6 md:space-y-8">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.15}>
              <div className="flex gap-4 md:gap-6 items-start">
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary shrink-0 w-10 md:w-12">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{step.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <a
            href="#calculator"
            className="inline-flex items-center gap-2 mt-10 rounded-lg bg-primary px-6 sm:px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Calculate Your Savings
            <ArrowRight size={18} />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default StepsSection;

