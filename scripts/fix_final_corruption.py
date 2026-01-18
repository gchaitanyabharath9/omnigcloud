
import os
import re

def fix_final_corruption(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # 1. Fix A1's broken textt blocks
    # Pattern: \texttt{part1}part2_part3}
    # We want \texttt{part1_part2_part3}
    # This logic assumes the broken state is \texttt{...}...}
    # We'll search for \texttt{[^}]+}[^}]+}
    
    # Specific fixes based on audit report
    # \texttt{policy_eval}latency\_p99} -> \texttt{policy\_eval\_latency\_p99}
    # Note: the input likely has escaped underscores now if I ran syntax fix.
    
    # Let's fix specific known broken strings
    broken_strings = [
        (r'\texttt{policy_eval}latency\_p99}', r'\texttt{policy\_eval\_latency\_p99}'),
        (r'\texttt{policy_eval}errors}', r'\texttt{policy\_eval\_errors}'),
        (r'\texttt{policy_version}mismatch}', r'\texttt{policy\_version\_mismatch}'),
        (r'\texttt{policy_deny}rate}', r'\texttt{policy\_deny\_rate}'),
        (r'\texttt{policy_load}failures}', r'\texttt{policy\_load\_failures}')
    ]
    
    for bad, good in broken_strings:
        content = content.replace(bad, good)
        # Also try with unescaped versions if they exist
        content = content.replace(bad.replace(r'\_', '_'), good)

    # 2. Fix A2/A6 excessive dollars
    # Pattern: $$$$$$ -> $ (if inside parens) or $$ (if display)
    # A2: ($$$$$$\beta \approx 0$$$$$.001$) -> ($\beta \approx 0.001$)
    # The .001 part was outside $$?
    # Original text: "crosstalk ($\beta \approx 0.001$)"
    # Corrupted: "crosstalk ($$$$$$\beta \approx 0$$$$$.001$)"
    
    # Regex to collapse multiple $
    # First, handle the specific A2 case which is messy
    # ($$$$$$\beta \approx 0$$$$$.001$)
    content = re.sub(r'\(\s*\$+\s*(\\beta.*?)\$+\s*\)', r'($\1$)', content)
    
    # Generic dollar reducer
    # Replace 3+ dollars with $$ (or $?)
    # If we have $$$ -> $$?
    # $$$$ -> $$?
    content = re.sub(r'\${3,}', r'$$', content)
    
    # 3. Fix A1 USL coefficients table issues (detected in audit)
    # Context: `| \textbf{ (Alpha)}` -> Missing alpha?
    # It seems `$` was stripped?
    content = content.replace(r'| \textbf{ (Alpha)}', r'| \textbf{$\alpha$ (Alpha)}')
    content = content.replace(r'| \textbf{ (Beta)}', r'| \textbf{$\beta$ (Beta)}')
    
    # 4. Fix A5/A6 misc
    # "and TEMP_DOLLAR\mu" -> "and $\mu$"
    content = content.replace(r'TEMP_DOLLAR', '$')

    if content != original:
        print(f"Fixed final corruption in {file_path}")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

def main():
    root_dir = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
    subdirs = ["A1", "A2", "A3", "A4", "A5", "A6", "ARCH"]
    
    for subd in subdirs:
        path = os.path.join(root_dir, subd, "main.tex")
        if os.path.exists(path):
            fix_final_corruption(path)

if __name__ == "__main__":
    main()
