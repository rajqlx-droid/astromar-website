import { ftwzLocationDetails } from "@/data/ftwzLocations";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "FTWZ Locations India | Astromar Warehouses",
  description: "Astromar FTWZ warehouse locations across India – Chennai, Kochi, Vizag, Mumbai, Bengaluru, Delhi, Dahej and more."
}

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-6xl px-4 pt-28 pb-16">
        <h1 className="text-3xl font-bold mb-8">Our FTWZ Locations</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ftwzLocationDetails.map((loc) => (
            <Link key={loc.slug} href={`/locations/${loc.slug}`} className="rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow">
              <h2 className="font-bold text-lg">{loc.city}</h2>
              <p className="text-sm text-muted-foreground">{loc.state}</p>
              <p className="text-xs text-primary mt-1">{loc.type}</p>
              <p className="text-xs text-muted-foreground mt-2">{loc.address}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
