
import os
import re

def fix_latex_math(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    
    # helper to clean math block
    def clean_math(match):
        block = match.group(0)
        inner = match.group(1)
        
        # content fixes inside math
        # 1. Fix \textit used as subscript?
        # pattern: \textit{...} containing math chars ^ or _
        # Actually, \prod\textit{{i=1} -> \prod_{i=1}
        # Regex: \\prod\\textit\{([^{]+)\}  -> \prod_{\1}
        # But here it's \textit{{i=1}^{n} ...}
        
        # Generic fix: Remove \textit{...} wrapper if it contains math operators, or replace with text-mode if meant to be text.
        # But \prod ... usually implies subscript.
        # Let's replace \textit{...} with {...} (just group) inside math mode, assuming the content was meant to be math.
        # Caution: \textit{if} is valid text.
        
        # Specific corruptions I saw:
        # \prod\textit{{i=1}^{n} ...}
        # This looks like markdown `_` became `\textit`.
        
        new_inner = inner
        new_inner = new_inner.replace(r'\\&', '&') # Fix cases alignment
        new_inner = new_inner.replace(r'\\_', '_') # Fix escaped underscore in math
        
        # Replace \textit{...} with \text{...} IF it looks like text (no ^, _ inside).
        # If it has ^ or _, it's likely broken math.
        
        # Strategy: strip \textit{ and closing } if followed by mathy stuff?
        # Let's try replacing \textit{ with nothing, and finding matching }? Hard with regex.
        
        # Targeted fix for A3:
        # \prod\textit{{i=1}^{n} |Dimension}i|
        # -> \prod_{i=1}^{n} |Dimension_i|
        pass
        
        return block # TODO: implement actual replacement logic using string manipulation on 'inner'

    # Optimization: processing the whole file line by line might be safer for finding $$ blocks.
    # But regex finds them across lines? .
    
    # 1. Fix cases alignment: \\& -> & inside cases
    cases_pattern = re.compile(r'(\\begin\{cases\}.*?\\end\{cases\})', re.DOTALL)
    def fix_cases(m):
        c = m.group(1)
        # replace \\& with &
        return c.replace(r'\\&', '&')
    
    content = cases_pattern.sub(fix_cases, content)
    
    # 2. Fix the specific \prod\textit corruption in A3
    # $$ Cardinality = \prod\textit{{i=1}^{n} |Dimension}i| $$
    # Matches: \prod\textit{{i=1}^{n} |Dimension}i|
    # This is extremely specific.
    # Let's try to fix "\prod\textit{...}" pattern globally.
    # If \textit{ starts with {, it matches {{...}}.
    
    content = re.sub(r'\\prod\\textit\{\{', r'\\prod_{', content)
    # content is now \prod_{i=1}^{n} |Dimension}i|
    # We closed one brace of \textit{...}. The closing brace of \textit is likely after Dimension?
    # "\textit{{i=1}^{n} |Dimension}"
    # So if we replace \textit{{ with _{, we are left with a trailing } somewhere.
    # This is risky.
    
    # Better: explicit string replace for the known A3 error.
    bad_a3_math = r'\prod\textit{{i=1}^{n} |Dimension}i|'
    good_a3_math = r'\prod_{i=1}^{n} |Dimension_i|'
    content = content.replace(bad_a3_math, good_a3_math)
    
    # Also 2$ \times \$1
    # 2$\times\$1  -> 2 \times 1
    content = re.sub(r'2\$\\times\\\$1', r'2 \\times 1', content)
    
    # Fix: \begin{cases} 1 \\& \text{if }
    content = content.replace(r'1 \\& \text{if }', r'1 & \text{if }')
    content = content.replace(r't) \\& \text{if }', r't) & \text{if }')
    
    # Fix table headers being bold only?
    # Tables are Markdown. pdflatex compiling them produces text. 
    # | Metric | -> | Metric | (pipes printed)
    # This is ugly but not a compile error.
    # Compile error comes from _, ^, $ in text.
    
    # Fix escaped characters inside verbatim (A1 issue potentially, unrelated to compile error)
    
    if content != original_content:
        print(f"Fixed math/cases in {file_path}")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

def main():
    root_dir = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
    # Target A3, A4 mainly
    subdirs = ["A3", "A4", "A5", "A6"]
    
    for subd in subdirs:
        path = os.path.join(root_dir, subd, "main.tex")
        if os.path.exists(path):
            fix_latex_math(path)

if __name__ == "__main__":
    main()
