# Architecture Decision Records (ADRs)
## OmniGCloud Security Framework

This document contains the key architecture decisions made during the design and implementation of the security framework.

---

## ADR-001: Environment-Adaptive Rate Limiting

**Status**: Accepted  
**Date**: 2025-12-15  
**Decision Makers**: Security Architecture Team

### Context

Rate limiting is essential for protecting API endpoints from abuse, but traditional implementations require external infrastructure (Redis, Memcached) which creates friction in local development environments. Developers either need to run additional services locally or skip rate limiting entirely during development, leading to environment parity issues.

### Decision

Implement a polymorphic rate limiter interface with three implementations:

1. **InMemoryRateLimiter**: Uses JavaScript Map for local development
2. **RedisRateLimiter**: Uses Upstash Redis for production
3. **NoopRateLimiter**: Graceful fallback when rate limiting is disabled

The system automatically selects the appropriate implementation based on environment configuration:

```typescript
export function getRateLimiter(): RateLimiter {
    if (config.env === 'local' || process.env.NODE_ENV === 'development') {
        return new InMemoryRateLimiter();
    }
    if (config.features.enableRateLimit && process.env.REDIS_URL) {
        return new RedisRateLimiter();
    }
    return new NoopRateLimiter();
}
```

### Alternatives Considered

1. **Redis Only**: Require Redis in all environments
   - **Rejected**: Creates unnecessary complexity for local development
   
2. **No Rate Limiting in Development**: Skip rate limiting locally
   - **Rejected**: Breaks environment parity, bugs may not surface until production

3. **Conditional Code**: Use if/else throughout application
   - **Rejected**: Violates DRY principle, error-prone

### Consequences

**Positive**:
- Zero-configuration local development
- Perfect environment parity (same code paths)
- Easy to test rate limiting behavior locally
- Graceful degradation in production if Redis fails

**Negative**:
- In-memory rate limiter doesn't work across multiple instances (acceptable for local dev)
- Slightly more complex implementation (three classes vs one)

**Neutral**:
- Requires environment detection logic
- Interface must be generic enough for all implementations

### Implementation

- **File**: `src/lib/rate-limit.ts`
- **Lines of Code**: ~150
- **Dependencies**: `@upstash/redis` (production only)

---

## ADR-002: Build-Time Secrets Hygiene Validation

**Status**: Accepted  
**Date**: 2025-12-18  
**Decision Makers**: Security Architecture Team, DevOps Team

### Context

Next.js exposes environment variables prefixed with `NEXT_PUBLIC_` to the client bundle. Accidentally using this prefix for secrets (API keys, tokens, passwords) is a common vulnerability that often goes undetected until production, leading to security incidents.

Traditional approaches rely on:
- Manual code review (error-prone, doesn't scale)
- Runtime detection (too late, secret already exposed)
- Developer discipline (unreliable)

### Decision

Implement a pre-build validation script that:
1. Scans all environment variables and `.env` files
2. Detects forbidden patterns in `NEXT_PUBLIC_*` variable names
3. Fails the build if violations are found
4. Provides clear error messages with remediation guidance

Forbidden patterns include: `secret`, `key`, `token`, `password`, `private`, `credential`

Integrated into npm build lifecycle via `prebuild` script:
```json
{
  "scripts": {
    "prebuild": "node scripts/check-secrets-hygiene.js",
    "build": "next build"
  }
}
```

### Alternatives Considered

1. **Runtime Validation**: Check at application startup
   - **Rejected**: Too late, secret already in bundle

2. **ESLint Plugin**: Static analysis of code
   - **Rejected**: Doesn't catch environment variables, only code

3. **Manual Review**: Code review process
   - **Rejected**: Human error, doesn't scale

4. **CI/CD Only**: Run check in CI pipeline
   - **Rejected**: Developers should catch errors before pushing

### Consequences

**Positive**:
- Prevents entire class of vulnerabilities at build time
- Zero runtime overhead
- Clear error messages guide developers to fix
- Works in both local and CI/CD environments
- Enforces security best practices automatically

**Negative**:
- Adds ~1-2 seconds to build time
- May require exceptions for legitimate public keys (e.g., `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`)
- Developers must understand NEXT_PUBLIC_ semantics

**Neutral**:
- Requires maintaining list of forbidden patterns
- May need updates as new secret types emerge

### Implementation

- **File**: `scripts/check-secrets-hygiene.js`
- **Lines of Code**: ~150
- **Dependencies**: Node.js built-ins (fs, path)
- **Documentation**: `docs/secrets-hygiene.md`

---

## ADR-003: Self-Contained CSRF Tokens with Embedded Expiration

**Status**: Accepted  
**Date**: 2025-12-20  
**Decision Makers**: Security Architecture Team

### Context

CSRF protection requires generating, storing, and validating tokens. Traditional approaches use:
1. **Server-side session storage**: Requires database or Redis
2. **Stateless tokens without expiration**: Security risk (tokens never expire)
3. **Separate expiration tracking**: Requires additional storage

For a stateless, scalable architecture, we need CSRF tokens that:
- Don't require database lookups
- Have built-in expiration
- Are cryptographically secure
- Can be validated quickly

### Decision

Implement self-contained CSRF tokens with structure:
```
{randomBytes}.{timestamp}.{signature}
```

Where:
- `randomBytes`: 32 bytes of cryptographically secure random data
- `timestamp`: Unix timestamp (milliseconds) when token was created
- `signature`: HMAC-SHA256(randomBytes + timestamp, secret)

Validation process:
1. Split token into components
2. Verify HMAC signature
3. Check timestamp (reject if > 24 hours old)
4. Compare with cookie value (double-submit pattern)

### Alternatives Considered

1. **Database-Backed Tokens**: Store tokens in database
   - **Rejected**: Requires database query on every request, doesn't scale

2. **Redis-Backed Tokens**: Store tokens in Redis
   - **Rejected**: Adds external dependency, single point of failure

3. **JWT Tokens**: Use JSON Web Tokens
   - **Rejected**: Overkill for CSRF, larger payload size

4. **Simple Random Tokens**: No expiration or signature
   - **Rejected**: Security risk, tokens never expire

### Consequences

**Positive**:
- Zero database queries for CSRF validation
- Built-in expiration (no separate tracking needed)
- Cryptographic integrity (HMAC signature)
- Scales horizontally (no shared state)
- Fast validation (<1ms)

**Negative**:
- Tokens cannot be revoked before expiration
- Slightly larger token size (~100 bytes vs ~32 bytes)
- Requires secure secret management

**Neutral**:
- 24-hour expiration is fixed (could be configurable)
- Timestamp precision is milliseconds (could be seconds)

### Implementation

- **File**: `src/lib/csrf.ts`
- **Lines of Code**: ~200
- **Dependencies**: Node.js crypto (built-in)
- **Cookie Configuration**: httpOnly, Secure, SameSite=Lax

---

## ADR-004: Composable Form Security with Silent Bot Rejection

**Status**: Accepted  
**Date**: 2025-12-22  
**Decision Makers**: Security Architecture Team, Product Team

### Context

Bot and spam detection for web forms typically requires multiple techniques:
- Honeypot fields
- Rate limiting
- CAPTCHA
- Time-to-submit analysis
- Payload size limits

Traditional implementations:
- Scatter these checks across multiple files
- Inconsistent error handling
- Difficult to test
- Hard to configure per-endpoint

Additionally, when bots are detected, typical responses:
- Return error (bot knows it was detected, adapts)
- Block IP (bots rotate IPs)
- Show CAPTCHA (degrades UX for legitimate users)

### Decision

Implement a composable form security framework with:

1. **Unified Validation Function**:
```typescript
validateFormSecurity(request, body, config)
```

2. **Configurable Security Policies**:
```typescript
{
    maxPayloadSize: 10 * 1024,
    minSubmitTime: 2000,
    maxSubmitTime: 300000,
    honeypotFields: ['website']
}
```

3. **Silent Rejection Pattern**:
- When bot detected (honeypot filled or too-fast submission)
- Return 200 OK with success message
- Discard submission silently
- Log attempt (without user data)

### Alternatives Considered

1. **Per-Endpoint Implementation**: Implement checks in each API route
   - **Rejected**: Code duplication, inconsistent behavior

2. **Middleware-Only**: Implement all checks in middleware
   - **Rejected**: Less flexible, harder to configure per-endpoint

3. **Error Response for Bots**: Return 403 or 429 when bot detected
   - **Rejected**: Bots learn and adapt, triggers retry storms

4. **CAPTCHA for All**: Show CAPTCHA on every form
   - **Rejected**: Degrades UX for legitimate users

### Consequences

**Positive**:
- Single function coordinates all security checks
- Configurable per-endpoint
- Silent rejection prevents bot adaptation
- Reduces code from ~100 lines per endpoint to ~10 lines
- Easy to test (single function)
- Comprehensive logging without PII

**Negative**:
- Silent rejection means no feedback to legitimate users who accidentally trigger detection
- Sophisticated bots may eventually detect silent rejection
- Requires careful tuning of time-to-submit thresholds

**Neutral**:
- Honeypot field names must be chosen carefully
- Time thresholds may need adjustment based on form complexity

### Implementation

- **File**: `src/lib/form-security.ts`
- **Lines of Code**: ~250
- **Dependencies**: None
- **Integration**: Used in `/api/contact`, ready for other forms

---

## ADR-005: Standardized API Error Envelope with Retry Semantics

**Status**: Accepted  
**Date**: 2025-12-23  
**Decision Makers**: API Architecture Team, Frontend Team

### Context

Inconsistent error responses across API endpoints lead to:
- Complex client-side error handling
- Inability to implement intelligent retry logic
- Difficult debugging (no request correlation)
- Inconsistent user experience

Traditional approaches:
- Each endpoint returns different error format
- No guidance on whether errors are retryable
- No request tracing across services
- Stack traces exposed in production

### Decision

Implement standardized API response envelope for all endpoints:

```typescript
{
    requestId: string;        // UUID for request tracing
    timestamp: string;        // ISO 8601 timestamp
    status: 'ok' | 'error';  // Success/failure indicator
    data?: T;                // Response data (success only)
    error?: {                // Error details (failure only)
        code: string;        // Machine-readable error code
        message: string;     // Human-readable message
        retryable: boolean;  // Whether client should retry
    }
}
```

Error codes follow pattern: `VALIDATION_ERROR`, `CSRF_TOKEN_INVALID`, `TOO_MANY_REQUESTS`, etc.

Retryable flag indicates:
- `true`: Transient failure (network error, 429, 503, timeout)
- `false`: Permanent failure (validation error, auth error, 404)

### Alternatives Considered

1. **HTTP Status Only**: Rely on HTTP status codes
   - **Rejected**: Insufficient information for client logic

2. **Problem Details (RFC 7807)**: Use standard problem details format
   - **Rejected**: More complex than needed, less TypeScript-friendly

3. **GraphQL-Style Errors**: Separate errors array
   - **Rejected**: Not using GraphQL, adds complexity

4. **Per-Endpoint Formats**: Let each endpoint define its own format
   - **Rejected**: Inconsistent, hard to maintain

### Consequences

**Positive**:
- Consistent error handling across all endpoints
- Enables intelligent client-side retry logic
- Request ID enables distributed tracing
- Type-safe with TypeScript
- Clear separation of success/failure cases
- No stack traces in production

**Negative**:
- Slightly larger response size (~50 bytes overhead)
- Requires discipline to use consistently
- Retryable flag requires careful consideration per error type

**Neutral**:
- Error codes must be documented
- Timestamp format is ISO 8601 (could be Unix timestamp)

### Implementation

- **File**: `src/lib/api-utils.ts`
- **Lines of Code**: ~100
- **Usage**: All API routes use `createSuccessResponse()` and `createErrorResponse()`
- **Documentation**: `docs/api-security.md`

---

## ADR-006: Content Security Policy in Report-Only Mode

**Status**: Accepted  
**Date**: 2025-12-24  
**Decision Makers**: Security Architecture Team, Frontend Team

### Context

Content Security Policy (CSP) is a powerful security mechanism that prevents XSS and data injection attacks. However, implementing CSP can break existing functionality:
- Third-party scripts may be blocked
- Inline styles may be blocked
- Eval-based code may be blocked

Traditional approaches:
- Deploy CSP in enforcing mode immediately (high risk of breaking changes)
- Never deploy CSP (miss security benefits)
- Extensive pre-deployment testing (time-consuming, may miss edge cases)

### Decision

Deploy CSP in **report-only mode** initially:

```typescript
'Content-Security-Policy-Report-Only': [comprehensive directives]
```

Process:
1. Deploy in report-only mode
2. Monitor violation reports (30-60 days)
3. Adjust whitelist based on violations
4. Switch to enforcing mode when violations are minimal

CSP directives include:
- `default-src 'self'`
- `script-src 'self' 'unsafe-inline' 'unsafe-eval'` (to be tightened)
- `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`
- `img-src 'self' data: blob: https://images.unsplash.com`

### Alternatives Considered

1. **Enforcing Mode Immediately**: Deploy CSP in enforcing mode
   - **Rejected**: High risk of breaking production

2. **No CSP**: Don't implement CSP
   - **Rejected**: Misses important security benefits

3. **Gradual Rollout**: Start with permissive CSP, tighten over time
   - **Rejected**: Similar to report-only but less visibility

4. **Nonce-Based CSP**: Use nonces for inline scripts
   - **Deferred**: Future enhancement after report-only period

### Consequences

**Positive**:
- Zero risk of breaking production
- Visibility into all CSP violations
- Data-driven decision making for whitelist
- Clear path to enforcement
- Can identify and fix violations before enforcement

**Negative**:
- CSP benefits not realized until enforcing mode
- Requires monitoring violation reports
- Transition period (30-60 days) before full protection

**Neutral**:
- Report endpoint needed for violation reports
- Violation reports may contain sensitive URLs

### Implementation

- **File**: `next.config.ts`
- **Header**: `Content-Security-Policy-Report-Only`
- **Enforcement Path**: Change header key to `Content-Security-Policy`
- **Documentation**: `docs/security-headers.md`

---

## ADR-007: Endpoint-Specific Rate Limiting Configuration

**Status**: Accepted  
**Date**: 2025-12-25  
**Decision Makers**: API Architecture Team, Security Team

### Context

Different API endpoints have different usage patterns and abuse risks:
- Contact forms: Low volume, high abuse risk
- Metrics endpoints: High volume, low abuse risk
- Health checks: Very high volume, no abuse risk

One-size-fits-all rate limiting either:
- Over-restricts legitimate users (if limit is too low)
- Under-protects sensitive endpoints (if limit is too high)

Traditional approaches:
- Single global rate limit (inflexible)
- Per-endpoint rate limiting code (duplication)
- No rate limiting (vulnerable to abuse)

### Decision

Implement declarative, endpoint-specific rate limiting configuration:

```typescript
export const RATE_LIMITS: Record<string, RateLimitConfig> = {
    '/api/contact': { limit: 5, windowMs: 60000 },      // Strict
    '/api/leads': { limit: 20, windowMs: 60000 },       // Moderate
    '/api/metrics': { limit: 100, windowMs: 60000 },    // Light
    '/api/health': { limit: 200, windowMs: 60000 },     // Very Light
    'default': { limit: 50, windowMs: 60000 }           // Standard
};
```

Rate limiter automatically selects appropriate limit based on request path.

### Alternatives Considered

1. **Global Rate Limit**: Single limit for all endpoints
   - **Rejected**: Inflexible, doesn't match usage patterns

2. **Per-Endpoint Code**: Implement rate limiting in each route
   - **Rejected**: Code duplication, hard to maintain

3. **Middleware Configuration**: Configure in middleware
   - **Rejected**: Less flexible, harder to test

4. **Dynamic Limits**: Adjust limits based on traffic patterns
   - **Deferred**: Future enhancement, requires ML/analytics

### Consequences

**Positive**:
- Fine-grained control per endpoint
- Centralized configuration (easy to audit)
- Type-safe with TypeScript
- Easy to add new endpoints
- Clear documentation of limits

**Negative**:
- Requires maintaining configuration
- Limits are static (not adaptive)
- May need tuning based on production traffic

**Neutral**:
- Window size is fixed at 60 seconds (could be configurable)
- Limits are per-IP (could be per-user with authentication)

### Implementation

- **File**: `src/lib/rate-limit.ts`
- **Configuration**: `RATE_LIMITS` constant
- **Integration**: `withApiHarden()` passes endpoint to rate limiter
- **Documentation**: `docs/rate-limiting.md`

---

## Summary

These ADRs document the key architectural decisions that shaped the security framework. Each decision was made with careful consideration of alternatives and trade-offs, balancing security, performance, developer experience, and maintainability.

**Key Themes**:
1. **Environment Parity**: Consistent behavior from local to production
2. **Defense-in-Depth**: Multiple independent security layers
3. **Developer Experience**: Security that doesn't impede development
4. **Observability**: Comprehensive logging without exposing sensitive data
5. **Fail-Safe Defaults**: Secure by default, explicit opt-out required

---

**Document Control**:
- Version: 1.0
- Last Updated: December 30, 2025
- Next Review: March 30, 2026
- Owner: Security Architecture Team
