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
// We use getters to avoid top-level process.env access during module import (build-time safety)

export const APP_CONFIG = {
    name: "OmniGCloud",
    locales: APP_LOCALES,
    defaultLocale: DEFAULT_LOCALE,

    /**
     * The canonical base URL for this environment, without trailing slash.
     * Example: "https://omnigcloud.com" or "http://localhost:3000"
     */
    get siteUrl() {
        return normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL || "https://www.omnigcloud.com");
    },

    /**
     * Alternate URLs that should redirect to the canonical siteUrl.
     * Example: ["https://www.omnigcloud.com"]
     */
    get alternateUrls() {
        return (process.env.NEXT_PUBLIC_SITE_ALTERNATE_URLS || "").split(",").filter(Boolean).map(normalizeUrl);
    },

    /**
     * Helper to generate absolute URLs using the canonical base.
     * Handles relative paths, or normalizes existing absolute URLs.
     */
    absoluteUrl: (pathOrUrl: string): string => {
        const baseUrl = APP_CONFIG.siteUrl;
        if (!pathOrUrl) return baseUrl;

        // If already absolute
        if (pathOrUrl.startsWith("http")) {
            const url = new URL(pathOrUrl);
            // If it matches one of our known hosts (canonical or alternate), force canonical
            if (
                isKnownHost(url.origin)
            ) {
                return `${baseUrl}${url.pathname}${url.search}${url.hash}`;
            }
            return pathOrUrl; // External URL, return as-is
        }

        // Relative path
        const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
        return `${baseUrl}${path}`;
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
