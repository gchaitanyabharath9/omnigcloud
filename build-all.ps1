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
        
        # Create a tiny driver file
        $DriverContent = "\newcommand{\PaperFile}{$Paper}`n\input{$WrapperPath}"
        $DriverFile = "$BuildDir/$JobName.tex"
        $DriverContent | Out-File -FilePath $DriverFile -Encoding utf8
        
        # Run pdflatex
        # Note: Requires a TeX distribution (TeX Live, MiKTeX, or Tectonic) installed on the system path.
        try {
            # Running twice for references/toc
            pdflatex -interaction=batchmode -output-directory=$BuildDir $DriverFile
            # bibtex $BuildDir/$JobName
            # pdflatex -interaction=batchmode -output-directory=$BuildDir $DriverFile
            # pdflatex -interaction=batchmode -output-directory=$BuildDir $DriverFile
            
            if (Test-Path "$BuildDir/$JobName.pdf") {
                Move-Item -Path "$BuildDir/$JobName.pdf" -Destination "$OutputDir/$JobName.pdf" -Force
                Write-Host "Success: $OutputDir/$JobName.pdf" -ForegroundColor Green
            }
            else {
                Write-Warning "Failed to generate $JobName.pdf. Check $BuildDir/$JobName.log"
            }
        }
        catch {
            Write-Error "Error building ${JobName}: $($_.Exception.Message)"
        }
    }
}

Write-Host "Build process complete. Check the $OutputDir directory." -ForegroundColor Yellow
