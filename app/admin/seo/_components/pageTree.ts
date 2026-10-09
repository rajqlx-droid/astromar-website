import type { AuditIssue, PageAudit } from "@/lib/seo-audit/types";

/** A page with ignored flags already separated out of `issues`. */
export type ViewPage = PageAudit & { ignoredIssues: AuditIssue[] };

export interface TreeRow {
  page: ViewPage;
  /** Readable page name shown above the URL. */
  name: string;
  /** Extra grey line (title of an old saved blog post). */
  subtitle?: string;
}

export type MenuItem =
  | { type: "page"; row: TreeRow }
  | { type: "group"; id: string; name: string; rows: TreeRow[] };

const NAMES: Record<string, string> = {
  "/": "Home",
  "/about-us": "About us",
  "/free-trade-zone-services": "Services overview",
  "/free-trade-zone": "Free trade zone",
  "/free-trade-zone-services/coastal-shipping": "Coastal shipping",
  "/free-trade-zone-services/ocean-freight": "Ocean freight",
  "/free-trade-zone-services/air-freight": "Air freight",
  "/free-trade-zone-services/supply-chain-management": "Supply chain management",
  "/free-trade-zone-services/customs-clearance": "Customs clearance",
  "/free-trade-zone-services/warehousing": "Warehousing",
  "/free-trade-zone-services/project-cargo": "Project cargo",
  "/ftwz-faqs": "FTWZ FAQs",
  "/ftwz-benefits-india": "FTWZ benefits in India",
  "/freight-forwarding-logistics-chennai": "Freight forwarding Chennai",
  "/locations": "Locations index",
  "/locations/kochi": "Kochi",
  "/locations/vizag": "Vizag",
  "/locations/mumbai-panvel": "Mumbai Panvel",
  "/locations/mumbai-jnpa": "Mumbai JNPA",
  "/locations/chennai-sriperumbudur": "Chennai Sriperumbudur",
  "/locations/chennai-vallur": "Chennai Vallur",
  "/locations/delhi-khurja": "Delhi Khurja",
  "/locations/bengaluru": "Bengaluru",
  "/locations/dahej": "Dahej",
  "/locations/mundra": "Mundra",
  "/contact-us": "Contact us",
  "/blogs": "Blog index",
};

/** Name for a path; unknown paths get the last segment in title case. */
export function pageName(path: string): string {
  if (NAMES[path]) return NAMES[path];
  const slug = path.split("/").filter(Boolean).pop() ?? path;
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const under = (path: string, root: string) => path.startsWith(root + "/");
const byPath = (a: TreeRow, b: TreeRow) => a.page.path.localeCompare(b.page.path);

/**
 * Top-level menu: Home, About us, Services, Locations, Contact us, Blogs, Other pages.
 * Blogs is a single page (the blog index) unless an older saved scan also holds /blogs/<slug> posts.
 */
export function buildMenu(pages: ViewPage[]): MenuItem[] {
  const byPathMap = new Map(pages.map((p) => [p.path, p]));
  const used = new Set<string>();
  const row = (path: string, name?: string): TreeRow[] => {
    const page = byPathMap.get(path);
    if (!page || used.has(path)) return [];
    used.add(path);
    return [{ page, name: name ?? pageName(path) }];
  };
  const rowsUnder = (root: string): TreeRow[] => {
    const rows = pages
      .filter((p) => under(p.path, root) && !used.has(p.path))
      .map((page): TreeRow => ({ page, name: pageName(page.path) }))
      .sort(byPath);
    rows.forEach((r) => used.add(r.page.path));
    return rows;
  };

  const home = row("/", "Home");
  const about = row("/about-us", "About us");
  const services = [...row("/free-trade-zone-services"), ...row("/free-trade-zone"), ...rowsUnder("/free-trade-zone-services")];
  const locations = [...row("/locations"), ...rowsUnder("/locations")];
  const contact = row("/contact-us", "Contact us");
  const blogIndex = row("/blogs");
  const blogPosts = pages
    .filter((p) => under(p.path, "/blogs") && !used.has(p.path))
    .map((page): TreeRow => ({ page, name: page.path.split("/").pop() ?? pageName(page.path), subtitle: page.title || "(no title)" }))
    .sort(byPath);
  blogPosts.forEach((r) => used.add(r.page.path));
  const other = pages
    .filter((p) => !used.has(p.path))
    .map((page): TreeRow => ({ page, name: pageName(page.path) }))
    .sort(byPath);

  const items: MenuItem[] = [];
  const single = (rows: TreeRow[]) => rows.forEach((r) => items.push({ type: "page", row: r }));
  const group = (id: string, name: string, rows: TreeRow[]) => {
    if (rows.length) items.push({ type: "group", id, name, rows });
  };

  single(home);
  single(about);
  group("services", "Services", services);
  group("locations", "Locations", locations);
  single(contact);
  if (blogPosts.length) group("blogs", "Blogs", [...blogIndex, ...blogPosts]);
  else single(blogIndex.map((r) => ({ ...r, name: "Blogs" })));
  group("other", "Other pages", other);
  return items;
}

export function issueCount(page: ViewPage): number {
  return page.hasProblem ? page.issues.filter((i) => i.severity !== "good").length : 0;
}
