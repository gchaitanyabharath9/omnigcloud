import { AppError, TimeoutError, ExternalServiceError } from './errors';
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

                } catch (err) {
                    clearTimeout(timeoutId);
                    throw err;
                }
            } else {
                return await operation();
            }

        } catch (error: any) {
            // Determine if we should retry
            let shouldRetry = false;

            if (attempt < opts.maxAttempts) {
                if (AppError.isAppError(error)) {
                    shouldRetry = error.retryable;
                    if (opts.retryableErrors && !opts.retryableErrors.includes(error.code)) {
                        shouldRetry = false;
                    }
                } else {
                    // Normalize unknown errors check? 
                    // Usually we treat network errors are retryable. 
                    // Simple check for now:
                    if (error.code === 'ECONNRESET' || error.message.includes('network') || error.name === 'TimeoutError') {
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
                error: error.message,
                delay
            });

            await sleep(delay);
        }
    }
}
