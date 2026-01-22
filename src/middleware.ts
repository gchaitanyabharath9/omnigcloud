import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server';
import { coreMiddleware } from './core-middleware'

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()
    const host = request.headers.get('host')
    const protocol = request.headers.get('x-forwarded-proto') || 'https'

    // 1. Enforce HTTPS and WWW
    // Redirect http -> https OR omnigcloud.com -> www.omnigcloud.com
    // Only apply in production environments and NOT to localhost
    const isProduction = process.env.NODE_ENV === 'production';
    const isLocalhost = host && (host.includes('localhost') || host.includes('127.0.0.1') || host.includes('::1'));

    if (isProduction && !isLocalhost && (protocol === 'http' || (host && host === 'omnigcloud.com'))) {
        const protocolPrefix = 'https://'
        const hostName = 'www.omnigcloud.com'
        return NextResponse.redirect(`${protocolPrefix}${hostName}${url.pathname}${url.search}`, 301)
    }

    // 2. Direct base domain / to /en (handled by next-intl usually, but being explicit)
    if (url.pathname === '/') {
        url.pathname = '/en'
        return NextResponse.redirect(url, 301)
    }

    // 3. Force canonical URLs (no trailing slashes except root)
    if (url.pathname.endsWith('/') && url.pathname !== '/') {
        url.pathname = url.pathname.slice(0, -1)
        return NextResponse.redirect(url, 301)
    }

    // 4. Force lowercase URLs for consistency
    if (url.pathname !== url.pathname.toLowerCase()) {
        url.pathname = url.pathname.toLowerCase()
        return NextResponse.redirect(url, 301)
    }

    // Add security headers
    // We delegate to coreMiddleware for i18n and rate limiting
    // coreMiddleware returns a NextResponse (rewrite, redirect, or json for 429)
    // Inject x-current-path for layout metadata
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-current-path', url.pathname);

    const requestWithHeaders = new NextRequest(request, {
        headers: requestHeaders,
    });

    const response = await coreMiddleware(requestWithHeaders);

    // Prevent clickjacking
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

    // Add canonical header for SEO
    // We utilize the original request URL for the canonical tag - ALWAYS point to www version
    response.headers.set('Link', `<https://www.omnigcloud.com${url.pathname}>; rel="canonical"`)

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
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
}
