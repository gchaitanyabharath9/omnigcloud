# Reproducibility Statement

**Artifact:** OmniGCloud Reference Platform
**Version:** 0.1.0-alpha
**Date:** December 30, 2025

## 1. Reproducibility Claim
The behaviors, performance characteristics, and architectural patterns described in the *Technical Preprint* and associated documentation are fully reproducible using the provided source code and configuration files. The system is designed to be deterministic in its build and startup phases.

## 2. Artifact Availability
All necessary components are contained within this repository:
*   **Source Code:** `src/` (Core logic, components, services)
*   **Configuration:** `src/config/` (Schemas, environment definitions)
*   **Infrastructure:** `docker-compose.yml` (Note: User must supply own Vault/Redis instances if running outside mock mode)
*   **Documentation:** `docs/guides/` (Deployment instructions)

## 3. Reproduction Steps

### A. Validating Typed Configuration (Fail-Fast)
1.  Navigate to root directory.
2.  Set `APP_ENV=prod` in `.env` (or mock via shell).
3.  Ensure `REDIS_URL` is **unset**.
4.  Run `npm run dev`.
5.  **Expected Result:** The application assumes a crash state immediately with a Zod Validation Error logged to the console. This confirms the "Gatekeeper" logic.

### B. Verifying Hybrid Secrets (Vault Integration)
1.  Requires a running Vault instance (local dev server).
2.  Set `VAULT_ADDR`, `VAULT_TOKEN`, and `APP_ENV=dev`.
3.  Run `npm run start`.
4.  Trigger `/api/health` or `/api/contact`.
5.  **Expected Result:** Note the console logs indicating "Vault Read" (first attempt) vs. "Cache Hit" (subsequent attempts), confirming the caching strategy.

### C. UI Observability
1.  Run `npm run dev`.
2.  Navigate to `localhost:3000`.
3.  observe the `PerformanceStatusWidget`.
4.  **Expected Result:** The widget renders fake-but-realistic telemetry data (in demo mode) or real Redis stats (if configured), validating the component's adaptability.

## 4. Non-Deterministic Elements
*   **Performance Metrics:** Actual latency numbers (ms) cited in the paper will vary based on host hardware and network conditions.
*   **External APIs:** Dependencies on Resend (Email) required valid API keys to fully reproduce the notification flow.

## 5. License
This reproduction package is provided under the terms specified in the repository's `LICENSE` file.
