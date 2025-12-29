# Observability Primitives

## Overview
Lightweight, production-ready observability system with structured logging, metrics collection, and audit logging. Designed for minimal infrastructure dependency while providing enterprise-grade visibility.

## Components

### 1. Structured Logger (`src/lib/logger.ts`)

**Features:**
- JSON-formatted logs for machine parsing
- PII-safe output (automatic email masking)
- Sensitive field removal (passwords, tokens, secrets)
- HTTP request/response logging
- Environment-aware (debug logs only in development)

**Usage:**
```typescript
import { logger } from '@/lib/logger';

// Basic logging
logger.info('User action completed', { 
  requestId: 'req_123',
  userId: 'user_456' 
});

// HTTP logging
logger.http({
  requestId: 'req_123',
  method: 'POST',
  route: '/api/billing',
  status: 200,
  duration: 45
});

// Error logging
logger.error('Payment processing failed', {
  requestId: 'req_123',
  error: 'Invalid card number'
});
```

**Log Output:**
```json
{
  "timestamp": "2025-12-29T19:53:17.000Z",
  "level": "info",
  "message": "POST /api/billing 200",
  "requestId": "req_123",
  "duration": 45,
  "status": 200
}
```

**PII Protection:**
- Emails automatically masked: `user@example.com` → `u***@example.com`
- Sensitive fields removed: `password`, `token`, `secret`, `apiKey`

### 2. Metrics Collector (`src/lib/metrics.ts`)

**Features:**
- In-memory metrics storage
- Prometheus-compatible text format export
- Counter, Gauge, and Histogram support
- Automatic percentile calculation (p50, p95, p99)
- Pluggable backend (can export to Prometheus, Datadog, etc.)

**Usage:**
```typescript
import { metrics, metricsHooks } from '@/lib/metrics';

// Track HTTP requests
metricsHooks.trackRequest('POST', '/api/billing', 200, 45);

// Track errors
metricsHooks.trackError('/api/billing', 'ValidationError');

// Track authentication
metricsHooks.trackAuth('login', 'google');

// Track rate limiting
metricsHooks.trackRateLimit('192.168.1.1', true);

// Custom metrics
metrics.increment('custom_counter', { label: 'value' });
metrics.gauge('active_connections', 42);
metrics.histogram('query_duration_ms', 123);
```

**Metrics Endpoint:**
```
GET /api/metrics
```

**Prometheus Output:**
```
http_requests_total{method="POST",route="/api/billing",status="200"} 1 1735502397000
http_request_duration_ms{method="POST",route="/api/billing",quantile="0.5"} 45 1735502397000
http_request_duration_ms{method="POST",route="/api/billing",quantile="0.95"} 78 1735502397000
```

**Configuration:**
```env
ENABLE_METRICS=true  # Default: true
```

### 3. Audit Logger (`src/lib/audit.ts`)

**Features:**
- Security and compliance event tracking
- In-memory storage (10,000 event limit)
- Pluggable storage backend interface
- PII-safe logging (email masking)
- Queryable event history

**Event Types:**
- `auth.login`, `auth.logout`, `auth.failed`
- `auth.mfa_enabled`, `auth.mfa_disabled`
- `user.created`, `user.updated`, `user.deleted`
- `access.granted`, `access.denied`
- `data.exported`, `data.deleted`
- `settings.updated`
- `api.key_created`, `api.key_revoked`

**Usage:**
```typescript
import { auditLog, auditHooks } from '@/lib/audit';

// Convenience hooks
await auditHooks.logLogin('user_123', 'user@example.com', 'google', '192.168.1.1');
await auditHooks.logFailedLogin('user@example.com', '192.168.1.1', 'Invalid password');
await auditHooks.logAccessDenied('user_123', '/admin', 'view');
await auditHooks.logDataExport('user_123', 'customer_data.csv');

// Custom events
await auditLog.log({
  eventType: 'settings.updated',
  userId: 'user_123',
  resource: 'notification_preferences',
  status: 'success',
  metadata: { oldValue: 'email', newValue: 'sms' }
});

// Query audit logs
const events = await auditLog.query({
  userId: 'user_123',
  eventType: 'auth.login',
  startTime: Date.now() - 86400000, // Last 24 hours
  limit: 100
});
```

**Configuration:**
```env
ENABLE_AUDIT_LOG=true  # Default: true
```

**Custom Storage Backend:**
```typescript
import { AuditLogStorage, auditLog } from '@/lib/audit';

class DatabaseAuditStorage implements AuditLogStorage {
  async save(event: AuditEvent): Promise<void> {
    // Save to PostgreSQL, MongoDB, etc.
  }
  
  async query(filters: AuditQueryFilters): Promise<AuditEvent[]> {
    // Query from database
  }
}

auditLog.setStorage(new DatabaseAuditStorage());
```

## Integration

### API Routes
All API routes automatically get observability via `withApiHarden`:

```typescript
import { withApiHarden, createSuccessResponse } from '@/lib/api-utils';

export async function POST(request: Request) {
  return withApiHarden(request, async (req, { requestId }) => {
    // Your handler code
    // Logs, metrics, and rate limiting are automatic
    
    return createSuccessResponse(requestId, { success: true });
  });
}
```

**Automatic Tracking:**
- ✅ Request ID generation
- ✅ HTTP logging (method, route, status, duration)
- ✅ Metrics collection (requests, errors, latency)
- ✅ Rate limit tracking
- ✅ PII-safe error logging

### Authentication Events
Integrate with your auth system:

```typescript
// In your auth callback
import { auditHooks } from '@/lib/audit';
import { metricsHooks } from '@/lib/metrics';

async function handleLogin(user, provider) {
  await auditHooks.logLogin(user.id, user.email, provider);
  metricsHooks.trackAuth('login', provider);
}
```

## Monitoring Setup

### Prometheus Integration
1. Configure Prometheus to scrape `/api/metrics`:
```yaml
scrape_configs:
  - job_name: 'omnigcloud'
    scrape_interval: 30s
    static_configs:
      - targets: ['your-app.com']
    metrics_path: '/api/metrics'
```

2. Create Grafana dashboards for:
   - HTTP request rate and latency
   - Error rates by route
   - Authentication events
   - Rate limit hits

### Log Aggregation
JSON logs can be ingested by:
- **ELK Stack** (Elasticsearch, Logstash, Kibana)
- **Loki** (Grafana Loki)
- **CloudWatch Logs** (AWS)
- **Cloud Logging** (GCP)

Example Logstash config:
```ruby
input {
  file {
    path => "/var/log/omnigcloud/*.log"
    codec => json
  }
}

filter {
  if [level] == "error" {
    mutate { add_tag => ["error"] }
  }
}

output {
  elasticsearch {
    hosts => ["localhost:9200"]
    index => "omnigcloud-%{+YYYY.MM.dd}"
  }
}
```

## Performance

### Memory Footprint
- **Logger**: Negligible (no buffering)
- **Metrics**: ~1MB for 1000 unique metric series
- **Audit Log**: ~10MB for 10,000 events (configurable limit)

### Overhead
- **Logging**: <1ms per log entry
- **Metrics**: <0.1ms per metric update
- **Audit**: <5ms per event (async, non-blocking)

## Security

### PII Protection
All observability components automatically:
- Mask email addresses in logs
- Remove sensitive fields (passwords, tokens, API keys)
- Never log request/response bodies by default

### Access Control
- `/api/metrics` endpoint should be protected in production
- Consider IP whitelisting for Prometheus scraper
- Audit logs contain sensitive information - restrict access

## Best Practices

1. **Use Request IDs**: Always include `requestId` in logs for traceability
2. **Structured Context**: Pass context objects instead of string interpolation
3. **Appropriate Log Levels**: 
   - `debug`: Development-only verbose logging
   - `info`: Normal operations
   - `warn`: Recoverable errors, rate limits
   - `error`: Unrecoverable errors, exceptions
4. **Metric Labels**: Keep cardinality low (avoid user IDs in labels)
5. **Audit Critical Events**: Log all security-relevant actions

## Troubleshooting

### No logs appearing
- Check `NODE_ENV` - debug logs only show in development
- Verify console output is being captured by your runtime

### Metrics not updating
- Check `ENABLE_METRICS` environment variable
- Verify `/api/metrics` endpoint is accessible

### High memory usage
- Reduce audit log retention: Modify `maxEvents` in `InMemoryAuditStorage`
- Reduce metric retention: Modify histogram buffer size in `MetricsCollector`
- Consider implementing custom storage backends for production

## Future Enhancements

- [ ] Database-backed audit log storage
- [ ] Distributed tracing (OpenTelemetry)
- [ ] Custom metric exporters (Datadog, New Relic)
- [ ] Real-time alerting integration
- [ ] Log sampling for high-volume endpoints
