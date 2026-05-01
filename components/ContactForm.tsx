"use client"
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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

  const glassInput = "w-full rounded-lg bg-white/10 border border-white/20 px-3 py-1.5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-colors text-sm";

  return (
    <section className="relative w-full min-h-[600px] flex items-center">
      <img
        src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200"
        alt="Logistics and cargo handling"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-start">

            {/* LEFT COLUMN - TEXT CONTENT WITH CONTACT INFO */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-orange-500 mb-5">
                GET IN TOUCH
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-6">
                Contact Us
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/95 mb-8 leading-relaxed">
                Have a logistics challenge or want to learn more about our FTWZ services? Our team at Astromar Logistics Pvt Ltd is ready to help you find the right solution.
              </p>

              {/* Contact Information */}
              <div className="border-t border-white/20 pt-6">
                <p className="text-sm text-white/90 mb-3">
                  <span className="font-semibold">Email:</span> sales@astromarfreezone.com
                </p>
                <p className="text-sm text-white/90 mb-3">
                  <span className="font-semibold">Address:</span> No. 922, 1st Floor, H-Block, 17th Main Road, Anna Nagar, Chennai - 600 040
                </p>
                <p className="text-sm text-white/90">
                  <span className="font-semibold">Hours:</span> Mon-Fri, 10:00 AM - 6:00 PM
                </p>
              </div>
            </div>

            {/* Right column — glass form card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 md:p-5">
              <form onSubmit={handleSubmit} className="space-y-3">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-1.5">
                      Full Name <span className="text-orange-500">*</span>
                    </label>
                    <input type="text" placeholder="Your name" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} maxLength={100} className={glassInput} />
                    {errors.fullName && <p className="text-orange-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-1.5">Company</label>
                    <input type="text" placeholder="Company name" value={form.company} onChange={(e) => update("company", e.target.value)} maxLength={100} className={glassInput} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-1.5">
                      Email <span className="text-orange-500">*</span>
                    </label>
                    <input type="email" placeholder="you@company.com" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={255} className={glassInput} />
                    {errors.email && <p className="text-orange-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-1.5">Phone</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => update("phone", e.target.value)} maxLength={20} className={glassInput} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-1.5">Service Required</label>
                    <select value={form.service} onChange={(e) => update("service", e.target.value)} className={`${glassInput} appearance-none cursor-pointer`}>
                      <option value="" className="bg-gray-900 text-white">Select a service</option>
                      <option value="FTWZ Warehousing" className="bg-gray-900 text-white">FTWZ Warehousing</option>
                      <option value="Ocean Freight (FCL)" className="bg-gray-900 text-white">Ocean Freight (FCL)</option>
                      <option value="Ocean Freight (LCL)" className="bg-gray-900 text-white">Ocean Freight (LCL)</option>
                      <option value="Air Freight" className="bg-gray-900 text-white">Air Freight</option>
                      <option value="Coastal Shipping" className="bg-gray-900 text-white">Coastal Shipping</option>
                      <option value="Custom Clearance" className="bg-gray-900 text-white">Custom Clearance</option>
                      <option value="Supply Chain and Distribution" className="bg-gray-900 text-white">Supply Chain &amp; Distribution</option>
                      <option value="Project and Specialized Cargo" className="bg-gray-900 text-white">Project &amp; Specialized Cargo</option>
                      <option value="Other" className="bg-gray-900 text-white">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-1.5">FTWZ Location</label>
                    <select value={form.location} onChange={(e) => update("location", e.target.value)} className={`${glassInput} appearance-none cursor-pointer`}>
                      <option value="" className="bg-gray-900 text-white">Select a location</option>
                      <option value="Chennai (Anna Nagar HQ)" className="bg-gray-900 text-white">Chennai (Anna Nagar HQ)</option>
                      <option value="Chennai (Sriperumbudur)" className="bg-gray-900 text-white">Chennai (Sriperumbudur)</option>
                      <option value="Chennai (Vallur)" className="bg-gray-900 text-white">Chennai (Vallur)</option>
                      <option value="Kochi" className="bg-gray-900 text-white">Kochi</option>
                      <option value="Vizag" className="bg-gray-900 text-white">Vizag</option>
                      <option value="Mumbai (Panvel)" className="bg-gray-900 text-white">Mumbai (Panvel)</option>
                      <option value="Mumbai (JNPA)" className="bg-gray-900 text-white">Mumbai (JNPA)</option>
                      <option value="Delhi (Khurja)" className="bg-gray-900 text-white">Delhi (Khurja)</option>
                      <option value="Bengaluru" className="bg-gray-900 text-white">Bengaluru</option>
                      <option value="Dahej" className="bg-gray-900 text-white">Dahej</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-1.5">Message</label>
                  <textarea
                    placeholder="Tell us about your requirements..."
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    maxLength={1000}
                    rows={4}
                    className={`${glassInput} resize-none`}
                  />
                  {errors.message && <p className="text-orange-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-500 text-white font-semibold py-3 rounded-lg transition-colors text-base"
                >
                  Submit Enquiry
                </button>

              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
