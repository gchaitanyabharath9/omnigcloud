import { auth } from "@/auth";
import { coreMiddleware as proxy } from "@/core-middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { domains } from "@/config/domains";

const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];
const DEFAULT_LOCALE = 'en';

export default auth(async (req) => {
  const { nextUrl } = req;
  const { pathname, search } = nextUrl;

  // 1. Skip assets and internal Next.js paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/images') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }

  // 1a. Canonical Host Enforcement (Application Layer)
  // TEMPORARILY DISABLED: Delegating to Vercel Edge configuration to resolve redirect loops.
  /*
  if (process.env.NODE_ENV === 'production') {
    const host = req.headers.get('host');
    const canonicalUrl = new URL(domains.canonical);
    const canonicalHost = canonicalUrl.host;
    const rootDomain = 'omnigcloud.com';

    // Allow both www and non-www of the main domain to pass to prevent infinite redirect loops
    // if Vercel and App Config disagree on the primary.
    // We still force redirects for vercel.app, omnig.ai, etc.
    const isCanonical = host?.toLowerCase() === canonicalHost.toLowerCase();
    const isRoot = host?.toLowerCase() === rootDomain;

    if (host && !isCanonical && !isRoot) {
      // Create new URL using canonical host but preserving path and query
      const newUrl = new URL(req.url);
      newUrl.hostname = canonicalHost;
      newUrl.protocol = 'https:';
      newUrl.port = ''; // Standard ports don't need explicit numbers

      return NextResponse.redirect(newUrl, 301);
    }
  }
  */

  const segments = pathname.split('/');
  const firstSegment = segments[1];

  // A) Root path "/" -> "/en"
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, nextUrl));
  }

  // B) Check for locale prefix
  const isSupportedLocale = SUPPORTED_LOCALES.includes(firstSegment);

  if (!isSupportedLocale) {
    // C) Handle unsupported 2-letter codes or bare paths
    // If it looks like a locale (2 chars) but isn't supported, replace it
    if (firstSegment.length === 2) {
      const rest = segments.slice(2).join('/');
      const newPath = rest ? `/${DEFAULT_LOCALE}/${rest}` : `/${DEFAULT_LOCALE}`;
      return NextResponse.redirect(new URL(newPath + search, nextUrl));
    }

    // Otherwise it's a bare path like "/pricing" -> "/en/pricing"
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${pathname}${search}`, nextUrl));
  }

  // D) Authentication Logic for protected app routes
  const isLoggedIn = !!req.auth;
  const isAppRoute = pathname.startsWith('/app') || /^\/[a-z]{2}\/app/.test(pathname);

  if (isAppRoute) {
    if (!isLoggedIn) {
      const signInUrl = new URL("/api/auth/signin", nextUrl);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Pass to core-middleware for rate limiting and final intl processing
  return proxy(req as unknown as NextRequest);
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
