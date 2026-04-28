"use client"
import { Eye, Target, Shield, Globe, UserCheck, TrendingUp, Medal, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "7+", label: "Years of Excellence" },
  { value: "8+", label: "FTWZ Locations" },
  { value: "500+", label: "Clients Served" },
  { value: "₹2000Cr+", label: "Cargo Handled" },
];

const coreValues = [
  { icon: Shield, title: "Compliance First", desc: "100% customs compliance with transparent, auditable operations across all FTWZ locations.", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80" },
  { icon: Globe, title: "Global Connectivity", desc: "Seamless integration with global trade lanes through strategic port proximity.", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80" },
  { icon: UserCheck, title: "Client-Centric", desc: "Dedicated account managers and customized logistics solutions for every client.", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80" },
  { icon: TrendingUp, title: "Continuous Improvement", desc: "Structured processes and operational efficiency driving measurable outcomes.", image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80" },
  { icon: Medal, title: "Excellence", desc: "Consistently delivering industry-leading service levels and operational efficiency.", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80" },
  { icon: Clock, title: "Reliability", desc: "24/7 operations ensuring uninterrupted supply chain continuity.", image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80" },
];

const milestones = [
  { year: "2017", title: "Founded", desc: "Astromar established in Chennai with a vision to transform India's FTWZ landscape." },
  { year: "2018", title: "First FTWZ Facility", desc: "Launched our first Free Trade Warehousing Zone facility near Chennai port." },
  { year: "2019", title: "Pan-India Expansion", desc: "Expanded operations to Mumbai (JNPA) and Cochin." },
  { year: "2021", title: "Technology Platform", desc: "Deployed real-time inventory management systems." },
  { year: "2022", title: "7 Locations", desc: "Achieved pan-India coverage with 7 operational FTWZ warehouse locations across key port cities." },
  { year: "2023", title: "Industry Recognition", desc: "Recognized among India's leading FTWZ operators for service excellence and compliance standards." },
  { year: "2024", title: "Cold Chain Launch", desc: "Introduced GDP-compliant cold storage facilities at Chennai and Mumbai locations." },
  { year: "2026", title: "Bengaluru Expansion", desc: "Launched new FTWZ warehouse at Devanahalli Aerospace SEZ, Bengaluru, strengthening South India logistics network." },
];

const certifications = [
  { title: "FTWZ Licence", desc: "Free Trade Warehousing Zone operational licence" },
  { title: "MSME Licence", desc: "Registered Micro, Small & Medium Enterprise" },
  { title: "MTO Licence", desc: "Multimodal Transport Operator licence" },
  { title: "RCMC Membership", desc: "Registration Cum Membership Certificate for SEZ & FTWZ" },
  { title: "JC Trans Membership", desc: "Industry association membership for logistics & freight" },
  { title: "IEC Registration", desc: "Import Export Code registered with DGFT, Government of India" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <Header />

      {/* Hero */}
      <section className="relative bg-brand-navy py- overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200"
          alt="Business and logistics team"
          fill
          className="absolute inset-0 object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="w-full px-6 md:px-12 lg:px-16 py-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
            {/* LEFT - Text */}
            <div>
              <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-3">
                ABOUT ASTROMAR
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold text-white mb-5 leading-tight">
                India's Trusted FTWZ &amp; Logistics Partner
              </h1>
              <p className="text-white/90 leading-relaxed text-base mb-8">
                Since 2017, Astromar Logistics has been transforming how businesses leverage Free Trade Warehousing Zones to optimize customs duty, defer GST, and streamline global trade across India.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:bg-accent/90 transition-colors">
                  Get In Touch →
                </a>
                <a href="/services" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors">
                  Our Services
                </a>
              </div>
            </div>

            {/* RIGHT - Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold text-accent mb-2">7+</p>
                <p className="text-white/80 text-sm font-semibold">Years of Excellence</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold text-accent mb-2">8+</p>
                <p className="text-white/80 text-sm font-semibold">FTWZ Locations</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold text-accent mb-2">500+</p>
                <p className="text-white/80 text-sm font-semibold">Clients Served</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                <p className="text-4xl font-extrabold text-accent mb-2">2017</p>
                <p className="text-white/80 text-sm font-semibold">Founded</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <ScrollReveal direction="left">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 border border-blue-500/30 rounded-xl p-6 shadow-lg h-full">
                <div className="flex items-center gap-3 mb-5">
                  <Eye className="w-7 h-7 text-white" />
                  <h3 className="text-xl font-bold tracking-wide uppercase text-white">Our Vision</h3>
                </div>
                <p className="leading-relaxed text-white text-base sm:text-lg">
                  To be a trusted global logistics partner delivering seamless connectivity across
                  international trade networks.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="bg-brand-light border border-border rounded-xl p-6 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <Target className="w-7 h-7 text-primary" />
                  <h3 className="text-xl font-bold text-foreground tracking-wide uppercase">Our Mission</h3>
                </div>
                <p className="text-foreground/80 leading-relaxed text-base sm:text-lg">
                  To provide reliable, efficient, and transparent logistics solutions that simplify
                  global trade and strengthen client partnerships.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Tagline band */}
      <section className="bg-[#0a1628] py-12 px-6 text-center">
        <p className="text-white text-lg font-medium tracking-wide">
          Built on trust. Driven by excellence. Focused on your growth.
        </p>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">OUR VALUES</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-16">What We Stand For</h2>
          </ScrollReveal>
          <div className="space-y-16">
            {coreValues.map((item, i) => {
              const isEven = i % 2 === 0;
              const textBlock = (
                <div className="flex flex-col justify-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <item.icon className="w-6 h-6 text-primary" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mb-3">{item.title}</h3>
                  <p className="text-base text-foreground/70 leading-relaxed">{item.desc}</p>
                </div>
              );
              const imageBlock = (
                <div className="relative h-[300px] w-full rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              );
              return (
                <ScrollReveal key={item.title} delay={0.1}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                    {isEven ? (
                      <>{textBlock}{imageBlock}</>
                    ) : (
                      <>{imageBlock}{textBlock}</>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">OUR JOURNEY</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              Milestones &amp; Growth
            </h2>
          </ScrollReveal>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />
            <div className="space-y-8 md:space-y-0">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <ScrollReveal key={m.year} delay={i * 0.06}>
                    <div className="relative md:flex md:items-start md:mb-12 md:gap-0">
                      <div className="hidden md:block absolute left-1/2 top-8 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10" />
                      <div className={`md:w-1/2 md:pr-10 ${!isLeft ? 'md:invisible' : ''}`}>
                        {isLeft && (
                          <div className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-sm text-right">
                            <p className="text-xl font-extrabold text-primary">{m.year}</p>
                            <p className="font-bold text-foreground mt-1">{m.title}</p>
                            <p className="text-sm sm:text-base text-foreground/80 mt-1 leading-relaxed">{m.desc}</p>
                          </div>
                        )}
                      </div>
                      <div className={`md:w-1/2 md:pl-10 ${isLeft ? 'md:invisible' : ''}`}>
                        {!isLeft && (
                          <div className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-sm">
                            <p className="text-xl font-extrabold text-primary">{m.year}</p>
                            <p className="font-bold text-foreground mt-1">{m.title}</p>
                            <p className="text-sm sm:text-base text-foreground/80 mt-1 leading-relaxed">{m.desc}</p>
                          </div>
                        )}
                      </div>
                      <div className="md:hidden rounded-xl border border-border bg-card p-5 shadow-sm">
                        <p className="text-xl font-extrabold text-primary">{m.year}</p>
                        <p className="font-bold text-foreground mt-1">{m.title}</p>
                        <p className="text-sm sm:text-base text-foreground/80 mt-1 leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="pt-14 pb-20 bg-slate-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">TRUST &amp; COMPLIANCE</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-6">
              Certifications &amp; Accreditations
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {certifications.map((cert, i) => (
              <ScrollReveal key={cert.title} delay={i * 0.06}>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground font-semibold text-sm sm:text-base">{cert.title}</p>
                    <p className="text-foreground/80 text-xs sm:text-sm mt-0.5">{cert.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            {/* Floating stat badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["500+ Clients Served", "8+ FTWZ Locations", "7+ Years of Excellence"].map((badge) => (
                <span key={badge} className="bg-white/20 border border-white/30 rounded-full px-4 py-1 text-sm font-medium text-white shadow-sm">
                  ✓ {badge}
                </span>
              ))}
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ready to Optimize Your Trade Operations?
            </h2>

            <p className="text-orange-100 max-w-2xl mx-auto mb-3 text-base sm:text-lg">
              Partner with India's leading FTWZ provider and unlock duty-free warehousing, GST deferment, and seamless logistics.
            </p>
            <p className="text-orange-200 italic mb-8">Seamless Innovation. Unmatched Reliability.</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50" asChild>
                <a href="#contact">Schedule Consultation <ArrowRight className="w-4 h-4 ml-1" /></a>
              </Button>
              <Link href="/freight-intelligence" className="inline-flex items-center justify-center rounded-md text-sm font-medium h-11 px-8 bg-transparent border-2 border-white text-white hover:bg-white/10 transition-colors">
                Explore Tools
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
