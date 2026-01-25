import { config } from "../config";
// import { getVaultSecret } from './vault'; // Dynamically imported to support Edge

// In-memory cache for Vault secrets to prevent excessive network calls
let vaultCache: Record<string, string> | null = null;
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

  // 1. Priority: Check Environment Variables (Standard for Vercel/Local)
  if (process.env[key]) {
    return process.env[key];
  }

  if (env === "local") {
    return undefined;
  }

  // 2. Fallback: Fetch from Vault (for advanced non-local setups)
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    (!vaultCache || Date.now() - cacheTimestamp > CACHE_TTL_MS)
  ) {
    try {
      // Standardize path: secret/data/nascent-zodiac/<env>
      const vaultPath = `secret/data/nascent-zodiac/${env}`;

      const { getVaultSecret } = await import("./vault");
      const secretData = await getVaultSecret(vaultPath);

      if (secretData) {
        vaultCache = secretData;
        cacheTimestamp = Date.now();
      } else {
        console.warn(`[Secrets] No data found at ${vaultPath}`);
      }
    } catch (err) {
      console.error("[Secrets] Failed to refresh Vault cache:", err);
      // Fallback to existing cache if available
    }
  }

  return (vaultCache && vaultCache[key]) || undefined;
}
