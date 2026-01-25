# Contributing to OmniGCloud

## 🚀 Quick Start (Local Development)

1. **Install Dependencies:**

   ```bash
   npm ci
   ```

2. **Environment Setup:**
   - The app uses `src/config/local/app.json` by default.
   - For secrets, create `.env.local` based on `.env.example` (if provided) or ask the team header.

3. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Architecture & Conventions

### Directory Structure

- `src/app`: Next.js App Router pages (routes).
- `src/components`: React components (shared).
- `src/config`: Environment configuration (Dev/SIT/Prod).
- `src/lib`: Shared utilities and logic (logging, formatting).
- `qa-i18n`: QA automation suite (Playwright, scripts).

### i18n Strategy

- **Framework:** `next-intl`
- **Translations:** Located in `messages/*.json`.
- **Validation:** Run `npm run qa:i18n` before committing.
- **Rule:** Fallback to English is automatic, but missing keys in PRODUCTION locales (es, fr, de) are blocking errors.

### SEO Strategy

- **Canonical:** Enforced at application layer (`proxy.ts`).
- **Config:** `src/config/domains.ts` controls the definitive URL.
- **Validation:** Run `npm run qa:seo`.

---

## 🧪 Quality Gates & Testing

Before creating a Pull Request, verify your changes:

```bash
# 1. Static Analysis
npm run lint
npm run typecheck

# 2. QA Checks
npm run qa:inventory  # Detect route changes
npm run qa:i18n       # Verify translation coverage
npm run qa:seo        # Verify SEO foundations

# 3. Automation
npm run qa:test       # Run Playwright suite
```

---

## 🛡️ Brand & Research Assets

**Research Asset Protection:**

- High-value research assets (PDFs, Diagrams) reside in `/public/research-assets` (or protected internal path).
- Do NOT commit source files (PPT, AI/EPS) to this public repo.
- Ensure all technical diagrams are properly watermarked with `© OmniGCloud [Year]`.

---

## 🚢 release Process

- **Current:** Push to `main` deploys to PROD.
- **Future:** PR -> `dev` -> `sit` -> `prod`.

---
