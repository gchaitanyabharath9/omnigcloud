import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// BUILD METADATA GENERATION
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

let version = '0.0.0';
try {
  const pkgPath = path.resolve(__dirname, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  version = pkg.version;
} catch (e) { console.warn('Failed to read package.json version'); }

const isDev = process.env.NODE_ENV !== 'production';

let commitHash = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7)
  || process.env.GITHUB_SHA?.slice(0, 7)
  || 'dev';

if (commitHash === 'dev') {
  try {
    commitHash = execSync('git rev-parse --short HEAD').toString().trim();
  } catch (e) { /* ignore in non-git envs */ }
}

const buildTime = new Date().toISOString();
const appEnv = process.env.APP_ENV || 'local';

const nextConfig: any = {
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
    NEXT_PUBLIC_GIT_COMMIT: commitHash,
    NEXT_PUBLIC_BUILD_TIME: buildTime,
    NEXT_PUBLIC_APP_ENV: appEnv,
    QUALITY_GATE: process.env.QUALITY_GATE || 'false',
  },
  reactCompiler: true,
  eslint: {
    // Redundant since verify.mjs already runs lint
    ignoreDuringBuilds: process.env.QUALITY_GATE === 'true',
  },
  typescript: {
    // Redundant since verify.mjs already runs typecheck
    ignoreBuildErrors: process.env.QUALITY_GATE === 'true',
  },
  async headers() {
    // Content Security Policy
    // Start in Report-Only mode to monitor violations without breaking functionality
    // To enforce: change 'Content-Security-Policy-Report-Only' to 'Content-Security-Policy'
    const cspDirectives = [
      "default-src 'self'",
      // Scripts: Allow Next.js runtime, inline scripts (for hydration), and eval (for dev mode) + Vercel Live
      `script-src 'self' 'unsafe-inline' https://vercel.live https://*.vercel.live https://vercel.com https://*.vercel.com ${isDev ? "'unsafe-eval'" : ""}`,
      // Styles: Allow inline styles (required for styled-jsx and CSS-in-JS), Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://vercel.live https://*.vercel.live",
      // Fonts: Allow self-hosted and Google Fonts, Vercel Live
      "font-src 'self' https://fonts.gstatic.com data: https://vercel.live https://*.vercel.live",
      // Images: Allow self, data URIs, blob, Unsplash, and Vercel Live
      "img-src 'self' data: blob: https://images.unsplash.com https://*.unsplash.com https://vercel.live https://*.vercel.live https://vercel.com https://*.vercel.com",
      // Connect: Allow API calls to self, Unsplash, and Vercel Live
      "connect-src 'self' https://api.unsplash.com https://vercel.live https://*.vercel.live wss://*.vercel.live https://vercel.com https://*.vercel.com",
      // Media: Restrict to self
      "media-src 'self'",
      // Objects: Disallow plugins
      "object-src 'none'",
      // Base URI: Restrict to self
      "base-uri 'self'",
      // Form actions: Restrict to self
      "form-action 'self'",
      // Frame ancestors: Prevent clickjacking (replaces X-Frame-Options)
      "frame-ancestors 'self' https://vercel.live https://*.vercel.live https://vercel.com",
      // Frame src: Allow Vercel Live
      "frame-src 'self' https://vercel.live https://*.vercel.live https://vercel.com",
      // Upgrade insecure requests
      "upgrade-insecure-requests",
      // Block mixed content
      "block-all-mixed-content"
    ].join('; ');

    return [
      {
        // Cache Next.js static assets
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        // Cache static assets (fonts, images) for 1 year
        source: '/(fonts|images)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
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
            key: 'Content-Security-Policy',
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
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
    // Unsplash is unoptimized={true} in code, but we keep this as fallback/safety
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // DISALLOW all other domains to prevent accidental optimization
    unoptimized: false, // We manually opt-out per image to be safe
  },
};

export default withNextIntl(nextConfig);
