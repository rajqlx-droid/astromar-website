"use client"
import { Star, Quote } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    name: "Rajesh Mehta",
    role: "Director, Supply Chain",
    company: "PharmaCold India",
    text: "Astromar's FTWZ cold storage saved us over ₹2.5 Cr in duty deferment in the first year alone. Their compliance team is exceptional.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Head of Logistics",
    company: "ElectraTech Components",
    text: "We switched to Astromar for re-export operations and cut our turnaround time by 40%. The real-time inventory tracking is a game-changer.",
    rating: 5,
  },
  {
    name: "Anand Krishnan",
    role: "CEO",
    company: "GlobalTex Exports",
    text: "Their pan-India FTWZ network gave us the flexibility to consolidate shipments across ports. Outstanding service and transparency.",
    rating: 5,
  },
];

const clientLogos = [
  { name: "PharmaCold India" },
  { name: "ElectraTech" },
  { name: "GlobalTex" },
  { name: "AsiaPack Corp" },
  { name: "IndoFreight" },
  { name: "ColdChain Pro" },
  { name: "TradeLink Global" },
  { name: "SwiftCargo" },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container px-4">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3 text-center">
            TRUSTED BY INDUSTRY LEADERS
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-4 text-center">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-14">
            Businesses across India trust Astromar for reliable FTWZ warehousing, freight forwarding, and supply chain solutions.
          </p>
        </ScrollReveal>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.12}>
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 h-full flex flex-col relative">
                <Quote className="absolute top-5 right-5 w-8 h-8 text-primary/10" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base flex-1 mb-6">
                  "{t.text}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Client Logos Marquee */}
        <ScrollReveal>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground text-center mb-8">
            Trusted by 500+ businesses across India
          </p>
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee gap-12 items-center">
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <div
                  key={i}
                  className="shrink-0 px-4 py-2 rounded-lg border border-border bg-card flex items-center justify-center h-16 w-36"
                >
                  <span className="text-sm font-semibold text-muted-foreground">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
