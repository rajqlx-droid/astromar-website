import { blogPosts } from "@/data/blogPosts";

/**
 * Focus keyword per route, used by the private SEO audit at /admin/seo.
 * Read-only reference: nothing on the public site reads this file.
 *
 * Core, service and location keywords are the FIRST keyword from each page's
 * existing metadata `keywords`. Edit freely. An empty string means "not set".
 * Blog keywords come from `keywords[0]` in data/blogPosts.ts unless overridden
 * in `seoKeywordOverrides` below.
 */
const pageKeywords: Record<string, string> = {
  // Core
  "/": "free trade zone in India",
  "/about-us": "bonded storage in India",
  "/contact-us": "astromar logistics contact",
  "/free-trade-zone": "FTWZ in India",
  "/freight-intelligence": "freight calculator india",
  "/ftwz-faqs": "FTWZ FAQs",
  "/ftwz-benefits-india": "FTWZ benefits India",
  "/freight-forwarding-logistics-chennai": "freight forwarding Chennai",
  "/blogs": "",

  // Service
  "/free-trade-zone-services": "free trade warehousing zone solutions",
  "/free-trade-zone-services/coastal-shipping": "coastal shipping in India",
  "/free-trade-zone-services/ocean-freight": "ocean freight services in India",
  "/free-trade-zone-services/air-freight": "air freight services in India",
  "/free-trade-zone-services/customs-clearance": "customs clearance services in India",
  "/free-trade-zone-services/warehousing": "warehousing services in India",
  "/free-trade-zone-services/supply-chain-management": "supply chain management in India",
  "/free-trade-zone-services/project-cargo": "heavy lift logistics",

  // Locations
  "/locations": "",
  "/locations/kochi": "ftwz in kochi",
  "/locations/vizag": "ftwz in vizag",
  "/locations/mumbai-panvel": "free trade warehouse zone in mumbai",
  "/locations/mumbai-jnpa": "ftwz in mumbai",
  "/locations/chennai-sriperumbudur": "chennai free trade zone",
  "/locations/chennai-vallur": "free trade warehouse in chennai",
  "/locations/delhi-khurja": "ftwz in delhi",
  "/locations/bengaluru": "ftwz in bangalore",
  "/locations/dahej": "ftwz in dahej",
  "/locations/mundra": "ftwz mundra",
};

/** Manual overrides for any route, including blogs. Takes priority. */
export const seoKeywordOverrides: Record<string, string> = {};

const blogKeywords: Record<string, string> = Object.fromEntries(
  blogPosts
    .filter((post) => !post.externalUrl)
    .map((post) => [`/blogs/${post.slug}`, post.keywords?.[0] ?? ""]),
);

export const seoKeywords: Record<string, string> = {
  ...blogKeywords,
  ...pageKeywords,
  ...seoKeywordOverrides,
};

export function getFocusKeyword(path: string): string {
  return seoKeywords[path] ?? "";
}
