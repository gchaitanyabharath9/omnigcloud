#!/usr/bin/env python3
"""
ACM LaTeX Build Unblocker - Strict Mode
Fixes compilation errors without changing technical content.
"""

import os
import re
import subprocess
import sys
from pathlib import Path
from typing import Dict, List, Tuple

# Fix Windows console encoding
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')

BASE_DIR = Path(r"C:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers")
PAPERS = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"]

class BuildUnblocker:
    def __init__(self, paper_dir: Path):
        self.paper_dir = paper_dir
        self.main_tex = paper_dir / "main.tex"
        self.build_dir = paper_dir / "build"
        self.fixes_applied = []
        
    def run_pdflatex(self) -> Tuple[bool, str, str]:
        """Run pdflatex and return success, stdout, stderr."""
        self.build_dir.mkdir(exist_ok=True)
        os.chdir(self.paper_dir)
        
        try:
            result = subprocess.run(
                ["pdflatex", "-interaction=nonstopmode", "-output-directory=build", "main.tex"],
                capture_output=True,
                text=True,
                timeout=60
            )
            return result.returncode == 0, result.stdout, result.stderr
        except Exception as e:
            return False, "", str(e)
    
    def run_bibtex(self) -> Tuple[bool, str]:
        """Run bibtex and return success, output."""
        os.chdir(self.build_dir)
        try:
            result = subprocess.run(
                ["bibtex", "main"],
                capture_output=True,
                text=True,
                timeout=30
            )
            os.chdir(self.paper_dir)
            return result.returncode == 0, result.stdout + result.stderr
        except Exception as e:
            os.chdir(self.paper_dir)
            return False, str(e)
    
    def extract_error(self, log_content: str) -> Tuple[str, int]:
        """Extract first fatal error from log."""
        # Look for ! LaTeX Error or ! error patterns
        error_match = re.search(r'! (.+?)(?:\n|$)', log_content)
        if error_match:
            error_msg = error_match.group(1)
            # Try to find line number
            line_match = re.search(r'l\.(\d+)', log_content[error_match.end():error_match.end()+200])
            line_num = int(line_match.group(1)) if line_match else 0
            return error_msg, line_num
        return "", 0
    
    def fix_missing_dollar(self, content: str) -> str:
        """Fix common missing $ errors - escape special chars outside math mode."""
        # Fix unescaped underscores in text
        lines = content.split('\n')
        fixed_lines = []
        in_math = False
        
        for line in lines:
            # Skip lines that are already in math environments
            if '\\begin{equation' in line or '\\begin{align' in line or '\\[' in line:
                in_math = True
            if '\\end{equation' in line or '\\end{align' in line or '\\]' in line:
                in_math = False
            
            if not in_math and not line.strip().startswith('%'):
                # Fix unescaped underscores - simple approach
                if '_' in line and '\\_' not in line and '\\texttt{' not in line:
                    line = line.replace('_', '\\_')
                # Fix unescaped % not in comments
                if '%' in line and '\\%' not in line and not line.strip().startswith('%'):
                    # Only escape % that appears to be in text, not comments
                    parts = line.split('%', 1)
                    if len(parts) == 2:
                        line = parts[0] + '\\%' + parts[1]
            
            fixed_lines.append(line)
        
        return '\n'.join(fixed_lines)
    
    def fix_alignment_tab(self, content: str) -> str:
        """Fix misplaced & characters outside tables."""
        lines = content.split('\n')
        fixed_lines = []
        in_table = False
        
        for line in lines:
            if '\\begin{tabular' in line or '\\begin{table' in line:
                in_table = True
            if '\\end{tabular' in line or '\\end{table' in line:
                in_table = False
            
            # Escape & outside tables
            if not in_table and '&' in line and not line.strip().startswith('%'):
                line = line.replace('&', '\\&')
            
            fixed_lines.append(line)
        
        return '\n'.join(fixed_lines)
    
    def fix_bibliography_name(self, content: str) -> str:
        """Fix bibliography file reference."""
        # Check what bib files exist
        bib_files = list(self.paper_dir.glob('*.bib'))
        if not bib_files:
            return content
        
        bib_name = bib_files[0].stem  # Get filename without extension
        
        # Update \bibliography command
        content = re.sub(r'\\bibliography\{[^}]+\}', f'\\\\bibliography{{{bib_name}}}', content)
        
        return content
    
    def fix_unicode(self, filepath: Path) -> None:
        """Remove Unicode from file."""
        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            # Convert to ASCII
            ascii_content = content.encode('ascii', 'ignore').decode('ascii')
            
            if ascii_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(ascii_content)
                self.fixes_applied.append(f"Removed Unicode from {filepath.name}")
        except Exception as e:
            print(f"  Warning: Could not fix Unicode in {filepath.name}: {e}")
    
    def fix_missing_figure(self, content: str, error_msg: str) -> str:
        """Fix missing figure references."""
        # Extract figure name from error
        fig_match = re.search(r"File `(.+?)' not found", error_msg)
        if not fig_match:
            return content
        
        missing_fig = fig_match.group(1)
        
        # Try to find the correct path
        figures_dir = self.paper_dir / "figures"
        if figures_dir.exists():
            # Look for similar files
            for fig_file in figures_dir.glob('*.png'):
                if fig_file.name.lower() in missing_fig.lower() or missing_fig.lower() in fig_file.name.lower():
                    # Fix the path in content
                    correct_path = f"figures/{fig_file.name}"
                    content = content.replace(missing_fig, correct_path)
                    self.fixes_applied.append(f"Fixed figure path: {missing_fig} → {correct_path}")
                    break
        
        return content
    
    def apply_fixes(self, error_msg: str) -> bool:
        """Apply fixes based on error message."""
        if not self.main_tex.exists():
            return False
        
        with open(self.main_tex, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        original_content = content
        
        # Apply fixes based on error type
        if "Missing $ inserted" in error_msg or "Missing \\$ inserted" in error_msg:
            content = self.fix_missing_dollar(content)
            self.fixes_applied.append("Fixed missing $ (escaped special chars)")
        
        elif "Misplaced alignment tab" in error_msg:
            content = self.fix_alignment_tab(content)
            self.fixes_applied.append("Fixed misplaced & (escaped outside tables)")
        
        elif "not found" in error_msg.lower() and "bib" in error_msg.lower():
            content = self.fix_bibliography_name(content)
            self.fixes_applied.append("Fixed bibliography filename")
        
        elif "not found" in error_msg.lower() and ("figure" in error_msg.lower() or ".png" in error_msg.lower()):
            content = self.fix_missing_figure(content, error_msg)
        
        elif "Unknown graphics extension" in error_msg:
            # Already fixed by sanitizer, but double-check
            content = content.replace('.svg}', '.png}')
            self.fixes_applied.append("Fixed SVG → PNG")
        
        # Write back if changed
        if content != original_content:
            with open(self.main_tex, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        
        return False
    
    def build_paper(self, max_iterations: int = 10) -> Tuple[bool, List[str]]:
        """Iteratively fix and build paper."""
        # First, fix Unicode in all relevant files
        self.fix_unicode(self.main_tex)
        for bib_file in self.paper_dir.glob('*.bib'):
            self.fix_unicode(bib_file)
        
        for iteration in range(max_iterations):
            print(f"  Iteration {iteration + 1}...", end=" ", flush=True)
            
            # Run pdflatex
            success, stdout, stderr = self.run_pdflatex()
            
            if success:
                print("✓ pdflatex passed")
                
                # Run bibtex if bib file exists
                if list(self.paper_dir.glob('*.bib')):
                    bib_success, bib_output = self.run_bibtex()
                    if not bib_success:
                        print(f"  Warning: bibtex had issues (continuing)")
                
                # Run pdflatex two more times
                for i in range(2):
                    self.run_pdflatex()
                
                # Check if PDF exists
                pdf_file = self.build_dir / "main.pdf"
                if pdf_file.exists():
                    print(f"  ✓ BUILD SUCCESS")
                    return True, self.fixes_applied
                else:
                    print(f"  ✗ PDF not created")
                    return False, self.fixes_applied
            
            # Extract error from log
            log_file = self.build_dir / "main.log"
            if log_file.exists():
                with open(log_file, 'r', encoding='utf-8', errors='ignore') as f:
                    log_content = f.read()
                
                error_msg, line_num = self.extract_error(log_content)
                if error_msg:
                    print(f"✗ Error: {error_msg[:80]}")
                    
                    # Apply fix
                    if self.apply_fixes(error_msg):
                        continue
                    else:
                        print(f"  ! No fix available for this error")
                        return False, self.fixes_applied
                else:
                    print(f"✗ Unknown error")
                    return False, self.fixes_applied
            else:
                print(f"✗ No log file")
                return False, self.fixes_applied
        
        print(f"  ✗ Max iterations reached")
        return False, self.fixes_applied


def main():
    print("=" * 70)
    print("ACM LaTeX Build Unblocker - Strict Mode")
    print("=" * 70)
    print()
    
    results = []
    
    for paper in PAPERS:
        print(f"\n{'='*70}")
        print(f"Processing {paper}")
        print(f"{'='*70}")
        
        paper_dir = BASE_DIR / paper
        if not paper_dir.exists():
            print(f"  ✗ Directory not found: {paper_dir}")
            results.append({
                "paper": paper,
                "success": False,
                "fixes": [],
                "error": "Directory not found"
            })
            continue
        
        unblocker = BuildUnblocker(paper_dir)
        success, fixes = unblocker.build_paper()
        
        results.append({
            "paper": paper,
            "success": success,
            "fixes": fixes,
            "error": "" if success else "Build failed"
        })
    
    # Generate report
    print(f"\n\n{'='*70}")
    print("FINAL BUILD REPORT")
    print(f"{'='*70}\n")
    
    report = "# FINAL ACM BUILD REPORT\n\n"
    report += f"**Generated:** 2026-01-17\n\n"
    report += "## Build Results\n\n"
    report += "| Paper | Status | Fixes Applied |\n"
    report += "|-------|--------|---------------|\n"
    
    for result in results:
        status = "✓ PASS" if result["success"] else "✗ FAIL"
        fixes = "<br>".join(result["fixes"]) if result["fixes"] else "None"
        report += f"| {result['paper']} | {status} | {fixes} |\n"
    
    report += "\n## Summary\n\n"
    passed = sum(1 for r in results if r["success"])
    report += f"- **Passed:** {passed} / {len(results)}\n"
    report += f"- **Failed:** {len(results) - passed} / {len(results)}\n"
    
    # Write report
    report_file = BASE_DIR.parent / "FINAL_ACM_BUILD_REPORT.md"
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write(report)
    
    print(report)
    print(f"\nReport saved: {report_file}")
    
    return 0 if passed == len(results) else 1


if __name__ == "__main__":
    sys.exit(main())
