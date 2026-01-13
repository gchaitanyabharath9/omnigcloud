# QUICK REFERENCE: PUBLICATION DECISION MATRIX

**Date:** January 13, 2026  
**Status:** ✅ READY TO PUBLISH (98% — minor sanitization required)

---

## ✅ SAFE TO PUBLISH (PUBLIC REPOSITORY)

### Core Technical Papers (8 Documents)
- ✅ A1: Cloud-Native Enterprise Reference Architecture
- ✅ A2: High-Throughput Distributed Systems
- ✅ A3: Enterprise Observability & Operational Intelligence
- ✅ A4: Platform Governance in Multicloud/Hybrid
- ✅ A5: Monolith to Cloud-Native Modernization
- ✅ A6: Adaptive Policy Enforcement
- ✅ Scholarly Article: Enterprise Architecture
- ✅ AECP Framework

**Verdict:** 100% CLEAN — No IP leakage, no privacy violations, no petition-sensitive material

---

## ⚠️ SANITIZE BEFORE PUBLISHING (2 Files)

### 1. README.md
- **Action:** Remove "EB-1A Projectable Features" section (line 320)
- **Time:** 2 minutes
- **Risk:** LOW — Section is isolated, easy to remove

### 2. docs/architecture/patterns.md
- **Action:** Remove "EB-1A Scholarly Compendium" subtitle + "EB-1A Significance" section
- **Time:** 5 minutes
- **Risk:** LOW — Minor text replacements

---

## 🔒 MOVE TO PRIVATE REPO: cnmrf-papers-private (22 Files)

**Purpose:** Internal process documentation, not for public consumption

```
docs/engineering/DOCUMENTATION-SUMMARY.md
docs/research/risk_audit.md
docs/research/SANITIZATION-PLAN.md
docs/research/SANITIZATION-REDACTION-GUIDE.md
docs/research/SANITIZATION-EXECUTION-SUMMARY.md
docs/research/PUBLIC-SAFE-SANITIZATION-SUMMARY.md
docs/research/PUBLISHING-AUDIT-EXECUTIVE-SUMMARY.md
docs/research/PUBLISHING-AUDIT-PHASE1-CLASSIFICATION.md
docs/research/PUBLISHING-AUDIT-PHASE2-GAP-AUDIT.md
docs/research/PUBLISHING-AUDIT-PHASE3-STRUCTURAL-ENHANCEMENT.md
docs/research/PUBLISHING-AUDIT-PHASE4-CLAIM-SANITIZATION.md
docs/research/PUBLISHING-AUDIT-PHASE5-CROSS-PAPER-CONSISTENCY.md
docs/research/PUBLISHING-AUDIT-PHASE6-7-8-FINAL.md
docs/research/TRI-VENUE-EXECUTIVE-SUMMARY.md
docs/research/TRI-VENUE-PHASE1-STRUCTURAL-NORMALIZATION.md
docs/research/TRI-VENUE-PHASE2-CONTRIBUTION-FRAMING.md
docs/research/TRI-VENUE-PHASE3-8-FINAL.md
docs/process/PUBLICATION-READINESS-REPORT.md
docs/process/RELEASE_GATE_ARXIV_SSRN.md
docs/process/SCHOLARLY_AECP_GATE_REPORT.md
docs/process/A2-ENHANCEMENT-CERTIFICATION.md
scripts/check_forbidden_terms.ts
```

---

## 🔒 MOVE TO PRIVATE REPO: eb1a-evidence-vault (13 Files)

**Purpose:** Attorney-client privileged petition materials

```
research/EB1A-Evidence-Package.md
research/IP-Protection-Strategy.md
qa-i18n/evidence/petition-narrative.md
qa-i18n/evidence/one-page-summary.md
qa-i18n/evidence/attorney-cover-memo.md
qa-i18n/evidence/brand-protection.md
docs/compliance/COMMERCIAL_SCALABILITY_EB1A.md
docs/research/eb1a_evidence_map.md
docs/research/eb1a_evidence_mapping.md
docs/research/eb1a_exhibits_and_audit.md
docs/research/aecp-expert-anchor.md
docs/research/dissemination_plan.md
docs/research/technical_contribution_summary.md
```

---

## 📊 AUDIT SUMMARY BY CATEGORY

| Category | Status | Details |
|:---|:---|:---|
| **IP Leakage** | ✅ CLEAN | No proprietary algorithms, configs, or client data |
| **Privacy** | ✅ CLEAN | No emails, personal IDs, or third-party names |
| **Client Confidentiality** | ✅ CLEAN | No real company names or attributable metrics |
| **Petition Sensitivity** | ✅ CLEAN (core papers) | EB-1A/USCIS terms only in supporting docs (to be moved) |

---

## 🚀 NEXT STEPS (45 minutes total)

1. **Sanitize 2 files** (7 minutes)
   - Remove EB-1A section from README.md
   - Sanitize docs/architecture/patterns.md

2. **Move 35 files to private repos** (30 minutes)
   - Create cnmrf-papers-private repo
   - Create eb1a-evidence-vault repo
   - Move files using git mv

3. **Final validation** (5 minutes)
   - Run forbidden terms check
   - Verify PDF integrity
   - Validate LICENSE compliance

4. **Commit & publish** (3 minutes)
   - Commit sanitized public repo
   - Push to GitHub
   - Tag release v1.0.0

---

## ✅ FINAL RECOMMENDATION

**SAFE TO PUBLISH NOW** after completing 45-minute sanitization checklist above.

All core technical papers are journal-safe and ready for:
- arXiv preprint submission
- IEEE/ACM conference/journal submission
- Public GitHub repository with DOI (via Zenodo)

**Confidence Level:** 98%  
**Risk Level:** MINIMAL (after sanitization)
