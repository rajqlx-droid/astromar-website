"use client"
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";

const accordionItems = [
  { title: "Oil & Gas",                    body: "Reactors, pressure vessels and processing equipment with SPMT and heavy lift solutions. Full route survey, permit management, and engineered lashing for critical assets." },
  { title: "Power & Energy",               body: "Transformers, turbines and generators with engineered lashing and specialized transport. Wind turbine components and solar infrastructure with multi-axle trailer solutions." },
  { title: "Infrastructure & Construction", body: "Steel structures, precast elements and construction equipment nationwide. Bridge girders, metro rail components, and large-scale infrastructure project logistics." },
  { title: "Renewable Energy",             body: "Wind turbine blades, towers and solar panel equipment with special trailers. Blade transport with specialized dollies, police escorts, and route planning." },
  { title: "Defence & Aerospace",          body: "Sensitive equipment handling with security clearance and specialized packaging. Compliance with defence procurement protocols and restricted area delivery." },
];

const whyChoose = [
  { title: "ODC & Heavy Lift Specialists",       desc: "Dedicated project cargo team with expertise in ODC transport, SPMT operations, and heavy lift coordination." },
  { title: "Engineered Transport Solutions",     desc: "Every project move is engineered — route surveys, structural calculations, and custom rigging plans for safe execution." },
  { title: "Pan-India Execution Network",        desc: "In-house capabilities across all major Indian ports, highways, and project sites with a nationwide operator network." },
  { title: "Insurance & Risk Management",        desc: "Comprehensive cargo insurance, risk assessment, and contingency planning for every project cargo movement." },
];

const Projects = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <SEOHead
        title="Project Cargo & Heavy-Lift Logistics | AstroMar Logistics"
        description="Specialized project cargo logistics in India — heavy-lift, ODC, breakbulk, and turnkey project transport for energy, infrastructure, and industrial sectors."
        ogImage="/og-home.jpg"
      />
      <Header />

      {/* ── Hero ── */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600"
          alt="Heavy lift crane and industrial cargo"
          fill
          className="absolute inset-0 object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="w-full px-6 md:px-12 lg:px-16 pt-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

            <ScrollReveal>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4">PROJECT CARGO</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
                Project Cargo & Heavy-Lift Logistics
              </h1>
              <p className="text-white/85 text-sm md:text-base leading-relaxed mb-8">
                Moving the unmovable. AstroMar specializes in the transport of oversized, overweight, and high-value
                project cargo across India and globally. From route surveys to final placement, we engineer every move
                with precision, safety, and reliability.
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
                    { value: "ODC",         label: "Specialists"   },
                    { value: "500+",        label: "Projects"      },
                    { value: "Multi-modal", label: "Solutions"     },
                    { value: "24/7",        label: "Site Support"  },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                      <p className="text-xl sm:text-2xl font-extrabold text-white leading-tight">{s.value}</p>
                      <p className="text-gray-300 text-xs mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
                <a href="#contact" className="inline-flex items-center gap-2 w-full justify-center bg-orange-500 hover:bg-orange-500 text-white font-semibold text-sm rounded-lg py-3 px-4 transition-colors">
                  Discuss Your Project <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── S2: Zigzag ── */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

          {/* Row 1 — text left, image right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">OUR SERVICES</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                End-to-End Project Logistics
              </h2>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-6">
                From heavy-lift cranes to SPMT multi-axle trailers, we have the equipment, expertise, and network
                to move any project cargo safely across India and internationally.
              </p>
              <ul className="space-y-3">
                {[
                  "Heavy lift & oversized cargo",
                  "ODC transport & route surveys",
                  "Breakbulk & neo-bulk shipping",
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
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                  alt="Heavy lift industrial project cargo"
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
                  src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80"
                  alt="Industrial plant and machinery"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">TURNKEY SOLUTIONS</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                Turnkey Project Cargo Execution
              </h2>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-6">
                From plant relocation to EPC project logistics, our specialist teams coordinate every movement
                across multiple modes with real-time visibility and dedicated site support.
              </p>
              <ul className="space-y-3">
                {[
                  "Plant & machinery relocation",
                  "EPC & turnkey project logistics",
                  "Multi-modal coordination",
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

      {/* ── S3: Stats ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">BY THE NUMBERS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-10">
              Project Cargo at a Glance
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { value: "500+",   label: "Projects Done",   desc: "Successfully delivered"    },
              { value: "50T+",   label: "Max Lift",        desc: "Heavy equipment"           },
              { value: "Multi",  label: "Modal",           desc: "Sea, air, road, rail"      },
              { value: "24/7",   label: "Site Support",    desc: "Dedicated team"            },
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

      {/* ── S4: Accordion ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">SECTORS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-8">
              Industry Sectors We Serve
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

      {/* ── S5: Image + Text ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">CAPABILITIES</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                End-to-End Project Capabilities
              </h2>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-6">
                Every project cargo movement is backed by detailed planning, engineering support, and a dedicated
                operations team to ensure zero surprises from origin to final installation.
              </p>
              <ul className="space-y-3">
                {[
                  "Route survey & feasibility study",
                  "Engineered transport solutions",
                  "Insurance & risk management",
                  "Pan-India execution network",
                  "Real-time project tracking",
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
                  src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80"
                  alt="Project cargo transport"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
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
              Why Choose Astromar for Project Cargo?
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">Plan Your Project Cargo With Us</h2>
            <p className="text-foreground/80 max-w-2xl mx-auto mb-8">
              Our project cargo team has moved 500+ oversized shipments. Let's engineer the perfect solution for yours.
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

export default Projects;
