"use client"
import { Network, MessageSquare } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const WhyUsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Top Left — Network Strength */}
          <ScrollReveal delay={0.06}>
            <div className="bg-slate-50 border border-gray-200 rounded-2xl p-8 h-full flex flex-col">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mb-5">
                <Network className="w-5 h-5 text-orange-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-3">Network Strength</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                9+ strategically located FTWZ facilities near major ports and airports across India,
                enabling seamless multimodal connectivity for imports, exports, and domestic distribution.
              </p>
              <div className="flex flex-col gap-2 mt-auto">
                {["9+ locations pan-India", "Major port & airport proximity", "Multimodal connectivity"].map((point) => (
                  <div key={point} className="flex items-center gap-2">
                    <span className="text-orange-500 font-semibold">✓</span>
                    <span className="text-gray-700 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Top Right — Compliance First (dark navy) */}
          <ScrollReveal delay={0.1}>
            <div className="bg-[#0a1628] rounded-2xl p-8 h-full flex flex-col">
              <p className="text-orange-500 text-4xl font-bold mb-2">100%</p>
              <h3 className="text-white font-bold text-lg mb-3">Compliance First</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                100% customs compliance with transparent, auditable operations across all FTWZ locations.
                Zero tolerance for errors or delays.
              </p>
              <div className="flex flex-col gap-2 mt-auto">
                {["Zero compliance penalties", "Auditable operations", "SEZ & FTWZ certified"].map((point) => (
                  <div key={point} className="flex items-center gap-2">
                    <span className="text-orange-500 font-semibold">✓</span>
                    <span className="text-slate-300 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Bottom Left — Stats 2×2 */}
          <ScrollReveal delay={0.14}>
            <div className="bg-slate-50 border border-gray-200 rounded-2xl p-8 h-full grid grid-cols-2 gap-4">
              {[
                { value: "7+",   label: "Years",     sub: "Of excellence" },
                { value: "500+", label: "Clients",   sub: "Served"        },
                { value: "9+",   label: "Locations", sub: "Pan-India"     },
                { value: "24/7", label: "Support",   sub: "Operations"    },
              ].map((s) => (
                <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <p className="text-orange-500 text-3xl font-bold mb-1">{s.value}</p>
                  <p className="text-gray-900 text-sm font-semibold mb-1">{s.label}</p>
                  <p className="text-gray-500 text-xs">{s.sub}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Bottom Right — Transparent Communication (dark navy) */}
          <ScrollReveal delay={0.18}>
            <div className="bg-[#0a1628] rounded-2xl p-8 h-full flex flex-col">
              <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center mb-5">
                <MessageSquare className="w-5 h-5 text-orange-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-white font-bold text-lg mb-3">Transparent Communication</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                Real-time shipment visibility, proactive status updates, and dedicated account managers
                keep you informed at every stage of your cargo journey.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["Real-time tracking", "Dedicated manager", "24/7 support"].map((tag) => (
                  <span key={tag} className="bg-orange-500/20 text-orange-400 text-xs font-medium px-3 py-1 rounded-full border border-orange-500/30">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
