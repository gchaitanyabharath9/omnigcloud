import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { coreMiddleware } from './core-middleware'

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()

    // Force canonical URLs (no trailing slashes except root)
    if (url.pathname.endsWith('/') && url.pathname !== '/') {
        url.pathname = url.pathname.slice(0, -1)
        return NextResponse.redirect(url, 301)
    }

    // Force lowercase URLs for consistency
    if (url.pathname !== url.pathname.toLowerCase()) {
        url.pathname = url.pathname.toLowerCase()
        return NextResponse.redirect(url, 301)
    }

    // Add security headers
    // We delegate to coreMiddleware for i18n and rate limiting
    // coreMiddleware returns a NextResponse (rewrite, redirect, or json for 429)
    const response = await coreMiddleware(request);

    // Prevent clickjacking
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

    // Add canonical header for SEO
    // We utilize the original request URL for the canonical tag
    response.headers.set('Link', `<https://omnigcloud.com${url.pathname}>; rel="canonical"`)

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
}
