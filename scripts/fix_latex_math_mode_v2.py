
import os
import re

def fix_latex_math(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    
    # 1. Fix multiple $$$$ ...
    # Specific case A2: $$$$$$\beta \approx 0$$$$$.001$
    # It seems to be excessive dollars.
    # Replace 3 or more $ with single $?
    # Or strict replacement for the A2 pattern.
    
    # Pattern: $$$$$$\beta \to \beta
    # But usually $$$$ is an error.
    # Let's replace 3+ $ with $.
    # BE CAREFUL: $$ is valid (display math).
    # $$$ is invalid.
    # $$$$ is valid (empty display math? or $$ $$).
    # But inside text, 6 $s is definitely wrong.
    
    content = re.sub(r'\${3,}', r'$', content)
    
    # Fix the 0$.001 issue if it persists (e.g. 0$$.001)
    # The previous regex reduced $$$$$$ to $.
    # So 0$$$$$.001 becomes 0$.001?
    # Original was likely 0.001.
    # If we have 0$.001, it's 0 (end math) . (start math) 001?
    # If the context is `$\beta \approx 0$.001$`, that's `0`.001 (001 in math).
    # The snippet showed: `... eliminates crosstalk ($$$$$$\beta \approx 0$$$$$.001$) ...`
    # After cleaning $$$$$$ -> $, we get: `... eliminates crosstalk ($\beta \approx 0$.001$) ...`
    # This means `\beta \approx 0` is math. `.001` is text?
    # Then `)` closing paren.
    # Ideally `$\beta \approx 0.001$`.
    # So we want to remove the valid `$` inside the number.
    # Pattern: `(\d)\$+\.(\d)` -> `\1.\2`
    content = re.sub(r'(\d)\$+\.(\d)', r'\1.\2', content)

    # 2. Fix P\textit{{sample} in A3
    # Pattern: P\textit{{word}
    # Fix to P_{\text{word}}
    # Regex: P\\textit\{\{([a-zA-Z0-9]+)\} -> P_{\text{\1}}
    content = re.sub(r'P\\textit\{\{([a-zA-Z0-9]+)\}', r'P_{\\text{\1}}', content)
    
    # 3. Fix cases alignment: \\& -> & inside cases
    cases_pattern = re.compile(r'(\\begin\{cases\}.*?\\end\{cases\})', re.DOTALL)
    def fix_cases(m):
        c = m.group(1)
        # replace \\& with &
        return c.replace(r'\\&', '&')
    content = cases_pattern.sub(fix_cases, content)
    
    # 4. Fix "2$ \times $4" or "2$ \times \$1"
    # A3 error: `2$\times\$1`
    # After $$$ fix, we might check for `$\times\$`.
    # `\times` should be inside match. `\$` escapes $.
    # If we have `2$\times\$1` -> `2 \times 1` (text mode?? No \times is math)
    # -> `$2 \times 1$`
    # Or `2 $\times$ 1`?
    # Replace `\$\times\$` with ` \times `? No, $\times$ is valid inline math.
    # But `2$\times` implies `2` is text, then starts math.
    # If `\$1` follows, it's `$` sign.
    # `2 \times $1` (2 times 1 dollar).
    # The error "Missing $ inserted" often means we are in math mode and used \$? No, \$ is valid in math.
    # Or we are in text mode and used \times? (This needs $...$).
    # If text has `2 \times 1`, it errors.
    # So we need to wrap `\times` in $. `$\times$`.
    # Regex: `(?<!\$)\\times(?!\$)` -> `$\times$`?
    # But if `\times` is already inside `$$...$$`, we break it.
    # Safer: Explicit fix for A3/A4 patterns.
    # "2$ \times \$1" -> "2 \times 10" was the context (scientific notation).
    # `2 \times 10^{17}`.
    # If it appears as `2$\times\$10`, it's messy.
    # Let's try to remove `$` around `\times` if it looks like numbers.
    
    # Specific A3 fix: `2$\times\$1` -> `2 \times 1` (assuming we wrap whole thing later or it's part of larger equation).
    # Actually, if A3 has `2$\times\$10^{17}$`, it's `2` (text) `$\times\$` (math) `10^{17}$` (text?? No ^ needs math).
    # So `10^{17}$` ... `$` closes it?
    # `2` `$\times$` `10^{17}$` -> Error at `^` because 10 is text.
    # We want `$2 \times 10^{17}$`.
    # Pattern: `(\d+)\$\\times\\\$(\d+)\^`
    # Replace with: `$\1 \\times \2^`
    
    content = re.sub(r'(\d+)\$\\times\\\$(\d+)', r'$\1 \\times \2', content)

    # 5. Fix \textit corrupion in \prod
    # \prod\textit{{i=1}^{n} |Dimension}i|
    # Logic from previous script.
    good_a3_math = r'\prod_{i=1}^{n} |Dimension_i|'
    bad_a3_math_regex = r'\\prod\\textit\{\{i=1\}\^\{n\} \|Dimension\}i\|'
    # The regex in previous script was strict string replace.
    # Let's repeat strict string replace just in case.
    bad_string = r'\prod\textit{{i=1}^{n} |Dimension}i|'
    content = content.replace(bad_string, good_a3_math)

    if content != original_content:
        print(f"Fixed math in {file_path}")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

def main():
    root_dir = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
    subdirs = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"]
    
    for subd in subdirs:
        path = os.path.join(root_dir, subd, "main.tex")
        if os.path.exists(path):
            fix_latex_math(path)

if __name__ == "__main__":
    main()
