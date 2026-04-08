"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin, Phone, Navigation, Truck, Train, Ship, Plane, Factory, CheckCircle2, ArrowRight, ChevronRight, Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { getLocationBySlug, ftwzLocationDetails } from "@/data/ftwzLocations";


const LocationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = slug ? getLocationBySlug(slug) : undefined;

  if (!location) return null;

  const connectivitySections = [
    { icon: Truck, label: "Road", items: location.connectivity.road },
    { icon: Train, label: "Rail", items: location.connectivity.rail },
    { icon: Ship, label: "Sea / Port", items: location.connectivity.sea },
    { icon: Plane, label: "Air", items: location.connectivity.air },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Warehouse",
    name: `Astromar FTWZ – ${location.city}`,
    description: location.seo.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address,
      addressRegion: location.state,
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: location.lat, longitude: location.lng },
    telephone: location.phone,
    parentOrganization: {
      "@type": "Organization",
      name: "Astromar Logistics Pvt Ltd",
      url: "https://astromarfreezone.com",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://astromarfreezone.com/" },
          { "@type": "ListItem", position: 2, name: "FTWZ Services", item: "https://astromarfreezone.com/ftwz-services" },
          { "@type": "ListItem", position: 3, name: `FTWZ ${location.city}`, item: `https://astromarfreezone.com/locations/${location.slug}` },
        ],
      }) }} />
      <Header />

      {/* Hero */}
      <section className="relative bg-[hsl(var(--sidebar-background))] pt-28 pb-16">
        <div className="container max-w-6xl px-4">
          <ScrollReveal>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 flex-wrap">
              <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Home size={14} /> Home
              </Link>
              <ChevronRight size={14} className="flex-shrink-0" />
              <Link href="/ftwz-services" className="hover:text-primary transition-colors">FTWZ</Link>
              <ChevronRight size={14} className="flex-shrink-0" />
              <span className="text-foreground font-medium">{location.city}</span>
            </nav>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">{location.type}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{location.state}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              FTWZ Warehouse – {location.city}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mb-6">{location.seo.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin size={15} className="text-primary" />{location.address}</span>
              <a href={`tel:${location.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Phone size={15} className="text-primary" />{location.phone}
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-primary font-semibold hover:underline"
              >
                <Navigation size={15} /> Get Directions
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Port Overview */}
      <section className="py-16 bg-background">
        <div className="container max-w-6xl px-4">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3">PORT & SEZ OVERVIEW</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-6">{location.portOverview.headline}</h2>
            <p className="text-muted-foreground leading-relaxed max-w-4xl mb-10">{location.portOverview.description}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Port / Terminal", value: location.portOverview.portName },
                { label: "Port Type", value: location.portOverview.portType },
                { label: "SEZ Zone", value: location.portOverview.sezZone },
                { label: "Established", value: location.portOverview.established },
                { label: "Total Area", value: location.portOverview.totalArea },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Connectivity */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-6xl px-4">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3">CONNECTIVITY</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-10">{location.connectivity.headline}</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {connectivitySections.map((section, i) => (
              <ScrollReveal key={section.label} delay={i * 0.08}>
                <div className="rounded-xl border border-border bg-card p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <section.icon size={20} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{section.label}</h3>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 size={14} className="text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="py-16 bg-background">
        <div className="container max-w-6xl px-4">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3">WHY THIS LOCATION</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-10">Key Advantages</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {location.keyAdvantages.map((adv, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
                  <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-foreground">{adv}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-6xl px-4">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3">INDUSTRIES SERVED</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-8">Key Industries at {location.city}</h2>
          </ScrollReveal>
          <div className="flex flex-wrap gap-3">
            {location.industries.map((ind, i) => (
              <ScrollReveal key={ind} delay={i * 0.04}>
                <div className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5">
                  <Factory size={15} className="text-primary" />
                  <span className="text-sm font-semibold text-foreground">{ind}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container max-w-4xl px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">Start Warehousing at {location.city}</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Get a customized FTWZ warehousing solution at our {location.city} facility. Our team will help you optimize duties, storage, and supply chain logistics.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <a href="#contact">Schedule Consultation <ArrowRight className="w-4 h-4 ml-1" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <a href={`tel:${location.phone.replace(/\s/g, "")}`}>Call {location.phone}</a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-16 bg-background">
        <div className="container max-w-6xl px-4">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3">MORE LOCATIONS</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-8">Explore Other FTWZ Locations</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ftwzLocationDetails
              .filter((loc) => loc.slug !== location.slug)
              .map((loc, i) => (
                <ScrollReveal key={loc.slug} delay={i * 0.05}>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="group block rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                        <MapPin size={18} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-sm leading-tight">{loc.city}</h3>
                        <p className="text-xs text-muted-foreground">{loc.state}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{loc.portOverview.headline}</p>
                    <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-primary group-hover:underline">
                      View Details <ArrowRight size={12} />
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default LocationPage;
