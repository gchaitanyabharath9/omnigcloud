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

  const rateLimit = await limiter.check(ip);

  if (!rateLimit.allowed) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': String(rateLimit.retryAfter ?? 60),
      },
    });
  }


  // Run the i18n middleware for all other requests
  return intlMiddleware(request);
}


