/**
 * Lightweight metrics collection with pluggable backend
 * Prometheus-compatible format, but works in-memory by default
 */

export interface MetricLabels {
    [key: string]: string;
}

export interface Metric {
    name: string;
    type: 'counter' | 'gauge' | 'histogram';
    value: number;
    labels?: MetricLabels;
    timestamp: number;
}

class MetricsCollector {
    private metrics: Map<string, Metric> = new Map();
    private histograms: Map<string, number[]> = new Map();
    private enabled = process.env.ENABLE_METRICS !== 'false';

    private getKey(name: string, labels?: MetricLabels): string {
        if (!labels) return name;
        const labelStr = Object.entries(labels)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([k, v]) => `${k}="${v}"`)
            .join(',');
        return `${name}{${labelStr}}`;
    }

    /**
     * Increment a counter metric
     */
    increment(name: string, labels?: MetricLabels, value: number = 1) {
        if (!this.enabled) return;

        const key = this.getKey(name, labels);
        const existing = this.metrics.get(key);

        if (existing) {
            existing.value += value;
            existing.timestamp = Date.now();
        } else {
            this.metrics.set(key, {
                name,
                type: 'counter',
                value,
                labels,
                timestamp: Date.now(),
            });
        }
    }

    /**
     * Set a gauge metric (current value)
     */
    gauge(name: string, value: number, labels?: MetricLabels) {
        if (!this.enabled) return;

        const key = this.getKey(name, labels);
        this.metrics.set(key, {
            name,
            type: 'gauge',
            value,
            labels,
            timestamp: Date.now(),
        });
    }

    /**
     * Record a histogram value (for latency tracking)
     */
    histogram(name: string, value: number, labels?: MetricLabels) {
        if (!this.enabled) return;

        const key = this.getKey(name, labels);

        if (!this.histograms.has(key)) {
            this.histograms.set(key, []);
        }

        const values = this.histograms.get(key)!;
        values.push(value);

        // Keep only last 1000 values to prevent memory bloat
        if (values.length > 1000) {
            values.shift();
        }

        // Calculate percentiles
        const sorted = [...values].sort((a, b) => a - b);
        const p50 = sorted[Math.floor(sorted.length * 0.5)];
        const p95 = sorted[Math.floor(sorted.length * 0.95)];
        const p99 = sorted[Math.floor(sorted.length * 0.99)];

        this.metrics.set(key, {
            name,
            type: 'histogram',
            value: p50,
            labels: { ...labels, quantile: '0.5' },
            timestamp: Date.now(),
        });

        this.metrics.set(`${key}_p95`, {
            name,
            type: 'histogram',
            value: p95,
            labels: { ...labels, quantile: '0.95' },
            timestamp: Date.now(),
        });

        this.metrics.set(`${key}_p99`, {
            name,
            type: 'histogram',
            value: p99,
            labels: { ...labels, quantile: '0.99' },
            timestamp: Date.now(),
        });
    }

    /**
     * Get all metrics in Prometheus text format
     */
    getPrometheusMetrics(): string {
        const lines: string[] = [];

        for (const metric of this.metrics.values()) {
            const labelStr = metric.labels
                ? Object.entries(metric.labels)
                    .map(([k, v]) => `${k}="${v}"`)
                    .join(',')
                : '';

            const metricName = metric.name.replace(/-/g, '_');
            const fullName = labelStr ? `${metricName}{${labelStr}}` : metricName;
            lines.push(`${fullName} ${metric.value} ${metric.timestamp}`);
        }

        return lines.join('\n');
    }

    /**
     * Get all metrics as JSON
     */
    getMetrics(): Metric[] {
        return Array.from(this.metrics.values());
    }

    /**
     * Clear all metrics (useful for testing)
     */
    reset() {
        this.metrics.clear();
        this.histograms.clear();
    }
}

export const metrics = new MetricsCollector();

/**
 * Convenience hooks for common metrics
 */
export const metricsHooks = {
    /**
     * Track HTTP request
     */
    trackRequest(method: string, route: string, status: number, duration: number) {
        metrics.increment('http_requests_total', { method, route, status: String(status) });
        metrics.histogram('http_request_duration_ms', duration, { method, route });
    },

    /**
     * Track API errors
     */
    trackError(route: string, errorType: string) {
        metrics.increment('api_errors_total', { route, error_type: errorType });
    },

    /**
     * Track authentication events
     */
    trackAuth(event: 'login' | 'logout' | 'failed', provider?: string) {
        metrics.increment('auth_events_total', { event, provider: provider || 'unknown' });
    },

    /**
     * Track rate limit hits
     */
    trackRateLimit(identifier: string, allowed: boolean) {
        metrics.increment('rate_limit_checks_total', {
            identifier,
            result: allowed ? 'allowed' : 'blocked'
        });
    },
};
