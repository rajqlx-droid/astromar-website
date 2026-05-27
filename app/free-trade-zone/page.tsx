import FTWZClient from "./ftwz-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Trade Warehousing Zone in India | Astromar Logistics",
  description: "Astromar operates India's leading FTWZ network across 10 strategic locations. Duty-free storage, GST deferral, customs clearance, and re-export services for importers and exporters nationwide.",
  keywords: "free trade warehousing zone, ftwz in india, free trade warehousing zone in india, free trade zones in india, duty-free warehousing, ftwz solutions, ftwz warehouse, custom bonded warehouse, free zone company, ftwz customs clearance, bonded warehouse india",
  openGraph: {
    title: "Free Trade Warehousing Zone in India | Astromar Logistics",
    description: "India's leading FTWZ operator across 10 strategic locations. Duty-free storage, GST deferral, customs clearance for importers and exporters.",
    url: "https://www.astromarfreezone.com/free-trade-zone",
    siteName: "Astromar Logistics",
    type: "website",
  },
};

export default function FTWZServicesPage() {
  return <FTWZClient />;
}
