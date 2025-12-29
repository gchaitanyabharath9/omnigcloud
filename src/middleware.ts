import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const locales = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja'];
const defaultLocale = 'en';

// Simple in-memory rate limit store (Note: In Serverless/OKE, this is per pod)
const rateLimitMap = new Map();

function getRateLimitState(ip: string) {
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute window

    if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, { count: 1, lastReset: now });
        return { count: 1, limitReached: false };
    }

    const state = rateLimitMap.get(ip);
    if (now - state.lastReset > windowMs) {
        state.count = 1;
        state.lastReset = now;
    } else {
        state.count += 1;
    }

    return { count: state.count, limitReached: state.count > 60 }; // 60 requests per minute
}

// 1. Next-Intl Middleware for i18n
const intlMiddleware = createMiddleware({
    locales,
    defaultLocale
});

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Rate limiting for API routes
    if (pathname.includes('/api/')) {
        const ip = request.headers.get('x-forwarded-for') || 'anonymous';
        const { limitReached } = getRateLimitState(ip);

        if (limitReached) {
            return NextResponse.json(
                { message: 'Too many requests. Please slow down.' },
                { status: 429 }
            );
        }
    }

    // Run the i18n middleware for all other requests
    return intlMiddleware(request);
}

export const config = {
    // Match all pathnames except for
    // - /api (except /api/contact)
    // - /_next (static files)
    // - /_vercel (Vercel specifics)
    // - /static (public files)
    // - favicon.ico, logo.png, etc.
    matcher: ['/', '/(en|es|fr|de|zh|hi|ja)/:path*', '/api/:path*']
};
