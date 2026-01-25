import { getRedis } from "./redis";
import { config } from "@/config";

export interface RateLimitResult {
  allowed: boolean;
  retryAfter?: number;
  remaining?: number;
}

export interface RateLimiter {
  check(ip: string, endpoint?: string): Promise<RateLimitResult>;
}

export interface RateLimitConfig {
  limit: number;
  windowMs: number;
}

// Endpoint-specific rate limits
export const RATE_LIMITS: Record<string, RateLimitConfig> = {
  "/api/contact": { limit: 5, windowMs: 60000 }, // 5 requests per minute (strict)
  "/api/leads": { limit: 20, windowMs: 60000 }, // 20 requests per minute
  "/api/metrics": { limit: 100, windowMs: 60000 }, // 100 requests per minute (light)
  "/api/health": { limit: 200, windowMs: 60000 }, // 200 requests per minute
  default: { limit: 200, windowMs: 60000 }, // Increased from 50 to 200 for local dev
};

/**
 * In-memory rate limiter for local development
 * No Redis required, no warnings
 */
export class InMemoryRateLimiter implements RateLimiter {
  private store: Map<string, { count: number; resetAt: number }> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Cleanup expired entries every minute
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, value] of this.store.entries()) {
      if (now > value.resetAt) {
        this.store.delete(key);
      }
    }
  }

  async check(ip: string, endpoint?: string): Promise<RateLimitResult> {
    const config = RATE_LIMITS[endpoint || "default"] || RATE_LIMITS.default;
    const key = `${ip}:${endpoint || "default"}`;
    const now = Date.now();

    const record = this.store.get(key);

    if (!record || now > record.resetAt) {
      // New window
      const resetAt = now + config.windowMs;
      this.store.set(key, { count: 1, resetAt });
      return {
        allowed: true,
        remaining: config.limit - 1,
        retryAfter: Math.ceil(config.windowMs / 1000),
      };
    }

    if (record.count >= config.limit) {
      // Rate limit exceeded
      const retryAfter = Math.ceil((record.resetAt - now) / 1000);
      return {
        allowed: false,
        remaining: 0,
        retryAfter,
      };
    }

    // Increment count
    record.count++;
    return {
      allowed: true,
      remaining: config.limit - record.count,
      retryAfter: Math.ceil((record.resetAt - now) / 1000),
    };
  }

  destroy() {
    clearInterval(this.cleanupInterval);
    this.store.clear();
  }
}

/**
 * Redis-based rate limiter for production
 * Uses Upstash Redis if configured
 */
export class RedisRateLimiter implements RateLimiter {
  async check(ip: string, endpoint?: string): Promise<RateLimitResult> {
    try {
      const redis = await getRedis();

      if (!redis) {
        // Fallback to allow if Redis not configured
        return { allowed: true };
      }

      const config = RATE_LIMITS[endpoint || "default"] || RATE_LIMITS.default;
      const windowSeconds = Math.floor(config.windowMs / 1000);
      const key = `rate-limit:${ip}:${endpoint || "default"}`;
      const now = Math.floor(Date.now() / 1000);
      const windowKey = `${key}:${Math.floor(now / windowSeconds)}`;

      const count = await redis.incr(windowKey);

      if (count === 1) {
        await redis.expire(windowKey, windowSeconds);
      }

      if (count > config.limit) {
        const ttl = await redis.ttl(windowKey);
        return {
          allowed: false,
          remaining: 0,
          retryAfter: ttl > 0 ? ttl : windowSeconds,
        };
      }

      return {
        allowed: true,
        remaining: config.limit - count,
        retryAfter: windowSeconds,
      };
    } catch (error) {
      console.error("Redis Rate Limiter Error:", error);
      // Fail open - allow request if Redis is down
      return { allowed: true };
    }
  }
}

/**
 * No-op rate limiter (allows all requests)
 */
export class NoopRateLimiter implements RateLimiter {
  async check(_ip: string, _endpoint?: string): Promise<RateLimitResult> {
    return { allowed: true };
  }
}

/**
 * Get appropriate rate limiter based on environment
 */
export function getRateLimiter(): RateLimiter {
  // Bypass in CI or Quality Gate runs to prevent 429s
  if (process.env.CI === "true" || process.env.QUALITY_GATE === "true") {
    return new NoopRateLimiter();
  }

  // Local development: use in-memory limiter (no Redis required)
  if (config.env === "local" || process.env.NODE_ENV === "development") {
    return new InMemoryRateLimiter();
  }

  // Production: use Redis if configured, otherwise noop
  if (config.features.enableRateLimit && process.env.REDIS_URL && process.env.REDIS_TOKEN) {
    return new RedisRateLimiter();
  }

  // Fallback: no rate limiting
  return new NoopRateLimiter();
}
