import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  alternates: { canonical: "/ftwz-faqs" },
  title: "What is Free Trade Zone India | FTZ FAQs | Astromar",
  description: "Discover answers to frequently asked questions about Free Trade Zone in India — benefits, activities, customs clearance, and more.",
  keywords: ["FTWZ FAQs", "free trade zone India FAQ", "what is FTWZ India", "FTZ questions India", "FTWZ customs clearance"],
  openGraph: {
    title: "What is Free Trade Zone India | FTZ FAQs",
    description: "Discover answers to frequently asked questions about Free Trade Zone in India.",
    url: "https://www.astromarfreezone.com/ftwz-faqs",
    images: ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80"],
  },
};

const faqs = [
  {
    question: "What is a Free Trade Warehousing Zone in India?",
    answer: "Free Trade Warehousing Zone, a Special Category of Special Economic Zone, can be a stand-alone or a demarcated area within a sector-specific or multiproduct specific SEZ. FTWZ is a deemed Foreign Territory with special status and benefits. It is a dedicated platform for warehousing and trading, governed by SEZ act 2005 & Rules 2006.",
  },
  {
    question: "How businesses benefit from FTWZ?",
    answer: "A Free Trade Warehousing Zone offers several benefits for businesses, including tax exemptions, duty-free imports and exports, and simplified customs procedures. These incentives help reduce operational costs, improve profit margins, and enhance competitiveness in the global marketplace.",
  },
  {
    question: "What activities are permitted inside the FTZs?",
    answer: "The activities that are allowed inside a free trade zone include warehousing and storage of goods, re-exporting your commodity duty-free, trading with/without labeling, packing, quality checking, lashing, strapping, shrink wrapping, consolidation, clubbing, bottling, palletization, kitting, testing, combination packing, assembling of semi-knockdown and finished goods and other operations.",
  },
  {
    question: "Can the goods be kept forever inside the FTWZ without paying taxes and customs duty?",
    answer: "Goods can be warehoused inside the free trade warehousing zone for 3 years which is extendable up to 5 years in special permissions. Post that the cargo is either auctioned or can be cleared/re-exported by paying custom duties.",
  },
  {
    question: "How long does customs clearance take via FTWZs?",
    answer: "Typically, customs clearance for imported goods through a free trade zone or free trade warehousing zone is completed within 24 to 48 hours.",
  },
  {
    question: "What types of industries commonly utilize FTWZs for trading and business purposes?",
    answer: "FTWZs are utilized by a diverse range of industries, including pharmaceuticals, luxury goods, chemicals, medical devices, liquor, auto parts, aviation, electronics, IT (servers), food, electrical appliances, polymers, pulses, edible oil, sugar, fruits, dry fruits, industrial machinery, and electric machinery and equipment.",
  },
  {
    question: "Why do pharmaceutical companies prefer FTWZs?",
    answer: "Pharmaceutical companies benefit from FTWZs for efficient storage, streamlined customs processes, and the ability to maintain product integrity through advanced cold storage facilities.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function FTWZFaqsPage() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* Banner */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80"
          alt="FTWZ FAQs India"
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
            <span className="text-[#F97316] text-sm font-semibold">FTWZ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            FTWZ in India — Frequently Asked Questions
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
            <span>📅 April 26, 2026</span>
            <span>⏱ 5 min read</span>
            <span className="bg-[#F97316] text-white text-xs font-bold px-3 py-1 rounded-full">FTWZ</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 py-14">

        {/* Intro */}
        <div className="bg-brand-light border-l-4 border-[#F97316] rounded-r-xl px-6 py-5 mb-10">
          <p className="text-base text-foreground/80 leading-relaxed">
            Our Free Trade Zone in Chennai provides the advantage of importing and exporting with duty deferment, tax benefits, cost efficiency, and optimized distribution channels. It also facilitates re-exporting goods from India without the typical burden of Indian duties and taxes. Additionally, we offer comprehensive services like repacking, relabeling, kitting, palletization, and assembly, all tailored for non-duty-paid goods.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-[#1B3A6B] mb-8">Free Trade Zone FAQs</h2>

        {/* FAQ Items */}
        <div className="space-y-6 mb-12">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-[#1B3A6B]/15 rounded-xl overflow-hidden">
              <div className="bg-[#1B3A6B] px-6 py-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#F97316] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <h3 className="text-white font-semibold text-sm">{faq.question}</h3>
              </div>
              <div className="bg-white px-6 py-4 border-l-4 border-[#F97316]">
                <p className="text-foreground/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#1B3A6B] to-[#0f1f3d] rounded-xl p-8 text-center">
          <p className="text-white font-bold text-lg mb-2">Have More Questions?</p>
          <p className="text-white/70 text-sm mb-6">Our FTWZ experts are ready to help you find the right solution for your business.</p>
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
