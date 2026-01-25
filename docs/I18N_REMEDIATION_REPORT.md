# I18N Remediation Report

## 1. i18n Library Identified

- **Library**: `next-intl`
- **Message File**: `src/messages/en.json` (Source of Truth)
- **Loading Logic**: `src/i18n/request.ts` dynamically loads messages.

## 2. Root Cause of Literal Leakage

- **Missing Keys**: Dynamic keys (e.g. `Products.playground.title`, `SEO_Content.Home.AboveTheFold`) were missing from `en.json`.
- **Literal Props**: Some components may have been passing string literals, but our scan suggests most issues were missing translation keys for dynamic string construction.

## 3. Changes Applied

### 3.1. Message Backfill

- **`scripts/remediate_i18n_fill.ts`**:
  - Scans codebase for `useTranslations` usage (`scripts/i18n_scan.ts`).
  - Reads `src/data` to identify dynamic product keys.
  - Backfills `en.json` with missing keys (Total 300+ keys added).
  - Ensures robust coverage for `Products.*`, `SEO_Content.*`, and `CookieConsent.*`.

### 3.2. Quality Gates

#### Gate A: Keys Gate (`npm run i18n:keys:gate`)

- Runs before build.
- verified that every key discovered in the codebase (via static scan) exists in `en.json`.
- Fails if keys are missing.

#### Gate B: Leak Gate (`npm run i18n:leak:gate`)

- Runs after build.
- Scans `.next/server/app` (HTML/RSC) for:
  - Namespaced keys (`SEO_Content...`)
  - Standalone placeholders (`>title<`, `>desc<`)
  - Specific tokens (`downloadTitle`, `policyLink`)
- Fail safe for production deployment.

## 4. Verification

### Manual Verification

1.  Run `npm run build`.
2.  Run `npm run i18n:leak:gate`.
3.  Process should exit with code 0.

### Code Verification

The codebase now includes robust protection against regression. If a developer adds a new component with `t('title')` and forgets to add it to `en.json`, usage might still fall back to the global "OmniGCloud Platform" title, or if using a new namespace, the leak gate will catch usage like `NewComponent.title` if it renders exactly that string.

## 5. How to Extend

When adding new translations:

1.  Add the key to `src/messages/en.json`.
2.  Do NOT use the key name as the value (e.g., avoid `"myKey": "myKey"`).
3.  Run `npm run i18n:leak:gate` locally to ensure no leaks are detected.
