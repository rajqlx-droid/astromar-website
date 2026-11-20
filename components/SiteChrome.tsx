"use client";

import { usePathname } from "next/navigation";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/pitch") || pathname === "/c-khpfnutqi3nt3rsfmkx9z33py1eu") return null;
  return <>{children}</>;
}
