/**
 * Structured logging utility with PII-safe output
 * Outputs JSON logs for production observability
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogContext {
    requestId?: string;
    route?: string;
    method?: string;
    status?: number | string;
    userId?: string;
    duration?: number;
    [key: string]: any;
}

class Logger {
    private isDevelopment = process.env.NODE_ENV === 'development';

    private formatLog(level: LogLevel, message: string, context?: LogContext) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            message,
            ...context,
        };

        return JSON.stringify(logEntry);
    }

    private maskEmail(email?: string): string | undefined {
        if (!email) return undefined;
        return email.replace(/^(.)(.*)(@.*)$/, (_, a, b, c) => a + b.replace(/./g, '*') + c);
    }

    private sanitizeContext(context?: LogContext): LogContext | undefined {
        if (!context) return undefined;

        const sanitized = { ...context };

        // Mask any email fields
        if (sanitized.email) {
            sanitized.email = this.maskEmail(sanitized.email);
        }
        if (sanitized.userEmail) {
            sanitized.userEmail = this.maskEmail(sanitized.userEmail);
        }

        // Remove sensitive fields
        delete sanitized.password;
        delete sanitized.token;
        delete sanitized.secret;
        delete sanitized.apiKey;

        return sanitized;
    }

    debug(message: string, context?: LogContext) {
        if (this.isDevelopment) {
            console.debug(this.formatLog('debug', message, this.sanitizeContext(context)));
        }
    }

    info(message: string, context?: LogContext) {
        console.info(this.formatLog('info', message, this.sanitizeContext(context)));
    }

    warn(message: string, context?: LogContext) {
        console.warn(this.formatLog('warn', message, this.sanitizeContext(context)));
    }

    error(message: string, context?: LogContext) {
        console.error(this.formatLog('error', message, this.sanitizeContext(context)));
    }

    /**
     * Log HTTP request/response
     */
    http(context: LogContext) {
        const { method, route, status, duration, requestId } = context;
        const message = `${method} ${route} ${status}`;

        if (typeof status === 'number' && status >= 500) {
            this.error(message, { requestId, duration, status });
        } else if (typeof status === 'number' && status >= 400) {
            this.warn(message, { requestId, duration, status });
        } else {
            this.info(message, { requestId, duration, status });
        }
    }
}

export const logger = new Logger();
