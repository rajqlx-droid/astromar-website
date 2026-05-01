"use client"
import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const accordionItems = [
  { title: "General FTWZ Storage",      body: "Duty-free bonded warehousing for all commodity types with flexible tenure and WMS integration. Real-time inventory visibility, automated alerts, and MIS reporting." },
  { title: "Cold Chain Storage",         body: "2-8°C and -20°C temperature controlled storage GDP-certified for pharma and perishables. Continuous temperature monitoring with automated alarms and audit trails." },
  { title: "Pharma Warehousing",         body: "Dedicated pharmaceutical storage with GDP compliance, batch tracking and audit trails. Segregated storage zones with restricted access and full documentation control." },
  { title: "Value-Added Services",       body: "Repacking, kitting, labelling, assembly and quality inspection within FTWZ premises. Barcode/RFID integration and serial number tracking for high-value goods." },
  { title: "Project Cargo Storage",      body: "Oversized and heavy cargo storage with specialized handling equipment. Heavy-bay storage, weighbridge access, and crane facilities for project cargo." },
];

const locationCards = [
  { city: "Chennai (Sriperumbudur)", type: "FTWZ", sqft: "80,000 sq ft",  tags: ["Electronics", "Auto"]      },
  { city: "Mumbai (JNPA)",           type: "FTWZ", sqft: "1,20,000 sq ft", tags: ["General", "Pharma"]        },
  { city: "Mumbai (Panvel)",         type: "FTWZ", sqft: "90,000 sq ft",  tags: ["FMCG", "Consumer"]         },
  { city: "Kochi",                   type: "FTWZ", sqft: "60,000 sq ft",  tags: ["Spices", "Perishables"]    },
  { city: "Vizag",                   type: "FTWZ", sqft: "50,000 sq ft",  tags: ["Bulk", "Industrial"]       },
  { city: "Delhi",                   type: "FTWZ", sqft: "70,000 sq ft",  tags: ["Electronics", "Fashion"]   },
];

const whyChoose = [
  { title: "Duty-Free FTWZ Bonded Storage",       desc: "Defer customs duty and GST until goods enter the domestic tariff area — ideal for import-heavy businesses." },
  { title: "Real-Time WMS Inventory Tracking",    desc: "Live stock dashboards, automated reorder triggers, and full RFID/barcode traceability across all locations." },
  { title: "Cold Chain & Pharma Certified",       desc: "GDP-compliant cold storage from -20°C to +8°C with continuous monitoring and full audit documentation." },
  { title: "8+ Strategic Port Locations",         desc: "FTWZ facilities near India's busiest ports and airports for fast inbound and outbound logistics." },
];

const Warehousing = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") =>
    carouselRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });

  return (
    <>
      <SEOHead
        title="Warehousing Services in India | AstroMar Logistics"
        description="Scalable warehousing across India — general, cold storage, bonded, and fulfillment. Real-time WMS, value-added services, and 24/7 security."
        ogImage="/og-home.jpg"
      />
      <Header />

      {/* ── Hero ── */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600"
          alt="Modern warehouse interior"
          fill
          className="absolute inset-0 object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="w-full px-6 md:px-12 lg:px-16 pt-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

            <ScrollReveal>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4">WAREHOUSING</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
                Warehousing & Storage Solutions Across India
              </h1>
              <p className="text-white/85 text-sm md:text-base leading-relaxed mb-8">
                From a single pallet to 5 lakh+ sq ft of dedicated FTWZ space, AstroMar provides flexible warehousing
                solutions with real-time inventory management, value-added services, and multi-temperature capabilities
                across India's key logistics hubs.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-500 text-white font-semibold text-sm rounded-lg py-3 px-6 transition-colors">
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
                    { value: "5L+ sqft", label: "Space"      },
                    { value: "8+",       label: "Locations"  },
                    { value: "GDP",      label: "Certified"  },
                    { value: "24/7",     label: "Security"   },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                      <p className="text-xl sm:text-2xl font-extrabold text-white leading-tight">{s.value}</p>
                      <p className="text-gray-300 text-xs mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
                <a href="#contact" className="inline-flex items-center gap-2 w-full justify-center bg-orange-500 hover:bg-orange-500 text-white font-semibold text-sm rounded-lg py-3 px-4 transition-colors">
                  Get Warehousing Rates <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── S2: Stats ── */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">INFRASTRUCTURE</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-10">
              Built for Modern Supply Chains
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { value: "5L+",  label: "Sq Ft Space",   desc: "Total FTWZ area"           },
              { value: "8+",   label: "Locations",     desc: "Pan-India network"          },
              { value: "GDP",  label: "Certified",     desc: "Pharma ready"               },
              { value: "24/7", label: "Security",      desc: "CCTV & access control"      },
            ].map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.07}>
                <div className="bg-slate-50 rounded-xl border border-gray-200 p-6 text-center shadow-sm h-full">
                  <p className="text-3xl sm:text-4xl font-extrabold text-orange-500 mb-1">{s.value}</p>
                  <p className="text-base font-bold text-foreground mb-1">{s.label}</p>
                  <p className="text-xs text-foreground/60 leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── S3: Image + Text ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative rounded-xl overflow-hidden h-96 shadow-md w-full">
                <Image
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
                  alt="Warehouse operations"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">OUR SERVICES</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                Warehousing Solutions for Every Need
              </h2>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-6">
                From ambient FTWZ bonded storage to GDP-certified cold chain, our pan-India warehouse network is
                equipped for every commodity type and compliance requirement.
              </p>
              <ul className="space-y-3">
                {[
                  "General FTWZ bonded storage",
                  "Cold chain temperature control",
                  "Pharma GDP-compliant storage",
                  "Kitting, labelling, repacking",
                  "Project & oversize cargo storage",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm md:text-base text-foreground/80">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── S4: Accordion ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">SERVICE TYPES</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-8">
              Warehouse Service Types
            </h2>
          </ScrollReveal>
          <div className="space-y-3">
            {accordionItems.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.06}>
                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 bg-[#0a1628] text-white px-5 py-4 text-left hover:bg-[#0d1f38] transition-colors"
                  >
                    <span className="font-semibold text-sm sm:text-base">{item.title}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`} />
                  </button>
                  {openIndex === i && (
                    <div className="bg-slate-50 border-l-4 border-[#f97316] px-5 py-4">
                      <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">{item.body}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── S5: Location Carousel ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">LOCATIONS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-8">
              Our Warehouse Network
            </h2>
          </ScrollReveal>
          <div className="relative">
            <button
              onClick={() => scroll("left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full shadow-md p-2 hover:bg-slate-50 transition-colors hidden md:flex"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
            >
              {locationCards.map((loc) => (
                <div key={loc.city} className="snap-start min-w-[240px] sm:min-w-[260px] bg-white border border-gray-200 rounded-xl p-5 shrink-0 shadow-sm">
                  <p className="text-base font-bold text-foreground mb-2">{loc.city}</p>
                  <span className="inline-block text-xs font-semibold text-orange-500 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 mb-3">
                    {loc.type}
                  </span>
                  <p className="text-sm text-foreground/70 mb-3">{loc.sqft}</p>
                  <div className="flex flex-wrap gap-1">
                    {loc.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-slate-100 text-foreground/70 rounded-full px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => scroll("right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full shadow-md p-2 hover:bg-slate-50 transition-colors hidden md:flex"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </section>

      {/* ── S6: Why Astromar ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">OUR ADVANTAGE</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-10">
              Why Choose Astromar for Warehousing?
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {whyChoose.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.07}>
                <div className="border-l-4 border-orange-500 bg-slate-50 rounded-r-xl p-6 h-full">
                  <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="max-w-2xl mx-auto text-center px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">Find Your Ideal Warehouse Solution</h2>
            <p className="text-foreground/80 max-w-2xl mx-auto mb-8">
              Flexible storage contracts from 30 days to multi-year. Get a customized warehousing proposal today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg py-3 px-6 transition-colors">
                Get a Quote <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/contact" className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-sm rounded-lg py-3 px-6 transition-colors">
                Contact Us
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Warehousing;
