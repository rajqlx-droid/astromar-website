import type { Metadata } from "next";
import FreightClient from "./freight-client";

export const metadata: Metadata = {
  title: "Freight Cost Calculator India: CBM, Import Duty | Astromar",
  description: "Free freight calculator tools for India — CBM calculator, container load optimizer, import duty & landed cost, air vs sea comparison for importers.",
  keywords: "freight calculator india, cbm calculator, volumetric weight calculator, landed cost calculator india, export price calculator, fob cif calculator, air vs sea comparison, demurrage calculator, container load calculator, freight tools india, astromar freight intelligence",
  alternates: { canonical: "https://www.astromarfreezone.com/freight-intelligence" },
  openGraph: {
    title: "Freight Cost Calculator India: CBM, Import Duty | Astromar",
    description: "Free freight calculators for Indian importers — CBM, import duty, export pricing, air vs sea, demurrage. No signup, your data stays in your browser.",
    url: "https://www.astromarfreezone.com/freight-intelligence",
    siteName: "Astromar Logistics",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://www.astromarfreezone.com/og-freight-intelligence.png",
        width: 1200,
        height: 630,
        alt: "Astromar Freight Calculator Tools for India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freight Cost Calculator India: CBM, Import Duty | Astromar",
    description: "Free CBM, import duty, export price, air vs sea, and demurrage calculators for Indian importers and exporters.",
    images: ["https://www.astromarfreezone.com/og-freight-intelligence.png"],
  },
  robots: { index: true, follow: true },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Astromar Freight Intelligence",
  url: "https://www.astromarfreezone.com/freight-intelligence",
  description: "Free freight calculator suite for Indian importers and exporters — CBM/load optimizer, IATA volumetric weight, landed cost (BCD + IGST), export price (FOB/CIF), air vs sea comparison, and demurrage risk.",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Logistics & Freight Calculator",
  operatingSystem: "Any (Web Browser)",
  browserRequirements: "Modern web browser with JavaScript enabled",
  inLanguage: "en-IN",
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  featureList: [
    "CBM Calculator & Load Optimizer with 3D loading plan",
    "Air Volumetric Weight Calculator (IATA divisor)",
    "Landed Cost Calculator with BCD and IGST",
    "Export Price Calculator (FOB / CIF / Margin)",
    "Air vs Sea Comparison with working capital cost",
    "Demurrage Risk Calculator for Indian ports",
    "Multi-currency support with FX rates",
    "CSV import for bulk line items",
    "Side-by-side split-compare view",
    "Saved calculations and history (browser-local)",
  ],
  publisher: {
    "@type": "Organization",
    name: "Astromar Logistics Pvt Ltd",
    url: "https://www.astromarfreezone.com",
  },
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is CBM calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CBM = Length × Width × Height ÷ 1,000,000 (cm to m³). For multiple cartons, multiply by quantity.",
      },
    },
    {
      "@type": "Question",
      name: "Why is volumetric weight ÷5000 for sea and ÷6000 for air?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sea LCL freight uses a 1:1000 ratio between m³ and kg (so chargeable kg = CBM × 200). Airlines apply the IATA 6000 divisor for low-density cargo.",
      },
    },
    {
      "@type": "Question",
      name: "What duty rate should I use for landed cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the BCD (Basic Customs Duty) rate from your product's HSN code. Add IGST on (CIF + Duty). Default 10% / 18% are common, but always verify your HSN.",
      },
    },
    {
      "@type": "Question",
      name: "How is the air vs sea comparison fair?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We add the working-capital cost of having goods in transit (product value × daily rate × days) to each freight cost, so you compare the true cash impact.",
      },
    },
    {
      "@type": "Question",
      name: "What counts as a free day at the port?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most Indian ports give 4–5 free days from container landing. After that, demurrage stacks daily and may double after a week.",
      },
    },
    {
      "@type": "Question",
      name: "Are my saved calculations stored on a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Saves and history live entirely in your browser's localStorage. Clearing your browser data deletes them.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.astromarfreezone.com" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://www.astromarfreezone.com/freight-intelligence" },
  ],
};

export default function FreightIntelligencePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Visible page heading */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 pt-8 pb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1B3A6B] leading-tight">
          Free Freight Cost Calculator for India
        </h1>
        <div className="mt-4 h-[5px] w-[90px] rounded-full bg-gradient-to-r from-[#F97316] to-[#FBBF77]" />
        <p className="mt-3 text-gray-600 text-base">
          Free freight calculators for Indian importers and exporters — estimate CBM and container loading, volumetric weight, import duty and landed cost, export pricing, air vs sea, and demurrage. No signup; your data stays in your browser.
        </p>
      </div>

      <div className="border-t border-gray-100" />

      <FreightClient />
    </>
  );
}
