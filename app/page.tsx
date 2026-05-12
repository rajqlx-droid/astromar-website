import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import CTASection from "@/components/CTASection";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Freight Forwarder & FTWZ Operator India | Astromar Logistics",
  description: "India's leading freight forwarder and FTWZ operator. Ocean freight, air freight, customs clearance, bonded warehousing and 3PL supply chain solutions across 9 strategic port locations.",
  keywords: "freight forwarder india, FTWZ operator india, logistics company india, customs clearance india, bonded warehouse india, ocean freight india, supply chain india",
  openGraph: {
    title: "Freight Forwarder & FTWZ Operator India | Astromar Logistics",
    description: "India's leading freight forwarder and FTWZ operator across 9 strategic port locations.",
    url: "https://astromarfreezone.com",
    siteName: "Astromar Logistics",
    type: "website",
  },
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
    </div>
  );
}
