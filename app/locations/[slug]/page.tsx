import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Navigation, Warehouse, ArrowLeft, Clock, Globe } from "lucide-react";
import { ftwzLocationDetails } from "@/data/ftwzLocations";

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
    services: ["Duty-Free Storage", "GST Deferral", "Re-export Hub", "Value-Added Services", "Cold Chain Storage", "Single Window Clearance"],
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
    services: ["Duty-Free Storage", "GST Deferral", "Re-export Hub", "Value-Added Services", "Bonded Warehousing", "Single Window Clearance"],
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
    port: "Nhava Sheva (JNPT)",
    nearestAirport: "Chhatrapati Shivaji Maharaj International Airport (BOM) — 45 km",
    operatingHours: "Mon–Sat: 8:00 AM – 8:00 PM",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80",
    services: ["Duty-Free Storage", "GST Deferral", "Re-export Hub", "Value-Added Services", "Cold Chain Storage", "Project Cargo"],
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
    port: "Jawaharlal Nehru Port (JNPT)",
    nearestAirport: "Chhatrapati Shivaji Maharaj International Airport (BOM) — 40 km",
    operatingHours: "Mon–Sat: 8:00 AM – 8:00 PM",
    heroImage: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&q=80",
    services: ["Duty-Free Storage", "GST Deferral", "Re-export Hub", "Container Freight", "Bonded Warehousing", "Single Window Clearance"],
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
    services: ["Duty-Free Storage", "GST Deferral", "Electronics Logistics", "Value-Added Services", "Cold Chain Storage", "Single Window Clearance"],
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
    services: ["Duty-Free Storage", "GST Deferral", "Bulk Cargo", "Re-export Hub", "Bonded Warehousing", "Single Window Clearance"],
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
    services: ["Duty-Free Storage", "GST Deferral", "ICD Connectivity", "Value-Added Services", "Bonded Warehousing", "Single Window Clearance"],
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
    port: "ICD Whitefield / Bangalore",
    nearestAirport: "Kempegowda International Airport (BLR) — 8 km",
    operatingHours: "Mon–Sat: 8:00 AM – 8:00 PM",
    heroImage: "https://images.unsplash.com/photo-1565793979038-b5b6d2bda985?w=1920&q=80",
    services: ["Duty-Free Storage", "GST Deferral", "Aerospace Logistics", "High-Value Cargo", "Cold Chain Storage", "Single Window Clearance"],
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
    services: ["Duty-Free Storage", "GST Deferral", "Chemical Logistics", "Bulk Cargo", "Bonded Warehousing", "Single Window Clearance"],
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
    services: ["Duty-Free Storage", "GST Deferral", "Re-export Hub", "Container Freight", "Bulk Cargo", "Single Window Clearance"],
    about: "Located at Adani Ports and SEZ (APSEZ), Mundra — India's largest commercial port — Astromar's Mundra FTWZ offers unmatched scale and connectivity for importers, exporters, and re-export operators. Strategically positioned for trade with the Middle East, Africa, and Europe.",
  },
];

export async function generateStaticParams() {
  return ftwzLocationDetails.map((loc) => ({ slug: loc.slug }));
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) notFound();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section
        className="relative min-h-[50vh] py-24 overflow-hidden flex items-center"
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
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <Link href="/contact" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to Locations
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left — text content */}
              <div>
                {/* State badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/30 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-bold tracking-[0.15em] text-accent uppercase">{location.state} &nbsp;·&nbsp; {location.type}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight">
                  {location.city}
                  <span className="block text-accent/90">FTWZ Facility</span>
                </h1>
                <div className="flex items-start gap-2 text-white/70 mb-3">
                  <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{location.address}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 mb-8">
                  <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                  <a href={`tel:${location.phone.replace(/\s/g, "")}`} className="text-sm hover:text-white transition-colors">{location.phone}</a>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 hover:shadow-accent/40"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/25 text-white font-semibold hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm"
                  >
                    Contact Us
                  </a>
                </div>
              </div>

              {/* Right — info cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-accent/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center mb-3">
                    <Warehouse className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Facility</p>
                  <p className="text-white font-semibold text-sm leading-snug">{location.type}</p>
                </div>
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-accent/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center mb-3">
                    <Globe className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Nearest Port</p>
                  <p className="text-white font-semibold text-sm leading-snug">{location.port}</p>
                </div>
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-accent/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center mb-3">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">State</p>
                  <p className="text-white font-semibold text-sm leading-snug">{location.state}</p>
                </div>
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-accent/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Hours</p>
                  <p className="text-white font-semibold text-sm leading-snug">{location.operatingHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-3">ABOUT THIS FACILITY</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-5">
                {location.city} FTWZ — Strategic Location Advantage
              </h2>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-6">{location.about}</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-bold text-foreground">Address</strong>
                    <span className="text-sm text-foreground/70">{location.address}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-bold text-foreground">Nearest Port</strong>
                    <span className="text-sm text-foreground/70">{location.port}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Navigation className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-bold text-foreground">Nearest Airport</strong>
                    <span className="text-sm text-foreground/70">{location.nearestAirport}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-bold text-foreground">Operating Hours</strong>
                    <span className="text-sm text-foreground/70">{location.operatingHours}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm font-bold text-foreground">Phone</strong>
                    <a href={`tel:${location.phone.replace(/\s/g, "")}`} className="text-sm text-accent hover:underline">{location.phone}</a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-3">SERVICES AVAILABLE</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-5">What We Offer at {location.city}</h2>
              <div className="grid grid-cols-1 gap-3">
                {location.services.map((service, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-brand-light">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Warehouse className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
            Interested in Our {location.city} Facility?
          </h2>
          <p className="text-sm sm:text-base text-foreground/70 mb-8 max-w-2xl mx-auto">
            Contact our team to learn more about storing your goods at our {location.city} FTWZ facility and start saving on customs duty and GST today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-accent text-white font-semibold hover:bg-accent/90 transition-colors">
              Get in Touch →
            </a>
            <Link href="/locations" className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-foreground text-foreground font-semibold hover:bg-foreground/5 transition-colors">
              View All Locations
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
