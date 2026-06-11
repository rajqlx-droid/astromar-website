import AboutClient from "./about-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/about-us" },
  title: "About Astromar Logistics — India's Leading FTWZ Operator",
  description: "Astromar Logistics — India's trusted FTWZ in India operator since 2017. 10 strategic Free Trade Warehousing Zone locations, ₹2000Cr+ cargo handled, 500+ clients served across India.",
  keywords: "ftwz in india, astromar logistics, ftwz operator india, free trade warehousing zone, freight forwarder india, free zone company india, india logistics company, ftwz solutions, sez warehousing, ftwz warehouse",
  openGraph: {
    title: "About Astromar Logistics — India's Leading FTWZ Operator",
    description: "India's trusted FTWZ operator since 2017. 10 strategic locations, 500+ clients served, ₹2000Cr+ cargo handled across India.",
    url: "https://www.astromarfreezone.com/about-us",
    siteName: "Astromar Logistics",
    type: "website",
  },
};

const aboutOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Astromar Logistics Pvt Ltd",
  "url": "https://www.astromarfreezone.com",
  "logo": "https://eenumepuujkrnartejsh.supabase.co/storage/v1/object/sign/BRAND%20ASSETS/001.png",
  "description": "India's leading Free Trade Warehousing Zone operator and freight forwarder. Established in 2017, operating 10 strategic FTWZ locations across India offering duty-free storage, customs clearance, and integrated supply chain solutions.",
  "foundingDate": "2017",
  "founders": [{
    "@type": "Person",
    "name": "Astromar Founding Team"
  }],
  "telephone": "+91 99402 11014",
  "email": "sales@astromarfreezone.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "No. 922, 1st Floor, H-Block, 17th Main Road, Anna Nagar",
    "addressLocality": "Chennai",
    "addressRegion": "Tamil Nadu",
    "postalCode": "600040",
    "addressCountry": "IN"
  },
  "areaServed": "IN",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": "50"
  },
  "serviceType": ["Free Trade Warehousing Zone", "Customs Bonded Warehouse", "Freight Forwarding", "Customs Clearance", "Supply Chain Management", "Ocean Freight", "Air Freight", "Project Cargo"],
  "hasCredential": [
    "FTWZ Licence",
    "MSME Licence",
    "MTO Licence",
    "RCMC Membership",
    "JC Trans Membership",
    "IEC Registration"
  ]
};

const aboutBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Astromar", "item": "https://www.astromarfreezone.com/" },
    { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://www.astromarfreezone.com/about-us" }
  ]
};

export default function AboutPage() {
  return (
    <>
      <AboutClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutOrganizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutBreadcrumbSchema) }}
      />
    </>
  );
}
