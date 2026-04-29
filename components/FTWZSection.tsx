"use client"
import ScrollReveal from "./ScrollReveal";

const FTWZSection = () => {
  return (
    <section id="ftwz" className="py-0">
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                What is FTWZ?
              </h2>
              <p className="text-primary-foreground/80 max-w-2xl text-sm md:text-base">
                Free Trade Warehousing Zone – a customs-bonded special economic zone for storing
                imported goods duty-free.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FTWZSection;
