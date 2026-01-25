# Local Quality Gates

This project enforces strict quality gates to ensure stability, responsiveness, performance, and cost safety before pushing code.

## 🚦 Quick Start

Run the full suite (Recommended before `git push`):

```bash
npm run check:all
```

## 🛠 Available Checks

| Command               | Description                                                   |
| :-------------------- | :------------------------------------------------------------ |
| `npm run check:quick` | Runs lint, typecheck, secret scan, and cost guardrails. Fast. |
| `npm run check:build` | Runs the production build.                                    |
| `npm run check:smoke` | specific smoke tests against a production-like local build.   |
| `npm run check:i18n`  | validations for translation completeness.                     |
| `npm run check:all`   | **The Master Gate**. Runs everything in order.                |

## 🧩 The Gates

### 1. Environment & Secrets

Checks for valid `.env` configurations and scans for accidentally committed secrets using regex patterns.

### 2. Static Quality

- **ESLint**: configuration compliance.
- **TypeScript**: strict type checking.
- **Cost Guardrails**: Scans for `getServerSideProps` (forbidden), `force-dynamic`, or unoptimized images which could inflate Vercel costs.

### 3. Build Verification

Ensures the app builds with `next build` (Edge Runtime compatibility, etc).

### 4. Runtime Smoke Tests

Starts the built application locally on port 3001 and validates:

- Redirect logic (homepage to /en, query param preservation).
- Security Headers (CSP, HSTS).
- 404/Redirect handling for unknown locales.

### 5. Responsiveness & Visuals

Uses **Playwright** to load key pages on:

- Mobile (360px, 390px)
- Tablet (768px)
- Laptop/Desktop
  Artifacts (screenshots) are saved to `artifacts/responsive/`. Checks for horizontal overflow.

### 6. Performance Budgets

Uses **Playwright** to capture metrics:

- **LCP**: Must be < 3.5s (simulated).
- **JS Size**: Warns if > 600KB.
- **Request Count**: Limits number of requests.
  Results saved to `artifacts/perf/perf-report.json`.

## ⚠️ Troubleshooting

**Server failed to start?**
The script tries to kill port 3001 before starting, but if it fails, run `npx kill-port 3001` manually.

**Playwright errors?**
Ensure browsers are installed: `npx playwright install`.

**Cost Check Failed?**
If you are flagged for `next/image` usage, ensure you have `unoptimized={true}` if using an external loader like Unsplash to avoid Vercel Image Optimization quotas.
