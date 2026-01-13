# arXiv Source Packages

This directory manages the generation of arXiv-ready source packages for the A-Series research papers and frameworks.

## Prerequisites

- **PowerShell 5.1+** (Standard on Windows)
- **LaTeX Distribution**: TeX Live, MiKTeX, or equivalent with `pdflatex` and `bibtex` in the system PATH.
- **Zip Utility**: Uses the built-in `Compress-Archive` PowerShell cmdlet.

## How to Build Packages

To generate the arXiv source packages, run the following command from the repository root:

```powershell
powershell -ExecutionPolicy Bypass -File .\build\build-arxiv-packages.ps1
```

## Package Structure

Each generated zip file (`build/arxiv-packages/arxiv-*-source.zip`) contains:

1.  `main.tex`: The entry point (arXiv wrapper).
2.  `<Paper>.tex`: The canonical paper body and metadata.
3.  `references.bib`: The shared bibliography file.
4.  `figures/`: A subdirectory containing only the figures referenced by that specific paper.

## arXiv Submission Instructions

1.  **Select License**: Choose the `arXiv.org perpetual non-exclusive license` unless otherwise instructed.
2.  **Upload**: Upload the appropriate `arxiv-*-source.zip` file for each paper.
3.  **Process**: arXiv's automated system will extract the files and compile them.
4.  **Verify**: 
    - Ensure all figures are rendered correctly.
    - Check the log for any missing package warnings.
    - Verify that the resulting PDF is text-searchable.

## Troubleshooting

- If compilation fails, check the logs in `build/arxiv-packages/<Paper>/main.log`.
- Ensure all figures referenced in the `.tex` files exist in `papers-canonical/figures/`.
- If a figure is missing from the package, it will be flagged with a warning in the build script.
