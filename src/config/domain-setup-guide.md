# Domain Configuration Guide (Cloudflare + Vercel)

Since your architecture defines **Cloudflare as DNS-Only (Gray Cloud)**, Cloudflare acts as a "passthrough" for traffic. It does not inspect or modify requests, meaning **Cloudflare Page Rules / Redirect Rules will NOT work** for domains set to Gray Cloud.

You must configure these domains at the **Vercel** level.

## Step 1: Configure DNS in Cloudflare

For every domain (`omnig.ai`, `omnig.cloud`, `omnisourcetech.io`, etc.):

1.  Log in to **Cloudflare**.
2.  Go to **DNS**.
3.  Add/Update **A Record**:
    *   **Name:** `@` (root)
    *   **Content:** `76.76.21.21` (Vercel's Anycast IP)
    *   **Proxy Status:** ☁️ **DNS Only (Gray Cloud)**
4.  Add/Update **CNAME Record**:
    *   **Name:** `www`
    *   **Content:** `cname.vercel-dns.com`
    *   **Proxy Status:** ☁️ **DNS Only (Gray Cloud)**

## Step 2: Add Domains to Vercel

For the code in `src/proxy.ts` to ever run, Vercel must first accept the incoming request.

1.  Log in to **Vercel**.
2.  Go to **Settings** > **Domains**.
3.  Add **ALL** your domains here (`omnig.ai`, `www.omnig.ai`, etc.).

## Step 3: Choose Redirect Strategy

You have two options once the domains are in Vercel.

### Option A: Vercel Ege Redirects (Recommended for Performance)
In the Vercel Domains dashboard:
1.  Keep `www.omnigcloud.com` as **Primary**.
2.  For every other domain, click **Edit** and select **Redirect to**: `www.omnigcloud.com`.
    *   **Result:** Vercel handles the 301 redirect instantly at the edge. Your Next.js code never runs for these requests. This provides the fastest TIme-to-First-Byte (TTFB).

### Option B: Application Layer Redirects (Current Codebase Strategy)
In the Vercel Domains dashboard:
1.  Add all domains.
2.  Leave them as **Valid Aliases** (do not select "Redirect to").
3.  **Result:** Vercel accepts the traffic and passes it to Next.js.
4.  Your `src/proxy.ts` detects the mismatch and issues the redirect.
    *   **Pros:** Logic is version-controlled in Git.
    *   **Cons:** Slower (spins up Function/Middleware).

**Recommendation:** Use **Option A (Vercel Edge)** for the raw domains to save core resources, but keep the **Option B (Code)** logic in `src/proxy.ts` as a safety net for "www vs non-www" or malicious host header spoofing.
