"use client"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Ship, Anchor, MapPin, Clock, Shield, Leaf, BarChart3, ArrowRight,
  CheckCircle2, Globe, Truck, Package, IndianRupee,
} from "lucide-react";

const highlights = [
  { icon: Clock, title: "Increased Reliability", desc: "Coastal shipping operates 24/7/365 and is less affected by traffic congestion, fuel price fluctuations, and weather disruptions — making it a more reliable means of transporting goods compared to road transport." },
  { icon: IndianRupee, title: "Cost Effective", desc: "One vessel can transport the equivalent of 700 truckloads. Optimised vessel utilisation enables large-scale operations, significantly reducing transportation costs while providing flexible door-to-door solutions." },
  { icon: Leaf, title: "Sustainable Alternative", desc: "Coastal transportation results in almost 47% lower CO2 emissions compared to road transport, making a greener choice for bulk cargo movement across India's coastline." },
  { icon: Shield, title: "Safer Mode of Transport", desc: "Expenses associated with accidents and cargo damage are significantly lower on sea routes compared to road transportation, ensuring better safety and reduced risk for your shipments." },
];

const routes = [
  { from: "Chennai", to: "Mumbai", transit: "3–4 days", frequency: "Weekly" },
  { from: "Chennai", to: "Kolkata", transit: "4–5 days", frequency: "Weekly" },
  { from: "Mumbai", to: "Cochin", transit: "2–3 days", frequency: "Bi-weekly" },
  { from: "Mundra", to: "Vizag", transit: "4–5 days", frequency: "Weekly" },
  { from: "Tuticorin", to: "Kandla", transit: "5–6 days", frequency: "Bi-weekly" },
  { from: "Kolkata", to: "Chennai", transit: "4–5 days", frequency: "Weekly" },
];

const cargoTypes = [
  { icon: Package, title: "Bulk Cargo", desc: "Coal, cement, fertilizers, iron ore, and other bulk commodities moved efficiently via coastal routes." },
  { icon: Ship, title: "Containerized Cargo", desc: "FCL and LCL container movements between major Indian ports with door-to-port and port-to-door services." },
  { icon: Truck, title: "ODC & Project Cargo", desc: "Over-dimensional cargo including heavy machinery, wind turbine components, and industrial equipment." },
  { icon: Globe, title: "Liquid Cargo", desc: "ISO tank containers and tanker services for chemicals, edible oils, and petroleum products." },
];

const CoastalShipping = () => {
  return (
    <>
      <SEOHead
        title="Coastal Shipping Services in India | AstroMar Logistics"
        description="Cost-effective domestic coastal shipping across India's major ports. Save up to 40% on transport costs with eco-friendly sea freight — bulk, container, and project cargo."
        ogImage="/og-home.jpg"
      />
      <Header />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1520116468816-95b69f847357?w=1600"
          alt="Coastal vessel"
          fill
          className="absolute inset-0 object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full py-24 relative z-10">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              COASTAL SHIPPING
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-foreground mb-4 max-w-4xl mx-auto">
              Domestic Coastal Shipping Services Across India
            </h1>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
              Move cargo efficiently along India's 7,500+ km coastline. Our coastal shipping services connect
              all major and minor Indian ports, offering a greener, more cost-effective alternative to road and
              rail freight for bulk, containerized, and project cargo.
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="#contact">Get Coastal Shipping Rates <ArrowRight className="w-4 h-4 ml-2" /></a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Coastal Shipping */}
      <section className="py-14 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">WHY COASTAL SHIPPING</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              The Smarter Way to Move Cargo Domestically
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
            {highlights.map((h, i) => (
              <ScrollReveal key={h.title} delay={i * 0.07}>
                <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm h-full hover:shadow-md transition-shadow">
                  <h.icon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold text-foreground mb-2">{h.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Route Network */}
      <section className="py-14 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">ROUTE NETWORK</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              Key Coastal Shipping Routes
            </h2>
          </ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="grid grid-cols-4 bg-primary text-primary-foreground text-sm font-semibold p-4">
                <span>Origin</span><span>Destination</span><span>Transit Time</span><span>Frequency</span>
              </div>
              {routes.map((r, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className={`grid grid-cols-4 text-sm p-4 ${i % 2 === 0 ? "bg-card" : "bg-muted/30"}`}>
                    <span className="font-medium text-foreground">{r.from}</span>
                    <span className="text-foreground">{r.to}</span>
                    <span className="text-muted-foreground">{r.transit}</span>
                    <span className="text-muted-foreground">{r.frequency}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cargo Types */}
      <section className="py-14 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">CARGO TYPES</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              What We Ship Coastally
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
            {cargoTypes.map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 0.07}>
                <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm h-full hover:shadow-md transition-shadow">
                  <c.icon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold text-foreground mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">Ready to Ship Coastally?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Get competitive coastal shipping rates and let our team plan the most efficient route for your cargo.
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

export default CoastalShipping;

