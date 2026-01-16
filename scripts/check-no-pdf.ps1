$stagedPdfs = git diff --cached --name-only --diff-filter=A | Select-String -Pattern "\.pdf$"
if ($stagedPdfs) {
    Write-Host "ERROR: The following PDF files are staged for commit:" -ForegroundColor Red
    $stagedPdfs | ForEach-Object { Write-Host " - $_" -ForegroundColor Yellow }
    Write-Host "PDFs must not be committed to this repository. Please unstage them." -ForegroundColor Red
    exit 1
}
exit 0
