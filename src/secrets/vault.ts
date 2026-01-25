import { withRetry } from "@/lib/retry";

// Initialize Vault client lazily to avoid loading 'node-vault' in Edge Runtime
// Expects VAULT_ADDR and VAULT_TOKEN to be set in environment variables
// in non-local environments.

/**
 * Reads a secret from HashiCorp Vault KV v2 engine.
 * @param path The path to the secret (e.g. "nascent-zodiac/prod")
 * @returns The secret data object
 */
export async function getVaultSecret(path: string): Promise<Record<string, string> | null> {
  try {
    // Dynamically import node-vault to prevent Edge Runtime crashes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const vaultModule = (await import("node-vault")) as any;
    const vault = vaultModule.default;

    const client = vault({
      endpoint: process.env.VAULT_ADDR,
      token: process.env.VAULT_TOKEN,
    });

    // KV v2 requires adding "data/" after the mount point (usually "secret")
    // We assume the default mount point "secret" for simplicity, or the user
    // provides "secret/data/..."

    // If path doesn't contain 'data', we might need to inject it if we want to be helpful,
    // but strictly standard Vault paths are explicit.
    // Let's support the standard `read` method which node-vault handles.

    interface VaultResponse {
      data?: {
        data?: Record<string, string>;
      };
    }

    const response = (await withRetry(
      () => client.read(path),
      { maxAttempts: 3, timeoutMs: 3000 },
      "VaultRead"
    )) as VaultResponse;

    // Vault KV v2 returns data in response.data.data
    if (response && response.data && response.data.data) {
      return response.data.data as Record<string, string>;
    }

    // Fallback for KV v1 or direct read
    if (response && response.data) {
      return response.data as Record<string, string>;
    }

    return null;
  } catch (error) {
    console.error(`Vault Error reading path ${path}:`, error);
    return null;
  }
}
