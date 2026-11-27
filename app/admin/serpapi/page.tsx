import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import AdminPage from "@/app/admin/_components/AdminPage";
import { getAccountCached } from "@/lib/rankings/serpapi";
import { friendlyDbError, listSaved } from "@/lib/rankings/storage";
import type { QuotaInfo, SavedKeyword } from "@/lib/rankings/types";
import { resolveAccess } from "@/lib/seo-audit/access";
import { isAdminEnabled } from "@/lib/seo-audit/auth";
import SerpClient from "./_components/SerpClient";

export const metadata: Metadata = {
  title: "SerpApi tracking | Astromar Admin",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const dynamic = "force-dynamic";

export default async function SerpApiPage() {
  if (!isAdminEnabled()) notFound();
  const access = await resolveAccess();
  if (!access.allowed) redirect("/admin/login");

  let quota: QuotaInfo;
  try {
    const a = await getAccountCached();
    quota = { remaining: a.remaining, limit: a.limit };
  } catch (err) {
    quota = { remaining: null, limit: null, error: err instanceof Error ? err.message : "Could not read the SerpApi balance." };
  }

  let saved: SavedKeyword[] = [];
  let dbMessage: string | null = null;
  if (access.client) {
    try {
      saved = await listSaved(access.client);
    } catch (err) {
      dbMessage = friendlyDbError(err);
    }
  } else {
    dbMessage = "Needs Supabase: add the Supabase variables to .env.local to see saved keywords and recent checks.";
  }

  return (
    <AdminPage active="serpapi" showSignOut={!access.bypass} email={access.email}>
      <main className="mx-auto w-full max-w-7xl px-6 py-14 md:px-12 lg:px-16">
        <h1 className="text-3xl font-bold text-[#1B3A6B]">SerpApi tracking</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">See who ranks on Google for a keyword. Each ten results use one SerpApi search, and a check is refused if too few searches are left.</p>
        <SerpClient initialQuota={quota} initialSaved={saved} dbMessage={dbMessage} />
      </main>
    </AdminPage>
  );
}
