# arXiv LaTeX Build Guide (Windows)

This document provides instructions for compiling the Technical Research Papers for arXiv using the provided automation scripts.

## Prerequisites

To run this build, you must have a LaTeX distribution installed on your Windows machine and available in your System PATH.

1.  **TeX Live (Recommended)**: [Download and Install TeX Live](https://www.tug.org/texlive/)
2.  **MiKTeX (Alternative)**: [Download and Install MiKTeX](https://miktex.org/)

Ensure that `pdflatex` and `bibtex` are accessible from your terminal:
```powershell
pdflatex --version
bibtex --version
```

## Compilation Command

Execute the following command from the root of the repository:

```powershell
powershell -ExecutionPolicy Bypass -File .\build\build-arxiv.ps1
```

## Build Process Details

The script performs the following steps for each paper:
1.  Creates an isolated build environment in `\build\<PaperID>\`.
2.  Copies the arXiv wrapper, canonical source, bibliography, and figures into the local context.
3.  Runs a standard 4-pass LaTeX compilation:
    -   `pdflatex` (initial structure)
    -   `bibtex` (citation resolution)
    -   `pdflatex` (citation integration)
    -   `pdflatex` (final reference indexing)
4.  Moves the final publication-ready PDF to the `\publication-pdfs\` directory.
5.  Fails immediately if any step returns a non-zero exit code.

## Troubleshooting

### Missing Packages
If compilation fails due to missing `.sty` or `.cls` files:
-   **MiKTeX**: It should prompt you to auto-install missing packages. Ensure "Always install missing packages on-the-fly" is enabled in MiKTeX Console.
-   **TeX Live**: Use the TeX Live Manager (`tlmgr`) to install missing packages.

### Non-Selectable Text
The script uses `pdflatex`, which by default generates text-selectable PDFs. If you encounter issues, ensure you are not using an extremely old version of LaTeX.

### Figure Errors
Ensure the `.png` files exist in `\papers-canonical\figures\`. The script expects this directory to be present.
