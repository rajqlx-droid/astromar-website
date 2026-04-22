"use client"
import Header from "@/components/Header";
import AnimatedBanner from "@/app/components/AnimatedBanner";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <AnimatedBanner />
      <Header />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyUsSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
