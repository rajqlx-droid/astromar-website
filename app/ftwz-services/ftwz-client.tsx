"use client"
import { CheckCircle2, ArrowRight, Warehouse, Snowflake, Globe, FileCheck, Thermometer, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";
import FTWZLocations from "@/components/FTWZLocations";
import { Button } from "@/components/ui/button";

const benefits = [
  { title: "100% Duty & GST Deferment", desc: "Store imported goods indefinitely without paying customs duty or GST, improving working capital and cash flow." },
  { title: "Re-export Without Duty", desc: "Re-export goods globally without duty or GST, maximizing margin on export-oriented businesses." },
  { title: "Flexible Domestic Clearance", desc: "Clear goods domestically at any time – pay duty only when needed, deferring compliance costs." },
  { title: "Value-Added Services", desc: "Repacking, labeling, kitting, quality inspection, and consolidation under one roof." },
  { title: "Cold Storage Integration", desc: "Dedicated cold storage zones for pharma, food, and perishables with full temperature control." },
  { title: "Real-Time Inventory Tracking", desc: "AI-powered inventory management with live tracking, automated reporting, and compliance documentation." },
];

const solutions = [
  { icon: Warehouse, title: "General FTWZ Storage", desc: "High-security bonded warehousing for electronics, textiles, machinery, and general cargo with flexible tenure." },
  { icon: Snowflake, title: "Cold Chain Storage", desc: "2–8°C, -20°C, and ambient zones for pharma, biologics, food, and perishables with GDP certification." },
  { icon: Globe, title: "Re-export Hub", desc: "Consolidate and re-export globally with zero duty, leveraging India's FTWZ cost advantage." },
  { icon: FileCheck, title: "Partial Clearance", desc: "Clear portions of inventory domestically while keeping the rest duty-free, optimizing timing and cash flow." },
  { icon: Thermometer, title: "Pharma Logistics", desc: "GDP-compliant storage and distribution for pharmaceutical products with full cold chain integrity." },
  { icon: BarChart3, title: "Trade Compliance", desc: "Automated customs documentation, HS code classification, and regulatory compliance management." },
];

const FTWZServices = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <Header />

      {/* Hero */}
      <section className="bg-brand-navy py-16 sm:py-24 md:py-32">
        <div className="container px-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="block text-sm font-bold tracking-[0.2em] text-accent uppercase mb-4"
          >
            FTWZ WAREHOUSING
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-foreground mb-6 max-w-4xl leading-tight"
          >
            FTWZ Warehousing Services in India | Duty-Free Storage Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-primary-foreground/70 max-w-3xl leading-relaxed text-base sm:text-lg"
          >
            Store goods duty-free, defer customs duty & GST indefinitely, and re-export or clear domestically without duty penalties.
          </motion.p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container px-4">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-6">
              Overview
            </h2>
            <p className="text-muted-foreground max-w-4xl leading-relaxed text-base sm:text-lg mb-8">
              FTWZ Warehousing is India's most flexible duty-free warehousing solution, enabling importers and
              exporters to store goods without paying customs duty or GST – until final disposition. Whether
              you're re-exporting, consolidating shipments, or deferring domestic clearance, AstroMar's pan-India
              FTWZ network provides compliant, secure storage with value-added services like repacking,
              labeling, and kitting.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href="#contact">
                Get More Information <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container px-4">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase text-center mb-3">
              KEY BENEFITS
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12">
              Why Choose Our FTWZ Warehousing?
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.07}>
                <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm h-full hover:shadow-md transition-shadow">
                  <CheckCircle2 className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Solutions */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container px-4">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase text-center mb-3">
              OUR SOLUTIONS
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12">
              Comprehensive FTWZ Warehousing Solutions
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
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

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-brand-navy">
        <div className="container px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
              Ready to Leverage FTWZ for Your Business?
            </h2>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto mb-8 text-base sm:text-lg">
              Contact our team to explore how duty-free warehousing can transform your supply chain economics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="#contact">Schedule Consultation <ArrowRight className="w-4 h-4 ml-1" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link href="/freight-intelligence">Try Calculator Tools</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FTWZLocations />

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default FTWZServices;
