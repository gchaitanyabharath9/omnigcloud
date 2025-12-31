import { NextRequest, NextResponse } from 'next/server';
import { randomBytes, createHmac } from 'crypto';

/**
 * CSRF Protection Utilities
 * 
 * Implements double-submit cookie pattern for CSRF protection
 * - Token stored in cookie (httpOnly, Secure, SameSite)
 * - Same token sent in request header
 * - Server validates both match
 */

const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';
const CSRF_SECRET = process.env.CSRF_SECRET || 'default-csrf-secret-change-in-production';

export interface CsrfValidationResult {
    valid: boolean;
    error?: {
        code: string;
        message: string;
        retryable: boolean;
    };
}

/**
 * Generate a cryptographically secure CSRF token
 */
export function generateCsrfToken(): string {
    const token = randomBytes(32).toString('base64url');
    const timestamp = Date.now().toString();
    const signature = createHmac('sha256', CSRF_SECRET)
        .update(`${token}:${timestamp}`)
        .digest('base64url');

    return `${token}.${timestamp}.${signature}`;
}

/**
 * Verify CSRF token signature and expiration
 */
function verifyCsrfToken(token: string): boolean {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return false;

        const [tokenValue, timestamp, signature] = parts;

        // Verify signature
        const expectedSignature = createHmac('sha256', CSRF_SECRET)
            .update(`${tokenValue}:${timestamp}`)
            .digest('base64url');

        if (signature !== expectedSignature) return false;

        // Check expiration (24 hours)
        const tokenAge = Date.now() - parseInt(timestamp);
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours

        if (tokenAge > maxAge) return false;

        return true;
    } catch {
        return false;
    }
}

/**
 * Validate CSRF token from request
 * Uses double-submit cookie pattern
 */
export function validateCsrfToken(request: NextRequest): CsrfValidationResult {
    // Get token from cookie
    const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;

    // Get token from header
    const headerToken = request.headers.get(CSRF_HEADER_NAME);

    // Both must be present
    if (!cookieToken || !headerToken) {
        return {
            valid: false,
            error: {
                code: 'CSRF_TOKEN_MISSING',
                message: 'CSRF token is required for this request',
                retryable: true
            }
        };
    }

    // Tokens must match
    if (cookieToken !== headerToken) {
        return {
            valid: false,
            error: {
                code: 'CSRF_TOKEN_MISMATCH',
                message: 'CSRF token validation failed',
                retryable: false
            }
        };
    }

    // Token must be valid and not expired
    if (!verifyCsrfToken(cookieToken)) {
        return {
            valid: false,
            error: {
                code: 'CSRF_TOKEN_INVALID',
                message: 'CSRF token is invalid or expired',
                retryable: true
            }
        };
    }

    return { valid: true };
}

/**
 * Set CSRF token cookie in response
 */
export function setCsrfCookie(response: NextResponse, token?: string): NextResponse {
    const csrfToken = token || generateCsrfToken();
    const isProduction = process.env.NODE_ENV === 'production';

    response.cookies.set(CSRF_COOKIE_NAME, csrfToken, {
        httpOnly: true,                    // Prevent XSS access
        secure: isProduction,              // HTTPS only in production
        sameSite: 'lax',                   // CSRF protection
        maxAge: 24 * 60 * 60,              // 24 hours
        path: '/',                         // Available site-wide
    });

    return response;
}

/**
 * Create a response with CSRF token cookie
 */
export function createResponseWithCsrf<T>(
    data: T,
    status: number = 200,
    token?: string
): NextResponse {
    const response = NextResponse.json(data, { status });
    return setCsrfCookie(response, token);
}

/**
 * Get CSRF token from request (for client-side)
 */
export function getCsrfTokenFromRequest(request: NextRequest): string | null {
    return request.cookies.get(CSRF_COOKIE_NAME)?.value || null;
}

/**
 * Middleware to validate CSRF for POST/PUT/PATCH/DELETE requests
 */
export async function withCsrfProtection(
    request: NextRequest,
    handler: (req: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
    const method = request.method;

    // Only validate state-changing methods
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
        const validation = validateCsrfToken(request);

        if (!validation.valid && validation.error) {
            return NextResponse.json(
                {
                    requestId: request.headers.get('x-request-id') || 'unknown',
                    timestamp: new Date().toISOString(),
                    status: 'error',
                    error: validation.error
                },
                { status: 403 }
            );
        }
    }

    // Execute handler
    return await handler(request);
}

/**
 * Generate CSRF token endpoint response
 * GET /api/csrf - Returns new CSRF token
 */
export function createCsrfTokenResponse(): NextResponse {
    const token = generateCsrfToken();

    const response = NextResponse.json({
        token,
        expiresIn: 24 * 60 * 60 * 1000, // 24 hours in ms
    });

    return setCsrfCookie(response, token);
}

/**
 * Cookie configuration constants
 */
export const COOKIE_CONFIG = {
    csrf: {
        name: CSRF_COOKIE_NAME,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        maxAge: 24 * 60 * 60, // 24 hours
        path: '/'
    },
    session: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/'
    }
} as const;
