"use client"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  GitBranch, BarChart3, Package, Truck, Globe, Shield, Clock, ArrowRight,
  CheckCircle2, Settings, Layers, Warehouse,
} from "lucide-react";

const solutions = [
  { icon: Warehouse, title: "Inventory Management", desc: "AI-powered inventory optimization with demand forecasting, safety stock calculations, and automated reorder triggers across multiple locations." },
  { icon: Truck, title: "Distribution & Fulfillment", desc: "End-to-end order fulfillment from pick-pack-ship to last-mile delivery. Multi-channel fulfillment for e-commerce, retail, and B2B." },
  { icon: Globe, title: "Procurement & Sourcing", desc: "Strategic sourcing support, vendor management, and purchase order tracking to streamline your inbound supply chain." },
  { icon: Layers, title: "Network Design", desc: "Supply chain network optimization including warehouse location analysis, transportation modeling, and cost-to-serve studies." },
  { icon: BarChart3, title: "Analytics & Visibility", desc: "Real-time dashboards, KPI tracking, and predictive analytics to identify bottlenecks and optimize throughput." },
  { icon: Settings, title: "Process Automation", desc: "Workflow automation for order processing, invoicing, compliance documentation, and exception management." },
];

const industries = [
  { title: "Automotive", desc: "Just-in-time delivery, sequencing, and line-side supply for OEMs and tier-1 suppliers across India." },
  { title: "Electronics & Hi-Tech", desc: "Reverse logistics, serial number tracking, and high-security handling for electronics and semiconductor components." },
  { title: "FMCG & Retail", desc: "High-velocity distribution networks with seasonal surge management and multi-channel fulfillment." },
  { title: "Pharmaceuticals", desc: "GDP-compliant cold chain, batch tracking, and regulatory documentation for pharma distribution." },
  { title: "Industrial & Engineering", desc: "Heavy cargo handling, project logistics coordination, and spare parts management for manufacturing." },
  { title: "E-Commerce", desc: "Scalable fulfillment with same-day/next-day delivery, returns management, and marketplace integration." },
];

const SupplyChain = () => {
  return (
    <>
      <SEOHead
        title="Supply Chain Solutions in India | AstroMar Logistics"
        description="End-to-end supply chain management — inventory optimization, distribution, fulfillment, and analytics. AI-powered visibility across your entire supply chain."
        ogImage="/og-home.jpg"
      />
      <Header />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1600"
          alt="Supply chain and logistics"
          fill
          className="absolute inset-0 object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 relative z-10">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3">SUPPLY CHAIN</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-foreground mb-4 max-w-4xl mx-auto">
              Integrated Supply Chain Solutions
            </h1>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
              From procurement to last-mile delivery, AstroMar designs and manages supply chains that reduce costs,
              improve speed, and build resilience. Our technology-driven approach gives you real-time visibility and
              control across every node in your supply chain.
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="#contact">Optimize Your Supply Chain <ArrowRight className="w-4 h-4 ml-2" /></a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-14 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">OUR SOLUTIONS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              Supply Chain Capabilities
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
            {solutions.map((s, i) => (
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

      {/* Industries */}
      <section className="py-14 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">INDUSTRIES</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              Industry-Specific Supply Chain Expertise
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
            {industries.map((ind, i) => (
              <ScrollReveal key={ind.title} delay={i * 0.07}>
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm h-full hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-foreground mb-2">{ind.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{ind.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Domestic Distribution */}
      <section className="py-14 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">DOMESTIC LOGISTICS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              Pan-India Distribution Network
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6 text-sm leading-relaxed">
              Our domestic transport and distribution capabilities connect your supply chain from port to end customer across India.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Truck, title: "Domestic Transportation", desc: "Full truckload (FTL) and part truckload (PTL) services across India with GPS-tracked fleet and real-time delivery updates." },
              { icon: Package, title: "Last-Mile Delivery", desc: "Hyper-local delivery networks in metro and Tier-2 cities with same-day and next-day options for B2B and B2C shipments." },
              { icon: Globe, title: "Pan-India Distribution", desc: "Multi-modal distribution network covering 500+ cities. From major ports and FTWZs to factory gates and retail outlets nationwide." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm h-full hover:shadow-md transition-shadow">
                  <item.icon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">Transform Your Supply Chain</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Let our supply chain experts design a solution tailored to your industry, scale, and growth ambitions.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href="#contact">Schedule a Consultation <ArrowRight className="w-4 h-4 ml-2" /></a>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default SupplyChain;

