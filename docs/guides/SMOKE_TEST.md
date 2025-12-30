# Smoke Test Checklist

This checklist verifies the configuration and secrets logic works as expected.

## 1. Local Environment (`APP_ENV=local`)

1. **Verify `.env` Existence**: Ensure `.env` exists and `APP_ENV=local` is set.
2. **Start Server**: `npm run dev` or `npm run start`.
3. **Check Health**: Visit `/api/health`.
   - [ ] `system.appEnv` should be `local`.
   - [ ] `configuration.secretsProvider` should contain "process.env".
   - [ ] `configuration.configStrategy` should point to `local.ts`.
4. **Secrets Read**: Verify a known feature flag (like `ENABLE_METRICS`) reflects `local.ts` defaults (true) or `.env` override.

## 2. Mock Production (`APP_ENV=prod`)

*Note: For local testing, you can simulate prod by changing `.env` to `APP_ENV=prod` temporarily.*

1. **Set Environment**: Set `APP_ENV=prod` in `.env`.
2. **Setup Secrets**: 
   - Since you likely don't have a local Vault running, the app might throw if you try to hit an endpoint needing secrets (like `/api/contact` which inits Redis).
   - *However*, `/api/health` does NOT fetch secrets, it just reads static config.
3. **Start Server**: `npm run build && npm run start`.
4. **Check Health**: Visit `/api/health`.
   - [ ] `system.appEnv` should be `prod`.
   - [ ] `configuration.secretsProvider` should contain "HashiCorp Vault".
   - [ ] `configuration.configStrategy` should point to `prod.ts`.
5. **Verify Fail Fast**: Visit `/api/contact`. 
   - [ ] Server console should verify it attempted to reach Vault or threw an error about missing credentials (if logic triggers).

## 3. Real Deployment (K8s/Docker)

1. **Deploy**: Push to environment.
2. **Check Logs**: Ensure no "Critical: Missing REDIS_URL" errors during startup.
3. **Health Probe**: `/api/health` should return 200 OK.
4. **Secrets Validation**:
   - Submit a form on `/contact`.
   - Verify Lead appears in Redis (if configured) or Email is sent.
   - If success, Vault integration is working.
