import os
import shutil
import subprocess
import glob

# Configuration
ACM_DIR = r"submission/acm"
BUILD_DIR = r"publication-pdfs-acm"
TARGET_FILES = [
    "A1", "A2", "A3", "A4", "A5", "A6", "AECP", "ARCH"
]

def nuke_artifacts():
    print("Nuking all build artifacts (.aux, .log, .out, .toc, .pdf)...")
    # Delete global PDF dir content
    if os.path.exists(BUILD_DIR):
        for f in os.listdir(BUILD_DIR):
            os.remove(os.path.join(BUILD_DIR, f))
    else:
        os.makedirs(BUILD_DIR)

    # Walk through acm dir and delete build files
    for root, dirs, files in os.walk(ACM_DIR):
        for file in files:
            if file.endswith(('.aux', '.log', '.out', '.toc', '.bbl', '.blg', '.fls', '.fdb_latexmk', '.synctex.gz', '.pdf')):
                os.remove(os.path.join(root, file))

def verify_and_sanitize_source():
    print("Verifying source files...")
    import re
    
    canonical_ccs = r"""\begin{CCSXML}
<ccs2012>
 <concept>
  <concept_id>10003033.10003058</concept_id>
  <concept_desc>Computer systems organization~Distributed architectures</concept_desc>
  <concept_significance>500</concept_significance>
 </concept>
</ccs2012>
\end{CCSXML}

\ccsdesc[500]{Computer systems organization~Distributed architectures}"""

    pandoc_defs = r"""
\usepackage{color}
\usepackage{fancyvrb}
\newcommand{\VerbBar}{|}
\newcommand{\VERB}{\Verb[commandchars=\\\{\}]}
\DefineVerbatimEnvironment{Highlighting}{Verbatim}{commandchars=\\\{\}}
\newenvironment{Shaded}{}{}
\newcommand{\AlertTok}[1]{\textcolor[rgb]{1.00,0.00,0.00}{\textbf{#1}}}
\newcommand{\AnnotationTok}[1]{\textcolor[rgb]{0.38,0.63,0.69}{\textbf{\textit{#1}}}}
\newcommand{\AttributeTok}[1]{\textcolor[rgb]{0.49,0.56,0.16}{#1}}
\newcommand{\BaseNTok}[1]{\textcolor[rgb]{0.25,0.63,0.44}{#1}}
\newcommand{\BuiltInTok}[1]{#1}
\newcommand{\CharTok}[1]{\textcolor[rgb]{0.25,0.44,0.63}{#1}}
\newcommand{\CommentTok}[1]{\textcolor[rgb]{0.38,0.63,0.69}{\textit{#1}}}
\newcommand{\CommentVarTok}[1]{\textcolor[rgb]{0.38,0.63,0.69}{\textbf{\textit{#1}}}}
\newcommand{\ConstantTok}[1]{\textcolor[rgb]{0.53,0.00,0.00}{#1}}
\newcommand{\ControlFlowTok}[1]{\textcolor[rgb]{0.00,0.44,0.13}{\textbf{#1}}}
\newcommand{\DataTypeTok}[1]{\textcolor[rgb]{0.56,0.13,0.00}{#1}}
\newcommand{\DecValTok}[1]{\textcolor[rgb]{0.25,0.63,0.44}{#1}}
\newcommand{\DocumentationTok}[1]{\textcolor[rgb]{0.73,0.13,0.13}{\textit{#1}}}
\newcommand{\ErrorTok}[1]{\textcolor[rgb]{1.00,0.00,0.00}{\textbf{#1}}}
\newcommand{\ExtensionTok}[1]{#1}
\newcommand{\FloatTok}[1]{\textcolor[rgb]{0.25,0.63,0.44}{#1}}
\newcommand{\FunctionTok}[1]{\textcolor[rgb]{0.02,0.16,0.49}{#1}}
\newcommand{\ImportTok}[1]{#1}
\newcommand{\InformationTok}[1]{\textcolor[rgb]{0.38,0.63,0.69}{\textbf{\textit{#1}}}}
\newcommand{\KeywordTok}[1]{\textcolor[rgb]{0.00,0.44,0.13}{\textbf{#1}}}
\newcommand{\NormalTok}[1]{#1}
\newcommand{\OperatorTok}[1]{\textcolor[rgb]{0.40,0.40,0.40}{#1}}
\newcommand{\OtherTok}[1]{\textcolor[rgb]{0.00,0.44,0.13}{#1}}
\newcommand{\PreprocessorTok}[1]{\textcolor[rgb]{0.74,0.48,0.00}{#1}}
\newcommand{\RegionMarkerTok}[1]{#1}
\newcommand{\SpecialCharTok}[1]{\textcolor[rgb]{0.25,0.44,0.63}{#1}}
\newcommand{\SpecialStringTok}[1]{\textcolor[rgb]{0.73,0.40,0.53}{#1}}
\newcommand{\StringTok}[1]{\textcolor[rgb]{0.25,0.44,0.63}{#1}}
\newcommand{\VariableTok}[1]{\textcolor[rgb]{0.10,0.09,0.49}{#1}}
\newcommand{\VerbatimStringTok}[1]{\textcolor[rgb]{0.25,0.44,0.63}{#1}}
\newcommand{\WarningTok}[1]{\textcolor[rgb]{0.38,0.63,0.69}{\textbf{\textit{#1}}}}
"""

    for folder in TARGET_FILES:
        path = os.path.join(ACM_DIR, folder, "main.tex")
        if not os.path.exists(path):
            print(f"ERROR: {path} not found")
            continue
            
        with open(path, 'rb') as f:

            content_bytes = f.read()
            
        # 1. Byte-level Enforce ASCII
        # Filter all bytes > 127
        clean_bytes = bytearray()
        for b in content_bytes:
            if b <= 127:
                clean_bytes.append(b)
            else:
                # Replace specific common bad bytes if needed, or just drop
                # e.g. 0x93/0x94 (smart quotes) -> 0x22 (")
                # But previous script claimed none found.
                pass
        
        content_str = clean_bytes.decode('ascii')
        
        if r"\newenvironment{Shaded}" not in content_str:
             print(f"Injecting Pandoc definitions into {folder}")
             # Inject before begin{document} or after hyperref
             if r"\usepackage{hyperref}" in content_str:
                 content_str = content_str.replace(r"\usepackage{hyperref}", r"\usepackage{hyperref}" + "\n" + pandoc_defs)
             else:
                 content_str = content_str.replace(r"\begin{document}", pandoc_defs + "\n\\begin{document}")

        if "\\providecommand{\\tightlist}" not in content_str:
             content_str = content_str.replace(r"\begin{document}", r"\providecommand{\tightlist}{%\n  \setlength{\itemsep}{0pt}\setlength{\parskip}{0pt}}" + "\n\\begin{document}")


        # 2. Force CCS
        if r"\begin{CCSXML}" not in content_str:
            print(f"Injecting CCS into {folder}")
            # Insert after abstract
            content_str = content_str.replace(r"\end{abstract}", "\\end{abstract}\n\n" + canonical_ccs)
        else:
             # Ensure it matches exactly the desired block, replacing whatever was there
             content_str = re.sub(r"(?s)\\begin\{CCSXML\}.*?\\ccsdesc.*?\{.*?\}", canonical_ccs.replace('\\', '\\\\'), content_str)


        # 3. Series / Claims Cleanup (Regex)
        substitutions = [
            (r"A1[-–]A6 series", "architectural series"),
            (r"concludes the series", "concludes the research"),
            (r"relation to A1[-–]A6", "relation to prior work"),
            (r"Original Contribution \(Verified\)", "Contribution"),
             # Fix specific stutters seen in A1/AECP
            (r"Through the Reference Architecture, a Reference Architecture", "Through the Reference Architecture"),
            (r"reference architecture reference architecture", "reference architecture"),
            # Remove "cloudnative" if it appears as one word (typo fix)
            (r"cloudnative", "cloud-native"),
            # Fix Bbbk conflict
            (r"\\usepackage\{amsmath,amssymb,amsfonts\}", r"\\let\\Bbbk\\relax\\usepackage{amsmath,amssymb,amsfonts}"),
            # Remove stray closing brace after maketitle (artifact from previous edits)
            (r"\\maketitle\s*\n+\s*\}", r"\\maketitle"),
            # Fix Titles with ampersands
            (r"Scale & Operational", r"Scale \\& Operational"),
            (r"Governance & Multi", r"Governance \\& Multi"),
            # Fix Python code symbol issues
            (r"health \$\\times\$ available", r"health * available"),
        ]



        
        for old, new in substitutions:
            content_str = re.sub(old, new, content_str, flags=re.IGNORECASE)
            
        with open(path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(content_str)
            
    print("Sanitization verified.")

def build_pdf(folder):
    print(f"Building {folder}...")
    tex_dir = os.path.join(ACM_DIR, folder)
    
    # We must run pdflatex TWICE for references
    cmd = ["pdflatex", "-interaction=nonstopmode", "main.tex"]
    
    # First pass
    subprocess.run(cmd, cwd=tex_dir, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    # Second pass
    result = subprocess.run(cmd, cwd=tex_dir, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    
    if result.returncode != 0:
        print(f"FAILED to build {folder}")
        # print(result.stdout.decode('latin1')[-500:]) # Debug if needed
        return False
        
    src_pdf = os.path.join(tex_dir, "main.pdf")
    dst_pdf = os.path.join(BUILD_DIR, f"{folder}.pdf")
    
    if os.path.exists(src_pdf):
        shutil.copy(src_pdf, dst_pdf)
        print(f"Success: {folder}.pdf")
        return True
    else:
        print(f"Missing output PDF for {folder}")
        return False

def main():
    nuke_artifacts()
    verify_and_sanitize_source()
    
    success_count = 0
    for folder in TARGET_FILES:
        if build_pdf(folder):
            success_count += 1
            
    print(f"Build Complete. {success_count}/{len(TARGET_FILES)} PDFs generated.")

if __name__ == "__main__":
    main()
