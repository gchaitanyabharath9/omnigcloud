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
  const isBot = /googlebot|bingbot|yandexbot|duckduckbot|slurp|baiduspider|ia_archiver|facebot|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest\/0\.|developers\.google\.com\/\+\/web\/snippet|slackbot|vkshare|w3c_validator|redditbot|applebot|whatsapp|flipboard|tumblr|bitlybot|skypeuripreview|nuzzel|discordbot|google pagead|qwantify|pinterestbot|bitrix link preview|xing-content-proxy|chrome-lighthouse|telegrambot|gptbot/i.test(userAgent);

  const rateLimit = isBot ? { allowed: true } : await limiter.check(ip);

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


