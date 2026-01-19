import os
import re

PAPERS = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"]
THRESHOLDS = {
    "A1": 3500, "A2": 5000, "A3": 5000, "A4": 5000, "A5": 5000, "A6": 7000, "AECP": 8000, "ARCH": 5000
}

UNICODE_MAP = {
    u"\u2014": "---", # em-dash
    u"\u2013": "--",  # en-dash
    u"\u2018": "'",   # left single quote
    u"\u2019": "'",   # right single quote
    u"\u201c": "``",  # left double quote
    u"\u201d": "''",  # right double quote
    u"\u2026": r"\dots", # ellipsis
}

REPLACEMENTS = {
    r"governancemeaning": "governance (meaning",
    r"lineswhile": "lines while",
    r"200msand": "200ms and",
    r"exhaustionit's": "exhaustion---it's",
    r"us-east-1it": "us-east-1---it",
    r"climbingand": "climbing---and",
    r"highcardinality": "high cardinality",
    r"breaksat": "breaks at",
    r"a-class": "first-class",
    r"nodesadding": "nodes---adding",
    r"coordinatednot": "coordinated---not",
    r"throughputnot": "throughput---not",
    r"computationlimits": "computation---limits",
    r"failuresduring": "failures---during",
    r"consensusadds": "consensus adds",
    r"errorsindicates": "errors---indicates",
    r"resourceexhaustionit": "resource exhaustion---it",
    r"coordinationoverheadnot": "coordination overhead---not",
    r"coordination overheadnot": "coordination overhead---not",
    r"nodesactually": "nodes---actually",
    r"RPSadding": "RPS---adding",
    r"RPSbeyond": "RPS---beyond",
    r"itpropagates": "it propagates",
    r"doesn'tstay": "doesn't stay",
    r"doesnustay": "doesn't stay",
    r"IsolationControl": "Isolation Control",
    r"Containmentfailure": "Containment failure",
    r"Executiongovernance": "Execution governance",
    r"patterns20-30%": "patterns (20-30%",
    r"latency20-30%": "latency (20-30%",
    r"failureinjection": "failure injection",
    r"architecturescontinuous": "architectures continuous",
    r"availabilityvalidate": "availability validate",
    r"requirementshigher": "requirements higher",
    r"saleshigher": "sales higher",
    r"outagesit": "outages---it",
    r"dependenciesit": "dependencies---it",
    r"100k+": "100,000+",
    r"poolDNS": "pool DNS",
    r"storagePostgreSQL": "storage PostgreSQL",
    r"documentedRTO": "documented RTO",
    r"applicableRaft": "applicable Raft",
    r"bundleWASM": "bundle WASM",
    r"regionDNS": "region DNS",
    r"overloadedCPU": "overloaded CPU",
    r"separationACL": "separation ACL",
    r"evaluationlatencysub-100s": "evaluation latency (sub-100s)",
}

def sanitize_text(text):
    # 1. Pre-ASCII Map Unicode
    for u_char, latex in UNICODE_MAP.items():
        text = text.replace(u_char, latex)
    
    # 2. Fix TEMP_US legacy
    text = text.replace("TEMP_US", r"\_")
    
    # 3. Apply hardcoded replacements
    for old, new in REPLACEMENTS.items():
        text = text.replace(old, new)
        
    # 4. ASCII Purge
    text = text.encode("ascii", "ignore").decode("ascii")
    
    return text

def fix_math_mode(content):
    # Fix \$X^Y$ patterns (escaped dollar starting math)
    content = re.sub(r'\\\$([0-9a-zA-Z^_{}\\]+)\$', r'$\1$', content)
    
    # Fix X^Y outside math mode (common in these papers)
    # Match numbers or variables followed by ^ and digits/braces
    content = re.sub(r'(?<!\$)([0-9a-zA-Z]+(?:\.[0-9]+)?(?:\s*[x*]\s*)?10\^\{?[0-9]+\}?)(\s+|$|[.,;])', r'$\1$\2', content)
    
    # Fix double backslash before underscore in math
    content = re.sub(r'\\([a-zA-Z]+)\\\\_([a-zA-Z]+)', r'\1_{\2}', content)
    
    # Fix specific A3 math errors
    content = content.replace(r"P_{\text{sample}(t)", r"P_{\text{sample}}(t)")
    content = content.replace(r"R\_{base}", r"R_{base}")
    content = content.replace(r"C\\_{total}", r"C_{total}")
    content = content.replace(r"P_{\text{anomaly} ]", r"P_{\text{anomaly}}]")
    
    # Fix \_\_\_MATH\_VAR\_0\_\_\_ placeholders
    content = content.replace(r"\_\_\_MATH\_VAR\_0\_\_\_", r"$R_{base}$")
    
    # Fix RPS beyond 100k (e.g. 10^12)
    content = re.sub(r'10\^12', r'$10^{12}$', content)
    
    return content

def fix_broken_lists(content):
    # Fix YAML-like structures that got wrapped in itemize but broken
    # Pattern: \item name: ... \end{itemize} \n type: ...
    # We'll just try to merge them back or at least fix the \end{itemize} placement
    content = re.sub(r'(\\item\s+name:.*?)\\end\{itemize\}\s+(type:)', r'\1\n    \2', content, flags=re.DOTALL)
    # Ensure there's a trailing \end{itemize} if we removed one
    # This is risky, but let's try a simpler fix for the known block in A3
    return content

def fix_acm_compliance(content, paper_id):
    # Bibliography fix
    # Bibliography fix - only add if missing
    if r"\bibliography{refs}" not in content:
        content = content.replace(r"\bibliography{refs", r"\bibliography{refs}")
    
    # IEEE macros in acmart
    if "acmart" in content:
        content = content.replace(r"\IEEEauthorblockN", r"\author")
        content = content.replace(r"\IEEEauthorblockA", r"\affiliation")
        # Remove \maketitle duplicates
        content = re.sub(r'(\\maketitle\s*){2,}', r'\1', content)
    
    # Keywords fix - keep both if possible, or use \keywords for ACM
    if r"\begin{IEEEkeywords}" in content:
        # If it's acmart, we want \keywords. If it's IEEEtran, we want IEEEkeywords.
        # For dual-readiness, we can leave both if they don't conflict, 
        # but acmart doesn't like \begin{IEEEkeywords}.
        # Strategy: Ensure \keywords exists, and keep IEEEkeywords for the auditor/IEEE build.
        if r"\keywords{" not in content:
            keywords_match = re.search(r'\\begin\{IEEEkeywords\}(.*?)\\end\{IEEEkeywords\}', content, re.DOTALL)
            if keywords_match:
                content = content.replace(r"\begin{document}", f"\\keywords{{{keywords_match.group(1).strip()}}}\n\\begin{{document}}")
    
    return content

def process_file(paper_id):
    path = os.path.join("papers", paper_id, "main.tex")
    if not os.path.exists(path):
        return
    
    print(f"Processing {paper_id}...")
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    content = sanitize_text(content)
    content = fix_math_mode(content)
    content = fix_broken_lists(content)
    content = fix_acm_compliance(content, paper_id)
    
    # Expansion Gate Check
    import re as word_re
    clean_text = re.sub(r'\\begin\{verbatim\}.*?\\end\{verbatim\}', '', content, flags=re.DOTALL)
    clean_text = re.sub(r'\\[a-zA-Z]+(?:\[[^\]]*\])?(?:\{[^}]*\})?', '', clean_text)
    word_count = len(word_re.findall(r'\b\w+\b', clean_text))
    
    # Remove old gate headers
    content = re.sub(r'% PUBLICATION_READINESS_GATE.*?% STATUS: [A-Z_]+\n', '', content, flags=re.DOTALL)
    
    header = f"% PUBLICATION_READINESS_GATE\n% Word Count: {word_count}\n% Threshold: {THRESHOLDS[paper_id]}\n"
    if word_count < THRESHOLDS[paper_id]:
        header += f"% STATUS: FAIL_LENGTH (Needs ~{THRESHOLDS[paper_id] - word_count} more words)\n"
    else:
        header += "% STATUS: PASS_LENGTH\n"
    
    content = header + content

    with open(path, 'w', encoding='ascii') as f:
        f.write(content)

if __name__ == "__main__":
    for pid in PAPERS:
        process_file(pid)
    print("Done.")
