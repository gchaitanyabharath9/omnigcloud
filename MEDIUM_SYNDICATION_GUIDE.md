# Medium & External Syndication Guide

## Strategy: Defensive Publication
To maximize reach while protecting the "Source of Truth" (OmniGCloud.com) and SEO authority, we use a **Canonical Syndication Strategy**.

### The "Tiered" Model
1.  **Tier 1: Canonical Source (OmniGCloud.com)**
    - **Content:** Full Technical Specification, Mermaid Diagrams, Interactive Elements.
    - **SEO:** `index: true`, full Schema.org markup.
    - **Role:** The "Master Record" of IP.

2.  **Tier 2: Immutable Witness (PDFs)**
    - **Content:** Cryptographically signed/hashed PDF of the research.
    - **Role:** Legal proof of prior art and authorship. Linked from Tier 1.

3.  **Tier 3: Syndication (Medium / LinkedIn)**
    - **Content:** High-level narrative, "Why this matters", key diagrams.
    - **Role:** Marketing funnel to drive traffic to Tier 1.

---

## How to Publish on Medium (Safe Mode)

### Step 1: Prepare the Content
- Do NOT copy-paste the entire Markdown file. Medium is for *reading*, not *specifications*.
- **Title:** Keep it punchy. E.g., *"Why we moved from Monolith to Sovereign Scaffolds"* (vs "A1 Reference Architecture").
- **Body:**
    - Intro: The Problem.
    - key Insight: The Solution (High Level).
    - Teaser: "Read the full technical specification..."

### Step 2: Configure Canonical Link (CRITICAL)
**This is the most important step for SEO Protection.**
1.  Go to **Medium > Story Settings > Advanced Settings**.
2.  Find **"Customize Canonical Link"**.
3.  Paste the URL of the **OmniGCloud Page** (e.g., `https://www.omnigcloud.com/en/research/papers/a1-cloud-native-enterprise-reference`).
4.  Save.
    *   *Result:* Google will attribute ALL ranking credit to OmniGCloud.com, not Medium. Medium becomes just a "pointer".

### Step 3: Call to Action (CTA)
End every Medium post with a clear IP claim and link:

> **Technical Disclosure**
> This article is an abstract of the **A1 Cloud-Native Reference Architecture**.
> For the full technical standard, schemas, and implementation details:
> [**Read the Official Specification on OmniGCloud**](https://www.omnigcloud.com/en/research/papers/a1-cloud-native-enterprise-reference)

---

## IP Prevention Checklist
- [ ] **Canonical Link Set?** (Must point to omnigcloud.com)
- [ ] **CTA Included?** (Must link to Tier 1)
- [ ] **Teaser Mode?** (Don't give away the entire "secret sauce" code; show the *concepts*)
