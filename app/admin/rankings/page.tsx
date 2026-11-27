import { notFound, redirect } from "next/navigation";
import { resolveAccess } from "@/lib/seo-audit/access";
import { isAdminEnabled } from "@/lib/seo-audit/auth";

// The tracker is now split into /admin/gsc and /admin/serpapi. The old address goes to the GSC page.
export const dynamic = "force-dynamic";

export default async function RankingsRedirect() {
  if (!isAdminEnabled()) notFound();
  const access = await resolveAccess();
  if (!access.allowed) redirect("/admin/login");
  redirect("/admin/gsc");
}
