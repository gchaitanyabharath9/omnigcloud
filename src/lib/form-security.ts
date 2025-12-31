import { NextRequest } from 'next/server';
import { createErrorResponse } from './api-utils';

/**
 * Form security utilities for bot/spam protection
 */

export interface HoneypotValidation {
    isBot: boolean;
    field?: string;
}

export interface FormSecurityConfig {
    maxPayloadSize?: number;      // Max request size in bytes (default: 10KB)
    minSubmitTime?: number;        // Min time to submit in ms (default: 2000ms)
    maxSubmitTime?: number;        // Max time to submit in ms (default: 5 minutes)
    honeypotFields?: string[];     // Honeypot field names
    requiredContentType?: string;  // Required content-type
}

const DEFAULT_CONFIG: Required<FormSecurityConfig> = {
    maxPayloadSize: 10 * 1024,     // 10KB
    minSubmitTime: 2000,           // 2 seconds
    maxSubmitTime: 5 * 60 * 1000,  // 5 minutes
    honeypotFields: ['website', 'url', 'homepage', 'phone_number'],
    requiredContentType: 'application/json'
};

/**
 * Check honeypot fields for bot detection
 */
export function checkHoneypot(
    body: any,
    honeypotFields: string[] = DEFAULT_CONFIG.honeypotFields
): HoneypotValidation {
    for (const field of honeypotFields) {
        if (body[field] !== undefined && body[field] !== '') {
            return { isBot: true, field };
        }
    }
    return { isBot: false };
}

/**
 * Validate request content-type
 */
export function validateContentType(
    request: NextRequest,
    requiredType: string = DEFAULT_CONFIG.requiredContentType
): boolean {
    const contentType = request.headers.get('content-type');
    return contentType?.includes(requiredType) ?? false;
}

/**
 * Validate request payload size
 */
export async function validatePayloadSize(
    request: NextRequest,
    maxSize: number = DEFAULT_CONFIG.maxPayloadSize
): Promise<{ valid: boolean; size?: number }> {
    const contentLength = request.headers.get('content-length');

    if (contentLength) {
        const size = parseInt(contentLength);
        if (size > maxSize) {
            return { valid: false, size };
        }
    }

    return { valid: true };
}

/**
 * Validate time-to-submit heuristic
 * Helps detect automated form submissions
 */
export function validateSubmitTime(
    formStartTime: number,
    config: Pick<FormSecurityConfig, 'minSubmitTime' | 'maxSubmitTime'> = {}
): { valid: boolean; duration: number } {
    const minTime = config.minSubmitTime ?? DEFAULT_CONFIG.minSubmitTime;
    const maxTime = config.maxSubmitTime ?? DEFAULT_CONFIG.maxSubmitTime;

    const duration = Date.now() - formStartTime;

    if (duration < minTime) {
        // Too fast - likely a bot
        return { valid: false, duration };
    }

    if (duration > maxTime) {
        // Too slow - form might be stale
        return { valid: false, duration };
    }

    return { valid: true, duration };
}

/**
 * Sanitize form data for logging
 * Removes sensitive user content
 */
export function sanitizeForLogging(data: any): any {
    const sensitiveFields = [
        'message',
        'comment',
        'description',
        'content',
        'body',
        'text',
        'password',
        'token',
        'secret',
        'apiKey',
        'creditCard',
        'ssn'
    ];

    const sanitized: any = {};

    for (const [key, value] of Object.entries(data)) {
        const isSensitive = sensitiveFields.some(field =>
            key.toLowerCase().includes(field.toLowerCase())
        );

        if (isSensitive) {
            sanitized[key] = '[REDACTED]';
        } else {
            sanitized[key] = value;
        }
    }

    return sanitized;
}

/**
 * Comprehensive form security validation
 */
export async function validateFormSecurity(
    request: NextRequest,
    body: any,
    config: FormSecurityConfig = {}
): Promise<{
    valid: boolean;
    error?: {
        code: string;
        message: string;
        retryable: boolean;
    };
}> {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };

    // 1. Content-Type validation
    if (!validateContentType(request, finalConfig.requiredContentType)) {
        return {
            valid: false,
            error: {
                code: 'INVALID_CONTENT_TYPE',
                message: 'Invalid content-type. Expected application/json',
                retryable: false
            }
        };
    }

    // 2. Payload size validation
    const sizeCheck = await validatePayloadSize(request, finalConfig.maxPayloadSize);
    if (!sizeCheck.valid) {
        return {
            valid: false,
            error: {
                code: 'PAYLOAD_TOO_LARGE',
                message: `Request payload exceeds maximum size of ${finalConfig.maxPayloadSize} bytes`,
                retryable: false
            }
        };
    }

    // 3. Honeypot validation
    const honeypotCheck = checkHoneypot(body, finalConfig.honeypotFields);
    if (honeypotCheck.isBot) {
        // Don't tell the bot it was detected - return success
        // This will be handled by the caller
        return { valid: true };
    }

    // 4. Time-to-submit validation (if timestamp provided)
    if (body._formStartTime) {
        const timeCheck = validateSubmitTime(body._formStartTime, {
            minSubmitTime: finalConfig.minSubmitTime,
            maxSubmitTime: finalConfig.maxSubmitTime
        });

        if (!timeCheck.valid) {
            if (timeCheck.duration < finalConfig.minSubmitTime) {
                // Too fast - likely bot, but don't tell them
                return { valid: true };
            } else {
                // Too slow - form expired
                return {
                    valid: false,
                    error: {
                        code: 'FORM_EXPIRED',
                        message: 'Form submission expired. Please refresh and try again.',
                        retryable: true
                    }
                };
            }
        }
    }

    return { valid: true };
}

/**
 * Common honeypot field names to use in forms
 */
export const HONEYPOT_FIELDS = {
    website: 'website',           // Most common
    url: 'url',
    homepage: 'homepage',
    phone_number: 'phone_number', // Note: different from 'phone'
    company_url: 'company_url',
    fax: 'fax'
} as const;

/**
 * Generate form start timestamp for client-side
 */
export function generateFormStartTime(): number {
    return Date.now();
}
