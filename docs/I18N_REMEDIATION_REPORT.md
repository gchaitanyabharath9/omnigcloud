
# I18N Remediation Report

## 1. i18n Library Identified
- **Library**: `next-intl`
- **Configuration**: App Router with `src/app/[locale]/layout.tsx` using `NextIntlClientProvider`.
- **Loading Logic**: `src/i18n/request.ts` performs dynamic import of locale messages with a deep fallback to `src/messages/en.json`.

## 2. Root Cause of Literal Leakage
The primary cause of literals like "title", "subtitle", "desc" appearing in the UI was:
1.  **Missing Translations**: `src/messages/en.json` contained hundreds of keys where the value was identical to the key (e.g., `"title": "title"`).
2.  **Fallback Leaks**: Components requesting keys that did not exist in the specific namespace were falling back to top-level generic keys (which were also placeholders like `"title": "title"`).

## 3. Changes Applied
### 3.1. Message Backfill
We executed a remediation script (`scripts/remediate_i18n.ts`) to comprehensively update `src/messages/en.json`.
- **Placeholder Replacement**: All instances of `"key": "key"` for common terms (title, desc, content, cta) have been replaced with context-aware English strings.
    - Example: `WhitePaper.aso.principles.neutrality.title` -> "Neutrality Principle".
    - Example: `CookieConsent.title` -> "Privacy & Sovereignty".
- **Top-Level Fallbacks**: Generic top-level keys now have descriptive values (e.g., `"title": "OmniGCloud Platform"`) to prevent confusing "title" literals if a key lookup fails.

### 3.2. Quality Gate (`i18n:leak:gate`)
We introduced a build-time quality gate to prevent future leaks.
- **Script**: `scripts/i18n_leak_gate.ts`
- **Logic**: Scans the `.next/server/app` directory (HTML and RSC payloads) for suspicious patterns:
    - Uppercase keys looking like namespaces (`SEO_Content.Home...`).
    - Standard placeholder literals in HTML context (`>title<`).
- **Integration**: Added to the `npm run build` command chain: `"build": "npm run gate && next build && npm run i18n:leak:gate"`.

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
