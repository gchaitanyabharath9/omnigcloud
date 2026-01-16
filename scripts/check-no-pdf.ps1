# scripts/check-no-pdf.ps1
# Ensures no PDF files are staged for commit.

$stagedPdfs = git diff --cached --name-only --filter=ACM | Select-String "\.pdf$"

if ($stagedPdfs) {
    Write-Error "ERROR: Attempting to commit PDF files. Please unstage them:`n$stagedPdfs"
    exit 1
}

exit 0
