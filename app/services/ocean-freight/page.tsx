"use client"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Ship, Globe, Package, Clock, Shield, BarChart3, ArrowRight, CheckCircle2,
  Anchor, MapPin, FileCheck,
} from "lucide-react";

const services = [
  { icon: Package, title: "Full Container Load (FCL)", desc: "Dedicated container shipments for large volumes. 20ft, 40ft, 40ft HC, open-top, flat-rack, and reefer containers available across all major trade lanes." },
  { icon: Ship, title: "Less than Container Load (LCL)", desc: "Cost-effective consolidation for smaller shipments. Share container space without compromising on transit time or cargo safety." },
  { icon: Globe, title: "Breakbulk & RoRo", desc: "Specialized handling for non-containerized cargo including vehicles, heavy machinery, and over-dimensional shipments." },
  { icon: Shield, title: "Reefer Containers", desc: "Temperature-controlled ocean freight for perishables, pharmaceuticals, and temperature-sensitive goods with real-time monitoring." },
];

const tradeLanes = [
  { region: "Asia Pacific", ports: "Shanghai, Singapore, Hong Kong, Busan, Tokyo, Bangkok", transit: "7–18 days" },
  { region: "Middle East", ports: "Jebel Ali, Dammam, Muscat, Kuwait", transit: "3–7 days" },
  { region: "Europe", ports: "Rotterdam, Hamburg, Felixstowe, Antwerp, Le Havre", transit: "18–25 days" },
  { region: "Americas", ports: "New York, Los Angeles, Houston, Santos", transit: "25–35 days" },
  { region: "Africa", ports: "Durban, Mombasa, Lagos, Dar es Salaam", transit: "10–18 days" },
];

const process = [
  { step: "01", title: "Rate Enquiry", desc: "Share cargo details — we provide competitive rates within 2 hours for standard lanes." },
  { step: "02", title: "Booking & Documentation", desc: "Confirmed booking with shipping line, SI preparation, and all export documentation handled." },
  { step: "03", title: "Cargo Pick-up", desc: "Container positioning at your warehouse, supervised stuffing, and seal verification." },
  { step: "04", title: "Port Operations", desc: "CFS handling, customs clearance, and vessel loading at origin port." },
  { step: "05", title: "In-Transit Tracking", desc: "Real-time vessel tracking, ETA updates, and proactive exception management." },
  { step: "06", title: "Destination Delivery", desc: "Customs clearance at destination, container de-stuffing, and final-mile delivery." },
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

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600"
          alt="Container ship at sea"
          fill
          className="absolute inset-0 object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 relative z-10">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3">OCEAN FREIGHT</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-foreground mb-4 max-w-4xl mx-auto">
              Global Ocean Freight Services from India
            </h1>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
              Whether you're shipping a single pallet or full containers, AstroMar Logistics offers reliable ocean freight
              solutions across 150+ global ports. FCL, LCL, breakbulk, and reefer — we handle it all with competitive rates
              and end-to-end visibility.
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="#contact">Get Ocean Freight Rates <ArrowRight className="w-4 h-4 ml-2" /></a>
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
              Ocean Freight Solutions
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

      {/* Trade Lanes */}
      <section className="py-14 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">GLOBAL REACH</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              Trade Lanes from India
            </h2>
          </ScrollReveal>
          <div className="max-w-5xl mx-auto space-y-4">
            {tradeLanes.map((t, i) => (
              <ScrollReveal key={t.region} delay={i * 0.07}>
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{t.region}</h3>
                      <p className="text-sm text-muted-foreground">{t.ports}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary whitespace-nowrap">{t.transit}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">OUR PROCESS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              How We Handle Your Shipment
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
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

      {/* Pan-India Port Coverage */}
      <section className="py-14 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">PORT NETWORK</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              Pan-India Port Coverage
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 text-sm leading-relaxed">
              We operate across India's major seaports on both coasts, giving you direct access to every key gateway.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <ScrollReveal delay={0.05}>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm h-full">
                <h3 className="text-base font-bold text-foreground mb-4">West Coast</h3>
                <ul className="space-y-2">
                  {["Mundra", "Kandla", "Mumbai (JNPA)", "Goa (Mormugao)", "Mangalore (NMPT)", "Cochin (ICTT / JNCT)"].map((port) => (
                    <li key={port} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      {port}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm h-full">
                <h3 className="text-base font-bold text-foreground mb-4">East &amp; South Coast</h3>
                <ul className="space-y-2">
                  {["Tuticorin (V.O. Chidambaranar)", "Chennai", "Vizag (Visakhapatnam)", "Kamarajar (Ennore)", "Haldia / Kolkata", "Paradip"].map((port) => (
                    <li key={port} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      {port}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.15}>
            <div className="max-w-4xl mx-auto">
              <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">SHIPMENT CAPABILITIES</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Full Container Load (FCL) – 20ft, 40ft, 40HC",
                  "Less than Container Load (LCL) consolidation",
                  "Project & over-dimensional cargo",
                  "Specialized cargo (reefer, open-top, flat-rack)",
                  "EXW, DAP, and DDP shipment execution",
                  "Multimodal – sea + inland road/rail delivery",
                ].map((cap) => (
                  <div key={cap} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-light">
        <div className="max-w-2xl mx-auto text-center px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">Ship Globally with Confidence</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Get competitive ocean freight rates and let our experienced team manage your international shipments end-to-end.
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

export default OceanFreight;

