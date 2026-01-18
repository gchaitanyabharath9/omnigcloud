# Generate PDFs from research papers
# PowerShell script for Windows

$OUTPUT_DIR = "review-pdfs"
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

Write-Host "Generating PDF files for research papers...`n"

# Create output directory
if (!(Test-Path $OUTPUT_DIR)) {
    New-Item -ItemType Directory -Path $OUTPUT_DIR | Out-Null
    Write-Host "Created output directory: $OUTPUT_DIR`n"
}

$successCount = 0
$failCount = 0

foreach ($paper in $PAPERS) {
    Write-Host "Processing: $($paper.Name)..."
    
    $inputPath = $paper.Path
    $tempMdPath = Join-Path $OUTPUT_DIR "$($paper.Name).md"
    $outputPath = Join-Path $OUTPUT_DIR "$($paper.Name).pdf"
    
    if (!(Test-Path $inputPath)) {
        Write-Host "   ERROR: Source file not found: $inputPath" -ForegroundColor Red
        $failCount++
        continue
    }
    
    try {
        # Read and preprocess markdown
        $content = Get-Content $inputPath -Raw
        
        # Replace placeholder diagrams
        $content = $content -replace '!\[Placeholder Diagram\]\([^\)]+\)', "`n`n**[DIAGRAM PLACEHOLDER - View online version for interactive diagrams]**`n`n"
        
        # Replace broken image references
        $content = $content -replace '!\[([^\]]*)\]\((?!http|data:)([^\)]+)\)', "`n`n**[Figure: `$1]**`n`n"
        
        # Save preprocessed version
        $content | Set-Content $tempMdPath -Encoding UTF8
        
        # Convert to PDF
        npx md-to-pdf $tempMdPath 2>&1 | Out-Null
        
        # Clean up temp MD file
        Remove-Item $tempMdPath -ErrorAction SilentlyContinue
        
        if (Test-Path $outputPath) {
            $sizeKB = [math]::Round((Get-Item $outputPath).Length / 1KB, 2)
            Write-Host "   SUCCESS: Generated $($paper.Name).pdf ($sizeKB KB)" -ForegroundColor Green
            $successCount++
        }
        else {
            Write-Host "   ERROR: PDF not created" -ForegroundColor Red
            $failCount++
        }
    }
    catch {
        Write-Host "   ERROR: $($_.Exception.Message)" -ForegroundColor Red
        Remove-Item $tempMdPath -ErrorAction SilentlyContinue
        $failCount++
    }
}

Write-Host "`n============================================================"
Write-Host "Summary:"
Write-Host "   SUCCESS: $successCount PDFs generated"
Write-Host "   FAILED: $failCount"
Write-Host "   Output directory: $OUTPUT_DIR"
Write-Host "`n   NOTE: Placeholder diagrams are marked with [DIAGRAM PLACEHOLDER]"
Write-Host "   NOTE: For full diagrams, view papers online at omnigcloud.com"
Write-Host "============================================================`n"

if ($failCount -gt 0) {
    exit 1
}
else {
    Write-Host "All PDFs generated successfully!" -ForegroundColor Green
    exit 0
}
