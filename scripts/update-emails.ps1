# PowerShell script to update all email addresses in translation files to omnigcloud@gmail.com

$locales = @("en", "de", "es", "fr", "hi", "ja", "ko", "zh")
$messagesDir = "messages"

foreach ($locale in $locales) {
    $filePath = Join-Path $messagesDir "$locale.json"
    
    if (Test-Path $filePath) {
        Write-Host "Updating $filePath..." -ForegroundColor Cyan
        
        # Read the file content
        $content = Get-Content $filePath -Raw
        
        # Replace all @omnigcloud.com email addresses with omnigcloud@gmail.com
        $content = $content -replace 'admin@omnigcloud\.com', 'omnigcloud@gmail.com'
        $content = $content -replace 'architects@omnigcloud\.com', 'omnigcloud@gmail.com'
        $content = $content -replace 'legal@omnigcloud\.com', 'omnigcloud@gmail.com'
        $content = $content -replace 'press@omnigcloud\.com', 'omnigcloud@gmail.com'
        $content = $content -replace 'security@omnigcloud\.com', 'omnigcloud@gmail.com'
        $content = $content -replace 'support@omnigcloud\.com', 'omnigcloud@gmail.com'
        $content = $content -replace 'sales@omnigcloud\.com', 'omnigcloud@gmail.com'
        $content = $content -replace 'onboarding@omnigcloud\.com', 'omnigcloud@gmail.com'
        $content = $content -replace 'office-of-ceo@omnigcloud\.com', 'omnigcloud@gmail.com'
        $content = $content -replace 'research@omnigcloud\.com', 'omnigcloud@gmail.com'
        $content = $content -replace 'privacy@omnigcloud\.com', 'omnigcloud@gmail.com'
        
        # Write back to file
        $content | Set-Content $filePath -NoNewline
        
        Write-Host "✓ Updated $filePath" -ForegroundColor Green
    } else {
        Write-Host "✗ File not found: $filePath" -ForegroundColor Red
    }
}

Write-Host "`nAll translation files updated successfully!" -ForegroundColor Green
Write-Host "Please review the changes and commit them." -ForegroundColor Yellow
