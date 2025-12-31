/**
 * Client-side resilient fetch utility
 */

export interface SafeFetchOptions<T = any> extends RequestInit {
    timeoutMs?: number;
    maxRetries?: number;
    fallbackData?: T | null;
}

const DEFAULT_TIMEOUT = 5000;
const DEFAULT_RETRIES = 1;

export async function safeFetch<T>(
    input: RequestInfo | URL,
    options: SafeFetchOptions<T> = {}
): Promise<T | null> {
    const {
        timeoutMs = DEFAULT_TIMEOUT,
        maxRetries = DEFAULT_RETRIES,
        fallbackData = null,
        ...fetchOptions
    } = options;

    let attempt = 0;

    while (attempt <= maxRetries) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeoutMs);

        try {
            const response = await fetch(input, {
                ...fetchOptions,
                signal: controller.signal,
            });

            clearTimeout(id);

            if (!response.ok) {
                // If it's a 4xx error, don't retry, just return fallback
                if (response.status >= 400 && response.status < 500) {
                    console.warn(`[SafeFetch] Request failed with client error: ${response.status}`);
                    return fallbackData;
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json = await response.json();
            // Handle consistent API envelope if present
            if (json && json.status === 'success') {
                return json.data;
            }
            return json;

        } catch (error: unknown) {
            const err = error as Error;
            clearTimeout(id);
            attempt++;

            const isTimeout = err.name === 'AbortError';
            const isNetworkError = err.name === 'TypeError' || err.message.includes('network');

            if (attempt <= maxRetries && (isTimeout || isNetworkError)) {
                console.warn(`[SafeFetch] Attempt ${attempt} failed, retrying...`, err.message);
                continue;
            }

            console.error('[SafeFetch] All attempts failed:', err.message);
            return fallbackData;
        }
    }

    return fallbackData;
}
