import CoastalShippingClient from "./coastal-shipping-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coastal Shipping in India | Astromar Logistics",
  description: "Astromar Logistics offers coastal shipping in India across 12+ ports — a greener, cost-effective alternative to road for bulk and containerized cargo.",
  keywords: "coastal shipping in India, port to port shipping, coastal cargo, domestic shipping, Astromar Logistics",
  alternates: { canonical: "https://www.astromarfreezone.com/free-trade-zone-services/coastal-shipping" },
  openGraph: {
    title: "Coastal Shipping in India | Astromar Logistics",
    description: "Astromar Logistics offers coastal shipping in India across 12+ ports — a greener, cost-effective alternative to road for bulk and containerized cargo.",
    url: "https://www.astromarfreezone.com/free-trade-zone-services/coastal-shipping",
    siteName: "Astromar Logistics",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coastal Shipping in India | Astromar Logistics",
    description: "Astromar Logistics offers coastal shipping in India across 12+ ports — a greener, cost-effective alternative to road for bulk and containerized cargo.",
  },
  robots: { index: true, follow: true },
};

const coastalShippingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Coastal Shipping in India",
  "name": "Astromar Coastal Shipping Network",
  "description": "Port-to-port coastal cargo services across India's 7,500+ km coastline — bulk, containerized, and project cargo.",
  "provider": { "@type": "Organization", "name": "Astromar Logistics Pvt Ltd", "url": "https://www.astromarfreezone.com" },
  "areaServed": { "@type": "Country", "name": "India" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Coastal Shipping Solutions",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Container Coastal Shipping" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bulk Coastal Cargo" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Project & Heavy-Lift Coastal Movement" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Multimodal Coast-to-Hinterland Connectivity" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Minor Port Feeder Services" } }
    ]
  }
};

const coastalShippingBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Astromar", "item": "https://www.astromarfreezone.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.astromarfreezone.com/free-trade-zone-services" },
    { "@type": "ListItem", "position": 3, "name": "Coastal Shipping", "item": "https://www.astromarfreezone.com/free-trade-zone-services/coastal-shipping" }
  ]
};

export default function CoastalShippingPage() {
  return (
    <>
      <CoastalShippingClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(coastalShippingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(coastalShippingBreadcrumbSchema) }} />
    </>
  );
}
