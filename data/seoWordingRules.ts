/**
 * Phrases the private SEO audit (/admin/seo) looks for in page text.
 * Review only: a match is not automatically wrong. Add, remove or annotate
 * phrases here. Matching is case-insensitive and will not match when the
 * phrase is glued to a preceding letter or digit (so "47%" does not match "147%").
 */
export interface SeoWordingRule {
  phrase: string;
  /** Optional reminder shown next to each match. */
  note?: string;
}

export const seoWordingRules: SeoWordingRule[] = [
  { phrase: "Zero Duty" },
  { phrase: "100% Duty Free" },
  { phrase: "0% GST" },
  { phrase: "indefinite" },
  { phrase: "unlimited" },
  { phrase: "manufacturing" },
  { phrase: "15+ years" },
  { phrase: "500+" },
  { phrase: "30% cheaper" },
  { phrase: "47%" },
  { phrase: "income tax exemption" },
];
