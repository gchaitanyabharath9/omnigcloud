export type ErrorCode =
    | 'VALIDATION_ERROR'
    | 'AUTH_ERROR'
    | 'NOT_FOUND'
    | 'RATE_LIMIT_EXCEEDED'
    | 'EXTERNAL_SERVICE_ERROR'
    | 'TIMEOUT_ERROR'
    | 'CONFIG_ERROR'
    | 'INTERNAL_SERVER_ERROR'
    | 'BAD_REQUEST';

export class AppError extends Error {
    public readonly code: ErrorCode;
    public readonly httpStatus: number;
    public readonly retryable: boolean;
    public readonly details?: unknown;

    constructor(opts: {
        code: ErrorCode;
        message: string;
        httpStatus?: number;
        retryable?: boolean;
        details?: unknown;
    }) {
        super(opts.message);
        this.name = 'AppError';
        this.code = opts.code;
        this.httpStatus = opts.httpStatus || 500;
        this.retryable = opts.retryable || false;
        this.details = opts.details;

        // Restore prototype chain for instance checks
        Object.setPrototypeOf(this, AppError.prototype);
    }

    static isAppError(error: unknown): error is AppError {
        return error instanceof AppError;
    }
}

export class ValidationError extends AppError {
    constructor(message: string, details?: any) {
        super({
            code: 'VALIDATION_ERROR',
            message,
            httpStatus: 400,
            retryable: false,
            details,
        });
    }
}

export class AuthError extends AppError {
    constructor(message: string = 'Unauthorized') {
        super({
            code: 'AUTH_ERROR',
            message,
            httpStatus: 401,
            retryable: false,
        });
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = 'Resource not found') {
        super({
            code: 'NOT_FOUND',
            message,
            httpStatus: 404,
            retryable: false,
        });
    }
}

export class RateLimitError extends AppError {
    constructor(message: string = 'Rate limit exceeded') {
        super({
            code: 'RATE_LIMIT_EXCEEDED',
            message,
            httpStatus: 429,
            retryable: true,
        });
    }
}

export class ExternalServiceError extends AppError {
    constructor(message: string, details?: any) {
        super({
            code: 'EXTERNAL_SERVICE_ERROR',
            message,
            httpStatus: 502,
            retryable: true,
            details,
        });
    }
}

export class TimeoutError extends AppError {
    constructor(message: string = 'Request timed out') {
        super({
            code: 'TIMEOUT_ERROR',
            message,
            httpStatus: 504,
            retryable: true,
        });
    }
}

export class ConfigError extends AppError {
    constructor(message: string) {
        super({
            code: 'CONFIG_ERROR',
            message,
            httpStatus: 500,
            retryable: false,
        });
    }
}

export function normalizeError(error: unknown): AppError {
    if (AppError.isAppError(error)) {
        return error;
    }

    if (error instanceof Error) {
        // Handle specific error types if needed (e.g. database errors)
        const message = error.message;

        // Example: Detect timeouts
        if (message.includes('timeout') || message.includes('ETIMEDOUT')) {
            return new TimeoutError(message);
        }

        return new AppError({
            code: 'INTERNAL_SERVER_ERROR',
            message: process.env.NODE_ENV === 'production'
                ? 'An unexpected error occurred.'
                : message,
            httpStatus: 500,
            details: process.env.NODE_ENV === 'development' ? { stack: error.stack } : undefined,
        });
    }

    return new AppError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unknown error occurred.',
        httpStatus: 500,
    });
}
