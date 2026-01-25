# Phase 4 - Batch 3 (Services & Industries)

**Goal**: Implement enhanced SEO metadata for 6 service and industry pages.

## Services

### 1. Cloud Migration

**Path**: `src/app/[locale]/services/cloud-migration/page.tsx`
**Keywords**: cloud migration, aws migration, azure migration, lift and shift, re-platforming

### 2. Cloud Modernization

**Path**: `src/app/[locale]/services/cloud-modernization/page.tsx`
**Keywords**: app modernization, legacy moderniation, cloud native, refactoring, containerization

### 3. Microservices

**Path**: `src/app/[locale]/services/microservices/page.tsx`
**Keywords**: microservices architecture, decoding monoliths, service mesh, api gateway, distributed systems

### 4. DevOps

**Path**: `src/app/[locale]/services/devops/page.tsx`
**Keywords**: devops services, ci/cd pipelines, infrastructure as code, gitops, automation, sre

## Industries

### 5. Finance

**Path**: `src/app/[locale]/industries/finance/page.tsx`
**Keywords**: financial services cloud, fintech infrastructure, pci dss compliance, high frequency trading, secure banking

### 6. Healthcare

**Path**: `src/app/[locale]/industries/healthcare/page.tsx`
**Keywords**: healthcare cloud, hipaa compliance, hitech, medical data security, interoperability, fhir

---

**Implementation Plan**:

- Import `generateSEOMetadata` and `SEO_KEYWORDS` in all files.
- Replace/Add `generateMetadata` function.
- Ensure correct canonical URLs and OG images.
