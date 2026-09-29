import SupplyChainClient from "./supply-chain-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supply Chain Management in India | Astromar Logistics",
  description: "Astromar Logistics offers supply chain management in India — procurement to last-mile delivery, FTWZ warehousing and live visibility across every node.",
  keywords: "supply chain management in India, third party logistics, 3PL services, end-to-end logistics, Astromar Logistics",
  alternates: { canonical: "https://www.astromarfreezone.com/free-trade-zone-services/supply-chain-management" },
  openGraph: {
    title: "Supply Chain Management in India | Astromar Logistics",
    description: "Astromar Logistics offers supply chain management in India — procurement to last-mile delivery, FTWZ warehousing and live visibility across every node.",
    url: "https://www.astromarfreezone.com/free-trade-zone-services/supply-chain-management",
    siteName: "Astromar Logistics",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Supply Chain Management in India | Astromar Logistics",
    description: "Astromar Logistics offers supply chain management in India — procurement to last-mile delivery, FTWZ warehousing and live visibility across every node.",
  },
  robots: { index: true, follow: true },
};

const supplyChainSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Supply Chain Solutions in India",
  "name": "Astromar Supply Chain Solutions",
  "description": "Integrated, end-to-end supply chain solutions covering procurement, warehousing, distribution, and last-mile delivery across India.",
  "provider": { "@type": "Organization", "name": "Astromar Logistics Pvt Ltd", "url": "https://www.astromarfreezone.com" },
  "areaServed": { "@type": "Country", "name": "India" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Supply Chain Solutions",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Procurement & Sourcing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Inventory Management" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Distribution Logistics" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Last-Mile Delivery" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Real-Time Visibility & Analytics" } }
    ]
  }
};

const supplyChainBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Astromar", "item": "https://www.astromarfreezone.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.astromarfreezone.com/free-trade-zone-services" },
    { "@type": "ListItem", "position": 3, "name": "Supply Chain", "item": "https://www.astromarfreezone.com/free-trade-zone-services/supply-chain-management" }
  ]
};

export default function SupplyChainPage() {
  return (
    <>
      <SupplyChainClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(supplyChainSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(supplyChainBreadcrumbSchema) }} />
    </>
  );
}
