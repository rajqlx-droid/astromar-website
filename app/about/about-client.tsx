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
  { icon: Shield, title: "Compliance First", desc: "100% customs compliance with transparent, auditable operations across all FTWZ locations." },
  { icon: Globe, title: "Global Connectivity", desc: "Seamless integration with global trade lanes through strategic port proximity." },
  { icon: UserCheck, title: "Client-Centric", desc: "Dedicated account managers and customized logistics solutions for every client." },
  { icon: TrendingUp, title: "Continuous Improvement", desc: "Structured processes and operational efficiency driving measurable outcomes." },
  { icon: Medal, title: "Excellence", desc: "Consistently delivering industry-leading service levels and operational efficiency." },
  { icon: Clock, title: "Reliability", desc: "24/7 operations ensuring uninterrupted supply chain continuity." },
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
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <Header />

      {/* Hero */}
      <section className="relative bg-brand-navy py-16 sm:py-24 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600"
          alt="Business and logistics team"
          fill
          className="absolute inset-0 object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full py-24 relative z-10">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="block text-sm font-bold tracking-[0.2em] text-accent uppercase mb-4"
            >
              ABOUT ASTROMAR LOGISTICS
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-foreground mb-6"
            >
              India's Trusted FTWZ &amp; Logistics Partner
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-primary-foreground/70 leading-relaxed text-base sm:text-lg"
            >
              Since 2017, Astromar Logistics has been transforming how businesses leverage Free Trade
              Warehousing Zones to optimize customs duty, defer GST, and streamline global trade — all
              from strategically located facilities across India.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-14 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <ScrollReveal direction="left">
              <div className="rounded-xl bg-gradient-to-br from-primary to-brand-navy p-8 sm:p-10 h-full text-primary-foreground">
                <div className="flex items-center gap-3 mb-5">
                  <Eye className="w-7 h-7" />
                  <h3 className="text-xl font-bold tracking-wide uppercase">Our Vision</h3>
                </div>
                <p className="leading-relaxed opacity-90 text-base sm:text-lg">
                  To be a trusted global logistics partner delivering seamless connectivity across
                  international trade networks.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="rounded-xl border border-border bg-card p-8 sm:p-10 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <Target className="w-7 h-7 text-primary" />
                  <h3 className="text-xl font-bold text-foreground tracking-wide uppercase">Our Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  To provide reliable, efficient, and transparent logistics solutions that simplify
                  global trade and strengthen client partnerships.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-14 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm h-full hover:shadow-md transition-shadow">
                  <item.icon className="w-8 h-8 text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-14 bg-background">
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
                    <div className="relative md:flex md:items-start md:mb-8">
                      <div className="hidden md:block absolute left-1/2 top-6 w-3 h-3 rounded-full bg-primary -translate-x-1/2 z-10" />
                      <div className={`md:w-1/2 ${isLeft ? 'md:pr-10' : 'md:pr-10 md:order-1 md:invisible'}`}>
                        {isLeft && (
                          <div className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-sm text-right">
                            <p className="text-xl font-extrabold text-primary">{m.year}</p>
                            <p className="font-bold text-foreground mt-1">{m.title}</p>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{m.desc}</p>
                          </div>
                        )}
                      </div>
                      <div className={`md:w-1/2 ${!isLeft ? 'md:pl-10' : 'md:pl-10 md:order-2 md:invisible'}`}>
                        {!isLeft && (
                          <div className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-sm">
                            <p className="text-xl font-extrabold text-primary">{m.year}</p>
                            <p className="font-bold text-foreground mt-1">{m.title}</p>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{m.desc}</p>
                          </div>
                        )}
                      </div>
                      <div className="md:hidden rounded-xl border border-border bg-card p-5 shadow-sm">
                        <p className="text-xl font-extrabold text-primary">{m.year}</p>
                        <p className="font-bold text-foreground mt-1">{m.title}</p>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{m.desc}</p>
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
      <section className="py-14 bg-muted/30">
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
                    <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">{cert.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-navy">
        <div className="max-w-2xl mx-auto text-center px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
              Ready to Optimize Your Trade Operations?
            </h2>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto mb-3 text-base sm:text-lg">
              Partner with India's leading FTWZ provider and unlock duty-free warehousing, GST deferment, and seamless logistics.
            </p>
            <p className="text-primary-foreground/50 italic mb-8">Seamless Innovation. Unmatched Reliability.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="#contact">Schedule Consultation <ArrowRight className="w-4 h-4 ml-1" /></a>
              </Button>
              <Link href="/freight-intelligence" className="inline-flex items-center justify-center rounded-md text-sm font-medium h-11 px-8 border border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 transition-colors">
                Explore Tools
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl bg-primary p-5 sm:p-6 text-primary-foreground text-center shadow-lg"
              >
                <p className="text-2xl sm:text-3xl font-extrabold">{stat.value}</p>
                <p className="text-sm sm:text-base opacity-80 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
