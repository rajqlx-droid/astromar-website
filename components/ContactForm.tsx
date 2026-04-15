"use client"
import { useState } from "react";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "./ScrollReveal";

const contactStrip = [
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

interface ContactFormProps {
  showInfoStrip?: boolean;
}

const ContactForm = ({ showInfoStrip = true }: ContactFormProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    fullName: "", company: "", email: "", phone: "", service: "", location: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    const trimmed = form.fullName.trim();
    if (!trimmed || trimmed.length > 100) errs.fullName = "Full name is required (max 100 chars)";
    const emailTrimmed = form.email.trim();
    if (!emailTrimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed))
      errs.email = "Valid email is required";
    if (form.message.trim().length > 1000) errs.message = "Message must be under 1000 characters";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    toast({ title: "Enquiry Submitted", description: "Thank you! Our team will get back to you within 24 hours." });
    setForm({ fullName: "", company: "", email: "", phone: "", service: "", location: "", message: "" });
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputClass = "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-colors text-sm";

  return (
    <section id="contact" className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
        <ScrollReveal>
          <p className="text-xs font-semibold tracking-widest uppercase text-orange-500 mb-3 text-center">
            GET IN TOUCH
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Request a Consultation
          </h2>
          <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto text-sm sm:text-base">
            Fill in the form below and our team will get back to you within 24 hours.
          </p>
        </ScrollReveal>

        {/* Contact info strip */}
        {showInfoStrip && (
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {contactStrip.map((item) => (
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
        )}

        {/* Form card */}
        <ScrollReveal delay={0.15}>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" placeholder="Your name" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} maxLength={100} className={inputClass} />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                  <input type="text" placeholder="Company name" value={form.company} onChange={(e) => update("company", e.target.value)} maxLength={100} className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input type="email" placeholder="you@company.com" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={255} className={inputClass} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => update("phone", e.target.value)} maxLength={20} className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Service Required</label>
                  <select value={form.service} onChange={(e) => update("service", e.target.value)} className={inputClass}>
                    <option value="">Select a service</option>
                    <option value="FTWZ Warehousing">FTWZ Warehousing</option>
                    <option value="Ocean Freight (FCL)">Ocean Freight (FCL)</option>
                    <option value="Ocean Freight (LCL)">Ocean Freight (LCL)</option>
                    <option value="Air Freight">Air Freight</option>
                    <option value="Coastal Shipping">Coastal Shipping</option>
                    <option value="Custom Clearance">Custom Clearance</option>
                    <option value="Supply Chain & Distribution">Supply Chain &amp; Distribution</option>
                    <option value="Project & Specialized Cargo">Project &amp; Specialized Cargo</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">FTWZ Location</label>
                  <select value={form.location} onChange={(e) => update("location", e.target.value)} className={inputClass}>
                    <option value="">Select a location</option>
                    <option value="Chennai (Anna Nagar HQ)">Chennai (Anna Nagar HQ)</option>
                    <option value="Chennai (Sriperumbudur)">Chennai (Sriperumbudur)</option>
                    <option value="Chennai (Vallur)">Chennai (Vallur)</option>
                    <option value="Kochi">Kochi</option>
                    <option value="Vizag">Vizag</option>
                    <option value="Mumbai (Panvel)">Mumbai (Panvel)</option>
                    <option value="Mumbai (JNPA)">Mumbai (JNPA)</option>
                    <option value="Delhi (Khurja)">Delhi (Khurja)</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Dahej">Dahej</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  placeholder="Tell us about your requirements..."
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  maxLength={1000}
                  className={`${inputClass} resize-y`}
                  style={{ minHeight: "140px" }}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl text-base transition-colors"
              >
                <Send size={18} /> Submit Enquiry
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactForm;
