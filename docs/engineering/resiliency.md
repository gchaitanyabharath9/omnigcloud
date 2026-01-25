# Application Resiliency & Reliability Strategy

This document outlines the engineering patterns used to ensure the application remains robust, reliable, and fault-tolerant in production environments.

## 1. Error Handling Strategy

### Standardized Error Model

All internal and external errors are normalized into a unified `AppError` class located in `src/lib/errors.ts`. This ensures consistent behavior across the stack.

**Core Error Types:**

- `ValidationError` (400): Invalid input payload. Non-retryable.
- `AuthError` (401): Missing or invalid credentials. Non-retryable.
- `RateLimitError` (429): Traffic threshold exceeded. Retryable with backoff.
- `ExternalServiceError` (502): Third-party vendor failure (e.g., Redis, Vault, Resend). Retryable.
- `TimeoutError` (504): Operation exceeded defined budget. Retryable.

### API Response Envelope

All API routes (`/api/*`) return a predictable JSON envelope:

```json
{
  "requestId": "uuid-v4",
  "status": "error",
  "timestamp": "ISO-8601",
  "error": {
    "code": "EXTERNAL_SERVICE_ERROR",
    "message": "Upstream provider unavailable",
    "retryable": true,
    "details": { ... } // Optional safe metadata
  }
}
```

## 2. Retry Logic (Server-Side)

We strictly retry **only** reliable transient failures. Non-idempotent or validation errors are never retried.

**Retryable Conditions:**

- Network socket hangups / resets
- HTTP 500, 502, 503, 504 from upstream
- Rate limits (429) if `Retry-After` is reasonable
- Explicit `TimeoutError` in wrapping logic

**Backoff Algorithm:**

- **Strategy:** Exponential Backoff + Jitter
- **Base Delay:** 200ms
- **Max Delay:** 2s
- **Max Attempts:** 3
- **Utility:** `src/lib/retry.ts` -> `withRetry()`

**Implementation Examples:**

- **RedisOps:** Retries connection and atomic writes/reads.
- **Transactional Email:** Retries sending logic on network failure.
- **Vault/Secrets:** Retries connection on boot (if configured).

## 3. Timeouts & Circuit Breaking

Every external dependency call is wrapped in a strict timeout to prevent thread starvation.

| Dependency | Timeout | Fallback Behavior |
|Text|Text|Text|
| **Redis** | 2000ms | Log error, proceed without caching/rate-limiting (Fail Open). |
| **Resend** | 5000ms | Log error, queue simple log, fail operation gracefully. |
| **Vault** | 3000ms | Fail fast at startup. |

## 4. Client-Side Reliability

- **Graceful Degradation:** UI widgets (like `LiveLatencyBadge` or status dashboards) handle API failures silently or show a "partially degraded" state without crashing the page.
- **Safe Fetch:** Critical client-side calls use a wrapper located in `src/lib/safe-fetch.ts` that handles timeouts and network anomalies. It automatically returns a `fallbackData` (null by default) if retries fail, preventing UI crashes.

## 5. Observability

- **Structured Logging:** All API errors are logged as JSON with `requestId`, `latency`, and `errorCode`.
- **PII Scrubbing:** Logs are automatically scrubbed of sensitive fields (email, tokens, secrets) before output.

## 6. Smoke Testing

To verify resiliency:

1. **Force Timeout:** Artificially delay an upstream service response > 5s. Verify 504 response.
2. **Kill Redis:** Stop the local Redis container. Verify app still serves pages (graceful degradation).
3. **Trigger Rate Limit:** Curl an endpoint 100 times in parallel. Verify 429 response.
