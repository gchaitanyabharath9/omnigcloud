# SEO, Performance & Observability Implementation Plan

## Status: IN PROGRESS

This document tracks the implementation of comprehensive SEO hardening, performance optimization, observability, and exception handling for the OmniGCloud marketing site.

---

## A) SEO HARDENING ✅ IN PROGRESS

### Completed:

- ✅ Created SEO utilities (`src/lib/seo.ts`)
- ✅ Sitemap exists with marketing pages
- ✅ Root layout has metadataBase, hreflang, OG/Twitter metadata
- ✅ SchemaOrg component exists

### In Progress:

- ⏳ Enhance sitemap with hreflang alternates
- ⏳ Update robots.txt to exclude /app routes
- ⏳ Add unique metadata to each marketing page
- ⏳ Create static OG preview images

### Pending:

- ⏳ Verify all locales (en, es, fr, de, zh, hi, ja, pt)
- ⏳ Test canonical URLs
- ⏳ Validate structured data

---

## B) REDUCE BUNDLE SIZE ⏳ PENDING

### To Implement:

- Dynamic imports for Recharts components
- Memoize chart data transforms
- Remove unused dependencies
- Optimize images with next/image
- Prefer server components

---

## C) IMPROVE LATENCY ⏳ PENDING

### To Implement:

- Add caching headers to GET APIs
- Reduce render-blocking work
- Add loading skeletons for charts
- Cache /api/metrics with short TTL

---

## D) OBSERVABILITY ⏳ PENDING

### To Implement:

- Request tracing with requestId (DONE in api-utils)
- Enhance /api/health endpoint
- Add error reporting hooks
- Performance status widget

---

## E) EXCEPTION HANDLING ✅ DONE

### Completed:

- ✅ AppError utilities exist
- ✅ Standardized API error envelope
- ✅ Safe error handling in api-utils
- ✅ CSRF, rate limiting, validation

### To Add:

- ⏳ Timeout handling with AbortController
- ⏳ Retry logic with exponential backoff
- ⏳ UI error boundaries

---

## Files to Modify

### SEO:

- [x] src/lib/seo.ts (created)
- [ ] src/app/sitemap.ts (enhance)
- [ ] src/app/robots.ts (create/update)
- [ ] src/app/[locale]/\*/page.tsx (add metadata)

### Performance:

- [ ] src/components/dashboard/\* (dynamic imports)
- [ ] src/app/[locale]/dashboard/page.tsx (memoization)
- [ ] src/app/api/metrics/route.ts (caching)

### Observability:

- [ ] src/app/api/health/route.ts (enhance)
- [ ] src/lib/observability.ts (create)

### Exception Handling:

- [ ] src/lib/errors.ts (enhance)
- [ ] src/lib/retry.ts (create)
- [ ] src/components/ErrorBoundary.tsx (create)

---

## Next Steps

1. Complete sitemap enhancement
2. Create robots.txt
3. Add page-specific metadata
4. Implement dynamic imports
5. Add caching headers
6. Enhance health endpoint
7. Add retry logic
8. Create error boundaries

---

**Last Updated**: 2025-12-30
