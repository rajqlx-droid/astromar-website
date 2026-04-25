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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3">
            OUR COMMITMENT
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-foreground mb-12">
            Why Astromar Logistics
          </h2>
        </ScrollReveal>

          <div className="flex flex-col divide-y divide-border max-w-4xl mx-auto">
            {features.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.06}>
                <div className="flex items-start gap-6 py-8 first:pt-0 last:pb-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-orange-400 flex items-center justify-center flex-shrink-0 shadow-md">
                    <item.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description || item.desc}</p>
                    <span className="inline-block mt-3 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">Astromar Promise</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
      </div>
    </section>
  );
};

export default WhyUsSection;

