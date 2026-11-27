// Shared types and pure helpers for the Google Ranking Tracker (/admin/rankings).
// No server-only imports here: safe to use in client and server code.

export const SITE_DOMAIN = "astromarfreezone.com";
export const GSC_PROPERTY = "https://www.astromarfreezone.com/";

export const LOCATIONS = ["India", "Chennai, Tamil Nadu, India", "Mumbai, Maharashtra, India"] as const;
export type Location = (typeof LOCATIONS)[number];

export type Depth = 1 | 2 | 3;
export const DEPTHS: { value: Depth; label: string }[] = [
  { value: 1, label: "Top 10" },
  { value: 2, label: "Top 20" },
  { value: 3, label: "Top 30" },
];

/** The weekly job never lets the SerpApi balance fall below this many searches. */
export const SERP_RESERVE = 20;

export function isLocation(v: unknown): v is Location {
  return typeof v === "string" && (LOCATIONS as readonly string[]).includes(v);
}

export function isDepth(v: unknown): v is Depth {
  return v === 1 || v === 2 || v === 3;
}

const CONTROL_CHARS = /[\u0000-\u001F\u007F-\u009F]/;

export type KeywordCheck = { ok: true; value: string } | { ok: false; error: string };

/** Trim, reject control characters, collapse spaces, lowercase, and enforce 2 to 200 characters. */
export function normaliseKeyword(raw: unknown): KeywordCheck {
  if (typeof raw !== "string") return { ok: false, error: "Enter a keyword." };
  if (raw.length > 1000) return { ok: false, error: "The keyword must be 2 to 200 characters." };
  const trimmed = raw.trim();
  if (CONTROL_CHARS.test(trimmed)) return { ok: false, error: "The keyword contains characters that are not allowed." };
  const value = trimmed.replace(/ +/g, " ").toLowerCase();
  if (value.length < 2 || value.length > 200) return { ok: false, error: "The keyword must be 2 to 200 characters." };
  return { ok: true, value };
}

export interface GscDay {
  date: string; // YYYY-MM-DD
  clicks: number;
  impressions: number;
  position: number | null;
}

export interface GscPage {
  page: string;
  clicks: number;
  impressions: number;
  position: number;
}

export interface GscResult {
  keyword: string;
  startDate: string;
  endDate: string;
  hasData: boolean;
  avgPosition: number | null;
  impressions: number;
  clicks: number;
  pages: GscPage[];
  daily: GscDay[];
}

/**
 * Results that belong to Astromar. Edit this list to change what is highlighted as "YOURS".
 * A result matches when its host equals (or is a subdomain of) one of `hosts`, and, if `pathPrefix`
 * is set, its path starts with it (case-insensitive).
 */
export const OWN_RESULTS = [
  { key: "website", label: "Your website", hosts: [SITE_DOMAIN] },
  { key: "facebook", label: "Your Facebook page", hosts: ["facebook.com", "www.facebook.com", "m.facebook.com"], pathPrefix: "/astromarftwz" },
] as const;
export type OwnKey = (typeof OWN_RESULTS)[number]["key"];

/** Which own result (if any) a URL is. Pure, safe on client and server. */
export function ownKeyOf(link: string): OwnKey | null {
  let u: URL;
  try {
    u = new URL(link);
  } catch {
    return null;
  }
  const host = u.hostname.toLowerCase();
  const path = u.pathname.toLowerCase();
  for (const o of OWN_RESULTS) {
    const hostOk = (o.hosts as readonly string[]).some((h) => host === h || host.endsWith("." + h));
    const prefix = "pathPrefix" in o ? o.pathPrefix : undefined;
    if (hostOk && (!prefix || path.startsWith(prefix))) return o.key;
  }
  return null;
}

/** Plain-text clean-up for text that came from SerpApi (untrusted): strip control characters, collapse spaces, cap length. */
export function cleanText(v: unknown, max: number): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.replace(/[\u0000-\u001F\u007F-\u009F]+/g, " ").replace(/\s+/g, " ").trim();
  if (!t) return undefined;
  return t.length > max ? t.slice(0, max - 1).trimEnd() + "…" : t;
}

export interface SerpRow {
  position: number;
  page: number; // 0-based SerpApi page (start = page * 10)
  title: string;
  link: string;
  domain: string;
  isOurs: boolean; // website only; drives firstMatchPosition (unchanged)
  snippet?: string; // Google's snippet, plain text, max about 300 characters (absent on older checks)
  own?: OwnKey; // website or Facebook page (absent on older checks)
}

export interface LocalResult {
  name: string;
  rating?: number;
  address?: string;
}

export interface SerpResult {
  keyword: string;
  location: string;
  depth: Depth;
  rows: SerpRow[];
  firstMatchPosition: number | null;
  searchesUsed: number;
  localResults?: LocalResult[]; // map-pack businesses, max 3 (absent when Google showed none, and on older checks)
}

export interface SavedKeyword {
  id: string;
  keyword: string;
  location: string;
  depth: Depth;
  track_competitors: boolean;
  active: boolean;
  created_at: string;
  last_checked_at: string | null;
}

export interface RecentCheck {
  id: number;
  keyword: string;
  source: "gsc" | "serpapi";
  location: string | null;
  checked_at: string;
  searches_used: number;
  avg_position: number | null;
  first_match: number | null;
}

export interface QuotaInfo {
  remaining: number | null;
  limit: number | null;
  error?: string;
}
