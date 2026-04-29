"use client"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Plane, Clock, Shield, Zap, Globe, Package, Thermometer, FileCheck,
  ArrowRight, CheckCircle2, BarChart3,
} from "lucide-react";

const services = [
  { icon: Zap, title: "Express Air Freight", desc: "Time-critical shipments with next-day and same-day delivery options. Priority handling and dedicated capacity for urgent cargo." },
  { icon: Plane, title: "Standard Air Cargo", desc: "Scheduled air freight services on major airlines with competitive rates. Ideal for regular shipments with 2–5 day transit windows." },
  { icon: Package, title: "Charter Services", desc: "Full and part-charter aircraft for oversized, high-value, or time-sensitive cargo that requires dedicated capacity." },
  { icon: Thermometer, title: "Temperature-Controlled", desc: "GDP-compliant air freight for pharmaceuticals, biologics, and perishables with active and passive temperature solutions." },
];

const capabilities = [
  "Pre-clearance customs documentation",
  "Dangerous goods handling (IATA certified)",
  "Real-time shipment tracking and alerts",
  "Airport-to-airport and door-to-door delivery",
  "Cargo insurance and risk management",
  "Consolidation and deconsolidation",
  "Bonded warehouse storage at origin/destination",
  "Specialized packaging and crating",
  "EXW, DAP, and DDP shipment execution",
  "Specialized & project cargo handling",
  "International freight forwarding (air & sea)",
];

const destinations = [
  { region: "North America", hubs: "JFK, ORD, LAX, YYZ", transit: "18–24 hrs" },
  { region: "Europe", hubs: "LHR, FRA, AMS, CDG", transit: "9–12 hrs" },
  { region: "Middle East", hubs: "DXB, DOH, BAH", transit: "4–5 hrs" },
  { region: "Asia Pacific", hubs: "SIN, HKG, NRT, ICN", transit: "5–8 hrs" },
  { region: "Africa", hubs: "JNB, NBO, ADD", transit: "8–12 hrs" },
];

const AirFreight = () => {
  return (
    <>
      <SEOHead
        title="Air Freight Services from India | AstroMar Logistics"
        description="Express and standard air freight from India to 200+ destinations. Time-critical, temperature-controlled, and charter air cargo with real-time tracking."
        ogImage="/og-freight.jpg"
      />
      <Header />

      {/* Hero */}
      <section className="relative pb-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600"
          alt="Cargo aircraft"
          fill
          className="absolute inset-0 object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="w-full px-6 md:px-12 lg:px-16 pt-24 relative z-10">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3 text-center">AIR FREIGHT</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-white mb-4 max-w-4xl mx-auto">
              Air Freight Services from India to the World
            </h1>
            <p className="text-center text-white max-w-3xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
              When speed matters, trust AstroMar's air freight solutions. From express next-day delivery to charter services
              for oversized cargo, we connect India to 200+ destinations worldwide with reliable, trackable air cargo services.
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="#contact">Get Air Freight Rates <ArrowRight className="w-4 h-4 ml-2" /></a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section className="py-14 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">SOLUTIONS</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              Air Freight Solutions
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.07}>
                <div className="rounded-xl border border-gray-200 bg-slate-50 p-6 sm:p-8 shadow-sm h-full hover:shadow-md transition-shadow">
                  <s.icon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-14 bg-brand-light">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">CAPABILITIES</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              End-to-End Air Cargo Capabilities
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {capabilities.map((c, i) => (
              <ScrollReveal key={c} delay={i * 0.05}>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-white border border-gray-200">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{c}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-14 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">GLOBAL NETWORK</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              Key Air Cargo Destinations
            </h2>
          </ScrollReveal>
          <div className="max-w-4xl mx-auto space-y-4">
            {destinations.map((d, i) => (
              <ScrollReveal key={d.region} delay={i * 0.07}>
                <div className="rounded-xl border border-gray-200 bg-slate-50 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{d.region}</h3>
                      <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">Hubs: {d.hubs}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary whitespace-nowrap">{d.transit}</span>
                  </div>
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">Need It There Fast?</h2>
            <p className="text-foreground/80 max-w-2xl mx-auto mb-8">
              Get competitive air freight rates within 2 hours. Express, standard, or charter — we have the right solution.
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

export default AirFreight;

