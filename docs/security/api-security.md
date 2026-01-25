# API Security Hardening Documentation

## Overview

All marketing API routes have been hardened with comprehensive input validation, standardized error handling, and safe logging practices. This ensures that no sensitive information, stack traces, or internal details are exposed to clients.

## Standardized Response Envelope

All API responses follow this structure:

```typescript
interface ApiResponse<T = any> {
  requestId: string; // Unique request identifier for tracking
  timestamp: string; // ISO 8601 timestamp
  status: "ok" | "error"; // Response status
  data?: T; // Success data (only present when status='ok')
  error?: {
    // Error details (only present when status='error')
    code: string; // Machine-readable error code
    message: string; // Human-readable error message
    retryable: boolean; // Whether the client should retry
  };
}
```

### Success Response Example

```json
{
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2025-12-30T12:00:00.000Z",
  "status": "ok",
  "data": {
    "message": "Contact form submitted successfully.",
    "submissionId": "lead_abc123"
  }
}
```

### Error Response Examples

**Validation Error (422)**:

```json
{
  "requestId": "550e8400-e29b-41d4-a716-446655440001",
  "timestamp": "2025-12-30T12:00:00.000Z",
  "status": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email: Invalid email address",
    "retryable": false
  }
}
```

**Internal Error (500)**:

```json
{
  "requestId": "550e8400-e29b-41d4-a716-446655440002",
  "timestamp": "2025-12-30T12:00:00.000Z",
  "status": "error",
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred. Please try again later.",
    "retryable": true
  }
}
```

## Hardened API Routes

### 1. `/api/contact` (POST)

**Purpose**: Submit contact form

**Validation Schema**:

```typescript
{
    firstName: string (1-100 chars),
    lastName: string (1-100 chars),
    email: string (valid email, max 255 chars),
    message: string (10-5000 chars),
    website?: string (honeypot for bot detection)
}
```

**Security Features**:

- ✅ Zod input validation
- ✅ Honeypot field for bot detection
- ✅ Max length validation to prevent DoS
- ✅ Safe error handling (no stack traces)
- ✅ Request ID tracking

**Error Codes**:

- `VALIDATION_ERROR` (422): Invalid input
- `INTERNAL_ERROR` (500): Unexpected server error

---

### 2. `/api/leads` (GET)

**Purpose**: Retrieve submitted leads (admin only)

**Query Parameters**:

```typescript
{
    limit?: number (max 100, default 50),
    offset?: number (min 0, default 0)
}
```

**Security Features**:

- ✅ Query parameter validation
- ✅ Pagination limits to prevent resource exhaustion
- ✅ Authentication placeholder (ready for auth)
- ✅ Safe error handling
- ✅ Request ID tracking

**Error Codes**:

- `VALIDATION_ERROR` (422): Invalid query parameters
- `UNAUTHORIZED` (401): Not authenticated (when auth enabled)
- `SERVICE_UNAVAILABLE` (503): Database not configured
- `INTERNAL_ERROR` (500): Unexpected server error

---

### 3. `/api/health` (GET)

**Purpose**: System health check

**Response Data**:

```typescript
{
    status: 'ok' | 'degraded',
    system: {
        version: string,
        nodeEnv: string,
        appEnv: string,
        deploymentId: string,
        uptimeSeconds: number
    },
    configuration: {
        secretsProvider: string,
        features: object
    },
    dependencies: {
        redis: { status: string },
        vault: { status: string }
    }
}
```

**Security Features**:

- ✅ No sensitive information exposed
- ✅ Safe dependency checks
- ✅ Request ID tracking

---

### 4. `/api/metrics` (GET)

**Purpose**: Application metrics (monitoring)

**Security Features**:

- ✅ Standardized response envelope
- ✅ Safe error handling
- ✅ Request ID tracking

---

### 5. `/api/billing` (POST)

**Purpose**: Billing operations

**Security Features**:

- ✅ Standardized response envelope
- ✅ Safe error handling
- ✅ Request ID tracking

---

## Security Utilities

### Core Functions

Located in `src/lib/api-utils.ts`:

#### `withApiHarden(request, handler)`

Wraps API handlers with:

- Rate limiting
- Request ID generation
- Error handling
- Metrics tracking
- Logging

#### `createSuccessResponse(requestId, data, status?)`

Creates standardized success response

#### `createErrorResponse(requestId, code, message, retryable, status?)`

Creates standardized error response

#### `handleZodError(error, requestId)`

Converts Zod validation errors to standardized format

#### `handleSafeError(error, requestId)`

Safely handles unknown errors without exposing internals

### Safe Logging

All logging follows these principles:

**✅ DO Log**:

- Request IDs
- HTTP methods and routes
- Status codes
- Response times
- Error codes (not messages with PII)
- Timestamps

**❌ DON'T Log**:

- Passwords
- API keys
- Tokens
- Credit card numbers
- SSNs
- Email addresses (in production)
- Stack traces (in production)

### Example Usage

```typescript
import { z } from "zod";
import { NextRequest } from "next/server";
import {
  withApiHarden,
  createSuccessResponse,
  handleZodError,
  handleSafeError,
} from "@/lib/api-utils";

const InputSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
});

export async function POST(request: NextRequest) {
  return withApiHarden(request, async (req, { requestId }) => {
    try {
      const body = await req.json();

      // Validate input
      const validation = InputSchema.safeParse(body);
      if (!validation.success) {
        return handleZodError(validation.error, requestId);
      }

      // Process request
      const result = await processData(validation.data);

      // Return success
      return createSuccessResponse(requestId, result);
    } catch (error) {
      // Safe error handling
      return handleSafeError(error, requestId);
    }
  });
}
```

## Error Code Reference

| Code                  | HTTP Status | Description                  | Retryable |
| --------------------- | ----------- | ---------------------------- | --------- |
| `VALIDATION_ERROR`    | 422         | Invalid input data           | No        |
| `UNAUTHORIZED`        | 401         | Authentication required      | No        |
| `FORBIDDEN`           | 403         | Insufficient permissions     | No        |
| `NOT_FOUND`           | 404         | Resource not found           | No        |
| `METHOD_NOT_ALLOWED`  | 405         | HTTP method not allowed      | No        |
| `TOO_MANY_REQUESTS`   | 429         | Rate limit exceeded          | Yes       |
| `SERVICE_UNAVAILABLE` | 503         | External service unavailable | Yes       |
| `INTERNAL_ERROR`      | 500         | Unexpected server error      | Yes       |

## Rate Limiting

All routes are protected by rate limiting via `withApiHarden`:

- **Default Limit**: 100 requests per minute per IP
- **Response**: 429 Too Many Requests
- **Header**: `Retry-After` (seconds until reset)

## Request ID Tracking

Every request receives a unique `requestId`:

- Generated automatically if not provided
- Can be provided via `X-Request-Id` header
- Included in all responses
- Used for log correlation

**Example**:

```bash
curl -H "X-Request-Id: my-custom-id" https://api.example.com/contact
```

## Production vs Development

### Development Mode

- Full error details logged to console
- Stack traces visible in logs
- Detailed validation errors

### Production Mode

- Generic error messages to clients
- Safe logging (no PII, no stack traces)
- Error details logged internally only

## Testing

### Valid Request

```bash
curl -X POST https://api.example.com/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "message": "This is a test message with sufficient length."
  }'
```

### Invalid Request (Validation Error)

```bash
curl -X POST https://api.example.com/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "J",
    "lastName": "",
    "email": "invalid-email",
    "message": "Short"
  }'
```

Expected Response:

```json
{
  "requestId": "...",
  "timestamp": "...",
  "status": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid lastName: String must contain at least 1 character(s)",
    "retryable": false
  }
}
```

## Monitoring

### Key Metrics to Monitor

1. **Error Rate**: Track 4xx and 5xx responses
2. **Validation Failures**: Monitor `VALIDATION_ERROR` frequency
3. **Rate Limit Hits**: Track 429 responses
4. **Response Times**: Monitor API latency
5. **Request Volume**: Track requests per endpoint

### Log Correlation

Use `requestId` to correlate logs across services:

```bash
# Find all logs for a specific request
grep "550e8400-e29b-41d4-a716-446655440000" application.log
```

## Security Checklist

- [x] Input validation with Zod
- [x] Standardized response envelope
- [x] Safe error handling (no stack traces)
- [x] No PII in logs
- [x] Request ID tracking
- [x] Rate limiting
- [x] Max length validation (DoS prevention)
- [x] Honeypot fields (bot detection)
- [x] Generic error messages in production
- [x] Retryable flag on errors

## Compliance

This implementation helps meet:

- **OWASP Top 10**: Protection against injection, broken authentication, sensitive data exposure
- **PCI DSS**: No credit card data in logs
- **GDPR**: No PII in error responses or logs
- **SOC 2**: Comprehensive logging and error handling

## Changelog

### 2025-12-30

- ✅ Implemented standardized API response envelope
- ✅ Added Zod validation to all routes
- ✅ Implemented safe error handling
- ✅ Added request ID tracking
- ✅ Enhanced contact route with honeypot
- ✅ Enhanced leads route with query validation
- ✅ Updated all routes to use new utilities
- ✅ Created comprehensive documentation

---

**Last Updated**: 2025-12-30  
**Maintained By**: Security Team  
**Review Cycle**: Quarterly
