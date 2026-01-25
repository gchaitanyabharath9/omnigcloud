# Pull Request Template

## Description

[Provide a brief description of the changes introduced by this PR]

### 🌐 Internationalization (i18n)

- [ ] New strings added to `messages/en.json`
- [ ] Ran `npm run qa:fill` to sync all locales
- [ ] All Tier 1 locales (EN, ES, FR, DE) have 100% translation coverage
- [ ] Tier 2 locales (ZH, HI, JA, KO) are within the allowed threshold (< 25 missing)
- [ ] Verified `html lang` and `hreflang` for new routes

### 🧪 Quality Assurance

- [ ] Ran `npm run qa:i18n` and it passed (Base check + Coverage)
- [ ] Ran `npm run qa:test` (Playwright E2E Crawl) across all viewports
- [ ] No horizontal scrolling or layout issues in any locale
- [ ] No console errors or SSR hydration warnings

## Screenshots (if applicable)

[Attach screenshots or screen recordings here]

## Deployment Notes

[List any special instructions or environment variables needed for deployment]
