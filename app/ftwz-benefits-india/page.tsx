import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  alternates: { canonical: "/ftwz-benefits-india" },
  title: "FTWZ Benefits | Free Trade Warehousing Zone India | Astromar",
  description: "Explore FTWZ benefits in India, offering duty deferment, tax advantages, cost-efficient storage, seamless customs processes, and easy global trade access for businesses.",
  keywords: ["FTWZ benefits India", "free trade warehousing zone benefits", "duty deferment India", "GST deferment FTWZ", "FTWZ tax benefits"],
  openGraph: {
    title: "FTWZ Benefits | Free Trade Warehousing Zone India",
    description: "Explore FTWZ benefits in India, offering duty deferment, tax advantages, cost-efficient storage, seamless customs processes, and easy global trade access for businesses.",
    url: "https://www.astromarfreezone.com/ftwz-benefits-india",
    images: ["/ftwz-benefits-india.jpg"],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "FTWZ Benefits | Free Trade Warehousing Zone India",
  description: "Explore FTWZ benefits in India, offering duty deferment, tax advantages, cost-efficient storage, seamless customs processes, and easy global trade access for businesses.",
  image: "https://www.astromarfreezone.com/ftwz-benefits-india.jpg",
  author: { "@type": "Organization", name: "Astromar Logistics" },
  publisher: { "@type": "Organization", name: "Astromar Logistics", logo: { "@type": "ImageObject", url: "https://www.astromarfreezone.com/logo.png" } },
  mainEntityOfPage: "https://www.astromarfreezone.com/ftwz-benefits-india",
};

export default function FTWZBenefitsPage() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {/* Banner */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="/ftwz-benefits-india.jpg"
          alt="FTWZ Benefits India"
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/blogs" className="text-white/60 hover:text-white text-sm transition-colors">Blog</Link>
            <span className="text-white/40 text-sm">/</span>
            <span className="text-[#F97316] text-sm font-semibold">FTWZ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            FTWZ Benefits in India
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
            <span>📅 October 1, 2024</span>
            <span>⏱ 8 min read</span>
            <span className="bg-[#F97316] text-white text-xs font-bold px-3 py-1 rounded-full">FTWZ</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 py-14">

        {/* Intro */}
        <div className="bg-brand-light border-l-4 border-[#F97316] rounded-r-xl px-6 py-5 mb-10">
          <p className="text-base text-foreground/80 leading-relaxed">
            At our <Link href="/free-trade-zone" className="text-[#F97316] font-semibold hover:underline">Free Trade Warehousing Zone (FTWZ) India</Link>, businesses can access a range of advantages that streamline international trade, optimize supply chains, and offer significant cost savings.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mt-3">
            Our FTWZ locations in India include key hubs like Delhi, Mumbai, Chennai, Cochin and Gujarat, offering strategic benefits for efficient global trade and logistics.
          </p>
        </div>

        <p className="text-base text-foreground/70 leading-relaxed mb-10">
          Explore the key benefits that make FTWZs an ideal choice for businesses engaged in global trade:
        </p>

        {/* Benefit 1 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#1B3A6B] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#F97316] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
            Duty Deferment & Tax Benefits
          </h2>
          <ul className="space-y-3 ml-10">
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed">
              <span className="text-[#F97316] mt-1 flex-shrink-0">•</span>
              Store imported goods without paying customs duty, GST, or any other taxes until they are cleared for domestic use, allowing businesses to manage cash flow more efficiently.
            </li>
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed">
              <span className="text-[#F97316] mt-1 flex-shrink-0">•</span>
              Goods destined for re-export are exempt from Indian duties and taxes, reducing overall costs for businesses involved in global trade.
            </li>
          </ul>
        </div>

        {/* Benefit 2 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#1B3A6B] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#F97316] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">2</span>
            Cost Efficiency
          </h2>
          <ul className="space-y-3 ml-10">
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed">
              <span className="text-[#F97316] mt-1 flex-shrink-0">•</span>
              FTWZ benefits centralized warehousing and storage solutions that reduce logistics costs.
            </li>
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed">
              <span className="text-[#F97316] mt-1 flex-shrink-0">•</span>
              The ability to store goods duty-free and tax-free helps businesses avoid immediate financial burdens, improving profitability.
            </li>
          </ul>
        </div>

        {/* Benefit 3 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#1B3A6B] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#F97316] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">3</span>
            Simplified Customs Process
          </h2>
          <ul className="space-y-3 ml-10">
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed">
              <span className="text-[#F97316] mt-1 flex-shrink-0">•</span>
              <span><strong>Faster customs clearance</strong> with simplified procedures. Goods entering FTWZs bypass standard customs checks until ready for domestic clearance, cutting delays and paperwork.</span>
            </li>
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed">
              <span className="text-[#F97316] mt-1 flex-shrink-0">•</span>
              <span><strong>Single-window clearance</strong> streamlines the entire process, making import/export operations more efficient.</span>
            </li>
          </ul>
        </div>

        {/* Benefit 4 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#1B3A6B] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#F97316] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">4</span>
            Strategic Location for Global Trade
          </h2>
          <ul className="space-y-3 ml-10">
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed">
              <span className="text-[#F97316] mt-1 flex-shrink-0">•</span>
              FTWZs are strategically located near major seaports, airports, and highways, enabling smooth transportation and global distribution of goods.
            </li>
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed">
              <span className="text-[#F97316] mt-1 flex-shrink-0">•</span>
              Leverage the FTWZ to access international markets while benefiting from cost-effective, duty-free logistics.
            </li>
          </ul>
        </div>

        {/* Benefit 5 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#1B3A6B] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#F97316] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">5</span>
            100% Foreign Ownership
          </h2>
          <ul className="space-y-3 ml-10">
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed">
              <span className="text-[#F97316] mt-1 flex-shrink-0">•</span>
              Foreign companies can retain 100% ownership of their goods while stored in FTWZs, avoiding risks associated with buyer claims or non-payment.
            </li>
          </ul>
        </div>

        {/* Benefit 6 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#1B3A6B] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#F97316] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">6</span>
            Flexible Warehousing & Inventory Management
          </h2>
          <ul className="space-y-3 ml-10">
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed">
              <span className="text-[#F97316] mt-1 flex-shrink-0">•</span>
              Enjoy the benefits of duty-free storage with no time constraints, allowing businesses to better manage inventory and meet fluctuating demand.
            </li>
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed">
              <span className="text-[#F97316] mt-1 flex-shrink-0">•</span>
              Our advanced infrastructure supports value-added services such as repacking, relabeling, and assembly, helping businesses optimize their supply chain.
            </li>
          </ul>
        </div>

        {/* Benefit 7 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#1B3A6B] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#F97316] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">7</span>
            Re-Export without Indian Duties
          </h2>
          <ul className="space-y-3 ml-10">
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed">
              <span className="text-[#F97316] mt-1 flex-shrink-0">•</span>
              Goods stored in FTWZs can be re-exported without incurring Indian customs duties, enhancing flexibility for businesses looking to operate globally.
            </li>
          </ul>
        </div>

        {/* Benefit 8 */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#1B3A6B] mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#F97316] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">8</span>
            Value-Added Services
          </h2>
          <ul className="space-y-3 ml-10">
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed">
              <span className="text-[#F97316] mt-1 flex-shrink-0">•</span>
              FTWZs offer specialized services like repacking, labeling, kitting, and assembly, enabling businesses to add value before exporting goods to other markets.
            </li>
          </ul>
        </div>

        {/* Conclusion */}
        <div className="bg-brand-light rounded-xl p-6 mb-10">
          <h2 className="text-lg font-bold text-[#1B3A6B] mb-3">Conclusion</h2>
          <p className="text-sm text-foreground/80 leading-relaxed">
            By utilizing <Link href="/" className="text-[#F97316] font-semibold hover:underline">Astromar Free Trade Warehousing Zone</Link>, your business can enjoy streamlined international trade processes, improved cost-efficiency, and access to global markets without the burden of immediate duties and taxes. Optimize your supply chain, minimize costs, and enhance your business operations with our <Link href="/ftwz-faqs" className="text-[#F97316] font-semibold hover:underline">FTWZ solutions</Link>.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#1B3A6B] to-[#0f1f3d] rounded-xl p-8 text-center">
          <p className="text-white font-bold text-lg mb-2">Ready to Get Started?</p>
          <p className="text-white/70 text-sm mb-6">For inquiries about Free Trade Warehousing Zone in India, feel free to contact us.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+919940211014" className="bg-[#F97316] text-white font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition">
              📞 +91 99402 11014
            </a>
            <a href="mailto:sales@astromarfreezone.com" className="bg-white text-[#1B3A6B] font-semibold px-6 py-3 rounded-lg text-sm hover:opacity-90 transition">
              ✉ sales@astromarfreezone.com
            </a>
          </div>
        </div>

        {/* Back to blog */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <Link href="/blogs" className="text-[#F97316] hover:underline text-sm font-semibold">← Back to all articles</Link>
        </div>
      </article>
    </div>
  );
}
