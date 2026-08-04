"use client"
import { useState } from "react";
import CTASection from "@/components/CTASection";
import ServicesCarousel from "../ServicesCarousel";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";

type TabKey = "Electronics" | "Pharma" | "FMCG" | "Automotive" | "Textiles";

const tabs: { key: TabKey; label: string }[] = [
  { key: "Electronics", label: "Electronics" },
  { key: "Pharma",      label: "Pharma"      },
  { key: "FMCG",        label: "FMCG"        },
  { key: "Automotive",  label: "Automotive"  },
  { key: "Textiles",    label: "Textiles"    },
];

const tabContent: Record<TabKey, { challenge: string; solution: string; benefits: string[] }> = {
  Electronics: {
    challenge: "High-value inventory risk and duty exposure on imported components",
    solution:  "FTWZ bonded storage with duty deferment and secure WMS-tracked inventory",
    benefits:  ["Duty deferment", "Secure storage", "WMS visibility"],
  },
  Pharma: {
    challenge: "Strict temperature control and GDP compliance requirements",
    solution:  "GDP-certified cold chain warehousing with full audit documentation",
    benefits:  ["2-8°C storage", "GDP certified", "Compliance docs"],
  },
  FMCG: {
    challenge: "Fast inventory turnover and multi-channel fulfillment demands",
    solution:  "Integrated WMS with real-time stock visibility and rapid dispatch",
    benefits:  ["Real-time stock", "Fast dispatch", "Returns handling"],
  },
  Automotive: {
    challenge: "Just-in-time delivery needs and zero production line downtime",
    solution:  "Strategic stocking near OEM plants with cross-docking capability",
    benefits:  ["Zero downtime", "Port proximity", "Cross-docking"],
  },
  Textiles: {
    challenge: "Seasonal demand swings and export compliance requirements",
    solution:  "Flexible FTWZ warehousing with quality control and export support",
    benefits:  ["Scale up/down", "Quality checks", "Export support"],
  },
};

const accordionItems = [
  { title: "Warehousing & Inventory Management",    body: "FTWZ bonded warehousing with real-time WMS inventory visibility across all locations. Automated reorder triggers, cycle counts, and MIS reporting." },
  { title: "Order Fulfillment & Distribution",      body: "End-to-end order processing from receipt to last-mile delivery nationwide. Multi-channel fulfillment for e-commerce, retail, and B2B." },
  { title: "Reverse Logistics",                     body: "Efficient returns management and reverse supply chain processing for e-commerce and retail. Disposition management and refurbishment services." },
  { title: "Supply Chain Analytics",                body: "Data-driven insights and reporting to optimize your supply chain performance and costs. Real-time dashboards, KPI tracking, and predictive analytics." },
];

const whyChoose = [
  { title: "FTWZ-Integrated Warehousing",       desc: "Duty-free bonded storage across 10 FTWZ locations with pan-India distribution connectivity." },
  { title: "Real-Time WMS Visibility",           desc: "Live inventory dashboards, automated alerts, and full traceability from FTWZ to final customer." },
  { title: "Industry-Specific Expertise",        desc: "Dedicated solutions for pharma, electronics, FMCG, automotive, and textiles supply chains." },
  { title: "Dedicated Supply Chain Manager", desc: "A single point of accountability for Supply Chain Logistics India — covering warehousing, distribution, and last-mile delivery.", descKw: "Supply Chain Logistics India" },
];

const SupplyChainClient = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("Electronics");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&q=80"
          alt="Supply Chain Solutions India — Astromar integrated supply chain logistics with FTWZ network and real-time visibility"
          fill
          sizes="100vw"
          className="absolute inset-0 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="w-full px-6 md:px-12 lg:px-16 pt-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

            <ScrollReveal>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4">SUPPLY CHAIN</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Supply Chain Solutions India — Integrated &amp; End-to-End
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed mb-8">
                Astromar's Supply Chain Solutions India manage procurement to last-mile delivery — reducing costs, improving speed, and building resilience with real-time visibility across every node in your operations.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/contact-us" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg py-3 px-6 transition-colors">
                  Get a Quote <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#services" className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white/10 font-semibold text-sm rounded-lg py-3 px-6 transition-colors">
                  Learn More
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <p className="text-xs font-semibold tracking-widest uppercase text-orange-500 mb-4">AT A GLANCE</p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { value: "500+",       label: "Clients"      },
                    { value: "10",         label: "FTWZ Hubs"    },
                    { value: "Pan-India",  label: "Network"      },
                    { value: "24/7",       label: "Support"      },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                      <p className="text-xl sm:text-2xl font-extrabold text-white leading-tight">{s.value}</p>
                      <p className="text-gray-300 text-xs mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
                <a href="/contact-us" className="inline-flex items-center gap-2 w-full justify-center bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg py-3 px-4 transition-colors">
                  Get Instant Quote <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── S2: Industry Tabs ── */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">INDUSTRIES</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-8">
              Industry-Specific Supply Chain Logistics India Expertise
            </h2>
          </ScrollReveal>
          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeTab === tab.key
                    ? "bg-[#0a1628] text-white"
                    : "bg-brand-light text-gray-600 hover:bg-brand-light border border-[#1B3A6B]/15"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Tab content — all 5 panels rendered; only the active one is visible */}
          <div className="bg-brand-light rounded-xl p-6 sm:p-8 border border-[#1B3A6B]/15">
            {tabs.map((tab) => {
              const c = tabContent[tab.key];
              return (
                <div key={tab.key} className={activeTab === tab.key ? "block" : "hidden"}>
                  <p className="text-xs font-semibold text-foreground/50 uppercase tracking-widest mb-1">Challenge</p>
                  <p className="text-base text-foreground/80 mb-4 leading-relaxed">{c.challenge}</p>
                  <p className="text-xs font-semibold text-foreground/50 uppercase tracking-widest mb-1">Astromar Solution</p>
                  <p className="text-base font-semibold text-foreground mb-5 leading-relaxed">{c.solution}</p>
                  <ul className="flex flex-wrap gap-3">
                    {c.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── S3: Stats ── */}
      <section className="py-16 bg-brand-light">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">SUPPLY CHAIN SCALE</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-10">
              Astromar's Supply Chain Solutions at a Glance
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { value: "500+",  label: "Clients Served",    desc: "Across industries"       },
              { value: "10",    label: "FTWZ Locations",    desc: "Pan-India hubs"          },
              { value: "48hrs", label: "Onboarding",        desc: "Fast go-live"            },
              { value: "99%",   label: "On-time Rate",      desc: "Delivery accuracy"       },
            ].map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.07}>
                <div className="bg-white rounded-xl border border-[#1B3A6B]/15 p-6 text-center shadow-sm h-full">
                  <p className="text-3xl sm:text-4xl font-extrabold text-orange-500 mb-1">{s.value}</p>
                  <p className="text-base font-bold text-foreground mb-1">{s.label}</p>
                  <p className="text-xs text-foreground/60 leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── S4: Image + Text ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">CAPABILITIES</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                End-to-End Supply Chain Management
              </h2>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-6">
                From FTWZ-bonded imports to last-mile delivery, Astromar's Supply Chain Solutions India manage every link with technology-driven visibility and dedicated operations teams.
              </p>
              <ul className="space-y-3">
                {[
                  "Inventory & warehouse management",
                  "Order fulfillment & distribution",
                  "Last-mile delivery solutions",
                  "Reverse logistics management",
                  "Supply chain analytics",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm md:text-base text-foreground/80">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="relative rounded-xl overflow-hidden h-96 shadow-md w-full">
                <Image
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80"
                  alt="Supply chain warehouse operations"
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── S5: Accordion ── */}
      <section className="py-16 bg-brand-light">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">SOLUTIONS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-8">
              Capabilities Across Supply Chain Companies
            </h2>
          </ScrollReveal>
          <div className="space-y-3">
            {accordionItems.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.06}>
                <div className="rounded-xl overflow-hidden border border-[#1B3A6B]/15 shadow-sm">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 bg-[#0a1628] text-white px-5 py-4 text-left hover:bg-[#0d1f38] transition-colors"
                  >
                    <span className="font-semibold text-sm sm:text-base">{item.title}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`bg-white border-l-4 border-[#f97316] px-5 py-4 ${openIndex === i ? "block" : "hidden"}`}>
                    <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── S6: Why Astromar ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">SUPPLY CHAIN EDGE</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-10">
              Why Choose Astromar for Supply Chain?
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {whyChoose.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.07}>
                <div className="border-l-4 border-orange-500 bg-brand-light rounded-r-xl p-6 h-full">
                  <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ServicesCarousel currentHref="/free-trade-zone-services/supply-chain" />

      <CTASection />

      <WhatsAppButton />
    </>
  );
};

export default SupplyChainClient;
