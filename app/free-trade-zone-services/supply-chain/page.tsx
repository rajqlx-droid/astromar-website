import SupplyChainClient from "./supply-chain-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supply Chain Solutions India — End-to-End | Astromar",
  description: "Astromar Supply Chain Solutions India: procurement to last-mile delivery with real-time visibility. Reduce costs, build resilience across every node in your ops.",
  keywords: "supply chain solutions india, end to end supply chain, integrated logistics india, procurement to delivery, last mile delivery india, supply chain visibility, 3pl india, 4pl india, supply chain management india, logistics optimization",
  alternates: { canonical: "https://www.astromarfreezone.com/free-trade-zone-services/supply-chain" },
  openGraph: {
    title: "Supply Chain Solutions India — Integrated & End-to-End",
    description: "Procurement to last-mile delivery with real-time visibility. End-to-end supply chain solutions across India.",
    url: "https://www.astromarfreezone.com/free-trade-zone-services/supply-chain",
    siteName: "Astromar Logistics",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Supply Chain Solutions India — Integrated & End-to-End",
    description: "Procurement to last-mile delivery with real-time visibility across every node.",
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
    { "@type": "ListItem", "position": 3, "name": "Supply Chain", "item": "https://www.astromarfreezone.com/free-trade-zone-services/supply-chain" }
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
