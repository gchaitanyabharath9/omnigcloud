
import os
import re

def fix_syntax(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # 1. Fix variables that should be in math mode but are in text
    # These often appear as X_{sub} in text
    # List of known variables from diagnosis
    vars_to_math = [
        r'P_{sample}', r'R_{base}', r'C_{total}', r'V_{vol}', r'P_{anomaly}',
        r'S_{trace}', r'T_{p99}', r'T_{incident}', r'T_{human}',
        r'S_{t+1}', r'S_t', r'E_t', r'A_t', r'f_{loop}', r'f_{human}', 
        r'f_{machine}', r'R_{res}', r'Rate_{attack}',
        r'P_{shift}', r'S_{infra}', r'P_{fail}',
        r'\\Omega_{save}', r'\\lambda', r'\\mu', r'\\beta'
    ]
    
    # Logic: If these patterns are found NOT surrounded by $, wrap them.
    # But regex lookbehind for $ is hard if there are spaces.
    # Easier: Replace `Pattern` with `$Pattern$` IF NOT already `$Pattern$`.
    # And we must handle likely text occurrences.
    
    # Loop each var
    for var in vars_to_math:
        # Escape for regex
        # var might have backslashes already (e.g. \\Omega)
        esc_var = re.escape(var).replace(r'\\', r'\\')
        
        # Regex to find var not inside $...$ 
        # This is very hard to do perfectly with regex globally.
        # Strategy: Replace ALL occurrences with a temporary unique marker
        # Then replace markers inside $...$ with original
        # Then replace markers outside with $original$.
        # Actually, simpler:
        # Just searching for the specific text pattern often implies it needs math mode.
        # e.g. "P_{sample}" is almost certainly math.
        
        # We need to look for `var` that is NOT preceded by `$` or `\` (if strictly text).
        # And NOT followed by `$`.
        
        # Let's try to match the EXACT string and check neighbors.
        # We walk through the string? No, inefficient.
        
        # Regex: (?<![\$\\])P_\{sample\}(?!\$)
        # Note: \\ is for commands. If I have \P_{sample} it might be valid command (unlikely).
        # If I have $P_{sample}$, lookbehind sees $.
        
        # But spaces: $ P_{sample} $
        # Lookbehind doesn't support variable length.
        
        # Alternative: Split by $, iterate sections.
        pass

    # Better 'Split by $' approach for text maintenance
    chunks = content.split('$')
    new_chunks = []
    for i, chunk in enumerate(chunks):
        if i % 2 == 0: # Text mode
            # Perform text-mode fixes
            
            # 1. Escape underscores in \texttt{...}
            # Regex: \texttt{...}
            # Handle nested braces? \texttt{foo_{bar}} -> \texttt{foo\_{bar}}?
            # Regex for simple \texttt{...}
            def escape_underscore_in_match(m):
                # m.group(0) is \texttt{...}
                inner = m.group(1)
                inner_fixed = inner.replace('_', r'\_')
                return f'\\texttt{{{inner_fixed}}}'
            
            chunk = re.sub(r'\\texttt\{([^\}]+)\}', escape_underscore_in_match, chunk)
            
            # 2. Wrap specific math variables in $...$
            for var in vars_to_math:
                # Need to match strictly the variable pattern
                # Be careful with partial matches?
                # e.g. S_t matches S_t+1?
                # Sort vars by length descending to avoid prefix issues?
                # S_{t+1} length > S_t.
                
                # We need to unescape regex special chars for the pattern
                # but var is already regex-safe-ish string?
                # "S_{t+1}" literals.
                
                # Construct regex:
                # Boundary check?
                # \bS_\{t\+1\}\b is tricky with symbols.
                
                # Simply replace occurrences of the literal string with $string$
                # But we ensure we don't double wrap $$...$$?
                # We already split by $, so we are in text mode. There are NO $ here.
                # EXCEPT escaped \$.
                # So if we see S_{t+1}, it is definitely un-math-ed.
                
                # One catch: \begin{equation} S_{t+1} \end{equation}
                # This chunk analysis ignores environment boundaries.
                # If we are inside \begin{equation}, we are in math mode, but split comments says "Text mode".
                # Standard split('$') implies inline math toggles.
                # Display math $$...$$ gives empty text chunk between $$ and $$.
                # \begin{equation} does NOT use $.
                # So "Text" chunks might technically be Math environments.
                
                # If we wrap $S_{t+1}$ inside \begin{equation}, it breaks: \begin{equation} $S_{t+1}$ \end{equation} => Bad.
                
                # So we must verify we are NOT in a math environment.
                # Naive check: does chunk contain \begin{equation} or \[?
                # If yes, risk is high.
                
                # However, the audit output specifically said "Text Mode Underscore".
                # And context: "Reliability at scale... decision P_{sample} for any given..."
                # This is prose.
                # "S_{t+1} = f(S_t...)"
                # This looks like an equation but maybe inline?
                # Context showed it in diagnosis without surrounding tags.
                
                # Let's simple-replace these known culprits.
                # S_{t+1}, P_{sample}, etc. contain brackets {} which text mode hates? No, text mode allows {}.
                # But S_t has underscore. Text mode hates underscore.
                
                # We'll use string replacement.
                chunk = chunk.replace(var, f"${var}$")

            # 3. Escape lone underscores that are NOT part of the math vars we just fixed (which are now $...$)
            # Wait, if we replaced S_t with $S_t$, now chunk has $.
            # BUT we are inside a loop over original splits.
            # If we add $, we mess up the re-joining?
            # No, when we join clean_chunks with '$', the new $S_t$ becomes $ S_t $.
            # wait.
            # Original: "Text P_{sample} Text"
            # Split: ["Text P_{sample} Text"]
            # Modified: "Text $P_{sample}$ Text"
            # Join with $: "Text $P_{sample}$ Text"
            # usage: $ acts as delimiter.
            # If I introduce $ inside a chunk, it creates NEW math boundaries.
            # "Text $P_{sample}$ Text" -> Text (Math: P_{sample}) Text.
            # CORRECT.
            
            # BUT: fixing underscores.
            # "some_text" -> "some\_text"
            # If I do this AFTER wrapping vars, I need to ignore my new $...$ blocks.
            # This gets recursive.
            
            # Strategy:
            # 1. Escape underscores in \texttt first.
            # 2. Replace known math vars with PLACEHOLDER_MATH_VAR_1, etc.
            # 3. Replace remaining underscores with \_
            # 4. Restore placeholders as $VAR$.
            pass
            
            # Refined Loop for this chunk:
            
            # Step 1: textt
            chunk = re.sub(r'\\texttt\{([^\}]+)\}', escape_underscore_in_match, chunk)
            
            # Step 2: Hide known vars
            protected_map = {}
            p_idx = 0
            
            # Sort vars longest first
            sorted_vars = sorted(vars_to_math, key=len, reverse=True)
            
            for var in sorted_vars:
                if var in chunk:
                    token = f"__MATH_VAR_{p_idx}__"
                    protected_map[token] = f"${var}$"
                    chunk = chunk.replace(var, token)
                    p_idx += 1

            # Step 3: Hide environments (equation, align, etc) in this chunk?
            # If chunk contains \begin{equation}, we should NOT escape underscores inside it.
            # Regex for environments?
            # This is getting complex for a simple script.
            # But essential.
            
            env_pattern = re.compile(r'(\\begin\{([a-z\*]+)\}.*?\\end\{\2\})', re.DOTALL)
            
            def protect_env(m):
                # Don't escape underscores inside environments
                return m.group(0).replace('_', 'TEMP_US') 
                # Wait, if I replace _ with TEMP_US, step 4 won't touch it.
                # Then I revert TEMP_US to _ at the end.
            
            chunk = env_pattern.sub(protect_env, chunk)

            # Step 4: textit/text with underscore
            # \textit{foo_bar} -> \textit{foo\_bar}
            # \text{foo_bar} -> \text{foo\_bar}
            def fix_inner_underscore(m):
                return m.group(0).replace('_', r'\_')
            
            chunk = re.sub(r'\\text(bf|it|tt)?\{[^\}]+\}', lambda m: m.group(0).replace('_', r'\_'), chunk)
            
            # Step 5: Remaining loose underscores
            # "some_file" -> "some\_file"
            # "TEMP_US" should be ignored (it's environment underscore)
            # "__MATH_VAR__" ignored.
            # "TEMP_DOLLAR" ignored.
            
            # Replace _ that is NOT part of a protection token?
            # Tokens use _ but we can choose tokens without _.
            # Too late.
            # Regex negative lookaround?
            
            # Simpler: Split by whitespace?
            # Or just replace _ with \_ unless it looks like a token?
            # My tokens: __MATH_VAR_...
            # The _ inside token is specific. 
            # I can rely on protecting tokens first.
            
            tokens_to_protect = list(protected_map.keys()) + ["TEMP_DOLLAR", "TEMP_US"]
            # Actually I haven't implemented TEMP_DOLLAR in this script proper, just thought experiment.
            
            # Let's perform the underscore escape carefully.
            # Iterate through string. If we match a token, skip it. If we match _, escape it.
            
            # Helper to find tokens
            def tokenize(text):
                # patterns
                # We need to find locations of tokens vs underscores
                # Re-construct string
                return text.replace('_', r'\_') # NAIVE

            # This approach is too fragile for "fix_latex_syntax_final.py".
            # I will use the "Targeted Replacement" approach simple and stupid.
            
            # RESTART CHUNK LOGIC
            # 1. \texttt fix (Safe)
            chunk = re.sub(r'\\texttt\{([^\}]+)\}', escape_underscore_in_match, chunk)
            
            # 2. Known Vars -> Wrapped in $
            for var in sorted_vars:
                # Use a unique placeholder that doesn't contain _
                token = f"MATHVAR{p_idx}X"
                if var in chunk:
                    protected_map[token] = f"${var}$"
                    chunk = chunk.replace(var, token)
                    p_idx += 1
            
            # 3. Protect Environments (replace _ with placeholder)
            chunk = env_pattern.sub(lambda m: m.group(0).replace('_', 'ENVUNDERSCORE'), chunk)
            
            # 4. Escape remaining _
            chunk = chunk.replace('_', r'\_')
            
            # 5. Restore Environments
            chunk = chunk.replace('ENVUNDERSCORE', '_')
            
            # 6. Restore Math Vars
            for token, replacement in protected_map.items():
                chunk = chunk.replace(token, replacement)
        
        new_chunks.append(chunk)

    final_content = '$'.join(new_chunks)
    
    # 4. Fix Brace Mismatches (Specific known fixes)
    # A4: \text{Compliance}(S_{infra}) -> $\text{Compliance}(S_{infra})$
    # We hopefully handled S_{infra} above.
    # But \text{Compliance} is fine.
    
    # A4: \bigwedge}{r \in ... -> \bigwedge_{r \in ...
    final_content = final_content.replace(r'\bigwedge}{', r'\bigwedge_{')
    
    # A5: T}{p99} -> T_{p99}
    final_content = final_content.replace(r'T}{p99}', r'T_{p99}')

    # A6: 1/f\_{loop} -> 1/f_{loop} 
    # If my script escaped the _ inside \_{loop} because it wasn't matched as f_{loop}
    # (Note: f_{loop} is in my list).
    
    # Generic fix for "}{" pattern which implies corrupt subscript
    # e.g. \sum}{i=1}
    # regex: \}?\{?
    final_content = re.sub(r'\\([a-zA-Z]+)\}\{', r'\\\1_{', final_content)

    if final_content != original:
        print(f"Fixed syntax in {file_path}")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(final_content)

def main():
    root_dir = r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers"
    subdirs = ["A1", "A2", "A3", "A4", "A5", "A6", "ARCH"]
    
    for subd in subdirs:
        path = os.path.join(root_dir, subd, "main.tex")
        if os.path.exists(path):
            fix_syntax(path)

if __name__ == "__main__":
    main()
