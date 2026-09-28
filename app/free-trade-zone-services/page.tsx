import ServicesClient from "./services-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/free-trade-zone-services" },
  title: "Free Trade Warehousing Zone Solutions | Astromar Logistics",
  description: "Astromar Logistics offers free trade warehousing zone solutions with freight, customs clearance and supply chain services across 10 locations in India.",
  keywords: "free trade warehousing zone solutions, freight forwarding services, customs clearance services, supply chain solutions",
  openGraph: {
    title: "Free Trade Warehousing Zone Solutions | Astromar Logistics",
    description: "Astromar Logistics offers free trade warehousing zone solutions with freight, customs clearance and supply chain services across 10 locations in India.",
    url: "https://www.astromarfreezone.com/free-trade-zone-services",
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
    "url": "https://www.astromarfreezone.com"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Astromar FTWZ & Logistics Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "FTWZ Warehousing", "url": "https://www.astromarfreezone.com/free-trade-zone" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Coastal Shipping", "url": "https://www.astromarfreezone.com/free-trade-zone-services/coastal-shipping" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ocean Freight", "url": "https://www.astromarfreezone.com/free-trade-zone-services/ocean-freight" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Air Freight", "url": "https://www.astromarfreezone.com/free-trade-zone-services/air-freight" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Supply Chain", "url": "https://www.astromarfreezone.com/free-trade-zone-services/supply-chain-management" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Clearance", "url": "https://www.astromarfreezone.com/free-trade-zone-services/customs-clearance" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Warehousing", "url": "https://www.astromarfreezone.com/free-trade-zone-services/warehousing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Project Cargo", "url": "https://www.astromarfreezone.com/free-trade-zone-services/project-cargo" } }
    ]
  }
};

const servicesBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Astromar", "item": "https://www.astromarfreezone.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.astromarfreezone.com/free-trade-zone-services" }
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
