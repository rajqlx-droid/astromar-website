"use client"
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";

const services = [
  { label: "FTWZ", href: "/ftwz-services" },
  { label: "Coastal Shipping", href: "/services/coastal-shipping" },
  { label: "Ocean Freight", href: "/services/ocean-freight" },
  { label: "Air Freight", href: "/services/air-freight" },
  { label: "Supply Chain", href: "/services/supply-chain" },
  { label: "Custom Clearance", href: "/services/custom-clearance" },
  { label: "Warehousing", href: "/services/warehousing" },
  { label: "Projects", href: "/services/projects" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "FTWZ Locations", href: "/ftwz-services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const resourceLinks = [
  { label: "Tools", href: "/freight-intelligence" },
  { label: "FTWZ Guide", href: "/ftwz-services" },
  { label: "Duty Calculator", href: "/freight-intelligence" },
  { label: "FAQs", href: "/ftwz-services#faq" },
];

const Footer = () => {
  const pathname = usePathname();
  const isFTWZ = pathname === "/ftwz-services";

  return (
    <footer className="bg-brand-navy text-primary-foreground/80 pt-16 pb-8">
      <div className="container">
        {/* Top row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Image
              src="https://eenumepuujkrnartejsh.supabase.co/storage/v1/object/sign/BRAND%20ASSETS/001.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMDU2NTM0My1hNjA2LTRkNTItOTRjNC00OTZiMmQ3YTNmZDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCUkFORCBBU1NFVFMvMDAxLnBuZyIsImlhdCI6MTc3NTU0OTQwNCwiZXhwIjoxODM4NjIxNDA0fQ.jgeDhDostzqz1pdHBSMMSoRBb_eG-G2MLkJY6MVCR_w"
              alt="Astromar Logistics"
              width={160}
              height={48}
              className="h-10 w-auto object-contain mb-4"
              unoptimized
            />
            <p className="text-sm leading-relaxed mb-6">
              ASTROMAR LOGISTICS PVT LTD – India's leading FTWZ provider offering duty-free warehousing, customs clearance, and integrated logistics solutions.
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a href="tel:+919940211014" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Phone size={16} className="text-brand-orange shrink-0" />
                <span>+91 99402 11014</span>
              </a>
              <a href="mailto:sales@astromarfreezone.com" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Mail size={16} className="text-brand-orange shrink-0" />
                <span>sales@astromarfreezone.com</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-brand-orange shrink-0 mt-0.5" />
                <span>Chennai, Tamil Nadu</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4 text-sm uppercase tracking-wider">
              Services
            </h4>
            <nav className="flex flex-col gap-2 text-sm">
              {services.map((s) => (
                <Link key={s.label} href={s.href} className="hover:text-primary-foreground transition-colors">
                  {s.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <nav className="flex flex-col gap-2 text-sm">
              {companyLinks.map((l) => (
                <a key={l.label} href={l.href} className="hover:text-primary-foreground transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4 text-sm uppercase tracking-wider">
              Resources
            </h4>
            <nav className="flex flex-col gap-2 text-sm">
              {resourceLinks.map((l) => (
                <Link key={l.label} href={l.href} className="hover:text-primary-foreground transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Astromar Logistics Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
