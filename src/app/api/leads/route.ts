import { NextRequest } from 'next/server';
import { z } from 'zod';
import { withApiHarden, createSuccessResponse, createErrorResponse, handleZodError, handleSafeError } from '@/lib/api-utils';

// Optional import - only available after npm install @upstash/redis
let Redis: any = null;

try {
    // @ts-ignore - Optional dependency
    Redis = require('@upstash/redis').Redis;
} catch (e) {
    // Redis not installed yet
}

// Initialize Upstash Redis
const redis = Redis && process.env.REDIS_URL && process.env.REDIS_TOKEN
    ? new Redis({
        url: process.env.REDIS_URL,
        token: process.env.REDIS_TOKEN,
    })
    : null;

// Validation schema for query parameters
const LeadsQuerySchema = z.object({
    limit: z.string().optional().transform(val => Math.min(parseInt(val || '50'), 100)),
    offset: z.string().optional().transform(val => Math.max(parseInt(val || '0'), 0)),
});

export async function GET(req: NextRequest) {
    return withApiHarden(req, async (request, { requestId }) => {
        try {
            // Check authentication (optional - uncomment when you have auth set up)
            // const session = await auth();
            // if (!session?.user) {
            //     return createErrorResponse(requestId, 'UNAUTHORIZED', 'Authentication required', false, 401);
            // }

            if (!redis) {
                return createErrorResponse(
                    requestId,
                    'SERVICE_UNAVAILABLE',
                    'Database not configured',
                    false,
                    503
                );
            }

            // Validate query parameters
            const { searchParams } = new URL(request.url);
            const queryValidation = LeadsQuerySchema.safeParse({
                limit: searchParams.get('limit'),
                offset: searchParams.get('offset'),
            });

            if (!queryValidation.success) {
                return handleZodError(queryValidation.error, requestId);
            }

            const { limit, offset } = queryValidation.data;

            // Get all lead IDs
            const leadIds = await redis.lrange('leads:all', offset, offset + limit - 1);

            if (!leadIds || leadIds.length === 0) {
                return createSuccessResponse(requestId, {
                    leads: [],
                    total: 0,
                    limit,
                    offset,
                });
            }

            // Get lead details
            const leads = await Promise.all(
                leadIds.map(async (id: string) => {
                    const data = await redis.get(`lead:${id}`);
                    return data ? JSON.parse(data as string) : null;
                })
            );

            // Filter out null values
            const validLeads = leads.filter(lead => lead !== null);

            // Get total count
            const total = await redis.llen('leads:all');

            return createSuccessResponse(requestId, {
                leads: validLeads,
                total,
                limit,
                offset,
            });

        } catch (error) {
            return handleSafeError(error, requestId);
        }
    });
}
