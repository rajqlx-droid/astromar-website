import ServicesClient from "./services-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FTWZ Services & Logistics Solutions in India | Astromar",
  description: "Astromar's Free Trade Warehousing Zone services and integrated logistics — FTWZ warehousing, ocean freight, air freight, customs clearance, supply chain, and project cargo across India.",
  keywords: "free trade warehousing zone, ftwz in india, ftwz warehouse, free trade zone, free trade warehousing zone india, ftwz services india, logistics services india, ocean freight india, air freight india, customs clearance india, supply chain india, freight forwarding services india",
  openGraph: {
    title: "FTWZ Services & Logistics Solutions in India | Astromar",
    description: "FTWZ warehousing, ocean freight, air freight, customs clearance, and supply chain solutions across 10 strategic Indian locations.",
    url: "https://astromarfreezone.com/free-trade-zone-services",
    siteName: "Astromar Logistics",
    type: "website",
  },
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Free Trade Warehousing Zone and Logistics Services",
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
    "name": "Astromar FTWZ & Logistics Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "FTWZ Warehousing", "url": "https://astromarfreezone.com/free-trade-zone" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Coastal Shipping", "url": "https://astromarfreezone.com/coastal-shipping-free-trade-zone" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ocean Freight", "url": "https://astromarfreezone.com/free-trade-zone-services/ocean-freight" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Air Freight", "url": "https://astromarfreezone.com/free-trade-zone-services/air-freight" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Supply Chain", "url": "https://astromarfreezone.com/free-trade-zone-services/supply-chain" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Clearance", "url": "https://astromarfreezone.com/free-trade-zone-services/custom-clearance" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Warehousing", "url": "https://astromarfreezone.com/free-trade-zone-services/warehousing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Project Cargo", "url": "https://astromarfreezone.com/free-trade-zone-services/projects" } }
    ]
  }
};

const servicesBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Astromar", "item": "https://astromarfreezone.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://astromarfreezone.com/free-trade-zone-services" }
  ]
};

export default function ServicesPage() {
  return (
    <>
      <ServicesClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesBreadcrumbSchema) }}
      />
    </>
  );
}
