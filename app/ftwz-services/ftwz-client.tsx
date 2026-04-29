"use client"
import { useRef, useState, useCallback } from "react";
import { CheckCircle2, ArrowRight, Warehouse, Snowflake, Globe, FileCheck, Thermometer, BarChart3, Package, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";

const benefits = [
  { title: "Duty-Free Storage", desc: "Store imported goods inside an FTWZ without paying customs duty, freeing up working capital until goods are actually needed." },
  { title: "Indefinite GST Deferral", desc: "Defer GST indefinitely on goods stored in the FTWZ — pay only when goods move into the Domestic Tariff Area." },
  { title: "Re-Export Without Penalty", desc: "Re-export stored goods to any global destination with zero customs duty or GST liability, maximising export margins." },
  { title: "Bonded Warehousing", desc: "Fully bonded, customs-controlled storage with 24/7 security, CCTV surveillance, and tamper-evident access controls." },
  { title: "Value-Added Services", desc: "Repacking, relabeling, kitting, sorting, and quality inspection performed within the FTWZ without triggering duty." },
  { title: "Single Window Clearance", desc: "Streamlined customs documentation and single-window clearance managed by our in-house compliance team." },
];

const useCases = [
  {
    emoji: "💻",
    title: "Electronics & High-Value Goods",
    desc: "Defer duty on high-value imports until point of sale",
    benefits: ["Zero customs duty on storage", "Tamper-evident access controls", "Re-export to any destination duty-free"],
  },
  {
    emoji: "💊",
    title: "Pharma & Cold Chain",
    desc: "Temperature-controlled duty-free bonded storage",
    benefits: ["GDP-compliant cold rooms available", "GST deferral on pharma imports", "Seamless DTA clearance on demand"],
  },
  {
    emoji: "🛒",
    title: "FMCG & Consumer Goods",
    desc: "Consolidate, kit, and distribute efficiently",
    benefits: ["Kitting & relabeling permitted in-zone", "Pan-India DTA distribution", "Single-window customs clearance"],
  },
  {
    emoji: "⚙️",
    title: "Automotive Parts",
    desc: "Just-in-time supply without upfront duty burden",
    benefits: ["Defer duty until assembly demand arises", "Quality inspection inside FTWZ", "Multi-origin cargo consolidation"],
  },
  {
    emoji: "👕",
    title: "Textiles & Apparel",
    desc: "Re-export surplus stock globally with zero duty",
    benefits: ["Zero duty re-export flexibility", "Sorting & relabeling allowed", "Supply global buyers directly from FTWZ"],
  },
  {
    emoji: "🏗️",
    title: "Project & Specialized Cargo",
    desc: "Stage heavy equipment without upfront duty payment",
    benefits: ["Indefinite bonded storage permitted", "Oversized cargo handling available", "Phased DTA clearance as needed"],
  },
];

const FTWZServices = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = useCallback((dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 404 : -404, behavior: "smooth" });
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const idx = Math.round(scrollRef.current.scrollLeft / 404);
    setActiveIndex(Math.min(idx, useCases.length - 1));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <Header />

      {/* Hero */}
      <section className="relative bg-brand-navy py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1600"
          alt="Warehouse facility"
          fill
          className="absolute inset-0 object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="w-full px-6 md:px-12 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* LEFT - Text */}
            <div>
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
                className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold text-white mb-5 leading-tight"
              >
                FTWZ Warehousing in India — Duty-Free Storage Solutions
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm sm:text-base md:text-lg text-white/90 mb-8 leading-relaxed"
              >
                Store imported goods without paying customs duty or GST — defer, re-export, or clear domestically on your terms.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors">
                  Get More Information →
                </a>
                <a href="#benefits" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors">
                  View Benefits
                </a>
              </motion.div>
            </div>

            {/* RIGHT - Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              {/* Left — existing overview content */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-6">
                  Overview
                </h2>
                <p className="text-foreground/80 leading-relaxed text-base sm:text-lg mb-8">
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

              {/* Right — key benefits list */}
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-orange-500 mb-4">Key Benefits</p>
                <ul className="divide-y divide-gray-100">
                  {[
                    "No customs duty until goods are cleared",
                    "GST deferment on stored inventory",
                    "Flexible re-export without duty payment",
                    "Value-added services: repacking, labeling, kitting",
                    "Pan-India network across 8+ FTWZ locations",
                    "24/7 secure warehousing with WMS access",
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 py-3">
                      <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                      <span className="text-foreground/80 text-sm sm:text-base leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">
              FTWZ ADVANTAGES
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              What Makes FTWZ the Smarter Choice?
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto items-stretch">
            {benefits.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.07} className="h-full">
                <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm h-full flex flex-col hover:shadow-md transition-shadow">
                  <CheckCircle2 className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm sm:text-base text-foreground/80 leading-relaxed flex-1">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FTWZ Use Cases Carousel */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">
              FTWZ USE CASES
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-10">
              How Businesses Use Our FTWZ Network
            </h2>
          </ScrollReveal>

          {/* Carousel wrapper */}
          <div className="relative">
            {/* Left arrow */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors hidden md:flex"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            {/* Scrollable track */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto px-1 pb-4 scrollbar-hide"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {useCases.map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow flex-shrink-0 flex flex-col"
                  style={{ scrollSnapAlign: "start", minWidth: "min(320px, 80vw)", width: "380px" }}
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-2xl mb-5 flex-shrink-0">
                    {item.emoji}
                  </div>
                  {/* Heading + desc */}
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
                  {/* Divider */}
                  <div className="h-px bg-gray-100 mb-4" />
                  {/* Benefits */}
                  <ul className="flex flex-col gap-2">
                    {item.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Right arrow */}
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors hidden md:flex"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Scroll indicator dots */}
          <div className="flex justify-center gap-2 mt-6">
            {useCases.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  scrollRef.current?.scrollTo({ left: i * 404, behavior: "smooth" });
                  setActiveIndex(i);
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 h-2.5 bg-orange-500" : "w-2.5 h-2.5 bg-gray-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="pt-20 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase mb-3 text-center">
              FTWZ VS REGULAR WAREHOUSE
            </p>
            <h2 className="text-[22px] font-medium text-gray-900 text-center mb-3">
              Why FTWZ Outperforms Regular Storage
            </h2>
            <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12 text-sm leading-relaxed">
              See how Astromar's FTWZ gives your business a clear competitive advantage over conventional warehousing.
            </p>

            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <table
                className="text-sm w-full"
                style={{ borderCollapse: "collapse", tableLayout: "fixed" }}
              >
                <colgroup>
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "35%" }} />
                  <col style={{ width: "35%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th
                      className="text-left px-4 py-3 text-gray-500 font-medium"
                      style={{ backgroundColor: "#f9fafb", borderRight: "1px solid #e5e7eb", borderBottom: "2px solid #e5e7eb" }}
                    >
                      Feature
                    </th>
                    <th
                      className="text-left px-4 py-3 text-gray-500 font-medium"
                      style={{ backgroundColor: "#f9fafb", borderRight: "1px solid #e5e7eb", borderBottom: "2px solid #e5e7eb" }}
                    >
                      Regular Warehouse
                    </th>
                    <th
                      className="text-left px-4 py-3 text-white font-medium"
                      style={{ backgroundColor: "#f97316", borderBottom: "2px solid #e5e7eb" }}
                    >
                      Astromar FTWZ ✦
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {([
                    ["Customs Duty on Import", "Paid immediately on arrival", "Deferred indefinitely"],
                    ["GST on Storage", "Fully applicable", "100% deferred until DTA entry"],
                    ["Re-export Without Duty", "Not possible", "Fully permitted, zero liability"],
                    ["Value-Added Services", "Severely limited", "Labelling, kitting, assembly allowed"],
                    ["Storage Duration", "Limited, renewal required", "Indefinite storage permitted"],
                    ["Customs Compliance", "Self-managed burden", "Fully managed by Astromar"],
                  ] as const).map(([feature, regular, ftwz], i, arr) => {
                    const isLast = i === arr.length - 1;
                    const rowBorder = isLast ? undefined : "1px solid #e5e7eb";
                    return (
                      <tr key={feature}>
                        <td
                          className="px-4 py-[14px] font-medium text-gray-900"
                          style={{ borderRight: "1px solid #e5e7eb", borderBottom: rowBorder }}
                        >
                          {feature}
                        </td>
                        <td
                          className="px-4 py-[14px] text-red-500"
                          style={{ borderRight: "1px solid #e5e7eb", borderBottom: rowBorder }}
                        >
                          {regular}
                        </td>
                        <td
                          className="px-4 py-[14px] text-green-600"
                          style={{ backgroundColor: "#fff7ed", borderBottom: rowBorder }}
                        >
                          {ftwz}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-400 mt-3 text-center">
              * All FTWZ benefits subject to SEZ Act compliance and Astromar facility terms.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="max-w-2xl mx-auto text-center px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Ready to Leverage FTWZ for Your Business?
            </h2>
            <p className="text-foreground/80 max-w-2xl mx-auto mb-8 text-base sm:text-lg">
              Contact our team to explore how duty-free warehousing can transform your supply chain economics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="#contact">Schedule Consultation <ArrowRight className="w-4 h-4 ml-1" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10" asChild>
                <Link href="/tools">Explore Tools →</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="w-full h-px bg-orange-500 opacity-50" />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default FTWZServices;
