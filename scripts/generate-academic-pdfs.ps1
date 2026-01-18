# Generate Academic-Quality PDFs using Pandoc
# For use with ResearchRabbit, Paperpal, Jenni, Avidnote, SciSpace

$OUTPUT_DIR = "review-pdfs-academic"
$PAPERS = @(
    @{Name = "A1-Cloud-Native-Enterprise-Reference"; Path = "src/app/[locale]/research/papers/a1-cloud-native-enterprise-reference/A1-PAPER-FULL.md" },
    @{Name = "A2-High-Throughput-Distributed-Systems"; Path = "src/app/[locale]/research/papers/a2-high-throughput-distributed-systems/A2-PAPER-FULL.md" },
    @{Name = "A3-Enterprise-Observability-Operational-Intelligence"; Path = "src/app/[locale]/research/papers/a3-enterprise-observability-operational-intelligence/A3-PAPER-FULL.md" },
    @{Name = "A4-Platform-Governance-Multicloud-Hybrid"; Path = "src/app/[locale]/research/papers/a4-platform-governance-multicloud-hybrid/A4-PAPER-FULL.md" },
    @{Name = "A5-Monolith-to-Cloud-Native-Modernization"; Path = "src/app/[locale]/research/papers/a5-monolith-to-cloud-native-modernization/A5-PAPER-FULL.md" },
    @{Name = "A6-Adaptive-Policy-Enforcement"; Path = "src/app/[locale]/research/papers/a6-adaptive-policy-enforcement/A6-PAPER-FULL.md" },
    @{Name = "AECP-Framework"; Path = "src/app/[locale]/research/papers/aecp/AECP-FULL.md" },
    @{Name = "Scholarly-Article-Enterprise-Architecture"; Path = "src/app/[locale]/research/papers/scholarly-article/SCHOLARLY-ARTICLE-ENTERPRISE-ARCHITECTURE.md" }
)

Write-Host "Generating Academic-Quality PDFs using Pandoc...`n"
Write-Host "These PDFs are optimized for academic review platforms:`n"
Write-Host "  - ResearchRabbit"
Write-Host "  - Paperpal (Microsoft Word plugin)"
Write-Host "  - Jenni AI"
Write-Host "  - Avidnote"
Write-Host "  - SciSpace`n"

# Check if Pandoc is installed
try {
    $pandocVersion = pandoc --version 2>&1 | Select-Object -First 1
    Write-Host "Using: $pandocVersion`n" -ForegroundColor Green
}
catch {
    Write-Host "ERROR: Pandoc is not installed!" -ForegroundColor Red
    Write-Host "`nPlease install Pandoc from: https://pandoc.org/installing.html"
    Write-Host "Or use: winget install --id JohnMacFarlane.Pandoc`n"
    exit 1
}

# Create output directory
if (!(Test-Path $OUTPUT_DIR)) {
    New-Item -ItemType Directory -Path $OUTPUT_DIR | Out-Null
    Write-Host "Created output directory: $OUTPUT_DIR`n"
}

$successCount = 0
$failCount = 0

foreach ($paper in $PAPERS) {
    Write-Host "Processing: $($paper.Name)..." -NoNewline
    
    $inputPath = $paper.Path
    $outputPath = Join-Path $OUTPUT_DIR "$($paper.Name).pdf"
    
    if (!(Test-Path $inputPath)) {
        Write-Host " ERROR: Source not found" -ForegroundColor Red
        $failCount++
        continue
    }
    
    try {
        # Read and preprocess markdown
        $content = Get-Content $inputPath -Raw
        
        # Remove placeholder diagram references (they break PDF generation)
        $content = $content -replace '!\[Placeholder Diagram\]\([^\)]+\)', ''
        
        # Remove other broken image references
        $content = $content -replace '!\[([^\]]*)\]\((?!http|data:)([^\)]+)\)', ''
        
        # Create temp file
        $tempMd = Join-Path $OUTPUT_DIR "$($paper.Name).temp.md"
        $content | Set-Content $tempMd -Encoding UTF8
        
        # Generate PDF with Pandoc using academic template
        $pandocArgs = @(
            $tempMd,
            "-o", $outputPath,
            "--pdf-engine=xelatex",
            "--variable", "geometry:margin=1in",
            "--variable", "fontsize=11pt",
            "--variable", "linestretch=1.5",
            "--number-sections",
            "--toc",
            "--toc-depth=3",
            "-V", "colorlinks=true",
            "-V", "linkcolor=blue",
            "-V", "urlcolor=blue",
            "-V", "citecolor=blue"
        )
        
        & pandoc $pandocArgs 2>&1 | Out-Null
        
        # Clean up temp file
        Remove-Item $tempMd -ErrorAction SilentlyContinue
        
        if (Test-Path $outputPath) {
            $sizeKB = [math]::Round((Get-Item $outputPath).Length / 1KB, 2)
            Write-Host " SUCCESS ($sizeKB KB)" -ForegroundColor Green
            $successCount++
        }
        else {
            Write-Host " ERROR: PDF not created" -ForegroundColor Red
            $failCount++
        }
    }
    catch {
        Write-Host " ERROR: $($_.Exception.Message)" -ForegroundColor Red
        Remove-Item $tempMd -ErrorAction SilentlyContinue
        $failCount++
    }
}

Write-Host "`n============================================================"
Write-Host "Summary:"
Write-Host "   SUCCESS: $successCount PDFs generated" -ForegroundColor Green
Write-Host "   FAILED: $failCount" -ForegroundColor $(if ($failCount -gt 0) { "Red" } else { "Green" })
Write-Host "   Output directory: $OUTPUT_DIR"
Write-Host "`nThese PDFs are ready for upload to:"
Write-Host "  - ResearchRabbit (literature mapping)"
Write-Host "  - Paperpal (grammar/style checking)"
Write-Host "  - Jenni AI (writing assistance)"
Write-Host "  - Avidnote (research organization)"
Write-Host "  - SciSpace (paper analysis)"
Write-Host "============================================================`n"

if ($failCount -eq 0) {
    Write-Host "All PDFs generated successfully!" -ForegroundColor Green
    Write-Host "`nNext steps:"
    Write-Host "1. Upload PDFs to your chosen academic review platform"
    Write-Host "2. Review AI-generated insights and suggestions"
    Write-Host "3. Check for plagiarism and citation issues"
    Write-Host "4. Verify technical accuracy and clarity`n"
    
    # Open the folder
    explorer $OUTPUT_DIR
    exit 0
}
else {
    Write-Host "`nSome PDFs failed to generate. Check errors above." -ForegroundColor Yellow
    exit 1
}
