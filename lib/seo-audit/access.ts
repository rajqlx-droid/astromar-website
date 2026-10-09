import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServiceClient, isServiceClientConfigured } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAdminUser, isDevBypass } from "./auth";

export const NEEDS_SUPABASE =
  "Needs Supabase: add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY to .env.local to read or save scans and marks.";

export interface Access {
  /** Passed the admin check (or the dev bypass is on). */
  allowed: boolean;
  /** Client to read/write saved data with, or null when Supabase is not set up. */
  client: SupabaseClient | null;
  bypass: boolean;
  email: string;
}

/**
 * Single server-side entry check for the audit page and its routes.
 * Normal mode: the Supabase session must belong to ADMIN_EMAIL; data access uses that
 * session, so Row Level Security applies.
 * Dev bypass: no session check. Data access uses the service-role client when it is
 * configured (there is no session for the row-level rules to recognise), else null.
 */
export async function resolveAccess(): Promise<Access> {
  let session: SupabaseClient | null = null;
  try {
    session = await createSupabaseServerClient();
  } catch {
    session = null;
  }

  if (isDevBypass()) {
    let client: SupabaseClient | null = null;
    if (isServiceClientConfigured()) client = createSupabaseServiceClient();
    return { allowed: true, client, bypass: true, email: "dev bypass" };
  }

  if (!session) return { allowed: false, client: null, bypass: false, email: "" };
  const user = await getAdminUser(session);
  return { allowed: !!user, client: user ? session : null, bypass: false, email: user?.email ?? "" };
}
