"use client"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import FTWZLocations from "@/components/FTWZLocations";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ContactForm />
      <FTWZLocations />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ContactPage;
