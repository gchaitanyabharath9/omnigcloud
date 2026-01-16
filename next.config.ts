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
  async headers() {
    // Content Security Policy
    // Start in Report-Only mode to monitor violations without breaking functionality
    // To enforce: change 'Content-Security-Policy-Report-Only' to 'Content-Security-Policy'
    const cspDirectives = [
      "default-src 'self'",
      // Scripts: Allow Next.js runtime, inline scripts (for hydration), eval (for dev mode), Vercel Live, and Vercel Analytics
      `script-src 'self' 'unsafe-inline' https://vercel.live https://*.vercel.live https://vercel.com https://*.vercel.com https://va.vercel-scripts.com ${isDev ? "'unsafe-eval'" : ""}`,
      // Styles: Allow inline styles (required for styled-jsx and CSS-in-JS), Google Fonts
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://vercel.live https://*.vercel.live",
      // Fonts: Allow self-hosted and Google Fonts, Vercel Live
      "font-src 'self' https://fonts.gstatic.com data: https://vercel.live https://*.vercel.live",
      // Images: Allow self, data URIs, blob, Unsplash, and Vercel Live
      "img-src 'self' data: blob: https://images.unsplash.com https://*.unsplash.com https://vercel.live https://*.vercel.live https://vercel.com https://*.vercel.com",
      // Connect: Allow API calls to self, Unsplash, Vercel Live, and Vercel Analytics
      "connect-src 'self' https://api.unsplash.com https://vercel.live https://*.vercel.live wss://*.vercel.live https://vercel.com https://*.vercel.com https://va.vercel-scripts.com",
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
      // Upgrade insecure requests (strict prod only to avoid local test failures)
      ...(appEnv === 'prod' ? ["upgrade-insecure-requests"] : []),
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
  async redirects() {
    return [
      // Existing architecture redirect
      {
        source: '/:locale/architecture/cloud-native-reference-architecture',
        destination: '/:locale/research/papers/a1-cloud-native-enterprise-reference',
        permanent: true,
      },
      {
        source: '/architecture/cloud-native-reference-architecture',
        destination: '/en/research/papers/a1-cloud-native-enterprise-reference',
        permanent: true,
      },

      // FIX: /architecture/* → /research/papers/* (wrong path structure)
      {
        source: '/:locale/architecture/a1-cloud-native-enterprise-reference',
        destination: '/:locale/research/papers/a1-cloud-native-enterprise-reference',
        permanent: true,
      },
      {
        source: '/:locale/architecture/a2-high-throughput-distributed-systems',
        destination: '/:locale/research/papers/a2-high-throughput-distributed-systems',
        permanent: true,
      },
      {
        source: '/:locale/architecture/a3-enterprise-observability-operational-intelligence',
        destination: '/:locale/research/papers/a3-enterprise-observability-operational-intelligence',
        permanent: true,
      },
      {
        source: '/:locale/architecture/a4-platform-governance-multicloud-hybrid',
        destination: '/:locale/research/papers/a4-platform-governance-multicloud-hybrid',
        permanent: true,
      },
      {
        source: '/:locale/architecture/a5-monolith-to-cloud-native-modernization',
        destination: '/:locale/research/papers/a5-monolith-to-cloud-native-modernization',
        permanent: true,
      },
      {
        source: '/:locale/architecture/a6-adaptive-policy-enforcement',
        destination: '/:locale/research/papers/a6-adaptive-policy-enforcement',
        permanent: true,
      },

      // FIX: Old scholarly article URL
      {
        source: '/:locale/research/scholarly-article-enterprise-architecture',
        destination: '/:locale/research/papers/scholarly-article',
        permanent: true,
      },

      // FIX: Non-existent /news → /blog
      {
        source: '/:locale/news',
        destination: '/:locale/blog',
        permanent: true,
      },
      {
        source: '/news/:path*',
        destination: '/en/blog',
        permanent: true,
      },

      // FIX: Non-existent /resources → /research
      {
        source: '/:locale/resources',
        destination: '/:locale/research',
        permanent: true,
      },
      {
        source: '/:locale/resources/:path*',
        destination: '/:locale/research',
        permanent: true,
      },

      // FIX: Non-existent /research/architecture → /research/papers
      {
        source: '/:locale/research/architecture',
        destination: '/:locale/research/papers',
        permanent: true,
      },

      // FIX: Non-existent /research/metrics → /research/papers
      {
        source: '/:locale/research/metrics',
        destination: '/:locale/research/papers',
        permanent: true,
      },

      // FIX: Non-existent /platform/ai → /platform
      {
        source: '/platform/:path*',
        destination: '/en/platform',
        permanent: true,
      },

      // FIX: Non-existent /checkout → /pricing
      {
        source: '/checkout',
        destination: '/en/pricing',
        permanent: true,
      },

      // FIX: Locale words (월=month in Korean, 月=month in Chinese, etc.) → homepage
      {
        source: '/월',
        destination: '/ko',
        permanent: true,
      },
      {
        source: '/月',
        destination: '/zh',
        permanent: true,
      },
      {
        source: '/माह',
        destination: '/hi',
        permanent: true,
      },
      {
        source: '/Monat',
        destination: '/de',
        permanent: true,
      },
      {
        source: '/mes',
        destination: '/es',
        permanent: true,
      },
      {
        source: '/mois',
        destination: '/fr',
        permanent: true,
      },

      // Locale-less main pages → /en/
      {
        source: '/about',
        destination: '/en/about',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/en/pricing',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/en/contact',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/en/blog',
        permanent: true,
      },
      {
        source: '/research',
        destination: '/en/research',
        permanent: true,
      },
      {
        source: '/research/papers',
        destination: '/en/research/papers',
        permanent: true,
      },
      {
        source: '/research/frameworks',
        destination: '/en/research/papers',
        permanent: true,
      },
      {
        source: '/solutions',
        destination: '/en/solutions',
        permanent: true,
      },
      {
        source: '/platform',
        destination: '/en/platform',
        permanent: true,
      },

      // Research papers without locale
      {
        source: '/research/papers/a1-cloud-native-enterprise-reference',
        destination: '/en/research/papers/a1-cloud-native-enterprise-reference',
        permanent: true,
      },
      {
        source: '/research/papers/a2-high-throughput-distributed-systems',
        destination: '/en/research/papers/a2-high-throughput-distributed-systems',
        permanent: true,
      },
      {
        source: '/research/papers/a3-enterprise-observability-operational-intelligence',
        destination: '/en/research/papers/a3-enterprise-observability-operational-intelligence',
        permanent: true,
      },
      {
        source: '/research/papers/a4-platform-governance-multicloud-hybrid',
        destination: '/en/research/papers/a4-platform-governance-multicloud-hybrid',
        permanent: true,
      },
      {
        source: '/research/papers/a5-monolith-to-cloud-native-modernization',
        destination: '/en/research/papers/a5-monolith-to-cloud-native-modernization',
        permanent: true,
      },
      {
        source: '/research/papers/a6-adaptive-policy-enforcement',
        destination: '/en/research/papers/a6-adaptive-policy-enforcement',
        permanent: true,
      },
      {
        source: '/research/scholarly-article',
        destination: '/en/research/papers/scholarly-article',
        permanent: true,
      },
      {
        source: '/research/frameworks/aecp',
        destination: '/en/research/papers/aecp',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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

import createBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(withNextIntl(nextConfig));
