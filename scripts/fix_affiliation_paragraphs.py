import os
import re

PAPERS_DIR = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
PAPERS = ["A1", "A2", "A3", "A4", "A5", "A6", "ARCH"]

def fix_affiliation_paragraphs(content):
    """Remove blank lines inside \affiliation blocks"""
    
    lines = content.split('\n')
    result = []
    in_affiliation = False
    affiliation_buffer = []
    
    for line in lines:
        if '\\affiliation{' in line:
            in_affiliation = True
            affiliation_buffer = [line]
        elif in_affiliation:
            # Check if this closes the affiliation
            if line.strip() == '}':
                # Merge all affiliation lines, removing blanks
                merged = []
                for aff_line in affiliation_buffer:
                    if aff_line.strip():  # Skip blank lines
                        merged.append(aff_line)
                # Add closing brace on same line as last content
                if merged:
                    merged[-1] = merged[-1].rstrip() + '}'
                result.extend(merged)
                in_affiliation = False
                affiliation_buffer = []
            else:
                affiliation_buffer.append(line)
        else:
            result.append(line)
    
    # If still in affiliation, flush it
    if affiliation_buffer:
        merged = []
        for aff_line in affiliation_buffer:
            if aff_line.strip():
                merged.append(aff_line)
        if merged:
            merged[-1] = merged[-1].rstrip() + '}'
        result.extend(merged)
    
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
        
        # Fix affiliation paragraphs
        content = fix_affiliation_paragraphs(content)
        
        if content != original:
            print(f"Fixed affiliation paragraphs in {paper}")
            with open(main_tex, 'w', encoding='utf-8') as f:
                f.write(content)
        else:
            print(f"No changes needed for {paper}")

if __name__ == "__main__":
    main()
