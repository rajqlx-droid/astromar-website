"use client"
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import {
  FileText, Ship, Plane, ClipboardCheck, Snowflake, GitBranch, Box, Combine, ArrowRight, Globe,
} from "lucide-react";

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

const Services = () => {
  return (
    <>
      <SEOHead
        title="Logistics Services | AstroMar Logistics"
        description="Explore AstroMar's comprehensive logistics services — FTWZ warehousing, sea & air freight, customs clearance, cold storage, and supply chain solutions across India."
        ogImage="/og-home.jpg"
      />
      <Header />

      {/* Hero */}
      <section className="relative bg-brand-navy py-16 sm:py-24 md:py-32 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200"
          alt="Logistics warehouse"
          fill
          className="absolute inset-0 object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="w-full px-6 md:px-12 lg:px-16 py-24 relative z-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-orange-500 mb-5">
            OUR SERVICES
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Comprehensive Logistics Services
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            From duty-free warehousing to last-mile delivery, Astromar Logistics provides end-to-end logistics solutions across India.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="w-full px-6 md:px-12 lg:px-16">
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.06}>
                <a href={s.href} className="block h-full">
                  <div
                    className={`relative rounded-xl border bg-card p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow h-full ${
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
                    <p className="text-muted-foreground leading-relaxed text-sm">{s.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-4">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Services;
