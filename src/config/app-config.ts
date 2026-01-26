/**
 * Centralized Application Configuration
 *
 * Single source of truth for:
 * - Supported locales
 * - Environment-specific URLs (Canonical vs Alternates)
 * - Feature flags (future)
 */

// Stable source of truth for locales
export const APP_LOCALES = ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"] as const;
export type AppLocale = (typeof APP_LOCALES)[number];
export const DEFAULT_LOCALE: AppLocale = "en";

// Environment-aware URL configuration
// Environment-aware URL configuration
const getBaseUrl = () => {
    // 1. Explicitly defined public URL (Highest Priority)
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

    // 2. Server-side internal URL (if needed)
    if (process.env.SITE_URL) return process.env.SITE_URL;

    // 3. Vercel Preview/Production URL (System assigned)
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }

    // 4. Default Fallback (Safety Net)
    return "https://www.omnigcloud.com";
};

const ENV_SITE_URL = getBaseUrl();
const ENV_ALTERNATE_URLS = (process.env.NEXT_PUBLIC_SITE_ALTERNATE_URLS || "").split(",").filter(Boolean);

export const APP_CONFIG = {
    name: "OmniGCloud",
    locales: APP_LOCALES,
    defaultLocale: DEFAULT_LOCALE,

    /**
     * The canonical base URL for this environment, without trailing slash.
     * Example: "https://omnigcloud.com" or "http://localhost:3000"
     */
    siteUrl: normalizeUrl(ENV_SITE_URL),

    /**
     * Alternate URLs that should redirect to the canonical siteUrl.
     * Example: ["https://www.omnigcloud.com"]
     */
    alternateUrls: ENV_ALTERNATE_URLS.map(normalizeUrl),

    /**
     * Helper to generate absolute URLs using the canonical base.
     * Handles relative paths, or normalizes existing absolute URLs.
     */
    absoluteUrl: (pathOrUrl: string): string => {
        if (!pathOrUrl) return APP_CONFIG.siteUrl;

        // If already absolute
        if (pathOrUrl.startsWith("http")) {
            const url = new URL(pathOrUrl);
            // If it matches one of our known hosts (canonical or alternate), force canonical
            if (
                isKnownHost(url.origin)
            ) {
                return `${APP_CONFIG.siteUrl}${url.pathname}${url.search}${url.hash}`;
            }
            return pathOrUrl; // External URL, return as-is
        }

        // Relative path
        const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
        return `${APP_CONFIG.siteUrl}${path}`;
    },

    isSupportedLocale: (locale: string): locale is AppLocale => {
        return APP_LOCALES.includes(locale as AppLocale);
    },
};

// --- Helpers ---

function normalizeUrl(url: string): string {
    return url.replace(/\/$/, "");
}

function isKnownHost(origin: string): boolean {
    return (
        origin === APP_CONFIG.siteUrl ||
        APP_CONFIG.alternateUrls.includes(origin) ||
        // Handle www/non-www mismatch if not explicitly in alternates, just in case
        origin.replace("www.", "") === APP_CONFIG.siteUrl.replace("www.", "")
    );
}
