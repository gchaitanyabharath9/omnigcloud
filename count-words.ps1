$papers = @(
    'src/app/[locale]/research/papers/a1-cloud-native-enterprise-reference/A1-PAPER-FULL.md',
    'src/app/[locale]/research/papers/a2-high-throughput-distributed-systems/A2-PAPER-FULL.md',
    'src/app/[locale]/research/papers/a3-enterprise-observability-operational-intelligence/A3-PAPER-FULL.md',
    'src/app/[locale]/research/papers/a4-platform-governance-multicloud-hybrid/A4-PAPER-FULL.md',
    'src/app/[locale]/research/papers/a5-monolith-to-cloud-native-modernization/A5-PAPER-FULL.md',
    'src/app/[locale]/research/papers/a6-adaptive-policy-enforcement/A6-PAPER-FULL.md',
    'src/app/[locale]/research/papers/scholarly-article/SCHOLARLY-ARTICLE-ENTERPRISE-ARCHITECTURE.md',
    'src/app/[locale]/research/papers/aecp/AECP-FULL.md'
)

Write-Output "=== BASELINE WORD COUNTS ==="
Write-Output ""

foreach ($p in $papers) {
    $content = (Get-Content $p) -join ' '
    $words = ($content -split '\s+').Count
    $name = Split-Path $p -Leaf
    Write-Output ("{0,-60} : {1,6} words" -f $name, $words)
}

Write-Output ""
Write-Output "=== END BASELINE ===" 
