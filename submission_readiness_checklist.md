# Submission-Readiness Checklists

## ACM (SigConf) Checklist
- [x] Document class is `\documentclass[sigconf]{acmart}`.
- [x] Top matter includes `\settopmatter{printacmref=false}`.
- [x] Copyright permission renewed: `\renewcommand\footnotetextcopyrightpermission[1]{}`.
- [x] Abstract contains exactly one neutral opening sentence.
- [x] CCS Concepts are properly formatted with `\begin{CCSXML}` and `\ccsdesc`.
- [x] Author affiliation is "Independent Researcher".
- [x] Limitations section is present before Conclusion.
- [x] References cite prior series work as standard external citations.
- [x] No absolute paths in `\includegraphics`.
- [x] All Unicode characters are declared for `pdflatex` compatibility.

## IEEE (Conference) Checklist
- [x] Document class is `\documentclass[conference]{IEEEtran}`.
- [x] Essential packages included: `cite`, `amsmath`, `amssymb`, `amsfonts`, `algorithmic`, `graphicx`, `textcomp`, `xcolor`.
- [x] Author block uses `\IEEEauthorblockN` and `\IEEEauthorblockA`.
- [x] Author affiliation is "Independent Researcher".
- [x] Tone is reviewer-neutral (no "To the best of our knowledge").
- [x] Keywords are in a `\begin{IEEEkeywords}` block.
- [x] Limitations section is present.
- [x] Figure width is constrained (e.g., `width=\linewidth`).
- [x] No Pandoc-specific wrappers in body text.
- [x] Successful compilation with `pdflatex`.

## arXiv Checklist
- [x] Clean LaTeX source (no `.aux`, `.log`, `.pdf` inside submission folder).
- [x] Absolute paths removed.
- [x] Keywords formatted as `\textbf{Keywords:}` or equivalent.
- [x] Metadata (Author, Version, Date) removed from body.
- [x] Section numbering normalized.
- [x] Figures are available in relative paths.
- [x] Minimal compilation warnings.
- [x] No self-assertions of novelty.
- [x] Paper structure follows Introduction -> Background -> Architecture -> Evaluation.
- [x] Source is safe for automated LaTeX processing.
