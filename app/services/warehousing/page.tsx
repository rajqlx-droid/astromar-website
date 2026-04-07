"use client"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import {
  Warehouse, Package, Shield, Clock, BarChart3, ArrowRight,
  CheckCircle2, Thermometer, Layers, Settings,
} from "lucide-react";

const solutions = [
  { icon: Warehouse, title: "General Warehousing", desc: "High-bay racking, bulk storage, and floor stacking in secure, fire-protected facilities across major Indian cities." },
  { icon: Thermometer, title: "Cold Storage", desc: "Temperature-controlled zones from -25Â°C to +25Â°C for pharmaceuticals, perishables, and chemicals with GDP compliance." },
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
      <section className="py-20 bg-brand-light">
        <div className="container px-4">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary text-center mb-3">WAREHOUSING</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-foreground mb-4 max-w-4xl mx-auto">
              Warehousing & Storage Solutions Across India
            </h1>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
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
      <section className="py-16 sm:py-20 bg-background">
        <div className="container px-4">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase text-center mb-3">SOLUTIONS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12">
              Warehousing Solutions
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

      {/* Features */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container px-4">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase text-center mb-3">FACILITY FEATURES</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12">
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
      <section className="py-16 sm:py-20 bg-background">
        <div className="container px-4">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase text-center mb-3">LOCATIONS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12">
              Our Warehouse Network
            </h2>
          </ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="grid grid-cols-3 bg-primary text-primary-foreground text-sm font-semibold p-4">
                <span>City</span><span>Capacity</span><span>Types</span>
              </div>
              {locations.map((l, i) => (
                <ScrollReveal key={l.city} delay={i * 0.05}>
                  <div className={`grid grid-cols-3 text-sm p-4 ${i % 2 === 0 ? "bg-card" : "bg-muted/30"}`}>
                    <span className="font-medium text-foreground">{l.city}</span>
                    <span className="text-muted-foreground">{l.capacity}</span>
                    <span className="text-muted-foreground">{l.type}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-brand-light">
        <div className="container px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">Find Your Ideal Warehouse</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
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

