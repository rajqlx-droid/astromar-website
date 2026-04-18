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
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3">
            OUR COMMITMENT
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-foreground mb-12">
            Why Astromar Logistics
          </h2>
        </ScrollReveal>

        <div className="px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.1} className="h-full">
              <div className="bg-white border border-gray-200 border-l-[6px] border-l-[#1B3A6B] rounded-lg p-6 h-full flex flex-col relative">
                <div className="absolute top-0 right-0 w-1 h-10 bg-[#F97316] rounded-tr-lg" />
                <div className="w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-[#1B3A6B]">
                  <f.icon className="w-5 h-5 text-[#1B3A6B]" strokeWidth={1.5} />
                </div>
                <h4 className="text-base font-semibold text-[#1B3A6B] mb-3">{f.title}</h4>
                <p className="text-sm text-gray-600 flex-1">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;

