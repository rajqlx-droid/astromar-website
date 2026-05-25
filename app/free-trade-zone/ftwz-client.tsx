"use client"
import { useRef, useState, useCallback } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Shield, Award, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";

function KwText({ segments }: { segments?: { text: string; kw?: boolean; href?: string }[] }) {
  if (!segments) return null;
  return (
    <>
      {segments.map((seg, i) => {
        const content = seg.kw ? (
          <span className="text-blue-600">{seg.text}</span>
        ) : (
          <span>{seg.text}</span>
        );
        if (seg.href) {
          return (
            <Link key={i} href={seg.href} className="underline decoration-[#F97316]/40 underline-offset-2 hover:decoration-[#F97316]">
              {content}
            </Link>
          );
        }
        return <span key={i}>{content}</span>;
      })}
    </>
  );
}

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

const ftwzLocations = [
  { slug: "chennai-sriperumbudur", name: "Chennai (Sriperumbudur)" },
  { slug: "chennai-vallur", name: "Chennai (Vallur)" },
  { slug: "mumbai-panvel", name: "Mumbai (Panvel)" },
  { slug: "mumbai-jnpa", name: "Mumbai (JNPA)" },
  { slug: "kochi", name: "Kochi" },
  { slug: "vizag", name: "Visakhapatnam" },
  { slug: "delhi-khurja", name: "Delhi NCR (Khurja)" },
  { slug: "bengaluru", name: "Bengaluru" },
  { slug: "dahej", name: "Dahej" },
  { slug: "mundra", name: "Mundra" },
];

const ftwzFaqs = [
  {
    question: [
      { text: "What is a Free Trade Warehousing Zone?" },
    ],
    answer: [
      { text: "A Free Trade Warehousing Zone (FTWZ) is a Government-notified area established under the Special Economic Zones Act, 2005, where imported goods can be stored without immediate payment of customs duty or GST. Goods stay in the zone duty-free until they're cleared for domestic sale, re-exported, or transferred to another FTWZ. Astromar operates 10 strategic FTWZ locations across India's major ports and inland corridors." },
    ],
  },
  {
    question: [
      { text: "How is FTWZ different from a regular bonded warehouse?" },
    ],
    answer: [
      { text: "Both allow duty-deferred storage, but FTWZs offer significantly broader benefits: unlimited storage tenure versus 1-year limit, permitted activities including manufacturing and value addition, 100% GST deferral, and 5-year income tax exemption on re-export profits. A standard bonded warehouse typically restricts storage to passive holding only." },
    ],
  },
  {
    question: [
      { text: "What are the tax benefits of operating from an FTWZ in India?" },
    ],
    answer: [
      { text: "Operating from an FTWZ provides four major tax benefits: zero customs duty until goods exit to the Domestic Tariff Area; 100% GST deferral on imports; service tax exemption on FTWZ-internal operations like labelling and kitting; and income tax exemption on re-export profits for the first 5 years under the SEZ Act, 2005." },
    ],
  },
  {
    question: [
      { text: "Which industries benefit most from FTWZ warehouse operations?" },
    ],
    answer: [
      { text: "FTWZ warehousing benefits virtually any industry handling significant import volumes: electronics, automotive components, pharmaceuticals (with cold-chain capability), FMCG, textiles, chemicals, project cargo, and bulk commodities. Companies operating from FTWZs typically save ₹2-5 crore annually on duty deferral alone." },
    ],
  },
  {
    question: [
      { text: "Can I do value-added activities like kitting or labelling inside the FTWZ?" },
    ],
    answer: [
      { text: "Yes — kitting, labelling, repackaging, sorting, quality inspection, and assembly are all permitted within an FTWZ without triggering customs duty. This allows importers to add value to goods before they enter the Domestic Tariff Area or are re-exported, often resulting in significant cost and time savings." },
    ],
  },
  {
    question: [
      { text: "How many FTWZ locations does Astromar operate in India?" },
    ],
    answer: [
      { text: "Astromar operates 10 strategic FTWZ locations across India: Chennai (Sriperumbudur and Vallur), Mumbai (Panvel and JNPA), Kochi, Visakhapatnam, Delhi NCR (Khurja), Bengaluru, Dahej, and Mundra. Each facility is positioned at or near a major port, airport, or inland freight corridor to serve specific industries and geographic markets." },
    ],
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Astromar Logistics Pvt Ltd",
  "url": "https://astromarfreezone.com",
  "logo": "https://eenumepuujkrnartejsh.supabase.co/storage/v1/object/sign/BRAND%20ASSETS/001.png",
  "description": "India's leading Free Trade Warehousing Zone operator with 10 strategic FTWZ locations offering duty-free storage, customs clearance, and re-export services.",
  "telephone": "+91 99402 11014",
  "email": "sales@astromarfreezone.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "No. 922, 1st Floor, H-Block, 17th Main Road, Anna Nagar",
    "addressLocality": "Chennai",
    "addressRegion": "Tamil Nadu",
    "postalCode": "600040",
    "addressCountry": "IN"
  },
  "areaServed": "IN",
  "serviceType": ["Free Trade Warehousing Zone", "Customs Bonded Warehouse", "Freight Forwarding", "Customs Clearance", "Supply Chain Management"]
};

const ftwzFaqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is a Free Trade Warehousing Zone?", "acceptedAnswer": { "@type": "Answer", "text": "A Free Trade Warehousing Zone (FTWZ) is a Government-notified area established under the SEZ Act, 2005, where imported goods can be stored without immediate payment of customs duty or GST until they leave the zone." } },
    { "@type": "Question", "name": "How is FTWZ different from a regular bonded warehouse?", "acceptedAnswer": { "@type": "Answer", "text": "FTWZs offer unlimited storage tenure, broader permitted activities including manufacturing and value addition, 100% GST deferral, and 5-year income tax exemption on re-export profits — versus a regular bonded warehouse's 1-year storage limit." } },
    { "@type": "Question", "name": "What are the tax benefits of operating from an FTWZ in India?", "acceptedAnswer": { "@type": "Answer", "text": "Zero customs duty until goods exit to DTA, 100% GST deferral, service tax exemption on FTWZ operations, and 5-year income tax exemption on re-export profits." } },
    { "@type": "Question", "name": "Which industries benefit most from FTWZ warehousing?", "acceptedAnswer": { "@type": "Answer", "text": "Electronics, automotive components, pharmaceuticals, FMCG, textiles, chemicals, project cargo, and bulk commodities all benefit significantly from FTWZ operations." } },
    { "@type": "Question", "name": "Can I do value-added activities like kitting or labelling inside the FTWZ?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — kitting, labelling, repackaging, sorting, quality inspection, and assembly are all permitted within an FTWZ without triggering customs duty." } },
    { "@type": "Question", "name": "How many FTWZ locations does Astromar operate in India?", "acceptedAnswer": { "@type": "Answer", "text": "Astromar operates 10 strategic FTWZ locations: Chennai (Sriperumbudur & Vallur), Mumbai (Panvel & JNPA), Kochi, Visakhapatnam, Delhi NCR (Khurja), Bengaluru, Dahej, and Mundra." } }
  ]
};

const ftwzBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Astromar", "item": "https://astromarfreezone.com/" },
    { "@type": "ListItem", "position": 2, "name": "Free Trade Warehousing Zone", "item": "https://astromarfreezone.com/free-trade-zone" }
  ]
};

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
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        role="img"
        aria-label="Free trade warehousing zone in India — Astromar FTWZ duty-free warehouse network"
        className="relative bg-brand-navy py-20 overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1600"
          alt="FTWZ in India — Astromar's bonded warehouse network across 10 strategic locations"
          fill
          className="absolute inset-0 object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="w-full px-6 md:px-12 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <span className="block text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-4">FTWZ WAREHOUSING</span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                Zero Duty Bonded Storage — FTWZ in India
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/90 mb-8 leading-relaxed">
                Astromar's FTWZ in India network lets you store imported goods without paying customs duty or GST until they leave the zone — operated across 10 strategic Indian locations from Chennai to Mundra.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact-us" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#F97316] text-white font-semibold hover:opacity-90 transition-opacity">
                  Get More Information →
                </Link>
                <a href="#benefits" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors">
                  View Benefits
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold text-[#F97316] mb-2">₹0</p>
                <p className="text-white/80 text-sm font-semibold">Customs Duty</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold text-[#F97316] mb-2">100%</p>
                <p className="text-white/80 text-sm font-semibold">GST Deferral</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold text-[#F97316] mb-2">24/7</p>
                <p className="text-white/80 text-sm font-semibold">Operations</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold text-[#F97316] mb-2">10</p>
                <p className="text-white/80 text-sm font-semibold">FTWZ Locations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is FTWZ - Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[8fr_4fr] gap-12 items-start">
              <div>
                <p className="text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-3">OVERVIEW</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-6">
                  What is an FTWZ in India?
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-foreground/80 leading-relaxed">
                  <p>A Free Trade Warehousing Zone (FTWZ) is a Government-notified area established under the SEZ Act, 2005, where imported goods can be stored without immediate payment of customs duty or GST. Goods stay in the zone duty-free until they're cleared for domestic sale, re-exported abroad, or transferred to another FTWZ.</p>
                  <p>Astromar operates 10 strategic FTWZ warehouse locations across India — from Chennai and Mumbai's busiest container ports to inland gateways at Khurja and Bengaluru. Each facility is fully bonded, customs-controlled, and licensed for value-added activities including kitting, labelling, repackaging, and re-export.</p>
                  <p>For importers, this means working capital that isn't trapped in customs duty, GST deferred until point of sale, and the operational flexibility to consolidate, repack, and re-export without triggering tax events.</p>
                </div>
              </div>
              <aside className="bg-gradient-to-br from-[#0f1f3d] to-[#1B3A6B] rounded-xl p-6 sm:p-8 text-white">
                <p className="text-xs font-bold tracking-[0.2em] text-[#F97316] uppercase mb-4">Key Facts</p>
                <div className="space-y-4">
                  <div className="border-b border-white/15 pb-3">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#F97316] leading-none">10</p>
                    <p className="text-sm text-white/80 mt-1">FTWZ Locations Across India</p>
                  </div>
                  <div className="border-b border-white/15 pb-3">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#F97316] leading-none">100%</p>
                    <p className="text-sm text-white/80 mt-1">Duty Free Storage</p>
                  </div>
                  <div className="border-b border-white/15 pb-3">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#F97316] leading-none">0%</p>
                    <p className="text-sm text-white/80 mt-1">GST Until Domestic Sale</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#F97316] leading-none">SEZ</p>
                    <p className="text-sm text-white/80 mt-1">Act 2005 Notified</p>
                  </div>
                </div>
              </aside>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Key Benefits */}
      <section id="benefits" className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-2 text-center">FTWZ ADVANTAGES</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-10">
              Why Choose Astromar for Free Trade Zone Warehousing
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto items-stretch">
            {benefits.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.07} className="h-full">
                <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm h-full flex flex-col hover:shadow-md transition-shadow">
                  <CheckCircle2 className="w-8 h-8 text-[#F97316] mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm sm:text-base text-foreground/70 leading-relaxed flex-1">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Astromar Section - NEW */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-2 text-center">WHY ASTROMAR</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-3">
              Accelerating Customs Clearances across Free Trade Zone Networks
            </h2>
            <p className="text-base sm:text-lg text-foreground/70 text-center max-w-3xl mx-auto mb-10 leading-relaxed">
              Our Free Trade Zone operations span 10 strategic locations with 24/7 customs liaison, fast-track examination, and dedicated SEZ officer coordination.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white border border-[#1B3A6B]/10 rounded-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-[rgba(249,115,22,0.1)] flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-[#F97316]" />
              </div>
              <p className="text-3xl font-extrabold text-[#F97316] mb-2">10</p>
              <p className="text-base font-bold text-foreground mb-2">Strategic Locations</p>
              <p className="text-sm text-foreground/70 leading-relaxed">Chennai, Mumbai, Kochi, Vizag, Delhi NCR, Bengaluru, Dahej, and Mundra</p>
            </div>
            <div className="bg-white border border-[#1B3A6B]/10 rounded-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-[rgba(249,115,22,0.1)] flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#F97316]" />
              </div>
              <p className="text-3xl font-extrabold text-[#F97316] mb-2">24/7</p>
              <p className="text-base font-bold text-foreground mb-2">Customs On-Site</p>
              <p className="text-sm text-foreground/70 leading-relaxed">In-house customs team for instant clearance across all FTWZ facilities</p>
            </div>
            <div className="bg-white border border-[#1B3A6B]/10 rounded-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-[rgba(249,115,22,0.1)] flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-[#F97316]" />
              </div>
              <p className="text-lg font-extrabold text-[#F97316] mb-2 mt-1">SEZ Act</p>
              <p className="text-base font-bold text-foreground mb-2">Fully Compliant</p>
              <p className="text-sm text-foreground/70 leading-relaxed">All facilities notified under SEZ Act 2005 with full statutory benefits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Carousel */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-2 text-center">FTWZ USE CASES</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-4">
              How Industries Use Our FTWZ Network
            </h2>
            <p className="text-base sm:text-lg text-foreground/70 text-center max-w-3xl mx-auto mb-10 leading-relaxed">
              As a licensed Free Zone Company operating under the SEZ Act, Astromar serves importers, exporters, and re-exporters across 6 industries. Our Free Zone Company status enables duty deferral, single-window customs, and value-added services unavailable in regular warehousing.
            </p>
          </ScrollReveal>
          <div className="relative">
            <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors hidden md:flex" aria-label="Scroll left">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div ref={scrollRef} onScroll={handleScroll} className="flex gap-6 overflow-x-auto px-1 pb-4 scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
              {useCases.map((item) => (
                <div key={item.title} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow flex-shrink-0 flex flex-col" style={{ scrollSnapAlign: "start", minWidth: "min(320px, 80vw)", width: "380px" }}>
                  <div className="w-14 h-14 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-2xl mb-5 flex-shrink-0">{item.emoji}</div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-foreground/60 mb-4">{item.desc}</p>
                  <div className="h-px bg-gray-100 mb-4" />
                  <ul className="flex flex-col gap-2">
                    {item.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" strokeWidth={2} />{b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors hidden md:flex" aria-label="Scroll right">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {useCases.map((_, i) => (
              <button key={i} onClick={() => { scrollRef.current?.scrollTo({ left: i * 404, behavior: "smooth" }); setActiveIndex(i); }} className={`rounded-full transition-all duration-300 ${i === activeIndex ? "w-6 h-2.5 bg-[#F97316]" : "w-2.5 h-2.5 bg-gray-300"}`} aria-label={`Go to slide ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table - 3 columns */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#F97316] uppercase mb-3 text-center">FTWZ COMPARISON</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-3">
              FTWZ vs Bonded Warehouse vs Regular Warehouse
            </h2>
            <p className="text-center text-foreground/60 max-w-2xl mx-auto mb-10 text-sm sm:text-base leading-relaxed">
              See how Astromar's FTWZ gives your business a clear competitive advantage over conventional and bonded warehousing.
            </p>
            <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
              <table className="text-sm w-full" style={{ borderCollapse: "collapse", tableLayout: "fixed" }}>
                <colgroup>
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "25%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th className="text-left px-4 py-3 text-gray-500 font-medium" style={{ backgroundColor: "#f9fafb", borderRight: "1px solid #e5e7eb", borderBottom: "2px solid #e5e7eb" }}>Feature</th>
                    <th className="text-left px-4 py-3 text-gray-500 font-medium" style={{ backgroundColor: "#f9fafb", borderRight: "1px solid #e5e7eb", borderBottom: "2px solid #e5e7eb" }}>Regular Warehouse</th>
                    <th className="text-left px-4 py-3 text-gray-500 font-medium" style={{ backgroundColor: "#f9fafb", borderRight: "1px solid #e5e7eb", borderBottom: "2px solid #e5e7eb" }}>Bonded Warehouse</th>
                    <th className="text-left px-4 py-3 text-white font-medium" style={{ backgroundColor: "#F97316", borderBottom: "2px solid #e5e7eb" }}>Astromar FTWZ ✦</th>
                  </tr>
                </thead>
                <tbody>
                  {([
                    ["Customs Duty", "Paid on arrival", "Deferred 1 year", "Deferred indefinitely"],
                    ["GST on Storage", "Fully applicable", "Applicable", "100% deferred until DTA"],
                    ["Storage Duration", "Limited, renewal needed", "1 year limit", "Indefinite storage permitted"],
                    ["Value-Added Services", "Severely limited", "Restricted", "Full — kitting, labelling, assembly"],
                    ["Re-Export Without Duty", "Not possible", "Limited", "Fully permitted, zero liability"],
                    ["Income Tax (Re-Export)", "Standard rates", "Standard rates", "5-year exemption on profits"],
                  ] as const).map(([feature, regular, bonded, ftwz], i, arr) => {
                    const isLast = i === arr.length - 1;
                    const rowBorder = isLast ? undefined : "1px solid #e5e7eb";
                    return (
                      <tr key={feature}>
                        <td className="px-4 py-[14px] font-medium text-foreground" style={{ borderRight: "1px solid #e5e7eb", borderBottom: rowBorder }}>{feature}</td>
                        <td className="px-4 py-[14px] text-red-500" style={{ borderRight: "1px solid #e5e7eb", borderBottom: rowBorder }}>{regular}</td>
                        <td className="px-4 py-[14px] text-yellow-600" style={{ borderRight: "1px solid #e5e7eb", borderBottom: rowBorder }}>{bonded}</td>
                        <td className="px-4 py-[14px] text-green-600 font-medium" style={{ backgroundColor: "#fff7ed", borderBottom: rowBorder }}>{ftwz}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">* All FTWZ benefits subject to SEZ Act compliance and Astromar facility terms.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section - NEW */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {ftwzFaqs.map((item, idx) => (
              <div key={idx} className="bg-white border border-[#1B3A6B]/10 rounded-xl p-5 shadow-sm">
                <h3 className="text-base font-bold text-[#0f1f3d] mb-3 flex gap-3">
                  <span className="text-[#F97316] flex-shrink-0">Q{idx + 1}.</span>
                  <span><KwText segments={item.question} /></span>
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed pl-8">
                  <KwText segments={item.answer} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FTWZ Locations Footer - Option D */}
      <section className="py-12 bg-white border-t border-[#1B3A6B]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-[#F97316] uppercase mb-3">FTWZ NETWORK</p>
          <p className="text-base sm:text-lg font-semibold text-foreground mb-2">Operating at 10 strategic ports across India</p>
          <p className="text-sm text-foreground/70 leading-loose max-w-3xl mx-auto">
            {ftwzLocations.map((loc, i) => (
              <span key={loc.slug}>
                <Link href={`/locations/${loc.slug}`} className="text-[#1B3A6B] hover:text-[#F97316] underline decoration-[#F97316]/30 underline-offset-2 hover:decoration-[#F97316] transition-colors">
                  {loc.name}
                </Link>
                {i < ftwzLocations.length - 1 && <span className="mx-2 text-foreground/40">·</span>}
              </span>
            ))}
          </p>
        </div>
      </section>

      <CTASection />

      <WhatsAppButton />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ftwzFaqPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ftwzBreadcrumbSchema) }}
      />
    </div>
  );
};

export default FTWZServices;
