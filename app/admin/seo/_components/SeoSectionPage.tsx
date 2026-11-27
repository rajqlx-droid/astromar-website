import { notFound, redirect } from "next/navigation";
import AdminPage from "@/app/admin/_components/AdminPage";
import type { AdminSection } from "@/app/admin/_components/AdminMenu";
import { resolveAccess } from "@/lib/seo-audit/access";
import { isAdminEnabled, isScanEnabled } from "@/lib/seo-audit/auth";
import { listScans, loadMarks, loadScan } from "@/lib/seo-audit/storage";
import type { ExpectedMark, IgnoredFlag, ScanListItem, ScanResult } from "@/lib/seo-audit/types";
import SeoAuditClient, { type Section } from "./SeoAuditClient";

// Shared by /admin/page-seo, /admin/technical-seo and /admin/image-seo.
// Reads saved scans from Supabase on each request. Never scans on load.
export default async function SeoSectionPage({
  section,
  active,
  basePath,
  searchParams,
}: {
  section: Section;
  active: AdminSection;
  basePath: string;
  searchParams: Promise<{ scan?: string }>;
}) {
  if (!isAdminEnabled()) notFound();
  const access = await resolveAccess();
  if (!access.allowed) redirect("/admin/login");
  const supabase = access.client;

  const { scan: scanParam } = await searchParams;
  let scans: ScanListItem[] = [];
  let result: ScanResult | null = null;
  let expected: ExpectedMark[] = [];
  let ignored: IgnoredFlag[] = [];
  let loadError: string | null = null;

  // No Supabase client: shown as the "Results not saved" pill, not as an error.
  if (supabase) {
    try {
      scans = await listScans(supabase);
      const wanted = scans.find((s) => s.id === scanParam)?.id ?? scans[0]?.id;
      if (wanted) result = await loadScan(supabase, wanted);
      ({ expected, ignored } = await loadMarks(supabase));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      loadError = /relation .* does not exist|schema cache|Could not find the table/i.test(msg)
        ? "The SEO audit tables do not exist yet. Run supabase/seo-audit.sql in the Supabase SQL editor."
        : `Could not load saved scans: ${msg}`;
    }
  }

  return (
    <AdminPage active={active} showSignOut={!access.bypass} email={access.email}>
      <SeoAuditClient
        scans={scans}
        result={result}
        expected={expected}
        ignored={ignored}
        scanEnabled={isScanEnabled()}
        loadError={loadError}
        section={section}
        basePath={basePath}
        devBypass={access.bypass}
        supabaseReady={!!supabase}
      />
    </AdminPage>
  );
}
