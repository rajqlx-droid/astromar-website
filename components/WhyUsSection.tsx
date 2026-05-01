"use client"
import { useRef, useState } from "react";
import { RefreshCw, Network, MessageSquare, UserCheck, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: RefreshCw,
    title: "Operational Excellence",
    desc: "Rigorous quality controls, streamlined processes, and ISO-certified operations ensure consistent, dependable performance across all freight and logistics activities.",
    bullets: ["ISO-certified operations", "Streamlined customs workflows", "Zero-error documentation"],
  },
  {
    icon: Network,
    title: "Network Strength",
    desc: "9+ strategically located FTWZ facilities near major ports and airports across India, enabling seamless multimodal connectivity for imports, exports, and domestic distribution.",
    bullets: ["9+ FTWZ locations pan-India", "Major port & airport proximity", "Multimodal connectivity"],
  },
  {
    icon: MessageSquare,
    title: "Transparent Communication",
    desc: "Real-time shipment visibility, proactive status updates, and dedicated account managers ensure you are always informed at every stage of your supply chain.",
    bullets: ["Real-time tracking & updates", "Dedicated account managers", "24/7 shipment visibility"],
  },
  {
    icon: UserCheck,
    title: "Client-First Commitment",
    desc: "Every logistics decision is driven by your business objectives. With 500+ clients across industries, we tailor solutions that deliver measurable value and long-term growth.",
    bullets: ["500+ clients served", "Tailored logistics solutions", "Measurable business outcomes"],
  },
];

const SCROLL_BY = 360;

const WhyUsSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (dir: "left" | "right") => {
    if (!carouselRef.current) return;
    const next = dir === "right"
      ? Math.min(activeIndex + 1, features.length - 1)
      : Math.max(activeIndex - 1, 0);
    carouselRef.current.scrollBy({ left: dir === "left" ? -SCROLL_BY : SCROLL_BY, behavior: "smooth" });
    setActiveIndex(next);
  };

  const scrollToIndex = (i: number) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollTo({ left: i * SCROLL_BY, behavior: "smooth" });
    setActiveIndex(i);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Heading */}
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3 text-center">
            OUR COMMITMENT
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-foreground mb-12">
            Why Astromar Logistics
          </h2>
        </ScrollReveal>

        {/* Carousel + arrows */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex bg-white border border-gray-200 rounded-full shadow-md p-2 hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          {/* Scrollable track */}
          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {features.map((item) => (
              <div
                key={item.title}
                className="snap-start shrink-0 min-w-[300px] sm:min-w-[320px] bg-slate-50 border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Icon */}
                <div className="bg-orange-50 rounded-xl p-3 w-fit mb-5">
                  <item.icon className="w-7 h-7 text-orange-500" strokeWidth={1.5} />
                </div>

                {/* Title + desc */}
                <h3 className="text-base font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed mb-5">{item.desc}</p>

                {/* Bullet points */}
                <ul className="space-y-2">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex bg-white border border-gray-200 rounded-full shadow-md p-2 hover:bg-slate-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {features.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === activeIndex ? "bg-orange-500" : "bg-gray-200"}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyUsSection;
