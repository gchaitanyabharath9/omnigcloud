import os
import re
from pathlib import Path

PAPERS_DIR = Path(r"c:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers")
PAPERS = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"]

def fix_paper(paper_name):
    paper_dir = PAPERS_DIR / paper_name
    tex_file = paper_dir / "main.tex"
    if not tex_file.exists(): return
    
    content = tex_file.read_text(encoding="utf-8")
    
    # 1. RESET VERBATIM (Undo previous mess)
    # Replace \begin{verbatim} -> \texttt{`}python
    # Replace \end{verbatim} -> \texttt{`}
    # This is an approximation to get back to "source" state
    content = content.replace(r"\begin{verbatim}", r"\texttt{`}python")
    content = content.replace(r"\end{verbatim}", r"\texttt{`}")
    
    # 2. SMART VERBATIM
    # We walk through the content.
    # We look for \texttt{`} ...
    # If it is followed by python/bash, it's a START.
    # If it is just \texttt{`}, it is a TOGGLE.
    
    # But regex replace is hard for toggles. Let's do line by line or tokenizing?
    # Token matching approach:
    new_chunks = []
    last_pos = 0
    in_block = False
    
    # Find all \texttt{`}(something)?
    # Pattern: \\texttt\{`\}([a-zA-Z0-9]*)
    iter = re.finditer(r"\\texttt\{`\}([a-zA-Z0-9]*)", content)
    
    for match in iter:
        # Append text before match
        new_chunks.append(content[last_pos:match.start()])
        
        suffix = match.group(1) # e.g. "python"
        
        if suffix:
            # \texttt{`}python -> ALWAYS Start
            new_chunks.append(r"\begin{verbatim}")
            in_block = True
        else:
            # \texttt{`} -> Toggle
            if in_block:
                new_chunks.append(r"\end{verbatim}")
                in_block = False
            else:
                new_chunks.append(r"\begin{verbatim}")
                in_block = True
                
        last_pos = match.end()
        
    new_chunks.append(content[last_pos:])
    content = "".join(new_chunks)
    
    # 3. ESCAPE UNDERSCORES (Common "Missing $" cause)
    # We must NOT escape underscores in:
    # - Math mode ($...$, \[...\], $$...$$)
    # - Verbatim mode (\begin{verbatim}...\end{verbatim})
    # - URLs/Includegraphics? (Usually handled by packages, but safer to ignore)
    # - Commands (\foo_bar is invalid tex anyway, usually \foo)
    
    # This is complex. simple heuristic:
    # Split by verbatim blocks.
    # Inside non-verbatim, split by $.
    # Inside non-math non-verbatim, escape _.
    
    # Let's try to protect verbatim segments first
    # We placeholder them
    verbatim_map = {}
    def save_verb(m):
        k = f"__VERB{len(verbatim_map)}__"
        verbatim_map[k] = m.group(0)
        return k
        
    content = re.sub(r"\\begin\{verbatim\}.*?\\end\{verbatim\}", save_verb, content, flags=re.DOTALL)
    
    # Now protect Math
    math_map = {}
    def save_math(m):
        k = f"__MATH{len(math_map)}__"
        math_map[k] = m.group(0)
        return k
        
    # Inline $...$ (careful with escaped \$)
    content = re.sub(r"(?<!\\)\$(?:\\.|[^$])+\$", save_math, content)
    # Display \[...\] or $$...$$
    content = re.sub(r"\\\[.*?\\\]", save_math, content, flags=re.DOTALL)
    content = re.sub(r"\$\$.*?\$\$", save_math, content, flags=re.DOTALL)
    
    # Now valid urls?
    # \url{...} or \href{...}
    # content = re.sub(r"\\url\{[^}]+\}", save_math, content) 
    
    # FIX UNDERSCORES in remaining text
    # e.g. us_east_1 -> us\_east\_1
    # also ^ -> \^
    content = re.sub(r"(?<!\\)_", r"\\_", content)
    content = re.sub(r"(?<!\\)\^", r"\\^", content)
    
    # RESTORE
    # Restore Math
    for k, v in reversed(math_map.items()):
        content = content.replace(k, v)
        
    # Restore Verbatim
    for k, v in reversed(verbatim_map.items()):
        content = content.replace(k, v)
        
    # 4. FIX A5/AECP Missing Figures (Wait, script already did replacement? Check duplication)
    # If we see \includegraphics..., we leave it (script did it or checked it).
    # But if text has "MISSING FIGURE", we might want to ensure it compiles.
    # \fbox is standard, should work.
    
    tex_file.write_text(content, encoding="utf-8")
    print(f"Fixed {paper_name}")

for p in PAPERS:
    fix_paper(p)
