export const UTM_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'gclid',
    'fbclid',
    'li_fat_id'
] as const;

export type UtmParams = Record<typeof UTM_KEYS[number], string>;

export function getUtmFromUrl(searchParams: URLSearchParams): UtmParams {
    const utms: Partial<UtmParams> = {};
    UTM_KEYS.forEach(key => {
        const value = searchParams.get(key);
        if (value) {
            utms[key] = value;
        }
    });
    return utms as UtmParams;
}

export function saveUtmToStorage(utms: UtmParams) {
    if (typeof window === 'undefined') return;

    try {
        const existing = JSON.parse(sessionStorage.getItem('omnig_utms') || '{}');
        const updated = { ...existing, ...utms, timestamp: Date.now() };
        sessionStorage.setItem('omnig_utms', JSON.stringify(updated));

        // Also set a cookie for server-side access if needed (optional, using document.cookie for simplicity)
        // Only strictly necessary keys, short TTL (7 days)
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);

        Object.entries(utms).forEach(([key, value]) => {
            document.cookie = `${key}=${encodeURIComponent(value)}; path=/; expires=${expiry.toUTCString()}; SameSite=Lax`;
        });

    } catch (e) {
        // Fail silently in private mode / storage restrictions
        if (process.env.NODE_ENV === 'development') console.warn('UTM Storage persistence failed', e);
    }
}

export function getUtmFromStorage(): UtmParams | null {
    if (typeof window === 'undefined') return null;
    try {
        const stored = sessionStorage.getItem('omnig_utms');
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
}
