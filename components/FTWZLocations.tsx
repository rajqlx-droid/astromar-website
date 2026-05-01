"use client"
import { useState, useMemo } from "react";
import { MapPin, Phone, Warehouse, Search, Navigation } from "lucide-react";
import { Input } from "./ui/input";
import ScrollReveal from "./ScrollReveal";
import FTWZMap from "./FTWZMap";

const locations = [
  { slug: "kochi", city: "Kochi", state: "Kerala", type: "FTWZ Warehouse", phone: "+91 99402 11014", lat: 9.9312, lng: 76.2673, address: "SEZ ICTT, Vallarpadam, Kochi, Kerala 682504" },
  { slug: "vizag", city: "Vizag", state: "Andhra Pradesh", type: "FTWZ Warehouse", phone: "+91 99402 11014", lat: 17.6868, lng: 83.2185, address: "VSEZ, Duvvada, Visakhapatnam, AP 530049" },
  { slug: "mumbai-panvel", city: "Mumbai (Panvel)", state: "Maharashtra", type: "FTWZ Warehouse", phone: "+91 99402 11014", lat: 18.9894, lng: 73.1175, address: "Village Sai, Taluka Panvel, Raigad, Maharashtra 410206" },
  { slug: "mumbai-jnpa", city: "Mumbai (JNPA)", state: "Maharashtra", type: "FTWZ Warehouse", phone: "+91 99402 11014", lat: 18.9543, lng: 72.9479, address: "JNPA SEZ, Uran, Raigad, Maharashtra 400707" },
  { slug: "chennai-sriperumbudur", city: "Chennai (Sriperumbudur)", state: "Tamil Nadu", type: "FTWZ Warehouse", phone: "+91 99402 11014", lat: 12.9716, lng: 79.9473, address: "Mannur Village, Sriperumbudur, Kancheepuram, TN 602105" },
  { slug: "chennai-vallur", city: "Chennai (Vallur)", state: "Tamil Nadu", type: "FTWZ Warehouse", phone: "+91 99402 11014", lat: 13.2090, lng: 80.2843, address: "Vallur Village, Ponneri, Tiruvallur, TN 600120" },
  { slug: "delhi-khurja", city: "Delhi (Khurja)", state: "Uttar Pradesh", type: "FTWZ Warehouse", phone: "+91 99402 11014", lat: 28.2476, lng: 77.8538, address: "Khurja Industrial Area, Bulandshahr, UP 203131" },
  { slug: "bengaluru", city: "Bengaluru", state: "Karnataka", type: "FTWZ Warehouse", phone: "+91 99402 11014", lat: 13.2486, lng: 77.7066, address: "Aerospace SEZ, Devanahalli, Bengaluru, Karnataka 562165" },
  { slug: "dahej", city: "Dahej", state: "Gujarat", type: "FTWZ Warehouse", phone: "+91 99402 11014", lat: 21.7051, lng: 72.5793, address: "Z-85/2A, Dahej SEZ-1, Dahej, Gujarat" },
  { slug: "mundra", city: "Mundra", state: "Gujarat", type: "FTWZ Warehouse", phone: "+91 99402 11014", lat: 22.8386, lng: 69.7295, address: "APSEZ, Survey No. 169/36, Mundra, Kutch, Gujarat 370421" },
];

const FTWZLocations = () => {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return locations;
    const q = searchQuery.toLowerCase();
    return locations.filter(
      (loc) =>
        loc.city.toLowerCase().includes(q) ||
        loc.state.toLowerCase().includes(q) ||
        loc.address.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-2">
            OUR FTWZ NETWORK
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-foreground mb-6">
            Strategically Located Across India
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6">
            With FTWZ facilities in 10 key locations, we offer duty-free warehousing and seamless logistics connectivity across the nation.
          </p>
          <div className="relative max-w-md mx-auto mb-12">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by city, state, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mb-10">
            <FTWZMap />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {filteredLocations.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground py-8">No locations found matching "{searchQuery}"</p>
          )}
          {filteredLocations.map((loc, i) => (
            <ScrollReveal key={loc.city} delay={i * 0.06} className="flex flex-col h-full">
              <div
                onClick={() => setActiveCity(loc.city)}
                className={`flex flex-col h-full group relative rounded-xl border bg-white p-5 cursor-pointer transition-all duration-300 ${
                  activeCity === loc.city
                    ? "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary/20"
                    : "border-gray-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                }`}
              >
                <div className="flex items-start gap-3 mb-3 min-w-0">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    activeCity === loc.city ? "bg-primary/20" : "bg-primary/10 group-hover:bg-primary/20"
                  }`}>
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-foreground text-base leading-tight">
                      {loc.city.includes("(")
                        ? loc.city.split("(")[0].trim()
                        : loc.city}
                    </h3>
                    {loc.city.includes("(") && (
                      <span className="text-xs text-muted-foreground">({loc.city.split("(")[1]}</span>
                    )}
                    <p className="text-sm text-muted-foreground">{loc.state}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-sm flex-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Warehouse size={14} className="text-accent flex-shrink-0" />
                    <span>{loc.type}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{loc.address}</p>
                  <div className="mt-auto pt-3 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone size={14} className="text-accent flex-shrink-0" />
                      <a href={`tel:${loc.phone.replace(/\s/g, "")}`} className="hover:text-primary transition-colors" onClick={(e) => e.stopPropagation()}>
                        {loc.phone}
                      </a>
                    </div>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loc.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      <Navigation size={13} />
                      Get Directions
                    </a>
                    <a
                      href={`/locations/${loc.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors w-full"
                    >
                      View Port Details →
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FTWZLocations;
