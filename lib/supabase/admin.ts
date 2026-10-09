import "server-only";
import { createClient } from "@supabase/supabase-js";

// Service-role client: bypasses RLS. Server only. Used to save scans after the admin
// check (and, in the temporary dev bypass only, to read data without a session).
// Never import this from a client component, and never give SUPABASE_SERVICE_ROLE_KEY
// a NEXT_PUBLIC_ prefix.
export function isServiceClientConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;
}

export function createSupabaseServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set in .env.local, so the scan cannot be saved.");
  }
  return createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
}
