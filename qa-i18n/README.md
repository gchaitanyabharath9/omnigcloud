# OmniGCloud i18n QA Automation Suite & Release Gate

This suite ensures digital sovereignty and technical excellence across all 8 supported locales. It is designed to act as a **hard release gate** in the CI/CD pipeline.

## 🚀 One-Command Gating
Run the full suite (Inventory -> Coverage -> E2E):
```bash
npm run qa:full
```

## 🛠 Script Directory

### 1. `qa:inventory` (Route Discovery)
- **Path**: `qa-i18n/scripts/route-inventory.ts`
- **Purpose**: Automatically scans `src/app/[locale]` for all page segments.
- **Output**: `qa-i18n/routes.json` and `urls.json`.

### 2. `qa:i18n` (Coverage & Policy Gate)
- **Path**: `qa-i18n/scripts/i18n-coverage.ts`
- **Policy**:
  - **Tier 1 (en, es, fr, de)**: 0 missing keys allowed. Fails CI on any gap.
  - **Tier 2 (zh, hi, ja, ko)**: Soft gate (Threshold: 25 keys).
- **Output**: `qa-i18n/i18n-report.md`.

### 3. `qa:i18n:fill` (Auto-Translate Helper)
- **Path**: `qa-i18n/scripts/i18n-fill-missing.ts`
- **Purpose**: Fills missing keys in non-English locales with `[TODO_TRANSLATE] {English Value}`.
- **Usage**: Run this when `qa:i18n` fails to stabilize the build visually for review.

### 4. `qa:test` (Playwright E2E Crawl)
- **Path**: `qa-i18n/tests/i18n.spec.ts`
- **Checks**:
  - **Sentinel Routes**: Verifies `/` and `/pricing` redirect/rewrite correctly.
  - **404 Detection**: Hard failure if status != 200 or "Not Found" UI is detected.
  - **Hydration Errors**: Fails on any console `Hydration failed` or uncaught exceptions.
  - **Screenshots**: Automatically saves failures to `qa-i18n/failures/`.

## 🤖 CI / Continuous Integration
The workflow in `.github/workflows/i18n-qa.yml` runs on every PR and push.
- It builds a production standalone version.
- It enforces the Tier 1 translation gate.
- It runs a full crawl of all 416 URLs.

## 📝 How to Add a New Language Safely
1. Add the locale code to `locales` array in `qa-i18n/scripts/route-inventory.ts`.
2. Create your JSON file in `/messages`.
3. Run `npm run qa:i18n:fill` to generate the initial TODO list.
4. Translate the prefixed values.
5. Run `npm run qa:full` to verify.

## 🛡️ Allowlisting
If a specific key *must* remain in English (e.g., a brand name), add it to `qa-i18n/i18n-allowlist.json` in the format:
```json
[
  "es:Brand.name",
  "fr:Brand.name"
]
```
