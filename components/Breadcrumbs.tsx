import { Fragment } from "react";
import Link from "next/link";

type Crumb = { name: string; href?: string };

// Hero breadcrumb trail — same markup and styling as the location pages' breadcrumb.
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-white/60 mb-6">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <Fragment key={item.name}>
            {isLast ? (
              <span className="text-[#F97316]" aria-current="page">{item.name}</span>
            ) : item.href ? (
              <span className="hover:text-white/80"><Link href={item.href}>{item.name}</Link></span>
            ) : (
              <span>{item.name}</span>
            )}
            {!isLast && <span className="mx-2">›</span>}
          </Fragment>
        );
      })}
    </nav>
  );
}
