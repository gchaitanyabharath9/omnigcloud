# 🚀 Local Quality Gate Runbook

This project implements a **Zero-Cost Local Quality Gate** to ensure high-density UI integrity, i18n completeness, SEO sanity, and cross-browser responsiveness.

## 🛠 Prerequisites

Ensure you are using **Windows PowerShell** for the best experience.

1. **Node.js**: v20 or v22 (Recommended)
2. **Install Dependencies**:
   ```powershell
   npm ci
   ```
3. **Install Browser Engines**:
   ```powershell
   npx playwright install chromium firefox webkit
   ```

## ⚡ The Single Command

Run the entire quality gate suite:

```powershell
npm run quality
```

**This command performs:**

1. **Environment Audit**: Checks Node version and `.env` presence.
2. **Static Gate**: Secret scanning, ESLint, TypeScript compilation, and Cost Guardrails.
3. **i18n Gate**: Strictly enforces full key coverage for **8 locales** (en, es, fr, de, zh, hi, ja, ko).
4. **Build Gate**: Executes `next build` to catch compilation errors.
5. **Runtime Smoke Gate**: Validates redirects, locale normalization, and headers.
6. **SEO Sanity Gate**: Crawls the home page across all locales to verify localized meta tags, canonicals, and hreflangs.
7. **E2E Visual Gate**: Multi-browser (Chrome, Firefox, Safari) and Multi-viewport (Mobile, Tablet, Desktop) testing via Playwright.

## 🛡 Quality Guardrails

### 🌍 i18n (8 Locales)

All translated strings must exist in `messages/*.json`. The build **will fail** if any locale is missing keys present in `en.json`.

### 📱 Responsive & Overflow

The gate validates that no horizontal overflow occurs on any tested device.

- Use the `PageShell` component for standard layout containers.
- Avoid `w-screen` or `100vw` on nested elements.

### 🔗 Navigation & Anchors

- **Same-page**: Smooth scrolls to `#id` using `NavLink`.
- **Cross-page**: Navigates then scrolls after render.
- **Header Offset**: Sticky header height is automatically accounted for via `scroll-margin-top`.

### 🕵️ Observability

Client-side errors and performance metrics are logged as structured JSON to the console. The E2E tests are configured to fail if any `console.error` (except resource loads) is detected during navigation.

## 🚦 CI/CD Integration

The quality gate is wired into the `prebuild` hook. This means `npm run build` will **automatically** run all checks before starting the build.

## 🐛 Troubleshooting

If a check fails:

- **i18n**: Check the generated report at `qa-i18n/i18n-report.md`.
- **E2E/Visual**: View the Playwright report:
  ```powershell
  npx playwright show-report html-report
  ```
- **SEO**: Review console output for missing tags.
