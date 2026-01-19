import os
import re
import subprocess

PAPERS = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"]
THRESHOLDS = {
    "A1": 5000,
    "A2": 5000,
    "A3": 5000,
    "A4": 5000,
    "A5": 5000,
    "A6": 7000,
    "AECP": 8000,
    "ARCH": 5000
}

def clean_latex(content):
    # Remove comments
    content = re.sub(r'(?<!\\)%.*', '', content)
    # Remove some common commands but keep their content
    content = re.sub(r'\\(?:section|subsection|subsubsection|paragraph)\*?\{([^}]*)\}', r'\1', content)
    content = re.sub(r'\\(?:textit|textbf|texttt|emph)\{([^}]*)\}', r'\1', content)
    # Remove commands and their arguments that don't contribute to words
    content = re.sub(r'\\begin\{[^}]*\}.*?\\end\{[^}]*\}', '', content, flags=re.DOTALL)
    content = re.sub(r'\\[a-zA-Z]+(?:\[[^\]]*\])?(?:\{[^}]*\})?', '', content)
    # Remove math mode $...$ and \[...\]
    content = re.sub(r'\$.*?\$', '', content)
    content = re.sub(r'\\\[.*?\\\]', '', content, flags=re.DOTALL)
    return content

def get_word_count(content):
    clean = clean_latex(content)
    words = re.findall(r'\b\w+\b', clean)
    return len(words)

def perform_audit():
    report = {}
    for paper in PAPERS:
        path = os.path.join("papers", paper, "main.tex")
        if not os.path.exists(path):
            report[paper] = {"status": "MISSING"}
            continue
            
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            
        # STEP 1: Unicode Corruption
        unicode_found = any(ord(c) > 127 for c in content)
        
        # STEP 2: Abstract check
        abstract_match = re.search(r'\\begin\{abstract\}(.*?)\\end\{abstract\}', content, re.DOTALL)
        abstract_len = 0
        if abstract_match:
            abstract_text = abstract_match.group(1).strip()
            abstract_len = len(re.findall(r'\b\w+\b', abstract_text))
            
        # STEP 3: ACM Compliance
        acm_ccs = "\\begin{CCSXML}" in content and "\\ccsdesc" in content
        acm_class = "\\documentclass[sigconf]{acmart}" in content or "\\documentclass{acmart}" in content
        series_dep = re.search(r'A[1-6]|AECP|ARCH', content) # Rough check for dependencies
        # Refine series_dep to find actual "extends A1" or "builds on A2"
        series_dep_found = re.search(r'(extends|builds on|companion paper|reference architecture) A[1-6]', content, re.IGNORECASE)
        
        # STEP 4: IEEE Compliance
        ieee_keywords = "\\begin{IEEEkeywords}" in content
        ieee_class = "\\documentclass[conference]{IEEEtran}" in content
        
        # STEP 5: arXiv check
        arxiv_compatible = True # Placeholder for more complex checks
        
        # STEP 6: Word count
        word_count = get_word_count(content)
        
        # Compile status
        compile_status = "PASS"
        log_path = os.path.join("papers", paper, "main.log")
        if os.path.exists(log_path):
            with open(log_path, 'r', encoding='utf-8', errors='ignore') as log_f:
                log_content = log_f.read()
                if "Fatal error" in log_content or "Error:" in log_content:
                    compile_status = "FAIL"

        report[paper] = {
            "status": "OK",
            "compile_status": compile_status,
            "unicode_found": unicode_found,
            "acm_ccs": acm_ccs,
            "ieee_keywords": ieee_keywords,
            "arxiv_compatible": arxiv_compatible,
            "word_count": word_count,
            "abstract_word_count": abstract_len,
            "series_dep_found": bool(series_dep_found),
            "threshold": THRESHOLDS[paper]
        }
    return report

if __name__ == "__main__":
    audit_results = perform_audit()
    print("# Scholarly Readiness Audit Report\n")
    print("| Paper | Status | Unicode | ACM CCS | IEEE Key | Word Count | Threshold | Abstract | Series Dep |")
    print("|-------|--------|---------|---------|----------|------------|-----------|----------|------------|")
    for paper, data in audit_results.items():
        if data["status"] == "MISSING":
            print(f"| {paper} | MISSING | - | - | - | - | - | - | - |")
            continue
        print(f"| {paper} | {data['compile_status']} | {'YES' if data['unicode_found'] else 'NO'} | {'YES' if data['acm_ccs'] else 'NO'} | {'YES' if data['ieee_keywords'] else 'NO'} | {data['word_count']} | {data['threshold']} | {data['abstract_word_count']} | {'YES' if data['series_dep_found'] else 'NO'} |")
