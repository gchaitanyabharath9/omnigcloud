# Pending Tasks & Roadmap

**Status:** High Priority
**Last Updated:** December 30, 2025

The following items are critical for the completion of the OmniGCloud production release.

## 1. Environment & Secrets Setup

- [ ] **Email Infrastructure**:
  - Create professional email aliases (admin@, support@, legal@, security@omnigcloud.com).
  - Configure SPF/DKIM/DMARC records for domain reputation.
  - Wire up `resend` API keys for transactional emails in production.
- [ ] **Google SSO Integration**:
  - Finalize Google Cloud Console project setup.
  - Generate correct **Client ID** and **Client Secret**.
  - Add authorized redirect URIs (e.g., `https://omnigcloud.com/api/auth/callback/google`).
  - Update `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` in Vercel.
- [ ] **GitHub OAuth**:
  - Verify GitHub App settings and permissions.
  - Ensure `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET` are rotated and secure.

## 2. UI/UX Refinement

- [x] **Font Uniformity**:
  - Standardized `Outfit` and `Inter` usage across Global CSS and Tailwind variables.
- [ ] **Mobile Responsiveness**:
  - Audit new "Command Center" dashboard on mobile breakpoints (< 768px).
- [ ] **Localization (i18n)**:
  - Audit remaining languages (es, fr, ja) for missing keys.
  - Verified `en`, `de`, `hi`, `zh` key consistency.

## 3. Security & Compliance

- [ ] **CSP Headers**:
  - Strict Content Security Policy implementation in `next.config.js`.
- [ ] **Audit Logging**:
  - Verify `Logger` service writes to persistent storage (e.g., Datadog, cloudwatch) in Prod.

## 4. Documentation

- [ ] **API References**:
  - Generate OpenAPI/Swagger spec for public endpoints.
- [ ] **Public Roadmap**:
  - Publish `ENHANCEMENT_ROADMAP.md` updates to the public docs site.

## 5. Multi-Cloud Deployment

- [x] **IaC Infrastructure**:
  - Created Terraform configurations for AWS (ECS), Azure (ACI), and GCP (Cloud Run).
- [x] **Containerization**:
  - Optimized `Dockerfile` for production standalone builds.
- [x] **OpenShift Integration**:
  - Created specialized OCP deployment manifests with Route support.
- [x] **Automation**:
  - Implemented `push-to-clouds.sh` for streamlined registry uploads.
- [x] **Documentation**:
  - Published `DEPLOY_MULTI_CLOUD.md`.
