"use client"
import { Eye, Target, Shield, Globe, UserCheck, TrendingUp, Medal, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "7+", label: "Years of Excellence" },
  { value: "10", label: "FTWZ Locations" },
  { value: "500+", label: "Clients Served" },
  { value: "₹2000Cr+", label: "Cargo Handled" },
];

const coreValues = [
  { icon: Shield, title: "Compliance First", descSegments: [
    { text: "100% customs compliance with transparent, auditable operations across all FTWZ locations. Our in-house compliance team manages every shipment with zero-error documentation, working directly with Indian Customs and SEZ authorities to ensure goods clear quickly and lawfully. From BOE filing to re-export attestation, our FTWZ warehouse operations maintain complete audit trails, real-time regulatory tracking, and proactive compliance updates — keeping your business ahead of changing trade policies and protecting you from costly penalties." }
  ], image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80" },
  { icon: Globe, title: "Global Connectivity", descSegments: [
    { text: "Seamless integration with international trade lanes through strategic positioning at India's busiest ports — Chennai, Mumbai (JNPA), Kochi, Vizag, Mundra, and Dahej. Each facility connects directly to global shipping routes, with multimodal access by sea, rail, road, and air. Our network supports importers, exporters, and re-exporters from over 50 countries, with 24/7 customs clearance, single-window documentation, and direct connectivity to over 200 destination ports worldwide." }
  ], image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80" },
  { icon: UserCheck, title: "Client-Centric", descSegments: [
    { text: "Every client gets a dedicated account manager — a single point of contact for everything from quote requests to delivery confirmation. We don't believe in one-size-fits-all logistics. Whether you're a first-time importer testing the FTWZ model or a Fortune 500 brand managing complex multi-port operations, we design solutions around your cargo profile, compliance needs, and growth plans. Transparent pricing, custom SLAs, and proactive issue resolution define every engagement." }
  ], image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80" },
  { icon: TrendingUp, title: "Continuous Improvement", descSegments: [
    { text: "Structured processes, ISO-aligned operations, and data-driven decisions power measurable outcomes for every client. We invest continuously in technology — from cloud-based WMS platforms to AI-driven inventory forecasting — and regularly retrain teams on the latest SEZ Act updates, customs regulations, and global trade developments. Quarterly performance reviews with KPIs around dwell time, accuracy, and cost-per-pallet ensure we're always improving the value we deliver." }
  ], image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80" },
  { icon: Medal, title: "Excellence", descSegments: [
    { text: "Industry-leading service standards backed by 7+ years of operational excellence and ₹2000Cr+ in cargo handled without major compliance incidents. We're recognized as one of India's top FTWZ operators by customers across electronics, pharma, automotive, FMCG, and chemicals industries. Our facilities meet international standards — including GDP for pharmaceuticals, ISO 14001 environmental compliance, and SEZ Act 2005 statutory obligations — making us the trusted partner for high-stakes, high-value cargo." }
  ], image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80" },
  { icon: Clock, title: "Reliability", descSegments: [
    { text: "24/7 operations across all 10 strategic locations ensure your supply chain never sleeps. With round-the-clock customs clearance, dedicated security teams at each facility, redundant power and connectivity systems, and tested disaster recovery protocols, we keep cargo moving even when external conditions are challenging. Our SLA-backed uptime commitment of 99.5%+ means importers and exporters can plan production schedules, sales launches, and delivery commitments with absolute confidence." }
  ], image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80" },
];

const milestones = [
  { year: "2017", title: "Founded", desc: "Astromar established in Chennai with a vision to transform India's FTWZ landscape." },
  { year: "2018", title: "First FTWZ Facility", desc: "Launched our first FTWZ Warehouse near Chennai port — establishing the foundation for India's leading FTWZ network." },
  { year: "2019", title: "Pan-India Expansion", desc: "Expanded operations to Mumbai (JNPA) and Kochi." },
  { year: "2021", title: "Technology Platform", desc: "Deployed real-time inventory management systems." },
  { year: "2022", title: "Pan-India Scale", desc: "Established nationwide presence with FTWZ warehouses across key port cities including Chennai, Mumbai, Kochi, and Vizag." },
  { year: "2023", title: "Industry Recognition", desc: "Recognized among India's leading FTWZ operators for service excellence and compliance standards." },
  { year: "2024", title: "Cold Chain Launch", desc: "Introduced GDP-compliant cold storage facilities at Chennai and Mumbai locations." },
  { year: "2025", title: "Bengaluru Expansion", desc: "Launched new FTWZ warehouse at Devanahalli Aerospace SEZ, Bengaluru, strengthening South India logistics network." },
  { year: "2026", title: "10 FTWZ Locations", desc: "Reached pan-India coverage milestone — operating as India's leading FTWZ operator across 10 strategic ports and inland corridors from Mundra to Chennai." },
];

const certifications = [
  { title: "FTWZ Licence", desc: "Free Trade Warehousing Zone operational licence issued by the Government of India, authorizing duty-free storage and distribution of foreign goods." },
  { title: "MSME Licence", desc: "Registered Micro, Small & Medium Enterprise under the Ministry of MSME, Government of India, enabling priority sector benefits and compliance recognition." },
  { title: "MTO Licence", desc: "Multimodal Transport Operator licence authorizing end-to-end cargo movement across sea, air, rail, and road under a single contract of carriage." },
  { title: "RCMC Membership", desc: "Registration Cum Membership Certificate for SEZ & FTWZ operations, issued by the relevant Export Promotion Council under DGFT guidelines." },
  { title: "JC Trans Membership", desc: "Industry association membership for logistics & freight forwarding, affirming our commitment to global trade standards and professional ethics." },
  { title: "IEC Registration", desc: "Import Export Code registered with DGFT, Government of India — mandatory for all entities engaged in international trade operations." },
];

const processSteps = [
  {
    num: "01",
    title: "Initial Consultation",
    desc: "We understand your supply chain needs, import/export volumes, and identify the right FTWZ location for your business.",
  },
  {
    num: "02",
    title: "Documentation & Registration",
    desc: "Our team handles all FTWZ registration paperwork, SEZ approvals, and customs documentation on your behalf.",
  },
  {
    num: "03",
    title: "Warehouse Allocation & Setup",
    desc: "We allocate dedicated FTWZ Warehouse space, configure your WMS access, and set up inbound logistics from your supplier.",
  },
  {
    num: "04",
    title: "Go Live & Ongoing Support",
    desc: "Your goods move into the FTWZ. Our operations team provides 24/7 support, stock reports, and release management.",
  },
  {
    num: "05",
    title: "FTZ Warehouse",
    desc: "Every FTZ Warehouse is inspected and certified against SEZ compliance, security, and storage-zoning standards to ensure consistent facility quality across our network.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-brand-navy py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200"
          alt="Astromar Logistics — Free Trade Warehousing Zone operator with FTWZ Warehouse integration across India"
          fill
          sizes="100vw"
          className="absolute inset-0 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="w-full px-6 md:px-12 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center w-full">
            {/* LEFT - Text */}
            <div className="max-w-2xl">
              <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-3">
                ABOUT ASTROMAR
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                Free Trade Zone Port in India
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed mb-8">
                Since 2017, Astromar Logistics has been delivering trusted Free Trade Warehousing Zone operations across India — combining duty-free bonded storage, multimodal freight, and customs expertise across 10 strategic locations nationwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/contact-us" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:bg-accent/90 transition-colors">
                  Get In Touch →
                </a>
                <a href="/free-trade-zone-services" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors">
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
                <p className="text-4xl font-extrabold text-accent mb-2">10</p>
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
              <div className="bg-white border border-border rounded-xl p-6 h-full">
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

      {/* NEW: FTWZ Warehouse Integration */}
      <section className="py-14 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-3">FTWZ INTEGRATION</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Streamlining Customs with Strategic FTWZ Warehouse Integration
          </h2>
          <p className="text-base sm:text-lg text-foreground/70 leading-relaxed max-w-3xl mx-auto">
            Our integrated FTWZ Warehouse solutions are custom-built to eliminate traditional supply chain friction, offering businesses elite transit management and agile cargo handling.
          </p>
        </div>
      </section>

      {/* Marquee band */}
      <section className="bg-[#0a1628] py-5">
        <div
          className="overflow-hidden relative"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
        <div className="animate-marquee">
          {[...Array(2)].map((_, pass) => (
            <div key={pass} className="flex items-center gap-0 shrink-0">
              {[
                "500+ Clients Served",
                "10 FTWZ Locations Across India",
                "7+ Years of Excellence",
                "₹2000Cr+ Cargo Handled",
                "24/7 Operations Support",
                "SEZ & FTWZ Licensed",
                "MSME & IEC Registered",
                "Trusted by Global Freight Agents",
              ].map((item) => (
                <span key={item} className="flex items-center whitespace-nowrap">
                  <span className="text-white font-medium px-6" style={{ fontSize: "15px" }}>{item}</span>
                  <span className="text-[#f97316] font-bold" style={{ fontSize: "15px" }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <div className="text-center mx-auto mb-12 max-w-3xl">
              <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2">OUR VALUES</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">A Modern Approach to Free Trade and Warehousing Zones</h2>
              <p className="text-base text-foreground/70 leading-relaxed">
                Our values define how we deliver FTWZ Warehouse operations — from compliance and transparency to client partnership and continuous improvement.
              </p>
            </div>
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
                  <p className="text-base text-foreground/70 leading-relaxed">
                    {item.descSegments.map((seg, segIdx) => (
                      <span key={segIdx}>{seg.text}</span>
                    ))}
                  </p>
                </div>
              );
              const imageBlock = (
                <div className="relative h-[300px] w-full rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover"
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
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">OUR JOURNEY</p>
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
                          <div className="rounded-xl border border-gray-200 bg-slate-50 p-5 sm:p-6 shadow-sm text-right">
                            <p className="text-xl font-extrabold text-primary">{m.year}</p>
                            <p className="font-bold text-foreground mt-1">{m.title}</p>
                            <p className="text-sm sm:text-base text-foreground/80 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: m.desc }}></p>
                          </div>
                        )}
                      </div>
                      <div className={`md:w-1/2 md:pl-10 ${isLeft ? 'md:invisible' : ''}`}>
                        {!isLeft && (
                          <div className="rounded-xl border border-gray-200 bg-slate-50 p-5 sm:p-6 shadow-sm">
                            <p className="text-xl font-extrabold text-primary">{m.year}</p>
                            <p className="font-bold text-foreground mt-1">{m.title}</p>
                            <p className="text-sm sm:text-base text-foreground/80 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: m.desc }}></p>
                          </div>
                        )}
                      </div>
                      <div className="md:hidden rounded-xl border border-gray-200 bg-slate-50 p-5 shadow-sm">
                        <p className="text-xl font-extrabold text-primary">{m.year}</p>
                        <p className="font-bold text-foreground mt-1">{m.title}</p>
                        <p className="text-sm sm:text-base text-foreground/80 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: m.desc }}></p>
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
      <section className="pt-20 pb-20 bg-brand-light border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-2 text-center">TRUST &amp; COMPLIANCE</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground text-center mb-12">
              Certifications &amp; Accreditations
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
            {certifications.map((cert, i) => (
              <ScrollReveal key={cert.title} delay={i * 0.06} className="h-full">
                <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm h-full flex-col">
                  <div className="flex items-start gap-3 w-full">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-foreground font-semibold text-sm sm:text-base">{cert.title}</p>
                      <p className="text-foreground/80 text-xs sm:text-sm mt-1 leading-relaxed">{cert.desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-orange-500 uppercase mb-2">OUR PROCESS</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-16">Optimizing Global Trade Operations with Astromar Logistics</h2>
          </ScrollReveal>

          <div className="relative">
            {/* Dashed connector line — desktop only, sits behind step circles */}
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] border-t-2 border-dashed border-orange-300 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-6 relative z-10">
              {processSteps.map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 0.1}>
                  {/* Row on mobile (number + text side by side), centered column on desktop. Heading/description render once; only the number badge markup differs by breakpoint. */}
                  <div className="flex flex-row items-start gap-5 md:flex-col md:items-center md:gap-0 md:text-center">
                    {/* Mobile number badge */}
                    <div className="w-16 h-16 shrink-0 rounded-full border-2 border-orange-500 bg-orange-50 flex items-center justify-center md:hidden">
                      <span className="text-xl font-extrabold text-orange-500">{step.num}</span>
                    </div>
                    {/* Desktop number badge */}
                    <div className="hidden md:flex w-20 h-20 shrink-0 rounded-full border-2 border-orange-500 bg-card items-center justify-center mb-5 shadow-sm">
                      <span className="text-2xl font-extrabold text-orange-500">{step.num}</span>
                    </div>
                    <div className="pt-1 md:pt-0">
                      <h3 className="text-base font-bold text-foreground mb-1 md:mb-2">{step.title}</h3>
                      <p className="text-sm text-foreground/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: step.desc }}></p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />

      <WhatsAppButton />
    </div>
  );
};

export default About;
