"use client"
import { Phone, Mail, MapPin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const contactItems = [
  {
    icon: Phone,
    primary: "+91 99402 11014",
    secondary: "Call us anytime",
    href: "tel:+919940211014",
  },
  {
    icon: Mail,
    primary: "sales@astromarfreezone.com",
    secondary: "Email us",
    href: "mailto:sales@astromarfreezone.com",
  },
  {
    icon: MapPin,
    primary: "Anna Nagar, Chennai",
    secondary: "Head Office",
    href: "https://maps.google.com/?q=No.+922,+H-Block,+17th+Main+Road,+Anna+Nagar,+Chennai+600040",
  },
];

const ContactInfoStrip = () => {
  return (
    <section id="contact" className="bg-white py-14">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
        <ScrollReveal>
          <p className="text-xs font-semibold tracking-widest uppercase text-orange-500 mb-2 text-center">
            GET IN TOUCH
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Contact Us
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactItems.map((item) => (
              <a
                key={item.primary}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-start gap-3 p-5 rounded-xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-white" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-snug">{item.primary}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.secondary}</p>
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactInfoStrip;
