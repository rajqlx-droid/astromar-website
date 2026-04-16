"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1600"
        alt="Container port aerial view"
        fill
        className="absolute inset-0 z-0 object-cover w-full h-full"
        unoptimized
        priority
      />
      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen relative z-20 w-full">

        {/* LEFT COLUMN — hero text */}
        <div className="max-w-xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block rounded-full bg-primary/20 border border-primary/30 px-4 py-1.5 mb-6"
          >
            <span className="text-sm font-semibold text-primary-foreground/90 tracking-wide">
              India's Leading FTWZ Provider
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm font-semibold tracking-[0.2em] uppercase text-primary-foreground/60 mb-4 text-left"
          >
            ASTROMAR LOGISTICS PVT LTD
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-left"
          >
            <span className="text-primary-foreground">Global Logistics Solutions with </span>
            <span className="text-brand-orange">Seamless Innovation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg md:text-xl text-primary-foreground/70 mb-10 leading-relaxed text-left"
          >
            Delivering dependable freight and supply chain solutions across air, sea, and multimodal
            networks. Save customs duty &amp; GST with India's premier FTWZ network.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row justify-start gap-4 mb-10"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 sm:px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300"
            >
              Request a Consultation
              <ArrowRight size={18} />
            </a>
            <a
              href="/freight-intelligence"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary-foreground/30 px-6 sm:px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300"
            >
              Explore Tools
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-3 gap-6 border-t border-white/20 pt-8"
          >
            {[
              { value: "8+", label: "Locations" },
              { value: "200+", label: "Clients Served" },
              { value: "7+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label} className="text-left">
                <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                <div className="text-xs text-white/60 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT COLUMN — compact contact form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">✓</div>
                <p className="text-white font-semibold text-lg">Thank you!</p>
                <p className="text-white/60 text-sm mt-1">We will contact you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="text-white font-bold text-lg mb-1">Request a Consultation</h3>
                <p className="text-white/60 text-xs mb-5">Get a response within 24 hours</p>

                <div className="space-y-3">
                  {/* Row 1: Name + Company */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-white/70 text-xs mb-1 block">Full Name *</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/50"
                      />
                    </div>
                    <div>
                      <label className="text-white/70 text-xs mb-1 block">Company</label>
                      <input
                        type="text"
                        placeholder="Company name"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/50"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email + Phone */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-white/70 text-xs mb-1 block">Email *</label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/50"
                      />
                    </div>
                    <div>
                      <label className="text-white/70 text-xs mb-1 block">Phone</label>
                      <input
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/50"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service dropdown */}
                  <div>
                    <label className="text-white/70 text-xs mb-1 block">Service Required</label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/50 appearance-none">
                      <option value="" className="text-gray-900">Select a service</option>
                      <option value="ftwz" className="text-gray-900">FTWZ Warehousing</option>
                      <option value="ocean" className="text-gray-900">Ocean Freight (FCL)</option>
                      <option value="ocean-lcl" className="text-gray-900">Ocean Freight (LCL)</option>
                      <option value="air" className="text-gray-900">Air Freight</option>
                      <option value="coastal" className="text-gray-900">Coastal Shipping</option>
                      <option value="customs" className="text-gray-900">Custom Clearance</option>
                      <option value="supply" className="text-gray-900">Supply Chain</option>
                      <option value="projects" className="text-gray-900">Project Cargo</option>
                    </select>
                  </div>

                  {/* Row 4: Message */}
                  <div>
                    <label className="text-white/70 text-xs mb-1 block">Message</label>
                    <textarea
                      placeholder="Tell us about your requirements..."
                      rows={3}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/50 resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="button"
                    onClick={() => setSubmitted(true)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
                  >
                    Submit Enquiry →
                  </button>

                  <p className="text-white/40 text-xs text-center">No spam. We respond within 24 hours.</p>
                </div>
              </>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
