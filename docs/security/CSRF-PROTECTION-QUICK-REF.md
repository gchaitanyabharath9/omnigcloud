# CSRF Protection Quick Reference

## Cookie Configuration

```typescript
{
    name: 'csrf_token',
    httpOnly: true,         // ✅ Prevents XSS
    secure: true,           // ✅ HTTPS only (prod)
    sameSite: 'lax',       // ✅ CSRF protection
    maxAge: 24 * 60 * 60,  // 24 hours
    path: '/'
}
```

## Client Implementation

### 1. Fetch Token

```typescript
const response = await fetch("/api/csrf");
const { token } = await response.json();
```

### 2. Include in Request

```typescript
await fetch("/api/contact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-CSRF-Token": token, // ← Include token
  },
  body: JSON.stringify(data),
  credentials: "same-origin", // ← Include cookies
});
```

## Server Implementation

```typescript
import { validateCsrfToken } from "@/lib/csrf";

// Validate CSRF
const csrfValidation = validateCsrfToken(request);
if (!csrfValidation.valid) {
  return error(403, csrfValidation.error);
}
```

## Error Codes

| Code                  | Status | Retryable | Action          |
| --------------------- | ------ | --------- | --------------- |
| `CSRF_TOKEN_MISSING`  | 403    | ✅ Yes    | Fetch token     |
| `CSRF_TOKEN_MISMATCH` | 403    | ❌ No     | Investigate     |
| `CSRF_TOKEN_INVALID`  | 403    | ✅ Yes    | Fetch new token |

## Quick Test

```bash
# 1. Get token
curl -c cookies.txt http://localhost:3000/api/csrf

# 2. Extract token
TOKEN=$(curl -c cookies.txt http://localhost:3000/api/csrf | jq -r '.token')

# 3. Use token
curl -b cookies.txt \
  -H "X-CSRF-Token: $TOKEN" \
  -H "Content-Type: application/json" \
  -X POST http://localhost:3000/api/contact \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","message":"Test message"}'
```

## Environment Variable

```bash
# Generate secure secret
CSRF_SECRET=$(openssl rand -base64 32)

# Add to .env
echo "CSRF_SECRET=$CSRF_SECRET" >> .env.local
```

## Protected Endpoints

- ✅ `/api/contact` (POST)
- ⏳ `/api/leads` (POST)
- ⏳ `/api/demo` (POST)
- ⏳ `/api/newsletter` (POST)

## Files

- `src/lib/csrf.ts` - CSRF utilities
- `src/app/api/csrf/route.ts` - Token endpoint
- `docs/csrf-protection.md` - Full documentation

---

For complete details, see [csrf-protection.md](./csrf-protection.md)
