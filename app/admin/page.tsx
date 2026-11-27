import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { resolveAccess } from "@/lib/seo-audit/access";
import { isAdminEnabled } from "@/lib/seo-audit/auth";
import AdminPage from "./_components/AdminPage";
import DashboardBanner from "./_components/DashboardBanner";
import { IconGsc, IconImageSeo, IconPageSeo, IconSerp, IconTechnicalSeo } from "./_components/DashboardIcons";

export const metadata: Metadata = {
  title: "Admin dashboard | Astromar",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const dynamic = "force-dynamic";

interface TileData {
  href: string;
  name: string;
  note: string;
  from: string;
  to: string;
  icon: React.ReactNode;
}

const WEBSITE: TileData[] = [
  { href: "/admin/page-seo", name: "Page SEO", note: "Titles, H1, keywords", from: "#3b82f6", to: "#1d4ed8", icon: <IconPageSeo /> },
  { href: "/admin/technical-seo", name: "Technical SEO", note: "Redirects, links, sitemap", from: "#14b8a6", to: "#0f766e", icon: <IconTechnicalSeo /> },
  { href: "/admin/image-seo", name: "Image SEO", note: "Alt text, size", from: "#a78bfa", to: "#6d28d9", icon: <IconImageSeo /> },
];

const RANKINGS: TileData[] = [
  { href: "/admin/gsc", name: "GSC tracking", note: "Your rankings, free", from: "#fb923c", to: "#ea580c", icon: <IconGsc /> },
  { href: "/admin/serpapi", name: "SerpApi tracking", note: "Who ranks above you", from: "#34d399", to: "#059669", icon: <IconSerp /> },
];

function Tile({ tile }: { tile: TileData }) {
  return (
    <Link href={tile.href} className="group flex w-[150px] flex-col items-center text-center outline-none">
      <span
        className="flex h-[108px] w-[108px] items-center justify-center rounded-[28px] shadow-[0_10px_22px_-8px_rgba(20,44,82,0.4)] transition duration-200 group-hover:-translate-y-[5px] group-hover:shadow-[0_20px_32px_-10px_rgba(20,44,82,0.5)] group-focus-visible:ring-4 group-focus-visible:ring-[#1B3A6B]/40 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
        style={{ background: `linear-gradient(145deg, ${tile.from}, ${tile.to})` }}
      >
        {tile.icon}
      </span>
      <span className="mt-4 text-[15px] font-bold text-[#1B3A6B]">{tile.name}</span>
      <span className="mt-0.5 text-[13px] text-slate-500">{tile.note}</span>
    </Link>
  );
}

function Group({ id, label, tiles }: { id: string; label: string; tiles: TileData[] }) {
  return (
    <section aria-labelledby={id} className="flex flex-col items-center">
      <h2 id={id} className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </h2>
      <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-8">
        {tiles.map((t) => (
          <Tile key={t.href} tile={t} />
        ))}
      </div>
    </section>
  );
}

export default async function AdminDashboardPage() {
  if (!isAdminEnabled()) notFound();
  const access = await resolveAccess();
  if (!access.allowed) redirect("/admin/login");

  return (
    <AdminPage active="dashboard" showSignOut={!access.bypass} email={access.email}>
      <DashboardBanner />
      <main className="flex flex-1 items-center justify-center px-6 py-10 md:px-12 lg:px-16">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-24">
          <Group id="group-website" label="Website SEO" tiles={WEBSITE} />
          <Group id="group-rankings" label="Google rankings" tiles={RANKINGS} />
        </div>
      </main>
    </AdminPage>
  );
}
