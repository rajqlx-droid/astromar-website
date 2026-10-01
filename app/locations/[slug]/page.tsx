import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Navigation, Warehouse, Clock, Globe } from "lucide-react";
import { ftwzLocationDetails, getLocationBySlug } from "@/data/ftwzLocations";
import { locationDisplay as locations } from "@/data/locationDisplay";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import LocationCarousel from "./LocationCarousel";

function KwText({ segments }: { segments?: { text: string; kw?: boolean; href?: string; target?: string; rel?: string }[] }) {
  if (!segments) return null;
  return (
    <>
      {segments.map((seg, i) => {
        const content = seg.kw ? (
          <span>{seg.text}</span>
        ) : (
          <span>{seg.text}</span>
        );
        if (seg.href) {
          return (
            <Link key={i} href={seg.href} target={seg.target} rel={seg.rel} className="underline decoration-[#F97316]/40 underline-offset-2 hover:decoration-[#F97316]">
              {content}
            </Link>
          );
        }
        return <span key={i}>{content}</span>;
      })}
    </>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const seoData = getLocationBySlug(slug);
  if (!seoData) return {};
  return {
    alternates: { canonical: `/locations/${slug}` },
    title: seoData.seo.title,
    description: seoData.seo.description,
    keywords: seoData.seo.keywords,
    openGraph: {
      title: seoData.seo.title,
      description: seoData.seo.description,
      url: `https://www.astromarfreezone.com/locations/${slug}`,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  return ftwzLocationDetails.map((loc) => ({ slug: loc.slug }));
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) notFound();

  const others = locations.filter((l) => l.slug !== slug && l.type === "FTWZ Warehouse");
  const sameState = others.filter((l) => l.state === location.state);
  const rest = others.filter((l) => l.state !== location.state);
  const otherLocations = [...sameState, ...rest];

  const seoDetail = getLocationBySlug(slug);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative py-16 overflow-hidden flex items-center">
        <Image
          src={location.heroImage}
          alt={seoDetail?.seo.heroAlt ?? `${location.city} ${location.type} — Astromar Logistics`}
          fill
          sizes="100vw"
          className="object-cover object-center"
          preload
          fetchPriority="high"
        />
        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.65)" }} />
        {/* Gradient tint — navy at bottom for smooth page transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-transparent" />
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#F97316] to-transparent" />

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            {seoDetail?.seo.h1 && (
              <nav aria-label="Breadcrumb" className="text-xs text-white/60 mb-6">
                <span className="hover:text-white/80"><Link href="/">Astromar</Link></span>
                <span className="mx-2">›</span>
                <span className="hover:text-white/80"><Link href="/locations">Locations</Link></span>
                <span className="mx-2">›</span>
                <span className="text-[#F97316]">{seoDetail.seo.h1}</span>
              </nav>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Left — text content */}
              <div className="flex flex-col h-full">
                {/* State badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 w-fit" style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.30)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
                  <span className="text-xs font-bold tracking-[0.15em] text-[#F97316] uppercase">{location.state} &nbsp;·&nbsp; {location.type}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-3xl font-extrabold text-white mb-3 leading-tight tracking-tight">
                  {seoDetail?.seo.h1 ? (
                    <>
                      {seoDetail.seo.h1}{" "}
                      <span className="block text-white/90 text-xl sm:text-2xl md:text-2xl font-bold mt-1">{seoDetail.seo.h1Subtitle}</span>
                    </>
                  ) : (
                    <>
                      {location.city}
                      <span className="block text-[#F97316]">FTWZ Facility</span>
                    </>
                  )}
                </h1>
                {seoDetail?.seo.bannerIntro && (
                  <p className="text-sm sm:text-base text-white/85 leading-relaxed mb-4 max-w-xl">
                    <KwText segments={seoDetail.seo.bannerIntro} />
                  </p>
                )}
                <div className="flex items-start gap-2 text-white/90 mb-3">
                  <MapPin className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{location.address}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 mb-8">
                  <Phone className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                  <a href={`tel:${location.phone.replace(/\s/g, "")}`} className="text-sm hover:text-white transition-colors">{location.phone}</a>
                </div>
                <div className="flex flex-wrap gap-3 mt-auto">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all shadow-lg hover:opacity-90"
                    style={{ background: "#F97316" }}
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                  <a
                    href="/contact-us"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                    style={{ background: "white", color: "#0f1f3d" }}
                  >
                    Contact Us
                  </a>
                </div>
              </div>

              {/* Right — scan-line image + info cards */}
              <div className="grid grid-cols-2 gap-4 h-full content-center">
                <div className="bg-white/8 border border-white/12 rounded-xl p-6 text-center backdrop-blur-sm hover:bg-white/12 hover:border-[rgba(249,115,22,0.3)] transition-all">
                  <p className="text-3xl font-extrabold text-[#F97316] leading-tight mb-2">₹0</p>
                  <p className="text-sm text-white/70 font-medium">Customs Duty</p>
                </div>
                <div className="bg-white/8 border border-white/12 rounded-xl p-6 text-center backdrop-blur-sm hover:bg-white/12 hover:border-[rgba(249,115,22,0.3)] transition-all">
                  <p className="text-3xl font-extrabold text-[#F97316] leading-tight mb-2">100%</p>
                  <p className="text-sm text-white/70 font-medium">GST Deferral</p>
                </div>
                <div className="bg-white/8 border border-white/12 rounded-xl p-6 text-center backdrop-blur-sm hover:bg-white/12 hover:border-[rgba(249,115,22,0.3)] transition-all">
                  <p className="text-3xl font-extrabold text-[#F97316] leading-tight mb-2">24/7</p>
                  <p className="text-sm text-white/70 font-medium">Operations</p>
                </div>
                <div className="bg-white/8 border border-white/12 rounded-xl p-6 text-center backdrop-blur-sm hover:bg-white/12 hover:border-[rgba(249,115,22,0.3)] transition-all">
                  <p className="text-3xl font-extrabold text-[#F97316] leading-tight mb-2">10</p>
                  <p className="text-sm text-white/70 font-medium">FTWZ Locations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className={`grid grid-cols-1 ${seoDetail?.seo.aboutParagraphs && seoDetail.seo.aboutParagraphs.length > 0 ? "md:grid-cols-5" : "md:grid-cols-2"} gap-12 items-start`}>
            <div className={seoDetail?.seo.aboutParagraphs && seoDetail.seo.aboutParagraphs.length > 0 ? "md:col-span-3" : ""}>
              <p className="text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-3">ABOUT THIS FACILITY</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-5">
                {seoDetail?.seo.aboutH2 ? (
                  <KwText segments={seoDetail.seo.aboutH2} />
                ) : (
                  <>{location.city} FTWZ — Strategic Location Advantage</>
                )}
              </h2>
              {seoDetail?.seo.aboutParagraphs ? (
                <div className="space-y-4 mb-6">
                  {seoDetail.seo.aboutParagraphs.map((para, idx) => (
                    <p key={idx} className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                      <KwText segments={para} />
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-6">
                  {location.about}
                </p>
              )}
            </div>
            <div className={seoDetail?.seo.aboutParagraphs && seoDetail.seo.aboutParagraphs.length > 0 ? "md:col-span-2" : ""}>
              <p className="text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-3">SERVICES AVAILABLE</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-5">
                {seoDetail?.seo.servicesH2 ? (
                  <KwText segments={seoDetail.seo.servicesH2} />
                ) : (
                  <>What We Offer at {location.city}</>
                )}
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {location.services.map((service, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-[#1B3A6B]/20 bg-brand-light">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(249,115,22,0.10)] flex items-center justify-center flex-shrink-0">
                      <Warehouse className="w-4 h-4 text-[#F97316]" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Details Section */}
      <section className="py-16 bg-brand-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <p className="text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-3 text-center">FACILITY DETAILS</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-10 text-center">
            Location &amp; Operations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Address */}
            <div className="bg-white border border-[#1B3A6B]/10 rounded-xl p-5 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg bg-[rgba(249,115,22,0.10)] flex items-center justify-center mb-3">
                <MapPin className="w-6 h-6 text-[#F97316]" />
              </div>
              <strong className="block text-sm font-bold text-foreground mb-1">Address</strong>
              <span className="text-sm text-foreground/70">{location.address}</span>
            </div>
            {/* Nearest Port */}
            <div className="bg-white border border-[#1B3A6B]/10 rounded-xl p-5 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg bg-[rgba(249,115,22,0.10)] flex items-center justify-center mb-3">
                <Globe className="w-6 h-6 text-[#F97316]" />
              </div>
              <strong className="block text-sm font-bold text-foreground mb-1">Nearest Port</strong>
              <span className="text-sm text-foreground/70">{location.port}</span>
            </div>
            {/* Nearest Airport */}
            <div className="bg-white border border-[#1B3A6B]/10 rounded-xl p-5 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg bg-[rgba(249,115,22,0.10)] flex items-center justify-center mb-3">
                <Navigation className="w-6 h-6 text-[#F97316]" />
              </div>
              <strong className="block text-sm font-bold text-foreground mb-1">Nearest Airport</strong>
              <span className="text-sm text-foreground/70">{location.nearestAirport}</span>
            </div>
            {/* Operating Hours */}
            <div className="bg-white border border-[#1B3A6B]/10 rounded-xl p-5 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg bg-[rgba(249,115,22,0.10)] flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-[#F97316]" />
              </div>
              <strong className="block text-sm font-bold text-foreground mb-1">Operating Hours</strong>
              <span className="text-sm text-foreground/70">{location.operatingHours}</span>
            </div>
            {/* Phone */}
            <div className="bg-white border border-[#1B3A6B]/10 rounded-xl p-5 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg bg-[rgba(249,115,22,0.10)] flex items-center justify-center mb-3">
                <Phone className="w-6 h-6 text-[#F97316]" />
              </div>
              <strong className="block text-sm font-bold text-foreground mb-1">Phone</strong>
              <a href={`tel:${location.phone.replace(/\s/g, "")}`} className="text-sm text-[#F97316] hover:underline">{location.phone}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Modal Connectivity Section */}
      {seoDetail?.connectivity && (
        <section className="py-16 bg-white border-t border-[#1B3A6B]/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <p className="text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-3 text-center">CONNECTIVITY</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-10 text-center">
              {seoDetail.connectivity.headline}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-brand-light border border-[#1B3A6B]/10 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#F97316]/30">
                  <Navigation className="w-5 h-5 text-[#F97316]" />
                  <h3 className="text-base font-bold text-[#0f1f3d]">Road</h3>
                </div>
                <ul className="space-y-2">
                  {seoDetail.connectivity.road.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] flex-shrink-0 mt-2"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-brand-light border border-[#1B3A6B]/10 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#F97316]/30">
                  <Warehouse className="w-5 h-5 text-[#F97316]" />
                  <h3 className="text-base font-bold text-[#0f1f3d]">Rail</h3>
                </div>
                <ul className="space-y-2">
                  {seoDetail.connectivity.rail.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] flex-shrink-0 mt-2"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-brand-light border border-[#1B3A6B]/10 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#F97316]/30">
                  <Globe className="w-5 h-5 text-[#F97316]" />
                  <h3 className="text-base font-bold text-[#0f1f3d]">Sea</h3>
                </div>
                <ul className="space-y-2">
                  {seoDetail.connectivity.sea.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] flex-shrink-0 mt-2"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-brand-light border border-[#1B3A6B]/10 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#F97316]/30">
                  <Clock className="w-5 h-5 text-[#F97316]" />
                  <h3 className="text-base font-bold text-[#0f1f3d]">Air</h3>
                </div>
                <ul className="space-y-2">
                  {seoDetail.connectivity.air.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] flex-shrink-0 mt-2"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Section */}
      {seoDetail?.seo.whyChooseH2 && seoDetail?.seo.whyChooseBlocks && (
        <section className="py-16 bg-brand-light">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-10 text-center">
              <KwText segments={seoDetail.seo.whyChooseH2} />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {seoDetail.seo.whyChooseBlocks.map((block, bIdx) => (
                <div key={bIdx} className="bg-white border border-[#1B3A6B]/10 rounded-xl p-6">
                  <h3 className="text-base font-bold text-[#0f1f3d] mb-4 pb-3 border-b border-[#F97316]/30">
                    {block.title}
                  </h3>
                  <ul className="space-y-3">
                    {block.items.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-2 text-sm text-foreground/80 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] flex-shrink-0 mt-2"></span>
                        <span><KwText segments={item} /></span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {seoDetail?.seo.faqH2 && seoDetail?.seo.faqItems && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-10 text-center">
              <KwText segments={seoDetail.seo.faqH2} />
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {seoDetail.seo.faqItems.map((item, fIdx) => (
                <div key={fIdx} className="bg-brand-light border border-[#1B3A6B]/10 rounded-xl p-5">
                  <h3 className="text-base font-bold text-[#0f1f3d] mb-3 flex gap-3">
                    <span className="text-[#F97316] flex-shrink-0">Q{fIdx + 1}.</span>
                    <span><KwText segments={item.question} /></span>
                  </h3>
                  <p className="text-sm text-foreground/80 leading-relaxed pl-8">
                    <KwText segments={item.answer} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Reading */}
      {seoDetail?.seo.relatedReading && seoDetail.seo.relatedReading.length > 0 && (
        <section className="py-16 bg-brand-light">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-10 text-center">
              Related Reading
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {seoDetail.seo.relatedReading.map((item, rIdx) => (
                <Link
                  key={rIdx}
                  href={item.href}
                  className="block bg-white border border-[#1B3A6B]/10 rounded-xl p-5 hover:shadow-md hover:border-[#F97316]/40 transition-all"
                >
                  <span className="text-sm sm:text-base font-bold text-[#0f1f3d] hover:text-[#F97316] transition-colors">
                    {item.title} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other FTWZ Locations */}
      {otherLocations.length > 0 && <LocationCarousel items={otherLocations} />}

      {/* JSON-LD Schemas */}
      {seoDetail?.seo.localBusinessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seoDetail.seo.localBusinessSchema) }}
        />
      )}
      {seoDetail?.seo.faqPageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seoDetail.seo.faqPageSchema) }}
        />
      )}
      {seoDetail?.seo.breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seoDetail.seo.breadcrumbSchema) }}
        />
      )}
      <CTASection />
    </div>
  );
}
