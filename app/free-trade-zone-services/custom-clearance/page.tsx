import CustomClearanceClient from "./custom-clearance-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customs Clearance Services in India | AstroMar Logistics",
  description: "Licensed customs clearance across every Indian port & airport. Astromar handles import/export clearance with compliance expertise — zero delays, full visibility.",
  keywords: "customs clearance services india, customs broker india, import customs clearance, export customs clearance, customs house agent, cha india, port customs clearance, airport customs clearance, ftwz customs, customs compliance india",
  alternates: { canonical: "https://astromarfreezone.com/free-trade-zone-services/custom-clearance" },
  openGraph: {
    title: "Customs Clearance Services in India | AstroMar Logistics",
    description: "Licensed customs clearance across every Indian port and airport. Compliance-first import & export clearance with zero delays.",
    url: "https://astromarfreezone.com/free-trade-zone-services/custom-clearance",
    siteName: "Astromar Logistics",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customs Clearance Services in India | AstroMar Logistics",
    description: "Licensed customs clearance at every Indian port & airport — compliance-first, zero delays.",
  },
  robots: { index: true, follow: true },
};

const customClearanceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Customs Clearance Services in India",
  "name": "Astromar Customs Clearance",
  "description": "Licensed customs clearance services across every Indian port and airport — import, export, and FTWZ-bonded movement.",
  "provider": { "@type": "Organization", "name": "Astromar Logistics Pvt Ltd", "url": "https://astromarfreezone.com" },
  "areaServed": { "@type": "Country", "name": "India" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Customs Clearance Solutions",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Import Customs Clearance" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Export Customs Clearance" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "FTWZ Bonded Movement" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "HS Code Classification" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Duty Drawback & Compliance" } }
    ]
  }
};

const customClearanceBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Astromar", "item": "https://astromarfreezone.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://astromarfreezone.com/free-trade-zone-services" },
    { "@type": "ListItem", "position": 3, "name": "Customs Clearance", "item": "https://astromarfreezone.com/free-trade-zone-services/custom-clearance" }
  ]
};

export default function CustomClearancePage() {
  return (
    <>
      <CustomClearanceClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(customClearanceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(customClearanceBreadcrumbSchema) }} />
    </>
  );
}
