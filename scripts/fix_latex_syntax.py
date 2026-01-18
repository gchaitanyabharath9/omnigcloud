
import os
import re

def fix_latex_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    
    # FIX 1: Fix broken verbatim blocks
    # Pattern: \end{verbatim}nginx -> \begin{verbatim}
    # Pattern: \end{verbatim}yaml -> \begin{verbatim}
    # Pattern: \end{verbatim}json -> \begin{verbatim}
    # Valid \end{verbatim} is just \end{verbatim}
    
    # We replace \end{verbatim}WORD with \begin{verbatim}
    content = re.sub(r'\\end\{verbatim\}([a-zA-Z0-9]+)', r'\\begin{verbatim}', content)

    # FIX 2: Ensure verbatim blocks are closed
    # Count begin/end
    # This is complex, but let's trust the closing tags are present as \end{verbatim}
    
    # FIX 3: Math mode fixes
    # "Display math should end with $$" usually means block math is malformed.
    # Replace \[ ... $$ with \[ ... \] or $$ ... $$
    # Ensure standard usage: \[ ... \] for display math.
    # Regex to find $$ ... $$ and replace with \[ ... \] (safer)
    # content = re.sub(r'\$\$(.*?)\$\$', r'\\[\1\\]', content, flags=re.DOTALL) # Optional, ACM might prefer one.
    
    # FIX 4: "Missing $ inserted" often comes from unescaped $ inside text or bad math delimiters.
    # Check for isolated $ that are not part of a pair.
    # This is hard to regex safely.
    
    # Specific fix for A3/A4: "2$ \times \$10" context?
    # If we see `2$\times\$1`, it looks like `2` then start math mode `\times`, then end math mode? No `\$` is escaped $.
    # `2$\times$1` -> 2 x 1.
    # `2$\times\$10^{17}$` -> `2 \times 10^{17}`?
    # Maybe original markdown was "2 x $10^{17}$"?
    # I'll rely on the specific Verbatim fix first for A5/A6/AECP.
    
    if content != original_content:
        print(f"Fixed {file_path}")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
    return content

def main():
    root_dir = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
    subdirs = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"]
    
    for subd in subdirs:
        path = os.path.join(root_dir, subd, "main.tex")
        if os.path.exists(path):
            fix_latex_file(path)

if __name__ == "__main__":
    main()
