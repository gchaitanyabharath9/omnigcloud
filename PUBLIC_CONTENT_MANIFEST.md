# PUBLIC_CONTENT_MANIFEST.md - omnigcloud

## Purpose
This repository contains the public-facing website and marketing materials for the OmnigCloud system. It is designed to be safe for public dissemination and does not contain sensitive EB-1A petition details or private research paper source files.

## Content Classification
### PUBLIC_WEB
- **src/**: Next.js application source code.
- **public/**: Public assets, images, and fonts.
- **docs/**: Public-facing documentation for platform users. (Private research/status docs have been moved to private repos).
- **scripts/**: Build and CI orchestration scripts.

## Segregated Repositories
- **cnmrf-papers-private**: Contains LaTeX source files and build configurations for research papers.
- **eb1a-evidence-vault**: Contains legal materials, petition narrative, exhibits, and evidence mapping.

## Compliance
- **No PDFs**: All generated PDF artifacts are ignored and not committed to history.
- **No USCIS/EB1A Content**: Scanned and purged of petition-specific framing.
- **Secret Hygiene**: Protected by `check-secrets-hygiene.js`.
