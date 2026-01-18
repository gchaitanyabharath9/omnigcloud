
import os
import re

def fix_verbatim_state_machine(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    in_verbatim = False
    fixed_count = 0

    # Pattern for exact \begin{verbatim} or \end{verbatim}
    # Note: Regex to handle whitespace
    begin_pattern = re.compile(r'\\begin\{verbatim\}')
    end_pattern = re.compile(r'\\end\{verbatim\}')

    for i, line in enumerate(lines):
        # Check for begin first
        has_begin = begin_pattern.search(line)
        has_end = end_pattern.search(line)

        # We assume one per line for simplicity, or at least they don't share line (verbatim usually own line)
        
        if has_begin and has_end:
             # Weird case: both on same line? 
             # e.g. \begin{verbatim} code \end{verbatim}
             # If so, it's self-contained. State doesn't change across lines.
             pass
        elif has_begin:
            if in_verbatim:
                # We are already in verbatim, but see another begin? 
                # Nested verbatim is not allowed, so maybe this is actually part of the code?
                # But typically this means previous end was missing.
                # However, strict logic:
                pass 
            else:
                in_verbatim = True
        elif has_end:
            if in_verbatim:
                 # Proper close
                 in_verbatim = False
            else:
                # We saw \end{verbatim} but we were NOT inside a block.
                # This must be the erroneously converted start tag.
                # FIX IT -> \begin{verbatim}
                line = line.replace(r'\end{verbatim}', r'\begin{verbatim}')
                in_verbatim = True # Now we are inside
                fixed_count += 1
        
        new_lines.append(line)

    if fixed_count > 0:
        print(f"Fixed {fixed_count} inverted verbatim tags in {file_path}")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
    else:
        print(f"No verbatim fixes needed for {file_path}")

def main():
    root_dir = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
    subdirs = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"]
    
    for subd in subdirs:
        path = os.path.join(root_dir, subd, "main.tex")
        if os.path.exists(path):
            fix_verbatim_state_machine(path)

if __name__ == "__main__":
    main()
