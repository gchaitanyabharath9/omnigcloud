import { getRequestConfig } from 'next-intl/server';
import { logMissingKey } from '../lib/i18n-logger';

// Supported locales list
export const locales = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];

/**
 * Dynamically loads messages for a given locale with a fallback to 'en'.
 * This ensures the application remains functional even if a translation file is missing.
 */
export async function getMessages(locale: string) {
    try {
        // Attempt to load the requested locale JSON
        // Using dynamic import allows for code splitting and reduces initial bundle size
        return (await import(`../messages/${locale}.json`)).default;
    } catch (err) {
        // Log warning in development/server logs but don't crash
        console.warn(`[i18n] Locale "${locale}" not found or corrupt. Falling back to default "en".`);

        try {
            // Robust fallback to English
            return (await import(`../messages/en.json`)).default;
        } catch (fatalErr) {
            // Absolute fallback to empty object if even 'en' is missing (should not happen with our guard scripts)
            console.error(`[i18n] Fatal: Could not load fallback English messages.`, fatalErr);
            return {};
        }
    }
}

export default getRequestConfig(async ({ requestLocale }) => {
    // Await the locale if it's a promise (standard in next-intl v3/v4 server components)
    let locale = await requestLocale;

    // Enforce valid locale or fallback to 'en'
    if (!locale || !locales.includes(locale)) {
        locale = 'en';
    }

    const messages = await getMessages(locale);

    return {
        locale,
        messages,
        onError(error) {
            // Custom error handling for missing keys to log for future translation work
            if (error.code === 'MISSING_MESSAGE') {
                const key = error.message.match(/key "([^"]+)"/)?.[1] || 'unknown';
                logMissingKey(locale as string, key);
            } else {
                console.error(`[i18n-Config Error]:`, error);
            }
        },
        getMessageFallback({ namespace, key }) {
            // Provide the key itself as fallback to avoid empty UI elements
            return namespace ? `${namespace}.${key}` : key;
        }
    };
});
