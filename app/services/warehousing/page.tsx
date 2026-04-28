"use client"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Warehouse, Package, Shield, Clock, BarChart3, ArrowRight,
  CheckCircle2, Thermometer, Layers, Settings,
} from "lucide-react";

const solutions = [
  { icon: Warehouse, title: "General Warehousing", desc: "High-bay racking, bulk storage, and floor stacking in secure, fire-protected facilities across major Indian cities." },
  { icon: Thermometer, title: "Cold Storage", desc: "Temperature-controlled zones from -25°C to +25°C for pharmaceuticals, perishables, and chemicals with GDP compliance." },
  { icon: Package, title: "Fulfillment Center", desc: "Pick-pack-ship operations for e-commerce and retail with same-day dispatch, returns processing, and multi-channel integration." },
  { icon: Shield, title: "Bonded Warehousing", desc: "Licensed customs-bonded facilities for duty deferment on imported goods with full regulatory compliance." },
  { icon: Layers, title: "Cross-Docking", desc: "Rapid transshipment services to minimize storage time and accelerate distribution to final destinations." },
  { icon: Settings, title: "Value-Added Services", desc: "Repacking, labeling, kitting, quality inspection, bar-coding, and shrink-wrapping under one roof." },
];

const features = [
  "24/7 CCTV surveillance and access control",
  "Fire detection and suppression systems",
  "Real-time WMS with barcode/RFID tracking",
  "Automated inventory reporting and alerts",
  "Pest control and fumigation services",
  "Loading dock with hydraulic levelers",
  "Weighbridge and material handling equipment",
  "Insurance coverage for stored goods",
];

const locations = [
  { city: "Chennai", capacity: "200,000 sq ft", type: "General, Cold, Bonded" },
  { city: "Mumbai", capacity: "150,000 sq ft", type: "General, Fulfillment" },
  { city: "Delhi NCR", capacity: "180,000 sq ft", type: "General, Cold" },
  { city: "Bangalore", capacity: "120,000 sq ft", type: "General, Fulfillment" },
  { city: "Hyderabad", capacity: "100,000 sq ft", type: "General, Bonded" },
];

const Warehousing = () => {
  return (
    <>
      <SEOHead
        title="Warehousing Services in India | AstroMar Logistics"
        description="Scalable warehousing across India — general, cold storage, bonded, and fulfillment. Real-time WMS, value-added services, and 24/7 security."
        ogImage="/og-home.jpg"
      />
      <Header />

      {/* Hero */}
      <section className="relative pb-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600"
          alt="Modern warehouse interior"
          fill
          className="absolute inset-0 object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="w-full px-6 md:px-12 lg:px-16 pt-24 relative z-10">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">WAREHOUSING</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-white mb-4 max-w-4xl mx-auto">
              Warehousing & Storage Solutions Across India
            </h1>
            <p className="text-center text-white max-w-3xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
              From a single pallet to 200,000+ sq ft of dedicated space, AstroMar provides flexible warehousing
              solutions with real-time inventory management, value-added services, and multi-temperature capabilities
              across India's key logistics hubs.
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="#contact">Get Warehousing Rates <ArrowRight className="w-4 h-4 ml-2" /></a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">SOLUTIONS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              Warehousing Solutions
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
            {solutions.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.07}>
                <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm h-full hover:shadow-md transition-shadow">
                  <s.icon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 bg-brand-light">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">FACILITY FEATURES</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              World-Class Warehouse Infrastructure
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {features.map((f, i) => (
              <ScrollReveal key={f} delay={i * 0.05}>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{f}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">LOCATIONS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              Our Warehouse Network
            </h2>
          </ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm w-full border-collapse">
              <div className="grid grid-cols-3 bg-primary text-primary-foreground text-sm font-semibold p-4">
                <span>City</span><span>Capacity</span><span>Types</span>
              </div>
              {locations.map((l, i) => (
                <ScrollReveal key={l.city} delay={i * 0.05}>
                  <div className={`grid grid-cols-3 text-sm p-4 ${i % 2 === 0 ? "bg-card" : "bg-muted/30"}`}>
                    <span className="font-medium text-foreground">{l.city}</span>
                    <span className="text-foreground/80">{l.capacity}</span>
                    <span className="text-foreground/80">{l.type}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FTWZ Services */}
      <section className="py-14 bg-brand-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">FTWZ WAREHOUSING</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              Free Trade Warehousing Zone Services
            </h2>
            <p className="text-center text-foreground/80 max-w-2xl mx-auto mb-6 text-sm sm:text-base leading-relaxed">
              In addition to standard warehousing, we offer FTWZ-specific storage solutions with significant duty and tax advantages.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { title: "Cargo Consolidation (FTWZ)", desc: "Defer customs duty and GST until goods enter the domestic tariff area — ideal for import-heavy businesses." },
              { title: "Cargo Consolidation", desc: "Consolidate multiple overseas shipments within the FTWZ before DTA entry to optimize duty payments." },
              { title: "Inventory Management", desc: "Real-time WMS-based tracking of FTWZ inventory with automated duty reconciliation and MIS reporting." },
              { title: "FTWZ Duty-Free Storage", desc: "Zero duty, zero GST storage within the FTWZ for goods intended for re-export or value-added processing." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm h-full hover:shadow-md transition-shadow">
                  <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">{item.desc}</p>
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">Find Your Ideal Warehouse</h2>
            <p className="text-foreground/80 max-w-2xl mx-auto mb-8">
              Flexible storage contracts from 30 days to multi-year. Get a customized warehousing proposal today.
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

export default Warehousing;

