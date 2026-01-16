/**
 * scripts/publications/fix-ieee-acm-sources.js
 * Surgical fixes for IEEE/ACM sources for pdflatex.
 */
const fs = require('fs');
const path = require('path');

const FORMATS = ['ieee', 'acm'];
const PAPERS = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'AECP', 'ARCH'];
const SUBMISSION_ROOT = path.join(process.cwd(), 'submission');

const PANDOC_HIGHLIGHT_DEFS = `
\\usepackage{color}
\\usepackage{fancyvrb}
\\newcommand{\\VerbBar}{|}
\\newcommand{\\VERB}{\\Verb[commandchars=\\\\\\{\\}]}
\\DefineVerbatimEnvironment{Highlighting}{Verbatim}{commandchars=\\\\\\{\\}}
\\newenvironment{Shaded}{}{}
\\newcommand{\\AlertTok}[1]{\\textcolor[rgb]{1.00,0.00,0.00}{\\textbf{#1}}}
\\newcommand{\\AnnotationTok}[1]{\\textcolor[rgb]{0.38,0.63,0.69}{\\textbf{\\textit{#1}}}}
\\newcommand{\\AttributeTok}[1]{\\textcolor[rgb]{0.49,0.56,0.16}{#1}}
\\newcommand{\\BaseNTok}[1]{\\textcolor[rgb]{0.25,0.63,0.44}{#1}}
\\newcommand{\\BuiltInTok}[1]{#1}
\\newcommand{\\CharTok}[1]{\\textcolor[rgb]{0.25,0.44,0.63}{#1}}
\\newcommand{\\CommentTok}[1]{\\textcolor[rgb]{0.38,0.63,0.69}{\\textit{#1}}}
\\newcommand{\\CommentVarTok}[1]{\\textcolor[rgb]{0.38,0.63,0.69}{\\textbf{\\textit{#1}}}}
\\newcommand{\\ConstantTok}[1]{\\textcolor[rgb]{0.53,0.00,0.00}{#1}}
\\newcommand{\\ControlFlowTok}[1]{\\textcolor[rgb]{0.00,0.44,0.13}{\\textbf{#1}}}
\\newcommand{\\DataTypeTok}[1]{\\textcolor[rgb]{0.56,0.13,0.00}{#1}}
\\newcommand{\\DecValTok}[1]{\\textcolor[rgb]{0.25,0.63,0.44}{#1}}
\\newcommand{\\DocumentationTok}[1]{\\textcolor[rgb]{0.73,0.13,0.13}{\\textit{#1}}}
\\newcommand{\\ErrorTok}[1]{\\textcolor[rgb]{1.00,0.00,0.00}{\\textbf{#1}}}
\\newcommand{\\ExtensionTok}[1]{#1}
\\newcommand{\\FloatTok}[1]{\\textcolor[rgb]{0.25,0.63,0.44}{#1}}
\\newcommand{\\FunctionTok}[1]{\\textcolor[rgb]{0.02,0.16,0.49}{#1}}
\\newcommand{\\ImportTok}[1]{#1}
\\newcommand{\\InformationTok}[1]{\\textcolor[rgb]{0.38,0.63,0.69}{\\textbf{\\textit{#1}}}}
\\newcommand{\\KeywordTok}[1]{\\textcolor[rgb]{0.00,0.44,0.13}{\\textbf{#1}}}
\\newcommand{\\NormalTok}[1]{#1}
\\newcommand{\\OperatorTok}[1]{\\textcolor[rgb]{0.40,0.40,0.40}{#1}}
\\newcommand{\\OtherTok}[1]{\\textcolor[rgb]{0.00,0.44,0.13}{#1}}
\\newcommand{\\PreprocessorTok}[1]{\\textcolor[rgb]{0.74,0.48,0.00}{#1}}
\\newcommand{\\RegionMarkerTok}[1]{#1}
\\newcommand{\\SpecialCharTok}[1]{\\textcolor[rgb]{0.25,0.44,0.63}{#1}}
\\newcommand{\\SpecialStringTok}[1]{\\textcolor[rgb]{0.73,0.40,0.53}{#1}}
\\newcommand{\\StringTok}[1]{\\textcolor[rgb]{0.25,0.44,0.63}{#1}}
\\newcommand{\\VariableTok}[1]{\\textcolor[rgb]{0.10,0.09,0.49}{#1}}
\\newcommand{\\VerbatimStringTok}[1]{\\textcolor[rgb]{0.25,0.44,0.63}{#1}}
\\newcommand{\\WarningTok}[1]{\\textcolor[rgb]{0.38,0.63,0.69}{\\textbf{\\textit{#1}}}}
`;

function fixTexFile(filePath) {
    if (!fs.existsSync(filePath)) return false;
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // 1. Ensure basic packages
    if (!content.includes('\\usepackage[T1]{fontenc}')) {
        content = content.replace(/\\documentclass(\[.*?\])?\{.*?\}/, '$&\n\\usepackage[T1]{fontenc}');
    }

    // 2. Inject Preamble Fixes (Unicode and Highlighting)
    // We remove any existing incomplete blocks we might have added, then re-add
    content = content.replace(/\\providecommand\{\\pandocbounded\}[\s\S]*?\\DeclareUnicodeCharacter\{[^}]+\}\{[^}]+\}/g, '');

    const unicodeList = [
        ['03B1', '\\alpha'], ['03B2', '\\beta'], ['03B3', '\\gamma'], ['03B4', '\\delta'],
        ['03BB', '\\lambda'], ['03BC', '\\mu'], ['03C3', '\\sigma'], ['03C4', '\\tau'],
        ['2192', '\\rightarrow'], ['2264', '\\leq'], ['2265', '\\geq'], ['2248', '\\approx'],
        ['00D7', '\\times'], ['2260', '\\neq'], ['00B1', '\\pm'], ['221E', '\\infty'],
        ['00A0', '~'], ['2014', '\\textemdash'], ['2013', '\\textendash'], ['2022', '\\bullet']
    ];
    const unicodeDecls = unicodeList.map(([h, t]) => `\\DeclareUnicodeCharacter{${h}}{\\ensuremath{${t}}}`).join('\n');

    const shimBlock = `
\\providecommand{\\pandocbounded}[1]{#1}
\\providecommand{\\tightlist}{\\setlength{\\itemsep}{0pt}\\setlength{\\parskip}{0pt}}
${unicodeDecls}
${PANDOC_HIGHLIGHT_DEFS}
`;

    // Inject before begin{document}
    content = content.replace(/\\begin\{document\}/, `${shimBlock}\n\\begin{document}`);

    // 3. Graphics Fixes
    content = content.replace(/\\pandocbounded\{\\includegraphics\[[^}]*alt=\{([^}]+)\}\}/g, '\\includegraphics[width=0.8\\linewidth]{$1}');
    content = content.replace(/\\pandocbounded\{\\includegraphics(?:\[.*?\])?\{(.*?)\}\}/g, '\\includegraphics[width=0.8\\linewidth]{$1}');

    // 4. Metadata and Section Numbers
    content = content.replace(/\*\*Keywords:\*\*/g, '\\textbf{Keywords:}');
    content = content.replace(/---\s*\\end\{abstract\}/g, '\\end{abstract}');
    const forbidden = [/^\\textbf\{Author:\}.*$/gm, /^\\textbf\{Classification:\}.*$/gm, /^\\textbf\{Version:\}.*$/gm, /^\\textbf\{Date:\}.*$/gm, /^\\textbf\{Format:\}.*$/gm, /Authorship Declaration/g, /Independent Technical Paper/g];
    forbidden.forEach(p => content = content.replace(p, ''));
    content = content.replace(/\\section\{(?:[\d.]+\s+)?(?:\d+\.\s+)?([^}]+)\}/g, '\\section{$1}');
    content = content.replace(/\\subsection\{(?:[\d.]+\s+)?(?:\d+\.\s+)?([^}]+)\}/g, '\\subsection{$1}');

    // 5. Absolute Path Cleanup
    content = content.replace(/[A-Z]:\\Users\\[^\\]+\\.gemini\\antigravity\\playground\\nascent-zodiac\\public\\assets\\papers\\[^\\]+\\figures\\/g, 'figures/');
    content = content.replace(/[A-Z]:\\Users\\[^\\]+\\.gemini\\antigravity\\playground\\nascent-zodiac\\submission\\[^\\]+\\[^\\]+\\figures\\/g, 'figures/');
    content = content.replace(/[A-Z]:\\Users\\[^\s\}]+/g, (match) => {
        const parts = match.split('\\');
        return 'figures/' + parts[parts.length - 1];
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        return true;
    }
    return false;
}

console.log('--- Applying Surgical Fixes for IEEE and ACM ---');
FORMATS.forEach(f => {
    PAPERS.forEach(p => {
        const texFile = path.join(SUBMISSION_ROOT, f, p, 'main.tex');
        if (fixTexFile(texFile)) console.log(`[FIXED]  ${f}/${p}`);
        else console.log(`[SKIP]   ${f}/${p}`);
    });
});
