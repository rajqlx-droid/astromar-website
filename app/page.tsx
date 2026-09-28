import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import CTASection from "@/components/CTASection";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Free Trade Zone in India | Astromar Logistics",
  description: "Astromar Logistics provides duty-free bonded storage in a free trade zone in India for 3–5 years, with no upfront duty to help save working capital.",
  keywords: "free trade zone in India, Astromar Logistics, duty-free bonded storage, FTWZ warehouse",
  openGraph: {
    title: "Free Trade Zone in India | Astromar Logistics",
    description: "Astromar Logistics provides duty-free bonded storage in a free trade zone in India for 3–5 years, with no upfront duty to help save working capital.",
    url: "https://www.astromarfreezone.com",
    siteName: "Astromar Logistics",
    type: "website",
  },
};

const homeOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Astromar Logistics Pvt Ltd",
  "url": "https://www.astromarfreezone.com",
  "logo": "https://www.astromarfreezone.com/logo.png",
  "description": "India's leading Free Trade Warehousing Zone operator and freight forwarder with 10 strategic FTWZ locations across India offering duty-free storage, customs clearance, and supply chain solutions.",
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
  "serviceType": ["Free Trade Warehousing Zone", "Customs Bonded Warehouse", "Freight Forwarding", "Customs Clearance", "Supply Chain Management", "Ocean Freight", "Air Freight"]
};

const homeWebSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Astromar Logistics",
  "url": "https://www.astromarfreezone.com",
  "description": "India's leading Free Trade Warehousing Zone operator and freight forwarder",
  "publisher": {
    "@type": "Organization",
    "name": "Astromar Logistics Pvt Ltd"
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyUsSection />
      <CTASection />
      <WhatsAppButton />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeOrganizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeWebSiteSchema) }}
      />
    </div>
  );
}
