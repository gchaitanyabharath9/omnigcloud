import { AppEnvSchema, ConfigSchema, AppConfig } from './schema';
import localData from './local/app.json';
import devData from './dev/app.json';
import sitData from './sit/app.json';
import prodData from './prod/app.json';

// Determine Environment
const rawEnv = process.env.APP_ENV || process.env.NODE_ENV || 'local';
let currentEnv = AppEnvSchema.safeParse(rawEnv).success ? (rawEnv as any) : 'local';

// If NODE_ENV is production but APP_ENV is default, assume prod to avoid serving local config
if (process.env.NODE_ENV === 'production' && !process.env.APP_ENV) {
    currentEnv = 'prod';
}

// Select Config Data
let envSpecificConfig: any = {};
switch (currentEnv) {
    case 'dev': envSpecificConfig = devData; break;
    case 'sit': envSpecificConfig = sitData; break;
    case 'prod': envSpecificConfig = prodData; break;
    default: envSpecificConfig = localData; break; // Covers 'local' and 'test'
}

// Build Final Config
// Priority: Process ENV > JSON Config > Defaults (if any)
const processEnv = {
    site: {
        url: process.env.NEXT_PUBLIC_SITE_URL,
        name: process.env.NEXT_PUBLIC_SITE_NAME,
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
    }
};

const rawConfig = {
    env: currentEnv,
    isProduction: currentEnv === 'prod',
    isDevelopment: currentEnv === 'local' || currentEnv === 'dev',
    isTest: process.env.NODE_ENV === 'test',

    site: {
        name: 'OmniGCloud', // Hard default to satisfy schema
        ...envSpecificConfig.site,
        ...removeEmpty(processEnv.site),
    },
    api: {
        ...envSpecificConfig.api,
    },
    auth: {
        ...processEnv.auth,
    },
    database: {
        ...processEnv.database,
    },
    features: {
        ...envSpecificConfig.features,
    },
};

// Helper: Remove undefined/null/empty strings to avoid overwriting valid JSON config with empty envs
function removeEmpty(obj: any) {
    const newObj: any = {};
    for (const key in obj) {
        if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}

// Validate
const parsed = ConfigSchema.safeParse(rawConfig);

if (!parsed.success) {
    console.error('❌ Invalid Configuration:', JSON.stringify(parsed.error.format(), null, 2));
    // Log the actual state of site to see what's missing
    console.error('Current raw site config:', rawConfig.site);

    // Only warn in build to prevent failure if secrets are missing in CI
    if (process.env.NEXT_PHASE !== 'phase-production-build') {
        console.warn('⚠️  Config validation failed. Check app.json and .env');
    }
}

export const config = (parsed.success ? parsed.data : rawConfig) as AppConfig;
