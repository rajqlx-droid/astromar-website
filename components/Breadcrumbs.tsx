import { Fragment } from "react";
import Link from "next/link";

type Crumb = { name: string; href?: string };

// Hero breadcrumb trail — same markup and styling as the location pages' breadcrumb.
// truncateLast keeps the trail on one line and ellipsizes the current-page item (e.g. long blog titles).
export default function Breadcrumbs({ items, truncateLast = false }: { items: Crumb[]; truncateLast?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={truncateLast ? "flex items-center min-w-0 text-xs text-white/60 mb-6" : "text-xs text-white/60 mb-6"}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const keep = truncateLast ? "shrink-0 whitespace-nowrap " : "";
        return (
          <Fragment key={item.name}>
            {isLast ? (
              <span className={truncateLast ? "text-[#F97316] truncate min-w-0" : "text-[#F97316]"} aria-current="page" title={truncateLast ? item.name : undefined}>{item.name}</span>
            ) : item.href ? (
              <span className={`${keep}hover:text-white/80`}><Link href={item.href}>{item.name}</Link></span>
            ) : (
              <span className={truncateLast ? keep.trim() : undefined}>{item.name}</span>
            )}
            {!isLast && <span className={`${keep}mx-2`}>›</span>}
          </Fragment>
        );
      })}
    </nav>
  );
}
