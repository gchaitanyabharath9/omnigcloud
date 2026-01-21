
/**
 * tSafe.ts
 * 
 * A wrapper around next-intl's translation function to prevent key leakage.
 * 
 * Usage:
 * const t = useTranslations('Namespace');
 * const label = tSafe(t, 'key.path', 'Default English Label');
 */

// Helper to prettify a key as a last resort (e.g., "Dashboard.header.title" -> "Title")
function prettifyKey(key: string): string {
    const parts = key.split('.');
    const lastPart = parts[parts.length - 1];
    // Simple sentence case conversion
    return lastPart
        .replace(/([A-Z])/g, ' $1') // Space before capital
        .replace(/^./, (str) => str.toUpperCase()) // Capitalize first
        .trim();
}

// We treat 't' as any function since next-intl types can be complex to import directly from the hook usage context
export function tSafe(t: any, key: string, fallback?: string): string {
    // 1. If translation exists, return it.
    // t.has() is the standard check in next-intl
    if (t && typeof t.has === 'function' && t.has(key)) {
        return t(key);
    }

    // 2. Fallback if provided
    if (fallback) {
        return fallback;
    }

    // 3. Last resort: Prettify the key
    return prettifyKey(key);
}
