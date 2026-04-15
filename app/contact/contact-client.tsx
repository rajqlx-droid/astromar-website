"use client"
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";

const contactDetails = [
  {
    icon: Mail,
    label: "Email Us",
    value: "sales@astromarfreezone.com",
    href: "mailto:sales@astromarfreezone.com",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 99402 11014",
    href: "tel:+919940211014",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "No. 922, 1st Floor, H-Block, 17th Main Road, Anna Nagar, Chennai – 600 040, Tamil Nadu, India",
    href: "https://maps.google.com/?q=No.+922,+H-Block,+17th+Main+Road,+Anna+Nagar,+Chennai+600040",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Sat, 9:00 AM – 6:30 PM IST",
    href: null,
  },
];

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-brand-navy py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16">
          <span className="block text-sm font-bold tracking-[0.2em] text-accent uppercase mb-4">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary-foreground mb-6 max-w-3xl">
            Contact Us
          </h1>
          <p className="text-primary-foreground/70 max-w-2xl leading-relaxed text-base sm:text-lg">
            Have a logistics challenge or want to learn more about our FTWZ services? Our team at
            Astromar Logistics Pvt Ltd is ready to help you find the right solution.
          </p>
        </div>
      </section>

      {/* Contact detail cards */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase text-center mb-3">
              REACH US DIRECTLY
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground text-center mb-12">
              Astromar Logistics Pvt Ltd
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {contactDetails.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.08}>
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col items-start gap-4">
                  <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10">
                    <item.icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form — info strip hidden here since contact cards above already cover it */}
      <ContactForm showInfoStrip={false} />

      {/* CTA strip */}
      <section className="py-14 bg-brand-navy">
        <div className="max-w-2xl mx-auto text-center px-6 py-16">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-foreground mb-3">
              Prefer to Explore First?
            </h2>
            <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8 text-sm sm:text-base">
              Check out our freight intelligence tools or browse our full range of logistics services
              before reaching out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Our Services <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/freight-intelligence"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground bg-transparent hover:bg-primary-foreground/10 transition-colors"
              >
                Freight Tools
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ContactPage;
