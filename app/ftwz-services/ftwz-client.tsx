"use client"
import { CheckCircle2, ArrowRight, Warehouse, Snowflake, Globe, FileCheck, Thermometer, BarChart3, Package } from "lucide-react";
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

const solutions = [
  { icon: Globe, title: "Import Duty Optimisation", desc: "Receive international shipments directly into the FTWZ and defer or eliminate customs duty based on final disposition — DTA, re-export, or destruction." },
  { icon: FileCheck, title: "GST-Free B2B Supply", desc: "Supply goods to other FTWZ units or SEZ entities without GST, enabling cost-competitive inter-company and cross-border trade flows." },
  { icon: Warehouse, title: "Export Consolidation", desc: "Consolidate cargo from multiple suppliers inside the FTWZ, perform value-added processing, and re-export as a unified shipment with zero duty." },
  { icon: Package, title: "Domestic Tariff Area Supply", desc: "Clear goods into the DTA on demand — pay duty only on what you need, when you need it, keeping the rest in duty-free storage." },
];

const FTWZServices = () => {
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-6">
              Overview
            </h2>
            <p className="text-foreground/80 max-w-4xl leading-relaxed text-base sm:text-lg mb-8">
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

      {/* Comprehensive Solutions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">
              FTWZ USE CASES
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              How Businesses Use Our FTWZ Network
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto items-stretch">
            {solutions.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.07} className="h-full">
                <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm h-full flex flex-col hover:shadow-md transition-shadow">
                  <s.icon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm sm:text-base text-foreground/80 leading-relaxed flex-1">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">
              FTWZ VS REGULAR WAREHOUSE
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-3">
              Why FTWZ Outperforms Regular Storage
            </h2>
            <p className="text-center text-foreground/80 max-w-2xl mx-auto mb-10 text-sm sm:text-base leading-relaxed">
              See how Astromar's FTWZ gives your business a clear competitive advantage over conventional warehousing.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full rounded-xl overflow-hidden border border-gray-200 text-sm">
                <thead>
                  <tr>
                    <th className="bg-brand-navy text-white text-left px-5 py-4 font-semibold w-[30%]">Feature</th>
                    <th className="text-white text-left px-5 py-4 font-semibold" style={{ backgroundColor: "#374151" }}>Regular Warehouse</th>
                    <th className="text-white text-left px-5 py-4 font-semibold" style={{ backgroundColor: "#F97316" }}>Astromar FTWZ ✦</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Customs Duty on Import", "Paid immediately on arrival", "Deferred indefinitely"],
                    ["GST on Storage", "Fully applicable", "100% deferred until DTA entry"],
                    ["Re-export Without Duty", "Not possible", "Fully permitted, zero liability"],
                    ["Value-Added Services", "Severely limited", "Labelling, kitting, assembly allowed"],
                    ["Storage Duration", "Limited, renewal required", "Indefinite storage permitted"],
                    ["Customs Compliance", "Self-managed burden", "Fully managed by Astromar"],
                  ].map(([feature, regular, ftwz], i) => (
                    <tr key={feature} className={i % 2 === 0 ? "bg-white" : "bg-brand-light"}>
                      <td className="px-5 py-4 font-semibold text-foreground border-t border-gray-100">{feature}</td>
                      <td className="px-5 py-4 text-gray-600 border-t border-gray-100">
                        <span className="text-red-500 mr-2 font-bold">✗</span>{regular}
                      </td>
                      <td className="px-5 py-4 text-gray-800 border-t border-gray-100" style={{ backgroundColor: i % 2 === 0 ? "rgba(249,115,22,0.05)" : "rgba(249,115,22,0.08)" }}>
                        <span className="text-green-600 mr-2 font-bold">✓</span>{ftwz}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-foreground/80 mt-4 text-center">
              * All FTWZ benefits subject to SEZ Act compliance and Astromar facility terms.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
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
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link href="/freight-intelligence">Try Calculator Tools</Link>
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
