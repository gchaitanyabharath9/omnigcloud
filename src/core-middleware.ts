import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { getRateLimiter } from './lib/rate-limit';

const locales = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];
const defaultLocale = 'en';

const limiter = getRateLimiter();

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

export async function coreMiddleware(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    (request as any).ip ||
    'unknown';

  const userAgent = request.headers.get('user-agent') || '';

  // Define good bots (SEO) vs bad bots (Scrapers/AI)
  const isGoodBot = /googlebot|bingbot|yandexbot|duckduckbot|slurp|baiduspider|facebot|facebookexternalhit|twitterbot|linkedinbot|pinterestbot|applebot|whatsapp|flipboard|tumblr|skypeuripreview|nuzzel|discordbot|google pagead/i.test(userAgent);

  const isBadBot = /gptbot|ccbot|google-extended|anthropic-ai|claude-web|bytespider|omgilibot|facebookbot|diffbot|ia_archiver|cohere-ai|mj12bot/i.test(userAgent);

  // BLOCK aggressive AI scrapers and data miners immediately
  if (isBadBot) {
    return new NextResponse(JSON.stringify({ error: 'Access Denied: Automated scraping prohibited.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const isLocal = ip === '127.0.0.1' || ip === '::1' || process.env.NEXT_PUBLIC_APP_ENV === 'local';

  // Allow good bots and local dev to bypass rate limits
  // Enforce rate limits on everyone else
  const rateLimit = (isGoodBot || isLocal) ? { allowed: true } : await limiter.check(ip);

  if (!rateLimit.allowed) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': String((rateLimit as any).retryAfter ?? 60),
      },
    });
  }


  // Run the i18n middleware for all other requests
  return intlMiddleware(request);
}


