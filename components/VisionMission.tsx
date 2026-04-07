"use client"
import { Eye, Target } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const VisionMission = () => {
  return (
    <section id="about" className="py-20 bg-brand-light">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <ScrollReveal direction="left">
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-primary" />
                <h3 className="text-lg md:text-xl font-bold text-foreground tracking-wide uppercase">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                To be a trusted global logistics partner delivering seamless connectivity across
                international trade networks.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-primary" />
                <h3 className="text-lg md:text-xl font-bold text-foreground tracking-wide uppercase">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                To provide reliable, efficient, and transparent logistics solutions that simplify
                global trade and strengthen client partnerships.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;

