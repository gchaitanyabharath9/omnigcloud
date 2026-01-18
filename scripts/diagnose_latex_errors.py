
import os
import re

def diagnose(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    print(f"--- Diagnosing {os.path.basename(file_path)} ---")
    
    # 1. Check Braces Balance
    level = 0
    row = 1
    col = 0
    in_verbatim = False
    
    for i, char in enumerate(content):
        if char == '\n':
            row += 1
            col = 0
            continue
        col += 1
        
        # Check verbatim context (naive)
        # Should track \begin{verbatim} ... \end{verbatim} properly
        pass

    # Regex search for common errors
    
    # unmatched }
    # This is hard with regex. 
    # Look for "word} "
    matches = re.finditer(r'([a-zA-Z0-9]+)\}\s', content)
    for m in matches:
        # Check if } is escaped
        start = m.start(0)
        if start > 0 and content[start-1] == '\\':
            continue
        # Context
        ctx = content[max(0, start-20):min(len(content), m.end(0)+20)]
        print(f"Suspicious '}}' at or near: ...{ctx.replace(chr(10), ' ')}...")

    # _ in text (not in math $...$)
    # Naive Check: split by $
    parts = content.split('$')
    # Even parts are text (0, 2, 4...)
    # Odd parts are math (1, 3, 5...)
    # This assumes balanced $.
    
    for idx, part in enumerate(parts):
        if idx % 2 == 0: # Text mode
            # Ignore verbatim blocks inside parts?
            # Ignore commands like \label{foo_bar} (underscore allowed in label?) No, unsafe in label?
            # Underscore in \label or \ref is safe usually?
            # Underscore in \url is safe.
            # Underscore in \includegraphics is safe.
            
            # Simple check: _ surrounded by spaces?
            underscore_matches = re.finditer(r'\s_\s', part)
            for m in underscore_matches:
                 print(f"Suspicious '_' in text part {idx}: ...{part[max(0, m.start()-10):min(len(part), m.end()+10)]}...")

            # _ inside word?
            word_matches = re.finditer(r'[a-zA-Z]_[a-zA-Z]', part)
            for m in word_matches:
                 # exclude known good commands?
                 print(f"Suspicious word-underscore in text part {idx}: ...{part[max(0, m.start()-10):min(len(part), m.end()+10)]}...")

    # Check for escaped vars that shouldn't be: \$Var
    matches = re.finditer(r'\\\$[A-Za-z]', content)
    for m in matches:
        print(f"Escaped variable dollar at: ...{content[max(0, m.start()-10):min(len(content), m.end()+10)]}...")

def main():
    root_dir = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
    subdirs = ["A1", "A2", "A3", "A4", "A5", "A6", "ARCH"]
    
    for subd in subdirs:
        path = os.path.join(root_dir, subd, "main.tex")
        if os.path.exists(path):
            diagnose(path)

if __name__ == "__main__":
    main()
