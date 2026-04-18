"use client"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Box, Truck, Shield, Clock, Globe, ArrowRight, CheckCircle2,
  Anchor, Settings, FileCheck, Ruler, Construction,
} from "lucide-react";

const services = [
  { icon: Construction, title: "Heavy-Lift Cargo", desc: "Specialized handling of cargo exceeding standard weight limits — turbines, generators, transformers, and heavy industrial equipment up to 500+ tonnes." },
  { icon: Ruler, title: "Over-Dimensional Cargo", desc: "Transport of out-of-gauge shipments including wind turbine blades, reactor vessels, columns, and large structural components." },
  { icon: Anchor, title: "Breakbulk & RoRo", desc: "Non-containerized cargo movement via breakbulk vessels and Roll-on/Roll-off services for vehicles, machinery, and rolling stock." },
  { icon: Settings, title: "Turnkey Project Logistics", desc: "Complete project logistics from factory to foundation — route surveys, permit management, and multi-modal transport coordination." },
];

const sectors = [
  { title: "Automotive & Manufacturing", desc: "Press lines, CNC machinery, robotic assembly systems, stamping equipment, and production line components for automotive OEMs and tier-1 suppliers." },
  { title: "Power & Energy", desc: "Turbines, boilers, transformers, solar panels, and wind energy components including nacelles, towers, and blades." },
  { title: "Infrastructure", desc: "Pre-cast concrete segments, steel structures, bridge girders, and metro rail components for national infrastructure projects." },
  { title: "Mining & Metals", desc: "Excavators, crushers, conveyor systems, and process plant equipment for mining and metal processing facilities." },
  { title: "Pharmaceuticals & Healthcare", desc: "GDP-compliant transport of manufacturing equipment, cold chain infrastructure, bioreactors, and cleanroom installations for pharma and medical device facilities." },
  { title: "Defence & Aerospace", desc: "Classified cargo handling with security escorts, restricted area delivery, and compliance with defence procurement protocols." },
];

const capabilities = [
  "Route survey and feasibility studies",
  "Customs and port authority liaison",
  "Heavy-lift crane and rigging services",
  "Multi-axle hydraulic trailer transport",
  "Barge and coastal vessel chartering",
  "Police and civil authority permissions",
  "Road strengthening and bridge assessments",
  "Real-time GPS tracking of all movements",
  "Comprehensive cargo insurance",
  "Safety management and HSE compliance",
];

const Projects = () => {
  return (
    <>
      <SEOHead
        title="Project Cargo & Heavy-Lift Logistics | AstroMar Logistics"
        description="Specialized project cargo logistics in India — heavy-lift, ODC, breakbulk, and turnkey project transport for energy, infrastructure, and industrial sectors."
        ogImage="/og-home.jpg"
      />
      <Header />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200"
          alt="Heavy lift crane and industrial cargo"
          fill
          className="absolute inset-0 object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="w-full px-6 md:px-12 lg:px-16 py-24 relative z-10">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3">PROJECT CARGO</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-foreground mb-4 max-w-4xl mx-auto">
              Project Cargo & Heavy-Lift Logistics
            </h1>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
              Moving the unmovable. AstroMar specializes in the transport of oversized, overweight, and high-value
              project cargo across India and globally. From route surveys to final placement, we engineer every move
              with precision, safety, and reliability.
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="#contact">Discuss Your Project <ArrowRight className="w-4 h-4 ml-2" /></a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section className="py-14 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">OUR SERVICES</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              Project Logistics Solutions
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

      {/* Sectors */}
      <section className="py-14 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">SECTORS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              Industry Sectors We Serve
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
            {sectors.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.07}>
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm h-full hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-14 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">CAPABILITIES</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              End-to-End Project Capabilities
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

      {/* CTA */}
      <section className="py-14 bg-brand-light">
        <div className="max-w-2xl mx-auto text-center px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">Have a Complex Cargo Challenge?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Our project cargo team has moved 10,000+ oversized shipments. Let's engineer the perfect solution for yours.
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

export default Projects;

