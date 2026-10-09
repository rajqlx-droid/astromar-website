// Shared types for the private SEO audit (/admin/seo). Safe to import on client and server.

export type BaseKey = "local" | "live";
export type PageGroup = "Core" | "Service" | "Locations" | "Blogs";
export type Severity = "fix" | "check" | "good";

export interface AuditIssue {
  /** Stable code, used by "Ignore this flag". */
  code: string;
  severity: Severity;
  text: string;
}

export interface PageImage {
  src: string;
  resolvedSrc: string;
  alt: string | null;
  width: string | null;
  height: string | null;
  loading: string | null;
  fill: boolean;
}

export interface PageAudit {
  path: string;
  url: string;
  group: PageGroup;
  status: number | null;
  error: string | null;
  title: string;
  description: string | null;
  canonical: string | null;
  canonicalState: "matches" | "mismatch" | "missing";
  robots: string | null;
  noindex: boolean;
  og: Record<string, string>;
  twitter: Record<string, string>;
  h1: string[];
  h2: string[];
  wordCount: number;
  jsonLdTypes: string[];
  images: PageImage[];
  keyword: string;
  keywordIn: { title: boolean; description: boolean; h1: boolean; url: boolean };
  issues: AuditIssue[];
  hasProblem: boolean;
  wording: WordingMatch[];
}

export interface ImageFlag {
  severity: Severity;
  text: string;
}

export interface ImageAudit {
  key: string;
  src: string;
  fileName: string;
  external: boolean;
  alt: string | null;
  foundOn: string[];
  sizeBytes: number | null;
  sizeNote: string | null;
  flags: ImageFlag[];
  hasProblem: boolean;
}

export interface WordingMatch {
  phrase: string;
  note?: string;
  path: string;
  snippet: string;
}

export type RedirectResultKnown =
  | "Redirects correctly"
  | "Broken: 404"
  | "Broken target"
  | "Redirect chain"
  | "Live, not in sitemap"
  | "Live, in sitemap"
  | "Error";

// Other broken statuses render as "Broken: <code>" / "Broken target: <code>".
export type RedirectResult = RedirectResultKnown | `Broken: ${number}` | `Broken target: ${number}`;

export interface RedirectCheck {
  path: string;
  status: number | null;
  location: string | null;
  hops: { url: string; status: number | null }[];
  finalStatus: number | null;
  result: RedirectResult;
  severity: Severity;
  note: string | null;
}

export interface RobotsInfo {
  url: string;
  status: number | null;
  content: string | null;
  sitemapLines: string[];
  referencesSitemap: boolean;
  disallowsAdmin: boolean;
  disallowsApi: boolean;
  error: string | null;
}

export interface SitemapInfo {
  url: string;
  source: "sitemap.xml" | "app/sitemap.ts";
  fetchError: string | null;
  sitemapCount: number;
  routeCount: number;
  missingFromSitemap: string[];
  sitemapWithoutRoute: string[];
  unresolvedRoutes: string[];
}

export interface ScanResult {
  /** Supabase row id; null when the scan was not saved. */
  id: string | null;
  /** False when /blogs/<slug> posts were skipped; those pages are absent from `pages`. */
  includeBlogPosts: boolean;
  base: BaseKey;
  baseUrl: string;
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  robots: RobotsInfo;
  sitemap: SitemapInfo;
  pages: PageAudit[];
  images: ImageAudit[];
  wording: WordingMatch[];
  redirects: RedirectCheck[];
  summary: {
    pagesScanned: number;
    pagesWithIssues: number;
    imagesMissingAlt: number;
    imagesEmptyAlt: number;
    duplicateTitles: number;
    wordingMatches: number;
  };
}

/** One image on one page, as stored in seo_images.data. */
export interface ImageOccurrence {
  src: string;
  fileName: string;
  external: boolean;
  alt: string | null;
  sizeBytes: number | null;
  sizeNote: string | null;
  flags: ImageFlag[];
}

export interface ImageRow {
  pageUrl: string;
  data: ImageOccurrence;
}

export interface ScanListItem {
  id: string;
  baseUrl: string;
  startedAt: string;
  finishedAt: string;
  pagesScanned: number;
}

export interface IgnoredFlag {
  url: string;
  flag: string;
}

export interface ExpectedMark {
  url: string;
  reason: string | null;
}

export type ScanEvent =
  | { type: "progress"; phase: string; done: number; total: number; label?: string }
  | { type: "result"; data: ScanResult; saved: boolean; saveError: string | null }
  | { type: "error"; message: string };
