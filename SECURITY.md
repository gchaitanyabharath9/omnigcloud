# Security Policy

## Supported Versions

Sovereign Modernization Engine (OmniGCloud) follows a rigorous security-first development lifecycle. We currently support the following versions for security updates:

| Version | Supported          |
| ------- | ------------------ |
| v0.1.x  | :white_check_mark: |
| < v0.1  | :x:                |

## Reporting a Vulnerability

As an **EB-1A Scholarly Initiative**, we take the integrity of the G-Framework seriously. We are committed to protecting the digital sovereignty of our users.

If you discover a security vulnerability within the G-Framework or the OmniGCloud platform, please report it immediately:

1. **Do not open a public Issue.**
2. Email your discovery to `security@omnigcloud.com`.
3. Provide a detailed summary, including steps to reproduce and a proof-of-concept (PoC) if applicable.

We will acknowledge receipt of your report within 48 hours and provide a timeline for remediation.

## Security Headers & Policies

The following enterprise-grade security headers are enforced across all routes in `next.config.ts`:

- **Content-Security-Policy (CSP)**: Implements a strict policy allowing only trusted sources for scripts, styles, and assets. Includes `frame-ancestors 'self'` to prevent clickjacking.
- **Strict-Transport-Security (HSTS)**: Enforced for 2 years (`max-age=63072000`) including subdomains and preloading.
- **X-Content-Type-Options**: Set to `nosniff` to prevent MIME-type sniffing.
- **X-Frame-Options**: Set to `SAMEORIGIN` (layered with CSP `frame-ancestors`).
- **Referrer-Policy**: Set to `strict-origin-when-cross-origin` to protect user privacy.
- **Permissions-Policy**: Restricts access to sensitive browser features (camera, microphone, etc.).

## Cookie Security

All application cookies follow these mandatory security attributes:
- **HttpOnly**: Prevents client-side scripts from accessing the cookie.
- **Secure**: Ensures cookies are only transmitted over encrypted (HTTPS) connections.
- **SameSite=Strict/Lax**: Protects against Cross-Site Request Forgery (CSRF) attacks.

## Our Security Architecture

The platform architecture implements the **Sovereign Security Mesh (SSM)**, including:
- **Zero-Trust Logic**: Mandatory verification for all cross-cloud intents.
- **Deceptive Ingestion**: Intelligent shielding against prompt injection and model abuse.
- **Atomic State Sovereignty**: Cryptographically signed infrastructure manifests.

Thank you for helping us maintain the world's most resilient multi-cloud control plane.
