"use client"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  ClipboardCheck, FileCheck, Shield, Clock, Globe, ArrowRight,
  CheckCircle2, AlertTriangle, BarChart3, Scale, Plane,
} from "lucide-react";

const services = [
  { icon: FileCheck, title: "Import Clearance", desc: "Complete import customs clearance at all Indian ports and airports. Bill of Entry filing, duty assessment, examination coordination, and out-of-charge processing." },
  { icon: Globe, title: "Export Clearance", desc: "Shipping bill preparation, LEO (Let Export Order) processing, drawback claims, and export promotion scheme compliance." },
  { icon: Shield, title: "Regulatory Compliance", desc: "FSSAI, BIS, CDSCO, Plant Quarantine, and Wildlife clearances. We manage all regulatory approvals required for your cargo." },
  { icon: Scale, title: "Classification & Valuation", desc: "Expert HS code classification, customs valuation, and tariff advisory to minimize duty exposure and avoid penalties." },
];

const capabilities = [
  "ICEGATE electronic filing and EDI processing",
  "Advance Ruling application support",
  "Free Trade Agreement (FTA) utilization",
  "Anti-dumping and safeguard duty advisory",
  "SEZ, EOU, and FTWZ compliance",
  "Customs audit and assessment support",
  "Bond and bank guarantee management",
  "Penalty and dispute resolution",
  "SVB (Special Valuation Branch) cases",
  "Project imports under CTH 9801",
];

const process = [
  { step: "01", title: "Document Collection", desc: "We collect commercial invoice, packing list, BL/AWB, and origin certificates — verifying completeness before filing." },
  { step: "02", title: "Classification & Assessment", desc: "Expert HS code classification, duty calculation, and FTA benefit analysis to ensure accurate and optimized duty payment." },
  { step: "03", title: "Filing & Processing", desc: "Electronic filing via ICEGATE, duty payment coordination, and real-time status tracking through the customs portal." },
  { step: "04", title: "Examination & Release", desc: "Coordination with customs officers for cargo examination, out-of-charge processing, and delivery order collection." },
];

const CustomClearance = () => {
  return (
    <>
      <SEOHead
        title="Custom Clearance Services India | AstroMar Logistics"
        description="Expert customs clearance for imports and exports at all Indian ports. HS classification, regulatory compliance, FTA advisory, and ICEGATE electronic filing."
        ogImage="/og-home.jpg"
      />
      <Header />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600"
          alt="Customs and cargo documentation"
          fill
          className="absolute inset-0 object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container px-4 relative z-10">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary text-center mb-3">CUSTOM CLEARANCE</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-foreground mb-4 max-w-4xl mx-auto">
              Customs Clearance Services in India
            </h1>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
              Navigate India's complex customs landscape with confidence. AstroMar's licensed customs brokers
              handle all import and export clearances across every Indian port and airport — ensuring compliance,
              minimizing duty, and eliminating delays.
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="#contact">Get Clearance Support <ArrowRight className="w-4 h-4 ml-2" /></a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container px-4">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase text-center mb-3">OUR SERVICES</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12">
              Customs Brokerage Solutions
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.07}>
                <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm h-full hover:shadow-md transition-shadow">
                  <s.icon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container px-4">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase text-center mb-3">EXPERTISE</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12">
              Our Customs Expertise
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {capabilities.map((c, i) => (
              <ScrollReveal key={c} delay={i * 0.04}>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{c}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container px-4">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase text-center mb-3">CLEARANCE PROCESS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12">
              How We Clear Your Cargo
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {process.map((p, i) => (
              <ScrollReveal key={p.step} delay={i * 0.07}>
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm h-full">
                  <span className="text-3xl font-extrabold text-primary/20 mb-2 block">{p.step}</span>
                  <h3 className="text-base font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container px-4">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase text-center mb-3">CLEARANCE COVERAGE</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12">
              Where We Clear Your Cargo
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Plane, title: "Air Customs Clearance", desc: "Full import and export customs clearance at all major Indian international airports including Chennai, Mumbai, Delhi, Bengaluru, and Hyderabad." },
              { icon: Globe, title: "Sea Customs Clearance", desc: "Customs brokerage at all major Indian seaports — Chennai, JNPA, Mundra, Vizag, Cochin, Tuticorin, Haldia, and more." },
              { icon: Shield, title: "Land Border Clearance", desc: "Cross-border customs clearance at land ICDs and integrated check posts for trade with Nepal, Bangladesh, and Bhutan." },
              { icon: ClipboardCheck, title: "Trade Compliance Management", desc: "End-to-end compliance across import/export regulations, licensing, EXIM policy advisory, and duty optimization." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm h-full hover:shadow-md transition-shadow">
                  <item.icon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-brand-light">
        <div className="container px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">Clear Customs Without the Hassle</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Our licensed customs brokers ensure fast, compliant clearance at every Indian port. Contact us today.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href="#contact">Request a Quote <ArrowRight className="w-4 h-4 ml-2" /></a>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default CustomClearance;

