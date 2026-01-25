# GitHub UI Checklist for Scorecard Remediation

To achieve a 10/10 Scorecard rating, the following settings MUST be manually configured in the GitHub repository settings (API access is restricted for security).

## 🛡️ Branch Protection (Finding: `Branch-Protection`)

**Navigate to:** Settings > Branches > Add rule > `main`

- [ ] **Require a pull request before merging**
  - [ ] Require approvals: **1**
  - [ ] Dismiss stale pull request approvals when new commits are pushed
- [ ] **Require status checks to pass before merging**
  - Search for and select:
    - `Lint, Typecheck, Test, and Build` (or `check`)
    - `CodeQL Analysis`
    - `🛡️ Quality Gates (CI)`
- [ ] **Require signed commits** (Optional but recommended)
- [ ] **Do not allow bypassing the above settings**

## 🤝 Code Review (Finding: `Code-Review`)

**Navigate to:** Settings > Branches > `main` > Edit

- [ ] Ensure **Require a pull request before merging** is checked.
- [ ] Ensure **Require review from Code Owners** is checked (CODEOWNERS file is already created).

## 🚀 Vulnerability Scanning (Finding: `Vulnerabilities`)

**Navigate to:** Settings > Code security and analysis

- [ ] **Dependabot alerts**: Enable
- [ ] **Dependabot security updates**: Enable
- [ ] **Secret scanning**: Enable (if public)
- [ ] **Push protection**: Enable

## 📝 General Settings

- [ ] **General** > **Pull Requests** > Allow auto-merge (Disable if strict control needed, Enable if using strict checks)
- [ ] **Actions** > **General** > **Workflow permissions**:
  - Select "Read and write permissions" OR "Read repository contents and packages permissions"
  - **Check**: "Allow GitHub Actions to create and approve pull requests" (Only if using Dependabot auto-merge)
