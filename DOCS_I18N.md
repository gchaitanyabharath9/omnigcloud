# i18n Development Guide

This project uses `next-intl` for internationalization. To ensure 100% correctness and avoid CI failures, follow these guidelines.

## 1. How to add a new string
1.  **Add to `messages/en.json` first.** This is the source of truth.
2.  Use logical namespacing (e.g., `Header`, `Dashboard`, `Footer`).
3.  Run `npm run qa:fill` to automatically propagate the new key to all other locales (with a `[TODO]` prefix).

## 2. Best Practices
- **No hardcoded strings:** Never write user-facing text directly in JSX.
- **Use Namespaces:** Always use a namespace in your components to keep keys short and organized.
  ```tsx
  const t = useTranslations('Dashboard');
  return <h1>{t('title')}</h1>;
  ```
- **Templates:** For pluralization or dynamic values, use `next-intl` syntax: `t('items', { count: 5 })`.

## 3. Pre-flight Checklist
Before pushing your changes, run:
```bash
npm run qa:i18n    # Checks for missing keys and placeholders
npm run qa:test    # Runs Playwright regression crawl
```

## 4. CI Gating
- **Tier 1 locales (EN, ES, FR, DE):** Must have **0** missing or placeholder keys.
- **Tier 2 locales (ZH, HI, JA, KO):** Must have fewer than **25** missing or placeholder keys.
- **Base health:** All keys used in the codebase MUST exist in `en.json`.

## 5. Troubleshooting
If the audit script finds "missing keys" that are actually false positives (like environment variables or internal keys):
1.  Update the `isValidKey` function in `qa-i18n/scripts/i18n-coverage.ts` to ignore them.
2.  Or rename your variable (e.g., from `t` to something else) if it's not a translation function.
