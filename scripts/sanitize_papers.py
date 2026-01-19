import os
import re

def sanitize_content(content):
    # Fix TEMP_US
    # Inside verbatim/lstlisting blocks, TEMP_US -> _
    # Outside, TEMP_US -> \_
    
    blocks = re.split(r'(\\begin\{(?:verbatim|lstlisting)\}|\\end\{(?:verbatim|lstlisting)\})', content)
    new_parts = []
    is_code = False
    for p in blocks:
        if p.startswith(r'\begin{'):
            is_code = True
            new_parts.append(p)
        elif p.startswith(r'\end{'):
            is_code = False
            new_parts.append(p)
        else:
            if is_code:
                # In code, TEMP_US is _
                # Also restore citations that were likely [0] -> \cite{ref0}
                p = p.replace('TEMP_US', '_')
                p = re.sub(r'\\cite\{ref(\d+)\}', r'[\1]', p)
            else:
                p = p.replace('TEMP_US', r'\_')
            new_parts.append(p)
    content = "".join(new_parts)
    
    # Fix concatenated words (common patterns)
    replacements = {
        r"governancemeaning": "governance (meaning", # Based on A1 context
        r"lineswhile": "lines while",
        r"200msand": "200ms and",
        r"exhaustionit's": "exhaustion—it's",
        r"us-east-1it": "us-east-1—it",
        r"climbingand": "climbing—and",
        r"highcardinality": "high cardinality",
        r"breaksat": "breaks at",
        r"a-class": "first-class",
        r"nodesadding": "nodes—adding",
        r"coordinatednot": "coordinated—not",
        r"throughputnot": "throughput—not",
        r"computationlimits": "computation—limits",
        r"failuresduring": "failures—during",
        r"consensusadds": "consensus adds",
        r"errorsindicates": "errors—indicates",
        r"resourceexhaustionit": "resource exhaustion—it",
        r"coordinationoverheadnot": "coordination overhead—not",
        r"coordination overheadnot": "coordination overhead—not",
        r"nodesactually": "nodes—actually",
        r"RPSadding": "RPS—adding",
        r"RPSbeyond": "RPS—beyond",
    }
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    # Specific fix for A1 abstract (balancing paren)
    if "governance (meaning" in content and "lines while" in content:
        content = content.replace("geographic lines while", "geographic lines) while")

    # Purge Unicode characters (e.g., control chars, non-ASCII)
    content = content.encode("ascii", "ignore").decode("ascii")
    
    return content

def process_papers():
    paper_ids = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"]
    base_dir = "papers"
    report = []
    
    for pid in paper_ids:
        path = os.path.join(base_dir, pid, "main.tex")
        if not os.path.exists(path):
            continue
            
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
            
        sanitized, stats = audit_content(content, pid)
        
        # Write back sanitized content
        with open(path, "w", encoding="ascii") as f:
            f.write(sanitized)
            
        report.append({
            "id": pid,
            "word_count": stats["word_count"],
            "braces": stats["braces"],
            "dollars": stats["dollars"]
        })
        
    return report

def audit_content(content, pid):
    sanitized = sanitize_content(content)
    
    # Count words (rough estimate)
    # Remove LaTeX commands for better count
    clean_text = re.sub(r'\\[a-zA-Z]+(\{.*?\})?', ' ', sanitized)
    word_count = len(re.findall(r'\w+', clean_text))
    
    # Check braces
    open_curly = sanitized.count('{')
    close_curly = sanitized.count('}')
    dollar = sanitized.count('$')
    
    return sanitized, {
        "word_count": word_count,
        "braces": (open_curly, close_curly),
        "dollars": dollar
    }

if __name__ == "__main__":
    results = process_papers()
    print("| Paper | Word Count | Braces (O/C) | Dollars |")
    print("|-------|------------|--------------|---------|")
    for r in results:
        print(f"| {r['id']} | {r['word_count']} | {r['braces'][0]}/{r['braces'][1]} | {r['dollars']} |")
