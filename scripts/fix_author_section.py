import os
import re

PAPERS_DIR = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
PAPERS = ["A1", "A2", "A3", "A4", "A5", "A6", "ARCH"]

def fix_author_section(content):
    """Fix author/affiliation section braces"""
    
    # Pattern: Find \affiliation{ ... } blocks
    # The issue is line 12 in A3: \affiliation{...\email{...}
    # Missing closing } for \affiliation
    
    # Strategy: Find \affiliation{ and ensure it closes before next \author or \begin{abstract}
    
    lines = content.split('\n')
    result = []
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # If we find \affiliation{
        if '\\affiliation{' in line:
            # Collect all lines until we find proper closure or next major command
            affil_lines = [line]
            open_braces = line.count('{') - line.count('}')
            i += 1
            
            while i < len(lines) and open_braces > 0:
                next_line = lines[i]
                
                # Stop if we hit another major command
                if any(cmd in next_line for cmd in ['\\begin{abstract}', '\\author{', '\\title{', '\\maketitle']):
                    # Close the affiliation
                    affil_lines.append('}' * open_braces)
                    open_braces = 0
                    break
                
                affil_lines.append(next_line)
                open_braces += next_line.count('{') - next_line.count('}')
                i += 1
            
            # If still open, close it
            if open_braces > 0:
                affil_lines.append('}' * open_braces)
            
            result.extend(affil_lines)
        else:
            result.append(line)
            i += 1
    
    return '\n'.join(result)

def main():
    for paper in PAPERS:
        paper_dir = os.path.join(PAPERS_DIR, paper)
        main_tex = os.path.join(paper_dir, "main.tex")
        
        if not os.path.exists(main_tex):
            continue
        
        with open(main_tex, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        original = content
        
        # Fix author section
        content = fix_author_section(content)
        
        if content != original:
            print(f"Fixed author section in {paper}")
            with open(main_tex, 'w', encoding='utf-8') as f:
                f.write(content)
        else:
            print(f"No changes needed for {paper}")

if __name__ == "__main__":
    main()
