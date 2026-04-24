"use client"
import {
  FileText, Ship, Plane, ClipboardCheck, Snowflake, GitBranch, Box, Combine,
  CheckCircle2, Warehouse, Globe, FileCheck, Thermometer, BarChart3, ArrowRight, Package,
} from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

import { Button } from "@/components/ui/button";

const services = [
  { icon: FileText, title: "FTWZ", desc: "Duty-free storage with bonded warehouse facilities across India. Defer customs duty and GST until goods enter the domestic tariff area.", featured: true, href: "/ftwz-services" },
  { icon: Ship, title: "Coastal Shipping", desc: "Domestic coastal cargo movement along India's extensive coastline, offering cost-effective and eco-friendly transport alternatives.", href: "/services/coastal-shipping" },
  { icon: Ship, title: "Ocean Freight", desc: "Full container load (FCL) and less than container load (LCL) ocean freight services across major global trade routes.", href: "/services/ocean-freight" },
  { icon: Plane, title: "Air Freight", desc: "Express and standard air cargo solutions with real-time tracking and customs pre-clearance capabilities.", href: "/services/air-freight" },
  { icon: GitBranch, title: "Supply Chain", desc: "Integrated supply chain management with inventory optimization, order fulfilment, and distribution.", href: "/services/supply-chain" },
  { icon: ClipboardCheck, title: "Custom Clearance", desc: "End-to-end customs compliance, documentation, and clearance services for imports and exports.", href: "/services/custom-clearance" },
  { icon: Snowflake, title: "Warehousing", desc: "Secure, scalable warehousing solutions with real-time inventory management and value-added services.", href: "/services/warehousing" },
  { icon: Box, title: "Projects", desc: "Specialized handling of oversized, heavy-lift, and project cargo with custom engineering solutions.", href: "/services/projects" },
];

const benefits = [
  { title: "100% Duty & GST Deferment", desc: "Store imported goods indefinitely without paying customs duty or GST, improving working capital and cash flow." },
  { title: "Re-export Without Duty", desc: "Re-export goods globally without duty or GST, maximizing margin on export-oriented businesses." },
  { title: "Flexible Domestic Clearance", desc: "Clear goods domestically at any time - pay duty only when needed, deferring compliance costs." },
  { title: "Value-Added Services", desc: "Repacking, labeling, kitting, quality inspection, and consolidation under one roof." },
  { title: "Cold Storage Integration", desc: "Dedicated cold storage zones for pharma, food, and perishables with full temperature control." },
  { title: "Real-Time Inventory Tracking", desc: "AI-powered inventory management with live tracking, automated reporting, and compliance documentation." },
];

const solutions = [
  { icon: Warehouse, title: "General FTWZ Storage", desc: "High-security bonded warehousing for electronics, textiles, machinery, and general cargo with flexible tenure." },
  { icon: Snowflake, title: "Cold Chain Storage", desc: "2-8 degrees C, -20 degrees C, and ambient zones for pharma, biologics, food, and perishables with GDP certification." },
  { icon: Globe, title: "Re-export Hub", desc: "Consolidate and re-export globally with zero duty, leveraging India's FTWZ cost advantage." },
  { icon: FileCheck, title: "Partial Clearance", desc: "Clear portions of inventory domestically while keeping the rest duty-free, optimizing timing and cash flow." },
  { icon: Thermometer, title: "Pharma Logistics", desc: "GDP-compliant storage and distribution for pharmaceutical products with full cold chain integrity." },
  { icon: Package, title: "Project & Specialized Cargo", desc: "End-to-end handling of ODC, heavy lift, and break-bulk cargo with route surveys, permits, and specialized equipment." },
];

const ServicesSection = () => {
  return (
    <>
      {/* Services Grid */}
      <section id="services" className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-5">
              WHAT WE OFFER
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-foreground mb-6">
              Comprehensive Logistics Services
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 text-sm md:text-base">
              From duty-free warehousing to last-mile delivery, Astromar Logistics provides end-to-end
              logistics solutions across India.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 items-stretch">
            {services.slice(0, 3).map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.06} className="h-full">
                <a href={s.href} className="block h-full">
                  <div
                    className={`relative rounded-xl border bg-card p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col ${
                      s.featured ? "border-primary" : "border-border"
                    }`}
                  >
                    {s.featured && (
                      <span className="absolute top-4 right-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        Featured
                      </span>
                    )}
                    <s.icon className="w-7 h-7 md:w-8 md:h-8 text-primary mb-4" strokeWidth={1.5} />
                    <h3 className="text-base md:text-lg font-bold text-foreground mb-2">{s.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm flex-1">{s.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-4">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link
              href="/services"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* FTWZ Overview — image with overlay and text */}
      <section id="ftwz" className="relative overflow-hidden min-h-[500px] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200"
          alt="FTWZ bonded warehouse facility India – Astromar Logistics"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="w-full px-6 md:px-12 lg:px-16 py-24 relative z-10">
          <ScrollReveal>
            <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-[0.2em] text-white/70 uppercase mb-2">
              FTWZ WAREHOUSING
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-6 max-w-4xl leading-tight">
              FTWZ Warehousing Services in India | Duty-Free Storage Solutions
            </h2>
            <p className="text-white/80 max-w-4xl leading-relaxed text-base sm:text-lg mb-8">
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
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">
              KEY BENEFITS
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              Why Choose Our FTWZ Warehousing?
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto items-stretch">
            {benefits.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.07} className="h-full">
                <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm h-full flex flex-col hover:shadow-md transition-shadow">
                  <CheckCircle2 className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Solutions */}
      <section className="py-14 bg-brand-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">
              OUR SOLUTIONS
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              Comprehensive FTWZ Warehousing Solutions
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto items-stretch">
            {solutions.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.07} className="h-full">
                <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm h-full flex flex-col hover:shadow-md transition-shadow">
                  <s.icon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;





