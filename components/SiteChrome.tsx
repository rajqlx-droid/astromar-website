"use client";

import { usePathname } from "next/navigation";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname === "/c-dv-7k4q9x2m") return null;
  return <>{children}</>;
}
