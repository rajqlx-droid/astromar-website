'use client'
import Link from "next/link";

export default function CTASection() {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f0f8ff, #e8f4ff, #f0f8ff)" }}
    >
      {/* Grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Shine sweep */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -skew-x-12"
        style={{ left: "-60%", width: "30%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)", animation: "shine-sweep 4s linear infinite" }}
      />

      {/* Purple rotating cube */}
      <div aria-hidden className="pointer-events-none absolute" style={{ top: "20px", left: "4%", width: "36px", height: "36px", background: "linear-gradient(135deg, #8b5cf6, #6d28d9)", borderRadius: "8px", opacity: 0.5, boxShadow: "0 4px 12px rgba(139,92,246,0.3)", animation: "float-rotate-1 4s ease-in-out infinite" }} />

      {/* Orange circle */}
      <div aria-hidden className="pointer-events-none absolute" style={{ bottom: "20px", right: "5%", width: "28px", height: "28px", background: "linear-gradient(135deg, #F97316, #ea580c)", borderRadius: "50%", opacity: 0.55, boxShadow: "0 4px 12px rgba(249,115,22,0.3)", animation: "float-rotate-2 3.5s ease-in-out infinite" }} />

      {/* Navy cube */}
      <div aria-hidden className="pointer-events-none absolute" style={{ bottom: "18px", left: "8%", width: "24px", height: "24px", background: "linear-gradient(135deg, #0f1f3d, #1a3a6b)", borderRadius: "5px", opacity: 0.35, animation: "float-rotate-3 5s ease-in-out infinite" }} />

      {/* Orange outline square */}
      <div aria-hidden className="pointer-events-none absolute" style={{ top: "14px", right: "5%", width: "48px", height: "48px", border: "2px solid rgba(249,115,22,0.25)", borderRadius: "10px", animation: "float-rotate-4 6s ease-in-out infinite" }} />

      {/* Orange outline circle */}
      <div aria-hidden className="pointer-events-none absolute" style={{ bottom: "14px", left: "4%", width: "32px", height: "32px", border: "2px solid rgba(249,115,22,0.2)", borderRadius: "50%", animation: "float-rotate-5 8s linear infinite" }} />

      {/* Small blue cube */}
      <div aria-hidden className="pointer-events-none absolute" style={{ top: "50%", right: "12%", width: "20px", height: "20px", background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", borderRadius: "4px", opacity: 0.3, animation: "float-rotate-1 3s ease-in-out infinite", animationDelay: "1s" }} />

      {/* Small orange dot */}
      <div aria-hidden className="pointer-events-none absolute" style={{ top: "15%", left: "45%", width: "14px", height: "14px", background: "#F97316", borderRadius: "50%", opacity: 0.25, animation: "float-rotate-2 2.5s ease-in-out infinite", animationDelay: "0.5s" }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
        {/* Trust pills */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {["✓ 500+ Clients Served", "✓ 8+ FTWZ Locations", "✓ 7+ Years of Excellence"].map((pill) => (
            <span key={pill} className="bg-white/90 text-xs font-medium px-4 py-1.5 rounded-full" style={{ border: "1px solid rgba(249,115,22,0.25)", color: "#0f1f3d" }}>
              {pill}
            </span>
          ))}
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to Optimize Your Trade Operations?
        </h2>

        {/* Subheading */}
        <p className="text-gray-600 text-base mb-8 max-w-xl mx-auto leading-relaxed">
          Partner with India's leading FTWZ provider and unlock duty-free warehousing, GST deferment, and seamless logistics.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/contact"
            className="font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:bg-orange-50 hover:shadow-md"
            style={{ background: "white", color: "#F97316", border: "1px solid #111" }}
          >
            Schedule Consultation →
          </Link>
          <Link
            href="/freight-intelligence"
            className="font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:opacity-90 hover:shadow-md"
            style={{ background: "white", color: "#111", border: "2px solid #0E70C0" }}
          >
            Explore Tools
          </Link>
        </div>
      </div>
    </section>
  );
}
