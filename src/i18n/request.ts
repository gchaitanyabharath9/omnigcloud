import { getRequestConfig } from 'next-intl/server';
import { logMissingKey } from '../lib/i18n-logger';

export async function getMessages(locale: string) {
    try {
        return (await import(`../messages/${locale}.json`)).default;
    } catch {
        try {
            return (await import(`../messages/en.json`)).default;
        } catch {
            return {};
        }
    }
}

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].includes(locale)) {
        locale = 'en';
    }

    const messages = await getMessages(locale);

    return {
        locale,
        messages,
        onError(error) {
            if (error.code === 'MISSING_MESSAGE') {
                const key = error.message.match(/key "([^"]+)"/)?.[1] || 'unknown';
                logMissingKey(locale, key);
            } else {
                console.error(error);
            }
        },
        getMessageFallback({ namespace, key }) {
            const fullKey = namespace ? `${namespace}.${key}` : key;
            return fullKey;
        }
    };
});
