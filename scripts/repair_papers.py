import os
import re

def fix_verbatim_content(code):
    # Unescape common LaTeX escapes that shouldn't be in code blocks
    code = code.replace(r'\#', '#')
    code = code.replace(r'\%', '%')
    code = code.replace(r'\_', '_')
    code = code.replace(r'\&', '&')
    code = code.replace(r'\{', '{')
    code = code.replace(r'\}', '}')
    code = code.replace(r'\$', '$')
    code = code.replace(r'\^', '^')
    
    # Fix citations in code [0] -> \cite{ref0} -> [0]
    code = re.sub(r'\\cite\{ref(\d+)[^}]*\}', r'[\1]', code)
    # Fix the weird season}length thing
    code = code.replace('}length', '_length')
    # Restore TEMP_US just in case any remained
    code = code.replace('TEMP_US', '_')
    
    return code

def full_repair(content, pid):
    # 0. Fix common math delimiters and USL equation
    content = content.replace(r'\frac{N_{1 + \alpha (N-1) + \beta N (N-1)}', 
                              r'\frac{N}{1 + \alpha (N-1) + \beta N (N-1)}')
    
    # 1. Fix stray trailing braces - carefully
    # Check balance
    open_c = content.count('{')
    close_c = content.count('}')
    if close_c > open_c:
        # Remove a brace only if it is on its own line right before \end{document}
        content = re.sub(r'\n\s*\}\s*\n\s*\\end\{document\}', r'\n\\end{document}', content)
        # Or multiple ones
        content = re.sub(r'\}\s*\}\s*\\end\{document\}', r'\n\\end{document}', content)
    
    # 2. Handle verbatim blocks
    parts = re.split(r'(\\begin\{(?:verbatim|lstlisting)\}|\\end\{(?:verbatim|lstlisting)\})', content)
    sanitized_parts = []
    is_code = False
    for p in parts:
        if p.startswith(r'\begin{'):
            is_code = True
            sanitized_parts.append(p)
        elif p.startswith(r'\end{'):
            is_code = False
            sanitized_parts.append(p)
        else:
            if is_code:
                sanitized_parts.append(fix_verbatim_content(p))
            else:
                p = p.replace('TEMP_US', r'\_')
                replacements = {
                    r"governancemeaning": "governance (meaning",
                    r"lineswhile": "lines) while",
                    r"200msand": "200ms and",
                    r"exhaustionit's": "exhaustion---it's",
                    r"us-east-1it": "us-east-1---it",
                    r"climbingand": "climbing---and",
                    r"highcardinality": "high-cardinality",
                    r"breaksat": "breaks at",
                    r"nodesadding": "nodes---adding",
                    r"coordinatednot": "coordinated---not",
                    r"throughputnot": "throughput---not",
                    r"computationlimits": "computation---limits",
                    r"failuresduring": "failures---during",
                    r"consensusadds": "consensus adds",
                    r"errorsindicates": "errors---indicates",
                    r"resourceexhaustionit": "resource exhaustion---it",
                    r"coordinationoverheadnot": "coordin. overhead---not",
                    r"coordination overheadnot": "coordin. overhead---not",
                    r"nodesactually": "nodes---actually",
                    r"RPSadding": "RPS---adding",
                    r"RPSbeyond": "RPS---beyond",
                    r"itpropagates": "it propagates",
                    r"instancedegraded": "instance---degraded",
                    r"instancesthe": "instances---the",
                    r"monthsspikes": "months---spikes",
                    r"annualy": "annually",
                    r"engineersnot": "engineers---not",
                }
                for old, new in replacements.items():
                    p = p.replace(old, new)
                sanitized_parts.append(p)
    content = "".join(sanitized_parts)

    # 3. ACM CCSXML block
    if r'\ccsdesc' in content and r'\begin{CCSXML}' not in content:
        ccsxml = r"""\begin{CCSXML}
<ccs2012>
 <concept>
  <concept_id>10010520.10010521.10010537</concept_id>
  <concept_desc>Software and its engineering~Cloud computing</concept_desc>
  <concept_significance>500</concept_significance>
 </concept>
</ccs2012>
\end{CCSXML}
"""
        content = content.replace(r'\ccsdesc', ccsxml + r'\ccsdesc', 1)

    # 4. IEEE Keywords block
    if r'\keywords' in content and r'\begin{IEEEkeywords}' not in content:
        m = re.search(r'\\keywords\{(.*?)\}', content)
        if m:
            kws = m.group(1)
            ieeekws = f"\\begin{{IEEEkeywords}}\n{kws}\n\\end{{IEEEkeywords}}\n"
            content = content.replace(r'\keywords', ieeekws + r'\keywords', 1)

    # 5. Remove series dependency language
    content = content.replace("Relationship to A1-REF-STD Architectural Invariants: This paper operates as a direct extension of", 
                              "The following sections expand upon the foundational architectural invariants defined in")
    content = content.replace("The architecture builds on A1's plane separation and A2's throughput patterns",
                              "The proposed framework integrates with reference architectures for plane separation and high-throughput processing")
    content = content.replace("A2 is the formal execution of A1's performance mandates",
                              "This work operationalizes performance mandates within the defined reference architecture")
    content = content.replace("AECP is the machine that executes the requirements defined in A1",
                              "AECP serves as the operational engine for a-class governance within this architecture")

    # 6. Global ASCII normalization
    content = content.encode("ascii", "ignore").decode("ascii")
    
    return content

def report_status():
    paper_ids = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"]
    targets = {"A1": 3500, "A2": 5000, "A3": 5000, "A4": 5000, "A5": 5000, "A6": 7000, "AECP": 8000, "ARCH": 5000}
    final_report = []
    for pid in paper_ids:
        path = f"papers/{pid}/main.tex"
        if not os.path.exists(path): continue
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
        fixed = full_repair(content, pid)
        clean = re.sub(r'\\[a-zA-Z]+(\{.*?\})?', ' ', fixed)
        word_count = len(re.findall(r'\w+', clean))
        # Expansion marker
        if word_count < targets[pid]:
            marker = f"\n\n% LENGTH GATE WARNING: Short by ~{targets[pid]-word_count} words.\n% TODO: Expand section for publication.\n"
            fixed = fixed.replace(r"\section{Evaluation", marker + r"\section{Evaluation")
            if pid == "AECP": fixed = fixed.replace(r"\section{2.", marker + r"\section{2.")
        with open(path, "w", encoding="ascii") as f:
            f.write(fixed)
        final_report.append({"id": pid, "words": word_count, "target": targets[pid], "status": "PASS" if word_count >= targets[pid] else "SHORT"})
    print("| Paper | Words | Target | Status |")
    print("|-------|-------|--------|--------|")
    for r in final_report:
        print(f"| {r['id']} | {r['words']} | {r['target']} | {r['status']} |")

if __name__ == "__main__":
    report_status()
