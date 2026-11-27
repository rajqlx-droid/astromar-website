import type { Metadata } from "next";
import SeoSectionPage from "@/app/admin/seo/_components/SeoSectionPage";

export const metadata: Metadata = {
  title: "Image SEO | Astromar Admin",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const dynamic = "force-dynamic";

export default function ImageSeoPage({ searchParams }: { searchParams: Promise<{ scan?: string }> }) {
  return <SeoSectionPage section="images" active="image-seo" basePath="/admin/image-seo" searchParams={searchParams} />;
}
