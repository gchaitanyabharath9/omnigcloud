import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { coreMiddleware as coreProxy } from "@/core-middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

// MICRO-OPTIMIZATION: Use Set for O(1) lookups
const SUPPORTED_LOCALES = new Set(['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko']);
const DEFAULT_LOCALE = 'en';

export default auth(async (req) => {
    const { nextUrl } = req;
    const { pathname, search } = nextUrl;

    // 3. REMOVE REDUNDANT SKIP LOGIC (PERF/COST)
    // Matcher handles most exclusions, but redundant safety checks for specific files:
    if (
        pathname === '/favicon.ico' ||
        pathname === '/robots.txt' ||
        pathname === '/sitemap.xml'
    ) {
        return NextResponse.next();
    }

    const segments = pathname.split('/');
    const firstSegment = segments[1]; // pathname starts with /

    // A) Root path "/" -> "/en" (PRESERVE SEARCH)
    if (pathname === '/') {
        return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${search}`, nextUrl));
    }

    // B) Check for locale prefix (USE SET HAS)
    const isSupportedLocale = SUPPORTED_LOCALES.has(firstSegment);

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

    // 1. FIX AUTH ROUTE DETECTION (BUG FIX) + 4. LOCALE AWARE
    // Only gate routes if we are in a valid locale and the NEXT segment is 'app'
    // Structure: /:locale/app/...
    // segments: ['', 'en', 'app', ...] -> segments[2] is 'app'
    const isAppRoute = segments[2] === 'app';

    if (isAppRoute) {
        const isLoggedIn = !!req.auth;
        if (!isLoggedIn) {
            const signInUrl = new URL("/api/auth/signin", nextUrl);
            signInUrl.searchParams.set("callbackUrl", pathname + search);
            return NextResponse.redirect(signInUrl);
        }
    }

    // Pass to core-middleware for rate limiting and final intl processing
    return coreProxy(req as unknown as NextRequest);
});

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
