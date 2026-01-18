#!/usr/bin/env python3
"""
Direct LaTeX Error Fixer - Targets specific known issues
"""

import re
from pathlib import Path

BASE_DIR = Path(r"C:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers")
PAPERS = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"]

def fix_escaped_dollars(content):
    """Fix \\$ back to $ for math mode."""
    # Fix display math: \\$\\$ → $$
    content = content.replace('\\$\\$', '$$')
    # Fix inline math: \\$ → $ (but be careful)
    # Only fix if it looks like math context
    content = re.sub(r'\\item\s+\\\\?\$', r'\\item $', content)
    content = re.sub(r'\\textbf\{[^}]*\\\\?\$', lambda m: m.group(0).replace('\\$', '$'), content)
    return content

def fix_currency_in_textbf(content):
    """Fix $ in \textbf{} when it's currency, not math."""
    # Pattern: \textbf{...$digits...} where $ is currency
    def fix_currency(match):
        text = match.group(0)
        # If there's a $ followed by digits, it's currency - escape it
        text = re.sub(r'\$(\d)', r'\\$\1', text)
        return text
    
    content = re.sub(r'\\textbf\{[^}]*\$[^}]*\}', fix_currency, content)
    content = re.sub(r'\\textit\{[^}]*\$[^}]*\}', fix_currency, content)
    return content

def fix_math_mode_dollars(content):
    """Fix math mode: $...\$ should be $...$"""
    # Pattern: \$...stuff...\$ → $...stuff...$
    # This fixes cases like \$\alpha > 0\$ → $\alpha > 0$
    content = re.sub(r'\\\\?\$([A-Za-z0-9\\{}\(\)\s<>=+\-*/,\.]+)\\\\?\$', r'$\1$', content)
    return content

def fix_escaped_ampersands_in_text(content):
    """Fix \\& back to & in table environments only."""
    lines = content.split('\n')
    fixed = []
    in_table = False
    
    for line in lines:
        if '\\begin{tabular' in line or '\\begin{table' in line:
            in_table = True
        elif '\\end{tabular' in line or '\\end{table' in line:
            in_table = False
            
        # In tables, & should NOT be escaped
        if in_table and '\\&' in line:
            line = line.replace('\\&', '&')
        
        fixed.append(line)
    
    return '\n'.join(fixed)

def fix_paper(paper_name):
    """Fix a single paper."""
    paper_dir = BASE_DIR / paper_name
    main_tex = paper_dir / "main.tex"
    
    if not main_tex.exists():
        print(f"{paper_name}: main.tex not found")
        return False
    
    print(f"Fixing {paper_name}...", end=" ")
    
    with open(main_tex, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    original = content
    
    # Apply fixes
    content = fix_escaped_dollars(content)
    content = fix_currency_in_textbf(content)
    content = fix_math_mode_dollars(content)
    content = fix_escaped_ampersands_in_text(content)
    
    if content != original:
        with open(main_tex, 'w', encoding='utf-8') as f:
            f.write(content)
        print("✓ Fixed")
        return True
    else:
        print("No changes needed")
        return False

def main():
    print("Direct LaTeX Error Fixer")
    print("=" * 50)
    
    for paper in PAPERS:
        fix_paper(paper)
    
    print("\nDone. Run build script to test.")

if __name__ == "__main__":
    main()
