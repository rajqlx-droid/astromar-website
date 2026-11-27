"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

// Same sign-out as /admin/seo: end the Supabase session, then go to the login page.
export default function SignOutButton({ title }: { title?: string }) {
  const router = useRouter();
  const signOut = useCallback(async () => {
    try {
      await createSupabaseBrowserClient().auth.signOut();
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }, [router]);

  return (
    <button
      type="button"
      onClick={signOut}
      title={title}
      className="rounded-lg border border-white/40 px-3.5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      Sign out
    </button>
  );
}
