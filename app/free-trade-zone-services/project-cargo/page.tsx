import ProjectsClient from "./projects-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heavy Lift Logistics & Project Cargo in India | Astromar",
  description: "Astromar Logistics provides heavy lift logistics and ODC cargo transport for project cargo across India — route surveys, permits, escorts and placement.",
  keywords: "heavy lift logistics, ODC cargo, project cargo, over dimensional cargo transport, Astromar Logistics",
  alternates: { canonical: "https://www.astromarfreezone.com/free-trade-zone-services/project-cargo" },
  openGraph: {
    title: "Heavy Lift Logistics & Project Cargo in India | Astromar",
    description: "Astromar Logistics provides heavy lift logistics and ODC cargo transport for project cargo across India — route surveys, permits, escorts and placement.",
    url: "https://www.astromarfreezone.com/free-trade-zone-services/project-cargo",
    siteName: "Astromar Logistics",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heavy Lift Logistics & Project Cargo in India | Astromar",
    description: "Astromar Logistics provides heavy lift logistics and ODC cargo transport for project cargo across India — route surveys, permits, escorts and placement.",
  },
  robots: { index: true, follow: true },
};

const projectsSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Project Cargo & Heavy-Lift Logistics in India",
  "name": "Astromar Project Cargo & Heavy-Lift Logistics",
  "description": "Engineered transport of oversized, overweight, and high-value project cargo across India and globally — from route surveys to final placement.",
  "provider": { "@type": "Organization", "name": "Astromar Logistics Pvt Ltd", "url": "https://www.astromarfreezone.com" },
  "areaServed": { "@type": "Country", "name": "India" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Project Cargo Solutions",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Route Surveys & Feasibility Studies" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ODC & Overweight Cargo Transport" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Heavy-Lift & Crane Operations" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Multimodal Project Logistics" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Capital Equipment & Plant Relocation" } }
    ]
  }
};

const projectsBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Astromar", "item": "https://www.astromarfreezone.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.astromarfreezone.com/free-trade-zone-services" },
    { "@type": "ListItem", "position": 3, "name": "Project Cargo", "item": "https://www.astromarfreezone.com/free-trade-zone-services/project-cargo" }
  ]
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsBreadcrumbSchema) }} />
    </>
  );
}
