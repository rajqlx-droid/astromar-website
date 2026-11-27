import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import AdminPage from "@/app/admin/_components/AdminPage";
import { friendlyDbError, listSaved, recentChecks } from "@/lib/rankings/storage";
import type { RecentCheck, SavedKeyword } from "@/lib/rankings/types";
import { resolveAccess } from "@/lib/seo-audit/access";
import { isAdminEnabled } from "@/lib/seo-audit/auth";
import GscClient from "./_components/GscClient";

export const metadata: Metadata = {
  title: "GSC tracking | Astromar Admin",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const dynamic = "force-dynamic";

export default async function GscPage() {
  if (!isAdminEnabled()) notFound();
  const access = await resolveAccess();
  if (!access.allowed) redirect("/admin/login");

  let saved: SavedKeyword[] = [];
  let recent: RecentCheck[] = [];
  let dbMessage: string | null = null;
  if (access.client) {
    try {
      [saved, recent] = await Promise.all([listSaved(access.client), recentChecks(access.client)]);
    } catch (err) {
      dbMessage = friendlyDbError(err);
    }
  } else {
    dbMessage = "Needs Supabase: add the Supabase variables to .env.local to save keywords and see recent checks.";
  }

  return (
    <AdminPage active="gsc" showSignOut={!access.bypass} email={access.email}>
      <main className="mx-auto w-full max-w-7xl px-6 py-14 md:px-12 lg:px-16">
        <h1 className="text-3xl font-bold text-[#1B3A6B]">GSC tracking</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">See how a keyword performs for astromarfreezone.com in Google Search Console: position, impressions, clicks and the page that ranked.</p>
        <GscClient initialSaved={saved} initialRecent={recent} dbMessage={dbMessage} />
      </main>
    </AdminPage>
  );
}
