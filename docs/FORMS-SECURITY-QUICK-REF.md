# Form Security Quick Reference

## Protection Layers

| Layer | Purpose | Status |
|-------|---------|--------|
| **Honeypot Fields** | Bot detection | ✅ Active |
| **Payload Size Limits** | DoS prevention | ✅ Active |
| **Content-Type Validation** | Format enforcement | ✅ Active |
| **Time-to-Submit** | Bot detection | ✅ Active |
| **Secure Logging** | Privacy protection | ✅ Active |

## Protected Forms

| Form | Honeypot | Size Limit | Rate Limit | Status |
|------|----------|------------|------------|--------|
| `/api/contact` | `website` | 10KB | 5/min | ✅ |
| `/api/demo` | `url` | 10KB | 10/min | ⏳ Pending |
| `/api/newsletter` | `phone_number` | 5KB | 20/min | ⏳ Pending |

## Honeypot Fields

```typescript
// Most effective honeypot fields
const HONEYPOT_FIELDS = {
    website: 'website',           // ⭐ Most common
    url: 'url',
    homepage: 'homepage',
    phone_number: 'phone_number',
    company_url: 'company_url',
    fax: 'fax'
};
```

## Client-Side Implementation

```html
<!-- Hidden honeypot field -->
<input
    type="text"
    name="website"
    tabindex="-1"
    autocomplete="off"
    style="position: absolute; left: -9999px;"
    aria-hidden="true"
/>
```

## Server-Side Validation

```typescript
import { validateFormSecurity, checkHoneypot, sanitizeForLogging } from '@/lib/form-security';

// 1. Security validation
const securityCheck = await validateFormSecurity(req, body, {
    maxPayloadSize: 10 * 1024,
    minSubmitTime: 2000,
    honeypotFields: ['website']
});

// 2. Honeypot check
const honeypotCheck = checkHoneypot(body, ['website']);
if (honeypotCheck.isBot) {
    // Silent rejection
    return createSuccessResponse(requestId, { message: 'Success' });
}

// 3. Secure logging
logger.info('Form submission', {
    requestId,
    data: sanitizeForLogging(body) // Redacts sensitive fields
});
```

## Redacted Log Fields

```typescript
// These fields are NEVER logged
const REDACTED = [
    'message', 'comment', 'description', 'content',
    'password', 'token', 'secret', 'apiKey'
];
```

## Quick Test

```bash
# Test bot detection (honeypot filled)
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Bot","lastName":"Test","email":"bot@test.com","message":"Test","website":"http://spam.com"}'

# Expected: 200 OK (silent rejection)
```

## Files

- `src/lib/form-security.ts` - Security utilities
- `src/app/api/contact/route.ts` - Protected contact form
- `docs/forms-security.md` - Full documentation

---

For complete details, see [forms-security.md](./forms-security.md)
