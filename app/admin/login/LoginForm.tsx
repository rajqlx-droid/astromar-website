"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const GENERIC_ERROR = "Invalid email or password.";
const IS_DEV = process.env.NODE_ENV === "development";

// Development builds tell the failures apart; production always shows the one generic message.
function signInMessage(failure: "config" | "network" | "credentials" | "other"): string {
  if (!IS_DEV) return GENERIC_ERROR;
  if (failure === "config") return "Supabase URL or key missing in this build";
  if (failure === "network") return "Could not reach Supabase";
  if (failure === "credentials") return "Wrong email or password";
  return GENERIC_ERROR;
}

// Sign-in only. There is deliberately no sign-up: accounts are created in the Supabase dashboard.
export default function LoginForm({ initialError }: { initialError: string | null }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(initialError && IS_DEV ? "This account is not allowed (ADMIN_EMAIL)" : initialError);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      let supabase: ReturnType<typeof createSupabaseBrowserClient>;
      try {
        supabase = createSupabaseBrowserClient();
      } catch {
        setError(signInMessage("config"));
        setShowPassword(false);
        return;
      }
      const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (authError) {
        const unreachable = authError.name === "AuthRetryableFetchError" || authError.status === 0 || authError.status === undefined;
        setError(signInMessage(unreachable ? "network" : authError.code === "invalid_credentials" ? "credentials" : "other"));
        setShowPassword(false);
        return;
      }
      router.replace("/admin/seo");
      router.refresh();
    } catch {
      setError(IS_DEV ? signInMessage("network") : GENERIC_ERROR);
      setShowPassword(false);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md rounded-xl border border-[#D9DFEA] bg-white p-6 shadow-sm">
      <div className="text-xs uppercase tracking-[0.08em] text-[#4A5670]">Astromar Logistics - Private admin</div>
      <h1 className="mt-1 text-2xl font-bold text-[#1B3A6B]">Sign in</h1>

      {error && (
        <div role="alert" className="mt-4 rounded-lg border border-[#E8A9A9] bg-[#FDECEC] px-3 py-2 text-sm text-[#7A1010]">
          {error}
        </div>
      )}

      <label className="mt-5 block text-sm font-semibold text-[#1A2233]" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        autoComplete="username"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-1 min-h-11 w-full rounded-lg border border-[#B8C2D6] px-3 text-[15px] outline-none focus:border-[#1B3A6B] focus:ring-2 focus:ring-[#1B3A6B]/20"
      />

      <label className="mt-4 block text-sm font-semibold text-[#1A2233]" htmlFor="password">
        Password
      </label>
      <div className="relative mt-1">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="min-h-11 w-full rounded-lg border border-[#B8C2D6] pl-3 pr-12 text-[15px] outline-none focus:border-[#1B3A6B] focus:ring-2 focus:ring-[#1B3A6B]/20"
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-lg text-[#1B3A6B] transition-colors hover:bg-[#F3F5F9] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#F97316]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
            <circle cx="12" cy="12" r="3" />
            {showPassword && <line x1="3" y1="3" x2="21" y2="21" />}
          </svg>
        </button>
      </div>

      <button
        type="submit"
        disabled={busy}
        className="mt-6 min-h-11 w-full rounded-lg bg-[#F97316] px-5 text-[15px] font-bold text-[#1A1205] transition-colors hover:bg-[#FB8A3C] disabled:cursor-wait disabled:opacity-80"
      >
        {busy ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
