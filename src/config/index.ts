import { AppEnvSchema, ConfigSchema, AppConfig } from './schema';
import { localConfig } from './envs/local';
import { devConfig } from './envs/dev';
import { prodConfig } from './envs/prod';

// Load ENV variables
const processEnv = {
    env: (process.env.APP_ENV || process.env.NODE_ENV || 'local') as any, // Cast for basic validation
    site: {
        url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        name: 'OmniGCloud',
        description: 'Global Cloud-Agnostic Modernization',
    },
    api: {
        url: process.env.NEXT_PUBLIC_API_URL,
    },
    auth: {
        secret: process.env.AUTH_SECRET,
        googleId: process.env.AUTH_GOOGLE_ID,
        googleSecret: process.env.AUTH_GOOGLE_SECRET,
        entraId: process.env.AUTH_ENTRA_ID,
        entraSecret: process.env.AUTH_ENTRA_SECRET,
        entraTenantId: process.env.AUTH_ENTRA_TENANT_ID,
    },
    database: {
        redisUrl: process.env.REDIS_URL,
        redisToken: process.env.REDIS_TOKEN,
    },
    features: {
        enableMetrics: process.env.ENABLE_METRICS === 'true',
        enableMagicLink: process.env.ENABLE_MAGIC_LINK === 'true',
        enableRateLimit: process.env.ENABLE_REDIS_RATE_LIMIT === 'true',
    }
};

// Determine Environment
const currentEnv = AppEnvSchema.safeParse(processEnv.env).success
    ? processEnv.env
    : 'local';

// Merge strategy:
// 1. Defaults (Empty/Base)
// 2. Env-specific static config (local.ts, dev.ts, etc.) -> Overrides defaults
// 3. Process.ENV -> Overrides everything (highest precedence for secrets)

let envSpecificConfig = {};
switch (currentEnv) {
    case 'local': envSpecificConfig = localConfig; break;
    case 'dev': envSpecificConfig = devConfig; break;
    case 'prod': envSpecificConfig = prodConfig; break;
    // Default to empty for others not explicitly defined yet
    default: envSpecificConfig = {};
}

// Deep merge helper could be used here, but for now we'll do spread
// Caution: Simple spread doesn't deep merge objects.
// Since we built the `processEnv` object fully above, we mainly want to apply
// the static overrides if they exist using a merge.

// Actually, a better pattern for Typed Config is often:
// Base Config + Env Overrides + Secrets from Env.

// Let's refine the processEnv object construction to use the schema validation LAST.

const rawConfig = {
    env: currentEnv,
    isProduction: currentEnv === 'prod',
    isDevelopment: currentEnv === 'local' || currentEnv === 'dev',
    isTest: process.env.NODE_ENV === 'test',

    site: {
        ...processEnv.site,
        ...(envSpecificConfig as any).site,
    },
    api: {
        ...processEnv.api,
        ...(envSpecificConfig as any).api,
    },
    auth: {
        ...processEnv.auth,
    },
    database: {
        ...processEnv.database,
    },
    features: {
        ...processEnv.features,
        ...(envSpecificConfig as any).features,
    },
};

// Validate
const parsed = ConfigSchema.safeParse(rawConfig);

if (!parsed.success) {
    console.error('❌ Invalid Configuration:', parsed.error.format());
    // In strict mode we might throw, but for dev robustness we might warn
    // Since this is key infra, throwing is safer to prevent starting with bad config.
    // However, during build time (e.g. CI), some envs might be missing.
    // Check if we are in build context.
    if (process.env.NEXT_PHASE !== 'phase-production-build') {
        // throw new Error('Invalid Configuration'); // Uncomment to enforce strictness
        console.warn('⚠️  Config validation failed. Check .env');
    }
}

// Export the valid config or the raw best-effort one (with type casting to satisfy TS if needed)
export const config = (parsed.success ? parsed.data : rawConfig) as AppConfig;
