"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const tabs = [
  { label: "Slides", href: "/pitch/slides" },
  { label: "Videos", href: "/pitch/videos" },
  { label: "Documents", href: "/pitch/documents" },
];

export default function PitchNav() {
  const pathname = usePathname() ?? "";
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-4 px-6 md:px-12 lg:px-16">
        <Link href="/pitch" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Astromar Logistics" width={133} height={40} className="h-9 w-auto object-contain" priority />
          <span className="hidden border-l border-border pl-3 text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground sm:block">
            Pitch room
          </span>
        </Link>

        <nav className="relative flex items-center rounded-full border border-border bg-secondary p-1" aria-label="Pitch sections">
          {tabs.map((t) => {
            const active = pathname.startsWith(t.href);
            return (
              <Link
                key={t.href}
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={
                  "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors md:px-5 " +
                  (active ? "text-white" : "text-foreground/70 hover:text-foreground")
                }
              >
                {active && (
                  <motion.span
                    layoutId="pitch-tab"
                    className="absolute inset-0 rounded-full bg-brand-navy shadow-md"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </Link>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
