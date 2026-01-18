
import os
import re

def strip_verbatim(content):
    # Remove verbatim environments
    content = re.sub(r'\\begin\{verbatim\}.*?\\end\{verbatim\}', '', content, flags=re.DOTALL)
    # Remove lstlisting environments
    content = re.sub(r'\\begin\{lstlisting\}.*?\\end\{lstlisting\}', '', content, flags=re.DOTALL)
    # Remove \verb|...| (simplified, assuming | delimiter)
    content = re.sub(r'\\verb\|.*?\|', '', content)
    return content

def check_syntax(file_path):
    print(f"Checking {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        raw_content = f.read()

    # 1. Check for underscores in text mode (outside verbatim, outside $...$)
    # This is tricky because of multiple $...$ blocks.
    # We will split by $...$ after stripping verbatim.
    
    clean_content = strip_verbatim(raw_content)
    
    # Split effectively by $
    # Note: escaped \$ should be treated as text.
    # Let's replace escaped \$ with placeholder.
    temp_content = clean_content.replace(r'\$', 'TEMP_DOLLAR')
    
    parts = temp_content.split('$')
    
    for i, part in enumerate(parts):
        if i % 2 == 0: # Even index = Text mode
            # Check for unescaped _
            # Ignore \_
            part_no_esc = part.replace(r'\_', 'TEMP_UNDERSCORE')
            
            # Look for _
            matches = list(re.finditer(r'_', part_no_esc))
            if matches:
                print(f"  [Text Mode Underscore] Found {len(matches)} unescaped underscores in text segment {i}.")
                for m in matches[:3]:
                    ctx = part[max(0, m.start()-20):min(len(part), m.end()+20)]
                    print(f"    Context: ...{ctx.replace(chr(10), ' ')}...")
        
        else: # Odd index = Math mode
            # Check for bad usage in math?
            # e.g. text commands without \text{}?
            pass

    # 2. Check for \textit{...} containing _
    # Regex: \\textit\{[^}]*_
    # This is rough because of nesting.
    # But often the error is simple: \textit{variable_name}
    matches = re.finditer(r'\\textit\{([^\}]*?_[^\}]*?)\}', clean_content)
    for m in matches:
        print(f"  [Italics Underscore] Found underscore in \\textit: {m.group(0)}")

    # 3. Check for \text{...} containing _
    matches = re.finditer(r'\\text\{([^\}]*?_[^\}]*?)\}', clean_content)
    for m in matches:
        print(f"  [Text Underscore] Found underscore in \\text: {m.group(0)}")

    # 4. Check for unbalanced braces (naive)
    # We count { and } in clean_content (stripped of verbatim)
    # But comments % might hide braces.
    
    # Remove comments
    no_comments = re.sub(r'(?<!\\)%.*', '', clean_content)
    
    open_count = no_comments.count('{')
    close_count = no_comments.count('}')
    
    if open_count != close_count:
        print(f"  [Brace Mismatch] {{ count: {open_count}, }} count: {close_count}. Diff: {open_count - close_count}")

def main():
    root_dir = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
    subdirs = ["A1", "A2", "A3", "A4", "A5", "A6", "ARCH"]
    
    for subd in subdirs:
        path = os.path.join(root_dir, subd, "main.tex")
        if os.path.exists(path):
            check_syntax(path)

if __name__ == "__main__":
    main()
