"use client"
import { Network, ShieldCheck, RefreshCw, MessageSquare } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const WhyUsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-blue-600 text-xs font-semibold tracking-widest uppercase mb-2">
              OUR COMMITMENT
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              Why Astromar Logistics
            </h2>
          </div>
        </ScrollReveal>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:grid-rows-2">

          {/* Card 1 — Network Strength (top left) */}
          <ScrollReveal delay={0.06}>
            <div className="bg-slate-50 border border-gray-200 rounded-2xl p-8 h-full">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-5">
                <Network className="w-6 h-6 text-orange-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-3">Network Strength</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                9+ strategically located FTWZ facilities near major ports and airports across India,
                enabling seamless multimodal connectivity for imports, exports, and domestic distribution.
              </p>
              <span className="inline-block bg-orange-50 text-orange-500 text-xs font-medium px-3 py-1 rounded-full border border-orange-200">
                9+ locations pan-India
              </span>
            </div>
          </ScrollReveal>

          {/* Card 2 — Compliance First (right, spans 2 rows — tall dark card) */}
          <ScrollReveal delay={0.1}>
            <div className="bg-[#0a1628] rounded-2xl p-8 md:row-span-2 h-full">
              <p className="text-orange-500 text-4xl font-bold mb-2">100%</p>
              <h3 className="text-white font-bold text-lg mb-4">Compliance First</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Rigorous quality controls, streamlined processes, and ISO-certified operations ensure
                consistent, dependable performance with zero compliance penalties across all FTWZ locations.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Zero compliance penalties",
                  "Auditable operations",
                  "SEZ & FTWZ certified",
                  "ISO-certified processes",
                  "Streamlined customs workflows",
                  "Zero-error documentation",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <span className="text-orange-500 font-bold text-base leading-none">✓</span>
                    <span className="text-slate-300 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3 — Stats + Communication (bottom left — two halves) */}
          <ScrollReveal delay={0.14}>
            <div className="bg-slate-50 border border-gray-200 rounded-2xl p-8 h-full">
              {/* Stats row */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <p className="text-orange-500 text-4xl font-bold mb-1">7+</p>
                  <p className="text-gray-900 text-sm font-semibold mb-1">Years</p>
                  <p className="text-gray-500 text-xs">Of excellence</p>
                </div>
                <div className="text-center">
                  <p className="text-orange-500 text-4xl font-bold mb-1">500+</p>
                  <p className="text-gray-900 text-sm font-semibold mb-1">Clients</p>
                  <p className="text-gray-500 text-xs">Served</p>
                </div>
              </div>

              {/* Communication strip */}
              <div className="border-t border-gray-200 pt-6 flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-orange-500" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold text-sm mb-1">Transparent Communication</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Real-time shipment visibility, proactive status updates, and dedicated account managers
                    keep you informed at every stage.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
