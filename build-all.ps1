# Build script for Canonical LaTeX papers
# Usage: ./build-all.ps1

$Papers = @("A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ScholarlyArticle")
$Venues = @("ieee", "acm", "arxiv")

$BuildDir = "build"
$OutputDir = "publication-pdfs-latex"

if (!(Test-Path $BuildDir)) { New-Item -ItemType Directory -Path $BuildDir }
if (!(Test-Path $OutputDir)) { New-Item -ItemType Directory -Path $OutputDir }

foreach ($Paper in $Papers) {
    foreach ($Venue in $Venues) {
        Write-Host "Building $Paper for $Venue..." -ForegroundColor Cyan
        
        $JobName = "$Paper-$Venue"
        $WrapperPath = "renderers/$Venue.tex"
        $LaTeXCommand = "\newcommand{\PaperFile}{$Paper}\input{$WrapperPath}"
        
        try {
            # 1st run
            Write-Host "  Pass 1..."
            pdflatex -interaction=nonstopmode -output-directory=$BuildDir -jobname=$JobName $LaTeXCommand > $null
            
            # BibTeX
            if (Test-Path "$BuildDir/$JobName.aux") {
                Write-Host "  BibTeX..."
                bibtex "$BuildDir/$JobName" > $null
            }
            
            # 2nd run
            Write-Host "  Pass 2..."
            pdflatex -interaction=nonstopmode -output-directory=$BuildDir -jobname=$JobName $LaTeXCommand > $null
            
            # 3rd run
            Write-Host "  Pass 3..."
            pdflatex -interaction=nonstopmode -output-directory=$BuildDir -jobname=$JobName $LaTeXCommand > $null
            
            if (Test-Path "$BuildDir/$JobName.pdf") {
                Move-Item -Path "$BuildDir/$JobName.pdf" -Destination "$OutputDir/$JobName.pdf" -Force
                Write-Host "  Success: $OutputDir/$JobName.pdf" -ForegroundColor Green
            }
            else {
                Write-Warning "  Failed to generate $JobName.pdf. Check $BuildDir/$JobName.log"
            }
        }
        catch {
            Write-Error "  Error building ${JobName}: $($_.Exception.Message)"
        }
    }
}

Write-Host "Build process complete." -ForegroundColor Yellow
