# PHASE 1: CLASSIFICATION & TARGETING

## Classification Table

| Document | Type | Primary Venue | Secondary Venue | NOT SUITABLE FOR |
|----------|------|---------------|-----------------|------------------|
| **A1: Cloud-Native Enterprise Reference Architecture** | Type B: Industry Research / Practitioner Paper | ACM Queue, IEEE Software | USENIX ;login:, InfoQ | Academic conferences (SOSP, OSDI, NSDI) - lacks empirical evaluation |
| **A2: High-Throughput Request Processing** | Type A: Peer-reviewed Systems / Architecture Paper | USENIX ATC, ACM SoCC, IEEE CLOUD | ACM Middleware, ICPE | Practitioner venues (lacks depth for research), Vision venues (has implementation) |
| **A3: Enterprise Observability & Operational Intelligence** | Type B: Industry Research / Practitioner Paper | ACM Queue, IEEE Software, USENIX ;login: | SREcon Proceedings, ACM SIGOPS | Pure academic venues (OSDI, SOSP) - production focus, not novel algorithms |
| **A4: Platform Governance in Multi-Cloud/Hybrid** | Type A: Peer-reviewed Systems / Architecture Paper | IEEE CLOUD, ACM SoCC, USENIX HotCloud | ACM Middleware, ICSE (DevOps track) | Vision venues (has concrete implementation), Pure security venues (broader scope) |
| **A5: Monolith-to-Cloud-Native Migration** | Type B: Industry Research / Practitioner Paper | IEEE Software, ACM Queue, ICSE (SEIP track) | MSR, ICSME | Pure systems venues (OSDI, SOSP) - migration focus, not novel system design |
| **A6: Adaptive Policy Enforcement (Synthesis)** | Type E: Scholarly Synthesis / Meta-Architecture | ACM Computing Surveys, IEEE Software (Survey), arXiv | ACM Queue, USENIX ;login: | Narrow systems venues - too broad/synthetic for OSDI/SOSP |
| **Scholarly Article: Enterprise Architecture** | Type E: Scholarly Synthesis / Meta-Architecture | ACM Computing Surveys, IEEE Computer, arXiv | ACM SIGSOFT Software Engineering Notes | Practitioner venues (too academic), Narrow conference tracks |
| **AECP Framework** | Type D: Framework / Reference Architecture | IEEE Software, ACM Queue, arXiv (cs.SE) | NIST Special Publications (reference), OpenSSF | Academic conferences (not a research contribution), Product documentation |

## Venue-Specific Rationale

### Type A Papers (A2, A4)
**Target:** Systems conferences with industry track or cloud-focused venues
- **Why:** Have quantitative evaluation, production deployment, architectural novelty
- **Avoid:** Top-tier systems (SOSP/OSDI) without controlled experiments
- **Best fit:** USENIX ATC, ACM SoCC, IEEE CLOUD (accept industry deployments)

### Type B Papers (A1, A3, A5)
**Target:** Practitioner-researcher hybrid venues
- **Why:** Production-validated, experience-driven, lacks controlled experiments
- **Avoid:** Pure academic venues requiring novelty proofs
- **Best fit:** ACM Queue, IEEE Software, USENIX ;login:

### Type E Papers (A6, Scholarly Article)
**Target:** Survey/synthesis venues or arXiv with industry follow-up
- **Why:** Meta-level integration, not single novel contribution
- **Avoid:** Narrow conference tracks expecting focused novelty
- **Best fit:** ACM Computing Surveys, arXiv → industry journal

### Type D (AECP)
**Target:** Framework/standard-adjacent venues
- **Why:** Reference architecture, not research artifact
- **Avoid:** Research conferences (not a paper), product docs (too formal)
- **Best fit:** IEEE Software, arXiv, potential NIST/OpenSSF contribution

## Submission Priority Order

### Tier 1 (Submit First - Highest Acceptance Probability)
1. **A2** → USENIX ATC or ACM SoCC (strong quantitative data)
2. **A4** → IEEE CLOUD (governance is hot topic)
3. **AECP** → arXiv + IEEE Software (framework, not research)

### Tier 2 (Refine After Tier 1 Feedback)
4. **A1** → ACM Queue (foundational, sets context)
5. **A3** → USENIX ;login: or ACM Queue (observability trends)
6. **A5** → IEEE Software or ICSE SEIP (migration stories wanted)

### Tier 3 (Synthesis - Submit Last)
7. **A6** → ACM Computing Surveys or arXiv (needs A1-A5 published first)
8. **Scholarly Article** → ACM Computing Surveys (needs full A-series validation)

## arXiv Categories (All Documents)

| Document | Primary Category | Secondary Categories |
|----------|------------------|---------------------|
| A1 | cs.SE (Software Engineering) | cs.DC (Distributed Computing) |
| A2 | cs.DC (Distributed Computing) | cs.PF (Performance) |
| A3 | cs.SE (Software Engineering) | cs.DC (Distributed Computing) |
| A4 | cs.SE (Software Engineering) | cs.CR (Cryptography & Security) |
| A5 | cs.SE (Software Engineering) | cs.DC (Distributed Computing) |
| A6 | cs.SE (Software Engineering) | cs.DC, cs.CR |
| Scholarly | cs.SE (Software Engineering) | cs.DC (Distributed Computing) |
| AECP | cs.SE (Software Engineering) | cs.CR (Cryptography & Security) |

## Formatting Requirements by Venue

### ACM Queue / ACM Computing Surveys
- **Format:** ACM Master Article Template (acmart)
- **Length:** 8,000-12,000 words (Queue), 15,000-25,000 words (Surveys)
- **Figures:** High-res PNG/PDF, color acceptable
- **Citations:** ACM Reference Format (numeric)

### IEEE Software / IEEE Computer
- **Format:** IEEE Computer Society Format
- **Length:** 4,000-6,000 words (articles), 8,000-12,000 (surveys)
- **Figures:** IEEE-compliant, grayscale preferred
- **Citations:** IEEE Reference Format (numeric, bracketed)

### USENIX (ATC, HotCloud, ;login:)
- **Format:** USENIX LaTeX template
- **Length:** 12 pages (ATC), 5 pages (HotCloud), 3,000-5,000 words (;login:)
- **Figures:** PDF/EPS, black-and-white for print
- **Citations:** Author-year or numeric (venue-specific)

### arXiv
- **Format:** LaTeX (preferred) or PDF
- **Length:** No limit, but 15-30 pages typical for cs.SE
- **Figures:** Any format, embedded in PDF
- **Citations:** BibTeX, any consistent style

---

**Next Phase:** Gap Audit (PHASE 2)
