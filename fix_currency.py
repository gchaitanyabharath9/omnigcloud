#!/usr/bin/env python3
"""
Comprehensive Currency Dollar Fixer
Finds and escapes all currency $ signs ($ followed by digits)
"""

import re
from pathlib import Path

BASE_DIR = Path(r"C:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers")
PAPERS = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"]

def fix_currency_dollars(content):
    """Fix all currency dollars: $digits → \$digits"""
    # Match $ followed by digit, not already escaped
    # Negative lookbehind for backslash
    content = re.sub(r'(?<!\\)\$(\d)', r'\\$\1', content)
    return content

def fix_paper(paper_name):
    """Fix a single paper."""
    paper_dir = BASE_DIR / paper_name
    main_tex = paper_dir / "main.tex"
    
    if not main_tex.exists():
        print(f"{paper_name}: main.tex not found")
        return False
    
    print(f"Fixing {paper_name}...", end=" ", flush=True)
    
    with open(main_tex, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    original = content
    content = fix_currency_dollars(content)
    
    if content != original:
        with open(main_tex, 'w', encoding='utf-8') as f:
            f.write(content)
        
        # Count fixes
        fixes = len(re.findall(r'\\$\d', content)) - len(re.findall(r'\\$\d', original))
        print(f"✓ Fixed {fixes} currency dollars")
        return True
    else:
        print("No changes needed")
        return False

def main():
    print("Comprehensive Currency Dollar Fixer")
    print("=" * 50)
    
    for paper in PAPERS:
        fix_paper(paper)
    
    print("\nDone.")

if __name__ == "__main__":
    main()
