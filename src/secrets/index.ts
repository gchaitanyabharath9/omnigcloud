import { config } from '../config';
import { getVaultSecret } from './vault';

// In-memory cache for Vault secrets to prevent excessive network calls
let vaultCache: Record<string, any> | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute cache

/**
 * Retrieves a secret value.
 * - In 'local' environment: Reads from process.env
 * - In other environments: Reads from Vault (cached)
 * 
 * @param key The name of the secret key (e.g. 'AUTH_SECRET')
 * @returns The secret value string or undefined
 */
export async function getSecret(key: string): Promise<string | undefined> {
    const env = config.env;

    if (env === 'local') {
        return process.env[key];
    }

    // For non-local environments (dev, sit, uat, prod), fetch from Vault
    if (!vaultCache || (Date.now() - cacheTimestamp > CACHE_TTL_MS)) {
        try {
            // Standardize path: secret/data/nascent-zodiac/<env>
            // Note: KV v2 read paths usually include 'data' between mount and path.
            // Assuming default 'secret' mount.
            const vaultPath = `secret/data/nascent-zodiac/${env}`;

            const secretData = await getVaultSecret(vaultPath);
            if (secretData) {
                vaultCache = secretData;
                cacheTimestamp = Date.now();
            } else {
                console.warn(`[Secrets] No data found at ${vaultPath}`);
            }
        } catch (err) {
            console.error('[Secrets] Failed to refresh Vault cache:', err);
            // Fallback to existing cache if available
        }
    }

    // Return from cache if available, otherwise fallback to process.env (optional safety net)
    return (vaultCache && vaultCache[key]) || process.env[key];
}
