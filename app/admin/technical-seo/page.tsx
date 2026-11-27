import type { Metadata } from "next";
import SeoSectionPage from "@/app/admin/seo/_components/SeoSectionPage";

export const metadata: Metadata = {
  title: "Technical SEO | Astromar Admin",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const dynamic = "force-dynamic";

export default function TechnicalSeoPage({ searchParams }: { searchParams: Promise<{ scan?: string }> }) {
  return <SeoSectionPage section="technical" active="technical-seo" basePath="/admin/technical-seo" searchParams={searchParams} />;
}
