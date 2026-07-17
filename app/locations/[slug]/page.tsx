import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Navigation, Warehouse, ArrowLeft, Clock, Globe } from "lucide-react";
import { ftwzLocationDetails, getLocationBySlug } from "@/data/ftwzLocations";
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

const locations = [
  {
    slug: "kochi",
    city: "Kochi",
    state: "Kerala",
    type: "FTWZ Warehouse",
    address: "SEZ ICTT, Vallarpadam, Kochi, Kerala 682504",
    phone: "+91 99402 11014",
    lat: 9.9312,
    lng: 76.2673,
    port: "Kochi Port (ICTT)",
    nearestAirport: "Cochin International Airport (COK) — 28 km",
    operatingHours: "Mon–Sat: 8:00 AM – 8:00 PM",
    heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80",
    services: ["Duty-Free Storage", "GST Deferral", "Re-export Hub", "Value-Added Services", "Cold Chain Storage", "Single Window Clearance", "Transshipment Hub", "Marine Export Logistics"],
    about: "Astromar's Kochi FTWZ facility is strategically located at the International Container Transshipment Terminal (ICTT), Vallarpadam — India's first dedicated container transshipment terminal. Offering world-class bonded warehousing with seamless port connectivity.",
  },
  {
    slug: "vizag",
    city: "Vizag",
    state: "Andhra Pradesh",
    type: "FTWZ Warehouse",
    address: "VSEZ, Duvvada, Visakhapatnam, AP 530049",
    phone: "+91 99402 11014",
    lat: 17.6868,
    lng: 83.2185,
    port: "Visakhapatnam Port",
    nearestAirport: "Visakhapatnam Airport (VTZ) — 15 km",
    operatingHours: "Mon–Sat: 8:00 AM – 8:00 PM",
    heroImage: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=1920&q=80",
    services: ["Duty-Free Storage", "GST Deferral", "Re-export Hub", "Value-Added Services", "Bonded Warehousing", "Single Window Clearance", "Steel & Engineering Logistics", "Pharma Logistics"],
    about: "Located within the Visakhapatnam Special Economic Zone (VSEZ), Astromar's Vizag facility offers strategic access to one of India's busiest eastern ports, supporting imports, exports, and re-export operations across the Bay of Bengal trade corridor.",
  },
  {
    slug: "mumbai-panvel",
    city: "Mumbai (Panvel)",
    state: "Maharashtra",
    type: "FTWZ Warehouse",
    address: "Village Sai, Taluka Panvel, Raigad, Maharashtra 410206",
    phone: "+91 99402 11014",
    lat: 18.9894,
    lng: 73.1175,
    port: "Nhava Sheva (JNPA)",
    nearestAirport: "Chhatrapati Shivaji Maharaj International Airport (BOM) — 45 km",
    operatingHours: "Mon–Sat: 8:00 AM – 8:00 PM",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80",
    services: ["Duty-Free Storage", "GST Deferral", "Re-export Hub", "Value-Added Services", "Cold Chain Storage", "Project Cargo", "Automotive Components", "FMCG Logistics"],
    about: "Astromar's Panvel facility is strategically positioned near Nhava Sheva, India's largest container port. This FTWZ warehouse provides unmatched connectivity for importers and exporters operating across Western India and beyond.",
  },
  {
    slug: "mumbai-jnpa",
    city: "Mumbai (JNPA)",
    state: "Maharashtra",
    type: "FTWZ Warehouse",
    address: "JNPA SEZ, Uran, Raigad, Maharashtra 400707",
    phone: "+91 99402 11014",
    lat: 18.9543,
    lng: 72.9479,
    port: "Jawaharlal Nehru Port (JNPA)",
    nearestAirport: "Chhatrapati Shivaji Maharaj International Airport (BOM) — 40 km",
    operatingHours: "Mon–Sat: 8:00 AM – 8:00 PM",
    heroImage: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&q=80",
    services: ["Duty-Free Storage", "GST Deferral", "Re-export Hub", "Container Freight", "Bonded Warehousing", "Single Window Clearance", "DFC Rail Connectivity", "Break-Bulk & Consolidation"],
    about: "Located at JNPA SEZ, Uran — directly adjacent to India's premier container port — Astromar's JNPA facility offers the fastest turnaround for container-based FTWZ operations, making it the preferred choice for high-volume importers and exporters.",
  },
  {
    slug: "chennai-sriperumbudur",
    city: "Chennai (Sriperumbudur)",
    state: "Tamil Nadu",
    type: "FTWZ Warehouse",
    address: "Mannur Village, Sriperumbudur, Kancheepuram, TN 602105",
    phone: "+91 99402 11014",
    lat: 12.9716,
    lng: 79.9473,
    port: "Chennai Port",
    nearestAirport: "Chennai International Airport (MAA) — 42 km",
    operatingHours: "Mon–Sat: 8:00 AM – 8:00 PM",
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80",
    services: ["Duty-Free Storage", "GST Deferral", "Electronics Logistics", "Value-Added Services", "Cold Chain Storage", "Single Window Clearance", "Automotive Components Hub", "Capital Equipment Imports"],
    about: "Astromar's Sriperumbudur FTWZ is located in the heart of Tamil Nadu's manufacturing corridor — home to global electronics and automotive giants. This facility is purpose-built for electronics, pharma, and high-value cargo operations.",
  },
  {
    slug: "chennai-vallur",
    city: "Chennai (Vallur)",
    state: "Tamil Nadu",
    type: "FTWZ Warehouse",
    address: "Vallur Village, Ponneri, Tiruvallur, TN 600120",
    phone: "+91 99402 11014",
    lat: 13.2090,
    lng: 80.2843,
    port: "Kamarajar Port (Ennore)",
    nearestAirport: "Chennai International Airport (MAA) — 35 km",
    operatingHours: "Mon–Sat: 8:00 AM – 8:00 PM",
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
    services: ["Duty-Free Storage", "GST Deferral", "Bulk Cargo", "Re-export Hub", "Bonded Warehousing", "Single Window Clearance", "Multi-Port Logistics", "Energy & Petrochemical Logistics"],
    about: "Strategically located near Kamarajar Port (Ennore), Astromar's Vallur facility serves bulk cargo, coal, and industrial goods importers. Its proximity to North Chennai's industrial belt makes it ideal for manufacturing sector logistics.",
  },
  {
    slug: "delhi-khurja",
    city: "Delhi (Khurja)",
    state: "Uttar Pradesh",
    type: "FTWZ Warehouse",
    address: "Khurja Industrial Area, Bulandshahr, UP 203131",
    phone: "+91 99402 11014",
    lat: 28.2476,
    lng: 77.8538,
    port: "ICD Tughlakabad / Dadri",
    nearestAirport: "Indira Gandhi International Airport (DEL) — 75 km",
    operatingHours: "Mon–Sat: 8:00 AM – 8:00 PM",
    heroImage: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&q=80",
    services: ["Duty-Free Storage", "GST Deferral", "ICD Connectivity", "Value-Added Services", "Bonded Warehousing", "Single Window Clearance", "Retail & FMCG Distribution", "Consumer Electronics Hub"],
    about: "Astromar's Delhi (Khurja) FTWZ serves the National Capital Region and North India's industrial hinterland. With excellent connectivity to ICD Tughlakabad and Dadri, this facility is ideal for importers and exporters in Delhi, UP, Haryana, and Punjab.",
  },
  {
    slug: "bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    type: "FTWZ Warehouse",
    address: "Aerospace SEZ, Devanahalli, Bengaluru, Karnataka 562165",
    phone: "+91 99402 11014",
    lat: 13.2486,
    lng: 77.7066,
    port: "ICD Whitefield / Bengaluru",
    nearestAirport: "Kempegowda International Airport (BLR) — 8 km",
    operatingHours: "Mon–Sat: 8:00 AM – 8:00 PM",
    heroImage: "https://images.unsplash.com/photo-1565793979038-b5b6d2bda985?w=1920&q=80",
    services: ["Duty-Free Storage", "GST Deferral", "Aerospace Logistics", "High-Value Cargo", "Cold Chain Storage", "Single Window Clearance", "Air Cargo Express", "Biotech & Life Sciences"],
    about: "Located within the Aerospace SEZ at Devanahalli — just 8 km from Bengaluru International Airport — Astromar's Bengaluru FTWZ is purpose-built for aerospace, electronics, and high-value cargo. Ideal for India's growing tech and manufacturing sector.",
  },
  {
    slug: "dahej",
    city: "Dahej",
    state: "Gujarat",
    type: "FTWZ Warehouse",
    address: "Z-85/2A, Dahej SEZ-1, Dahej, Gujarat",
    phone: "+91 99402 11014",
    lat: 21.7051,
    lng: 72.5793,
    port: "Dahej Port",
    nearestAirport: "Vadodara Airport (BDQ) — 80 km",
    operatingHours: "Mon–Sat: 8:00 AM – 8:00 PM",
    heroImage: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1920&q=80",
    services: ["Duty-Free Storage", "GST Deferral", "Chemical Logistics", "Bulk Cargo", "Bonded Warehousing", "Single Window Clearance", "Hazmat Handling", "Tanker Terminal Access"],
    about: "Astromar's Dahej FTWZ is located within Dahej SEZ-1, one of India's largest chemical and petrochemical industrial estates. This facility is specially equipped for chemical, polymer, and industrial cargo with full compliance and safety standards.",
  },
  {
    slug: "mundra",
    city: "Mundra",
    state: "Gujarat",
    type: "FTWZ Warehouse",
    address: "APSEZ, Survey No. 169/36, Mundra, Kutch, Gujarat 370421",
    phone: "+91 99402 11014",
    lat: 22.8386,
    lng: 69.7295,
    port: "Mundra Port (APSEZ)",
    nearestAirport: "Bhuj Airport (BHJ) — 65 km",
    operatingHours: "Mon–Sat: 8:00 AM – 8:00 PM",
    heroImage: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1920&q=80",
    services: ["Duty-Free Storage", "GST Deferral", "Re-export Hub", "Container Freight", "Bulk Cargo", "Single Window Clearance", "ULCV Container Operations", "Middle East & Africa Gateway"],
    about: "Located at Adani Ports and SEZ (APSEZ), Mundra — India's largest commercial port — Astromar's Mundra FTWZ offers unmatched scale and connectivity for importers, exporters, and re-export operators. Strategically positioned for trade with the Middle East, Africa, and Europe.",
  },
  {
    slug: "chennai-hq",
    city: "Chennai HQ",
    state: "Tamil Nadu",
    type: "Registered Office",
    address: "No. 922, 1st Floor, H-Block, 17th Main Road, Anna Nagar, Chennai - 600 040",
    phone: "+91 99402 11014",
    lat: 13.0850,
    lng: 80.2101,
    port: "Chennai Port (18 km)",
    nearestAirport: "Chennai International Airport (MAA) — 18 km",
    operatingHours: "Mon–Sat: 9:00 AM – 7:00 PM",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
    services: ["FTWZ Consulting", "Customs & Compliance", "Freight Management", "Supply Chain Advisory", "Trade Finance Support", "Business Development"],
    about: "Astromar Logistics Pvt Ltd's registered and corporate office in Anna Nagar, Chennai. The central hub for all business development, customer support, compliance, and operations coordination across our pan-India FTWZ network.",
  },
];

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
      <section
        role="img"
        aria-label={seoDetail?.seo.heroAlt ?? `${location.city} ${location.type} — Astromar Logistics`}
        className="relative py-16 overflow-hidden flex items-center"
        style={{
          backgroundImage: `url(${location.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.65)" }} />
        {/* Gradient tint — navy at bottom for smooth page transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-transparent" />
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#F97316] to-transparent" />

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <Link href="/contact-us" className="inline-flex items-center gap-2 text-white hover:text-[#F97316] text-sm mb-4 transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Locations
            </Link>
            {seoDetail?.seo.h1 && (
              <nav aria-label="Breadcrumb" className="text-xs text-white/60 mb-6">
                <span className="hover:text-white/80"><Link href="/">Astromar</Link></span>
                <span className="mx-2">›</span>
                <span className="hover:text-white/80"><Link href="/contact-us">Locations</Link></span>
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
