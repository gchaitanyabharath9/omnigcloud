import { Redis } from '@upstash/redis';

export interface RateLimitResult {
    allowed: boolean;
    retryAfter?: number;
}

export interface RateLimiter {
    check(ip: string): Promise<RateLimitResult>;
}

export class RedisRateLimiter implements RateLimiter {
    private redis: Redis;
    private readonly windowMs = 60; // 1 minute window in seconds
    private readonly limit = 100;

    constructor() {
        this.redis = new Redis({
            url: process.env.REDIS_URL || '',
            token: process.env.REDIS_TOKEN || '',
        });
    }

    async check(ip: string): Promise<RateLimitResult> {
        const key = `rate-limit:${ip}`;
        const now = Math.floor(Date.now() / 1000);
        const windowKey = `${key}:${Math.floor(now / this.windowMs)}`;

        try {
            const count = await this.redis.incr(windowKey);

            if (count === 1) {
                await this.redis.expire(windowKey, this.windowMs);
            }

            if (count > this.limit) {
                const ttl = await this.redis.ttl(windowKey);
                return {
                    allowed: false,
                    retryAfter: ttl > 0 ? ttl : this.windowMs
                };
            }

            return { allowed: true };
        } catch (error) {
            console.error('Redis Rate Limiter Error:', error);
            // Fallback to allow if Redis is down in production (fail open)
            return { allowed: true };
        }
    }
}

export class NoopRateLimiter implements RateLimiter {
    async check(_ip: string): Promise<RateLimitResult> {
        return { allowed: true };
    }
}

export function getRateLimiter(): RateLimiter {
    const isRedisEnabled = process.env.ENABLE_REDIS_RATE_LIMIT === 'true';

    if (isRedisEnabled && process.env.REDIS_URL && process.env.REDIS_TOKEN) {
        return new RedisRateLimiter();
    }

    return new NoopRateLimiter();
}
