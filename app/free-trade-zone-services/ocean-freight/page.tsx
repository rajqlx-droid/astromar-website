import OceanFreightClient from "./ocean-freight-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ocean Freight in India — Ocean Freight Logistics & Sea Freight | Astromar",
  description: "Ocean freight in India with FCL, LCL, breakbulk, and reefer across 150+ ports. Astromar's ocean freight logistics + sea freight India network with FTWZ integration.",
  keywords: "ocean freight in india, ocean freight logistics, sea freight india, ocean freight services india, fcl shipping india, lcl shipping india, freight forwarder india, ocean cargo india, container shipping india",
  openGraph: {
    title: "Ocean Freight & Freight Forwarding Services from India | Astromar",
    description: "FCL, LCL, breakbulk, and reefer ocean freight from India across 150+ global ports, integrated with FTWZ for duty deferment.",
    url: "https://astromarfreezone.com/free-trade-zone-services/ocean-freight",
    siteName: "Astromar Logistics",
    type: "website",
  },
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
    "url": "https://astromarfreezone.com"
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
    { "@type": "ListItem", "position": 1, "name": "Astromar", "item": "https://astromarfreezone.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://astromarfreezone.com/free-trade-zone-services" },
    { "@type": "ListItem", "position": 3, "name": "Ocean Freight", "item": "https://astromarfreezone.com/free-trade-zone-services/ocean-freight" }
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
