import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Globe } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ftwzLocationDetails } from "@/data/ftwzLocations";
import { locationDisplay } from "@/data/locationDisplay";

const BASE_URL = "https://www.astromarfreezone.com";
const TITLE = "Our FTWZ Locations Across India | Astromar Logistics";
const DESCRIPTION = "Astromar Logistics operates 10 FTWZ locations across India, including Chennai, Mumbai, Kochi, Mundra and Delhi NCR, with duty-free bonded warehousing.";

export const metadata: Metadata = {
  alternates: { canonical: "/locations" },
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${BASE_URL}/locations`,
    siteName: "Astromar Logistics",
    type: "website",
  },
};

// FTWZ warehouses only (the registered office is not a location page), in data-file order
const cards = ftwzLocationDetails
  .filter((loc) => loc.type !== "Registered Office")
  .map((loc) => {
    const display = locationDisplay.find((d) => d.slug === loc.slug);
    return {
      slug: loc.slug,
      city: display?.city ?? loc.city,
      state: loc.state,
      port: display?.port ?? loc.portOverview.portName,
      line: loc.portOverview.headline,
      image: display?.heroImage,
      imageAlt: loc.seo.heroAlt ?? `${loc.city} FTWZ — Astromar Logistics`,
    };
  });

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Astromar", "item": `${BASE_URL}/` },
    { "@type": "ListItem", "position": 2, "name": "Locations", "item": `${BASE_URL}/locations` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Astromar FTWZ Locations in India",
  "itemListElement": cards.map((c, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": `FTWZ in ${c.city}`,
    "url": `${BASE_URL}/locations/${c.slug}`,
  })),
};

export default function LocationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="/images/locations/mundra.webp"
          alt="Illustration of a container ship berthed beside blue gantry cranes and stacked containers at a port"
          fill
          sizes="100vw"
          quality={65}
          className="absolute inset-0 object-cover"
          preload
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="w-full px-6 md:px-12 lg:px-16 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <Breadcrumbs items={[{ name: "Astromar", href: "/" }, { name: "Locations" }]} />
              <p className="text-xs font-semibold tracking-widest uppercase text-orange-500 mb-5">
                FTWZ NETWORK
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Our FTWZ Locations Across India
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
                Duty-free bonded warehousing at 10 port-linked and inland hubs. Choose a location to see its port, connectivity and services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location cards */}
      <section className="py-16 bg-brand-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {cards.map((c) => (
              <Link
                key={c.slug}
                href={`/locations/${c.slug}`}
                className="group flex flex-col h-full rounded-xl border-2 border-blue-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-[#F97316]/40 transition-all"
              >
                {c.image && (
                  <div className="relative h-36 w-full">
                    <Image
                      src={c.image}
                      alt={c.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                      quality={65}
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-1 p-5">
                  <h2 className="text-base font-bold text-foreground group-hover:text-[#F97316] transition-colors">{c.city}</h2>
                  <p className="flex items-center gap-1.5 text-sm text-foreground/60 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                    {c.state}
                  </p>
                  <p className="flex items-start gap-1.5 text-xs text-foreground/70 mt-3 pt-3 border-t border-[#1B3A6B]/10">
                    <Globe className="w-3.5 h-3.5 text-[#F97316] shrink-0 mt-0.5" />
                    {c.port}
                  </p>
                  <p className="text-sm text-foreground/80 leading-relaxed mt-3 flex-1">{c.line}</p>
                  <span className="text-sm font-semibold text-primary mt-4">
                    View details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <WhatsAppButton />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
    </>
  );
}
