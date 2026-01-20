# Repository Segregation & Hygiene Plan
**Date:** 2026-01-19  
**Status:** PLANNING PHASE  
**Owner:** gchaitanyabharath9

---

## Repository Locations (Confirmed)

| Repository | Local Path | Remote | Visibility |
|------------|-----------|--------|------------|
| **omnigcloud** | `C:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac` | `https://github.com/gchaitanyabharath9/omnigcloud.git` | PUBLIC |
| **cnmrf-papers-private** | `C:\Users\SOHAN\.gemini\antigravity\playground\cnmrf-papers-private` | `https://github.com/gchaitanyabharath9/cnmrf-papers-private` | PRIVATE |
| **eb1a-evidence-vault** | `C:\Users\SOHAN\.gemini\antigravity\playground\eb1a-evidence-vault` | `https://github.com/gchaitanyabharath9/eb1a-evidence-vault.git` | PRIVATE |

---

## STEP 1: Content Classification

### omnigcloud (PUBLIC) - Current State Analysis

#### ✅ SAFE - Keep in Public Repo
- `/src` - Next.js application source
- `/public` - Public assets (images, icons, fonts)
- `/scripts` - Website build/deployment scripts (SEO, i18n, release gates)
- `/.github` - GitHub Actions workflows
- `/k8s` - Kubernetes deployment configs
- `/terraform` - Infrastructure as code
- `/qa-i18n`, `/qa-perf`, `/qa-responsive` - QA test suites
- `README.md`, `LICENSE`, `CONTRIBUTING.md`, `SECURITY.md`, `CODEOWNERS`
- `package.json`, `tsconfig.json`, `next.config.ts`

#### ⚠️ REVIEW NEEDED - Check for Sensitive Content
- `/docs` - **141 files** - Need to audit for:
  - `/docs/research` - Research paper documentation (may reference private papers)
  - `/docs/publication` - Publication workflows (may reference EB-1A)
  - `/docs/status` - Paper status tracking (A1-A6, AECP, ARCH)
  - `/docs/reports` - Build/validation reports
  - `/docs/seo` - SEO documentation (likely safe)
  - `/docs/compliance`, `/docs/security` - Compliance docs (check for sensitive info)

#### 🔴 SENSITIVE - Should NOT be in Public Repo
- **None found** (no .tex files, no PDFs, no petition/uscis/eb1a references)

#### 🗑️ GENERATED - Should be .gitignored
- `.next/` - Already ignored ✅
- `node_modules/` - Already ignored ✅
- `tsconfig.tsbuildinfo` - **TRACKED** - Should be ignored
- `*.log` files - Already ignored ✅
- `/artifacts/` - Already ignored ✅

---

### cnmrf-papers-private (PRIVATE) - Current State

#### Structure (13 subdirectories, 3 files)
- `/papers` - LaTeX source papers
- `/papers-canonical` - Canonical paper versions
- `/templates` - ACM/IEEE/arXiv templates
- `/scripts` - Build scripts
- `/docs` - Paper documentation
- `/exports` - Build outputs (ignored)
- `/public_derivatives` - Public-safe excerpts
- `/deprecated`, `/exploratory`, `/indices`, `/tools`, `/workflows`
- `PAPERS_MANIFEST.md`, `README.md`, `.gitignore`

#### Status: ✅ WELL-ORGANIZED
- PDFs properly ignored
- Clear separation of source vs. output
- Manifest file present

---

### eb1a-evidence-vault (PRIVATE) - Current State

#### Structure (12 subdirectories, 7 files)
- `/00_cover_packet` - Petition cover materials
- `/01_criteria` - EB-1A criteria documentation
- `/05_impact_analysis` - Impact analysis
- `/exhibits` - Evidence exhibits
- `/recommendation` - Recommendation letters
- `/supporting_docs` - Supporting documentation
- `/crossref`, `/imported`, `/proof-of-authorship`, `/publication-links`, `/scripts`
- `EVIDENCE_MANIFEST.md`, `README.md`, `.gitignore`
- `EVIDENCE_CAPTURE_CHECKLIST_JAN2026.md`
- `MIGRATION_NOTES.md`, `QUICK_REFERENCE_PDF_CAPTURE.md`
- `WORKFLOW_CAPTURE_EVIDENCE.md`

#### Status: ✅ WELL-ORGANIZED
- PDFs properly ignored
- Clear EB-1A petition structure
- Manifest file present

---

## STEP 2: Actions Required

### A) omnigcloud (PUBLIC) - Cleanup Actions

#### 1. Update .gitignore
Add the following entries:
```gitignore
# TypeScript build info
*.tsbuildinfo

# Temporary files
*.tmp
*.temp
*.bak

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Additional build artifacts
dist/
*.zip
```

#### 2. Audit /docs Folder
**Action:** Review all files in `/docs/research`, `/docs/publication`, `/docs/status` for:
- References to private EB-1A petition details
- Attorney communications
- Personal identifying information
- Sensitive metrics or data

**Decision Rules:**
- If doc is **purely technical** (build process, LaTeX compilation) → **KEEP in public**
- If doc references **paper abstracts/titles only** → **KEEP in public**
- If doc contains **submission strategies, attorney advice, petition details** → **MOVE to cnmrf-papers-private or eb1a-evidence-vault**

#### 3. Remove Tracked Build Artifacts
```powershell
git rm --cached tsconfig.tsbuildinfo
git rm --cached -r artifacts/ (if tracked)
```

#### 4. Verify No Secrets in History
```powershell
# Check for accidentally committed secrets
git log --all --full-history -- "*.env*"
git log --all --full-history -- "*.pem"
git log --all --full-history -- "*secret*"
```

---

### B) cnmrf-papers-private (PRIVATE) - Enhancement Actions

#### 1. Enhance .gitignore
```gitignore
# Build outputs
exports/
dist/
out/
build/
*.log
*.tmp

# LaTeX artifacts
*.aux
*.bbl
*.blg
*.fls
*.fdb_latexmk
*.synctex.gz
*.toc
*.out
*.nav
*.snm
*.vrb

# PDF Protection (already present)
**/*.pdf
*.pdf
/submission/**/*.pdf
/dist/**/*.pdf
/out/**/*.pdf
/build/**/*.pdf

# OS files
.DS_Store
Thumbs.db

# Temporary
*.bak
*.temp
```

#### 2. Add Build Scripts
Create `/scripts/build-all.ps1`:
```powershell
# Build all papers locally (PDFs stay local, never committed)
# Usage: .\scripts\build-all.ps1
```

#### 3. Update PAPERS_MANIFEST.md
Document:
- All paper IDs (A1-A6, AECP, ARCH)
- Build status
- Submission status
- Public derivative status

---

### C) eb1a-evidence-vault (PRIVATE) - Enhancement Actions

#### 1. Enhance .gitignore
```gitignore
# PDF Protection (already present)
**/*.pdf
*.pdf

# Sensitive documents
*.docx
*.xlsx
*.zip

# Scanned documents
*.jpg
*.jpeg
*.png
*.tiff

# OS files
.DS_Store
Thumbs.db

# Temporary
*.tmp
*.bak
```

#### 2. Add Redaction Checklist
Create `/REDACTION_CHECKLIST.md`:
- Personal IDs (passport, SSN, etc.)
- Financial information
- Attorney-client privileged communications
- Case numbers and receipt numbers

---

## STEP 3: SEO & Sitemap Updates (omnigcloud only)

### Current Issues to Fix

#### 1. robots.txt Location
**Check:** Verify `public/robots.txt` exists (not `robot.txt`)

#### 2. Sitemap Generation
**Action:** Ensure sitemap is generated from actual routes, not hardcoded

**Requirements:**
- Use HTTPS + www canonical URLs only
- Include all locale variants (en, es, fr, de, zh, hi, ja, ko)
- Remove any 404/redirected URLs
- Include proper `<lastmod>` dates

#### 3. Menu Link Validation
**Check:**
- Solutions menu → Correct pages
- Resources menu → Correct pages
- Pricing menu → Correct pages
- Research menu → Public-safe paper previews only

#### 4. Metadata Validation
Ensure all pages have:
- `<link rel="canonical">` self-referential
- `hreflang` alternates for all locales
- OpenGraph tags (og:title, og:description, og:image, og:url)
- Twitter Card tags
- Structured data (Organization, WebSite schemas)

---

## STEP 4: CI/Build Verification

### omnigcloud (PUBLIC)

#### Pre-Commit Checks
```powershell
npm ci
npm run lint
npm run typecheck
npm run build
npm run test
npm run release:gate:local
```

#### Expected Results
- ✅ Lint: PASS
- ✅ Typecheck: PASS
- ✅ Build: PASS
- ✅ All gates: PASS
- ✅ No 404 errors on menu links
- ✅ All locale routes work

### cnmrf-papers-private (PRIVATE)

#### Build Verification
```powershell
# Test LaTeX compilation for A1-A3 minimum
cd papers/A1
pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex
# Verify PDF generated locally (not committed)
```

### eb1a-evidence-vault (PRIVATE)

#### Validation
```powershell
# Check markdown renders
# Verify no secrets committed
git log --all --full-history -- "*.pdf"
git log --all --full-history -- "*passport*"
git log --all --full-history -- "*ssn*"
```

---

## STEP 5: Git Operations

### Branch Strategy
Create branch in each repo:
```
chore/repo-segregation-seo-freeze
```

### Commit Sequence (omnigcloud)
1. `chore: enhance .gitignore for build artifacts`
2. `chore: remove tracked build artifacts from git`
3. `docs: audit and sanitize research documentation`
4. `seo: update robots.txt and sitemap generation`
5. `seo: fix menu links and canonical URLs`
6. `seo: add metadata and structured data`
7. `ci: verify all gates pass after cleanup`

### Commit Sequence (cnmrf-papers-private)
1. `chore: enhance .gitignore for LaTeX artifacts`
2. `docs: update PAPERS_MANIFEST.md`
3. `build: add build-all.ps1 script`

### Commit Sequence (eb1a-evidence-vault)
1. `chore: enhance .gitignore for sensitive files`
2. `docs: add REDACTION_CHECKLIST.md`
3. `docs: update EVIDENCE_MANIFEST.md`

---

## STEP 6: Safety Checklist

### Before Pushing to omnigcloud (PUBLIC)

- [ ] No PDFs committed
- [ ] No .env files committed
- [ ] No API keys or secrets
- [ ] No EB-1A petition details
- [ ] No attorney communications
- [ ] No personal IDs (passport, SSN, etc.)
- [ ] No financial information
- [ ] No USCIS case numbers or receipts
- [ ] All research docs are technical/public-safe only
- [ ] Build passes: `npm run release:gate:local`
- [ ] Sitemap contains only canonical HTTPS URLs
- [ ] robots.txt exists in public/
- [ ] All menu links work (no 404s)

### Before Pushing to cnmrf-papers-private (PRIVATE)

- [ ] No PDFs committed
- [ ] LaTeX sources compile successfully
- [ ] PAPERS_MANIFEST.md is up to date
- [ ] No secrets in LaTeX source

### Before Pushing to eb1a-evidence-vault (PRIVATE)

- [ ] No PDFs committed
- [ ] No unredacted personal IDs
- [ ] EVIDENCE_MANIFEST.md is up to date
- [ ] Sensitive documents properly categorized

---

## STEP 7: Final Deliverables

### 1. Repository Trees (After Cleanup)

#### omnigcloud (PUBLIC)
```
omnigcloud/
├── .github/          # CI/CD workflows
├── public/           # Static assets
├── src/              # Next.js app source
├── scripts/          # Build/deploy scripts
├── docs/             # Public-safe documentation only
├── k8s/              # Kubernetes configs
├── terraform/        # IaC
├── qa-i18n/          # i18n tests
├── qa-perf/          # Performance tests
├── qa-responsive/    # Responsive tests
├── .gitignore        # Enhanced
├── package.json
├── README.md
├── LICENSE
└── PUBLIC_CONTENT_MANIFEST.md
```

#### cnmrf-papers-private (PRIVATE)
```
cnmrf-papers-private/
├── papers/           # LaTeX sources (A1-A6, AECP, ARCH)
├── papers-canonical/ # Canonical versions
├── templates/        # ACM/IEEE/arXiv templates
├── scripts/          # Build scripts
├── docs/             # Paper documentation
├── public_derivatives/ # Public-safe excerpts
├── .gitignore        # Enhanced
├── README.md
└── PAPERS_MANIFEST.md
```

#### eb1a-evidence-vault (PRIVATE)
```
eb1a-evidence-vault/
├── 00_cover_packet/  # Petition cover
├── 01_criteria/      # EB-1A criteria
├── 05_impact_analysis/ # Impact analysis
├── exhibits/         # Evidence exhibits
├── recommendation/   # Rec letters
├── supporting_docs/  # Supporting docs
├── .gitignore        # Enhanced
├── README.md
├── EVIDENCE_MANIFEST.md
└── REDACTION_CHECKLIST.md
```

### 2. Build Results Summary

| Repository | Lint | Typecheck | Build | Tests | Status |
|------------|------|-----------|-------|-------|--------|
| omnigcloud | TBD | TBD | TBD | TBD | PENDING |
| cnmrf-papers-private | N/A | N/A | TBD (LaTeX) | N/A | PENDING |
| eb1a-evidence-vault | N/A | N/A | N/A | N/A | PENDING |

### 3. Files Moved Between Repos

| Source | Destination | Reason |
|--------|-------------|--------|
| TBD after /docs audit | TBD | TBD |

### 4. Confirmation Checklist

- [ ] No PDFs committed to any repo
- [ ] No sensitive EB-1A content in public repo
- [ ] All .gitignore files enhanced
- [ ] All builds pass
- [ ] Sitemap updated
- [ ] robots.txt verified
- [ ] Menu links validated
- [ ] Metadata complete
- [ ] Ready for PR

---

## Next Steps

1. **AUDIT /docs folder** - Review all 141 files for sensitive content
2. **Execute cleanup** - Apply .gitignore updates, remove tracked artifacts
3. **Update SEO** - Fix sitemap, robots.txt, menu links
4. **Verify builds** - Run all CI checks
5. **Create branches** - In all 3 repos
6. **Commit changes** - Following commit sequence
7. **Push & PR** - With safety checklist confirmed

---

**Status:** Ready to proceed with /docs audit
