# I18N Fix Report

## 1. I18N Framework
- **Library**: `next-intl` v4.6.1
- **Provider**: `NextIntlClientProvider` (implied, likely in `src/components/i18n-provider.tsx` or `layout.tsx`)
- **Loader**: `src/i18n/request.ts` handles server-side loading.

## 2. Findings
- **Message Files**: Located in `src/messages/`. `en.json` exists but is populated with placeholders (e.g., `"title": "title"`) or missing sections entirely.
- **Missing Keys**: 
  - `SEO_Content.Home.AboveTheFold` is missing from `en.json`.
  - `SOVEREIGNNOTICE` is missing.
- **Literal Rendering**:
  - Caused by two factors:
    1. Keys existing but having their value equal to their key name (e.g., `"title": "title"`).
    2. `src/i18n/request.ts` defining `getMessageFallback` to return `${namespace}.${key}` or `${key}` when a translation is missing.

## 3. Plan
1.  **Populate `en.json`**: Replace placeholders with real content and add missing sections.
2.  **Fix Fallback**: Update `getMessageFallback` to avoid leaking technical keys to the UI.
3.  **Quality Gate**: Add a build-time script to ensure no keys are missing and no values match their keys.
