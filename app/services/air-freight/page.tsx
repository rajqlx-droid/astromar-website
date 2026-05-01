"use client"
import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const accordionItems = [
  { title: "Express Air Freight",       body: "Time-critical shipments delivered within 24-48 hours to major global destinations. Priority handling and dedicated capacity for urgent cargo." },
  { title: "Standard Air Freight",      body: "Cost-optimized air cargo for non-urgent shipments with flexible routing options. Ideal for regular shipments with 2–5 day transit windows." },
  { title: "Pharma & Cold Chain Air",   body: "Temperature-controlled air freight GDP-compliant for pharmaceutical and biotech cargo. Active and passive temperature solutions maintained throughout." },
  { title: "DGR & Hazardous Cargo",     body: "IATA-certified dangerous goods handling with full documentation and compliance support. Certified agents for all DGR classes and packing groups." },
  { title: "Charter & Oversize Cargo",  body: "Full aircraft charter for time-critical or oversized cargo that cannot be palletized. Part and full charters on dedicated freighter aircraft." },
];

const destinations = [
  { region: "Middle East",   hubs: "Dubai, Abu Dhabi, Doha",           transit: "1–2 days" },
  { region: "Europe",        hubs: "London, Frankfurt, Paris",          transit: "2–3 days" },
  { region: "Americas",      hubs: "New York, Los Angeles, Chicago",    transit: "3–4 days" },
  { region: "Asia Pacific",  hubs: "Singapore, Hong Kong, Tokyo",       transit: "1–3 days" },
  { region: "Africa",        hubs: "Nairobi, Johannesburg, Lagos",      transit: "2–4 days" },
  { region: "Australia",     hubs: "Sydney, Melbourne",                 transit: "3–5 days" },
];

const whyChoose = [
  { title: "Fastest Transit Times in Market",    desc: "Express options connect India to 100+ destinations with industry-leading transit times and same-day booking confirmation." },
  { title: "Pharma & DGR Certified Handling",    desc: "GDP-compliant and IATA DGR certified for pharmaceutical, biotech, and hazardous goods with full audit trails." },
  { title: "FTWZ Air Import Integration",        desc: "Route air imports through our FTWZ facilities to defer customs duty and optimize landed cost on high-value goods." },
  { title: "Dedicated Air Freight Desk",         desc: "A specialist team manages your air freight end-to-end — from rate enquiry and booking to AWB tracking and final delivery." },
];

const AirFreight = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") =>
    carouselRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });

  return (
    <>
      <SEOHead
        title="Air Freight Services from India | AstroMar Logistics"
        description="Express and standard air freight from India to 200+ destinations. Time-critical, temperature-controlled, and charter air cargo with real-time tracking."
        ogImage="/og-freight.jpg"
      />
      <Header />

      {/* ── Hero ── */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600"
          alt="Cargo aircraft"
          fill
          className="absolute inset-0 object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="w-full px-6 md:px-12 lg:px-16 pt-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

            <ScrollReveal>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4">AIR FREIGHT</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
                Air Freight Services from India to the World
              </h1>
              <p className="text-white/85 text-sm md:text-base leading-relaxed mb-8">
                When speed matters, trust AstroMar's air freight solutions. From express next-day delivery to charter
                services for oversized cargo, we connect India to 100+ destinations worldwide with reliable,
                trackable air cargo.
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
                    { value: "100+", label: "Destinations" },
                    { value: "24hrs", label: "Avg Delivery" },
                    { value: "DGR",  label: "Certified"    },
                    { value: "24/7", label: "Tracking"     },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                      <p className="text-xl sm:text-2xl font-extrabold text-white leading-tight">{s.value}</p>
                      <p className="text-gray-300 text-xs mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
                <a href="#contact" className="inline-flex items-center gap-2 w-full justify-center bg-orange-500 hover:bg-orange-500 text-white font-semibold text-sm rounded-lg py-3 px-4 transition-colors">
                  Get Instant Quote <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── S2: Accordion — service types ── */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">OUR SERVICES</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-8">
              Air Freight Solutions
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

      {/* ── S3: Stats ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">BY THE NUMBERS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-10">
              Air Freight at a Glance
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { value: "100+",  label: "Destinations",  desc: "Global coverage"       },
              { value: "24hrs", label: "Avg Transit",   desc: "Express delivery"      },
              { value: "DGR",   label: "Certified",     desc: "Hazmat handling"       },
              { value: "24/7",  label: "Support",       desc: "Real-time updates"     },
            ].map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.07}>
                <div className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm h-full">
                  <p className="text-3xl sm:text-4xl font-extrabold text-orange-500 mb-1">{s.value}</p>
                  <p className="text-base font-bold text-foreground mb-1">{s.label}</p>
                  <p className="text-xs text-foreground/60 leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── S4: Destination Carousel ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">GLOBAL NETWORK</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-8">
              Key Air Cargo Destinations
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
              {destinations.map((d) => (
                <div key={d.region} className="snap-start min-w-[260px] sm:min-w-[280px] bg-slate-50 border border-gray-200 rounded-xl p-6 shrink-0">
                  <p className="text-base font-bold text-foreground mb-1">{d.region}</p>
                  <p className="text-sm text-foreground/70 mb-3 leading-relaxed">{d.hubs}</p>
                  <span className="inline-block text-xs font-semibold text-orange-500 bg-orange-50 border border-orange-200 rounded-full px-3 py-1">
                    {d.transit}
                  </span>
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

      {/* ── S5: Image + Text ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative rounded-xl overflow-hidden h-96 shadow-md w-full">
                <Image
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80"
                  alt="Air cargo operations"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">WHY AIR FREIGHT</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                End-to-End Air Cargo Capabilities
              </h2>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-6">
                From IATA-certified DGR handling to GDP-compliant pharma air freight, our specialist team manages
                every detail so your cargo arrives on time and in perfect condition.
              </p>
              <ul className="space-y-3">
                {[
                  "IATA certified air freight agent",
                  "Express & standard options",
                  "Real-time AWB tracking",
                  "Door-to-door delivery",
                  "Customs pre-clearance",
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

      {/* ── S6: Why Astromar ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">OUR ADVANTAGE</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-10">
              Why Choose Astromar for Air Freight?
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

      <CTASection />

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default AirFreight;
