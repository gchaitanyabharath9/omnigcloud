# Build script for ACM Submission versions
# Usage: ./scripts/build-acm-submission.ps1

$Papers = @("A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH")
$BaseDir = Resolve-Path "submission/acm"
$OutputDir = Join-Path (Get-Location) "publication-pdfs-acm"

if (!(Test-Path $OutputDir)) { New-Item -ItemType Directory -Path $OutputDir | Out-Null }

foreach ($Paper in $Papers) {
    $PaperDir = Join-Path $BaseDir $Paper
    if (Test-Path $PaperDir) {
        Write-Host "Building $Paper..." -ForegroundColor Cyan
        Push-Location $PaperDir
        
        try {
            # Clean artifacts
            Remove-Item *.aux, *.log, *.out, *.bbl, *.blg -ErrorAction SilentlyContinue

            # Pass 1
            pdflatex -interaction=nonstopmode main.tex | Out-Null
            
            # BibTeX
            if (Test-Path "main.aux") {
                bibtex main | Out-Null
            }
            
            # Pass 2 & 3
            pdflatex -interaction=nonstopmode main.tex | Out-Null
            pdflatex -interaction=nonstopmode main.tex | Out-Null
            
            if (Test-Path "main.pdf") {
                $Dest = Join-Path $OutputDir "$Paper.pdf"
                Move-Item -Path "main.pdf" -Destination $Dest -Force
                Write-Host "  Success: $Dest" -ForegroundColor Green
            }
            else {
                Write-Error "  Failed to build $Paper. Check logs in $PaperDir"
            }
        }
        catch {
            Write-Error "  Error building $Paper : $_"
        }
        finally {
            Pop-Location
        }
    }
    else {
        Write-Warning "Directory not found: $PaperDir"
    }
}

Write-Host "Done." -ForegroundColor Yellow
