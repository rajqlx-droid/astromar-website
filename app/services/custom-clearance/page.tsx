"use client"
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";

const steps = [
  { step: "01", title: "Document Review & HS Classification",  desc: "Collect and verify all shipping documents, classify goods under correct HS codes to ensure accurate duty calculation." },
  { step: "02", title: "Duty Assessment & Payment",            desc: "Calculate applicable duties, FTA benefits, and exemptions. Coordinate duty payment and confirm with customs authorities." },
  { step: "03", title: "Port Filing & Examination",            desc: "Electronic filing via ICEGATE, real-time status tracking, and coordination with customs officers for cargo examination." },
  { step: "04", title: "Cargo Release & Delivery",             desc: "Process out-of-charge, collect delivery order, and arrange final-mile delivery to your warehouse or customer." },
];

const accordionItems = [
  { title: "Import Customs Clearance",        body: "Complete import documentation, HS classification, duty calculation and port filing for all cargo types. Bill of Entry filing, examination coordination, and out-of-charge processing at all Indian ports and airports." },
  { title: "Export Customs Clearance",        body: "Shipping bill filing, export documentation, and customs examination coordination for all exporters. LEO processing, drawback claims, and export promotion scheme compliance." },
  { title: "SEZ & FTWZ Clearance",           body: "Specialized customs clearance for SEZ and FTWZ transactions including DTA removals, re-exports, and inter-unit transfers. Full compliance with SEZ rules and FTWZ regulations." },
  { title: "Duty Drawback & Exemptions",      body: "Filing and follow-up for duty drawback claims, advance authorization and EPCG license benefits. Maximize duty savings with expert HS classification and FTA utilization." },
  { title: "Post-Clearance Audit Support",    body: "Documentation review, compliance verification and representation during customs audits. Bond and bank guarantee management with penalty and dispute resolution." },
];

const whyChoose = [
  { title: "Licensed Customs Broker",             desc: "Fully licensed CHA with 15+ years of experience at all major Indian ports, airports, and inland ICDs." },
  { title: "Zero Compliance Penalties Record",    desc: "100% compliance rate with zero penalties or delays due to documentation errors or classification issues." },
  { title: "All Ports & ICDs Covered",            desc: "Nationwide clearance at sea ports, airports, land ICDs, and integrated check posts across India." },
  { title: "FTWZ Customs Specialists",            desc: "Deep expertise in FTWZ transactions, DTA removals, and duty deferment strategies for import-heavy businesses." },
];

const CustomClearance = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <SEOHead
        title="Custom Clearance Services India | AstroMar Logistics"
        description="Expert customs clearance for imports and exports at all Indian ports. HS classification, regulatory compliance, FTA advisory, and ICEGATE electronic filing."
        ogImage="/og-home.jpg"
      />
      <Header />

      {/* ── Hero ── */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600"
          alt="Customs and cargo documentation"
          fill
          className="absolute inset-0 object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="w-full px-6 md:px-12 lg:px-16 pt-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

            <ScrollReveal>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4">CUSTOM CLEARANCE</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
                Customs Clearance Services in India
              </h1>
              <p className="text-white/85 text-sm md:text-base leading-relaxed mb-8">
                Navigate India's complex customs landscape with confidence. AstroMar's licensed customs brokers
                handle all import and export clearances across every Indian port and airport — ensuring compliance,
                minimizing duty, and eliminating delays.
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
                    { value: "10K+",  label: "Cleared"      },
                    { value: "100%",  label: "Compliance"   },
                    { value: "24hrs", label: "Avg Time"      },
                    { value: "15+",   label: "Ports & ICDs" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                      <p className="text-xl sm:text-2xl font-extrabold text-white leading-tight">{s.value}</p>
                      <p className="text-gray-300 text-xs mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
                <a href="#contact" className="inline-flex items-center gap-2 w-full justify-center bg-orange-500 hover:bg-orange-500 text-white font-semibold text-sm rounded-lg py-3 px-4 transition-colors">
                  Get Clearance Support <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── S2: Step Process ── */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">CLEARANCE PROCESS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-14">
              How We Clear Your Cargo
            </h2>
          </ScrollReveal>
          <div className="relative">
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

      {/* ── S3: Stats ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">BY THE NUMBERS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-10">
              Our Customs Clearance Track Record
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { value: "10K+",  label: "Shipments Cleared",  desc: "Successfully processed"   },
              { value: "100%",  label: "Compliance Rate",    desc: "Zero penalties"            },
              { value: "24hrs", label: "Avg Clearance",      desc: "Express handling"          },
              { value: "15+",   label: "Ports & ICDs",       desc: "Pan-India coverage"        },
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
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">EXPERTISE</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-8">
              Our Customs Expertise
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
              <div className="relative rounded-xl overflow-hidden h-96 shadow-md w-full">
                <Image
                  src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80"
                  alt="Customs clearance documentation"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">WHY ASTROMAR</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                Clear Customs Faster & Smarter
              </h2>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-6">
                With 15+ years at India's busiest ports and a 100% compliance track record, our licensed
                customs brokers deliver fast, penalty-free clearance every time.
              </p>
              <ul className="space-y-3">
                {[
                  "Licensed customs broker",
                  "All ports & ICDs covered",
                  "FTWZ & SEZ expertise",
                  "Duty drawback filing",
                  "24-48hr clearance time",
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
              Why Choose Astromar for Customs Clearance?
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">Clear Customs Without the Hassle</h2>
            <p className="text-foreground/80 max-w-2xl mx-auto mb-8">
              Our licensed customs brokers ensure fast, compliant clearance at every Indian port. Contact us today.
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

export default CustomClearance;
