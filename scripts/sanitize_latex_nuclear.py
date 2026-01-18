import os
import re

TARGET_FILES = [
    r"submission/acm/A1/main.tex",
    r"submission/acm/A2/main.tex",
    r"submission/acm/A3/main.tex",
    r"submission/acm/A4/main.tex",
    r"submission/acm/A5/main.tex",
    r"submission/acm/A6/main.tex",
    r"submission/acm/AECP/main.tex",
    r"submission/acm/ARCH/main.tex"
]

CANONICAL_CCS = r"""\begin{CCSXML}
<ccs2012>
 <concept>
  <concept_id>10003033.10003058</concept_id>
  <concept_desc>Computer systems organization~Distributed architectures</concept_desc>
  <concept_significance>500</concept_significance>
 </concept>
</ccs2012>
\end{CCSXML}

\ccsdesc[500]{Computer systems organization~Distributed architectures}"""

UNICODE_MAP = {
    0x2019: "'",
    0x2018: "`",
    0x201C: "``",
    0x201D: "''",
    0x2013: "--",
    0x2014: "---",
    0x2026: "...",
    0x00D7: r"$\times$",
    0x2192: r"$\rightarrow$",
    0x03B2: r"$\beta$",
    0x2264: r"$\le$",
    0x2265: r"$\ge$",
    0x2212: "-",
    0x2022: "-",
    0x00A0: " "
}

REGEX_REPLACEMENTS = [
    # Markdown artifacts
    (r"!\[.*?\]", ""),
    
    # CCS Cleanup
    (r"(?s)\\begin\{CCSXML\}.*?\\end\{CCSXML\}", ""),
    (r"(?s)\\ccsdesc\[.*?\]\{.*?\}", ""),
    (r"CCS Concepts.*?Distributed architectures", ""),
    (r"CCS Concepts", ""),
    
    # Insert Canonical CCS (will handle below logically)
    
    # Series Language Neutralization
    (r"A1[-–]A6 series", "architectural series"),
    (r"Relationship to A1[-–]A6", "Relationship to Prior Work"),
    (r"AECP executes A1", "The Control Plane executes the architecture"),
    (r"concludes the series", "concludes the work"),
    (r"finalizes the series", "finalizes the work"),
    (r"foundational paper", "foundational work"),
    (r"prior work series", "prior work"),
    (r"A[1-6] paper", "framework"),
    
    # Aggressive Paper ID Neutralization
    (r"\bA1\b", "The Reference Architecture"),
    (r"\bA2\b", "The Throughput Layer"),
    (r"\bA3\b", "The Observability Layer"),
    (r"\bA4\b", "The Governance Layer"),
    (r"\bA5\b", "The Modernization Pattern"),
    (r"\bA6\b", "The Adaptive Control Layer"),
    
    # Novelty/Claims
    (r"\\subsection\{Original Contribution \(Verified\)\}", ""),
    (r"\\subsection\{Original Contribution\}", ""),
    (r"Original Contribution", "Contribution"),
    (r"\(Verified\)", ""),
    (r"gold standard", "standard"),
    
    # Abstract cleanup (trailing commas/periods if left over)
    (r",\s*AECP", "AECP"),
    
    # Cleanup multiple newlines
    (r"\n\s*\n\s*\n", "\n\n")
]

def sanitize_file(file_path):
    print(f"Sanitizing {file_path}...")
    if not os.path.exists(file_path):
        print(f"Skipping {file_path} (Not Found)")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Task 1: Unicode Nuclear Cleanse
    # Map known chars
    clean_content = ""
    for char in content:
        code = ord(char)
        if code in UNICODE_MAP:
            clean_content += UNICODE_MAP[code]
        elif code > 127:
            # Nuclear option: skip unknown non-ASCII
            pass
        else:
            clean_content += char
    content = clean_content

    # Task 2-5: Regex Replacements
    for pattern, replacement in REGEX_REPLACEMENTS:
        content = re.sub(pattern, replacement, content)

    # Task 3 (Insert CCS)
    if r"\end{abstract}" in content and CANONICAL_CCS not in content:
        content = content.replace(r"\end{abstract}", "\\end{abstract}\n\n" + CANONICAL_CCS)
    
    # Task 7: Top Matter
    if "printacmref=false" not in content:
        content = content.replace(r"\documentclass[sigconf]{acmart}", r"\documentclass[sigconf]{acmart}" + "\n" + r"\settopmatter{printacmref=false}")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    base_dir = os.getcwd()
    for rel_path in TARGET_FILES:
        full_path = os.path.join(base_dir, rel_path)
        sanitize_file(full_path)
    print("Sanitization Complete.")

if __name__ == "__main__":
    main()
