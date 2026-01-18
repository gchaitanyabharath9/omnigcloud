
$ErrorActionPreference = "SilentlyContinue"

# 1. Organize: Move core scripts to scripts/publications
Write-Host "Organizing scripts..."
$pubDir = "scripts/publications"
if (-not (Test-Path $pubDir)) { New-Item $pubDir -ItemType Directory }

Move-Item scripts/prepare-*.js $pubDir -Force
Move-Item scripts/arxiv-gate.js $pubDir -Force
Move-Item scripts/setup-arxiv.ps1 $pubDir -Force
Move-Item scripts/normalize-papers.js $pubDir -Force
Move-Item scripts/colorize-svgs.js $pubDir -Force
Move-Item scripts/papers_manifest.json $pubDir -Force

# 2. Cleanup: Remove temporary/debug scripts
Write-Host "Removing unneccesary scripts..."
Remove-Item scripts/debug-*.js -Force
Remove-Item scripts/retry-*.js -Force
Remove-Item scripts/check-failures.js -Force
Remove-Item scripts/generate-review-*.js -Force # Replaced by generate-all-reviews.js
Remove-Item scripts/manual-mermaid-fixes.js -Force
Remove-Item scripts/generate-a1-test.js -Force
Remove-Item scripts/check-no-pdf.ps1 -Force

# 3. Cleanup: Remove intermediate generated TeX in papers/ (stale)
Write-Host "Cleaning stale paper artifacts..."
Remove-Item papers/ieee/*.tex -Force
Remove-Item papers/ieee/*.log -Force
Remove-Item papers/ieee/*.aux -Force
Remove-Item papers/ieee/*.out -Force
Remove-Item papers/ieee/*.pdf -Force

Remove-Item papers/acm/*.tex -Force
Remove-Item papers/acm/*.log -Force
Remove-Item papers/acm/*.aux -Force
Remove-Item papers/acm/*.out -Force
Remove-Item papers/acm/*.pdf -Force

Remove-Item papers/arxiv/*.tex -Force
Remove-Item papers/arxiv/*.log -Force
Remove-Item papers/arxiv/*.aux -Force
Remove-Item papers/arxiv/*.out -Force
Remove-Item papers/arxiv/*.pdf -Force

# 4. Cleanup: Remove any other rogue PDFs (except review-pdfs and submission archive)
# We trust the recently generated review-pdfs are correct and we want to keep them.
# The user said "keep these recently generated pdfs".

Write-Host "Cleanup Complete."
