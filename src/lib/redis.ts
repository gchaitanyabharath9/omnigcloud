import { Redis } from '@upstash/redis';
import { getSecret } from '@/secrets';
import { config } from '@/config';

let redisInstance: Redis | null = null;
let initializationPromise: Promise<Redis | null> | null = null;

async function initRedis(): Promise<Redis | null> {
    // If explicitly disabled in config, return null immediately
    if (!config.features.enableRateLimit && !config.database.redisUrl) {
        // However, we might use Redis for things other than rate limit (like Leads).
        // So this check is weak.
        // Better: check if Env vars are set locally, or try to fetch.
    }

    const url = await getSecret('REDIS_URL');
    const token = await getSecret('REDIS_TOKEN');

    if (url && token) {
        return new Redis({
            url,
            token,
        });
    }

    // Fail fast for non-local environments if Redis is expected but missing
    if (config.env !== 'local') {
        const msg = `[Redis] Critical: Missing REDIS_URL or REDIS_TOKEN in ${config.env}`;
        console.error(msg);
        // We throw here because the user requested "Fail fast"
        throw new Error(msg);
    }

    return null;
}

/**
 * Returns a Promise that resolves to the Redis singleton instance.
 * Initializes it if not already initialized.
 */
export async function getRedis(): Promise<Redis | null> {
    if (redisInstance) return redisInstance;

    if (!initializationPromise) {
        initializationPromise = initRedis().then(instance => {
            redisInstance = instance;
            return instance;
        });
    }

    return initializationPromise;
}
