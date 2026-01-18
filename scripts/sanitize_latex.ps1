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


foreach ($RelPath in $TargetFiles) {
    $FullPath = Resolve-Path $RelPath
    Write-Host "Sanitizing $FullPath..." -ForegroundColor Cyan
    
    $Content = Get-Content -Path $FullPath -Raw -Encoding UTF8

    # ---------------------------------------------------------
    # TASK 1: UNICODE NUCLEAR CLEANSE
    # ---------------------------------------------------------
    # Common replacements
    $Content = $Content -replace "’", "'"
    $Content = $Content -replace "‘", "`"
    $Content = $Content -replace "“", "``"
    $Content = $Content -replace "”", "''"
    $Content = $Content -replace "– ", "--"
    $Content = $Content -replace "— ", "-- - "
    $Content = $Content -replace "…", "..."
    $Content = $Content -replace "×", "$\times$"
    $Content = $Content -replace "→", "$\rightarrow$"
    $Content = $Content -replace "β", "$\beta$"
    $Content = $Content -replace "≤", "$\le$"
    $Content = $Content -replace "≥", "$\ge$"
    $Content = $Content -replace "−", "-"
    $Content = $Content -replace "•", "-"
    
    # Strip any remaining non-ASCII (Nuclear Option)
    # Using regex to find bytes > 127
    $Content = [System.Text.RegularExpressions.Regex]::Replace($Content, "[^\x00-\x7F]", "")

    # ---------------------------------------------------------
    # TASK 2: REMOVE MARKDOWN & PDF ARTIFACTS
    # ---------------------------------------------------------
    # Remove markdown bold/italic usage if it looks like markdown (simple heuristic)
    # Avoid replacing math logic. This is risky, only targeting specific known artifacts if seen.
    $Content = $Content -replace "\!\[Figure.*?\]", "" # Remove markdown images
    
    # ---------------------------------------------------------
    # TASK 3: FORCE ACM CCS MACROS
    # ---------------------------------------------------------
    # 1. Remove existing CCS XML blocks
    $Content = [System.Text.RegularExpressions.Regex]::Replace($Content, "(?s)\\begin\ { CCSXML\ }.*?\\end\ { CCSXML\ }", "")
    $Content = [System.Text.RegularExpressions.Regex]::Replace($Content, "(?s)\\ccsdesc\[.*?\]\ { .*?\ }", "")
    
    # 2. Remove plain text "CCS Concepts" artifacts
    $Content = $Content -replace "CCS Concepts.*Distributed architectures", ""
    $Content = $Content -replace "CCS Concepts", ""

    # 3. Insert Canonical CCS after Abstract
    # Look for \end{abstract}
    if ($Content -match "\\end\{ abstract\ }") {
        $Content = $Content -replace "\\end\ { abstract\ }", "\\end { abstract }`n`n$CanonicalCCS"
    } else {
        Write-Warning "Could not find \end { abstract } in $RelPath"
    }

    # ---------------------------------------------------------
    # TASK 4: KILL SERIES DEPENDENCY LANGUAGE
    # ---------------------------------------------------------
    $Content = $Content -replace "A1[-–]A6 series", "architectural series"
    $Content = $Content -replace "Relationship to A1[-–]A6", "Relationship to Prior Work"
    $Content = $Content -replace "AECP executes A1", "The Control Plane executes the architecture"
    $Content = $Content -replace "concludes the series", "concludes the work"
    $Content = $Content -replace "finalizes the series", "finalizes the work"
    $Content = $Content -replace "foundational paper", "foundational work"
    $Content = $Content -replace "A1[-–]A6", "the architectural framework"
    # Specific A-series removal if freestanding
    $Content = $Content -replace "\bA[1-6]\b", "this work" # Context dependent, but being aggressive per instructions

    # ---------------------------------------------------------
    # TASK 5: REMOVE SELF-NOVELTY & VERIFIED CLAIMS
    # ---------------------------------------------------------
    $Content = $Content -replace "\\subsection\{ Original Contribution \(Verified\)\ }", ""
    $Content = $Content -replace "\\subsection\ { Original Contribution\ }", ""
    $Content = $Content -replace "\\subsubsection\ { Original Contribution\ }", ""
    $Content = $Content -replace "\(Verified\)", ""
    $Content = $Content -replace "Original Contribution", "Contribution"
    $Content = $Content -replace "gold standard", "standard"
    
    # ---------------------------------------------------------
    # TASK 7: ACM TOP-MATTER SANITY CHECK
    # ---------------------------------------------------------
    # Fix topmatter
    if ($Content -notmatch "printacmref=false") {
        $Content = $Content -replace "\\documentclass\[sigconf\]\{ acmart\ }", "\\documentclass[sigconf] { acmart }`n\\settopmatter { printacmref=false }"
    }

    # ---------------------------------------------------------
    # FINAL CLEANUP
    # ---------------------------------------------------------
    # Collapse multiple blank lines
    $Content = [System.Text.RegularExpressions.Regex]::Replace($Content, "\n\s*\n\s*\n", "`n`n")
    
    Set-Content -Path $FullPath -Value $Content -Encoding UTF8
}

Write-Host "Sanitization Complete." -ForegroundColor Green
