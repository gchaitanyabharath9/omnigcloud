# QA Readiness Guide

## OmniGCloud Marketing Site

**Version**: 1.0  
**Date**: December 30, 2025  
**Status**: Production Ready

---

## 1. AUTOMATED CHECKS

### 1.1 Pre-Deployment Validation

Run these commands before every deployment:

```bash
# Install dependencies (clean install)
npm ci

# Type checking
npm run typecheck

# Linting
npm run lint

# Security audit
npm audit --audit-level=moderate

# Build application
npm run build

# Run tests (if available)
npm test
```

**Expected Results**:

- ✅ All commands exit with code 0
- ✅ No TypeScript errors
- ✅ No ESLint errors
- ✅ No critical/high vulnerabilities
- ✅ Build completes successfully
- ✅ All tests pass

### 1.2 CI/CD Pipeline

The following checks run automatically on every PR:

1. **Secrets Hygiene** (`npm run check:secrets`)
   - Validates no secrets in `NEXT_PUBLIC_*` variables
   - Fails build if violations detected

2. **TypeScript Compilation** (`npm run typecheck`)
   - Ensures type safety across codebase

3. **Build Validation** (`npm run build`)
   - Verifies application builds successfully

4. **Security Audit** (`npm audit`)
   - Checks for dependency vulnerabilities

**GitHub Actions Workflow**: `.github/workflows/security.yml`

---

## 2. MANUAL SMOKE TEST CHECKLIST

### 2.1 Page Navigation (All Locales)

Test in at least 2 locales (en, es):

**Home Page** (`/[locale]`)

- [ ] Page loads without errors
- [ ] All sections visible (hero, features, trust badges)
- [ ] Images load correctly
- [ ] No layout overlap or clipping
- [ ] Scroll works smoothly (PageDown)
- [ ] No console errors

**Products Page** (`/[locale]/products`)

- [ ] Page loads without errors
- [ ] All product cards visible
- [ ] Product links work
- [ ] Charts render (if present)
- [ ] Loading states work
- [ ] No console errors

**Industries Page** (`/[locale]/industries`)

- [ ] Page loads without errors
- [ ] All industry sections visible
- [ ] Content displays correctly
- [ ] No layout issues
- [ ] No console errors

**Use Cases Page** (`/[locale]/use-cases`)

- [ ] Page loads without errors
- [ ] All use case sections visible
- [ ] Content displays correctly
- [ ] No console errors

**Pricing Page** (`/[locale]/pricing`)

- [ ] Page loads without errors
- [ ] Pricing tiers visible
- [ ] CTA buttons work
- [ ] No console errors

**Company Page** (`/[locale]/company`)

- [ ] Page loads without errors
- [ ] Company info displays
- [ ] Team section visible
- [ ] No console errors

**Dashboard Page** (`/[locale]/dashboard`)

- [ ] Page loads without errors
- [ ] All metrics visible
- [ ] Charts render correctly
- [ ] Loading states work
- [ ] Error states work (if API fails)
- [ ] No console errors

### 2.2 Header Navigation

**Desktop**:

- [ ] All menu items visible
- [ ] Dropdowns work correctly
- [ ] Links navigate to correct pages
- [ ] Active state highlights current page
- [ ] Language switcher works
- [ ] Theme toggle works (dark/light)

**Mobile**:

- [ ] Hamburger menu opens/closes
- [ ] All menu items accessible
- [ ] Dropdowns work on mobile
- [ ] No overlap with content
- [ ] Touch interactions work

### 2.3 Forms & Interactions

**Contact Form** (`/[locale]/contact` or embedded)

- [ ] Form renders correctly
- [ ] All fields accept input
- [ ] Validation works (required fields, email format)
- [ ] Honeypot field is hidden
- [ ] Submit button works
- [ ] Success message displays
- [ ] Error messages display correctly
- [ ] CSRF token is included (check network tab)
- [ ] Rate limiting works (try 6+ submissions)

**Newsletter Form** (if present)

- [ ] Form renders correctly
- [ ] Email validation works
- [ ] Submit works
- [ ] Success/error messages display

### 2.4 Charts & Data Visualization

**Dashboard Charts**:

- [ ] Charts render without errors
- [ ] Loading skeleton displays initially
- [ ] Data loads and displays
- [ ] Charts are interactive (hover, tooltips)
- [ ] No layout shift when charts load
- [ ] Error state displays if API fails
- [ ] "Unavailable" message shows gracefully

**Performance Charts** (if present):

- [ ] Line charts render
- [ ] Bar charts render
- [ ] Pie charts render
- [ ] Area charts render
- [ ] All charts have proper labels
- [ ] Tooltips work

### 2.5 Internationalization (i18n)

Test in multiple locales:

**English** (`/en`)

- [ ] All text in English
- [ ] No raw translation keys (e.g., `common.title`)
- [ ] Dates formatted correctly
- [ ] Numbers formatted correctly

**Spanish** (`/es`)

- [ ] All text in Spanish (or fallback to English)
- [ ] No raw translation keys
- [ ] Dates formatted correctly
- [ ] Numbers formatted correctly

**Other Locales** (fr, de, zh, hi, ja, pt)

- [ ] Pages load without errors
- [ ] Text displays (translated or fallback)
- [ ] No raw translation keys

### 2.6 API Endpoints

Test critical API endpoints:

**Health Check** (`/api/health`)

```bash
curl https://omnigcloud.com/api/health
```

- [ ] Returns 200 OK
- [ ] Response includes `status: "ok"`
- [ ] Response includes system info
- [ ] Response includes dependency status
- [ ] No secrets exposed

**CSRF Token** (`/api/csrf`)

```bash
curl https://omnigcloud.com/api/csrf
```

- [ ] Returns 200 OK
- [ ] Response includes CSRF token
- [ ] Cookie is set (check response headers)

**Contact Form** (`/api/contact`)

```bash
# Valid request
curl -X POST https://omnigcloud.com/api/contact \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: <token>" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","message":"Test message"}'
```

- [ ] Returns 200 OK for valid request
- [ ] Returns 403 for missing CSRF token
- [ ] Returns 422 for invalid email
- [ ] Returns 429 after rate limit exceeded
- [ ] Response follows standard envelope format

**Metrics** (`/api/metrics`)

```bash
curl https://omnigcloud.com/api/metrics
```

- [ ] Returns 200 OK
- [ ] Response includes metrics data
- [ ] Response follows standard envelope format

### 2.7 Error Handling

**API Error Responses**:

- [ ] All errors return standard envelope format
- [ ] No stack traces in production responses
- [ ] Error codes are machine-readable
- [ ] Error messages are user-friendly
- [ ] `retryable` flag is set correctly

**UI Error States**:

- [ ] API failures show graceful error messages
- [ ] "Unavailable" state displays for failed data
- [ ] "Try again" buttons work
- [ ] No UI crashes when APIs fail
- [ ] Loading states work correctly

### 2.8 Performance

**Page Load**:

- [ ] First Contentful Paint (FCP) < 1.5s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Time to Interactive (TTI) < 3.5s

**Network**:

- [ ] Images are optimized (WebP/AVIF)
- [ ] Images are lazy-loaded
- [ ] No unnecessary API calls
- [ ] API responses are cached (check headers)

**Bundle Size**:

- [ ] JavaScript bundle < 500KB (gzipped)
- [ ] CSS bundle < 100KB (gzipped)
- [ ] No duplicate dependencies

### 2.9 Security

**Headers**:

```bash
curl -I https://omnigcloud.com
```

- [ ] `Strict-Transport-Security` present
- [ ] `Content-Security-Policy` or `Content-Security-Policy-Report-Only` present
- [ ] `X-Content-Type-Options: nosniff` present
- [ ] `Referrer-Policy` present
- [ ] `Permissions-Policy` present

**CSRF Protection**:

- [ ] POST requests require CSRF token
- [ ] Missing token returns 403
- [ ] Invalid token returns 403
- [ ] Token expires after 24 hours

**Rate Limiting**:

- [ ] Contact form limited to 5 requests/minute
- [ ] Rate limit returns 429 status
- [ ] `Retry-After` header present

**Input Validation**:

- [ ] All inputs validated server-side
- [ ] SQL injection attempts blocked
- [ ] XSS attempts blocked
- [ ] Invalid data returns 422

### 2.10 Accessibility

**Keyboard Navigation**:

- [ ] All interactive elements focusable
- [ ] Focus indicators visible
- [ ] Tab order logical
- [ ] No keyboard traps

**Screen Reader**:

- [ ] Images have alt text
- [ ] Form labels present
- [ ] ARIA labels on charts
- [ ] Semantic HTML used

**Color Contrast**:

- [ ] Text meets WCAG AA standards
- [ ] Interactive elements distinguishable
- [ ] Dark mode has sufficient contrast

---

## 3. VERCEL PREVIEW DEPLOYMENT VALIDATION

### 3.1 Pre-Deployment

Before merging PR:

1. [ ] Check Vercel preview deployment URL
2. [ ] Run smoke tests on preview deployment
3. [ ] Verify environment variables are set
4. [ ] Check build logs for warnings

### 3.2 Post-Deployment

After deployment to production:

1. [ ] Verify production URL loads
2. [ ] Run smoke tests on production
3. [ ] Check error monitoring (Sentry/Vercel Analytics)
4. [ ] Monitor for increased error rates
5. [ ] Verify all locales work

### 3.3 Rollback Plan

If issues detected:

1. Revert deployment in Vercel dashboard
2. Investigate issue in preview deployment
3. Fix and redeploy
4. Re-run validation

---

## 4. TESTING COMMANDS

### 4.1 Local Development

```bash
# Start development server
npm run dev

# Open browser
open http://localhost:3000

# Run in different locales
open http://localhost:3000/en
open http://localhost:3000/es
open http://localhost:3000/fr
```

### 4.2 Production Build

```bash
# Build for production
npm run build

# Start production server
npm run start

# Open browser
open http://localhost:3000
```

### 4.3 Type Checking

```bash
# Run TypeScript compiler
npm run typecheck

# Or directly
npx tsc --noEmit
```

### 4.4 Linting

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

### 4.5 Security Checks

```bash
# Check secrets hygiene
npm run check:secrets

# Run security audit
npm audit

# Check for critical vulnerabilities only
npm audit --audit-level=critical
```

---

## 5. COMMON ISSUES & TROUBLESHOOTING

### 5.1 Build Failures

**Issue**: TypeScript errors

- **Solution**: Run `npm run typecheck` and fix type errors

**Issue**: Missing environment variables

- **Solution**: Check `.env.local` and `example.env`

**Issue**: Secrets hygiene failure

- **Solution**: Remove forbidden patterns from `NEXT_PUBLIC_*` variables

### 5.2 Runtime Errors

**Issue**: API returns 500 errors

- **Solution**: Check server logs, verify environment variables

**Issue**: CSRF token errors

- **Solution**: Ensure `/api/csrf` endpoint is accessible, check cookie settings

**Issue**: Rate limiting too aggressive

- **Solution**: Adjust limits in `src/lib/rate-limit.ts`

### 5.3 UI Issues

**Issue**: Charts not rendering

- **Solution**: Check browser console, verify API responses

**Issue**: Layout overlap

- **Solution**: Check `scroll-margin-top` CSS, verify sticky header height

**Issue**: Translation keys showing

- **Solution**: Check `messages/[locale].json`, add missing keys

---

## 6. RELEASE CHECKLIST

### 6.1 Pre-Release

- [ ] All automated checks pass
- [ ] Manual smoke tests complete
- [ ] Security audit clean
- [ ] Performance metrics acceptable
- [ ] Accessibility checks pass
- [ ] Documentation updated

### 6.2 Release

- [ ] Create release branch
- [ ] Update version in `package.json`
- [ ] Tag release in Git
- [ ] Deploy to Vercel
- [ ] Verify production deployment

### 6.3 Post-Release

- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Verify all locales work
- [ ] Monitor user feedback
- [ ] Update changelog

---

## 7. MONITORING & OBSERVABILITY

### 7.1 Metrics to Monitor

**Application Metrics**:

- Request rate (requests/second)
- Error rate (errors/total requests)
- Latency (p50, p95, p99)
- Availability (uptime percentage)

**Security Metrics**:

- Rate limit hits (429 responses)
- CSRF failures (403 responses)
- Bot detections (honeypot hits)
- Failed validations (422 responses)

**Performance Metrics**:

- Page load time
- API response time
- Bundle size
- Cache hit rate

### 7.2 Alerting

Set up alerts for:

- Error rate > 5%
- Latency p95 > 1000ms
- Availability < 99.9%
- Critical vulnerabilities detected

---

## 8. DOCUMENTATION

### 8.1 Required Documentation

- [ ] README.md updated
- [ ] API documentation current
- [ ] Architecture diagrams current
- [ ] Security documentation current
- [ ] Deployment guide current

### 8.2 Code Documentation

- [ ] Complex functions have comments
- [ ] Public APIs have JSDoc
- [ ] Configuration options documented
- [ ] Error codes documented

---

## 9. CONTACT & ESCALATION

### 9.1 Issue Reporting

**Security Issues**: security@omnigcloud.com  
**Bug Reports**: GitHub Issues  
**General Support**: support@omnigcloud.com

### 9.2 Escalation Path

1. **Developer**: Fix and test locally
2. **Tech Lead**: Review and approve
3. **DevOps**: Deploy to staging
4. **QA**: Validate in staging
5. **Product**: Approve for production
6. **DevOps**: Deploy to production

---

## 10. APPENDIX

### 10.1 Standard API Response Envelope

```typescript
{
    requestId: string;        // UUID for tracing
    timestamp: string;        // ISO 8601 timestamp
    status: 'ok' | 'error';  // Success/failure
    data?: T;                // Response data (success)
    error?: {                // Error details (failure)
        code: string;        // Machine-readable code
        message: string;     // Human-readable message
        retryable: boolean;  // Whether client should retry
    }
}
```

### 10.2 Error Codes

| Code                     | HTTP Status | Retryable | Description                |
| ------------------------ | ----------- | --------- | -------------------------- |
| `VALIDATION_ERROR`       | 400/422     | No        | Invalid input data         |
| `AUTH_ERROR`             | 401         | No        | Authentication failed      |
| `CSRF_TOKEN_INVALID`     | 403         | Yes       | CSRF token missing/invalid |
| `NOT_FOUND`              | 404         | No        | Resource not found         |
| `RATE_LIMIT_EXCEEDED`    | 429         | Yes       | Too many requests          |
| `INTERNAL_SERVER_ERROR`  | 500         | Yes       | Unexpected server error    |
| `EXTERNAL_SERVICE_ERROR` | 502         | Yes       | External service failed    |
| `TIMEOUT_ERROR`          | 504         | Yes       | Request timed out          |

### 10.3 Environment Variables

**Required**:

- `NEXT_PUBLIC_SITE_URL`: Site URL for metadata
- `AUTH_SECRET`: NextAuth secret
- `CSRF_SECRET`: CSRF token signing secret

**Optional**:

- `REDIS_URL`: Redis connection URL (production)
- `REDIS_TOKEN`: Redis authentication token
- `VAULT_ADDR`: HashiCorp Vault address
- `VAULT_TOKEN`: Vault authentication token

---

**Document Version**: 1.0  
**Last Updated**: December 30, 2025  
**Next Review**: January 30, 2026  
**Owner**: QA Team
