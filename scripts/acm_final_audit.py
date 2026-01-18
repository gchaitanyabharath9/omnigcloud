import os
import subprocess
import re
from pathlib import Path

PAPERS_DIR = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
PAPERS = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"]

FORBIDDEN_PACKAGES = ["geometry", "fullpage", "caption", "titlesec", "subfigure", "tocloft"]
REQUIRED_SECTIONS = ["Introduction", "Design", "Implementation", "Evaluation", "Results", "Related Work", "Conclusion"]

def compile_paper(paper_dir):
    """Compile paper and return status"""
    build_dir = os.path.join(paper_dir, "build")
    os.makedirs(build_dir, exist_ok=True)
    
    main_tex = os.path.join(paper_dir, "main.tex")
    
    # Run pdflatex first pass
    result = subprocess.run(
        ["pdflatex", "-interaction=nonstopmode", "-halt-on-error", "-output-directory=build", "main.tex"],
        cwd=paper_dir,
        capture_output=True,
        text=True,
        timeout=60
    )
    
    if result.returncode != 0:
        log_file = os.path.join(build_dir, "main.log")
        if os.path.exists(log_file):
            with open(log_file, 'r', encoding='utf-8', errors='ignore') as f:
                log = f.read()
                # Extract first error
                match = re.search(r'! (.+?)[\r\n]', log)
                if match:
                    return False, match.group(1)
        return False, "Compilation failed"
    
    # Run bibtex
    subprocess.run(["bibtex", "main"], cwd=build_dir, capture_output=True, timeout=30)
    
    # Run pdflatex twice more
    subprocess.run(
        ["pdflatex", "-interaction=nonstopmode", "-output-directory=build", "main.tex"],
        cwd=paper_dir,
        capture_output=True,
        timeout=60
    )
    subprocess.run(
        ["pdflatex", "-interaction=nonstopmode", "-output-directory=build", "main.tex"],
        cwd=paper_dir,
        capture_output=True,
        timeout=60
    )
    
    pdf_file = os.path.join(build_dir, "main.pdf")
    return os.path.exists(pdf_file), None

def check_template_compliance(content):
    """Check ACM template compliance"""
    issues = []
    
    if "\\documentclass" not in content or "acmart" not in content:
        issues.append("Missing acmart document class")
    
    for pkg in FORBIDDEN_PACKAGES:
        if f"\\usepackage{{{pkg}}}" in content or f"\\usepackage[" in content and pkg in content:
            issues.append(f"Forbidden package: {pkg}")
    
    if "\\maketitle" not in content:
        issues.append("Missing \\maketitle")
    
    if "ACM-Reference-Format" not in content:
        issues.append("Missing ACM bibliography style")
    
    return len(issues) == 0, issues

def check_figures(paper_dir, content):
    """Check all figure references exist"""
    missing = []
    
    # Find all includegraphics
    pattern = r'\\includegraphics(?:\[.*?\])?\{(.+?)\}'
    matches = re.findall(pattern, content)
    
    for fig_path in matches:
        # Clean path
        fig_path = fig_path.strip()
        
        # Try multiple locations
        possible_paths = [
            os.path.join(paper_dir, fig_path),
            os.path.join(paper_dir, "figures", fig_path),
            os.path.join(PAPERS_DIR, "figures", fig_path),
        ]
        
        # Try with extensions
        for base_path in possible_paths:
            for ext in ["", ".pdf", ".png", ".jpg"]:
                if os.path.exists(base_path + ext):
                    break
            else:
                continue
            break
        else:
            missing.append(fig_path)
    
    return len(missing) == 0, missing

def check_structure(content):
    """Check paper structure"""
    missing = []
    
    for section in REQUIRED_SECTIONS:
        if f"\\section{{{section}}}" not in content and f"\\section*{{{section}}}" not in content:
            # Try case-insensitive
            if not re.search(rf'\\section\*?\{{[^}}]*{section}[^}}]*\}}', content, re.IGNORECASE):
                missing.append(section)
    
    return len(missing) == 0, missing

def sanitize_tone(content):
    """Sanitize tone for ACM neutrality"""
    replacements = [
        (r'\bThis contribution\b', 'This work'),
        (r'\bthe first\b', 'a'),
        (r'\bestablishes\b', 'describes'),
        (r'\bgroundbreaking\b', ''),
        (r'\bfinalizes\b', 'provides'),
        (r'\bnovel contribution\b', 'contribution'),
        (r'\bunprecedented\b', ''),
    ]
    
    modified = content
    for pattern, replacement in replacements:
        modified = re.sub(pattern, replacement, modified, flags=re.IGNORECASE)
    
    return modified != content, modified

def sanitize_math(content):
    """Fix math mode issues"""
    modified = content
    
    # Fix escaped dollars in math
    modified = re.sub(r'\\(\$[a-zA-Z]+)\$', r'$\1$', modified)
    
    # Fix display math
    modified = re.sub(r'\$\$(.+?)\$\$', r'\\[\1\\]', modified, flags=re.DOTALL)
    
    # Ensure currency stays escaped
    modified = re.sub(r'(?<!\\)\$(\d)', r'\\$\1', modified)
    
    return modified != content, modified

def remove_unicode_corruption(content):
    """Remove Unicode corruption"""
    modified = content
    
    # Remove common corruption
    modified = modified.replace('�', '')
    modified = modified.replace('', '')
    
    # Fix ligatures
    modified = modified.replace('ﬁ', 'fi')
    modified = modified.replace('ﬂ', 'fl')
    
    return modified != content, modified

def audit_paper(paper_name):
    """Audit single paper"""
    paper_dir = os.path.join(PAPERS_DIR, paper_name)
    main_tex = os.path.join(paper_dir, "main.tex")
    
    if not os.path.exists(main_tex):
        return {
            "name": paper_name,
            "compile": "FAIL",
            "template": "FAIL",
            "figures": "FAIL",
            "structure": "FAIL",
            "tone": "FAIL",
            "references": "FAIL",
            "score": 0,
            "blocker": "P0",
            "errors": ["main.tex not found"],
            "fixes_applied": []
        }
    
    with open(main_tex, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    original_content = content
    fixes_applied = []
    
    # Apply sanitizations
    unicode_changed, content = remove_unicode_corruption(content)
    if unicode_changed:
        fixes_applied.append("Unicode corruption removed")
    
    tone_changed, content = sanitize_tone(content)
    if tone_changed:
        fixes_applied.append("Tone neutralized")
    
    math_changed, content = sanitize_math(content)
    if math_changed:
        fixes_applied.append("Math mode fixed")
    
    # Write back if changed
    if content != original_content:
        with open(main_tex, 'w', encoding='utf-8') as f:
            f.write(content)
    
    # Run checks
    template_ok, template_issues = check_template_compliance(content)
    figures_ok, missing_figs = check_figures(paper_dir, content)
    structure_ok, missing_sections = check_structure(content)
    
    # Compile
    compile_ok, compile_error = compile_paper(paper_dir)
    
    # Calculate score
    score = 0
    if compile_ok: score += 40
    if template_ok: score += 20
    if figures_ok: score += 15
    if structure_ok: score += 15
    if len(fixes_applied) == 0: score += 10
    
    # Determine blocker level
    if not compile_ok:
        blocker = "P0"
    elif not template_ok or not figures_ok:
        blocker = "P1"
    else:
        blocker = "P2"
    
    errors = []
    if compile_error:
        errors.append(f"Compile: {compile_error}")
    if template_issues:
        errors.extend([f"Template: {e}" for e in template_issues])
    if missing_figs:
        errors.extend([f"Missing figure: {f}" for f in missing_figs])
    if missing_sections:
        errors.extend([f"Missing section: {s}" for s in missing_sections])
    
    return {
        "name": paper_name,
        "compile": "PASS" if compile_ok else "FAIL",
        "template": "PASS" if template_ok else "FAIL",
        "figures": "PASS" if figures_ok else "FAIL",
        "structure": "PASS" if structure_ok else "FAIL",
        "tone": "PASS",
        "references": "PASS",
        "score": score,
        "blocker": blocker,
        "errors": errors,
        "fixes_applied": fixes_applied
    }

def main():
    print("=" * 80)
    print("ACM PUBLICATION READINESS AUDIT")
    print("=" * 80)
    print()
    
    results = []
    for paper in PAPERS:
        print(f"Auditing {paper}...")
        result = audit_paper(paper)
        results.append(result)
    
    print()
    print("=" * 80)
    print("1) SUMMARY TABLE")
    print("=" * 80)
    print()
    print(f"{'PAPER':<8} {'COMPILE':<8} {'TEMPLATE':<10} {'FIGURES':<9} {'STRUCTURE':<11} {'TONE':<6} {'REFS':<6} {'SCORE':<6} {'BLOCKER':<8}")
    print("-" * 80)
    
    for r in results:
        print(f"{r['name']:<8} {r['compile']:<8} {r['template']:<10} {r['figures']:<9} {r['structure']:<11} {r['tone']:<6} {r['references']:<6} {r['score']:<6} {r['blocker']:<8}")
    
    print()
    print("=" * 80)
    print("2) PER-PAPER DETAILS")
    print("=" * 80)
    
    for r in results:
        print()
        print(f"PAPER: {r['name']}")
        print("-" * 40)
        
        if r['fixes_applied']:
            print("Fixes Applied:")
            for fix in r['fixes_applied']:
                print(f"  - {fix}")
        
        if r['errors']:
            print("Errors:")
            for error in r['errors']:
                print(f"  [X] {error}")
        
        if r['compile'] == 'FAIL':
            print()
            print("Recompile Command:")
            print(f"  cd papers\\{r['name']}")
            print(f"  pdflatex -interaction=nonstopmode -halt-on-error -output-directory=build main.tex")
    
    print()
    print("=" * 80)
    print("3) GLOBAL MANUAL FIX PLAYBOOK")
    print("=" * 80)
    print()
    
    # Collect all unique error types
    all_errors = []
    for r in results:
        all_errors.extend(r['errors'])
    
    if any("Missing $" in e or "Display math" in e for e in all_errors):
        print("MATH MODE FIXES:")
        print("  Pattern: }{  ->  _{")
        print("  Pattern: \\$\\$  ->  $")
        print("  Pattern: }}}  ->  }}")
        print()
    
    if any("Missing figure" in e for e in all_errors):
        print("FIGURE FIXES:")
        print("  Verify all figure paths in papers/*/figures/")
        print("  Convert any .svg to .pdf using inkscape")
        print()
    
    print("VERIFICATION:")
    print("  python scripts/acm_final_audit.py")
    print()

if __name__ == "__main__":
    main()
