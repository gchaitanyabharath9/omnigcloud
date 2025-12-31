# Security Headers Quick Reference

## Current Configuration

All marketing routes (`/[locale]/*`) have the following security headers:

```http
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
Content-Security-Policy-Report-Only: [see full policy below]
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
```

## CSP Enforcement Checklist

**Current Status**: 🟡 Report-Only Mode

**To Enforce CSP**:

1. ✅ Monitor browser console for CSP violations (1-2 weeks)
2. ✅ Verify all pages load correctly across all locales
3. ✅ Check that Next.js features work (images, fonts, scripts)
4. ⏳ Update whitelist if needed for legitimate resources
5. ⏳ Change `Content-Security-Policy-Report-Only` → `Content-Security-Policy` in `next.config.ts`
6. ⏳ Deploy to production
7. ⏳ Monitor for issues

## Quick Test

```bash
# Test headers are applied
curl -I http://localhost:3000/en | grep -i "strict-transport"

# Expected output:
# Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

## Security Score Targets

- Mozilla Observatory: **A+**
- Security Headers: **A**
- SSL Labs: **A+**

## Files Modified

- `next.config.ts` - Security headers configuration
- `docs/security-headers.md` - Full documentation

---

For complete details, see [security-headers.md](./security-headers.md)
