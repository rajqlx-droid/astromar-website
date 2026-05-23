import type { MetadataRoute } from "next";
import { ftwzLocationDetails } from "@/data/ftwzLocations";
import { blogPosts } from "@/data/blogPosts";

const BASE_URL = "https://astromarfreezone.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static URLs — explicitly listed with priorities + change frequencies
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about-us`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact-us`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/free-trade-zone`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/free-trade-zone-services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/freight-intelligence`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blogs`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/coastal-shipping-free-trade-zone`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/free-trade-zone-services/ocean-freight`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/free-trade-zone-services/air-freight`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/free-trade-zone-services/custom-clearance`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/free-trade-zone-services/warehousing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/free-trade-zone-services/supply-chain`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/free-trade-zone-services/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/ftwz-faqs`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/ftwz-benefits-india`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/freight-forwarding-logistics-chennai`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Dynamic location URLs — exclude the corporate office (chennai-hq)
  const locationRoutes: MetadataRoute.Sitemap = ftwzLocationDetails
    .filter((loc) => loc.type !== "Registered Office")
    .map((loc) => ({
      url: `${BASE_URL}/locations/${loc.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  // Dynamic blog article URLs — only real blog articles (those without externalUrl)
  // Entries with externalUrl are teaser cards pointing to top-level pages already in staticRoutes
  const blogRoutes: MetadataRoute.Sitemap = blogPosts
    .filter((post) => !post.externalUrl)
    .map((post) => ({
      url: `${BASE_URL}/blogs/${post.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...locationRoutes, ...blogRoutes];
}
