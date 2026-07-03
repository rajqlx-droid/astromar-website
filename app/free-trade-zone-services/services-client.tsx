"use client"
import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";

const Services = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-navy py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200"
          alt="Astromar Logistics — FTZ India logistics services with FTZ Warehouse network across 10 strategic locations"
          fill
          className="absolute inset-0 object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="w-full px-6 md:px-12 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center">
            {/* LEFT - Text */}
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-widest uppercase text-orange-500 mb-5">
                OUR SERVICES
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Freight, Customs & Bonded Warehousing Services — FTZ India
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed mb-8">
                Astromar's FTZ India network delivers duty-free bonded warehousing, multimodal freight, customs clearance, and value-added services under one trusted partner.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#services"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#F97316" }}
                >
                  Explore Services
                </a>
                <a
                  href="/contact-us"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* RIGHT - Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold text-accent mb-2">8</p>
                <p className="text-white text-sm font-semibold">Service Types</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold text-accent mb-2">500+</p>
                <p className="text-white text-sm font-semibold">Clients Served</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold text-accent mb-2">15+</p>
                <p className="text-white text-sm font-semibold">Countries</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold text-accent mb-2">24/7</p>
                <p className="text-white text-sm font-semibold">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW Intro Section */}
      <section className="py-14 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-3">OUR SOLUTIONS</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            End-to-End FTZ India Operations
          </h2>
          <p className="text-base sm:text-lg text-foreground/70 leading-relaxed max-w-3xl mx-auto">
            Astromar combines duty-free warehousing infrastructure with multimodal freight forwarding and customs expertise — letting you scale imports, exports, and re-export operations from a single trusted partner.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-10">
            Our Service Offerings
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.06}>
                <a href={s.href} className="block h-full">
                  <div
                    className={`relative rounded-xl border-2 bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col ${
                      s.featured ? "border-primary" : "border-blue-200"
                    }`}
                  >
                    {s.featured && (
                      <span className="absolute top-4 right-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        Featured
                      </span>
                    )}
                    <s.icon className="w-7 h-7 md:w-8 md:h-8 text-primary mb-4" strokeWidth={1.5} />
                    <h3 className="text-base md:text-lg font-bold text-foreground mb-2">{s.title}</h3>
                    <p className="text-foreground/80 leading-relaxed text-sm sm:text-base flex-1">{s.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-4">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Service Matrix Table */}
      <section className="py-14 bg-blue-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <p className="text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-3 text-center">COMPARE SERVICES</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-4">
            Choose the Right FTZ Warehouse Service
          </h2>
          <p className="text-base text-foreground/70 text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            Compare our 8 services side-by-side to find the right FTZ Warehouse solution for your industry, cargo profile, and compliance needs.
          </p>
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm" style={{ borderCollapse: "collapse", minWidth: "640px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f9fafb" }}>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700" style={{ borderRight: "1px solid #e5e7eb", borderBottom: "2px solid #e5e7eb" }}>Feature</th>
                  <th className="px-3 py-3 font-semibold text-gray-700 text-center" style={{ borderRight: "1px solid #e5e7eb", borderBottom: "2px solid #e5e7eb" }}>FTWZ</th>
                  <th className="px-3 py-3 font-semibold text-gray-700 text-center" style={{ borderRight: "1px solid #e5e7eb", borderBottom: "2px solid #e5e7eb" }}>Coastal</th>
                  <th className="px-3 py-3 font-semibold text-gray-700 text-center" style={{ borderRight: "1px solid #e5e7eb", borderBottom: "2px solid #e5e7eb" }}>Ocean</th>
                  <th className="px-3 py-3 font-semibold text-gray-700 text-center" style={{ borderRight: "1px solid #e5e7eb", borderBottom: "2px solid #e5e7eb" }}>Air</th>
                  <th className="px-3 py-3 font-semibold text-gray-700 text-center" style={{ borderRight: "1px solid #e5e7eb", borderBottom: "2px solid #e5e7eb" }}>Supply</th>
                  <th className="px-3 py-3 font-semibold text-gray-700 text-center" style={{ borderRight: "1px solid #e5e7eb", borderBottom: "2px solid #e5e7eb" }}>Customs</th>
                  <th className="px-3 py-3 font-semibold text-gray-700 text-center" style={{ borderRight: "1px solid #e5e7eb", borderBottom: "2px solid #e5e7eb" }}>Warehouse</th>
                  <th className="px-3 py-3 font-semibold text-gray-700 text-center" style={{ borderBottom: "2px solid #e5e7eb" }}>Projects</th>
                </tr>
              </thead>
              <tbody>
                {([
                  ["Duty-free storage", "✓", "✗", "✗", "✗", "✗", "✗", "partial", "✗"],
                  ["Real-time tracking", "✓", "✓", "✓", "✓", "✓", "✓", "✓", "✓"],
                  ["Customs handling", "✓", "add-on", "add-on", "add-on", "✓", "✓", "add-on", "✓"],
                  ["Insurance available", "✓", "✓", "✓", "✓", "✓", "✓", "✓", "✓"],
                  ["Value-add services", "✓", "✗", "✗", "✗", "✓", "✗", "✓", "partial"],
                  ["Re-export suitable", "✓", "✗", "✓", "✓", "✓", "✓", "partial", "✓"],
                  ["Cost tier", "$$", "$", "$$", "$$$", "$$", "$", "$$", "$$$"],
                ] as const).map(([feature, ...cells], i, arr) => {
                  const isLast = i === arr.length - 1;
                  const rowBorder = isLast ? undefined : "1px solid #e5e7eb";
                  return (
                    <tr key={feature}>
                      <td className="px-4 py-3 font-medium text-gray-900" style={{ borderRight: "1px solid #e5e7eb", borderBottom: rowBorder }}>{feature}</td>
                      {cells.map((cell, ci) => {
                        const isMostRight = ci === cells.length - 1;
                        const color = cell === "✓" ? "#15803d" : cell === "✗" ? "#b91c1c" : "#ca8a04";
                        return (
                          <td key={ci} className="px-3 py-3 text-center" style={{ color, borderRight: isMostRight ? undefined : "1px solid #e5e7eb", borderBottom: rowBorder }}>{cell}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">✓ Included &nbsp;·&nbsp; ✗ Not included &nbsp;·&nbsp; partial = limited &nbsp;·&nbsp; add-on = available separately</p>
        </div>
      </section>

      {/* NEW: Industry Bundles */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <p className="text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-3 text-center">BY INDUSTRY</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-4">
            Recommended Service Bundles
          </h2>
          <p className="text-base text-foreground/70 text-center max-w-3xl mx-auto mb-10 leading-relaxed">
            Our FTZ Warehouse bundles are pre-configured by industry — Electronics, Pharma, FMCG, Automotive, Textiles, and Project Cargo — for fast onboarding.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {[
              { emoji: "💻", title: "Electronics & High-Value", desc: "For importers of consumer electronics, semiconductors, and high-value tech goods.", tags: ["Ocean Freight", "FTWZ", "Customs"] },
              { emoji: "💊", title: "Pharma & Cold Chain", desc: "Time-sensitive temperature-controlled cargo with strict GDP compliance needs.", tags: ["Air Freight", "FTWZ", "Warehousing"] },
              { emoji: "⚙️", title: "Automotive & Industrial", desc: "Parts importers, OEMs, and tier-1 suppliers needing just-in-time fulfillment.", tags: ["Ocean Freight", "FTWZ", "Supply Chain"] },
              { emoji: "🛒", title: "FMCG & Consumer Goods", desc: "Bulk consumer products needing kitting, repackaging, and pan-India distribution.", tags: ["Coastal", "FTWZ", "Supply Chain"] },
              { emoji: "🏗️", title: "Project Cargo & Heavy-Lift", desc: "Oversized, heavy, or specialized equipment with custom engineering requirements.", tags: ["Projects", "Customs", "FTWZ Storage"] },
              { emoji: "🧪", title: "Chemicals & Bulk", desc: "Hazardous-classified imports and bulk chemicals needing compliant storage.", tags: ["Ocean Freight", "FTWZ", "Customs"] },
            ].map((bundle) => (
              <div key={bundle.title} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{bundle.emoji}</span>
                  <h3 className="text-base font-bold text-foreground">{bundle.title}</h3>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed mb-4">{bundle.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {bundle.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(249,115,22,0.1)", color: "#c2410c" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <WhatsAppButton />
    </>
  );
};

export default Services;
