import CoastalShippingClient from "./coastal-shipping-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Port to Port Shipping in India — Coastal Cargo | Astromar",
  description: "Move cargo along India's 7,500+ km coastline. Greener, cost-effective alternative to road/rail for bulk, containerized & project cargo across all Indian ports.",
  keywords: "coastal shipping india, port to port shipping, indian coastal cargo, sea cargo india, coastal logistics, multimodal logistics india, container coastal shipping, bulk coastal shipping, coastal cargo network, indian ports shipping",
  alternates: { canonical: "https://www.astromarfreezone.com/coastal-shipping-free-trade-zone" },
  openGraph: {
    title: "Port to Port Shipping in India — Coastal Cargo Network",
    description: "Coastal shipping connecting all major and minor Indian ports — greener, cost-effective alternative to road and rail for bulk and containerized cargo.",
    url: "https://www.astromarfreezone.com/coastal-shipping-free-trade-zone",
    siteName: "Astromar Logistics",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Port to Port Shipping in India — Coastal Cargo Network",
    description: "Coastal cargo across India's 7,500+ km coastline — greener, cost-effective freight.",
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
    { "@type": "ListItem", "position": 2, "name": "Coastal Shipping", "item": "https://www.astromarfreezone.com/coastal-shipping-free-trade-zone" }
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
