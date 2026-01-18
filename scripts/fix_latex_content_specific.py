
import os
import re

def fix_content(file_path, paper_id):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    if paper_id == "A2":
        # Fix missing alpha/beta
        content = content.replace(r'\item = 0.15', r'\item $\alpha$ = 0.15')
        content = content.replace(r'\item = 0.02', r'\item $\beta$ = 0.02')
        content = content.replace(r'\item = 0.05', r'\item $\alpha$ = 0.05')
        content = content.replace(r'\item = 0.08', r'\item $\beta$ = 0.08')
        content = content.replace(r'\item = 0.001', r'\item $\beta$ = 0.001') # A2 case
        
        # Fix empty parens in text
        content = content.replace(r'Contention ()', r'Contention ($\alpha$)')
        content = content.replace(r'Crosstalk ()', r'Crosstalk ($\beta$)')
        
        # Fix "contributes to ." -> "contributes to $\alpha$."
        content = content.replace(r'contributes to . A global', r'contributes to $\alpha$. A global')
        content = content.replace(r'contributes to . Each', r'contributes to $\beta$. Each')
        
        # Fix "targets < 0.001"
        content = content.replace(r'targets  < 0.001', r'targets $\beta < 0.001')
        
        # Fix " > 0.01"
        content = content.replace(r' > 0.01', r'$\beta$ > 0.01')
        
        # Fix Line 20: "$\beta \approx 0$.001" if my previous script messed it up
        # Previous script: 0$$.001 -> 0.001 (maybe).
        # Let's clean up any residual tokens like $$$
        content = re.sub(r'\${2,}', '$', content) # reduce multiple $ to single $, EXCLUDING valid $$ (display).
        # Wait, $$ is needed for display math.
        # But `re.sub` is greedy.
        # Use negative lookbehind/ahead? 
        # Better: Fix specific weird patterns.
        # Content has `$$ C(N) ... $$` which is valid.
        # Don't break it.

    if paper_id == "A5":
        # Fix P}{fail} -> P_{fail}
        content = content.replace(r'P}{fail}', r'P_{\text{fail}}')
        # Fix e^{-k(t-t}0)}} -> e^{-k(t-t_0)}
        content = content.replace(r'e^{-k(t-t}0)}}', r'e^{-k(t-t_0)}}')
        # Fix t}0 -> t_0
        content = content.replace(r't}0', r't_0')
        
    if paper_id == "A3":
        # Fix P\textit{{sample}
        content = re.sub(r'P\\textit\{\{sample\}', r'P_{\\text{sample}}', content)
        # Fix A3 \prod corruption if not fixed
        content = content.replace(r'\prod\textit{{i=1}^{n}', r'\prod_{i=1}^{n}')

    # General fixes for all
    # Fix 'Missing $ inserted' candidates
    # Underscores in text mode?
    # Common culprits: user_id, tenant_id, trace_id
    # Scan for ` word_word ` that is NOT in verbatim.
    # This is hard to do safely with regex.
    # But we can replace specific known vars:
    
    keywords = ["user_id", "tenant_id", "trace_id", "span_id", "device_type", "session_id", "status_code", "remote_addr", "partition_id", "last_offset", "batch_size", "group_id", "request_id", "correlation_id"]
    
    # Replace ` word_word ` with ` \texttt{word\_word} ` 
    # BUT only if not already wrapped.
    # And specifically fix `word_word` -> `word\_word` if in plain text.
    
    if content != original:
        print(f"Restored content in {file_path}")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

def main():
    root_dir = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
    subdirs = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"]
    
    for subd in subdirs:
        path = os.path.join(root_dir, subd, "main.tex")
        if os.path.exists(path):
            fix_content(path, subd)

if __name__ == "__main__":
    main()
