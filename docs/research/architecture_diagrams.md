# System Architecture & Diagram Descriptions

This document provides detailed textual descriptions of the system's architecture to support the creation of high-fidelity logical diagrams.

---

## 1. High-Level System Architecture Diagram

**Title:** OmniGCloud Reference Control Plane Architecture
**Description:** A layered view of the application stack showing the separation of concerns between the Edge Runtime, Configuration Layer, and External Services.

**Layers:**
1.  **Client Layer (Browser/Mobile):**
    *   Next.js Client Components (`Header`, `ASOSection`)
    *   React 19 Hooks
    *   Localized Content (i18n)
2.  **Edge Runtime Layer (Server):**
    *   **Config Loader:** Zod Validation <-> `src/config`
    *   **Secrets Manager:** Polymorphic Router <-> `src/secrets`
    *   **Service Layer:** `LeadService`, Business Logic
    *   **API Routes:** `/api/contact`, `/api/health`
3.  **Infrastructure Layer (External):**
    *   **Sovereign Storage:** HashiCorp Vault (Secrets), Redis (State/Queue)
    *   **Notification:** Resend SMTP (Email)

**Flow:** Request -> Middleware (Auth/Locale) -> API Route -> Service Layer -> Secrets Manager -> Infrastructure.

---

## 2. Environment Separation Model Diagram

**Title:** Zero-Trust Environment Isolation Strategy
**Description:** Visualizing how the system behaves differently across `Local`, `Dev`, and `Prod` environments.

**Nodes:**
*   **Local Env:**
    *   Source: `.env` file
    *   Secrets: Plaintext `process.env`
    *   Validation: Warn-only
*   **Prod Env (Sovereign):**
    *   Source: `src/config/envs/prod.ts`
    *   Secrets: **HashiCorp Vault** (TLS 1.3)
    *   Validation: **Fail-Fast** (Crash on error)
    *   Storage: Encrypted Redis

**Connection:** The `src/config/index.ts` module acts as the "Gatekeeper" switch that strictly enforces these paths based on `APP_ENV`.

---

## 3. Secret Management Flow Diagram

**Title:** Hybrid Secret Injection Logic
**Description:** A sequence diagram showing the decision tree for `getSecret()` calls.

**Sequence:**
1.  **Caller:** `LeadService` calls `getSecret('API_KEY')`.
2.  **Secrets Module:** Checks `APP_ENV`.
    *   **If Local:** Returns `process.env.API_KEY`.
    *   **If Non-Local:**
        3.  **Cache Check:** Checks in-memory Map for key.
        4.  **Vault Request:** If miss, calls `vault.read('kv/data/prod/app')`.
        5.  **Cache Set:** Stores result with TTL.
        6.  **Return:** Returns secret string.
3.  **Result:** Service uses secret transparently.

---

## 4. Automation & Agent Workflow Diagram

**Title:** Autonomous Lead Capture & Processing
**Description:** Tracking the lifecycle of a user interaction from UI to sovereign storage.

**Steps:**
1.  **User Action:** Submits Contact Form.
2.  **Validation:** Zod Schema verifies payload (Server-side).
3.  **Secrets Fetch:** `LeadService` requests Redis credentials via Secrets Module.
4.  **Encryption:** Data is serialized.
5.  **Queue Injection:**
    *   `LPUSH leads:all` (Queueing)
    *   `SET lead:{id}` (Persistence)
6.  **Notification:** Async call to Email Service (Resend).
7.  **Response:** Encrypted "Success" signal returned to Client.
