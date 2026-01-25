# Zero-Cost Vercel Playbook

## 🎯 Objective

Run OmniGCloud in production on the Vercel Hobby plan ($0/mo) indefinitely by adhering to strict usage limits.

## 📊 Budget Limits (Hobby Plan)

| Resource                 | Limit                  | Guardrail                                                                              |
| :----------------------- | :--------------------- | :------------------------------------------------------------------------------------- |
| **Image Optimization**   | 1,000 source images/mo | **CRITICAL**: Use `unoptimized={true}` for ALL marketing images. Lazy load everything. |
| **Edge Requests**        | 1,000,000 / mo         | Cache static assets `max-age=31536000`. Use Cloudflare for static distribution.        |
| **Bandwidth**            | 100 GB / mo            | Serve videos/heavy assets from external storage (S3/R2) or Unsplash.                   |
| **Serverless Functions** | 100 GB-hours / mo      | Prefer SSG/ISR. Avoid `getServerSideProps`. Keep APIs lightweight.                     |

## 🛠️ Implementation Checklist

### 1. Images

- [ ] **Unsplash**: ALWAYS use `unoptimized={true}`. Unsplash has its own CDN.
- [ ] **Local Images**: Import statically (`import logo from '@/public/logo.png'`) to leverage build-time analysis.
- [ ] **Vector Graphics**: Prefer SVGs over PNGs for icons/logos (0 cost).

### 2. Caching & Performance

- [ ] **Next Config**: Ensure `minimumCacheTTL: 31536000` is set in `next.config.js`.
- [ ] **Headers**: Verify `Cache-Control: public, max-age=31536000, immutable` for fonts/images.
- [ ] **ISR**: Use `export const revalidate = 86400` (24h) for semi-dynamic pages (Pricing, Blog).

### 3. Middleware

- [ ] **Matcher**: Ensure middleware ONLY runs on necessary routes (auth/app). Exclude static assets/API key routes.
- [ ] **Logic**: Keep it sub-10ms. No database calls in middleware.

## 🛑 CI/CD Checks (Manual)

Before merging, verify:

1.  Search `grep -r "<Image" src` -> Ensure remote images have `unoptimized`.
2.  Search `grep -r "getServerSideProps" src` -> Should be empty.
3.  Run `npm run build` -> Check for large chunks (>200kb).

## ☁️ Cloudflare DNS Configuration

To minimize Vercel Edge requests, offload DNS and caching to Cloudflare Free:

**Common Records:**

- `CNAME www` -> `cname.vercel-dns.com` (Proxied ☁️) - _Orange Cloud ON_
- `A @` -> `76.76.21.21` (Proxied ☁️) - _Orange Cloud ON_

**Caching Rules (Configuration Rules):**
Instead of "Cache Everything" which breaks dynamic routes, create rules for specific static assets:

- **Paths**: `/_next/static/*`, `/images/*`, `/fonts/*`, `*.css`, `*.js`, `*.woff2`, `*.png`, `*.jpg`, `*.webp`
- **Setting**: Cache Level: Standard (or aggressive/force cache), Edge Cache TTL: 1 month
