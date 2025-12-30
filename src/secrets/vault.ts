import vault from 'node-vault';

// Initialize Vault client
// Expects VAULT_ADDR and VAULT_TOKEN to be set in environment variables
// in non-local environments.
const client = vault({
    endpoint: process.env.VAULT_ADDR,
    token: process.env.VAULT_TOKEN,
});

export const vaultClient = client;

/**
 * Reads a secret from HashiCorp Vault KV v2 engine.
 * @param path The path to the secret (e.g. "nascent-zodiac/prod")
 * @returns The secret data object
 */
export async function getVaultSecret(path: string): Promise<Record<string, any> | null> {
    try {
        // KV v2 requires adding "data/" after the mount point (usually "secret")
        // We assume the default mount point "secret" for simplicity, or the user
        // provides "secret/data/..."

        // If path doesn't contain 'data', we might need to inject it if we want to be helpful,
        // but strictly standard Vault paths are explicit.
        // Let's support the standard `read` method which node-vault handles.

        const response = await client.read(path);

        // Vault KV v2 returns data in response.data.data
        if (response && response.data && response.data.data) {
            return response.data.data;
        }

        // Fallback for KV v1 or direct read
        if (response && response.data) {
            return response.data;
        }

        return null;
    } catch (error) {
        console.error(`Vault Error reading path ${path}:`, error);
        return null;
    }
}
