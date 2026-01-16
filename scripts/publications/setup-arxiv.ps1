
# Step 1: Remove artifacts
Write-Host "Removing generated PDF artifacts..."
Get-ChildItem -Path . -Include *.pdf -Recurse | Remove-Item -Force
Write-Host "PDFs removed."

# Update .gitignore
$gitignore = ".gitignore"
if (-not (Test-Path $gitignore)) { New-Item $gitignore -ItemType File }
$content = Get-Content $gitignore -Raw
if ($content -notmatch "submission/\*\*/\*.pdf") {
    Add-Content $gitignore "`n# ArXiv/Generated Artifacts`n/submission/**/*.pdf`n/papers/**/*.pdf`n/review-pdfs/`n"
}

# Step 0: Inventory
$manifest = @(
    @{ id = "A1"; title = "Cloud Native Enterprise Reference"; source_tex = "papers/arxiv/A1.tex"; figure_dir = "public/assets/papers/a1/figures" },
    @{ id = "A2"; title = "High Throughput Distributed Systems"; source_tex = "papers/arxiv/A2.tex"; figure_dir = "public/assets/papers/a2/figures" },
    @{ id = "A3"; title = "Enterprise Observability & Operational Intelligence"; source_tex = "papers/arxiv/A3.tex"; figure_dir = "public/assets/papers/a3/figures" },
    @{ id = "A4"; title = "Platform Governance Multicloud Hybrid"; source_tex = "papers/arxiv/A4.tex"; figure_dir = "public/assets/papers/a4/figures" },
    @{ id = "A5"; title = "Monolith to Cloud Native Modernization"; source_tex = "papers/arxiv/A5.tex"; figure_dir = "public/assets/papers/a5/figures" },
    @{ id = "A6"; title = "Adaptive Policy Enforcement"; source_tex = "papers/arxiv/A6.tex"; figure_dir = "public/assets/papers/a6/figures" },
    @{ id = "AECP"; title = "AECP Framework"; source_tex = "papers/arxiv/AECP.tex"; figure_dir = "public/assets/papers/aecp/figures" },
    @{ id = "ARCH"; title = "Enterprise Architecture Scholarly Article"; source_tex = "papers/arxiv/ARCH.tex"; figure_dir = "public/assets/papers/scholarly-article/figures" }
)

$submissionDir = "submission"
if (-not (Test-Path $submissionDir)) { New-Item $submissionDir -ItemType Directory }

$manifest | ConvertTo-Json -Depth 2 | Out-File "$submissionDir/papers_manifest.json" -Encoding utf8

Write-Host "Manifest created at $submissionDir/papers_manifest.json"
