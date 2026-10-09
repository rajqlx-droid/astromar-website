import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { isAdminEnabled, isDevBypass } from "@/lib/seo-audit/auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin login | Astromar",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (!isAdminEnabled()) notFound();
  if (isDevBypass()) redirect("/admin/seo");
  const { error } = await searchParams;
  return (
    <div className="min-h-screen bg-[#F3F5F9]">
      <div className="mx-auto flex max-w-7xl justify-center px-6 py-14 md:px-12 lg:px-16">
        <LoginForm initialError={error === "forbidden" ? "That account is not allowed to use the admin area." : null} />
      </div>
    </div>
  );
}
