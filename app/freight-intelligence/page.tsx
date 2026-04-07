"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, TrendingUp, DollarSign, AlertTriangle, Package, Ship } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import CargoIntelligence from "@/components/freight/CargoIntelligence";
import FreightIntel from "@/components/freight/FreightIntelligence";
import CostIntelligence from "@/components/freight/CostIntelligence";
import RiskIntelligence from "@/components/freight/RiskIntelligence";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tabs = [
  { id: "cargo", label: "Cargo Intelligence", sub: "CBM · Volume · Container Fit", icon: Globe },
  { id: "freight", label: "Freight Intelligence", sub: "Air vs Sea · Break-even", icon: TrendingUp },
  { id: "cost", label: "Cost Intelligence", sub: "Landed Cost · Profit Margin", icon: DollarSign },
  { id: "risk", label: "Risk Intelligence", sub: "Demurrage · Delay Cost", icon: AlertTriangle },
];

const tabContent: Record<string, React.FC> = {
  cargo: CargoIntelligence,
  freight: FreightIntel,
  cost: CostIntelligence,
  risk: RiskIntelligence,
};

const educationalContent: Record<string, { icon: React.ReactNode; title: string; paragraphs: string[]; formulas?: { label: string; formula: string }[]; highlight?: string }> = {
  cargo: {
    icon: <Package className="w-8 h-8 text-primary" />,
    title: "What Is CBM and How to Calculate It?",
    paragraphs: [
      "CBM (Cubic Meter) is the universal unit for measuring cargo volume in international shipping. The formula is straightforward: Length (m) × Width (m) × Height (m) × Quantity = Total CBM. However, real-world shipping involves additional complexity – volumetric weight calculations using the ÷6000 divisor for air freight, cargo density analysis, and container loading optimisation for 20ft, 40ft, and 40HC containers.",
      "Our Cargo Mode handles all of this automatically. Enter dimensions in any unit (mm, cm, m, or ft), add multiple items, and instantly see total CBM, chargeable weight, cargo density, and container fit with utilisation percentages. This eliminates the guesswork that leads to costly container under-utilisation or overweight penalties.",
    ],
  },
  freight: {
    icon: <Ship className="w-8 h-8 text-primary" />,
    title: "Air Freight vs Sea Freight Comparison",
    paragraphs: [
      "The air freight vs sea freight comparison is one of the most critical decisions in international logistics. Most shippers compare only direct freight costs – this is misleading. A complete analysis must include inventory holding costs, insurance premiums, demurrage risk, and opportunity cost of delayed market entry.",
      "For high-value cargo like electronics, pharmaceuticals, or fashion goods, air freight often has a lower total landed cost than sea freight once holding costs are factored in. Our Freight Mode calculates this break-even threshold automatically so you can make data-driven shipping decisions.",
    ],
    formulas: [
      { label: "Total Landed Cost", formula: "Freight + Duties + Insurance + Holding Cost + Clearing + Transport" },
      { label: "Inventory Holding Cost", formula: "Cargo Value × Annual Rate (12%) × Transit Days ÷ 365" },
      { label: "Break-even Value", formula: "(Air Premium × 365) ÷ (Holding Rate × Transit Day Difference)" },
    ],
  },
  cost: {
    icon: <DollarSign className="w-8 h-8 text-primary" />,
    title: "How to Calculate Landed Cost for Imports",
    paragraphs: [
      "Landed cost is the total price of importing goods from a foreign supplier to your warehouse. It goes far beyond the CIF (Cost, Insurance, Freight) value quoted on the commercial invoice.",
      "For Indian importers, duties and taxes can add 20-40% to the invoice value depending on the HS Code classification. Our Cost Mode computes this entire breakdown instantly, showing duty as a percentage of CIF value so you can evaluate whether your pricing model remains profitable. For detailed HS-code-specific duty rates, see our import duty calculation guide.",
    ],
    formulas: [
      { label: "Total Landed Cost", formula: "CIF Value + Customs Duty + IGST + Clearing Charges + Inland Transport + Insurance + Other Charges" },
      { label: "Customs Duty", formula: "Assessable Value × Duty Rate (%)" },
      { label: "IGST", formula: "(Assessable Value + Customs Duty) × IGST Rate (%)" },
    ],
  },
  risk: {
    icon: <AlertTriangle className="w-8 h-8 text-accent" />,
    title: "What Is Demurrage and Detention?",
    paragraphs: [
      "Demurrage and detention are daily penalty charges imposed by shipping lines when containers are not returned within the agreed timeframe. Demurrage applies when a loaded container stays at the port or terminal beyond the free days. Detention applies when the empty container is held at the consignee's premises beyond the allowed period.",
      "These charges can escalate rapidly – from $50/day in the first week to $200+/day after 14 days. Our Risk Mode provides a real-time countdown showing free days remaining, chargeable days accrued, and projected total loss. This visibility helps logistics teams prioritise container clearance and avoid unnecessary costs. For detailed delay cost analysis, see our demurrage and detention calculator.",
      "FTWZ advantage: By storing goods in a Free Trade Warehousing Zone, containers are de-stuffed immediately upon arrival – eliminating demurrage risk entirely. Customs duty is deferred until goods are released for domestic consumption, reducing both delay costs and working capital requirements.",
    ],
  },
};

const faqItems = [
  { q: "What is CBM and how do you calculate it?", a: "CBM stands for Cubic Meter. It is calculated as Length × Width × Height (all in meters) × Quantity. For example, a box measuring 1.2m × 0.8m × 0.6m has a CBM of 0.576 m³. Our calculator supports input in cm, inches, and meters with automatic conversion." },
  { q: "How is volumetric weight calculated for air freight?", a: "Volumetric weight for air freight is calculated by dividing the volume in cubic centimeters by 6000. For sea freight, it's calculated by multiplying CBM by 1000. The chargeable weight is whichever is higher – actual weight or volumetric weight." },
  { q: "How do I calculate total landed cost for imports?", a: "Total landed cost = CIF Value + Customs Duty + IGST + Clearing Charges + Inland Transport + Insurance + Other Charges. CIF Value is the sum of product cost, freight, and insurance. Customs duty and IGST are percentage-based on the assessable value." },
  { q: "What is the difference between air freight and sea freight costs?", a: "Air freight has higher per-kg rates but lower transit times (2-5 days vs 25-40 days). For high-value cargo, the inventory holding cost saved by air freight can offset the higher freight rate, making it more economical overall." },
  { q: "What are demurrage and detention charges in shipping?", a: "Demurrage is charged when a loaded container stays at the port beyond free days. Detention is charged when an empty container is held at the consignee's premises beyond the allowed period. Both escalate daily and can significantly increase import costs." },
  { q: "How many containers do I need for my shipment?", a: "This depends on your cargo volume (CBM) and weight. A 20ft container holds ~33 CBM (max ~28 tons), a 40ft holds ~67 CBM (max ~26 tons), and a 40HC holds ~76 CBM. Our calculator shows utilisation percentages for each container type." },
  { q: "What is cargo density and why does it matter?", a: "Cargo density = weight (kg) ÷ volume (m³). It determines whether cargo is 'heavy' (dense) or 'light' (voluminous). Dense cargo is charged by weight; light cargo by volume. Understanding density helps optimise container loading and freight costs." },
  { q: "How does FTWZ reduce import costs and demurrage risk?", a: "Free Trade Warehousing Zones allow duty-free storage of imported goods. Containers are de-stuffed immediately on arrival (eliminating demurrage), and customs duty is deferred until goods are released for domestic consumption, improving cash flow." },
  { q: "What is break-even cargo value in freight comparison?", a: "Break-even cargo value is the threshold above which air freight becomes more cost-effective than sea freight when inventory holding costs are factored in. Our Freight Mode calculates this automatically based on your specific rates and transit times." },
  { q: "How accurate are these shipping calculators?", a: "Our calculators provide close estimates based on standard industry formulas. Actual costs may vary based on specific carrier rates, port charges, and regulatory changes. For precise quotations, contact our team for a customized assessment." },
];

const FreightIntelligence = () => {
  const [activeTab, setActiveTab] = useState("cargo");
  const ActiveComponent = tabContent[activeTab];
  const education = educationalContent[activeTab];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <Header />

      {/* Hero */}
      <section className="bg-brand-navy py-10 sm:py-16 text-center">
        <div className="container px-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-primary/20 border border-primary/30 px-4 py-1.5 mb-4"
          >
            <span className="text-sm font-semibold text-primary-foreground/90 tracking-wide">
              SMART LOGISTICS TOOLS
            </span>
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4"
          >
            All-in-One Shipping &amp; Freight Intelligence Tools
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-primary-foreground/70 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base"
          >
            Calculate cargo volume with our <strong>CBM calculator</strong>, compare costs using the{" "}
            <strong>freight calculator</strong>, estimate total import costs with the{" "}
            <strong>landed cost calculator</strong>, track delay penalties via the{" "}
            <strong>demurrage calculator</strong>, and run <strong>air vs sea comparison</strong> – all in one
            unified platform built for global trade professionals.
          </motion.p>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-0 z-20 bg-background border-b border-border shadow-sm">
        <div className="container px-4">
          <div className="flex overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 sm:gap-2.5 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 min-w-0 ${
                  activeTab === tab.id
                    ? "border-primary bg-primary text-primary-foreground rounded-t-lg"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon size={16} className="shrink-0" />
                <div className="text-left">
                  <div className="truncate">{tab.label}</div>
                  <div className={`text-[10px] sm:text-xs font-normal hidden sm:block ${activeTab === tab.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {tab.sub}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calculator App */}
      <div className="container px-4 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Educational Content (SEO) */}
      <div className="container px-4 pb-8 sm:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={`edu-${activeTab}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-5">
              {education.icon}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground">
                {education.title}
              </h2>
            </div>

            <div className="space-y-5">
              {education.paragraphs.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  {p}
                </p>
              ))}
            </div>

            {education.formulas && (
              <div className="mt-6 rounded-xl border border-border bg-muted/50 p-5 sm:p-6 space-y-3">
                {education.formulas.map((f) => (
                  <p key={f.label} className="text-sm sm:text-base">
                    <strong className="text-foreground">{f.label}</strong>
                    <span className="text-muted-foreground"> = {f.formula}</span>
                  </p>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container px-4">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground text-center mb-10">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <AccordionItem value={`faq-${i}`} className="rounded-xl border border-border bg-card px-5 shadow-sm">
                    <AccordionTrigger className="text-sm sm:text-base font-semibold text-foreground hover:no-underline py-4">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                </ScrollReveal>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto space-y-10">
            <ScrollReveal>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-foreground mb-4">
                  About Our All-in-One Shipping Intelligence Tools
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Astromar Logistics offers a comprehensive suite of free shipping and freight calculators designed for importers, exporters, freight forwarders, and supply chain professionals. Whether you need to calculate CBM for container loading, compare air freight vs sea freight costs, estimate total landed cost for imports into India, or track demurrage and detention charges – our tools provide instant, accurate results powered by industry-standard formulas.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Free CBM Calculator for Shipping
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Our CBM (Cubic Meter) calculator supports multiple units – centimeters, meters, millimeters, inches, and feet. Add unlimited items with different dimensions and quantities to compute total shipment volume, volumetric weight (using the ÷6000 divisor for air freight), cargo density, and optimal container fit for 20ft, 40ft, and 40ft High Cube containers. Ideal for freight forwarders, warehouse operators, and logistics coordinators planning shipments.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Air Freight vs Sea Freight Cost Comparison
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Go beyond simple rate comparison. Our Freight Intelligence module factors in inventory holding costs, insurance premiums, transit time differences, and opportunity costs to calculate the true break-even cargo value. This helps importers determine when air freight becomes more cost-effective than sea freight – a critical decision for high-value goods like electronics, pharmaceuticals, and fashion merchandise.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Landed Cost Calculator for Indian Imports
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Calculate the complete cost of importing goods into India including CIF value, customs duty, IGST, clearing charges, inland transport, insurance, and other charges. Our Cost Intelligence module shows duty as a percentage of CIF value and computes profit margins based on your selling price – essential for importers evaluating pricing strategies and product viability.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Demurrage &amp; Detention Calculator
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Track container free days, calculate accrued demurrage and detention charges, and project total delay costs with our Risk Intelligence module. Understand how FTWZ (Free Trade Warehousing Zone) storage can eliminate demurrage risk entirely by enabling immediate container de-stuffing upon arrival at port. This tool is invaluable for logistics managers, customs brokers, and importers managing container turnaround times.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Built by Astromar Logistics
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  These tools are built and maintained by Astromar Logistics Pvt Ltd – India's leading FTWZ provider with 9+ locations, 5 lakh+ sq. ft. of warehouse space, and 7+ years of experience in global logistics. Our tools are informed by real-world expertise in customs clearance, freight forwarding, cold chain logistics, and supply chain optimization across air, sea, and multimodal networks.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default FreightIntelligence;
