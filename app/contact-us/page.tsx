import type { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Astromar Logistics | FTWZ Enquiry Chennai",
  description: "Contact Astromar Logistics for FTWZ warehousing, customs clearance, and freight forwarding enquiries. HQ: Anna Nagar, Chennai. Phone +91 99402 11014. Email sales@astromarfreezone.com.",
  keywords: "astromar logistics contact, ftwz enquiry india, astromar chennai office, ftwz contact chennai, freight forwarder contact india, ftwz quote request, astromar phone number, astromar email, free trade warehousing zone contact",
  alternates: { canonical: "https://www.astromarfreezone.com/contact-us" },
  openGraph: {
    title: "Contact Astromar Logistics | FTWZ Enquiry Chennai",
    description: "Get in touch with Astromar Logistics — India's leading FTWZ operator. HQ in Anna Nagar, Chennai. Call +91 99402 11014 or email sales@astromarfreezone.com.",
    url: "https://www.astromarfreezone.com/contact-us",
    siteName: "Astromar Logistics",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Astromar Logistics | FTWZ Enquiry Chennai",
    description: "Get in touch with Astromar Logistics for FTWZ warehousing, customs clearance, and freight forwarding enquiries across India.",
  },
  robots: { index: true, follow: true },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "Astromar Logistics Pvt Ltd",
  alternateName: "Astromar Freezone",
  description: "India's leading Free Trade Warehousing Zone operator and freight forwarder with 10 strategic FTWZ locations across India.",
  url: "https://www.astromarfreezone.com",
  logo: "https://eenumepuujkrnartejsh.supabase.co/storage/v1/object/sign/BRAND%20ASSETS/001.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMDU2NTM0My1hNjA2LTRkNTItOTRjNC00OTZiMmQ3YTNmZDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCUkFORCBBU1NFVFMvMDAxLnBuZyIsImlhdCI6MTc3NTU0OTQwNCwiZXhwIjoxODM4NjIxNDA0fQ.jgeDhDostzqz1pdHBSMMSoRBb_eG-G2MLkJY6MVCR_w",
  image: "https://eenumepuujkrnartejsh.supabase.co/storage/v1/object/sign/BRAND%20ASSETS/001.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMDU2NTM0My1hNjA2LTRkNTItOTRjNC00OTZiMmQ3YTNmZDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCUkFORCBBU1NFVFMvMDAxLnBuZyIsImlhdCI6MTc3NTU0OTQwNCwiZXhwIjoxODM4NjIxNDA0fQ.jgeDhDostzqz1pdHBSMMSoRBb_eG-G2MLkJY6MVCR_w",
  telephone: "+91-99402-11014",
  email: "sales@astromarfreezone.com",
  foundingDate: "2017",
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 922, 1st Floor, H-Block, 17th Main Road, Anna Nagar",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600040",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "13.0900436",
    longitude: "80.2014116",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: { "@type": "Country", name: "India" },
  priceRange: "$$",
  sameAs: ["https://www.astromarfreezone.com"],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Astromar Logistics",
  url: "https://www.astromarfreezone.com/contact-us",
  description: "Contact page for Astromar Logistics — India's leading FTWZ operator. Reach our HQ in Anna Nagar, Chennai for FTWZ warehousing, customs clearance, and freight forwarding enquiries.",
  mainEntity: {
    "@type": "Organization",
    name: "Astromar Logistics Pvt Ltd",
    url: "https://www.astromarfreezone.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-99402-11014",
        email: "sales@astromarfreezone.com",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Tamil", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-99402-11014",
        email: "sales@astromarfreezone.com",
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["English", "Tamil", "Hindi"],
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.astromarfreezone.com" },
    { "@type": "ListItem", position: 2, name: "Contact Us", item: "https://www.astromarfreezone.com/contact-us" },
  ],
};

export default function ContactUsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ContactClient />
    </>
  );
}
