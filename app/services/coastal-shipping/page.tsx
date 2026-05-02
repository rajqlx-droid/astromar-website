"use client"
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";

const routes = [
  { route: "West Coast",  origin: "Mumbai (JNPA)", destination: "Kochi, Mangalore",    transit: "2–3 days" },
  { route: "East Coast",  origin: "Chennai",        destination: "Vizag, Kolkata",       transit: "3–4 days" },
  { route: "Cross Coast", origin: "Mumbai",          destination: "Chennai, Ennore",      transit: "4–5 days" },
  { route: "Northern",    origin: "Mundra",          destination: "Paradip, Haldia",      transit: "5–6 days" },
  { route: "Southern",    origin: "Kochi",           destination: "Tuticorin, Chennai",   transit: "1–2 days" },
];

const accordionItems = [
  {
    title: "Bulk Cargo (Coal, Fertilizers, Grain)",
    body: "Large volume bulk commodities shipped between major ports efficiently. One vessel can carry the equivalent of 700 truckloads, dramatically reducing per-unit transport cost.",
  },
  {
    title: "Container & General Cargo",
    body: "FCL and LCL containerized cargo along India's coastline. Seamlessly linked with our pan-India inland distribution network for port-to-door delivery.",
  },
  {
    title: "Liquid & Chemical Tankers",
    body: "Certified tanker services for chemicals, petroleum, edible oils, and liquid cargo with ISO tank containers and full regulatory compliance.",
  },
  {
    title: "RoRo & Project Cargo",
    body: "Roll-on roll-off services for vehicles, heavy machinery, and oversized project equipment between major Indian ports with specialized handling.",
  },
  {
    title: "Break-Bulk Cargo",
    body: "Loose cargo items such as steel coils, machinery parts, timber, and bagged commodities handled with care and packed securely for coastal transit.",
  },
];

const whyChoose = [
  { title: "30% Cheaper Than Road Transport",       desc: "One coastal vessel replaces 700 trucks — dramatically cutting per-unit freight cost on long domestic hauls." },
  { title: "All 12+ Major Indian Ports Covered",    desc: "Pan-India port presence on both coasts gives you direct access to every key domestic logistics gateway." },
  { title: "Eco-Friendly Lower Carbon Shipping",    desc: "Coastal shipping produces ~47% less CO₂ than road transport, supporting your sustainability targets." },
  { title: "FTWZ Port Integration",                 desc: "Seamlessly connect coastal shipments with FTWZ facilities for duty deferment and bonded warehousing." },
];

const CoastalShipping = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <SEOHead
        title="Coastal Shipping Services in India | AstroMar Logistics"
        description="Cost-effective domestic coastal shipping across India's major ports. Save up to 40% on transport costs with eco-friendly sea freight — bulk, container, and project cargo."
        ogImage="/og-home.jpg"
      />
      <Header />

      {/* ── Hero ── */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600"
          alt="Coastal vessel"
          fill
          className="absolute inset-0 object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="w-full px-6 md:px-12 lg:px-16 pt-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

            {/* Left — text */}
            <ScrollReveal>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4">COASTAL SHIPPING</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
                Domestic Coastal Shipping Services Across India
              </h1>
              <p className="text-white/85 text-sm md:text-base leading-relaxed mb-8">
                Move cargo efficiently along India's 7,500+ km coastline. Our coastal shipping services connect
                all major and minor Indian ports, offering a greener, more cost-effective alternative to road and
                rail freight for bulk, containerized, and project cargo.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg py-3 px-6 transition-colors"
                >
                  Get a Quote <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white/10 font-semibold text-sm rounded-lg py-3 px-6 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </ScrollReveal>

            {/* Right — floating stats card */}
            <ScrollReveal delay={0.12}>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <p className="text-xs font-semibold tracking-widest uppercase text-orange-500 mb-4">AT A GLANCE</p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { value: "12+",       label: "Major Ports"   },
                    { value: "30%",       label: "Cost Saving"   },
                    { value: "Bulk",      label: "& Break-bulk"  },
                    { value: "24/7",      label: "Operations"    },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                      <p className="text-xl sm:text-2xl font-extrabold text-white leading-tight">{stat.value}</p>
                      <p className="text-gray-300 text-xs mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 w-full justify-center bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg py-3 px-4 transition-colors"
                >
                  Get Instant Quote <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── Section 2: Zigzag ── */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

          {/* Row 1 — text left, image right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">WHY COASTAL SHIPPING</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                The Smarter Way to Move Cargo Domestically
              </h2>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-6">
                Coastal shipping is India's most underutilised transport mode. It offers reliability, scale, and
                sustainability that road transport simply cannot match for long-haul domestic cargo.
              </p>
              <ul className="space-y-3">
                {[
                  "Bulk & break-bulk cargo",
                  "Container coastal movement",
                  "RoRo and project cargo",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm md:text-base text-foreground/80">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="relative rounded-xl overflow-hidden h-64 shadow-md w-full">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                  alt="Coastal shipping vessels"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Row 2 — image left, text right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
            <ScrollReveal>
              <div className="relative rounded-xl overflow-hidden h-64 shadow-md w-full">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                  alt="Port operations and cargo"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">CARGO TYPES</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                What We Ship Coastally
              </h2>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-6">
                From liquid bulk and chemicals to containerized goods and project cargo — our coastal network handles
                every commodity type with specialized vessels and port expertise.
              </p>
              <ul className="space-y-3">
                {[
                  "Chemical tanker services",
                  "Port-to-port delivery",
                  "Integrated inland delivery",
                  "Real-time vessel tracking",
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

      {/* ── Section 3: Route Table ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">ROUTE NETWORK</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-8">
              Key Coastal Shipping Routes
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              {/* Header */}
              <div className="grid grid-cols-4 bg-[#0a1628] text-white text-sm font-semibold">
                <div className="p-4 border-r border-white/10">Route</div>
                <div className="p-4 border-r border-white/10">Origin Port</div>
                <div className="p-4 border-r border-white/10">Destination Port</div>
                <div className="p-4">Transit Time</div>
              </div>
              {/* Rows — alternating #ffffff / #f1f5f9 (slate-100) for contrast vs slate-50 section */}
              {routes.map((r, i) => (
                <div
                  key={r.route}
                  className={`grid grid-cols-4 text-sm ${i % 2 === 0 ? "bg-white" : "bg-slate-100"}`}
                >
                  <div className="p-4 border-r border-gray-200 font-semibold text-foreground">{r.route}</div>
                  <div className="p-4 border-r border-gray-200 text-foreground/80">{r.origin}</div>
                  <div className="p-4 border-r border-gray-200 text-foreground/80">{r.destination}</div>
                  <div className="p-4 font-semibold text-primary">{r.transit}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Section 4: Stats Row ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">COASTAL REACH</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-10">
              Coastal Shipping at a Glance
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { value: "12+",  label: "Major Ports",    desc: "Pan-India port coverage"       },
              { value: "30%",  label: "Cost Saving",    desc: "vs road transport"              },
              { value: "500+", label: "Vessels",        desc: "In our network"                 },
              { value: "Eco",  label: "Friendly",       desc: "Lower carbon footprint"         },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.07}>
                <div className="bg-slate-50 rounded-xl border border-gray-200 p-6 text-center shadow-sm h-full">
                  <p className="text-3xl sm:text-4xl font-extrabold text-orange-500 mb-1">{stat.value}</p>
                  <p className="text-base font-bold text-foreground mb-1">{stat.label}</p>
                  <p className="text-xs text-foreground/60 leading-relaxed">{stat.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Accordion — Cargo Types ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">CARGO TYPES</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-8">
              What We Handle Coastally
            </h2>
          </ScrollReveal>
          <div className="space-y-3">
            {accordionItems.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.06}>
                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                  {/* Header */}
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between gap-4 bg-[#0a1628] text-white px-5 py-4 text-left hover:bg-[#0d1f38] transition-colors"
                  >
                    <span className="font-semibold text-sm sm:text-base">{item.title}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {/* Body */}
                  {openIndex === i && (
                    <div className="bg-white border-l-4 border-orange-500 px-5 py-4">
                      <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">{item.body}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Why Choose Astromar ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">COASTAL EXPERTISE</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-10">
              Why Choose Astromar for Coastal Shipping?
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

export default CoastalShipping;
