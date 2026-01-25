# Environment Configuration Guide

OmniGCloud uses a typed configuration loader located in `src/config/index.ts`. This system ensures that all necessary environment variables are present and valid before the application starts.

## Environment Levels (`APP_ENV`)

The application behavior is determined by the `APP_ENV` variable.

- **local**: Default for local development. `enableRateLimit` is disabled by default.
- **dev**: Development environment.
- **sit**: System Integration Testing.
- **uat**: User Acceptance Testing.
- **prod**: Production environment. Strict validation enforced.

## How to Configure

1. **Environment Variables (.env)**
   The primary source of truth is the `.env` file (not committed). Use `.env.example` as a template.

   ```bash
   APP_ENV=local
   AUTH_SECRET=...
   ```

2. **Static Overrides (`src/config/envs/*.ts`)**
   Non-sensitive defaults for each environment are stored in typed TypeScript files.
   - `src/config/envs/local.ts`
   - `src/config/envs/dev.ts`
   - `src/config/envs/prod.ts`

   These files are merged with the environment variables. `process.env` always takes precedence for overrides.

## Adding a New Variable

1. Open `src/config/schema.ts`
2. Add the variable to the Zod schema (`ConfigSchema`).
3. Add the mapping in `src/config/index.ts` inside the `processEnv` object.
4. Update `.env.example`.

## Usage in Code

Do not use `process.env.MY_VAR` directly. Import the config object:

```typescript
import { config } from "@/config";

console.log(config.site.url);
if (config.features.enableMetrics) {
  // ...
}
```
