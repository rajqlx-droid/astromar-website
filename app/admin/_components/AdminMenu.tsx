import Link from "next/link";
import SignOutButton from "./SignOutButton";

export type AdminSection = "dashboard" | "page-seo" | "technical-seo" | "image-seo" | "gsc" | "serpapi";

const LINKS: { key: string; label: string; href: string }[] = [
  { key: "dashboard", label: "Dashboard", href: "/admin" },
  { key: "page-seo", label: "Page SEO", href: "/admin/page-seo" },
  { key: "technical-seo", label: "Technical SEO", href: "/admin/technical-seo" },
  { key: "image-seo", label: "Image SEO", href: "/admin/image-seo" },
  { key: "gsc", label: "GSC tracking", href: "/admin/gsc" },
  { key: "serpapi", label: "SerpApi tracking", href: "/admin/serpapi" },
];

// Shared top bar for every admin page except login. Not used on the login page.
export default function AdminMenu({ active, showSignOut, email }: { active: AdminSection; showSignOut: boolean; email?: string }) {
  return (
    <header className="relative z-20 bg-[#1B3A6B] text-white shadow-[0_2px_0_rgba(255,255,255,0.12)]">
      <div className="flex flex-wrap items-center justify-between gap-x-4 px-4 py-2 md:h-[54px] md:flex-nowrap md:px-6 md:py-0">
        <Link href="/admin" className="text-lg font-bold tracking-tight">
          Astromar<span className="text-[#F98F1D]">.</span> Admin
        </Link>
        <nav aria-label="Admin" className="order-3 -mx-1 w-full overflow-x-auto pt-2 md:order-none md:mx-0 md:w-auto md:pt-0">
          <ul className="flex items-center gap-1 whitespace-nowrap">
            {LINKS.map((l) => (
              <li key={l.key}>
                <Link
                  href={l.href}
                  aria-current={l.key === active ? "page" : undefined}
                  className={`block rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/10 ${l.key === active ? "bg-white/20 text-white" : "text-[#dbe6f7]"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex min-w-[88px] justify-end">{showSignOut ? <SignOutButton title={email} /> : null}</div>
      </div>
    </header>
  );
}
