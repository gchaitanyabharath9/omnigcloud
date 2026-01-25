# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of OmniGCloud seriously. If you believe you have found a security vulnerability in OmniGCloud, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

### How to Report

Please report security vulnerabilities by emailing [security@omnigcloud.com](mailto:security@omnigcloud.com).

You should expect to receive a response within 24 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

### Preference

- Written in English
- A Proof of Concept (PoC) or detailed steps to reproduce.
- The impact of the vulnerability.

### Policy

OmniGCloud follows a coordinated disclosure policy. We ask that you:

- Give us reasonable time to investigate and mitigate an issue before making information about it public.
- Do not interact with or access data that is not your own.
- Act in good faith to avoid privacy violations, destruction of data, and interruption or degradation of our services.

We will acknowledge receipt of your vulnerability report and will keep you informed of our progress towards a fix. We will notify you when the fix has been released.

## Security Features

This project utilizes several security features:

- **SAST**: GitHub CodeQL is run on every push to `main` and all Pull Requests.
- **Dependency Scanning**: We use Dependabot and Renovate to keep dependencies up to date.
- **Secret Scanning**: GitHub Secret Scanning is enabled.
- **SCA**: Software Composition Analysis via `npm audit` and build checks.
- **Branch Protection**: The `main` branch is protected. Direct commits are blocked, and Pull Requests require:
  - Approving reviews (1 or more).
  - Passing status checks (CI, Lint, CodeQL).
  - Signed commits (GPG/SSH).

## Secure Coding Practices

We follow secure coding practices to prevent common web application vulnerabilities (OWASP Top 10):

- **Injection**: We use ORMs, parameterized queries, and strict input validation.
- **XSS**: We rely on Next.js/React automatic escaping and use strict CSP.
- **Authentication**: We use NextAuth.js for secure authentication flows.
- **Dependencies**: We pin actions and dependencies to specific versions/hashes where critical.
