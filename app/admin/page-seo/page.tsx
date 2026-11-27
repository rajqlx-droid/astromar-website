import type { Metadata } from "next";
import SeoSectionPage from "@/app/admin/seo/_components/SeoSectionPage";

export const metadata: Metadata = {
  title: "Page SEO | Astromar Admin",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const dynamic = "force-dynamic";

export default function PageSeoPage({ searchParams }: { searchParams: Promise<{ scan?: string }> }) {
  return <SeoSectionPage section="pages" active="page-seo" basePath="/admin/page-seo" searchParams={searchParams} />;
}
