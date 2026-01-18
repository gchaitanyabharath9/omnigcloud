# PowerShell script to perform Nuclear Sanitization of ACM LaTeX files

$TargetFiles = @(
    "submission/acm/A1/main.tex",
    "submission/acm/A2/main.tex",
    "submission/acm/A3/main.tex",
    "submission/acm/A4/main.tex",
    "submission/acm/A5/main.tex",
    "submission/acm/A6/main.tex",
    "submission/acm/AECP/main.tex",
    "submission/acm/ARCH/main.tex"
)

$CanonicalCCS = @"
\begin{CCSXML}
<ccs2012>
 <concept>
  <concept_id>10003033.10003058</concept_id>
  <concept_desc>Computer systems organization~Distributed architectures</concept_desc>
  <concept_significance>500</concept_significance>
 </concept>
</ccs2012>
\end{CCSXML}

\ccsdesc[500]{Computer systems organization~Distributed architectures}
"@

# Helper to safely replace unicode chars
function Replace-Char {
    param($Text, $Code, $Replacement)
    $Char = [char][int]$Code
    return $Text.Replace($Char, $Replacement)
}

foreach ($RelPath in $TargetFiles) {
    $FullPath = Resolve-Path $RelPath
    Write-Host "Sanitizing $FullPath..." -ForegroundColor Cyan
    
    $Content = Get-Content -Path $FullPath -Raw -Encoding UTF8

    # TASK 1: UNICODE NUCLEAR CLEANSE using Hex Codes
    $Content = Replace-Char $Content 0x2019 "'"    # Right single quote
    $Content = Replace-Char $Content 0x2018 "`"    # Left single quote
    $Content = Replace-Char $Content 0x201C "``"   # Left double quote
    $Content = Replace-Char $Content 0x201D "''"   # Right double quote
    $Content = Replace-Char $Content 0x2013 "--"   # En dash
    $Content = Replace-Char $Content 0x2014 "---"  # Em dash
    $Content = Replace-Char $Content 0x2026 "..."  # Ellipsis
    $Content = Replace-Char $Content 0x00D7 "$\times$" 
    $Content = Replace-Char $Content 0x2192 "$\rightarrow$"
    $Content = Replace-Char $Content 0x03B2 "$\beta$"
    $Content = Replace-Char $Content 0x2264 "$\le$"
    $Content = Replace-Char $Content 0x2265 "$\ge$"
    $Content = Replace-Char $Content 0x2212 "-"    # Minus sign
    $Content = Replace-Char $Content 0x2022 "-"    # Bullet
    $Content = Replace-Char $Content 0x00A0 " "    # Non-breaking space
    
    # Strip remaining non-ASCII range [^\x00-\x7F]
    $Content = [System.Text.RegularExpressions.Regex]::Replace($Content, "[^\x00-\x7F]", "")

    # TASK 2: REMOVE MARKDOWN ARTIFACTS
    $Content = [System.Text.RegularExpressions.Regex]::Replace($Content, "!\[.*?\]", "")
    
    # TASK 3: FORCE ACM CCS MACROS
    # Remove existing CCS blocks using DotAll mode (?s)
    $Content = [System.Text.RegularExpressions.Regex]::Replace($Content, "(?s)\\begin\ { CCSXML\ }.*?\\end\ { CCSXML\ }", "")
    $Content = [System.Text.RegularExpressions.Regex]::Replace($Content, "(?s)\\ccsdesc\[.*?\]\ { .*?\ }", "")
    
    # Remove plain text artifacts
    $Content = $Content -replace "CCS Concepts.*Distributed architectures", ""
    $Content = $Content -replace "CCS Concepts", ""

    # Insert Canonical CCS
    if ($Content -match "\\end\{ abstract\ }") {
        $Content = $Content -replace "\\end\ { abstract\ }", "\\end { abstract }`n`n$CanonicalCCS"
    }

    # TASK 4: KILL SERIES DEPENDENCY LANGUAGE
    $Content = $Content -replace "A1[-–]A6 series", "architectural series"
    $Content = $Content -replace "Relationship to A1[-–]A6", "Relationship to Prior Work"
    $Content = $Content -replace "AECP executes A1", "The Control Plane executes the architecture"
    $Content = $Content -replace "concludes the series", "concludes the work"
    $Content = $Content -replace "finalizes the series", "finalizes the work"
    $Content = $Content -replace "foundational paper", "foundational work"
    $Content = $Content -replace "prior work series", "prior work"
    $Content = $Content -replace "A[1-6] paper", "framework"
    
    # Aggressive A1-A6 removal in text context
    # Be careful not to break "Paper A1" citations if they are valid refs, but user said REMOVE series refs.
    # We will replace standalone "A1".. "A6" with generic terms if they look like the papers.
    $Content = $Content -replace "\bA1\b", "The Reference Architecture"
    $Content = $Content -replace "\bA2\b", "The Throughput Layer"
    $Content = $Content -replace "\bA3\b", "The Observability Layer"
    $Content = $Content -replace "\bA4\b", "The Governance Layer"
    $Content = $Content -replace "\bA5\b", "The Modernization Pattern"
    $Content = $Content -replace "\bA6\b", "The Adaptive Control Layer"

    # TASK 5: REMOVE SELF-NOVELTY
    $Content = $Content -replace "\\subsection\{ Original Contribution \(Verified\)\ }", ""
    $Content = $Content -replace "\\subsection\ { Original Contribution\ }", ""
    $Content = $Content -replace "Original Contribution", "Contribution"
    $Content = $Content -replace "\(Verified\)", ""
    $Content = $Content -replace "gold standard", "standard"
    
    # TASK 7: TOP MATTER
    if ($Content -notmatch "printacmref=false") {
        $Content = $Content -replace "\\documentclass\[sigconf\]\{ acmart\ }", "\\documentclass[sigconf] { acmart }`n\\settopmatter { printacmref=false }"
    }

    # Cleanup multiple newlines
    $Content = [System.Text.RegularExpressions.Regex]::Replace($Content, "(\r?\n) { 3, }", "`n`n")
    
    Set-Content -Path $FullPath -Value $Content -Encoding UTF8
}
Write-Host "Nuclear Cleanse Complete." -ForegroundColor Green
