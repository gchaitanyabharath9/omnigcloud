import { auth } from "@/auth";
import { coreMiddleware as proxy } from "@/core-middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Define app routes (accounting for locale prefix)
  const isAppRoute = nextUrl.pathname.startsWith('/app') ||
    /^\/[a-z]{2}\/app/.test(nextUrl.pathname);

  // Require login for app routes
  if (isAppRoute) {
    if (!isLoggedIn) {
      console.warn(`[AUTH_AUDIT] Unauthorized Access Attempt | Path: ${nextUrl.pathname} | IP: ${req.headers.get('x-forwarded-for') || 'unknown'}`);
      const signInUrl = new URL("/api/auth/signin", nextUrl);
      signInUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }
    console.log(`[AUTH_AUDIT] Protected Access | User: ${req.auth?.user?.email} | Path: ${nextUrl.pathname}`);
  }

  // Pass to proxy for rate limiting and i18n
  return proxy(req as unknown as NextRequest);
});

export const config = {
  // Match all pathnames except for
  // - /api
  // - /_next (static files)
  // - /_vercel (Vercel specifics)
  // - /static (public files)
  // - favicon.ico, logo.png, etc.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
