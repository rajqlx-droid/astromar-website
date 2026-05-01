'use client'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="bg-gradient-to-br from-blue-200 via-blue-50 to-blue-300 py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {["✓ 500+ Clients Served", "✓ 8+ FTWZ Locations", "✓ 7+ Years of Excellence"].map((pill) => (
            <span key={pill} className="bg-white/70 border border-blue-300 text-blue-900 text-xs font-medium px-4 py-1.5 rounded-full">
              {pill}
            </span>
          ))}
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to Optimize Your Trade Operations?
        </h2>
        <p className="text-blue-900 text-base mb-8 max-w-xl mx-auto leading-relaxed">
          Partner with India's leading FTWZ provider and unlock duty-free warehousing, GST deferment, and seamless logistics.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/contact"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition">
            Schedule Consultation →
          </Link>
          <Link href="/freight-intelligence"
            className="bg-white text-blue-700 border-2 border-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition">
            Explore Tools
          </Link>
        </div>

      </div>
    </section>
  )
}
