# CSRF Protection Documentation

## Overview

All state-changing POST endpoints are protected by CSRF (Cross-Site Request Forgery) tokens using the double-submit cookie pattern. This prevents malicious websites from making unauthorized requests on behalf of authenticated users.

## How CSRF Protection Works

### Double-Submit Cookie Pattern

1. **Token Generation**: Server generates cryptographically secure token
2. **Cookie Storage**: Token stored in httpOnly cookie
3. **Client Inclusion**: Client includes same token in request header
4. **Server Validation**: Server validates cookie and header match

### Token Structure

```
{randomBytes}.{timestamp}.{signature}
```

**Example**:

```
abc123def456.1704038400000.xyz789uvw012
```

**Components**:

- `randomBytes`: 32 bytes of cryptographically secure random data
- `timestamp`: Token creation time (for expiration)
- `signature`: HMAC-SHA256 signature for integrity

## Cookie Configuration

### CSRF Cookie

```typescript
{
    name: 'csrf_token',
    httpOnly: true,              // Prevents XSS access
    secure: true,                // HTTPS only (production)
    sameSite: 'lax',            // CSRF protection
    maxAge: 24 * 60 * 60,       // 24 hours
    path: '/'                    // Available site-wide
}
```

### Security Properties

| Property   | Value         | Purpose                                     |
| ---------- | ------------- | ------------------------------------------- |
| `httpOnly` | `true`        | Prevents JavaScript access (XSS protection) |
| `secure`   | `true` (prod) | HTTPS only in production                    |
| `sameSite` | `lax`         | Prevents cross-site requests                |
| `maxAge`   | 24 hours      | Token expiration                            |
| `path`     | `/`           | Available for all routes                    |

## Protected Endpoints

| Endpoint          | Method | CSRF Required | Status         |
| ----------------- | ------ | ------------- | -------------- |
| `/api/contact`    | POST   | ✅ Yes        | **PROTECTED**  |
| `/api/leads`      | POST   | ✅ Yes        | Ready to add   |
| `/api/demo`       | POST   | ✅ Yes        | Ready to add   |
| `/api/newsletter` | POST   | ✅ Yes        | Ready to add   |
| `/api/csrf`       | GET    | ❌ No         | Token endpoint |

## Implementation

### Server-Side (API Route)

```typescript
import { NextRequest } from "next/server";
import { validateCsrfToken } from "@/lib/csrf";
import { createErrorResponse } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  // 1. Validate CSRF Token
  const csrfValidation = validateCsrfToken(request);
  if (!csrfValidation.valid && csrfValidation.error) {
    return createErrorResponse(
      requestId,
      csrfValidation.error.code,
      csrfValidation.error.message,
      csrfValidation.error.retryable,
      403
    );
  }

  // 2. Process request
  const body = await request.json();
  // ... rest of handler
}
```

### Client-Side (React)

#### Step 1: Obtain CSRF Token

```typescript
"use client";

import { useState, useEffect } from "react";

export default function ContactForm() {
  const [csrfToken, setCsrfToken] = useState<string>("");

  useEffect(() => {
    // Fetch CSRF token on component mount
    async function fetchCsrfToken() {
      const response = await fetch("/api/csrf");
      const data = await response.json();
      setCsrfToken(data.token);
    }

    fetchCsrfToken();
  }, []);

  // ... rest of component
}
```

#### Step 2: Include Token in Request

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken, // Include token in header
    },
    body: JSON.stringify(formData),
    credentials: "same-origin", // Include cookies
  });

  const data = await response.json();
  // Handle response
};
```

### Complete Example

```typescript
'use client';

import { useState, useEffect } from 'react';

export default function ContactForm() {
    const [csrfToken, setCsrfToken] = useState<string>('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    // Fetch CSRF token on mount
    useEffect(() => {
        async function fetchCsrfToken() {
            try {
                const response = await fetch('/api/csrf');
                const data = await response.json();
                setCsrfToken(data.token);
            } catch (error) {
                console.error('Failed to fetch CSRF token:', error);
            }
        }

        fetchCsrfToken();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!csrfToken) {
            alert('Security token not loaded. Please refresh the page.');
            return;
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                body: JSON.stringify(formData),
                credentials: 'same-origin'
            });

            const data = await response.json();

            if (data.status === 'ok') {
                alert('Form submitted successfully!');
                // Reset form
            } else if (data.error?.code === 'CSRF_TOKEN_INVALID') {
                // Token expired - fetch new one
                const tokenResponse = await fetch('/api/csrf');
                const tokenData = await tokenResponse.json();
                setCsrfToken(tokenData.token);
                alert('Security token expired. Please try again.');
            } else {
                alert(data.error?.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Submission error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
            />
            {/* ... other fields ... */}
            <button type="submit" disabled={!csrfToken}>
                Submit
            </button>
        </form>
    );
}
```

## Error Responses

### Missing CSRF Token

**Status**: 403 Forbidden

```json
{
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2025-12-30T12:00:00.000Z",
  "status": "error",
  "error": {
    "code": "CSRF_TOKEN_MISSING",
    "message": "CSRF token is required for this request",
    "retryable": true
  }
}
```

**Client Action**: Fetch new token from `/api/csrf`

### Token Mismatch

**Status**: 403 Forbidden

```json
{
  "requestId": "550e8400-e29b-41d4-a716-446655440001",
  "timestamp": "2025-12-30T12:00:00.000Z",
  "status": "error",
  "error": {
    "code": "CSRF_TOKEN_MISMATCH",
    "message": "CSRF token validation failed",
    "retryable": false
  }
}
```

**Client Action**: Possible attack attempt - log and investigate

### Token Expired

**Status**: 403 Forbidden

```json
{
  "requestId": "550e8400-e29b-41d4-a716-446655440002",
  "timestamp": "2025-12-30T12:00:00.000Z",
  "status": "error",
  "error": {
    "code": "CSRF_TOKEN_INVALID",
    "message": "CSRF token is invalid or expired",
    "retryable": true
  }
}
```

**Client Action**: Fetch new token and retry

## Token Lifecycle

### Generation

```typescript
// Server generates token
const token = generateCsrfToken();
// Returns: "abc123.1704038400000.xyz789"
```

### Storage

```typescript
// Set cookie in response
response.cookies.set("csrf_token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  maxAge: 24 * 60 * 60,
});
```

### Validation

```typescript
// Extract from cookie and header
const cookieToken = request.cookies.get("csrf_token")?.value;
const headerToken = request.headers.get("x-csrf-token");

// Validate
if (cookieToken !== headerToken) {
  return error("CSRF_TOKEN_MISMATCH");
}

if (!verifyCsrfToken(cookieToken)) {
  return error("CSRF_TOKEN_INVALID");
}
```

### Expiration

- **Lifetime**: 24 hours from generation
- **Validation**: Checked on every request
- **Renewal**: Client fetches new token when expired

## Security Considerations

### Why httpOnly?

```typescript
httpOnly: true; // JavaScript cannot access cookie
```

**Prevents**:

- XSS attacks from stealing CSRF token
- Malicious scripts from reading cookie

**Trade-off**:

- Client must use header for token (not cookie directly)

### Why SameSite=Lax?

```typescript
sameSite: "lax"; // Cookie sent on same-site navigation
```

**Prevents**:

- Cross-site request forgery
- Third-party sites from sending cookies

**Allows**:

- Top-level navigation (clicking links)
- Same-site requests

**Alternative**: `SameSite=Strict` (more restrictive)

### Why Secure in Production?

```typescript
secure: process.env.NODE_ENV === "production";
```

**Prevents**:

- Man-in-the-middle attacks
- Cookie theft over HTTP

**Development**: Disabled for localhost testing

## Testing

### Test Valid Submission

```bash
# 1. Get CSRF token
TOKEN_RESPONSE=$(curl -c cookies.txt http://localhost:3000/api/csrf)
TOKEN=$(echo $TOKEN_RESPONSE | jq -r '.token')

# 2. Submit form with token
curl -b cookies.txt \
  -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: $TOKEN" \
  -d '{
    "firstName":"John",
    "lastName":"Doe",
    "email":"john@example.com",
    "message":"Test message"
  }'
```

**Expected**: 200 OK

### Test Missing Token

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","message":"Test"}'
```

**Expected**: 403 Forbidden (CSRF_TOKEN_MISSING)

### Test Invalid Token

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: invalid-token-12345" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","message":"Test"}'
```

**Expected**: 403 Forbidden (CSRF_TOKEN_MISSING or CSRF_TOKEN_MISMATCH)

## Monitoring

### Key Metrics

1. **CSRF Failures**: Count of 403 responses with CSRF error codes
2. **Token Expiration Rate**: How often tokens expire
3. **Token Refresh Rate**: How often clients fetch new tokens
4. **Attack Attempts**: Mismatched or missing tokens

### Logs

```json
{
  "level": "warn",
  "message": "CSRF validation failed",
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "error": "CSRF_TOKEN_MISMATCH",
  "ip": "192.168.1.1",
  "route": "/api/contact"
}
```

### Alerts

Set up alerts for:

- **High CSRF Failure Rate**: >5% of requests
- **Repeated Failures**: Same IP failing multiple times
- **Token Mismatch Spike**: Possible attack in progress

## Troubleshooting

### Issue: Token Not Set

**Symptoms**: CSRF_TOKEN_MISSING error

**Solutions**:

1. Verify `/api/csrf` endpoint is accessible
2. Check cookie is being set in response
3. Ensure `credentials: 'same-origin'` in fetch

### Issue: Token Mismatch

**Symptoms**: CSRF_TOKEN_MISMATCH error

**Solutions**:

1. Verify header name is `X-CSRF-Token`
2. Check cookie and header values match
3. Ensure no middleware is modifying cookies

### Issue: Token Expired

**Symptoms**: CSRF_TOKEN_INVALID error

**Solutions**:

1. Implement token refresh on expiration
2. Fetch new token before retry
3. Consider longer token lifetime if needed

## Environment Variables

```bash
# CSRF secret for token signing
CSRF_SECRET=your-secret-key-change-in-production

# Must be cryptographically secure random string
# Generate with: openssl rand -base64 32
```

## Best Practices

### ✅ DO

- Generate new token for each session
- Use httpOnly cookies
- Set Secure flag in production
- Use SameSite=Lax or Strict
- Validate on all state-changing requests
- Log CSRF failures
- Implement token refresh on expiration

### ❌ DON'T

- Store token in localStorage (XSS vulnerable)
- Use predictable tokens
- Skip validation on "safe" endpoints
- Expose token in URLs
- Use same token across users
- Ignore CSRF failures

## Compliance

This implementation helps meet:

- **OWASP Top 10**: CSRF protection
- **PCI DSS**: Secure cookie handling
- **SOC 2**: Access control
- **GDPR**: Security measures

## Changelog

### 2025-12-30

- ✅ Implemented CSRF token generation
- ✅ Added double-submit cookie pattern
- ✅ Created `/api/csrf` endpoint
- ✅ Protected `/api/contact` endpoint
- ✅ Configured secure cookies
- ✅ Created comprehensive documentation

---

**Last Updated**: 2025-12-30  
**Maintained By**: Security Team  
**Review Cycle**: Quarterly
