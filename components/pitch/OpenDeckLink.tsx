"use client";

import Link from "next/link";

// Opens a deck and asks the browser for true full screen in the same click
// (browsers only allow full screen right after a click).
export default function OpenDeckLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        try {
          document.documentElement.requestFullscreen?.().catch(() => {});
        } catch {
          /* full screen not available */
        }
      }}
    >
      {children}
    </Link>
  );
}
