
# arxiv_ssrn_submission_checklist.md

## Submission Checklist: arXiv & SSRN

**Target Repos:** omnigcloud (Source), arXiv (Public Archive), SSRN (Social Science/Law)

### 1. Pre-Submission QA (Local)
- [ ] **Content Finalized:** Paper passes `a_series_quality_gate.md`.
- [ ] **PDF Generation:** Use "Print to PDF" from Chrome on the `omnigcloud` page.
    -   *Settings:* Margins: Default, Headers/Footers: Off, Background Graphics: On.
- [ ] **Anonymity Check:** Review for any internal project codes (e.g., "Project Zodiac") that shouldn't be public.
- [ ] **Links:** All hyperlinks must be fully qualified (https://...).

### 2. arXiv Specifics
- **Category:** `cs.SE` (Software Engineering) or `cs.DC` (Distributed, Parallel, and Cluster Computing).
- **Secondary:** `cs.AR` (Hardware Architecture) if relevant.
- **License:** arXiv.org perpetual, non-exclusive license.
- **Source:** If submitting PDF-only, ensure no "Type 3 fonts". (Chrome PDF is usually safe).
- **Abstract:** Plain text, no Markdown. Max 1920 characters.

### 3. SSRN Specifics
- **Network:** CompSciRN (Computer Science Research Network).
- **Keywords:** High-scale, Cloud-native, Sovereign Cloud, Distributed Systems, Governance.
- **Abstract:** Can be longer than arXiv.
- **Upload:** PDF only.

### 4. Evidence Vault Protocol
- [ ] **Hash:** Run `Get-FileHash -Algorithm SHA256 [Paper].pdf`.
- [ ] **Snapshot:** Save the "Submission Received" screen.
- [ ] **Storage:** Upload PDF + Snapshot to `eb1a-evidence-vault/04_publications/[PaperID]`.

### 5. Post-Approval
- [ ] **Canonical Link:** Update `omnigcloud` page with "Also available on arXiv: [ID]".
- [ ] **Social:** Trigger Forum Posting (see `forum_posting_templates.md`).
