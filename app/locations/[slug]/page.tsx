import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Navigation, Warehouse, ArrowLeft, Clock, Globe } from "lucide-react";

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
    services: ["Duty-Free Storage", "GST Deferral", "Re-export Hub", "Container Freight", "Bulk Cargo", "Single Window Clearance"],
    about: "Located at Adani Ports and SEZ (APSEZ), Mundra — India's largest commercial port — Astromar's Mundra FTWZ offers unmatched scale and connectivity for importers, exporters, and re-export operators. Strategically positioned for trade with the Middle East, Africa, and Europe.",
  },
];

export async function generateStaticParams() {
  return locations.map((loc) => ({ slug: loc.slug }));
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const location = locations.find((l) => l.slug === params.slug);
  if (!location) notFound();

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative bg-brand-navy py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy to-[#0d1b35]" />
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <Link href="/contact" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Locations
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm font-bold tracking-[0.2em] text-accent uppercase mb-3">
                  {location.type}
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                  {location.city} FTWZ Facility
                </h1>
                <div className="flex items-center gap-2 text-white/80 mb-2">
                  <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-sm">{location.address}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 mb-6">
                  <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                  <a href={`tel:${location.phone.replace(/\s/g, "")}`} className="text-sm hover:text-white transition-colors">{location.phone}</a>
                </div>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:bg-accent/90 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 text-center">
                  <Warehouse className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="text-white font-semibold text-sm">{location.type}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 text-center">
                  <Globe className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="text-white font-semibold text-sm">{location.port}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 text-center">
                  <MapPin className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="text-white font-semibold text-sm">{location.state}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 text-center">
                  <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="text-white font-semibold text-sm">{location.operatingHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
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
