import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja'].includes(locale)) {
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
            // If load fails, userMessages remains empty, effectively falling back to defaultMessages
        }
    }

    // Shallow merge: user messages override defaults. 
    // Note: For deep merging (nested objects), a library like lodash.merge would be ideal, 
    // but this covers the requirement of preventing crashes and providing defaults for top-level keys.
    const messages = { ...defaultMessages, ...userMessages };

    return {
        locale,
        messages
    };
});
