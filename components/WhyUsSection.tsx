"use client"
import { RefreshCw, Network, MessageSquare, UserCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: RefreshCw,
    title: "Operational Excellence",
    desc: "Rigorous quality controls, streamlined processes, and ISO-certified operations ensure consistent, dependable performance across all freight and logistics activities.",
    tag: "ISO Certified Operations",
  },
  {
    icon: Network,
    title: "Network Strength",
    desc: "9+ strategically located FTWZ facilities near major ports and airports across India, enabling seamless multimodal connectivity for imports, exports, and domestic distribution.",
    tag: "9+ FTWZ Locations",
  },
  {
    icon: MessageSquare,
    title: "Transparent Communication",
    desc: "Real-time shipment visibility, proactive status updates, and dedicated account managers ensure you are always informed at every stage of your supply chain.",
    tag: "Real-Time Tracking",
  },
  {
    icon: UserCheck,
    title: "Client-First Commitment",
    desc: "Every logistics decision is driven by your business objectives. With 500+ clients across industries, we tailor solutions that deliver measurable value and long-term growth.",
    tag: "500+ Happy Clients",
  },
];

const WhyUsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3">
            OUR COMMITMENT
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-foreground mb-12">
            Why Astromar Logistics
          </h2>
        </ScrollReveal>

          <div className="flex flex-col max-w-4xl mx-auto">
            {features.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.06}>
                <div
                  className="flex items-start gap-6"
                  style={{
                    paddingTop: '3rem',
                    paddingBottom: '3rem',
                    borderBottom: i === features.length - 1 ? 'none' : '1px solid #e2e8f0',
                  }}
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-orange-400 flex items-center justify-center flex-shrink-0 shadow-md">
                    <item.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-foreground/80 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                    <span className="inline-block mt-3 mb-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">{item.tag}</span>
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
