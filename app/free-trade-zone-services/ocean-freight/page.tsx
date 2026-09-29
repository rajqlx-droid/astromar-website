import OceanFreightClient from "./ocean-freight-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ocean Freight Services in India | Astromar Logistics",
  description: "Astromar Logistics provides ocean freight services in India — FCL, LCL, breakbulk and reefer shipping across 150+ global ports, integrated with FTWZ.",
  keywords: "ocean freight services in India, sea freight, FCL shipping, LCL shipping, Astromar Logistics",
  alternates: { canonical: "https://www.astromarfreezone.com/free-trade-zone-services/ocean-freight" },
  openGraph: {
    title: "Ocean Freight Services in India | Astromar Logistics",
    description: "Astromar Logistics provides ocean freight services in India — FCL, LCL, breakbulk and reefer shipping across 150+ global ports, integrated with FTWZ.",
    url: "https://www.astromarfreezone.com/free-trade-zone-services/ocean-freight",
    siteName: "Astromar Logistics",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ocean Freight Services in India | Astromar Logistics",
    description: "Astromar Logistics provides ocean freight services in India — FCL, LCL, breakbulk and reefer shipping across 150+ global ports, integrated with FTWZ.",
  },
  robots: { index: true, follow: true },
};

const oceanFreightSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Ocean Freight in India",
  "name": "Astromar Ocean Freight",
  "description": "Global ocean freight forwarding from India — FCL, LCL, breakbulk, and reefer with FTWZ integration for duty deferral.",
  "provider": {
    "@type": "Organization",
    "name": "Astromar Logistics Pvt Ltd",
    "url": "https://www.astromarfreezone.com"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Ocean Freight Solutions",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "FCL — Full Container Load" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "LCL — Less than Container Load" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Breakbulk Shipping" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Reefer Container Shipping" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Project & Over-Dimensional Cargo" } }
    ]
  }
};

const oceanFreightBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Astromar", "item": "https://www.astromarfreezone.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.astromarfreezone.com/free-trade-zone-services" },
    { "@type": "ListItem", "position": 3, "name": "Ocean Freight", "item": "https://www.astromarfreezone.com/free-trade-zone-services/ocean-freight" }
  ]
};

export default function OceanFreightPage() {
  return (
    <>
      <OceanFreightClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(oceanFreightSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(oceanFreightBreadcrumbSchema) }}
      />
    </>
  );
}
