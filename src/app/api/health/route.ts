import { withApiHarden, createSuccessResponse } from '@/lib/api-utils';
import pkg from '../../../../package.json';

export async function GET(request: Request) {
    return withApiHarden(request, async (req, { requestId }) => {
        return createSuccessResponse(requestId, {
            status: 'ok',
            version: pkg.version,
            commit: process.env.NEXT_PUBLIC_GIT_COMMIT || 'development',
            uptime: process.uptime()
        });
    });
}

