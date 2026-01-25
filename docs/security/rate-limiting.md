# Rate Limiting Documentation

## Overview

All public marketing API endpoints are protected by intelligent rate limiting that adapts to the environment. The system uses in-memory limiting for local development (no Redis required) and Upstash Redis for production.

## Rate Limit Configuration

### Endpoint-Specific Limits

| Endpoint       | Limit        | Window     | Strictness |
| -------------- | ------------ | ---------- | ---------- |
| `/api/contact` | 5 requests   | 60 seconds | **STRICT** |
| `/api/leads`   | 20 requests  | 60 seconds | Moderate   |
| `/api/metrics` | 100 requests | 60 seconds | **LIGHT**  |
| `/api/health`  | 200 requests | 60 seconds | Very Light |
| Default        | 50 requests  | 60 seconds | Standard   |

### Rationale

- **`/api/contact` (5/min)**: Strict limit to prevent spam and abuse of contact form
- **`/api/leads` (20/min)**: Moderate limit for admin access
- **`/api/metrics` (100/min)**: Light limit for monitoring dashboards
- **`/api/health` (200/min)**: Very light limit for health checks
- **Default (50/min)**: Standard protection for unlisted endpoints

## Environment Modes

### Local Development Mode

**Trigger**: `NODE_ENV=development` or `config.env=local`

**Implementation**: `InMemoryRateLimiter`

**Features**:

- ✅ No Redis required
- ✅ No configuration needed
- ✅ No warnings or errors
- ✅ Automatic cleanup of expired entries
- ✅ Per-endpoint tracking
- ✅ Full rate limiting functionality

**Storage**: In-memory Map with automatic cleanup every 60 seconds

**Persistence**: None (resets on server restart)

### Production Mode

**Trigger**: `NODE_ENV=production` with Redis configured

**Implementation**: `RedisRateLimiter`

**Requirements**:

- `REDIS_URL` environment variable
- `REDIS_TOKEN` environment variable
- `config.features.enableRateLimit=true`

**Features**:

- ✅ Distributed rate limiting across instances
- ✅ Persistent across server restarts
- ✅ Scalable to multiple servers
- ✅ Fail-open on Redis errors

**Storage**: Upstash Redis with sliding window

### Fallback Mode

**Trigger**: Production without Redis configured

**Implementation**: `NoopRateLimiter`

**Behavior**: Allows all requests (no rate limiting)

**Use Case**: Graceful degradation if Redis is unavailable

## Response Format

### Rate Limit Allowed

**Status**: 200 OK

**Headers**:

```http
X-RateLimit-Remaining: 4
```

**Response**:

```json
{
    "requestId": "550e8400-e29b-41d4-a716-446655440000",
    "timestamp": "2025-12-30T12:00:00.000Z",
    "status": "ok",
    "data": { ... }
}
```

### Rate Limit Exceeded

**Status**: 429 Too Many Requests

**Headers**:

```http
Retry-After: 45
X-RateLimit-Remaining: 0
```

**Response**:

```json
{
  "requestId": "550e8400-e29b-41d4-a716-446655440001",
  "timestamp": "2025-12-30T12:00:00.000Z",
  "status": "error",
  "error": {
    "code": "TOO_MANY_REQUESTS",
    "message": "Rate limit exceeded. Please try again later.",
    "retryable": true
  }
}
```

## Implementation Details

### In-Memory Limiter

```typescript
class InMemoryRateLimiter {
  private store: Map<string, { count: number; resetAt: number }>;

  // Key format: "ip:endpoint"
  // Example: "192.168.1.1:/api/contact"

  async check(ip: string, endpoint?: string): Promise<RateLimitResult> {
    // 1. Get endpoint config
    // 2. Check if window expired
    // 3. Increment counter
    // 4. Return result with remaining count
  }
}
```

**Cleanup Strategy**:

- Runs every 60 seconds
- Removes expired entries
- Prevents memory leaks

### Redis Limiter

```typescript
class RedisRateLimiter {
  async check(ip: string, endpoint?: string): Promise<RateLimitResult> {
    // 1. Get endpoint config
    // 2. Create sliding window key
    // 3. Increment counter in Redis
    // 4. Set expiration on first request
    // 5. Return result
  }
}
```

**Key Format**: `rate-limit:{ip}:{endpoint}:{window}`

**Example**: `rate-limit:192.168.1.1:/api/contact:28512345`

**TTL**: Automatically expires after window duration

## Client Integration

### Handling Rate Limits

```typescript
async function callAPI(endpoint: string, data: any) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After");
      const body = await response.json();

      console.log(`Rate limited. Retry after ${retryAfter} seconds`);
      console.log(`Request ID: ${body.requestId}`);

      // Wait and retry
      await new Promise((resolve) => setTimeout(resolve, parseInt(retryAfter) * 1000));
      return callAPI(endpoint, data);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}
```

### Exponential Backoff

```typescript
async function callAPIWithBackoff(endpoint: string, data: any, maxRetries = 3) {
  let retries = 0;
  let delay = 1000; // Start with 1 second

  while (retries < maxRetries) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 429) {
        retries++;
        const retryAfter = parseInt(response.headers.get("Retry-After") || "60");
        delay = Math.min(retryAfter * 1000, delay * 2); // Exponential backoff

        console.log(`Rate limited. Retry ${retries}/${maxRetries} after ${delay}ms`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  throw new Error("Max retries exceeded");
}
```

## Testing

### Local Development

```bash
# Test contact endpoint (strict: 5/min)
for i in {1..10}; do
    curl -X POST http://localhost:3000/api/contact \
        -H "Content-Type: application/json" \
        -d '{"firstName":"Test","lastName":"User","email":"test@example.com","message":"Test message for rate limiting"}' \
        -w "\nStatus: %{http_code}\n\n"
    sleep 1
done
```

**Expected**:

- Requests 1-5: 200 OK
- Requests 6-10: 429 Too Many Requests

### Production Testing

```bash
# Test with custom request ID
curl -X POST https://api.example.com/api/contact \
    -H "Content-Type: application/json" \
    -H "X-Request-Id: test-rate-limit-001" \
    -d '{"firstName":"Test","lastName":"User","email":"test@example.com","message":"Test message"}' \
    -i
```

**Check Headers**:

```http
HTTP/1.1 200 OK
X-RateLimit-Remaining: 4
```

## Monitoring

### Key Metrics

1. **Rate Limit Hit Rate**: Percentage of requests that hit rate limits
2. **429 Response Count**: Total number of rate-limited requests
3. **Endpoint Distribution**: Which endpoints are most rate-limited
4. **IP Distribution**: Which IPs are hitting limits most often

### Logs

```json
{
  "level": "warn",
  "message": "Rate limit exceeded",
  "requestId": "550e8400-e29b-41d4-a716-446655440000",
  "route": "/api/contact",
  "method": "POST",
  "ip": "192.168.1.1",
  "timestamp": "2025-12-30T12:00:00.000Z"
}
```

### Alerts

Set up alerts for:

- **High 429 Rate**: >10% of requests to any endpoint
- **Suspicious Activity**: Single IP hitting limits repeatedly
- **Redis Errors**: Rate limiter failing to connect to Redis

## Configuration

### Environment Variables

```bash
# Required for production Redis rate limiting
REDIS_URL=https://your-redis.upstash.io
REDIS_TOKEN=your-redis-token

# Optional: Disable rate limiting entirely
ENABLE_RATE_LIMIT=false
```

### Adjusting Limits

Edit `src/lib/rate-limit.ts`:

```typescript
export const RATE_LIMITS: Record<string, RateLimitConfig> = {
  "/api/contact": { limit: 10, windowMs: 60000 }, // Increase to 10/min
  "/api/custom": { limit: 25, windowMs: 30000 }, // Add new endpoint
  // ...
};
```

## Security Considerations

### IP Spoofing

The rate limiter uses `X-Forwarded-For` header for IP detection:

```typescript
const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
```

**Protection**:

- Vercel automatically sets correct `X-Forwarded-For`
- First IP in chain is used (client IP)
- Fallback to 'unknown' if header missing

### Distributed Denial of Service (DDoS)

**Limitations**:

- Rate limiting alone won't stop large-scale DDoS
- Use Vercel's DDoS protection
- Consider Cloudflare for additional protection

**Best Practices**:

- Keep limits reasonable
- Monitor for abuse patterns
- Use fail-open strategy (allow on Redis errors)

### Bypass Attempts

**Potential Bypasses**:

- IP rotation
- Distributed attacks
- Header manipulation

**Mitigations**:

- Strict limits on sensitive endpoints
- Honeypot fields (contact form)
- Input validation
- CAPTCHA for repeated failures (future enhancement)

## Troubleshooting

### Local Development: Rate Limits Not Working

**Check**:

1. Verify `NODE_ENV=development`
2. Check console for limiter initialization
3. Verify endpoint matches configured routes

### Production: All Requests Allowed

**Check**:

1. Verify `REDIS_URL` and `REDIS_TOKEN` are set
2. Check `config.features.enableRateLimit` is true
3. Verify Redis connection in `/api/health`

### Production: All Requests Blocked

**Check**:

1. Verify Redis is accessible
2. Check for Redis connection errors in logs
3. Verify rate limit configuration is correct

### Redis Connection Errors

**Symptoms**: Rate limiter fails open (allows all requests)

**Solution**:

1. Check Redis credentials
2. Verify network connectivity
3. Check Upstash Redis dashboard
4. Review error logs

## Performance

### In-Memory Limiter

- **Latency**: <1ms
- **Memory**: ~100 bytes per IP/endpoint combination
- **Cleanup**: Every 60 seconds
- **Max Entries**: Unlimited (auto-cleanup prevents growth)

### Redis Limiter

- **Latency**: 10-50ms (network dependent)
- **Memory**: Stored in Redis (not local)
- **Cleanup**: Automatic via TTL
- **Scalability**: Unlimited

## Changelog

### 2025-12-30

- ✅ Implemented endpoint-specific rate limits
- ✅ Added InMemoryRateLimiter for local development
- ✅ Enhanced RedisRateLimiter with endpoint support
- ✅ Added X-RateLimit-Remaining header
- ✅ Updated response envelope with retryable flag
- ✅ Created comprehensive documentation
- ✅ Zero Redis warnings in local development

---

**Last Updated**: 2025-12-30  
**Maintained By**: Security Team  
**Review Cycle**: Quarterly
