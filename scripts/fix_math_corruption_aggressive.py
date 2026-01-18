
import os
import re

def fix_math_corruption(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # 1. Unescape $ that look like delimiters
    # Pattern: " $...$" or "$...$ " or "$...$."
    # If we have "\$S\_t$" -> "$S_t$"
    # Regex: Look for \$ followed by [A-Za-z] (Start) OR \$ at end of word/punctuation (End)?
    # To be safe, let's fix known variables in A6/A3.
    # $S_t$, $A_t$, $E_t$, $f_{loop}$, $f_{machine}$
    
    # Fix A6 variables
    variables = ["S_t", "E_t", "A_t", "S_{t+1}", "f_{loop}", "f_{machine}", "f_{human}", "R_{res}", "Rate_{attack}"]
    
    for var in variables:
        # Construct likely corrupted regexes
        # e.g. \$S\_t$
        escaped_dollar_var = r'\$' + re.escape(var).replace('_', r'\_')
        # If found, replace with $var
        # But we need to handle the closing $?
        # Maybe just replace \$ with $ around these vars?
        pass

    # Generic fix for "Let \$X\$" -> "Let $X$"
    content = re.sub(r'Let \\\$([A-Za-z_\\\{\}]+)(\$|\\\$)', r'Let $\1$', content)
    
    # Generic fix for "100\$ Hz" -> "100$ Hz"
    content = re.sub(r'(\d+)\\\$\s+Hz', r'\1$ Hz', content)

    # 2. Fix Italics/Brace Corruption in Math (A3, A6)
    # S\textit{{t+1} -> S_{t+1}
    # Pattern: ([A-Za-z])\\textit\{\{([^}]+)\} -> \1_{\2}
    content = re.sub(r'([A-Za-z])\\textit\{\{([^}]+)\}', r'\1_{\2}', content)
    
    # f(S}t -> f(S_t
    # Pattern: ([A-Za-z])\}t -> \1_t
    content = re.sub(r'([A-Za-z])\}t', r'\1_t', content)
    
    # E\textit{t -> E_t
    # Pattern: ([A-Za-z])\\textit\{t', r'\1_t' (careful if t is text)
    content = re.sub(r'([A-Za-z])\\textit\{([a-z])', r'\1_\2', content)
    
    # Fix A3 specific: C\textit{{total} -> C_{total}
    content = re.sub(r'C\\textit\{\{total\}', r'C_{total}', content)
    content = re.sub(r'C\}\{ingest\}', r'C_{ingest}', content) # } { -> _ { ?
    content = re.sub(r'C\}\{storage\}', r'C_{storage}', content)
    content = re.sub(r'C\}\{compute\}', r'C_{compute}', content)

    # Fix A6: S\textit{{t+1}
    content = re.sub(r'S\\textit\{\{t\+1\}', r'S_{t+1}', content)
    
    # Fix A6: f(S}t, E\textit{t, A}t)
    # f(S}t -> f(S_t
    content = content.replace(r'f(S}t', r'f(S_t')
    content = content.replace(r'E\textit{t', r'E_t')
    content = content.replace(r'A}t', r'A_t')
    
    # Fix A6: 1/f\textit{{loop}} -> 1/f_{loop}
    content = re.sub(r'f\\textit\{\{loop\}\}', r'f_{loop}', content)
    
    # Fix A6: Rate_{attack}
    content = re.sub(r'Rate\\_\{attack\}', r'Rate_{attack}', content) # Unescape underscore in math
    content = re.sub(r'\\frac\{R\}\{res\}', r'\\frac{R_{res}}{Rate_{attack}}', content) # Guessing context
    
    # Fix A3: T}{p99} -> T_{p99}
    content = content.replace(r'T}{p99}', r'T_{p99}')
    
    # Fix A3: R}{base} -> R_{base}
    content = content.replace(r'R}{base}', r'R_{base}')
    
    # Fix A3: P}{anomaly}
    content = content.replace(r'P}{anomaly}', r'P_{anomaly}')
    content = content.replace(r'P\textit{{anomaly}', r'P_{anomaly}')
    
    # Fix A3: S}{trace}
    content = content.replace(r'S}{trace}', r'S_{trace}')
    
    # Fix A3: V}{vol}
    content = content.replace(r'V}{vol}', r'V_{vol}')
    content = content.replace(r'V\textit{{vol}', r'V_{vol}')
    
    # 3. Clean up escaping of $ in variables generally
    # If we have $S\_t$, pdflatex might dislike \_ in math if font/package issue.
    # But usually it's fine.
    # However, if it was \$S\_t$, we unescaped the $, but kept \_.
    # Check if \_ matches "Missing $"? No.
    
    # Fix A6: 100$ Hz -> ensure space?
    
    # Fix A6: R}{res} -> R_{res}
    content = content.replace(r'R}{res}', r'R_{res}')

    if content != original:
        print(f"Fixed math corruption in {file_path}")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

def main():
    root_dir = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
    subdirs = ["A3", "A6", "A5", "A2", "A1", "A4"]
    
    for subd in subdirs:
        path = os.path.join(root_dir, subd, "main.tex")
        if os.path.exists(path):
            fix_math_corruption(path)

if __name__ == "__main__":
    main()
