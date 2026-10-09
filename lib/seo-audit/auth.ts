import type { SupabaseClient, User } from "@supabase/supabase-js";

/** Master switch: when not "true", everything under /admin returns 404. */
export function isAdminEnabled(): boolean {
  return process.env.ENABLE_SEO_ADMIN === "true";
}

/** Scanning is only allowed on a machine that sets this in .env.local (never on Vercel). */
export function isScanEnabled(): boolean {
  return process.env.ENABLE_SEO_ADMIN_SCAN === "true" && !process.env.VERCEL;
}

/**
 * TEMPORARY dev-only login bypass. On only when ALL of these hold:
 * next dev (NODE_ENV=development), SEO_ADMIN_DEV_BYPASS=true, and not running on Vercel.
 * A production build (next build / next start) can never turn it on.
 */
export function isDevBypass(): boolean {
  return process.env.NODE_ENV === "development" && process.env.SEO_ADMIN_DEV_BYPASS === "true" && !process.env.VERCEL;
}

export function isAdminEmail(email: string | null | undefined): boolean {
  const allowed = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return !!allowed && !!email && email.trim().toLowerCase() === allowed;
}

/** Verified admin user for the current session, or null. Used by every server entry point. */
export async function getAdminUser(supabase: SupabaseClient): Promise<User | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user && isAdminEmail(user.email) ? user : null;
}
