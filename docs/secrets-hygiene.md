# Secrets Hygiene Documentation

## Overview

This document outlines the strict rules and best practices for managing environment variables and secrets in the OmniGCloud application. Following these guidelines prevents accidental exposure of sensitive data in the client bundle.

## Critical Rules

### ❌ NEVER Do This

```bash
# ❌ WRONG - Secret in NEXT_PUBLIC_ variable
NEXT_PUBLIC_API_KEY=sk_dummy_abc123...
NEXT_PUBLIC_SECRET_TOKEN=super_secret_value
NEXT_PUBLIC_DATABASE_PASSWORD=my_password
NEXT_PUBLIC_STRIPE_SECRET_KEY=sk_dummy_test_...
```

**Why?** All `NEXT_PUBLIC_*` variables are embedded in the client JavaScript bundle and visible to anyone.

### ✅ ALWAYS Do This

```bash
# ✅ CORRECT - Server-only secrets (no NEXT_PUBLIC_ prefix)
API_KEY=sk_dummy_abc123...
SECRET_TOKEN=super_secret_value
DATABASE_PASSWORD=my_password
STRIPE_SECRET_KEY=sk_dummy_test_...

# ✅ CORRECT - Public values with NEXT_PUBLIC_ prefix
NEXT_PUBLIC_SITE_URL=https://omnigcloud.com
NEXT_PUBLIC_API_URL=https://api.omnigcloud.com
```

## Environment Variable Types

### 1. Public Variables (`NEXT_PUBLIC_*`)

**Exposed to**: Client browser (JavaScript bundle)

**Use for**:
- Public URLs
- Public configuration
- Non-sensitive feature flags
- Public API keys (explicitly designed to be public)

**Examples**:
```bash
NEXT_PUBLIC_SITE_URL=https://omnigcloud.com
NEXT_PUBLIC_API_URL=https://api.omnigcloud.com
NEXT_PUBLIC_GRAFANA_URL=https://grafana.omnigcloud.com
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_XXXXXXXXXXXXXXXXXXXXXXXX
```

### 2. Server-Only Variables (No prefix)

**Exposed to**: Server-side code only

**Use for**:
- API keys and secrets
- Database credentials
- Authentication secrets
- Encryption keys
- OAuth client secrets
- Any sensitive configuration

**Examples**:
```bash
AUTH_SECRET=your_auth_secret_here
STRIPE_SECRET_KEY=sk_dummy_XXXXXXXXXXXXXXXXXXXXXXXX
DATABASE_URL=postgresql://user:password@host:5432/db
REDIS_TOKEN=your_redis_token
RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXXXXXX
CSRF_SECRET=your_csrf_secret_here
```

## Forbidden Patterns

The build-time check will **FAIL** if any `NEXT_PUBLIC_*` variable contains these patterns:

| Pattern | Example | Why Forbidden |
|---------|---------|---------------|
| `secret` | `NEXT_PUBLIC_API_SECRET` | Indicates sensitive value |
| `key` | `NEXT_PUBLIC_SECRET_KEY` | Likely an API key |
| `token` | `NEXT_PUBLIC_AUTH_TOKEN` | Authentication token |
| `password` | `NEXT_PUBLIC_DB_PASSWORD` | Credential |
| `private` | `NEXT_PUBLIC_PRIVATE_KEY` | Private key |
| `credential` | `NEXT_PUBLIC_CREDENTIALS` | Sensitive data |
| `jwt_secret` | `NEXT_PUBLIC_JWT_SECRET` | Signing key |
| `csrf_secret` | `NEXT_PUBLIC_CSRF_SECRET` | Security token |

### Allowed Exceptions

Some public keys are explicitly designed to be public:

```bash
# ✅ These are OK (legitimate public keys)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
NEXT_PUBLIC_MAPBOX_TOKEN=...
```

## Build-Time Validation

### Automatic Check

Every build automatically runs secrets hygiene validation:

```bash
npm run build
# Runs: node scripts/check-secrets-hygiene.js
```

### Manual Check

```bash
npm run check:secrets
```

### Check Output

**Success**:
```
🔒 Checking secrets hygiene...

✅ NEXT_PUBLIC_SITE_URL - OK
✅ NEXT_PUBLIC_API_URL - OK
✅ NEXT_PUBLIC_RECAPTCHA_SITE_KEY - Allowed exception

📊 Results:

✅ No secrets hygiene issues found!
```

**Failure**:
```
🔒 Checking secrets hygiene...

❌ ERRORS (Build will fail):

  ❌ Environment variable name contains forbidden pattern: NEXT_PUBLIC_API_SECRET
  ❌ Found forbidden NEXT_PUBLIC_ variable in .env.local:15: NEXT_PUBLIC_SECRET_KEY

❌ Secrets hygiene check FAILED!

Fix the errors above before building.

Guidelines:
  - Never use NEXT_PUBLIC_ prefix for secrets
  - Server-only secrets should NOT have NEXT_PUBLIC_ prefix
  - See docs/secrets-hygiene.md for details
```

## How Next.js Handles Environment Variables

### Server-Side

```typescript
// ✅ Available on server
process.env.AUTH_SECRET
process.env.DATABASE_URL
process.env.STRIPE_SECRET_KEY
```

### Client-Side

```typescript
// ✅ Available on client (embedded in bundle)
process.env.NEXT_PUBLIC_SITE_URL
process.env.NEXT_PUBLIC_API_URL

// ❌ NOT available on client (undefined)
process.env.AUTH_SECRET
process.env.DATABASE_URL
```

## Common Mistakes

### Mistake 1: Exposing API Keys

```bash
# ❌ WRONG
NEXT_PUBLIC_STRIPE_SECRET_KEY=sk_dummy_...

# ✅ CORRECT
STRIPE_SECRET_KEY=sk_dummy_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### Mistake 2: Exposing Auth Secrets

```bash
# ❌ WRONG
NEXT_PUBLIC_AUTH_SECRET=my_secret

# ✅ CORRECT
AUTH_SECRET=my_secret
```

### Mistake 3: Exposing Database Credentials

```bash
# ❌ WRONG
NEXT_PUBLIC_DATABASE_URL=postgresql://user:pass@host/db

# ✅ CORRECT
DATABASE_URL=postgresql://user:pass@host/db
```

## Best Practices

### 1. Use Descriptive Names

```bash
# ✅ Clear purpose
AUTH_SECRET=...
STRIPE_SECRET_KEY=...
DATABASE_PASSWORD=...

# ❌ Ambiguous
SECRET=...
KEY=...
PASS=...
```

### 2. Generate Strong Secrets

```bash
# Generate cryptographically secure secrets
openssl rand -base64 32

# Example output
AUTH_SECRET=Kx7vN2mP9qR4sT6uV8wX0yZ1aB3cD5eF7gH9iJ1kL3mN5oP7qR9sT1uV3wX5yZ7
```

### 3. Never Commit Secrets

```bash
# ✅ Add to .gitignore
.env
.env.local
.env.production
.env.*.local

# ✅ Commit example file (no real secrets)
example.env
```

### 4. Use Environment-Specific Files

```bash
.env                # Shared defaults (no secrets)
.env.local          # Local development (gitignored)
.env.production     # Production (never committed)
```

### 5. Document Public vs Private

```bash
# ----------------------------------------------------------------------------
# 🌐 PUBLIC VARIABLES (Exposed to Client Browser)
# ----------------------------------------------------------------------------
NEXT_PUBLIC_SITE_URL=https://omnigcloud.com

# ----------------------------------------------------------------------------
# 🔒 SERVER-ONLY VARIABLES (Never Exposed to Client)
# ----------------------------------------------------------------------------
AUTH_SECRET=your_secret_here
```

## Verification Checklist

Before deploying, verify:

- [ ] No `NEXT_PUBLIC_*` variables contain secrets
- [ ] All API keys use server-only variables
- [ ] All passwords use server-only variables
- [ ] All tokens use server-only variables
- [ ] Build passes secrets hygiene check
- [ ] `.env` files are in `.gitignore`
- [ ] `example.env` has no real secrets

## Client-Side Access Patterns

### ❌ WRONG: Trying to Access Server Secrets

```typescript
'use client';

export default function MyComponent() {
    // ❌ This will be undefined on client
    const secret = process.env.AUTH_SECRET;
    
    // ❌ This will fail
    const apiKey = process.env.STRIPE_SECRET_KEY;
}
```

### ✅ CORRECT: Using Public Variables

```typescript
'use client';

export default function MyComponent() {
    // ✅ This works (public variable)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    
    // ✅ This works (public variable)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
}
```

### ✅ CORRECT: Server-Side API Calls

```typescript
// Server component or API route
export async function POST(request: Request) {
    // ✅ Server-only secret (safe)
    const apiKey = process.env.STRIPE_SECRET_KEY;
    
    // Use secret to call external API
    const response = await fetch('https://api.stripe.com/...', {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    });
}
```

## Security Implications

### Exposed Secrets Can Lead To:

1. **Unauthorized API Access**: Attackers use your API keys
2. **Data Breaches**: Access to databases or services
3. **Financial Loss**: Abuse of payment APIs
4. **Account Takeover**: Compromise of authentication
5. **Service Disruption**: Malicious use of your resources

### Real-World Example

```bash
# ❌ Developer accidentally commits this
NEXT_PUBLIC_STRIPE_SECRET_KEY=sk_dummy_abc123...

# Result:
# - Secret is in client bundle
# - Anyone can view source and extract it
# - Attacker uses key to make charges
# - Company loses thousands of dollars
```

## Monitoring

### Check Client Bundle

Inspect the client bundle to verify no secrets are exposed:

```bash
# Build the app
npm run build

# Search for potential secrets in build output
grep -r "sk_live" .next/static/
grep -r "sk_test" .next/static/
```

### Audit Environment Variables

```bash
# List all NEXT_PUBLIC_ variables
env | grep NEXT_PUBLIC_

# Verify none contain secrets
npm run check:secrets
```

## Troubleshooting

### Issue: Build Fails with Secrets Error

**Error**:
```
❌ Environment variable name contains forbidden pattern: NEXT_PUBLIC_API_KEY
```

**Solution**:
1. Remove `NEXT_PUBLIC_` prefix from the variable
2. Update code to use server-side access
3. Re-run build

### Issue: Variable Undefined on Client

**Problem**:
```typescript
// Returns undefined
const value = process.env.MY_VARIABLE;
```

**Solution**:
```typescript
// Add NEXT_PUBLIC_ prefix (only if not a secret!)
const value = process.env.NEXT_PUBLIC_MY_VARIABLE;
```

### Issue: Need Secret on Client

**Problem**: Need to use API key on client-side

**Solution**: **DON'T!** Instead:
1. Create server-side API route
2. Client calls your API route
3. Server uses secret to call external API
4. Server returns result to client

```typescript
// ✅ CORRECT Pattern
// Client code
const response = await fetch('/api/my-endpoint');

// Server code (API route)
export async function GET() {
    const apiKey = process.env.MY_SECRET_KEY;
    const data = await externalAPI(apiKey);
    return Response.json(data);
}
```

## Compliance

Following these guidelines helps meet:

- **OWASP Top 10**: Sensitive Data Exposure prevention
- **PCI DSS**: Secure key management
- **SOC 2**: Access control and data protection
- **GDPR**: Data security measures

## Changelog

### 2025-12-30
- ✅ Created secrets hygiene documentation
- ✅ Implemented build-time validation
- ✅ Updated example.env with clear separation
- ✅ Added automated checks to build process

---

**Last Updated**: 2025-12-30  
**Maintained By**: Security Team  
**Review Cycle**: Quarterly
