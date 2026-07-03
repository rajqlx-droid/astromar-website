import { FileText, Ship, Plane, ClipboardCheck, Snowflake, GitBranch, Box } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
  featured?: boolean;
}

export const services: Service[] = [
  { icon: FileText, title: "FTWZ", desc: "Duty-free storage with bonded warehouse facilities across India. Defer customs duty and GST until goods enter the domestic tariff area.", featured: true, href: "/free-trade-zone" },
  { icon: Ship, title: "Coastal Shipping", desc: "Domestic coastal cargo movement along India's extensive coastline, offering cost-effective and eco-friendly transport alternatives.", href: "/coastal-shipping-free-trade-zone" },
  { icon: Ship, title: "Ocean Freight", desc: "Full container load (FCL) and less than container load (LCL) ocean freight services across major global trade routes.", href: "/free-trade-zone-services/ocean-freight" },
  { icon: Plane, title: "Air Freight", desc: "Express and standard air cargo solutions with real-time tracking and customs pre-clearance capabilities.", href: "/free-trade-zone-services/air-freight" },
  { icon: GitBranch, title: "Supply Chain", desc: "Integrated supply chain management with inventory optimization, order fulfilment, and distribution.", href: "/free-trade-zone-services/supply-chain" },
  { icon: ClipboardCheck, title: "Custom Clearance", desc: "End-to-end customs compliance, documentation, and clearance services for imports and exports.", href: "/free-trade-zone-services/custom-clearance" },
  { icon: Snowflake, title: "Warehousing", desc: "Secure, scalable warehousing solutions with real-time inventory management and value-added services.", href: "/free-trade-zone-services/warehousing" },
  { icon: Box, title: "Projects", desc: "Specialized handling of oversized, heavy-lift, and project cargo with custom engineering solutions.", href: "/free-trade-zone-services/projects" },
];
