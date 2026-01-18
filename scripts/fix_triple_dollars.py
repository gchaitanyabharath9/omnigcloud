
import os
import re

def fix_triple_dollars(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # Pattern: $$$ -> $
    # Logic: The text shows "with   $$$\beta \approx 0$$$ in the Universal..."
    # This implies the user wants inline math.
    # We will replace any sequence of 3 or more dollars with a single dollar, 
    # UNLESS it is strictly a display math block $$...$$ which has exactly 2 dollars.
    # But how to distinguish?
    # $$ x $$ is valid.
    # $$$ x $$$ is invalid.
    
    # We'll use regex to find 3+ dollars
    
    def repl(m):
        # m.group(0) is the sequence of dollars
        s = m.group(0)
        if len(s) >= 3:
            return "$" # Assume inline if corrupted to 3+
            # If it was meant to be display math, $$ is 2. 
            # If someone wrote $$$$, it might be empty display math? 
            # Or $$ $$? 
            # In the context of "with ... in the", inline $ is correct.
        return s
    
    # Regex: \$+
    content = re.sub(r'\$+', repl, content)
    
    # Also fix: "   $ \beta" -> " $\beta" (cleanup spaces)
    
    if content != original:
        print(f"Fixed triple dollars in {file_path}")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

def main():
    root_dir = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
    subdirs = ["A1", "A2", "A3", "A4", "A5", "A6", "ARCH"]
    
    for subd in subdirs:
        path = os.path.join(root_dir, subd, "main.tex")
        if os.path.exists(path):
            fix_triple_dollars(path)

if __name__ == "__main__":
    main()
