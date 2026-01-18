
import os
import re

def fix_escaped_dollars(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # Logic: Unescape \$ if it acts as math delimiter for variables
    
    # 1. Start of math variable: \$ followed by Letter
    # Exclude \$ followed by number (Currency like \$100) or space (Text \$)
    # Also exclude standard currency codes if possible (US\$).
    # Regex: (?<![A-Z])\\\$([A-Za-z]) matches \$V but not US\$V (maybe)
    content = re.sub(r'(?<![A-Z])\\\$([A-Za-z])', r'$\1', content)
    
    # 2. End of math variable: Letter/Digit/} followed by \$
    # Exclude if followed by number? No, closing delimiter.
    # Exclude if it looks like currency usage? $100\$? (Rare).
    content = re.sub(r'([A-Za-z0-9\}])\\\$', r'\1$', content)
    
    # 3. Specific fixes for A3/A6/A5 commonly observed variables
    # Just in case regex missed complex subscripts
    vars = ["P_{sample}", "R_{base}", "S_{trace}", "V_{vol}", "T_{p99}", "P_{anomaly}", 
            "C_{total}", "S_{t}", "E_{t}", "A_{t}", "S_{t+1}", "f_{loop}", 
            "P_{fail}", "R_{res}", "Rate_{attack}"]
    
    for v in vars:
        # Replace \$v\$ with $v$
        # Replace \$v with $v
        # Replace v\$ with v$
        # But we must be careful of regex escaping the variable string
        esc_v = re.escape(v)
        # \$v\$
        content = re.sub(r'\\\$' + esc_v + r'\\\$', r'$' + v + '$', content)
        # \$v
        content = re.sub(r'\\\$' + esc_v, r'$' + v, content)
        # v\$
        content = re.sub(esc_v + r'\\\$', v + '$', content)

    if content != original:
        print(f"Fixed escaped dollars in {file_path}")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

def main():
    root_dir = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
    subdirs = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"]
    
    for subd in subdirs:
        path = os.path.join(root_dir, subd, "main.tex")
        if os.path.exists(path):
            fix_escaped_dollars(path)

if __name__ == "__main__":
    main()
