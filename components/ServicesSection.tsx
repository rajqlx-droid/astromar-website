"use client"
import { useState } from "react";
import {
  FileText, Ship, Plane, ClipboardCheck, Snowflake, GitBranch, Box, Combine,
  Warehouse, Globe, FileCheck, Thermometer, BarChart3, ArrowRight, Package,
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
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  return (
    <>
      {/* Services Grid */}
      <section id="services" className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-5 text-center">
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
            {services.slice(0, 4).map((s, i) => (
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
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base flex-1">{s.desc}</p>
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
        <div className="absolute inset-0 bg-black/75" />
        <div className="w-full px-6 md:px-12 lg:px-16 py-24 relative z-10">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              {/* LEFT - Text Content */}
              <div>
                <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-3">
                  FTWZ WAREHOUSING
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-5 leading-tight">
                  India's Most Flexible Duty-Free Storage Solution
                </h2>
                <p className="text-white/90 leading-relaxed text-base mb-8">
                  Store imported goods without paying customs duty or GST until final disposition. Re-export globally, consolidate shipments, or defer domestic clearance — all from Astromar's pan-India FTWZ network.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                    <a href="#contact">
                      Get More Information <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <a
                    href="/ftwz-services"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold text-base hover:bg-white/10 transition-colors"
                  >
                    View FTWZ Services
                  </a>
                </div>
              </div>

              {/* RIGHT - Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                  <p className="text-4xl font-extrabold text-accent mb-2">₹0</p>
                  <p className="text-white/80 text-sm font-semibold">Customs Duty</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                  <p className="text-4xl font-extrabold text-accent mb-2">100%</p>
                  <p className="text-white/80 text-sm font-semibold">GST Deferral</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                  <p className="text-4xl font-extrabold text-accent mb-2">24/7</p>
                  <p className="text-white/80 text-sm font-semibold">Operations</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                  <p className="text-4xl font-extrabold text-accent mb-2">8+</p>
                  <p className="text-white/80 text-sm font-semibold">FTWZ Locations</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">
              KEY BENEFITS
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-16">
              Why Choose Our FTWZ Warehousing?
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch max-w-5xl mx-auto">
            <div className="flex flex-col divide-y divide-border h-full justify-between">
              <div className="flex items-center gap-6 py-8 first:pt-0">
                <span className="text-4xl font-extrabold text-accent min-w-[80px]">₹0</span>
                <div className="min-w-0 flex-1">
                  <strong className="block text-foreground font-bold">Customs Duty</strong>
                  <span className="text-muted-foreground text-sm">Store without paying duty until goods are cleared</span>
                </div>
              </div>
              <div className="flex items-center gap-6 py-8">
                <span className="text-4xl font-extrabold text-accent min-w-[80px]">100%</span>
                <div className="min-w-0 flex-1">
                  <strong className="block text-foreground font-bold">GST Deferral</strong>
                  <span className="text-muted-foreground text-sm">Defer indefinitely until goods enter domestic market</span>
                </div>
              </div>
              <div className="flex items-center gap-6 py-8">
                <span className="text-4xl font-extrabold text-accent min-w-[80px]">24/7</span>
                <div className="min-w-0 flex-1">
                  <strong className="block text-foreground font-bold">Operations</strong>
                  <span className="text-muted-foreground text-sm">Round-the-clock facility management and support</span>
                </div>
              </div>
              <div className="flex items-center gap-6 py-8 last:pb-0">
                <span className="text-4xl font-extrabold text-accent min-w-[80px]">8+</span>
                <div className="min-w-0 flex-1">
                  <strong className="block text-foreground font-bold">Pan-India Locations</strong>
                  <span className="text-muted-foreground text-sm">Strategically located FTWZ facilities across major ports</span>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-3 text-muted-foreground h-full flex flex-col justify-center">
              <h3 className="text-xl font-bold text-foreground">Save More. Move Faster. Grow Bigger.</h3>
              <p className="leading-relaxed text-sm">Astromar's FTWZ facilities are strategically positioned to give your business the maximum advantage in international trade — defer duty, control costs, and scale faster.</p>
              <div className="bg-brand-light border-l-4 border-accent rounded-r-lg px-4 py-3 text-sm font-semibold text-foreground">
                ✓ No customs duty until domestic clearance — maximize working capital
              </div>
              <p className="leading-relaxed text-sm sm:text-base">Our pan-India network connects all major ports and airports — built for pharma, electronics, FMCG, and project cargo at any scale.</p>
              <a href="/ftwz-services" className="inline-flex items-center gap-2 text-accent font-semibold hover:underline text-sm">Learn More About FTWZ →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Solutions */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">
              OUR SOLUTIONS
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12">
              Comprehensive FTWZ Warehousing Solutions
            </h2>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* LEFT - Accordion */}
            <div className="rounded-xl border border-border overflow-hidden bg-card h-full flex flex-col">
              {solutions.map((s, i) => (
                <div key={s.title} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className={`w-full flex items-center justify-between gap-4 px-5 py-5 text-left transition-colors ${
                      openIndex === i
                        ? "bg-brand-navy text-white"
                        : "bg-card hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <s.icon
                        className={`w-5 h-5 flex-shrink-0 ${
                          openIndex === i ? "text-accent" : "text-primary"
                        }`}
                        strokeWidth={1.5}
                      />
                      <span className={`text-sm font-bold ${
                        openIndex === i ? "text-white" : "text-foreground"
                      }`}>
                        {s.title}
                      </span>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm transition-colors ${
                      openIndex === i
                        ? "bg-accent text-white"
                        : "bg-primary/10 text-primary"
                    }`}>
                      {openIndex === i ? "−" : "+"}
                    </div>
                  </button>
                  {openIndex === i && (
                    <div className="px-5 py-4 bg-brand-light border-t border-border">
                      <p className="text-foreground text-sm sm:text-base leading-relaxed font-medium">{s.desc}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* RIGHT - Image */}
            <div className="relative rounded-xl overflow-hidden" style={{ height: '420px' }}>
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"
                alt="Astromar FTWZ Warehouse Facility"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-navy/50" />
              <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                FTWZ Certified
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-brand-navy/80 rounded-lg p-4">
                <p className="text-white font-bold text-sm mb-1">Astromar FTWZ Facility</p>
                <p className="text-white/70 text-xs">Duty-free bonded warehouse • Pan-India network</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;





