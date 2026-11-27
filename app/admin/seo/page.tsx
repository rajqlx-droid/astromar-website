import { redirect } from "next/navigation";

// The old single SEO screen is now three pages. Keep old links and ?scan= values working.
export const dynamic = "force-dynamic";

export default async function SeoRedirectPage({ searchParams }: { searchParams: Promise<{ scan?: string }> }) {
  const { scan } = await searchParams;
  redirect(scan ? `/admin/page-seo?scan=${encodeURIComponent(scan)}` : "/admin/page-seo");
}
