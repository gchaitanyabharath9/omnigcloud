# Canonical LaTeX Build Documentation

This repository uses a **Single Source of Truth** for technical papers. All technical content is managed in the `/papers-canonical/` directory, while venue-specific formatting is handled by thin wrapper files in `/renderers/`.

## Directory Structure

- `/papers-canonical/`: Contains `.tex` files for each paper (A1-A6, AECP, Scholarly Article) and a shared `references.bib`.
- `/renderers/`: Contains wrapper files for specific venues:
  - `ieee.tex`: IEEE Conference format.
  - `acm.tex`: ACM SIGCONF format.
  - `arxiv.tex`: Generic scholarly article format for arXiv.
- `/build/`: Temporary directory for LaTeX compilation artifacts.
- `/publication-pdfs-latex/`: Final generated PDF files.

## Prerequisites

To build the PDFs locally, you need a LaTeX distribution installed on your Windows machine:

- **MiKTeX** (recommended for Windows): [miktex.org](https://miktex.org/)
- **TeX Live**: [tug.org/texlive](https://tug.org/texlive/)
- Ensure `pdflatex` and `bibtex` are in your system's `PATH`.

## How to Build

Run the included PowerShell script from the root of the repository:

```powershell
./build-all.ps1
```

The script will:

1. Initialize the build and output directories.
2. For each paper and venue combination:
   - Generate a temporary driver file.
   - Run `pdflatex` to compile the document.
   - Move the final PDF to `/publication-pdfs-latex/`.

## Customizing Papers

To modify the content of a paper, edit the corresponding `.tex` file in `/papers-canonical/`. The changes will propagate to the IEEE, ACM, and arXiv versions automatically upon the next build.

## LaTeX Commands

Each canonical paper file uses a metadata toggle to separate preamble commands from the main content:

```latex
% Preamble / Metadata
\newcommand{\PaperTitle}{...}
\newcommand{\PaperAbstract}{...}

\ifdefined\PaperMetadataOnly\else
% Body Content
\section{Introduction}
...
\fi
```

This allows the wrappers to load metadata first to set up the `\title` and `\author` blocks before beginning the `document` environment.
