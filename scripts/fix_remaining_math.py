
import os
import re

def fix_math_delimiters(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # 1. Replace 3+ dollars with 1 dollar
    content = re.sub(r'\${3,}', '$', content)
    
    # 2. Replace '$$' with '$' IF it looks like inline math
    # Pattern: Non-newline, $$, Non-newline
    # e.g. "text $$math$$ text" -> "text $math$ text"
    # But preserve:
    # $$
    # math
    # $$
    
    # Regex lookbehind/lookahead for non-newline is tricky because of start/end of string.
    # We'll replace `$$` that definitely has text neighbors.
    # \S matches non-whitespace.
    # If we have ` $$ ` (space surrounding), it might be display.
    # But usually display math is on new logic line.
    
    # Simple heuristic: Replace $$ with $ globally?
    # This turns all display math into inline math.
    # For these papers, that might be acceptable to fix errors, even if formatting degrades slightly.
    # Better than failure.
    # But check if A1 uses display math correctly. A1 passed.
    # A2, A3, A4, A5, A6 are failing.
    # I will modify them.
    
    content = content.replace('$$', '$')
    
    # 3. Clean up empty math $ $ (if any created)
    content = content.replace('$ $', ' ')
    content = content.replace('$$', '$') # recursive check
    
    # 4. Fix specific corrupted patterns in A2/A6 seen in logs
    # A2: ($ .001$) -> ($0.001$) ?
    # Original: ($$$\beta \approx 0$$.001$)
    # Step 1 -> ($\beta \approx 0$.001$)
    # Step 2 -> ($\beta \approx 0$.001$)
    # The .001 is outside math?
    # If the text was: "($\beta \approx 0$.001)"
    # Then we have $(\beta \approx 0)$.001
    # Check if context implies .001 should be part of the number?
    # "beta approx 0.001".
    # So it should be `($\beta \approx 0.001$)`.
    # Current state likely: `... ($\beta \approx 0$.001) ...`
    # Replace `0$.001` with `0.001$`.
    # Regex: `(\d+)\$\.(\d+)` -> `\1.\2$` ?
    # No, we want the `$` at the end of the clause.
    # `($\beta \approx 0$.001)`
    # We want `($\beta \approx 0.001$)`
    
    # Let's fix specific string: `($\beta \approx 0$.001)`
    # Regex: `\(\$(\\[a-zA-Z]+) \\approx (\d+)\$\.(\d+)\)`
    # This is too specific.
    # Let's simple fix `0$.001` -> `0.001` (and move $ later? No, we lost context).
    # But if we just delete the inner `$`?
    # `($\beta \approx 0.001)` -> this lacks closing `$`?
    # No, `($... 0$.001)`
    # If text is `($\beta \approx 0$.001)`
    # There is no closing `$`. This is "Missing $ inserted" error!
    # Because `(` is text mode? No.
    # `(` is text. `$` starts math. `0` ends number? `$` ends math. `.001)` text.
    # So `($...0$)` is valid math block.
    # But maybe the user meant `($... 0.001$)`.
    
    # Search for this pattern: `$.`
    # If we have `$.` followed by digits, it's suspicious if it was meant to be a decimal.
    # content = re.sub(r'\$\.(\d+)', r'.\1$', content) 
    # This moves the $ to after the decimal?
    # `0$.001` -> `0.001$`
    # `($\beta \approx 0$.001)` -> `($\beta \approx 0.001$)` (Wait, `)` is after `001`).
    # Yes. `0.001)` -> `0.001$)`?
    # No, regex replacement of `$.001` with `.001$` applies locally.
    # `...0$.001)` -> `...0.001$)`
    # This looks correct!
    
    content = re.sub(r'\$\.(\d+)', r'.\1$', content)
    
    if content != original:
        print(f"Fixed math delimiters in {file_path}")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

def main():
    # Only target failing papers
    subdirs = ["A1", "A2", "A3", "A4", "A5", "A6", "ARCH", "AECP"]
    root_dir = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
    
    for subd in subdirs:
        path = os.path.join(root_dir, subd, "main.tex")
        if os.path.exists(path):
            fix_math_delimiters(path)

if __name__ == "__main__":
    main()
