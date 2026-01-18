#!/usr/bin/env python3
"""
Build All Papers - Test Script
"""

import os
import subprocess
from pathlib import Path

BASE_DIR = Path(r"C:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers")
PAPERS = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"]

def build_paper(paper_name):
    """Build a single paper."""
    paper_dir = BASE_DIR / paper_name
    main_tex = paper_dir / "main.tex"
    build_dir = paper_dir / "build"
    
    if not main_tex.exists():
        return False, "main.tex not found"
    
    build_dir.mkdir(exist_ok=True)
    os.chdir(paper_dir)
    
    try:
        # Run pdflatex first time
        result = subprocess.run(
            ["pdflatex", "-interaction=nonstopmode", "-output-directory=build", "main.tex"],
            capture_output=True,
            text=True,
            timeout=60
        )
        
        if result.returncode != 0:
            # Get error from log
            log_file = build_dir / "main.log"
            if log_file.exists():
                with open(log_file, 'r', encoding='utf-8', errors='ignore') as f:
                    log = f.read()
                    import re
                    error = re.search(r'! (.+?)(?:\n|$)', log)
                    if error:
                        return False, error.group(1)[:100]
            return False, f"pdflatex failed (code {result.returncode})"
        
        # Run bibtex if bib exists
        if list(paper_dir.glob('*.bib')):
            os.chdir(build_dir)
            subprocess.run(["bibtex", "main"], capture_output=True, timeout=30)
            os.chdir(paper_dir)
        
        # Run pdflatex two more times
        for _ in range(2):
            subprocess.run(
                ["pdflatex", "-interaction=nonstopmode", "-output-directory=build", "main.tex"],
                capture_output=True,
                timeout=60
            )
        
        # Check PDF
        pdf = build_dir / "main.pdf"
        if pdf.exists():
            size_kb = pdf.stat().st_size // 1024
            return True, f"PDF created ({size_kb} KB)"
        else:
            return False, "PDF not created"
            
    except Exception as e:
        return False, str(e)[:100]

def main():
    print("=" * 70)
    print("Building All Papers")
    print("=" * 70)
    print()
    
    results = []
    
    for paper in PAPERS:
        print(f"{paper}...", end=" ", flush=True)
        success, msg = build_paper(paper)
        results.append((paper, success, msg))
        
        if success:
            print(f"✓ {msg}")
        else:
            print(f"✗ {msg}")
    
    print()
    print("=" * 70)
    print("SUMMARY")
    print("=" * 70)
    
    passed = sum(1 for _, s, _ in results if s)
    print(f"Passed: {passed} / {len(results)}")
    print(f"Failed: {len(results) - passed} / {len(results)}")
    
    # Generate report
    report = "# FINAL ACM BUILD REPORT\n\n"
    report += f"**Generated:** 2026-01-17\n\n"
    report += "## Build Results\n\n"
    report += "| Paper | Status | Details |\n"
    report += "|-------|--------|----------|\n"
    
    for paper, success, msg in results:
        status = "✓ PASS" if success else "✗ FAIL"
        report += f"| {paper} | {status} | {msg} |\n"
    
    report += f"\n## Summary\n\n"
    report += f"- **Passed:** {passed} / {len(results)}\n"
    report += f"- **Failed:** {len(results) - passed} / {len(results)}\n"
    
    if passed == len(results):
        report += "\n✓ **ALL PAPERS COMPILED SUCCESSFULLY**\n"
    
    report_file = BASE_DIR.parent / "FINAL_ACM_BUILD_REPORT.md"
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write(report)
    
    print(f"\nReport: {report_file}")
    
    return 0 if passed == len(results) else 1

if __name__ == "__main__":
    import sys
    sys.exit(main())
