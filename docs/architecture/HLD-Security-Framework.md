# High-Level Architecture Document (HLD)

## OmniGCloud Security Framework

**Version**: 1.0  
**Date**: December 30, 2025  
**Status**: Production  
**Classification**: Internal / Technical Documentation

---

## 1. Executive Summary

This document describes the high-level architecture of the OmniGCloud security framework, a comprehensive multi-layered security system designed for enterprise Next.js applications. The framework provides defense-in-depth protection across HTTP headers, rate limiting, CSRF protection, bot detection, input validation, and secrets management.

---

## 2. System Context

### 2.1 Business Context

**Purpose**: Protect public-facing marketing website and API endpoints from common web vulnerabilities while maintaining high performance and developer productivity.

**Stakeholders**:

- End Users: Visitors to marketing site, form submitters
- Developers: Engineering team building and maintaining the application
- Security Team: Monitoring and responding to security incidents
- Compliance Team: Ensuring regulatory compliance (GDPR, PCI DSS, SOC 2)

### 2.2 Technical Context

**Platform**: Next.js 16+ (App Router), TypeScript, Node.js 20+  
**Deployment**: Vercel Edge Network  
**External Dependencies**:

- Upstash Redis (production rate limiting)
- HashiCorp Vault (secrets management - production)
- Vercel Analytics (observability)

---

## 3. Architectural Principles

1. **Defense-in-Depth**: Multiple independent security layers
2. **Fail-Safe Defaults**: Secure by default, explicit opt-out required
3. **Zero-Trust Configuration**: Build-time validation prevents misconfigurations
4. **Environment Parity**: Consistent behavior across dev/staging/production
5. **Observable Security**: Comprehensive logging without exposing sensitive data
6. **Performance-Conscious**: Security controls with minimal latency overhead

---

## 4. Major Components

### 4.1 Component Overview

```
┌──────────────────────────────────────────────────────────────┐
│                        Client Layer                           │
│  - Browser (Next.js Client Components)                       │
│  - CSRF Token Management                                      │
│  - Form Validation (Client-Side)                             │
└──────────────────────────────────────────────────────────────┘
                            ↓ HTTPS
┌──────────────────────────────────────────────────────────────┐
│                     Edge Network Layer                        │
│  - Vercel Edge Functions                                     │
│  - HTTP Security Headers                                      │
│  - TLS Termination                                            │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│                  Application Security Layer                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Rate Limiting Module                                   │  │
│  │ - InMemoryRateLimiter (local)                         │  │
│  │ - RedisRateLimiter (production)                       │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ CSRF Protection Module                                 │  │
│  │ - Token Generation & Validation                        │  │
│  │ - Cookie Management                                    │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Form Security Module                                   │  │
│  │ - Honeypot Detection                                   │  │
│  │ - Time-to-Submit Validation                           │  │
│  │ - Payload Size Limits                                  │  │
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Input Validation Module (Zod)                          │  │
│  │ - Schema Validation                                    │  │
│  │ - Type Checking                                        │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│                    Business Logic Layer                       │
│  - Service Layer (LeadService, etc.)                         │
│  - Data Access Layer                                          │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│                   Observability Layer                         │
│  - Request Tracing (UUID)                                    │
│  - Structured Logging                                         │
│  - Safe Redaction                                             │
│  - Health Monitoring                                          │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│                    External Services                          │
│  - Upstash Redis (Rate Limiting)                             │
│  - HashiCorp Vault (Secrets)                                 │
│  - Vercel Analytics (Metrics)                                │
└──────────────────────────────────────────────────────────────┘
```

### 4.2 Component Descriptions

#### 4.2.1 HTTP Security Headers Module

**Location**: `next.config.ts`  
**Responsibility**: Configure security headers for all HTTP responses  
**Dependencies**: None  
**Interfaces**:

- Input: Next.js configuration
- Output: HTTP headers on all responses

**Key Headers**:

- Strict-Transport-Security (HSTS)
- Content-Security-Policy (CSP)
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

#### 4.2.2 Rate Limiting Module

**Location**: `src/lib/rate-limit.ts`  
**Responsibility**: Prevent abuse through request rate limiting  
**Dependencies**: Redis (production), In-memory Map (local)  
**Interfaces**:

```typescript
interface RateLimiter {
  check(ip: string, endpoint?: string): Promise<RateLimitResult>;
}
```

**Implementations**:

- InMemoryRateLimiter: Local development
- RedisRateLimiter: Production (distributed)
- NoopRateLimiter: Graceful fallback

#### 4.2.3 CSRF Protection Module

**Location**: `src/lib/csrf.ts`  
**Responsibility**: Prevent cross-site request forgery  
**Dependencies**: crypto (Node.js built-in)  
**Interfaces**:

```typescript
function generateCsrfToken(): string;
function validateCsrfToken(request: NextRequest): CsrfValidationResult;
```

**Token Structure**: `{randomBytes}.{timestamp}.{signature}`

#### 4.2.4 Form Security Module

**Location**: `src/lib/form-security.ts`  
**Responsibility**: Multi-layered bot and spam detection  
**Dependencies**: None  
**Interfaces**:

```typescript
function validateFormSecurity(
  request: NextRequest,
  body: any,
  config: FormSecurityConfig
): Promise<ValidationResult>;
```

**Detection Techniques**:

- Honeypot fields
- Payload size limits
- Time-to-submit heuristics
- Content-type validation

#### 4.2.5 Input Validation Module

**Location**: API route handlers  
**Responsibility**: Type-safe input validation  
**Dependencies**: Zod  
**Interfaces**:

```typescript
const Schema = z.object({...});
const validation = Schema.safeParse(input);
```

#### 4.2.6 Secrets Hygiene Module

**Location**: `scripts/check-secrets-hygiene.js`  
**Responsibility**: Build-time validation of environment variables  
**Dependencies**: Node.js fs, path  
**Execution**: Pre-build script (npm prebuild hook)

#### 4.2.7 Observability Module

**Location**: `src/lib/api-utils.ts`, `src/lib/logger.ts`  
**Responsibility**: Request tracing and safe logging  
**Dependencies**: uuid  
**Interfaces**:

```typescript
function withApiHarden(
  request: NextRequest,
  handler: (req, context) => Promise<NextResponse>
): Promise<NextResponse>;
```

---

## 5. Integration Points

### 5.1 External Integrations

#### 5.1.1 Upstash Redis

**Purpose**: Distributed rate limiting in production  
**Protocol**: Redis protocol over TLS  
**Authentication**: Token-based  
**Failover**: Graceful degradation (allows requests if Redis unavailable)

#### 5.1.2 HashiCorp Vault

**Purpose**: Secrets management in production  
**Protocol**: HTTPS REST API  
**Authentication**: Token-based  
**Fallback**: Environment variables (local/dev)

#### 5.1.3 Vercel Analytics

**Purpose**: Performance monitoring and observability  
**Protocol**: HTTPS (Vercel SDK)  
**Data**: Page views, Web Vitals, custom events

### 5.2 Internal Integrations

#### 5.2.1 Next.js Middleware

**Integration Point**: `src/middleware.ts` (if implemented)  
**Purpose**: Request interception for rate limiting and CSRF validation  
**Execution**: Edge runtime

#### 5.2.2 API Routes

**Integration Point**: `src/app/api/**/route.ts`  
**Purpose**: Business logic endpoints  
**Security Wrapper**: `withApiHarden()` function

---

## 6. Deployment View

### 6.1 Environment Separation

#### Local Development

```
┌─────────────────────────────────────┐
│  Developer Machine                  │
│  ┌───────────────────────────────┐  │
│  │ Next.js Dev Server            │  │
│  │ - InMemoryRateLimiter         │  │
│  │ - .env.local secrets          │  │
│  │ - Relaxed security headers    │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

#### Production

```
┌─────────────────────────────────────────────────────────┐
│  Vercel Edge Network                                    │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Edge Functions                                    │  │
│  │ - HTTP Security Headers                           │  │
│  │ - TLS Termination                                 │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Next.js Application                               │  │
│  │ - RedisRateLimiter → Upstash Redis               │  │
│  │ - Secrets → HashiCorp Vault                       │  │
│  │ - Strict security headers                         │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 6.2 Deployment Pipeline

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Code Push  │ -> │  CI/CD       │ -> │  Production  │
│   (GitHub)   │    │  (GitHub     │    │  (Vercel)    │
│              │    │   Actions)   │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
                           │
                           ├─> Secrets Hygiene Check
                           ├─> TypeScript Compilation
                           ├─> npm audit
                           ├─> Build Application
                           └─> Deploy to Vercel
```

---

## 7. Security View

### 7.1 Threat Model

**Assets**:

- User data (contact forms, leads)
- API endpoints
- Application secrets
- Session tokens

**Threats**:

- OWASP Top 10 vulnerabilities
- Bot attacks and spam
- DDoS attacks
- Secret exposure
- Data exfiltration

**Mitigations**:

- Defense-in-depth architecture
- Multiple independent security layers
- Build-time validation
- Runtime monitoring

### 7.2 Security Controls

| Control          | Layer       | Threat Mitigated           |
| ---------------- | ----------- | -------------------------- |
| HSTS             | HTTP        | Man-in-the-middle          |
| CSP              | HTTP        | XSS, data injection        |
| Rate Limiting    | Application | DDoS, brute force          |
| CSRF Protection  | Application | Cross-site request forgery |
| Input Validation | Application | Injection attacks          |
| Honeypot         | Application | Bot submissions            |
| Secrets Hygiene  | Build-time  | Secret exposure            |

---

## 8. Observability View

### 8.1 Logging Strategy

**Structured Logging**:

```json
{
  "level": "info",
  "message": "API request",
  "requestId": "550e8400-...",
  "method": "POST",
  "route": "/api/contact",
  "status": 200,
  "duration": 45,
  "timestamp": "2025-12-30T12:00:00.000Z"
}
```

**Redacted Fields**:

- User messages
- Passwords
- Tokens
- API keys

### 8.2 Monitoring Endpoints

**Health Check**: `/api/health`

```json
{
  "status": "ok",
  "system": {
    "version": "0.1.0",
    "nodeEnv": "production",
    "appEnv": "prod",
    "uptimeSeconds": 3600
  },
  "dependencies": {
    "redis": { "status": "UP" },
    "vault": { "status": "UP" }
  }
}
```

### 8.3 Metrics

**Key Metrics**:

- Request rate (requests/second)
- Error rate (errors/total requests)
- Latency (p50, p95, p99)
- Rate limit hits (429 responses)
- CSRF failures (403 responses)
- Bot detections (honeypot hits)

---

## 9. Resiliency & Failure Handling

### 9.1 Failure Modes

| Component    | Failure Mode       | Handling Strategy            |
| ------------ | ------------------ | ---------------------------- |
| Redis        | Connection failure | Fail open (allow requests)   |
| Vault        | Connection failure | Fallback to env vars         |
| CSRF         | Invalid token      | Fail closed (reject request) |
| Validation   | Invalid input      | Fail closed (reject request) |
| Rate Limiter | Internal error     | Fail open (allow requests)   |

### 9.2 Circuit Breaker Pattern

**Not Implemented**: Current architecture uses simple fail-open/fail-closed strategies.

**Future Enhancement**: Implement circuit breaker for external service calls (Redis, Vault).

---

## 10. Non-Functional Requirements

### 10.1 Performance

- **Latency**: <100ms for security checks (rate limiting, CSRF, validation)
- **Throughput**: Support 1000 requests/second per instance
- **Bundle Size**: <20KB for client-side security utilities

### 10.2 Scalability

- **Horizontal Scaling**: Stateless application design enables horizontal scaling
- **Rate Limiting**: Redis-based rate limiting supports distributed deployment
- **Session Management**: Stateless CSRF tokens (no session storage required)

### 10.3 Availability

- **Target**: 99.9% uptime
- **Failover**: Automatic failover via Vercel Edge Network
- **Graceful Degradation**: Security controls fail open when external services unavailable

### 10.4 Security

- **Encryption**: TLS 1.3 for all traffic
- **Authentication**: CSRF tokens for state-changing requests
- **Authorization**: (Not implemented in current scope)
- **Audit Logging**: All security events logged with request ID

### 10.5 Maintainability

- **Code Quality**: TypeScript with strict mode
- **Documentation**: Comprehensive inline comments and external docs
- **Testing**: Unit tests for security utilities (not shown in current scope)
- **Monitoring**: Health endpoint and structured logging

### 10.6 Extensibility

- **Plugin Architecture**: Rate limiter interface enables custom implementations
- **Configuration**: Declarative configuration for rate limits, CSP, etc.
- **Hooks**: Middleware pattern enables custom security checks

---

## 11. Technology Stack

### 11.1 Core Technologies

- **Runtime**: Node.js 20+
- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript 5+
- **Validation**: Zod 4+
- **Cryptography**: Node.js crypto (built-in)

### 11.2 External Services

- **Rate Limiting**: Upstash Redis
- **Secrets Management**: HashiCorp Vault
- **Deployment**: Vercel Edge Network
- **Monitoring**: Vercel Analytics

### 11.3 Development Tools

- **Build**: npm, Next.js compiler
- **Linting**: ESLint
- **Type Checking**: TypeScript compiler
- **Security Scanning**: npm audit, Dependabot

---

## 12. Compliance

### 12.1 Standards Compliance

- **OWASP Top 10**: Protection against all top 10 vulnerabilities
- **PCI DSS**: Secure handling of payment data (no card data stored)
- **SOC 2**: Security and availability controls
- **GDPR**: No PII in logs, secure data handling

### 12.2 Audit Trail

- **Request Tracing**: Every request has unique ID
- **Security Events**: All security failures logged
- **Access Logs**: Structured logs with timestamp, user, action

---

## 13. Glossary

- **CSRF**: Cross-Site Request Forgery
- **CSP**: Content Security Policy
- **HSTS**: HTTP Strict Transport Security
- **PII**: Personally Identifiable Information
- **TLS**: Transport Layer Security
- **UUID**: Universally Unique Identifier

---

**Document Control**:

- Version: 1.0
- Last Updated: December 30, 2025
- Next Review: March 30, 2026
- Owner: Security Architecture Team
- Approvers: CTO, CISO
