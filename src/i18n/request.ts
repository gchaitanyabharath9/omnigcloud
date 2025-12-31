import { getRequestConfig } from 'next-intl/server';
import { logMissingKey } from '../lib/i18n-logger';

function deepMerge(target: any, source: any) {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                } else {
                    output[key] = deepMerge(target[key], source[key]);
                }
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}

function isObject(item: any) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].includes(locale)) {
        locale = 'en';
    }

    // Load default 'en' messages as fallback
    const defaultMessages = (await import(`../../messages/en.json`)).default;

    let userMessages = {};
    if (locale !== 'en') {
        try {
            userMessages = (await import(`../../messages/${locale}.json`)).default;
        } catch (error) {
            console.error(`Could not load messages for locale: ${locale}`, error);
        }
    }

    // Deep merge: user messages override defaults. 
    const messages = deepMerge(defaultMessages, userMessages);

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
        getMessageFallback({ namespace, key, error }) {
            const fullKey = namespace ? `${namespace}.${key}` : key;
            // Fallback to English if possible, otherwise return the key
            const path = fullKey.split('.');
            let val: any = defaultMessages;
            for (const k of path) {
                val = val?.[k];
            }
            return typeof val === 'string' ? val : fullKey;
        }
    };
});
