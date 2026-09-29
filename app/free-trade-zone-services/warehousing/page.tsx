import WarehousingClient from "./warehousing-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warehousing Services in India | Astromar Logistics",
  description: "Astromar Logistics offers warehousing services in India — FTWZ storage, cold storage, real-time inventory and value-added services across key hubs.",
  keywords: "warehousing services in India, cold storage warehouse, FTWZ warehouse, temperature-controlled storage, Astromar Logistics",
  alternates: { canonical: "https://www.astromarfreezone.com/free-trade-zone-services/warehousing" },
  openGraph: {
    title: "Warehousing Services in India | Astromar Logistics",
    description: "Astromar Logistics offers warehousing services in India — FTWZ storage, cold storage, real-time inventory and value-added services across key hubs.",
    url: "https://www.astromarfreezone.com/free-trade-zone-services/warehousing",
    siteName: "Astromar Logistics",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Warehousing Services in India | Astromar Logistics",
    description: "Astromar Logistics offers warehousing services in India — FTWZ storage, cold storage, real-time inventory and value-added services across key hubs.",
  },
  robots: { index: true, follow: true },
};

const warehousingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Bonded Warehousing in India",
  "name": "Astromar FTWZ Warehousing & Storage",
  "description": "FTWZ-bonded warehousing services across India — multi-temperature storage, real-time inventory management, and value-added services.",
  "provider": { "@type": "Organization", "name": "Astromar Logistics Pvt Ltd", "url": "https://www.astromarfreezone.com" },
  "areaServed": { "@type": "Country", "name": "India" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Warehousing Solutions",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "FTWZ Bonded Storage" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Multi-Temperature Cold Storage" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Value-Added Services (Pick-Pack-Label)" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Real-Time Inventory Management" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bulk & Pallet Storage" } }
    ]
  }
};

const warehousingBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Astromar", "item": "https://www.astromarfreezone.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.astromarfreezone.com/free-trade-zone-services" },
    { "@type": "ListItem", "position": 3, "name": "Warehousing", "item": "https://www.astromarfreezone.com/free-trade-zone-services/warehousing" }
  ]
};

export default function WarehousingPage() {
  return (
    <>
      <WarehousingClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(warehousingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(warehousingBreadcrumbSchema) }} />
    </>
  );
}
