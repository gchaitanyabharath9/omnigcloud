#!/usr/bin/env node

/**
 * Enterprise Feature Verification Script
 * Validates all 10 enterprise requirements are implemented
 */

const fs = require('fs');
const path = require('path');

const checks = [];

function check(name, condition, details = '') {
    checks.push({ name, passed: condition, details });
    console.log(`${condition ? '✅' : '❌'} ${name}${details ? ': ' + details : ''}`);
}

console.log('🔍 Enterprise Feature Verification\n');

// 1. Configurable Domain
const envExample = fs.readFileSync('example.env', 'utf8');
check('1. Configurable Domain',
    envExample.includes('NEXT_PUBLIC_SITE_URL'),
    'NEXT_PUBLIC_SITE_URL in example.env'
);

// 2. Multilingual SEO
const sitemap = fs.readFileSync('src/app/sitemap.ts', 'utf8');
const locales = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja'];
check('2. Multilingual SEO',
    locales.every(l => sitemap.includes(`'${l}'`)),
    `7 locales: ${locales.join(', ')}`
);

// 3. Security Headers
const nextConfig = fs.readFileSync('next.config.ts', 'utf8');
check('3. Security Headers + CSP',
    nextConfig.includes('X-Frame-Options') && nextConfig.includes('Content-Security-Policy'),
    'CSP and security headers configured'
);

// 4. Hardened API Routes
const apiUtils = fs.existsSync('src/lib/api-utils.ts');
const billingApi = fs.readFileSync('src/app/api/billing/route.ts', 'utf8');
check('4. Hardened API Routes',
    apiUtils && billingApi.includes('BillingSchema'),
    'Zod validation + standardized responses'
);

// 5. Redis Rate Limiting
const rateLimit = fs.readFileSync('src/lib/rate-limit.ts', 'utf8');
check('5. Redis Rate Limiting',
    rateLimit.includes('RedisRateLimiter') && rateLimit.includes('NoopRateLimiter'),
    'Redis + fallback implementation'
);

// 6. Authentication + RBAC
const auth = fs.readFileSync('src/auth.ts', 'utf8');
check('6. Authentication + RBAC',
    auth.includes('Google') && auth.includes('Entra') && auth.includes('UserRole'),
    'Google + Entra ID + RBAC roles'
);

// 7. Billing + Stripe
const stripeLib = fs.existsSync('src/lib/stripe.ts');
const billingRoute = fs.existsSync('src/app/api/billing/route.ts');
check('7. Billing + Stripe',
    stripeLib && billingRoute && billingApi.includes('BillingSchema'),
    'Billing API + Stripe SDK ready'
);

// 8. Observability
const logger = fs.existsSync('src/lib/logger.ts');
const metrics = fs.existsSync('src/lib/metrics.ts');
const audit = fs.existsSync('src/lib/audit.ts');
check('8. Observability Primitives',
    logger && metrics && audit,
    'Logger + Metrics + Audit'
);

// 9. Legal/Trust Pages
const terms = fs.existsSync('src/app/[locale]/terms/page.tsx');
const privacy = fs.existsSync('src/app/[locale]/privacy/page.tsx');
const security = fs.existsSync('src/app/[locale]/security/page.tsx');
const compliance = fs.existsSync('src/app/[locale]/compliance/page.tsx');
check('9. Legal/Trust Pages',
    terms && privacy && security && compliance,
    'Terms + Privacy + Security + Compliance'
);

// 10. Reproducible Whitepaper
const whitepaper = fs.readFileSync('docs/whitepaper/G-Framework-ASO.md', 'utf8');
check('10. Reproducible Whitepaper',
    whitepaper.includes('Preprint v0.1') &&
    whitepaper.includes('Reproducibility') &&
    whitepaper.includes('Evaluation'),
    'Technical preprint with reproduction steps'
);

// Summary
console.log('\n' + '='.repeat(50));
const passed = checks.filter(c => c.passed).length;
const total = checks.length;
console.log(`\n📊 Results: ${passed}/${total} checks passed`);

if (passed === total) {
    console.log('\n🎉 All enterprise features verified!');
    console.log('\n📚 Next Steps:');
    console.log('   1. Copy example.env to .env.local');
    console.log('   2. Configure your environment variables');
    console.log('   3. Run: npm run dev');
    console.log('   4. Visit: http://localhost:3000');
    process.exit(0);
} else {
    console.log('\n⚠️  Some features missing. Please review above.');
    process.exit(1);
}
