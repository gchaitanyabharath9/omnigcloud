import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { auth } from '@/auth';

// Initialize Upstash Redis
const redis = process.env.REDIS_URL && process.env.REDIS_TOKEN
    ? new Redis({
        url: process.env.REDIS_URL,
        token: process.env.REDIS_TOKEN,
    })
    : null;

export async function GET(req: NextRequest) {
    try {
        // Check authentication (optional - uncomment when you have auth set up)
        // const session = await auth();
        // if (!session?.user) {
        //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        if (!redis) {
            return NextResponse.json(
                { error: 'Database not configured' },
                { status: 500 }
            );
        }

        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = parseInt(searchParams.get('offset') || '0');

        // Get all lead IDs
        const leadIds = await redis.lrange('leads:all', offset, offset + limit - 1);

        if (!leadIds || leadIds.length === 0) {
            return NextResponse.json({
                leads: [],
                total: 0,
                limit,
                offset,
            });
        }

        // Get lead details
        const leads = await Promise.all(
            leadIds.map(async (id) => {
                const data = await redis.get(`lead:${id}`);
                return data ? JSON.parse(data as string) : null;
            })
        );

        // Filter out null values
        const validLeads = leads.filter(lead => lead !== null);

        // Get total count
        const total = await redis.llen('leads:all');

        return NextResponse.json({
            leads: validLeads,
            total,
            limit,
            offset,
        });

    } catch (error) {
        console.error('[LEADS_API_ERROR]', error);
        return NextResponse.json(
            { error: 'Failed to fetch leads' },
            { status: 500 }
        );
    }
}
