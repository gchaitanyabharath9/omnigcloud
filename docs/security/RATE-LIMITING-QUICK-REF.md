# Rate Limiting Quick Reference

## Current Configuration

| Endpoint       | Limit | Window | Strictness |
| -------------- | ----- | ------ | ---------- |
| `/api/contact` | **5** | 60s    | STRICT     |
| `/api/leads`   | 20    | 60s    | Moderate   |
| `/api/metrics` | 100   | 60s    | Light      |
| `/api/health`  | 200   | 60s    | Very Light |
| Default        | 50    | 60s    | Standard   |

## Environment Modes

### Local Development

- **Limiter**: InMemoryRateLimiter
- **Storage**: In-memory Map
- **Redis**: NOT required
- **Warnings**: NONE

### Production

- **Limiter**: RedisRateLimiter (if configured) or NoopRateLimiter
- **Storage**: Upstash Redis
- **Redis**: Required for rate limiting
- **Fallback**: Allows all requests if Redis unavailable

## Response Headers

### Success

```http
X-RateLimit-Remaining: 4
```

### Rate Limited (429)

```http
Retry-After: 45
X-RateLimit-Remaining: 0
```

## Quick Test

```bash
# Test contact endpoint (strict: 5/min)
for i in {1..10}; do
    curl -X POST http://localhost:3000/api/contact \
        -H "Content-Type: application/json" \
        -d '{"firstName":"Test","lastName":"User","email":"test@example.com","message":"Test message for rate limiting testing"}' \
        -w "\nStatus: %{http_code}\n"
done
```

**Expected**: First 5 requests succeed (200), next 5 fail (429)

## Environment Variables

```bash
# Production only (optional)
REDIS_URL=https://your-redis.upstash.io
REDIS_TOKEN=your-redis-token
```

## Files Modified

- `src/lib/rate-limit.ts` - Rate limiter implementations
- `src/lib/api-utils.ts` - Integration with API handlers
- `docs/rate-limiting.md` - Full documentation

---

For complete details, see [rate-limiting.md](./rate-limiting.md)
