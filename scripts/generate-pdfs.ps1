# PDF Generation Script for Publication Review
# Generates PDFs from all A1-A6 papers, scholarly article, and frameworks

$ErrorActionPreference = "Stop"

# Configuration
$PROJECT_ROOT = Split-Path -Parent $PSScriptRoot
$OUTPUT_DIR = Join-Path $PROJECT_ROOT "publication-pdfs"
$RESEARCH_DIR = Join-Path $PROJECT_ROOT "src\app\[locale]\research"

# Files to convert
$filesToConvert = @(
    @{
        Input  = Join-Path $RESEARCH_DIR "papers\a1-cloud-native-enterprise-reference\A1-PAPER-FULL.md"
        Output = "A1-Cloud-Native-Enterprise-Reference.pdf"
    },
    @{
        Input  = Join-Path $RESEARCH_DIR "papers\a2-high-throughput-distributed-systems\A2-PAPER-FULL.md"
        Output = "A2-High-Throughput-Distributed-Systems.pdf"
    },
    @{
        Input  = Join-Path $RESEARCH_DIR "papers\a3-enterprise-observability-operational-intelligence\A3-PAPER-FULL.md"
        Output = "A3-Enterprise-Observability-Operational-Intelligence.pdf"
    },
    @{
        Input  = Join-Path $RESEARCH_DIR "papers\a4-platform-governance-multicloud-hybrid\A4-PAPER-FULL.md"
        Output = "A4-Platform-Governance-Multicloud-Hybrid.pdf"
    },
    @{
        Input  = Join-Path $RESEARCH_DIR "papers\a5-monolith-to-cloud-native-modernization\A5-PAPER-FULL.md"
        Output = "A5-Monolith-to-Cloud-Native-Modernization.pdf"
    },
    @{
        Input  = Join-Path $RESEARCH_DIR "papers\a6-adaptive-policy-enforcement\A6-PAPER-FULL.md"
        Output = "A6-Adaptive-Policy-Enforcement.pdf"
    },
    @{
        Input  = Join-Path $RESEARCH_DIR "SCHOLARLY-ARTICLE-ENTERPRISE-ARCHITECTURE.md"
        Output = "SCHOLARLY-ARTICLE-Enterprise-Architecture.pdf"
    },
    @{
        Input  = Join-Path $RESEARCH_DIR "frameworks\aecp\AECP-FULL.md"
        Output = "AECP-Framework-Full.pdf"
    }
)

Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "PDF Generation for Publication Review" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan

# Create output directory
if (-not (Test-Path $OUTPUT_DIR)) {
    New-Item -ItemType Directory -Path $OUTPUT_DIR -Force | Out-Null
    Write-Host "`n✓ Created output directory: $OUTPUT_DIR" -ForegroundColor Green
}
else {
    Write-Host "`n✓ Output directory exists: $OUTPUT_DIR" -ForegroundColor Green
}

# Check for md-to-pdf
Write-Host "`nChecking for md-to-pdf..." -ForegroundColor Yellow
try {
    $null = npm list md-to-pdf 2>&1
    Write-Host "✓ md-to-pdf is installed" -ForegroundColor Green
}
catch {
    Write-Host "Installing md-to-pdf..." -ForegroundColor Yellow
    npm install --save-dev md-to-pdf
    Write-Host "✓ md-to-pdf installed" -ForegroundColor Green
}

Write-Host "`n" + ("=" * 60) -ForegroundColor Cyan
Write-Host "Generating PDFs..." -ForegroundColor Cyan
Write-Host ("=" * 60) -ForegroundColor Cyan

$successCount = 0
$failCount = 0

foreach ($file in $filesToConvert) {
    $inputPath = $file.Input
    $outputName = $file.Output
    $outputPath = Join-Path $OUTPUT_DIR $outputName
    
    if (-not (Test-Path -LiteralPath $inputPath)) {
        Write-Host "`n✗ Input file not found: $inputPath" -ForegroundColor Red
        $failCount++
        continue
    }
    
    Write-Host "`nGenerating: $outputName" -ForegroundColor Yellow
    Write-Host "  From: $inputPath" -ForegroundColor Gray
    
    try {
        # Use md-to-pdf with custom styling
        $mdToPdfOptions = @{
            format          = "A4"
            margin          = @{
                top    = "20mm"
                right  = "20mm"
                bottom = "20mm"
                left   = "20mm"
            }
            printBackground = $true
        }
        
        $optionsJson = $mdToPdfOptions | ConvertTo-Json -Compress
        
        # Generate PDF
        npx md-to-pdf "$inputPath" --pdf-options "$optionsJson" 2>&1 | Out-Null
        
        # Move to output directory
        $generatedPdf = $inputPath -replace '\.md$', '.pdf'
        if (Test-Path -LiteralPath $generatedPdf) {
            Move-Item -LiteralPath $generatedPdf -Destination $outputPath -Force
            Write-Host "  ✓ Generated: $outputName" -ForegroundColor Green
            $successCount++
        }
        else {
            Write-Host "  ✗ PDF generation failed" -ForegroundColor Red
            $failCount++
        }
    }
    catch {
        Write-Host "  ✗ Error: $_" -ForegroundColor Red
        $failCount++
    }
}

Write-Host "`n" + ("=" * 60) -ForegroundColor Cyan
Write-Host "Summary" -ForegroundColor Cyan
Write-Host ("=" * 60) -ForegroundColor Cyan
Write-Host "Total files: $($filesToConvert.Count)" -ForegroundColor White
Write-Host "✓ Successful: $successCount" -ForegroundColor Green
Write-Host "✗ Failed: $failCount" -ForegroundColor Red
Write-Host "`nOutput directory: $OUTPUT_DIR" -ForegroundColor Cyan
Write-Host ("=" * 60) -ForegroundColor Cyan

# Create a README in the output directory
$readmeContent = @"
# Publication PDFs - Generated $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

This folder contains PDF versions of all research papers and frameworks for publication review.

## Contents

### Research Papers (A1-A6)
- A1-Cloud-Native-Enterprise-Reference.pdf
- A2-High-Throughput-Distributed-Systems.pdf
- A3-Enterprise-Observability-Operational-Intelligence.pdf
- A4-Platform-Governance-Multicloud-Hybrid.pdf
- A5-Monolith-to-Cloud-Native-Modernization.pdf
- A6-Adaptive-Policy-Enforcement.pdf

### Scholarly Article
- SCHOLARLY-ARTICLE-Enterprise-Architecture.pdf

### Frameworks
- AECP-Framework-Full.pdf

## Generation Details
- Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
- Total files: $($filesToConvert.Count)
- Successful: $successCount
- Failed: $failCount

## Notes
- These PDFs are for review purposes only
- Not committed to version control
- Regenerate as needed using: ``pwsh scripts\generate-pdfs.ps1``
"@

Set-Content -Path (Join-Path $OUTPUT_DIR "README.md") -Value $readmeContent
Write-Host "`n✓ Created README.md in output directory" -ForegroundColor Green
