"use client"
import { useState } from "react";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "./ScrollReveal";

const ContactForm = () => {
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

  const inputClass = "w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container max-w-3xl px-4">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3">
            GET IN TOUCH
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-foreground mb-12">
            Request a Consultation
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input type="text" placeholder="Your name" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} maxLength={100} className={inputClass} />
                {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Company</label>
                <input type="text" placeholder="Company name" value={form.company} onChange={(e) => update("company", e.target.value)} maxLength={100} className={inputClass} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email <span className="text-destructive">*</span>
                </label>
                <input type="email" placeholder="you@company.com" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={255} className={inputClass} />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => update("phone", e.target.value)} maxLength={20} className={inputClass} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Service Required</label>
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
                <label className="block text-sm font-semibold text-foreground mb-2">FTWZ Location</label>
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
              <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
              <textarea placeholder="Tell us about your requirements..." value={form.message} onChange={(e) => update("message", e.target.value)} maxLength={1000} rows={5} className={`${inputClass} resize-y`} />
              {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
            </div>

            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              <Send size={18} /> Submit Enquiry
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactForm;

