# SSO & Brand Connectivity Guide

This guide details how to enable Single Sign-On (SSO) and manage the brand infrastructure for OmniGCloud.

---

## 1. SSO Configuration (Auth.js)

The platform is powered by **Auth.js (NextAuth v5)** with session storage in **Upstash Redis**. To enable the SSO providers, add the following environment variables to your `.env` or Vercel settings.

### A. Google Cloud (SSO)
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project and set up the **OAuth Consent Screen**.
3. Create **OAuth 2.0 Client IDs** (Web Application).
4. Add Authorized Redirect URI: `https://omnigcloud.com/api/auth/callback/google`
5. **Environment Variables:**
   - `AUTH_GOOGLE_ID`: Your Client ID
   - `AUTH_GOOGLE_SECRET`: Your Client Secret

### B. Microsoft Entra ID (Formerly Azure AD)
1. Go to [Azure Portal](https://portal.azure.com/) > **App Registrations**.
2. Register a new application.
3. In **Authentication**, add a Platform (Web) with Redirect URI: `https://omnigcloud.com/api/auth/callback/microsoft-entra-id`
4. Under **Certificates & Secrets**, create a new Client Secret.
5. In **Overview**, copy the **Directory (tenant) ID** and **Application (client) ID**.
6. **Environment Variables:**
   - `AUTH_ENTRA_ID`: Your Client ID
   - `AUTH_ENTRA_SECRET`: Your Client Secret
   - `AUTH_ENTRA_TENANT_ID`: Your Tenant ID

### C. GitHub (SSO)
1. Go to **Settings** > **Developer Settings** > **OAuth Apps** on GitHub.
2. Click **New OAuth App**.
3. Homepage URL: `https://omnigcloud.com`
4. Authorization callback URL: `https://omnigcloud.com/api/auth/callback/github`
5. **Environment Variables:**
   - `AUTH_GITHUB_ID`: Your Client ID
   - `AUTH_GITHUB_SECRET`: Your Client Secret

---

## 2. Social Media Integration (Currently Hidden)
Social media links are synchronized in `messages/en.json` but have been hidden from the public UI (Footer and Contact Page) until you are ready to launch them.

| Platform | Handle | URL |
| :--- | :--- | :--- |
| **LinkedIn** | `omnigcloud` | [linkedin.com/company/omnigcloud](https://linkedin.com/company/omnigcloud) |
| **X (Twitter)** | `@omnigcloud` | [x.com/omnigcloud](https://x.com/omnigcloud) |
| **GitHub** | `omnigcloud` | [github.com/omnigcloud](https://github.com/omnigcloud) |
| **Discord** | `omnigcloud` | [discord.gg/omnigcloud](https://discord.gg/omnigcloud) |

---

## 3. Required Core Auth Variables
Ensure these are set for the authentication system to function:
- `AUTH_SECRET`: A random 32-character string (generate with `openssl rand -base64 32`).
- `REDIS_URL`: Your Upstash Redis URL.
- `REDIS_TOKEN`: Your Upstash Redis Token.

---

## 4. Administrative Controls
- **Admin Access:** Add email addresses to `ADMIN_EMAILS` (comma-separated) in your environment variables to grant "admin" roles automatically upon sign-in.
- **Magic Links:** To enable passwordless email login, set `ENABLE_MAGIC_LINK="true"` and configure SMTP settings (`EMAIL_SERVER_HOST`, etc.).
