import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  async headers() {
    // Content Security Policy
    // Start in Report-Only mode to monitor violations without breaking functionality
    // To enforce: change 'Content-Security-Policy-Report-Only' to 'Content-Security-Policy'
    const cspDirectives = [
      "default-src 'self'",
      // Scripts: Allow Next.js runtime, inline scripts (for hydration), and eval (for dev mode)
      // In production, consider removing 'unsafe-eval' if not needed
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Styles: Allow inline styles (required for styled-jsx and CSS-in-JS), Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts: Allow self-hosted and Google Fonts
      "font-src 'self' https://fonts.gstatic.com data:",
      // Images: Allow self, data URIs, blob, and Unsplash (for marketing images)
      "img-src 'self' data: blob: https://images.unsplash.com https://*.unsplash.com",
      // Connect: Allow API calls to self and any external APIs
      "connect-src 'self' https://api.unsplash.com",
      // Media: Restrict to self
      "media-src 'self'",
      // Objects: Disallow plugins
      "object-src 'none'",
      // Base URI: Restrict to self
      "base-uri 'self'",
      // Form actions: Restrict to self
      "form-action 'self'",
      // Frame ancestors: Prevent clickjacking (replaces X-Frame-Options)
      "frame-ancestors 'self'",
      // Upgrade insecure requests
      "upgrade-insecure-requests",
      // Block mixed content
      "block-all-mixed-content"
    ].join('; ');

    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()'
          },
          {
            // CSP in Report-Only mode - monitor violations without breaking pages
            // To enforce: change key to 'Content-Security-Policy'
            key: 'Content-Security-Policy-Report-Only',
            value: cspDirectives
          },
          {
            // Deprecated but still supported by older browsers
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            // Deprecated XSS protection header (modern browsers use CSP)
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
