"use client"
import { useState } from "react";
import Image from "next/image";
import {
  FileText, Ship, Plane, ClipboardCheck, Snowflake, GitBranch, Box, Combine,
  Warehouse, Globe, FileCheck, Thermometer, BarChart3, ArrowRight, Package,
} from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

import { Button } from "@/components/ui/button";

const services = [
  { icon: FileText, title: "FTWZ Solutions", desc: "Duty-free storage with bonded warehouse facilities across India. Defer customs duty and GST until goods enter the domestic tariff area.", featured: true, href: "/free-trade-zone" },
  { icon: Ship, title: "Coastal Shipping", desc: "Domestic coastal cargo movement along India's extensive coastline, offering cost-effective and eco-friendly transport alternatives.", href: "/coastal-shipping-free-trade-zone" },
  { icon: Ship, title: "Ocean Freight", desc: "Full container load (FCL) and less than container load (LCL) ocean freight services across major global trade routes.", href: "/free-trade-zone-services/ocean-freight" },
  { icon: Plane, title: "Air Freight", desc: "Express and standard air cargo solutions with real-time tracking and customs pre-clearance capabilities.", href: "/free-trade-zone-services/air-freight" },
  { icon: GitBranch, title: "Supply Chain Solutions", desc: "Integrated supply chain management with inventory optimization, order fulfilment, and distribution.", href: "/free-trade-zone-services/supply-chain" },
  { icon: ClipboardCheck, title: "Customs Clearance", desc: "End-to-end customs compliance, documentation, and clearance services for imports and exports.", href: "/free-trade-zone-services/custom-clearance" },
  { icon: Box, title: "Project Cargo & Heavy-Lift", desc: "Specialized handling of oversized, heavy-lift, and project cargo with custom engineering solutions.", href: "/free-trade-zone-services/projects" },
  { icon: Snowflake, title: "Warehousing", desc: "Secure, scalable warehousing solutions with real-time inventory management and value-added services.", href: "/free-trade-zone-services/warehousing" },
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
  const [openIndex, setOpenIndex] = useState<number | null>(null)
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
              Complete Logistics Services
            </h2>
            <p className="text-base sm:text-lg text-foreground/70 text-center max-w-3xl mx-auto mb-10 leading-relaxed">
              Astromar combines a premier Free Trade Warehousing Zone in India with end-to-end freight, customs, and supply chain capabilities under one trusted partner.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 items-stretch">
            {services.slice(0, 7).map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.06} className="h-full">
                <a href={s.href} className="block h-full">
                  <div
                    className={`relative rounded-xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col ${
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
              href="/free-trade-zone-services"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              View All Services ?
            </Link>
          </div>
        </div>
      </section>

      {/* FTWZ Overview — image with overlay and text */}
      <section id="ftwz" className="relative overflow-hidden min-h-[500px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200"
          alt="FTWZ bonded warehouse facility India — Astromar Logistics"
          fill
          sizes="100vw"
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
                  Our Free Trade Zone in India: A Network Across 10 Locations
                </h2>
                <div className="flex flex-wrap gap-4 mt-8">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                    <a href="/contact-us">
                      Get More Information <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <a
                    href="/free-trade-zone"
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
                  <p className="text-4xl font-extrabold text-accent mb-2">10</p>
                  <p className="text-white/80 text-sm font-semibold">FTWZ Locations</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Comprehensive Solutions */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">
              OUR SOLUTIONS
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-4">
              Comprehensive Free Trade Warehousing Zone Solutions
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-12 text-center max-w-3xl mx-auto">
              Our Free Trade Warehousing Zone infrastructure combines bonded storage, customs clearance, and value-added services under one roof.
            </p>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* LEFT - Accordion */}
            <div className="rounded-xl border border-gray-200 overflow-hidden bg-white h-full flex flex-col">
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
                      {openIndex === i ? "-" : "+"}
                    </div>
                  </button>
                  {openIndex === i && (
                    <div
                      className="p-6"
                      style={{
                        backgroundColor: "#ffffff",
                        borderLeft: "3px solid #f97316",
                        borderBottom: "1px solid #e5e7eb",
                        borderRight: "1px solid #e5e7eb",
                      }}
                    >
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{s.desc}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* RIGHT - Image */}
            <div className="relative rounded-xl overflow-hidden" style={{ height: '420px' }}>
              <Image
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800"
                alt="Astromar FTWZ Warehouse Facility"
                fill
                sizes="100vw"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-brand-navy/50" />
              <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                FTWZ Certified
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-brand-navy/80 rounded-lg p-4">
                <p className="text-white font-bold text-sm mb-1">Astromar FTWZ Facility</p>
                <p className="text-white/70 text-xs">Duty-free bonded warehouse — Pan-India network</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;





