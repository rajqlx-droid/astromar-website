import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

type CookieOptions = Parameters<NextResponse["cookies"]["set"]>[2];

/**
 * Reads and refreshes the Supabase session for a request (used by proxy.ts).
 * - `user`: the verified user, or null
 * - `next()`: a pass-through response that carries any refreshed cookies
 * - `withCookies(res)`: copy refreshed cookies onto a redirect or error response
 */
export async function readSession(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const pending: { name: string; value: string; options?: CookieOptions }[] = [];

  if (!url || !anonKey) {
    return {
      configured: false as const,
      user: null,
      signOut: async () => {},
      next: () => NextResponse.next({ request }),
      withCookies: <T extends NextResponse>(res: T): T => res,
    };
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(list) {
        list.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          pending.push({ name, value, options });
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const withCookies = <T extends NextResponse>(res: T): T => {
    pending.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
    return res;
  };

  return {
    configured: true as const,
    user,
    signOut: async () => {
      await supabase.auth.signOut();
    },
    next: () => withCookies(NextResponse.next({ request })),
    withCookies,
  };
}
