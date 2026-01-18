import os
import re

PAPERS_DIR = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
PAPERS = ["A1", "A2", "A3", "A4", "A5", "A6", "ARCH"]

def fix_affiliation_braces(content):
    """Fix unclosed braces in affiliation blocks"""
    
    # Find all \affiliation blocks
    pattern = r'(\\affiliation\{[^}]*?)(\n|$)'
    
    def check_and_fix(match):
        block = match.group(1)
        # Count braces
        open_count = block.count('{')
        close_count = block.count('}')
        
        if open_count > close_count:
            # Add missing closing braces
            return block + ('}' * (open_count - close_count)) + match.group(2)
        return match.group(0)
    
    # Try to fix simple cases
    fixed = re.sub(pattern, check_and_fix, content)
    
    # Also ensure \affiliation has proper structure
    # Pattern: \affiliation{...} should be complete
    lines = fixed.split('\n')
    result = []
    in_affiliation = False
    affiliation_depth = 0
    
    for line in lines:
        if '\\affiliation{' in line:
            in_affiliation = True
            affiliation_depth = line.count('{') - line.count('}')
        elif in_affiliation:
            affiliation_depth += line.count('{') - line.count('}')
            if affiliation_depth <= 0:
                # Close affiliation if needed
                if affiliation_depth < 0:
                    line = line.rstrip() + ('}' * abs(affiliation_depth))
                in_affiliation = False
                affiliation_depth = 0
        
        result.append(line)
    
    # If still in affiliation at end, close it
    if in_affiliation and affiliation_depth > 0:
        result.append('}' * affiliation_depth)
    
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
        
        # Fix affiliation braces
        content = fix_affiliation_braces(content)
        
        # Fix other common brace issues
        # Remove triple braces
        content = re.sub(r'\}\}\}', '}}', content)
        
        # Fix broken subscripts
        content = re.sub(r'([a-zA-Z_])\}\{([a-zA-Z0-9]+)\}', r'\1_{\2}', content)
        
        if content != original:
            print(f"Fixed {paper}")
            with open(main_tex, 'w', encoding='utf-8') as f:
                f.write(content)

if __name__ == "__main__":
    main()
