# HTTP Security Headers Documentation

## Overview

This document describes the HTTP security headers implemented for the OmniGCloud marketing site. These headers protect against common web vulnerabilities and follow industry best practices.

## Implemented Headers

### 1. Strict-Transport-Security (HSTS)

**Value**: `max-age=63072000; includeSubDomains; preload`

**Purpose**: Forces browsers to use HTTPS connections only, preventing protocol downgrade attacks and cookie hijacking.

**Details**:

- `max-age=63072000`: Enforces HTTPS for 2 years (730 days)
- `includeSubDomains`: Applies to all subdomains
- `preload`: Eligible for browser HSTS preload lists

**Rationale**: Ensures all communication with the site is encrypted, protecting user data in transit.

---

### 2. X-Content-Type-Options

**Value**: `nosniff`

**Purpose**: Prevents browsers from MIME-sniffing responses away from the declared content-type.

**Rationale**: Protects against attacks where malicious content is disguised as a different content type (e.g., uploading a JavaScript file disguised as an image).

---

### 3. Referrer-Policy

**Value**: `strict-origin-when-cross-origin`

**Purpose**: Controls how much referrer information is sent with requests.

**Details**:

- Same-origin requests: Send full URL
- Cross-origin requests: Send only origin (no path/query)
- Downgrade (HTTPS → HTTP): Send nothing

**Rationale**: Balances privacy with analytics needs. Prevents leaking sensitive URL parameters to third parties while maintaining useful referrer data for same-origin requests.

---

### 4. Permissions-Policy

**Value**: `camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()`

**Purpose**: Controls which browser features and APIs can be used.

**Details**:

- `camera=()`: Disables camera access
- `microphone=()`: Disables microphone access
- `geolocation=()`: Disables geolocation
- `payment=()`: Disables Payment Request API
- `usb=()`: Disables WebUSB API
- `interest-cohort=()`: Opts out of FLoC (Google's tracking alternative)

**Rationale**: Marketing site doesn't need these sensitive permissions. Disabling them reduces attack surface and improves privacy.

---

### 5. Content-Security-Policy (CSP)

**Current Mode**: `Content-Security-Policy-Report-Only`

**Full Policy**:

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com data:;
img-src 'self' data: blob: https://images.unsplash.com https://*.unsplash.com;
connect-src 'self' https://api.unsplash.com;
media-src 'self';
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'self';
upgrade-insecure-requests;
block-all-mixed-content
```

**Directive Breakdown**:

| Directive                   | Value                                                                   | Purpose                                                                                 |
| --------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `default-src`               | `'self'`                                                                | Default policy: only load resources from same origin                                    |
| `script-src`                | `'self' 'unsafe-inline' 'unsafe-eval'`                                  | Allow scripts from same origin, inline scripts (Next.js hydration), and eval (dev mode) |
| `style-src`                 | `'self' 'unsafe-inline' https://fonts.googleapis.com`                   | Allow styles from same origin, inline styles (CSS-in-JS), and Google Fonts              |
| `font-src`                  | `'self' https://fonts.gstatic.com data:`                                | Allow fonts from same origin, Google Fonts CDN, and data URIs                           |
| `img-src`                   | `'self' data: blob: https://images.unsplash.com https://*.unsplash.com` | Allow images from same origin, data URIs, blobs, and Unsplash                           |
| `connect-src`               | `'self' https://api.unsplash.com`                                       | Allow XHR/fetch to same origin and Unsplash API                                         |
| `media-src`                 | `'self'`                                                                | Restrict audio/video to same origin                                                     |
| `object-src`                | `'none'`                                                                | Disallow plugins (Flash, Java, etc.)                                                    |
| `base-uri`                  | `'self'`                                                                | Restrict `<base>` tag to same origin                                                    |
| `form-action`               | `'self'`                                                                | Restrict form submissions to same origin                                                |
| `frame-ancestors`           | `'self'`                                                                | Prevent clickjacking (only allow framing by same origin)                                |
| `upgrade-insecure-requests` | -                                                                       | Automatically upgrade HTTP requests to HTTPS                                            |
| `block-all-mixed-content`   | -                                                                       | Block mixed content (HTTP resources on HTTPS pages)                                     |

**Why Report-Only Mode?**

The CSP is initially deployed in `Report-Only` mode to:

1. Monitor for violations without breaking functionality
2. Identify any legitimate resources that need to be whitelisted
3. Ensure Next.js features (image optimization, font loading) work correctly
4. Test across all locales and pages

**Enforcement Path**:

To enforce the CSP (after monitoring period):

1. Review browser console for CSP violation reports
2. Update whitelist if needed for legitimate resources
3. In `next.config.ts`, change:
   ```typescript
   key: "Content-Security-Policy-Report-Only";
   ```
   to:
   ```typescript
   key: "Content-Security-Policy";
   ```
4. Deploy and monitor for issues

**Production Hardening**:

For production, consider:

- Removing `'unsafe-eval'` from `script-src` if not needed
- Using nonces or hashes instead of `'unsafe-inline'` for scripts
- Adding a `report-uri` or `report-to` directive for violation reporting

---

### 6. X-Frame-Options

**Value**: `SAMEORIGIN`

**Purpose**: Prevents clickjacking attacks by controlling whether the site can be framed.

**Details**:

- `SAMEORIGIN`: Only allow framing by pages from the same origin

**Note**: This is a legacy header. Modern browsers prefer CSP's `frame-ancestors` directive, but we include both for maximum compatibility.

**Rationale**: Prevents attackers from embedding our site in an iframe to trick users into clicking hidden elements.

---

### 7. X-XSS-Protection

**Value**: `1; mode=block`

**Purpose**: Enables browser's built-in XSS filter (legacy browsers).

**Details**:

- `1`: Enable XSS filter
- `mode=block`: Block page rendering if XSS detected

**Note**: This is a deprecated header. Modern browsers rely on CSP instead. Included for compatibility with older browsers.

**Rationale**: Provides defense-in-depth for older browsers that don't support CSP.

---

## Scope

These headers apply to:

- ✅ All marketing routes (`/[locale]/*`)
- ✅ All supported locales (en, de, es, fr, hi, ja, ko, zh)
- ✅ Static and dynamic pages
- ✅ API routes (if any under marketing)

## Testing

### Verify Headers

Use browser DevTools or command line:

```bash
# Check headers for English homepage
curl -I https://omnigcloud.com/en

# Check headers for German products page
curl -I https://omnigcloud.com/de/products

# Check headers for French pricing page
curl -I https://omnigcloud.com/fr/pricing
```

### Security Scanners

Test with online security scanners:

- [Mozilla Observatory](https://observatory.mozilla.org/)
- [Security Headers](https://securityheaders.com/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)

### Expected Scores

With these headers, you should achieve:

- **Mozilla Observatory**: A+ rating
- **Security Headers**: A rating
- **SSL Labs**: A+ rating (with proper TLS configuration)

## Browser Compatibility

| Header                 | Chrome        | Firefox       | Safari        | Edge          |
| ---------------------- | ------------- | ------------- | ------------- | ------------- |
| HSTS                   | ✅            | ✅            | ✅            | ✅            |
| X-Content-Type-Options | ✅            | ✅            | ✅            | ✅            |
| Referrer-Policy        | ✅            | ✅            | ✅            | ✅            |
| Permissions-Policy     | ✅            | ✅            | ⚠️ Partial    | ✅            |
| CSP                    | ✅            | ✅            | ✅            | ✅            |
| X-Frame-Options        | ✅            | ✅            | ✅            | ✅            |
| X-XSS-Protection       | ⚠️ Deprecated | ⚠️ Deprecated | ⚠️ Deprecated | ⚠️ Deprecated |

## Maintenance

### Regular Reviews

Review security headers:

- **Quarterly**: Check for new security best practices
- **After major updates**: Verify headers still work with new Next.js features
- **When adding external resources**: Update CSP whitelist

### Monitoring CSP Violations

While in Report-Only mode, monitor browser console for messages like:

```
[Report Only] Refused to load the script 'https://example.com/script.js'
because it violates the following Content Security Policy directive: "script-src 'self'"
```

These indicate resources that may need to be whitelisted or removed.

## References

- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [Next.js Security Headers](https://nextjs.org/docs/app/api-reference/next-config-js/headers)

## Changelog

### 2025-12-30

- ✅ Implemented comprehensive security headers
- ✅ Added CSP in Report-Only mode
- ✅ Enhanced Permissions-Policy
- ✅ Added detailed documentation
- ✅ Configured for all marketing routes and locales

---

**Last Updated**: 2025-12-30  
**Maintained By**: Security Team  
**Review Cycle**: Quarterly
