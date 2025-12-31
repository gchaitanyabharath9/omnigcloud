
# Pull Request Checklist

## 🌍 i18n & Localization
- [ ] **Translation Keys**: All new UI strings use `t('Key')` and are added to `messages/en.json`.
- [ ] **Safe Fallbacks**: No hardcoded strings in `tsx` files (except build metadata).
- [ ] **Coverage Check**: Run `npm run qa:i18n` locally. Zero errors allowed for Tier 1 languages (en, es, fr, de).
- [ ] **Routing**: New pages include `[locale]` in the path. URL params are locale-safe.

## 📱 UI & Responsiveness
- [ ] **Mobile Check**: Verified layout on 390px width. No horizontal scroll/overflow.
- [ ] **Tablet Check**: Verified layout on 768px width.
- [ ] **RTL/Fonts**: Verified fonts load correctly for Asian languages (zh, ja, ko) if applicable.

## 🛡️ Quality Assurance
- [ ] **Regression**: Run `npm run qa:test` (Playwright) to ensure no soft 404s or layout shifts.
- [ ] **Linting**: No ESLint errors.
- [ ] **Metadata**: Page title and description are dynamic/localized.

## 🔒 Security
- [ ] **Secrets**: No secrets exposed in client-side code (`NEXT_PUBLIC_`).
- [ ] **Auth**: Protected routes are verified behind login.
