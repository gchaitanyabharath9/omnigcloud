import { Redis } from '@upstash/redis';
import { getRedis } from './redis';
import { config } from '@/config';

export interface RateLimitResult {
    allowed: boolean;
    retryAfter?: number;
}

export interface RateLimiter {
    check(ip: string): Promise<RateLimitResult>;
}

export class RedisRateLimiter implements RateLimiter {
    private readonly windowMs = 60; // 1 minute window in seconds
    private readonly limit = 100;

    async check(ip: string): Promise<RateLimitResult> {
        try {
            const redis = await getRedis();

            if (!redis) {
                // Should potentially not happen if we check config before instantiating,
                // but safe fallback is good.
                return { allowed: true };
            }

            const key = `rate-limit:${ip}`;
            const now = Math.floor(Date.now() / 1000);
            const windowKey = `${key}:${Math.floor(now / this.windowMs)}`;

            const count = await redis.incr(windowKey);

            if (count === 1) {
                await redis.expire(windowKey, this.windowMs);
            }

            if (count > this.limit) {
                const ttl = await redis.ttl(windowKey);
                return {
                    allowed: false,
                    retryAfter: ttl > 0 ? ttl : this.windowMs
                };
            }

            return { allowed: true };
        } catch (error) {
            console.error('Redis Rate Limiter Error:', error);
            // Fallback to allow if Redis is down (fail open)
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
    // Usage of config allows this to be synchronous
    if (config.features.enableRateLimit) {
        return new RedisRateLimiter();
    }

    return new NoopRateLimiter();
}
