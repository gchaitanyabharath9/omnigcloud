#!/usr/bin/env python3
"""
ACM LaTeX Finalization Engine v2
Sanitizes existing LaTeX files and builds submission-ready PDFs.
"""

import os
import re
import subprocess
import sys
from pathlib import Path
from typing import Dict, List

# Base directory
BASE_DIR = Path(r"C:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers")
PAPERS = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"]

# Novelty/advocacy language patterns to neutralize
NOVELTY_PATTERNS = [
    (r'\bfirst\s+', 'a '),
    (r'\bthe\s+first\s+', 'a '),
    (r'\bestablishes\b', 'provides'),
    (r'\bdefines the laws\b', 'describes'),
    (r'\bbreakthrough\b', 'approach'),
    (r'\bgroundbreaking\b', 'novel'),
    (r'\bpioneer(?:ing)?\b', 'early'),
    (r'\bunprecedented\b', 'new'),
    (r'\brevolutionary\b', 'significant'),
    (r'\bparadigm-shifting\b', 'important'),
    (r'\bgame-changing\b', 'notable'),
    (r'\bfirst-ever\b', 'new'),
    (r'\bworld\'s first\b', 'new'),
]

# Metaphor-based architecture language to neutralize
METAPHOR_PATTERNS = [
    (r'\bLegislative Layer\b', 'Policy Definition Layer'),
    (r'\bJudicial Layer\b', 'Policy Evaluation Layer'),
    (r'\bExecutive Layer\b', 'Policy Enforcement Layer'),
    (r'\bBrain\b', 'Control'),
    (r'\bBody\b', 'Evaluation'),
    (r'\bPolice\b', 'Enforcement'),
]


def sanitize_latex(content: str) -> tuple[str, dict]:
    """Sanitize LaTeX content and return changes made."""
    changes = {
        "unicode_removed": 0,
        "novelty_removed": 0,
        "metaphors_removed": 0,
    }
    
    original_content = content
    
    # Remove Unicode issues - convert to ASCII
    try:
        ascii_content = content.encode('ascii', 'ignore').decode('ascii')
        if ascii_content != content:
            changes["unicode_removed"] = len(content) - len(ascii_content)
            content = ascii_content
    except:
        pass
    
    # Apply novelty pattern replacements
    for pattern, replacement in NOVELTY_PATTERNS:
        matches = len(re.findall(pattern, content, flags=re.IGNORECASE))
        if matches > 0:
            changes["novelty_removed"] += matches
            content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
    
    # Apply metaphor pattern replacements
    for pattern, replacement in METAPHOR_PATTERNS:
        matches = len(re.findall(pattern, content))
        if matches > 0:
            changes["metaphors_removed"] += matches
            content = re.sub(pattern, replacement, content)
    
    return content, changes


def build_pdf(paper_dir: Path) -> tuple[bool, str]:
    """Build PDF using pdflatex."""
    main_tex = paper_dir / "main.tex"
    build_dir = paper_dir / "build"
    
    if not main_tex.exists():
        return False, "main.tex not found"
    
    build_dir.mkdir(exist_ok=True)
    
    # Save current directory
    original_dir = os.getcwd()
    
    try:
        os.chdir(paper_dir)
        
        # Run pdflatex first time
        result = subprocess.run(
            ["pdflatex", "-interaction=nonstopmode", "-halt-on-error", 
             "-output-directory=build", "main.tex"],
            capture_output=True,
            text=True,
            timeout=60
        )
        
        if result.returncode != 0:
            # Extract error from log
            log_file = build_dir / "main.log"
            if log_file.exists():
                with open(log_file, 'r', encoding='utf-8', errors='ignore') as f:
                    log_content = f.read()
                    # Find first error
                    error_match = re.search(r'! (.+?)(?:\n|$)', log_content)
                    if error_match:
                        return False, f"LaTeX error: {error_match.group(1)}"
            return False, f"pdflatex failed with code {result.returncode}"
        
        # Run bibtex if refs.bib exists
        refs_bib = paper_dir / "refs.bib"
        if refs_bib.exists():
            os.chdir(build_dir)
            subprocess.run(
                ["bibtex", "main"],
                capture_output=True,
                text=True,
                timeout=30
            )
            os.chdir(paper_dir)
        
        # Run pdflatex two more times
        for _ in range(2):
            subprocess.run(
                ["pdflatex", "-interaction=nonstopmode", "-halt-on-error",
                 "-output-directory=build", "main.tex"],
                capture_output=True,
                text=True,
                timeout=60
            )
        
        # Check if PDF was created
        pdf_file = build_dir / "main.pdf"
        if pdf_file.exists():
            return True, "PDF built successfully"
        else:
            return False, "PDF file not created"
            
    except subprocess.TimeoutExpired:
        return False, "Build timeout"
    except Exception as e:
        return False, f"Build error: {str(e)}"
    finally:
        os.chdir(original_dir)


def process_paper(paper_name: str) -> Dict:
    """Process a single paper."""
    paper_dir = BASE_DIR / paper_name
    main_tex = paper_dir / "main.tex"
    
    result = {
        "paper": paper_name,
        "unicode_removed": 0,
        "advocacy_removed": 0,
        "metaphors_removed": 0,
        "sections_created": [],
        "compiled": False,
        "errors": []
    }
    
    # Check if main.tex exists
    if not main_tex.exists():
        result["errors"].append(f"main.tex not found at {main_tex}")
        return result
    
    # Read main.tex
    try:
        with open(main_tex, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        result["errors"].append(f"Failed to read main.tex: {e}")
        return result
    
    # Sanitize content
    sanitized_content, changes = sanitize_latex(content)
    
    result["unicode_removed"] = changes["unicode_removed"]
    result["advocacy_removed"] = changes["novelty_removed"]
    result["metaphors_removed"] = changes["metaphors_removed"]
    
    # Write sanitized content back
    if sanitized_content != content:
        try:
            with open(main_tex, 'w', encoding='utf-8') as f:
                f.write(sanitized_content)
        except Exception as e:
            result["errors"].append(f"Failed to write sanitized main.tex: {e}")
            return result
    
    # Build PDF
    success, message = build_pdf(paper_dir)
    result["compiled"] = success
    if not success:
        result["errors"].append(message)
    
    return result


def generate_report(results: List[Dict]) -> str:
    """Generate final ACM patch report."""
    report = "# FINAL ACM PATCH REPORT\n\n"
    report += f"Generated: {Path.cwd()}\n\n"
    
    report += "## Summary\n\n"
    
    total = len(results)
    compiled = sum(1 for r in results if r["compiled"])
    total_unicode = sum(r["unicode_removed"] for r in results)
    total_advocacy = sum(r["advocacy_removed"] for r in results)
    total_metaphors = sum(r["metaphors_removed"] for r in results)
    
    report += f"- **Total papers processed:** {total}\n"
    report += f"- **Successfully compiled:** {compiled}\n"
    report += f"- **Failed:** {total - compiled}\n"
    report += f"- **Total Unicode characters removed:** {total_unicode}\n"
    report += f"- **Total advocacy phrases neutralized:** {total_advocacy}\n"
    report += f"- **Total metaphors neutralized:** {total_metaphors}\n\n"
    
    report += "## Per-Paper Results\n\n"
    
    for result in results:
        status = "✓ PASS" if result["compiled"] else "✗ FAIL"
        report += f"### {result['paper']} - {status}\n\n"
        report += f"- **Unicode removed:** {result['unicode_removed']} characters\n"
        report += f"- **Advocacy language neutralized:** {result['advocacy_removed']} instances\n"
        report += f"- **Metaphors neutralized:** {result['metaphors_removed']} instances\n"
        report += f"- **Compiled successfully:** {'Yes' if result['compiled'] else 'No'}\n"
        
        if result['errors']:
            report += "\n**Errors:**\n"
            for error in result['errors']:
                report += f"- {error}\n"
        
        report += "\n"
    
    report += "## Files Generated\n\n"
    for result in results:
        if result["compiled"]:
            report += f"- `papers/{result['paper']}/build/main.pdf`\n"
    
    report += "\n## Next Steps\n\n"
    if compiled < total:
        report += "Some papers failed to compile. Review the errors above and:\n"
        report += "1. Check the LaTeX log files in `papers/[PAPER]/build/main.log`\n"
        report += "2. Fix any remaining LaTeX syntax errors\n"
        report += "3. Re-run this script\n"
    else:
        report += "All papers compiled successfully! PDFs are ready for review.\n"
    
    return report


def main():
    """Main execution."""
    print("=" * 70)
    print("ACM LaTeX Finalization Engine v2")
    print("=" * 70)
    print()
    
    results = []
    
    for paper in PAPERS:
        print(f"Processing {paper}...", end=" ")
        result = process_paper(paper)
        results.append(result)
        
        if result["compiled"]:
            print(f"✓ SUCCESS (Unicode: {result['unicode_removed']}, " +
                  f"Advocacy: {result['advocacy_removed']}, " +
                  f"Metaphors: {result['metaphors_removed']})")
        else:
            print(f"✗ FAILED")
            if result["errors"]:
                for error in result["errors"]:
                    print(f"  → {error}")
    
    print()
    print("=" * 70)
    
    # Generate report
    report = generate_report(results)
    report_file = BASE_DIR.parent / "FINAL_ACM_PATCH_REPORT.md"
    
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write(report)
    
    print(f"Report generated: {report_file}")
    print()
    
    # Summary
    compiled = sum(1 for r in results if r["compiled"])
    print(f"Results: {compiled}/{len(results)} papers compiled successfully")
    
    if compiled == len(results):
        print("✓ All papers ready for submission!")
    else:
        print(f"✗ {len(results) - compiled} papers need attention")
    
    return 0 if compiled == len(results) else 1


if __name__ == "__main__":
    sys.exit(main())
