import os
import re
import subprocess
import sys
from pathlib import Path

PAPERS_DIR = Path(r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers")
PAPERS = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"]

def run_command(cmd, cwd):
    try:
        result = subprocess.run(
            cmd, cwd=cwd, shell=True, capture_output=True, text=True, timeout=120
        )
        return result
    except subprocess.TimeoutExpired:
        return subprocess.CompletedProcess(args=cmd, returncode=124, stdout="", stderr="Timeout")

def audit_paper(paper_name):
    paper_dir = PAPERS_DIR / paper_name
    tex_file = paper_dir / "main.tex"
    
    if not tex_file.exists():
        return {"status": "FAIL", "errors": ["main.tex not found"], "score": 0}
        
    content = tex_file.read_text(encoding="utf-8", errors="replace")
    original_content = content
    
    errors = []
    warnings = []
    fixes = []
    
    # 1. Template Compliance
    if r"\documentclass[sigconf]{acmart}" not in content:
         # Check if it has a different class
         if r"\documentclass" in content:
             warnings.append("Document class might not be sigconf acmart")
         else:
             errors.append("Missing documentclass")

    # 2. Fixes
    
    # Fix Code Blocks: \texttt{`}python ... \texttt{`} -> \begin{verbatim} ... \end{verbatim}
    # We do non-greedy match. Note: grep shows \texttt{`}python
    # Logic: mismatching formatting from markdown conversion
    content = re.sub(r"\\texttt\{`\}python", r"\\begin{verbatim}", content)
    content = re.sub(r"\\texttt\{`\}", r"\\end{verbatim}", content)

    # Specific A2 Fixes
    content = re.sub(r"contention \(\)", r"contention ($\\alpha$)", content)
    content = re.sub(r"crosstalk \(\)", r"crosstalk ($\\beta$)", content)
    content = re.sub(r"\( \> 0\.01\)", r"($\\beta > 0.01$)", content)
    content = re.sub(r"At  = 0\.08", r"At $\\beta = 0.08$", content)
    content = re.sub(r"eliminates crosstalk \(  0\.001\)", r"eliminates crosstalk ($\\beta \\approx 0.001$)", content)
    content = re.sub(r"0 in the Universal Scalability Law", r"$\\beta \\approx 0$ in the Universal Scalability Law", content)
    
    # Garbage math fixes
    content = content.replace(r"\$\beta\$", r"$\beta$")
    content = content.replace(r"$$$\beta \approx 0$$$$$", r"$\beta \approx 0$")
    content = re.sub(r"\\beta\s*\\approx\s*0", r"$\\beta \\approx 0$", content)
    
    # Fix Tone
    replacements = [
        (r"This contribution", "This work"),
        (r"groundbreaking", "significant"),
        (r"finalizes", "concludes"),
        (r"establishes", "demonstrates"),
        (r"\bthe a \b", "the "), # "the a empirical" -> "the empirical"
        (r"To our knowledge, this is the a work", "To our knowledge, this is the first work"),
    ]
    for pattern, repl in replacements:
        content = re.sub(pattern, repl, content, flags=re.IGNORECASE)

    # Fix Placeholders (remove sections that are just placeholders)
    # Pattern: \section{...} % TODO ... (to end of file or next section?)
    # Easier: remove specifically known bad lines seen in A2/ARCH
    content = re.sub(r"\\section\{[^\}]+\}\s*%\s*(TODO|Placeholder).*", "", content)
    
    # Fix Missing Figures
    # Logic: Find \includegraphics{X}, check if X exists. If not, replace with box.
    def replace_missing_fig(match):
        path = match.group(1).strip('"\'')
        full_path = paper_dir / path
        if not full_path.exists() and not (paper_dir / (path + ".png")).exists() and not (paper_dir / (path + ".pdf")).exists():
            fixes.append(f"Replaced missing figure {path}")
            return f"\\fbox{{MISSING FIGURE: {path}}}"
        return match.group(0)
    
    content = re.sub(r"\\includegraphics(?:\[[^\]]*\])?\{([^\}]+)\}", replace_missing_fig, content)
    
    # Fix "Missing $ inserted" caused by underscores/carets in text
    # This is risky, so we specific known offenders only.
    # us-east-1 is usually \texttt{us-east-1} which is fine, but us_east_1 is bad.
    # We won't auto-fix all underscores.

    # 3. Write back
    if content != original_content:
        tex_file.write_text(content, encoding="utf-8")
        fixes.append("Applied content fixes (Math/Code/Tone/Figures)")
        
    # 4. Compile ...

    # 7. Compile
    # pdflatex -interaction=nonstopmode -halt-on-error -output-directory=build main.tex
    build_dir = paper_dir / "build"
    build_dir.mkdir(exist_ok=True)
    
    # Clean build dir
    for p in build_dir.glob("*"):
        try: p.unlink()
        except: pass
        
    cmds = [
        f"pdflatex -interaction=nonstopmode -halt-on-error -output-directory=build main.tex",
        f"bibtex build/main",
        f"pdflatex -interaction=nonstopmode -halt-on-error -output-directory=build main.tex",
        f"pdflatex -interaction=nonstopmode -halt-on-error -output-directory=build main.tex"
    ]
    
    compile_status = "PASS"
    log = ""
    
    for i, cmd in enumerate(cmds):
        res = run_command(cmd, cwd=str(paper_dir))
        if res.returncode != 0 and "pdflatex" in cmd:
            compile_status = "FAIL"
            # Extract error from stdout
            err_match = re.search(r"!.*", res.stdout)
            err_msg = err_match.group(0) if err_match else "Unknown LaTeX Error"
            # Get last few lines
            log_tail = "\n".join(res.stdout.splitlines()[-20:])
            errors.append(f"Compile failed at step {i+1}: {err_msg}")
            log = log_tail
            break

    score = 100
    if compile_status == "FAIL": score -= 50
    score -= len(errors) * 10
    score = max(0, score)
    
    return {
        "status": compile_status,
        "errors": errors,
        "warnings": warnings,
        "fixes": fixes,
        "score": score
    }

print("PAPER | STATUS | ERRORS | FIXES")
print("-" * 60)
for p in PAPERS:
    res = audit_paper(p)
    err_count = len(res['errors'])
    fix_count = len(res['fixes'])
    print(f"{p:<5} | {res['status']:<6} | {err_count:<6} | {fix_count:<5}")
    if res['errors']:
        for e in res['errors']:
            print(f"  [Error] {e}")
    if res['fixes']:
        for f in res['fixes']:
            print(f"  [Fix] {f}")
