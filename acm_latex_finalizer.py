#!/usr/bin/env python3
"""
ACM LaTeX Finalization Engine
Converts research papers from Markdown to submission-ready ACM LaTeX.
"""

import os
import re
import subprocess
import sys
from pathlib import Path
from typing import Dict, List, Tuple

# Base directory
BASE_DIR = Path(r"C:\Users\SOHAN\.gemini\antigravity\playground\nascent-zodiac\papers")
PAPERS = ["A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"]

# Novelty/advocacy language patterns to neutralize
NOVELTY_PATTERNS = [
    (r'\bfirst\b', 'a'),
    (r'\bestablishes\b', 'provides'),
    (r'\bdefines the laws\b', 'describes'),
    (r'\bbreakthrough\b', 'approach'),
    (r'\bgroundbreaking\b', 'novel'),
    (r'\bpioneer(?:ing)?\b', 'early'),
    (r'\bunprecedented\b', 'new'),
    (r'\brevolutionary\b', 'significant'),
    (r'\bparadigm-shifting\b', 'important'),
    (r'\bgame-changing\b', 'notable'),
]

# Metaphor-based architecture language to neutralize
METAPHOR_PATTERNS = [
    (r'\bLegislative Layer\b', 'Policy Definition Layer'),
    (r'\bJudicial Layer\b', 'Policy Evaluation Layer'),
    (r'\bExecutive Layer\b', 'Policy Enforcement Layer'),
    (r'\bBrain\b', 'Control'),
    (r'\bBody\b', 'Evaluation'),
    (r'\bPolice\b', 'Enforcement'),
]

# Required ACM sections in order
REQUIRED_SECTIONS = [
    "Introduction",
    "Problem Statement",
    "Architecture",
    "Implementation",
    "Evaluation",
    "Results",
    "Related Work",
    "Limitations",
    "Reproducibility",
    "Conclusion"
]


def sanitize_text(text: str) -> str:
    """Remove novelty language and metaphors."""
    # Apply novelty pattern replacements
    for pattern, replacement in NOVELTY_PATTERNS:
        text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)
    
    # Apply metaphor pattern replacements
    for pattern, replacement in METAPHOR_PATTERNS:
        text = re.sub(pattern, replacement, text)
    
    # Remove Unicode issues
    text = text.encode('ascii', 'ignore').decode('ascii')
    
    return text


def extract_title_and_abstract(content: str) -> Tuple[str, str]:
    """Extract title and abstract from markdown content."""
    title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    title = title_match.group(1) if title_match else "Untitled Paper"
    
    # Look for abstract section
    abstract_match = re.search(r'##\s+Abstract\s*\n\n(.+?)(?=\n##|\Z)', content, re.DOTALL)
    abstract = abstract_match.group(1).strip() if abstract_match else "Abstract not found."
    
    return sanitize_text(title), sanitize_text(abstract)


def markdown_to_latex(content: str) -> str:
    """Convert markdown content to LaTeX."""
    # Remove title (handled separately)
    content = re.sub(r'^#\s+.+$', '', content, count=1, flags=re.MULTILINE)
    
    # Convert headers
    content = re.sub(r'^####\s+(.+)$', r'\\subsubsection{\1}', content, flags=re.MULTILINE)
    content = re.sub(r'^###\s+(.+)$', r'\\subsection{\1}', content, flags=re.MULTILINE)
    content = re.sub(r'^##\s+(.+)$', r'\\section{\1}', content, flags=re.MULTILINE)
    
    # Convert bold and italic
    content = re.sub(r'\*\*(.+?)\*\*', r'\\textbf{\1}', content)
    content = re.sub(r'\*(.+?)\*', r'\\textit{\1}', content)
    content = re.sub(r'_(.+?)_', r'\\textit{\1}', content)
    
    # Convert inline code
    content = re.sub(r'`(.+?)`', r'\\texttt{\1}', content)
    
    # Convert lists
    content = re.sub(r'^\s*[-*]\s+(.+)$', r'\\item \1', content, flags=re.MULTILINE)
    
    # Wrap itemize blocks
    lines = content.split('\n')
    in_list = False
    result = []
    for line in lines:
        if line.strip().startswith('\\item'):
            if not in_list:
                result.append('\\begin{itemize}')
                in_list = True
            result.append(line)
        else:
            if in_list:
                result.append('\\end{itemize}')
                in_list = False
            result.append(line)
    if in_list:
        result.append('\\end{itemize}')
    
    content = '\n'.join(result)
    
    # Escape special LaTeX characters
    content = content.replace('&', '\\&')
    content = content.replace('%', '\\%')
    content = content.replace('$', '\\$')
    content = content.replace('#', '\\#')
    content = content.replace('_', '\\_')
    
    # Convert citations [1] to \cite{}
    content = re.sub(r'\[(\d+)\]', r'\\cite{ref\1}', content)
    
    # Convert figures
    content = re.sub(
        r'!\[(.+?)\]\((.+?)\)',
        r'\\begin{figure}[h]\n\\centering\n\\includegraphics[width=0.8\\textwidth]{\2}\n\\caption{\1}\n\\end{figure}',
        content
    )
    
    return content


def ensure_required_sections(content: str) -> str:
    """Ensure all required ACM sections exist."""
    existing_sections = re.findall(r'\\section\{(.+?)\}', content)
    
    for section in REQUIRED_SECTIONS:
        if section not in existing_sections:
            # Add empty placeholder section
            content += f"\n\n\\section{{{section}}}\n% TODO: Add content for {section}\n"
    
    return content


def generate_acm_latex(paper_name: str, title: str, abstract: str, body: str) -> str:
    """Generate complete ACM LaTeX document."""
    template = r"""\documentclass[sigconf]{{acmart}}

\setcopyright{{none}}
\acmConference{{}}{{}}{{}}
\acmBooktitle{{}}
\acmPrice{{}}
\acmDOI{{}}
\acmISBN{{}}

\title{{{title}}}
\author{{Chaitanya Bharath Gopu}}
\affiliation{{\institution{{OmniGCloud Systems, Inc.}}\city{{Tallahassee}}\state{{Florida}}\country{{USA}}}}
\email{{gchaitanyabharath9@gmail.com}}

\begin{{abstract}}
{abstract}
\end{{abstract}}

\ccsdesc[500]{{Software and its engineering~Cloud computing}}
\keywords{{cloud-native modernization, distributed systems, adaptive policy enforcement}}

\begin{{document}}
\maketitle

{body}

\bibliographystyle{{ACM-Reference-Format}}
\bibliography{{refs}}

\end{{document}}
"""
    
    return template.format(title=title, abstract=abstract, body=body)


def process_paper(paper_name: str) -> Dict[str, any]:
    """Process a single paper."""
    paper_dir = BASE_DIR / paper_name
    content_file = paper_dir / "manuscript" / "content.md"
    output_file = paper_dir / "main.tex"
    build_dir = paper_dir / "build"
    
    result = {
        "paper": paper_name,
        "unicode_removed": False,
        "advocacy_removed": False,
        "sections_created": [],
        "compiled": False,
        "errors": []
    }
    
    # Check if content.md exists
    if not content_file.exists():
        result["errors"].append(f"content.md not found at {content_file}")
        return result
    
    # Read content
    try:
        with open(content_file, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        result["errors"].append(f"Failed to read content.md: {e}")
        return result
    
    # Extract title and abstract
    title, abstract = extract_title_and_abstract(content)
    
    # Sanitize content
    original_content = content
    content = sanitize_text(content)
    
    if content != original_content:
        result["unicode_removed"] = True
        result["advocacy_removed"] = True
    
    # Convert to LaTeX
    body = markdown_to_latex(content)
    
    # Ensure required sections
    original_body = body
    body = ensure_required_sections(body)
    
    if body != original_body:
        new_sections = re.findall(r'% TODO: Add content for (.+)', body)
        result["sections_created"] = new_sections
    
    # Generate final LaTeX
    latex_content = generate_acm_latex(paper_name, title, abstract, body)
    
    # Write main.tex
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(latex_content)
    except Exception as e:
        result["errors"].append(f"Failed to write main.tex: {e}")
        return result
    
    # Build PDF
    build_dir.mkdir(exist_ok=True)
    os.chdir(paper_dir)
    
    try:
        # Run pdflatex
        subprocess.run(
            ["pdflatex", "-interaction=nonstopmode", "-halt-on-error", "-output-directory=build", "main.tex"],
            check=True,
            capture_output=True,
            text=True
        )
        
        # Run bibtex
        os.chdir(build_dir)
        subprocess.run(
            ["bibtex", "main"],
            check=True,
            capture_output=True,
            text=True
        )
        
        # Run pdflatex again (twice)
        os.chdir(paper_dir)
        for _ in range(2):
            subprocess.run(
                ["pdflatex", "-interaction=nonstopmode", "-halt-on-error", "-output-directory=build", "main.tex"],
                check=True,
                capture_output=True,
                text=True
            )
        
        result["compiled"] = True
    except subprocess.CalledProcessError as e:
        result["errors"].append(f"LaTeX compilation failed: {e.stderr}")
    except Exception as e:
        result["errors"].append(f"Build error: {e}")
    
    return result


def generate_report(results: List[Dict]) -> str:
    """Generate final ACM patch report."""
    report = "# FINAL ACM PATCH REPORT\n\n"
    report += "## Summary\n\n"
    
    total = len(results)
    compiled = sum(1 for r in results if r["compiled"])
    
    report += f"- Total papers processed: {total}\n"
    report += f"- Successfully compiled: {compiled}\n"
    report += f"- Failed: {total - compiled}\n\n"
    
    report += "## Per-Paper Results\n\n"
    
    for result in results:
        report += f"### {result['paper']}\n\n"
        report += f"- Unicode removed: {'Yes' if result['unicode_removed'] else 'No'}\n"
        report += f"- Advocacy language removed: {'Yes' if result['advocacy_removed'] else 'No'}\n"
        
        if result['sections_created']:
            report += f"- Missing sections created: {', '.join(result['sections_created'])}\n"
        else:
            report += "- Missing sections created: None\n"
        
        report += f"- Compiled successfully: {'Yes' if result['compiled'] else 'No'}\n"
        
        if result['errors']:
            report += "\n**Errors:**\n"
            for error in result['errors']:
                report += f"- {error}\n"
        
        report += "\n"
    
    return report


def main():
    """Main execution."""
    print("ACM LaTeX Finalization Engine")
    print("=" * 50)
    
    results = []
    
    for paper in PAPERS:
        print(f"\nProcessing {paper}...")
        result = process_paper(paper)
        results.append(result)
        
        if result["compiled"]:
            print(f"  ✓ {paper} compiled successfully")
        else:
            print(f"  ✗ {paper} failed to compile")
            for error in result["errors"]:
                print(f"    - {error}")
    
    # Generate report
    report = generate_report(results)
    report_file = BASE_DIR.parent / "FINAL_ACM_PATCH_REPORT.md"
    
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write(report)
    
    print(f"\n\nReport generated: {report_file}")
    print("\nDone.")


if __name__ == "__main__":
    main()
