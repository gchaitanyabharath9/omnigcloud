import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { coreMiddleware } from "./core-middleware";

import { APP_CONFIG } from "@/config/app-config";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") || "https";

  // 1. Enforce HTTPS and Canonical Host
  // Redirect http -> https OR alternate host -> canonical host
  // Only apply in production environments and NOT to localhost
  const isProduction = process.env.NODE_ENV === "production";
  const isLocalhost =
    host && (host.includes("localhost") || host.includes("127.0.0.1") || host.includes("::1"));

  if (isProduction && !isLocalhost && host) {
    const currentOrigin = `${protocol}://${host}`;
    const canonicalOrigin = APP_CONFIG.siteUrl;

    // Check if we need to redirect due to protocol (http) or host (non-canonical)
    const isHttp = protocol === "http";
    const isNonCanonicalHost = host !== new URL(canonicalOrigin).host;

    if (isHttp || isNonCanonicalHost) {
      // If it's a root request on apex, go straight to default locale if needed 
      // (logic preserved from original, but simplified to just path preservation usually)
      const targetPath = url.pathname === "/" ? "/en" : url.pathname;
      return NextResponse.redirect(`${canonicalOrigin}${targetPath}${url.search}`, 308);
    }
  }

  // 2. Direct base domain / to /en (handled by next-intl usually, but being explicit)
  if (url.pathname === "/") {
    url.pathname = "/en";
    return NextResponse.redirect(url, 308);
  }

  // 3. Force canonical URLs (no trailing slashes except root)
  if (url.pathname.endsWith("/") && url.pathname !== "/") {
    url.pathname = url.pathname.slice(0, -1);
    return NextResponse.redirect(url, 308);
  }

  // 4. Force lowercase URLs for consistency
  if (url.pathname !== url.pathname.toLowerCase()) {
    url.pathname = url.pathname.toLowerCase();
    return NextResponse.redirect(url, 308);
  }

  // Add security headers
  // We delegate to coreMiddleware for i18n and rate limiting
  // coreMiddleware returns a NextResponse (rewrite, redirect, or json for 429)
  // Inject x-current-path for layout metadata
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-current-path", url.pathname);

  const requestWithHeaders = new NextRequest(request, {
    headers: requestHeaders,
  });

  const response = await coreMiddleware(requestWithHeaders);

  // Prevent clickjacking
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Add canonical header for SEO
  // We utilize the original request URL for the canonical tag - ALWAYS point to canonical version
  response.headers.set("Link", `<${APP_CONFIG.siteUrl}${url.pathname}>; rel="canonical"`);

  return response;
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
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
