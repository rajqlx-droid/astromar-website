"use client"
import { RefreshCw, Network, MessageSquare, UserCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: RefreshCw,
    title: "Operational Excellence",
    desc: "Rigorous quality controls and streamlined processes ensure consistent, dependable performance across all operations.",
  },
  {
    icon: Network,
    title: "Network Strength",
    desc: "9+ strategically located FTWZ facilities near major ports and airports, enabling seamless connectivity across India.",
  },
  {
    icon: MessageSquare,
    title: "Transparent Communication",
    desc: "Real-time visibility, proactive updates, and clear reporting at every stage of the supply chain.",
  },
  {
    icon: UserCheck,
    title: "Client-First Commitment",
    desc: "Dedicated account managers and customized solutions tailored to each client's unique logistics requirements.",
  },
];

const WhyUsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary text-center mb-3">
            OUR COMMITMENT
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-foreground mb-12">
            Why Astromar Logistics
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.1}>
              <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow h-full">
                <f.icon className="w-7 h-7 md:w-8 md:h-8 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-base md:text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;

