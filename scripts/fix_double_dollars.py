
import os
import re

def fix_double_dollars(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # Fix 1: $$ $...$ $$ pattern (Created by my buggy script)
    # This might span newlines.
    # regex: \$\$\s*\$([^\$]+)\$\s*\$\$
    # Note: ([^\$]+) is greedy or not?
    # We want to match the inner content.
    
    # We'll use a loop to fix typical cases.
    
    # Pattern: $$ $VAR$ $$
    # Replace with $$ VAR $$
    
    # Using re.sub with function to be safer?
    
    # We handle the case where multiple vars were wrapped.
    # $$ $S_t$ = $f(E_t)$ $$
    # My script wrapped each var individually.
    # So we might have $$ $S_t$ = $f(E_t)$ $$
    # This is bad. $$ $S_t$ ...
    
    # We simply need to remove $ inside $$ ... $$ blocks.
    # Regex to find $$ ... $$ blocks, then strip $ inside them?
    
    def strip_dollars_in_display(m):
        inner = m.group(1)
        # Remove all $ inside the block
        # But wait, what if real \$ was there?
        # My script put $ around vars.
        # It's unlikely I had legitimate $ inside $$...$$ unless checks.
        # But legitimate \$ (escaped) might exist.
        # I should replace unescaped $ with empty string.
        # But keep \$
        
        # Use a placeholder for \$
        inner = inner.replace(r'\$', '__ESCAPED_DOLLAR__')
        inner = inner.replace('$', '') # Kill the bad dollars
        inner = inner.replace('__ESCAPED_DOLLAR__', r'\$')
        return f"$${inner}$$"
        
    # Match $$...$$
    # Use re.DOTALL to match across newlines
    # But be careful of nested or sequential.
    content = re.sub(r'\$\$(.*?)\$\$', strip_dollars_in_display, content, flags=re.DOTALL)
    
    # Fix 2: Check for $ $...$ $ (double inline?)
    # If I had $S_t$ and my script replaced $S_t$ with $$S_t$$... no.
    # My script only operated on "Text" chunks.
    # If I had " $S_t$ " (text space text).
    # " $S_t$ " -> " $$S_t$$ " ? No.
    # My script searched for `S_t` (literal).
    # If `S_t` was inside `$$...$$` (which is technically "Text, Empty, Text, Empty, Text" in split), it got wrapped.
    
    # So ONLY $$...$$ should be affected.
    
    if content != original:
        print(f"Fixed double dollars in {file_path}")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

def main():
    root_dir = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
    subdirs = ["A1", "A2", "A3", "A4", "A5", "A6", "ARCH"]
    
    for subd in subdirs:
        path = os.path.join(root_dir, subd, "main.tex")
        if os.path.exists(path):
            fix_double_dollars(path)

if __name__ == "__main__":
    main()
