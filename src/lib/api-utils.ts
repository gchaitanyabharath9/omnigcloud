import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getRateLimiter } from './rate-limit';
import { logger } from './logger';
import { metricsHooks } from './metrics';

export interface ApiResponse<T = any> {
    requestId: string;
    status: 'success' | 'error';
    timestamp: string;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: any;
    };
}

const limiter = getRateLimiter();

export async function withApiHarden(
    request: Request,
    handler: (req: Request, context: { requestId: string }) => Promise<NextResponse>
) {
    const requestId = uuidv4();
    const startTime = Date.now();
    const method = request.method;
    const url = new URL(request.url);
    const route = url.pathname;

    // Extract IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    try {
        // 1. Rate Limiting
        const rateLimit = await limiter.check(ip);
        if (!rateLimit.allowed) {
            logger.warn('Rate limit exceeded', { requestId, route, method });
            metricsHooks.trackRateLimit(ip, false);

            return NextResponse.json(
                {
                    requestId,
                    status: 'error',
                    timestamp: new Date().toISOString(),
                    error: {
                        code: 'TOO_MANY_REQUESTS',
                        message: 'Rate limit exceeded. Please try again later.',
                    },
                },
                {
                    status: 429,
                    headers: { 'Retry-After': String(rateLimit.retryAfter ?? 60) }
                }
            );
        }
        metricsHooks.trackRateLimit(ip, true);

        // 2. Execute Handler
        const response = await handler(request, { requestId });
        const duration = Date.now() - startTime;

        // 3. Log and track metrics
        logger.http({
            requestId,
            method,
            route,
            status: response.status,
            duration,
        });

        metricsHooks.trackRequest(method, route, response.status, duration);

        return response;

    } catch (error: any) {
        const duration = Date.now() - startTime;

        logger.error('API handler error', {
            requestId,
            route,
            method,
            error: error.message,
            duration,
        });

        metricsHooks.trackError(route, error.name || 'UnknownError');
        metricsHooks.trackRequest(method, route, 500, duration);

        return NextResponse.json(
            {
                requestId,
                status: 'error',
                timestamp: new Date().toISOString(),
                error: {
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'An unexpected error occurred.',
                },
            },
            { status: 500 }
        );
    }
}

export function createSuccessResponse<T>(requestId: string, data: T, status = 200) {
    return NextResponse.json(
        {
            requestId,
            status: 'success',
            timestamp: new Date().toISOString(),
            data,
        },
        { status }
    );
}

export function createErrorResponse(
    requestId: string,
    code: string,
    message: string,
    details?: any,
    status = 400
) {
    return NextResponse.json(
        {
            requestId,
            status: 'error',
            timestamp: new Date().toISOString(),
            error: {
                code,
                message,
                details,
            },
        },
        { status }
    );
}
