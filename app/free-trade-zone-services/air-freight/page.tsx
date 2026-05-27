import AirFreightClient from "./air-freight-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Air Freight India — Express Cargo to 100+ Destinations | Astromar",
  description: "AstroMar Air Freight India: express delivery, charter services & DGR-certified handling. Connecting India to 100+ global destinations with FTWZ integration.",
  keywords: "air freight india, air cargo india, express air freight, charter services india, dgr cargo handling, international air freight, perishable air cargo, freight forwarder india, air freight to usa, air freight to europe",
  alternates: { canonical: "https://astromarfreezone.com/free-trade-zone-services/air-freight" },
  openGraph: {
    title: "Air Freight India — Express Cargo to 100+ Destinations",
    description: "Express delivery, charter services & DGR-certified air freight from India to 100+ global destinations, fully integrated with FTWZ.",
    url: "https://astromarfreezone.com/free-trade-zone-services/air-freight",
    siteName: "Astromar Logistics",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Air Freight India — Express Cargo to 100+ Destinations",
    description: "Express delivery, charter & DGR-certified air cargo from India to 100+ global destinations.",
  },
  robots: { index: true, follow: true },
};

const airFreightSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Air Freight in India",
  "name": "Astromar Air Freight",
  "description": "Express air freight services from India to 100+ global destinations — charter, DGR-certified handling, perishables, and time-critical cargo.",
  "provider": {
    "@type": "Organization",
    "name": "Astromar Logistics Pvt Ltd",
    "url": "https://astromarfreezone.com"
  },
  "areaServed": { "@type": "Country", "name": "India" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Air Freight Solutions",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Express Air Freight" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Charter Services" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "DGR-Certified Cargo Handling" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Perishable & Pharma Air Cargo" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Consolidation & Deconsolidation" } }
    ]
  }
};

const airFreightBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Astromar", "item": "https://astromarfreezone.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://astromarfreezone.com/free-trade-zone-services" },
    { "@type": "ListItem", "position": 3, "name": "Air Freight", "item": "https://astromarfreezone.com/free-trade-zone-services/air-freight" }
  ]
};

export default function AirFreightPage() {
  return (
    <>
      <AirFreightClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(airFreightSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(airFreightBreadcrumbSchema) }}
      />
    </>
  );
}
