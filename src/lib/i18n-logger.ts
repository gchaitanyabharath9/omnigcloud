const seenKeys = new Set<string>();

export function logMissingKey(locale: string, key: string) {
    const identifier = `${locale}:${key}`;
    if (seenKeys.has(identifier)) return;

    seenKeys.add(identifier);

    const message = `[i18n_missing_key] Locale: ${locale} | Key: ${key}`;

    if (process.env.NODE_ENV === 'development') {
        console.warn(message);
    } else {
        // In production, we still log but potentially to a monitoring service
        // Example: Sentry.captureMessage(message, { tags: { locale, key } });
        console.log(message);
    }
}
