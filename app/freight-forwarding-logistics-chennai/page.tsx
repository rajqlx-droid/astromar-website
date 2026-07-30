import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  alternates: { canonical: "/freight-forwarding-logistics-chennai" },
  title: "Freight Forwarding & Logistics Company in Chennai | Astromar",
  description: "FTWZ and logistics company in Chennai providing duty-free warehousing, customs clearance, import-export logistics, and freight forwarding near Chennai Port.",
  keywords: ["freight forwarding Chennai", "FTWZ Chennai logistics", "logistics company Chennai", "customs clearance Chennai", "duty free warehousing Chennai"],
  openGraph: {
    title: "Astromar Freezone: A Trusted Partner in Global Logistics and Trade",
    description: "FTWZ and logistics company in Chennai providing duty-free warehousing, customs clearance, import-export logistics, and freight forwarding near Chennai Port.",
    url: "https://www.astromarfreezone.com/freight-forwarding-logistics-chennai",
    images: ["/freight-forwarding-chennai.png"],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Astromar Freezone: A Trusted Partner in Global Logistics and Trade",
  description: "FTWZ and logistics company in Chennai providing duty-free warehousing, customs clearance, import-export logistics, and freight forwarding near Chennai Port.",
  image: "https://www.astromarfreezone.com/freight-forwarding-chennai.png",
  author: { "@type": "Organization", name: "Astromar Logistics" },
  publisher: { "@type": "Organization", name: "Astromar Logistics", logo: { "@type": "ImageObject", url: "https://www.astromarfreezone.com/logo.png" } },
  mainEntityOfPage: "https://www.astromarfreezone.com/freight-forwarding-logistics-chennai",
};

export default function FreightForwardingChennaiPage() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {/* Banner */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="/freight-forwarding-chennai.png"
          alt="Astromar Freezone Chennai Logistics"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/blogs" className="text-white/60 hover:text-white text-sm transition-colors">Blog</Link>
            <span className="text-white/40 text-sm">/</span>
            <span className="text-[#F97316] text-sm font-semibold">Freight</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Freight Forwarding & Logistics Company in Chennai
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
            <span>📅 January 19, 2026</span>
            <span>⏱ 6 min read</span>
            <span className="bg-[#F97316] text-white text-xs font-bold px-3 py-1 rounded-full">Freight</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 py-14">

        {/* Intro */}
        <div className="bg-brand-light border-l-4 border-[#F97316] rounded-r-xl px-6 py-5 mb-10">
          <p className="text-base text-foreground/80 leading-relaxed">
            Chennai is one of India's most important logistics and trade hubs, connecting businesses to global markets through major seaports and airports. <strong>Astromar Freezone</strong> is a trusted <strong>FTWZ and logistics company in Chennai</strong> offering Free Trade Warehousing Zone (FTWZ) services, international freight forwarding, and end-to-end supply chain solutions.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mt-3">
            With strategically located warehousing facilities near Chennai Port and key industrial corridors, Astromar Freezone helps businesses reduce logistics costs, improve supply chain efficiency, and manage international trade seamlessly.
          </p>
        </div>

        {/* About */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">About Astromar Freezone</h2>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Astromar Freezone is a professional <strong>FTWZ service provider in Chennai, Tamil Nadu</strong>, specializing in duty-free warehousing, customs clearance, and import-export logistics services. The company supports local and international businesses by enabling smooth cargo movement through one of South India's busiest trade gateways.
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed mt-3">
            By combining modern infrastructure with deep logistics expertise, Astromar has positioned itself as a reliable <strong>logistics partner in Chennai for global trade operations</strong>.
          </p>
        </div>

        <h2 className="text-xl font-bold text-[#1B3A6B] mb-6">Core Logistics Services Offered in Chennai</h2>

        {/* Service 1 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#1B3A6B] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#F97316] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
            Free Trade Warehousing Zone (FTWZ) Services in Chennai
          </h3>
          <p className="text-sm text-foreground/70 leading-relaxed mb-3 ml-10">Astromar offers advanced FTWZ warehousing solutions in Chennai that allow businesses to:</p>
          <ul className="space-y-2 ml-10">
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>Store imported goods without immediate customs duty</li>
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>Defer duty payment until goods enter the Indian domestic market</li>
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>Re-export goods without paying customs duty</li>
          </ul>
          <p className="text-sm text-foreground/70 leading-relaxed mt-3 ml-10">These <strong>duty-free warehousing services in Chennai</strong> help importers and exporters improve cash flow and inventory control.</p>
          <a
            href="https://sezindia.nic.in/cms/sez-act.php"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 ml-10 inline-flex items-center gap-1 text-sm font-semibold text-[#F97316] hover:underline"
          >
            Read the Special Economic Zones Act, 2005 →
          </a>
        </div>

        {/* Service 2 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#1B3A6B] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#F97316] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">2</span>
            Warehousing & Storage Solutions Near Chennai Port
          </h3>
          <p className="text-sm text-foreground/70 leading-relaxed mb-3 ml-10">Astromar provides secure warehousing facilities near Chennai Port equipped with:</p>
          <ul className="space-y-2 ml-10">
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>Modern racking and material handling systems</li>
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>Cold storage and temperature-controlled warehousing</li>
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>24/7 CCTV surveillance, fire safety systems, and controlled access</li>
          </ul>
        </div>

        {/* Service 3 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#1B3A6B] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#F97316] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">3</span>
            Import & Export Logistics Services in Chennai
          </h3>
          <p className="text-sm text-foreground/70 leading-relaxed mb-3 ml-10">As an experienced international logistics company in Chennai, Astromar offers:</p>
          <ul className="space-y-2 ml-10">
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>Customs clearance services at Chennai Port and nearby ICDs</li>
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>Import-export documentation and compliance support</li>
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>Sea freight and air freight forwarding services</li>
          </ul>
        </div>

        {/* Service 4 */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-[#1B3A6B] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#F97316] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">4</span>
            Cargo Consolidation & Freight Forwarding in Chennai
          </h3>
          <p className="text-sm text-foreground/70 leading-relaxed mb-3 ml-10">Astromar's cargo consolidation services in Chennai help reduce transportation costs by:</p>
          <ul className="space-y-2 ml-10">
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>Combining multiple shipments into a single consignment</li>
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>Optimizing freight forwarding operations</li>
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>Supporting SMEs and exporters with cost-effective logistics solutions</li>
          </ul>
        </div>

        {/* Who Can Benefit */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">Who Can Benefit from Astromar's Chennai-Based Logistics Services?</h2>
          <p className="text-sm text-foreground/70 leading-relaxed mb-3">Astromar Freezone serves:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>Importers and exporters in Chennai</li>
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>Manufacturing units in Tamil Nadu</li>
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>Traders and distributors</li>
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>E-commerce and international supply chain businesses</li>
          </ul>
        </div>

        {/* Why Choose */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#1B3A6B] mb-4">Why Choose Astromar Freezone in Chennai?</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>Leading FTWZ logistics company in Chennai, India</li>
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>Strategic location near Chennai Port and logistics corridors</li>
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>Cost-efficient duty-free warehousing solutions</li>
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>End-to-end logistics and freight forwarding services</li>
            <li className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"><span className="text-[#F97316] mt-1 flex-shrink-0">•</span>Experienced team with strong local and global trade knowledge</li>
          </ul>
        </div>

        {/* Conclusion */}
        <div className="bg-brand-light rounded-xl p-6 mb-10">
          <h2 className="text-lg font-bold text-[#1B3A6B] mb-3">Conclusion</h2>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Astromar Freezone is a reliable FTWZ and logistics service provider in Chennai supporting businesses with smart warehousing, customs clearance, and international freight solutions. With a strong presence in Chennai's logistics ecosystem, Astromar helps businesses trade globally with confidence and efficiency.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#1B3A6B] to-[#0f1f3d] rounded-xl p-8 text-center">
          <p className="text-white font-bold text-lg mb-2">Ready to Optimize Your Logistics?</p>
          <p className="text-white/70 text-sm mb-6">Contact our Chennai logistics experts today.</p>
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
