import { NextResponse, type NextRequest } from "next/server";
import { isDevBypass } from "@/lib/seo-audit/auth";
import { readSession } from "@/lib/supabase/proxy";

// Gate for the private admin area (/admin/*):
//  1. ENABLE_SEO_ADMIN must be "true", otherwise the area does not exist (404).
//  2. (Temporary, development only) SEO_ADMIN_DEV_BYPASS skips step 3 on a local `next dev`.
//  3. Visitors must be logged in with Supabase Auth, and their email must equal ADMIN_EMAIL.
// The pages and routes under /admin re-check this themselves (see lib/seo-audit/auth.ts).

const LOGIN_PATH = "/admin/login";

function noStore<T extends NextResponse>(res: T): T {
  res.headers.set("Cache-Control", "no-store");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export async function proxy(request: NextRequest) {
  if (process.env.ENABLE_SEO_ADMIN !== "true") {
    // Rewrite to a path that does not exist so the normal site 404 page is served.
    return noStore(NextResponse.rewrite(new URL("/not-found-admin-disabled", request.url), { status: 404 }));
  }

  const { pathname } = request.nextUrl;

  // Dev bypass: only under `next dev`, never on Vercel. Login is not needed, so send /admin/login on.
  if (isDevBypass()) {
    if (pathname === LOGIN_PATH) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/seo";
      url.search = "";
      return noStore(NextResponse.redirect(url));
    }
    return noStore(NextResponse.next());
  }

  const isLogin = pathname === LOGIN_PATH;
  const isApi = pathname.startsWith("/admin/seo/scan") || pathname.startsWith("/admin/seo/marks");

  const session = await readSession(request);
  const allowedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const isAdmin = !!session.user?.email && !!allowedEmail && session.user.email.trim().toLowerCase() === allowedEmail;

  if (!session.configured || !allowedEmail) {
    return noStore(new NextResponse("Admin is not configured: set the Supabase variables and ADMIN_EMAIL.", { status: 503 }));
  }

  // A logged-in user who is not the admin gets signed out.
  if (session.user && !isAdmin) {
    await session.signOut();
    if (isApi) return noStore(session.withCookies(NextResponse.json({ error: "Forbidden" }, { status: 403 })));
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.search = "?error=forbidden";
    return noStore(session.withCookies(NextResponse.redirect(url)));
  }

  if (!isAdmin) {
    if (isLogin) return noStore(session.next());
    if (isApi) return noStore(NextResponse.json({ error: "Not logged in" }, { status: 401 }));
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.search = "";
    return noStore(NextResponse.redirect(url));
  }

  if (isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/seo";
    url.search = "";
    return noStore(session.withCookies(NextResponse.redirect(url)));
  }

  return noStore(session.next());
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
