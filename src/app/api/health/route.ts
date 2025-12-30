import { NextRequest } from 'next/server';
import { withApiHarden, createSuccessResponse } from '@/lib/api-utils';
import pkg from '../../../../package.json';
import { config } from '@/config';

export async function GET(request: NextRequest) {
    return withApiHarden(request, async (req, { requestId }) => {
        // Determine active secrets provider
        const isLocal = config.env === 'local';
        const secretsProvider = isLocal ? 'process.env (Local .env)' : 'HashiCorp Vault (KV v2)';

        // Determine active config "file" (logical)
        const configFileMap = {
            local: 'src/config/envs/local.ts',
            dev: 'src/config/envs/dev.ts',
            sit: 'src/config/envs/sit.ts (derived)', // sit/uat usually map to prod-like or allow empty fallbacks
            uat: 'src/config/envs/uat.ts (derived)',
            prod: 'src/config/envs/prod.ts'
        };
        const activeConfig = configFileMap[config.env] || 'unknown';

        return createSuccessResponse(requestId, {
            status: 'ok',
            system: {
                version: pkg.version,
                nodeEnv: process.env.NODE_ENV,
                appEnv: config.env,
                deploymentId: process.env.NEXT_PUBLIC_GIT_COMMIT || 'local-dev',
                uptimeSeconds: Math.floor(process.uptime()),
            },
            configuration: {
                secretsProvider,
                configStrategy: activeConfig,
                features: config.features, // Safe to expose boolean feature flags
            }
        });
    });
}
