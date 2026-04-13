"use client"
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
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

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 relative z-20 flex flex-col justify-center min-h-screen">
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
          className="text-sm font-semibold tracking-[0.2em] uppercase text-primary-foreground/60 mb-4"
        >
          ASTROMAR LOGISTICS PVT LTD
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-3xl mb-6"
        >
          <span className="text-primary-foreground">Global Logistics Solutions with </span>
          <span className="text-brand-orange">Seamless Innovation</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg md:text-xl text-primary-foreground/70 max-w-2xl mb-10 leading-relaxed"
        >
          Delivering dependable freight and supply chain solutions across air, sea, and multimodal
          networks. Save customs duty & GST with India's premier FTWZ network.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4"
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
      </div>
    </section>
  );
};

export default HeroSection;
