"use client"
import { RefreshCw, Network, MessageSquare, UserCheck } from "lucide-react";
import Image from "next/image";
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* LEFT — content */}
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              OUR COMMITMENT
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-10">
              Why Astromar Logistics
            </h2>

            <div className="flex flex-col">
              {features.map((item, i) => (
                <div
                  key={item.title}
                  className="flex items-start gap-5"
                  style={{
                    paddingTop: i === 0 ? '0' : '1.75rem',
                    paddingBottom: '1.75rem',
                    borderBottom: i === features.length - 1 ? 'none' : '1px solid #e2e8f0',
                  }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md">
                    <item.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed mb-2">{item.desc}</p>
                    <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">{item.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* RIGHT — image */}
          <ScrollReveal delay={0.12}>
            <div className="relative rounded-2xl overflow-hidden w-full min-h-96 h-full shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
                alt="Astromar logistics operations"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-4 right-4 bg-white rounded-xl p-4 shadow-lg">
                <p className="text-2xl font-extrabold text-orange-500 leading-tight">500+</p>
                <p className="text-xs font-semibold text-gray-700 mt-0.5">Clients Served</p>
                <p className="text-xs text-gray-400">Across India &amp; globally</p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
