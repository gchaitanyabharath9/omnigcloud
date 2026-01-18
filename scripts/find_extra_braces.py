
import os
import re

def check_braces(file_path):
    print(f"Checking {file_path} for brace mismatches...")
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    total_open = 0
    total_close = 0
    
    # Simple stack-based check?
    # No, just counting per line to find suspicious blocks.
    
    for i, line in enumerate(lines):
        line = re.sub(r'(?<!\\)%.*', '', line) # Remove comments
        o = line.count('{')
        c = line.count('}')
        total_open += o
        total_close += c
        
        if c > o:
            # Maybe valid if multiline?
            # But "Extra }" error often happens on the line itself.
            # print(f"  Line {i+1}: +{o} -{c} -> Text: {line.strip()[:60]}")
            pass

    print(f"  Total: {{ {total_open}, }} {total_close}. Diff: {total_open - total_close}")

    # Heuristic: Find lines with `}}` that might be excessive?
    # Or lines with `}` at start?
    
    # Let's find the closing brace that has no matching open brace in the preceding text.
    # This requires full scan.
    
    current_depth = 0
    with open(file_path, 'r', encoding='utf-8') as f:
        full_text = f.read()
        # strip comments
        full_text = re.sub(r'(?<!\\)%.*', '', full_text)
        
    # Iterate chars
    for i, char in enumerate(full_text):
        if char == '{':
            current_depth += 1
        elif char == '}':
            current_depth -= 1
            if current_depth < 0:
                # Found the extra closing brace!
                # Print context
                start = max(0, i - 40)
                end = min(len(full_text), i + 40)
                ctx = full_text[start:end]
                print(f"  [!] Extra closing brace found at char {i}. Context: ...{ctx.replace(chr(10), ' ')}...")
                current_depth = 0 # Reset to continue finding others?

def main():
    root_dir = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
    subdirs = ["A1", "A2", "A3", "A4", "A5", "A6", "ARCH"]
    
    for subd in subdirs:
        path = os.path.join(root_dir, subd, "main.tex")
        if os.path.exists(path):
            check_braces(path)

if __name__ == "__main__":
    main()
