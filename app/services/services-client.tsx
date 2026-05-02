"use client"
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTASection from "@/components/CTASection";
import SEOHead from "@/components/SEOHead";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, FileText, Ship, Plane, ClipboardCheck, Snowflake, GitBranch, Box } from "lucide-react";

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
      <section className="relative bg-brand-navy py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200"
          alt="Logistics warehouse"
          fill
          className="absolute inset-0 object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="w-full px-6 md:px-12 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* LEFT - Text */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-orange-500 mb-5">
                OUR SERVICES
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold text-white mb-5 leading-tight">
                Comprehensive Logistics Services
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white mb-8 leading-relaxed">
                From duty-free warehousing to last-mile delivery, Astromar Logistics provides end-to-end logistics solutions across India.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#services"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#F97316" }}
                >
                  Explore Services
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* RIGHT - Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold text-accent mb-2">8+</p>
                <p className="text-white text-sm font-semibold">Service Types</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold text-accent mb-2">500+</p>
                <p className="text-white text-sm font-semibold">Clients Served</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold text-accent mb-2">15+</p>
                <p className="text-white text-sm font-semibold">Countries</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold text-accent mb-2">24/7</p>
                <p className="text-white text-sm font-semibold">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.06}>
                <a href={s.href} className="block h-full">
                  <div
                    className={`relative rounded-xl border bg-slate-50 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col ${
                      s.featured ? "border-primary" : "border-gray-200"
                    }`}
                  >
                    {s.featured && (
                      <span className="absolute top-4 right-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        Featured
                      </span>
                    )}
                    <s.icon className="w-7 h-7 md:w-8 md:h-8 text-primary mb-4" strokeWidth={1.5} />
                    <h3 className="text-base md:text-lg font-bold text-foreground mb-2">{s.title}</h3>
                    <p className="text-foreground/80 leading-relaxed text-sm sm:text-base flex-1">{s.desc}</p>
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

      <CTASection />
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Services;
