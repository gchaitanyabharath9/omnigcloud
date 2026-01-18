
import os
import re

def fix_all(file_path, paper_id):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # 1. Fix Italics Corruption (MUST be first to avoid confusion)
    # \textit{word} inside verbatim -> _word_
    # \textit{word} inside text -> _word (risky) -> NO.
    # We restrict to verbatim blocks from fix_italics_corruption.py logic
    parts = re.split(r'(\\begin\{verbatim\}.*?\\end\{verbatim\})', content, flags=re.DOTALL)
    new_parts = []
    for part in parts:
        if part.startswith(r'\begin{verbatim}'):
            fixed_part = re.sub(r'\\textit\{([^}]*)\}', r'_\1_', part)
            fixed_part = fixed_part.replace(r'\_', '_')
            new_parts.append(fixed_part)
        else:
            new_parts.append(part)
    content = "".join(new_parts)

    # 2. Fix multiple dollars
    # $$$$$ -> $ (Inline)
    # Be careful not to break $$ (Display)
    # Regex: Match 3 or more $ -> $
    content = re.sub(r'\${3,}', r'$', content)
    
    # 3. Fix embedded math in numbers (0$$$.001 -> 0.001)
    # Handle 0$.001, 0$$.001 etc.
    content = re.sub(r'(\d)\$+\.(\d)', r'\1.\2', content)

    # 4. Fix A3/A5 specific corruptions
    if paper_id == "A3":
        content = re.sub(r'P\\textit\{\{sample\}', r'P_{\\text{sample}}', content)
        content = content.replace(r'\prod\textit{{i=1}^{n}', r'\prod_{i=1}^{n}')
        content = re.sub(r'2\$\\times\\\$1', r'$2 \\times 1', content)

    if paper_id == "A5":
        content = content.replace(r'P}{fail}', r'P_{\text{fail}}')
        content = content.replace(r'e^{-k(t-t}0)}}', r'e^{-k(t-t_0)}}')
        content = content.replace(r't}0', r't_0')
        content = content.replace(r'\&', r'&') # Fix cases

    if paper_id == "A2":
         # Fix missing alpha/beta if stripped
        content = content.replace(r'\item = 0.15', r'\item $\alpha$ = 0.15')
        content = content.replace(r'\item = 0.02', r'\item $\beta$ = 0.02')
        content = content.replace(r'\item = 0.05', r'\item $\alpha$ = 0.05')
        content = content.replace(r'\item = 0.08', r'\item $\beta$ = 0.08')
        content = content.replace(r'\item = 0.001', r'\item $\beta$ = 0.001')
        content = content.replace(r'Contention ()', r'Contention ($\alpha$)')
        content = content.replace(r'Crosstalk ()', r'Crosstalk ($\beta$)')
        content = content.replace(r'contributes to .', r'contributes to $\alpha$.') # Context sensitive!
        # Better regex for "contributes to ."
        content = re.sub(r'contributes to \.\s+A global', r'contributes to $\\alpha$. A global', content)
        content = re.sub(r'contributes to \.\s+Each', r'contributes to $\\beta$. Each', content)
        content = content.replace(r'targets  < 0.001', r'targets $\beta < 0.001')
        content = content.replace(r' > 0.01', r'$\beta$ > 0.01')
        
        # Eliminate excessive dollars explicitly around beta if they survived
        # ($\beta \approx 0.001$)
        # Ensure it is clean.

    # 5. Fix Underscores in Text
    # Keywords list
    keywords = [
        "user_id", "tenant_id", "trace_id", "span_id", 
        "device_type", "session_id", "status_code", 
        "remote_addr", "partition_id", "last_offset", 
        "batch_size", "group_id", "request_id", 
        "correlation_id", "allowed_registries", "cost-center"
    ]
    
    parts = re.split(r'(\\begin\{verbatim\}.*?\\end\{verbatim\})', content, flags=re.DOTALL)
    new_parts = []
    for part in parts:
        if part.startswith(r'\begin{verbatim}'):
            new_parts.append(part)
        else:
            text = part
            for kw in keywords:
                # Replace unescaped kw
                # Regex: (?<!\\)kw
                text = re.sub(r'(?<!\\)' + re.escape(kw), kw.replace('_', r'\_'), text)
            new_parts.append(text)
    content = "".join(new_parts)

    if content != original:
        print(f"Fixed content in {file_path}")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

def main():
    root_dir = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
    subdirs = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"]
    
    for subd in subdirs:
        path = os.path.join(root_dir, subd, "main.tex")
        if os.path.exists(path):
            fix_all(path, subd)

if __name__ == "__main__":
    main()
