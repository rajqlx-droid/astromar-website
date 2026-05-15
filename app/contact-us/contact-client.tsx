"use client"
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import FTWZLocations from "@/components/FTWZLocations";
import CTASection from "@/components/CTASection";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <ContactForm />
      <FTWZLocations />
      <CTASection />
      <WhatsAppButton />
    </div>
  );
};

export default ContactPage;
