import type { Metadata } from "next";

// Private admin area. Protected by Supabase Auth in proxy.ts (ADMIN_EMAIL only), and every page
// and route re-checks the session itself. Disallowed in public/robots.txt; noindex here as a
// second safeguard.
export const metadata: Metadata = {
  title: "Admin | Astromar Logistics",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
