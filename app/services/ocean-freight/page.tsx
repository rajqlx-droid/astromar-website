"use client"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const tradeLanes = [
  { route: "Asia Pacific",  origin: "Mumbai, Chennai",  destination: "Singapore, China, Japan",         transit: "10–18 days" },
  { route: "Middle East",   origin: "Mumbai, Mundra",   destination: "Dubai, Jeddah, Kuwait",           transit: "5–10 days"  },
  { route: "Europe",        origin: "JNPA, Chennai",    destination: "Rotterdam, Hamburg, Felixstowe",  transit: "20–28 days" },
  { route: "Americas",      origin: "Mumbai, Kochi",    destination: "New York, Los Angeles, Houston",  transit: "22–30 days" },
  { route: "Africa",        origin: "Chennai, Vizag",   destination: "Mombasa, Durban, Lagos",          transit: "15–22 days" },
];

const steps = [
  { step: "01", title: "Booking & Space Confirmation",  desc: "Share cargo details and receive competitive rates within 2 hours. We confirm space with the shipping line and issue a booking confirmation." },
  { step: "02", title: "Documentation & Compliance",    desc: "Our team prepares all export documents — shipping instructions, BL, packing list, certificate of origin, and customs declarations." },
  { step: "03", title: "Port Handling & Loading",       desc: "Container positioning, supervised stuffing, CFS handling, customs clearance, and vessel loading at the origin port." },
  { step: "04", title: "Tracking & Delivery",           desc: "Real-time vessel tracking, ETA updates, destination customs clearance, and final-mile delivery to your door." },
];

const whyChoose = [
  { title: "Competitive Freight Rates",  desc: "Direct carrier relationships across 50+ trade lanes give you market-leading rates on FCL and LCL shipments." },
  { title: "End-to-End Visibility",      desc: "Live shipment tracking from origin port to final destination — no black holes in your supply chain." },
  { title: "FTWZ Integration",           desc: "Seamlessly defer customs duty on sea imports by routing cargo through our Free Trade Warehousing Zone facilities." },
  { title: "Dedicated Account Manager",  desc: "A single point of contact for every shipment — from rate enquiry to proof of delivery." },
];

const OceanFreight = () => {
  return (
    <>
      <SEOHead
        title="Ocean Freight Services – FCL & LCL | AstroMar Logistics"
        description="Global ocean freight services from India — FCL, LCL, breakbulk, and reefer shipments across all major trade lanes. Competitive rates, real-time tracking."
        ogImage="/og-freight.jpg"
      />
      <Header />

      {/* ── Hero ── */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600"
          alt="Container ship at sea"
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
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4">OCEAN FREIGHT</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
                Global Ocean Freight Services from India
              </h1>
              <p className="text-white/85 text-sm md:text-base leading-relaxed mb-8">
                Whether you're shipping a single pallet or full containers, AstroMar Logistics offers reliable ocean freight
                solutions across 150+ global ports. FCL, LCL, breakbulk, and reefer — we handle it all with competitive rates
                and end-to-end visibility.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-500 text-white font-semibold text-sm rounded-lg py-3 px-6 transition-colors"
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
                    { value: "50+",      label: "Trade Lanes" },
                    { value: "15+",      label: "Indian Ports" },
                    { value: "24/7",     label: "Tracking"    },
                    { value: "FCL & LCL", label: "Options"    },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                      <p className="text-xl sm:text-2xl font-extrabold text-white leading-tight">{stat.value}</p>
                      <p className="text-white/70 text-xs mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 w-full justify-center bg-orange-500 hover:bg-orange-500 text-white font-semibold text-sm rounded-lg py-3 px-4 transition-colors"
                >
                  Get Instant Quote <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── Section 2: Services — image + text split ── */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left — image */}
            <ScrollReveal>
              <div className="relative rounded-xl overflow-hidden h-96 shadow-md w-full">
                <Image
                  src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80"
                  alt="Cargo ships and containers"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </ScrollReveal>

            {/* Right — text + checklist */}
            <ScrollReveal delay={0.1}>
              <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">OUR SERVICES</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                Ocean Freight Solutions
              </h2>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-6">
                From a single LCL shipment to multiple full containers, we have the right solution for every cargo type and trade lane.
              </p>
              <ul className="space-y-3">
                {[
                  "FCL — 20ft, 40ft, 40HC containers",
                  "LCL consolidation for smaller cargo",
                  "Project & over-dimensional cargo",
                  "Reefer, open-top & flat-rack options",
                  "EXW, DAP, DDP shipment execution",
                  "Multimodal sea + inland road/rail",
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

      {/* ── Section 3: Trade Lanes Table ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">GLOBAL REACH</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-8">
              Trade Lanes from India
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              {/* Header */}
              <div className="grid grid-cols-4 bg-[#0a1628] text-white text-sm font-semibold">
                <div className="p-4 border-r border-white/10">Route</div>
                <div className="p-4 border-r border-white/10">Origin Ports</div>
                <div className="p-4 border-r border-white/10">Destination</div>
                <div className="p-4">Transit Time</div>
              </div>
              {/* Rows */}
              {tradeLanes.map((lane, i) => (
                <div
                  key={lane.route}
                  className={`grid grid-cols-4 text-sm ${i % 2 === 0 ? "bg-white" : "bg-[#eef2f7]"}`}
                >
                  <div className="p-4 border-r border-gray-200 font-semibold text-foreground">{lane.route}</div>
                  <div className="p-4 border-r border-gray-200 text-foreground/80">{lane.origin}</div>
                  <div className="p-4 border-r border-gray-200 text-foreground/80">{lane.destination}</div>
                  <div className="p-4 font-semibold text-primary">{lane.transit}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Section 4: Process Steps ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">OUR PROCESS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-14">
              How We Handle Your Shipment
            </h2>
          </ScrollReveal>
          <div className="relative">
            {/* Dashed connector — desktop only */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0 border-t-2 border-dashed border-orange-300 z-0" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
              {steps.map((s, i) => (
                <ScrollReveal key={s.step} delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-extrabold mb-4 shadow-md shrink-0">
                      {s.step}
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2">{s.title}</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">{s.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Stats Row ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">BY THE NUMBERS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-10">
              Astromar Ocean Freight at a Glance
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { value: "50+",     label: "Trade Lanes",         desc: "Connecting India to global markets" },
              { value: "15+",     label: "Port Partnerships",   desc: "Major Indian ports covered"         },
              { value: "22 Days", label: "Avg Transit Time",    desc: "Door to door delivery"              },
              { value: "24/7",    label: "Shipment Tracking",   desc: "Real-time cargo visibility"         },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.07}>
                <div className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm h-full">
                  <p className="text-3xl sm:text-4xl font-extrabold text-orange-500 mb-1">{stat.value}</p>
                  <p className="text-base font-bold text-foreground mb-1">{stat.label}</p>
                  <p className="text-xs text-foreground/60 leading-relaxed">{stat.desc}</p>
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
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">OUR ADVANTAGE</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-10">
              Why Choose Astromar for Ocean Freight?
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

export default OceanFreight;
