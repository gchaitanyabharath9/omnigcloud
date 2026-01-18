import { AppError, TimeoutError } from './errors';
import { logger } from './logger';

interface RetryOptions {
    maxAttempts?: number;
    baseDelayMs?: number;
    maxDelayMs?: number;
    timeoutMs?: number;
    jitter?: boolean;
    retryableErrors?: string[]; // Error codes to retry. If empty, uses error.retryable
}

const DEFAULT_OPTIONS: Required<Omit<RetryOptions, 'retryableErrors'>> = {
    maxAttempts: 3,
    baseDelayMs: 200,
    maxDelayMs: 2000,
    timeoutMs: 5000,
    jitter: true,
};

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function calculateDelay(attempt: number, opts: typeof DEFAULT_OPTIONS): number {
    const exponentialDelay = Math.min(
        opts.baseDelayMs * Math.pow(2, attempt),
        opts.maxDelayMs
    );

    if (opts.jitter) {
        // Add random jitter between 0 and 20% of the delay
        return exponentialDelay * (1 + Math.random() * 0.2);
    }
    return exponentialDelay;
}

export async function withRetry<T>(
    operation: () => Promise<T>,
    options: RetryOptions = {},
    operationName: string = 'Operation'
): Promise<T> {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    let attempt = 0;

    while (true) {
        attempt++;
        try {
            // Execute operation with timeout
            if (opts.timeoutMs > 0) {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), opts.timeoutMs);

                try {
                    // Race the operation against the timeout
                    // Note: The operation function needs to support signal manually if passed,
                    // but for general async valid promises, we can just race the result.
                    // Ideally pass signal to operation, but keeping signature simple for now.
                    // For proper timeout support, the underlying fetch should respect the signal.

                    const result = await Promise.race([
                        operation(),
                        new Promise<T>((_, reject) => {
                            // If the timeout fires, we reject
                            // We attach the timeout listener to the controller's signal abort event
                            controller.signal.addEventListener('abort', () => {
                                reject(new TimeoutError(`${operationName} timed out after ${opts.timeoutMs}ms`));
                            });
                        })
                    ]);
                    clearTimeout(timeoutId);
                    return result;

                } catch (_e) {
                    clearTimeout(timeoutId);
                    throw _e;
                }
            } else {
                return await operation();
            }

        } catch (error: unknown) {
            // Determine if we should retry
            let shouldRetry = false;

            // Safe error narrowing
            const isAppError = AppError.isAppError(error);
            const errName = error instanceof Error ? error.name : '';
            const errMessage = error instanceof Error ? error.message : String(error);
            const errCode = (error as { code?: string })?.code;

            if (attempt < opts.maxAttempts) {
                if (isAppError) {
                    shouldRetry = (error as AppError).retryable;
                    if (opts.retryableErrors && !opts.retryableErrors.includes((error as AppError).code)) {
                        shouldRetry = false;
                    }
                } else {
                    // Normalize unknown errors check
                    if (errCode === 'ECONNRESET' || errMessage.includes('network') || errName === 'TimeoutError') {
                        shouldRetry = true;
                    }
                }
            }

            if (!shouldRetry) {
                throw error;
            }

            const delay = calculateDelay(attempt, opts);
            logger.warn(`Retrying ${operationName}`, {
                attempt,
                maxAttempts: opts.maxAttempts,
                error: error instanceof Error ? error.message : String(error),
                delay
            });

            await sleep(delay);
        }
    }
}
