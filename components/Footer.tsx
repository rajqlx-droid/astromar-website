"use client"
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/free-trade-zone-services" },
  { label: "FTWZ", href: "/free-trade-zone" },
  { label: "Blog", href: "/blogs" },
  { label: "Tools", href: "/freight-intelligence" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "FTWZ Guide", href: "/free-trade-zone" },
];

const serviceLinks = [
  { label: "FTWZ", href: "/free-trade-zone" },
  { label: "Coastal Shipping", href: "/coastal-shipping-free-trade-zone" },
  { label: "Ocean Freight", href: "/free-trade-zone-services/ocean-freight" },
  { label: "Air Freight", href: "/free-trade-zone-services/air-freight" },
  { label: "Supply Chain", href: "/free-trade-zone-services/supply-chain" },
  { label: "Custom Clearance", href: "/free-trade-zone-services/custom-clearance" },
  { label: "Warehousing", href: "/free-trade-zone-services/warehousing" },
  { label: "Projects", href: "/free-trade-zone-services/projects" },
];

const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white/80 pt-16 pb-4 md:pt-20 md:pb-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1.2fr_1.4fr] gap-10 mb-16">

          {/* Col 1: Logo + Description */}
          <div>
            <div className="inline-flex items-center mb-4">
              <div className="bg-white rounded-lg p-2 inline-flex items-center gap-2">
                <Image
                  src="https://eenumepuujkrnartejsh.supabase.co/storage/v1/object/sign/BRAND%20ASSETS/001.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hMDU2NTM0My1hNjA2LTRkNTItOTRjNC00OTZiMmQ3YTNmZDMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJCUkFORCBBU1NFVFMvMDAxLnBuZyIsImlhdCI6MTc3NTU0OTQwNCwiZXhwIjoxODM4NjIxNDA0fQ.jgeDhDostzqz1pdHBSMMSoRBb_eG-G2MLkJY6MVCR_w"
                  alt="Astromar Logistics"
                  width={120}
                  height={36}
                  className="h-8 w-auto object-contain"
                  unoptimized
                />
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/65">
              ASTROMAR LOGISTICS PVT LTD – India's leading FTWZ operator offering duty-free storage, deferred customs duty, and GST benefits across 8+ strategic locations. Trusted by 500+ clients since 2017 for seamless end-to-end logistics.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider pb-2 border-b border-white/10">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2 text-sm">
              {quickLinks.map((l) => (
                <Link key={l.label} href={l.href} className="text-white/65 hover:text-[#F97316] transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Our Services */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider pb-2 border-b border-white/10">
              Our Services
            </h4>
            <nav className="flex flex-col gap-2 text-sm">
              {serviceLinks.map((s) => (
                <Link key={s.label} href={s.href} className="text-white/65 hover:text-[#F97316] transition-colors">
                  {s.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider pb-2 border-b border-white/10">
              Contact Info
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <a href="mailto:sales@astromarfreezone.com" className="flex items-start gap-2 hover:text-white transition-colors">
                <Mail size={16} className="text-[#F97316] shrink-0 mt-0.5" />
                <span className="text-white/65">sales@astromarfreezone.com</span>
              </a>
              <a href="tel:+919940211014" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={16} className="text-[#F97316] shrink-0" />
                <span className="text-white/65">+91 99402 11014</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-[#F97316] shrink-0 mt-0.5" />
                <span className="text-white/65">No. 922, 1st Floor, H-Block, 17th Main Road, Anna Nagar, Chennai - 600 040</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 pb-1 text-center text-sm text-white/40">
          <p>© {new Date().getFullYear()} Astromar Logistics Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

