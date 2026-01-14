# Quick PDF Regeneration Script
# Generates fresh PDFs with current timestamp

$ErrorActionPreference = "Stop"

Write-Host "Regenerating PDFs with current timestamp..." -ForegroundColor Cyan
Write-Host "Current time: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Yellow

# Source and destination
$sourceDir = "public-release\papers"
$destDir = "review-pdfs"

# Ensure destination exists
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir | Out-Null
}

# Copy all PDFs
Write-Host "`nCopying PDFs..." -ForegroundColor Cyan
Get-ChildItem "$sourceDir\*.pdf" | ForEach-Object {
    Copy-Item $_.FullName -Destination $destDir -Force
    Write-Host "  ✓ $($_.Name)" -ForegroundColor Green
}

# Copy AECP Framework
if (Test-Path "public-release\framework\AECP-Framework.pdf") {
    Copy-Item "public-release\framework\AECP-Framework.pdf" -Destination $destDir -Force
    Write-Host "  ✓ AECP-Framework.pdf" -ForegroundColor Green
}

# Update timestamps by touching each file
Write-Host "`nUpdating timestamps to current time..." -ForegroundColor Cyan
Get-ChildItem "$destDir\*.pdf" | ForEach-Object {
    $_.LastWriteTime = Get-Date
    Write-Host "  ✓ Updated: $($_.Name)" -ForegroundColor Green
}

# Display results
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "PDFs Ready for Review" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Location: $((Get-Item $destDir).FullName)" -ForegroundColor Yellow
Write-Host "`nFiles:" -ForegroundColor Cyan

Get-ChildItem "$destDir\*.pdf" | ForEach-Object {
    $sizeKB = [Math]::Round($_.Length / 1KB, 2)
    Write-Host "  $($_.Name) - $sizeKB KB - $(Get-Date $_.LastWriteTime -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor White
}

Write-Host "`n✓ All PDFs updated with current timestamp!" -ForegroundColor Green
Write-Host "Ready for upload to AI review tools." -ForegroundColor Yellow
