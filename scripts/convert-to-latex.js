const fs = require('fs');
const path = require('path');

const WORKSPACE = process.cwd();
const PAPERS_DIR = path.join(WORKSPACE, 'papers');
const ids = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'AECP', 'SCHOLARLY'];

function escapeLatex(text) {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\textbackslash ')
    .replace(/([&%$#_{}])/g, '\\$1')
    .replace(/\^/g, '\\textasciicircum ')
    .replace(/~/g, '\\textasciitilde ')
    .replace(/\//g, '/'); // forward slash is usually fine
}

function md2tex(md) {
  let content = md.replace(/\r\n/g, '\n');

  // 0. Remove metadata block
  content = content.replace(/^# .*?\n[\s\S]*?---/s, '');

  // 1. Equations - protect them
  const mathBlocks = [];
  content = content.replace(/\$\$([\s\S]*?)\$\$/g, (match, p1) => {
    const id = `___MATHBLOCK${mathBlocks.length}___`;
    mathBlocks.push(`\\[ ${p1} \\]`);
    return id;
  });

  const inlineMath = [];
  content = content.replace(/\$([^\$\n]+)\$/g, (match, p1) => {
    const id = `___MATHINLINE${inlineMath.length}___`;
    inlineMath.push(`$ ${p1} $`);
    return id;
  });

  // 2. Code blocks - protect them
  const codeBlocks = [];
  content = content.replace(/```(.*?)\n([\s\S]*?)```/g, (match, lang, code) => {
    const id = `___CODEBLOCK${codeBlocks.length}___`;
    codeBlocks.push(`\\begin{verbatim}\n${code.trim()}\n\\end{verbatim}`);
    return id;
  });

  // 3. Simple inline code `...` - protect
  const inlineCode = [];
  content = content.replace(/`([^`\n]+)`/g, (match, code) => {
    const id = `___CODEINLINE${inlineCode.length}___`;
    inlineCode.push(`\\texttt{${escapeLatex(code)}}`);
    return id;
  });

  // 4. Tables - handle separately
  const tables = [];
  content = content.replace(/\n\|(.*?)\|\n\|(?:---.*?|:---.*?)\|\n((?:\|.*?\|\n)+)/g, (match, header, body) => {
    const id = `___TABLE${tables.length}___`;
    const cols = header.split('|').filter(c => c.trim().length > 0);
    const colDef = cols.map(() => 'l').join(' | ');
    const clean = (txt) => escapeLatex(txt.trim());
    const headerRow = cols.map(c => '\\textbf{' + clean(c) + '}').join(' & ') + ' \\\\\\hline';
    const bodyRows = body.trim().split('\n').map(row => {
      const cells = row.split('|').filter(c => c.trim().length > 0);
      return cells.map(c => clean(c)).join(' & ') + ' \\\\\\hline';
    }).join('\n');
    tables.push(`\n\\begin{table}[ht!]\n\\centering\n\\begin{tabular}{|${colDef}|}\n\\hline\n${headerRow}\n${bodyRows}\n\\end{tabular}\n\\end{table}\n`);
    return id;
  });

  // 5. Replace other Markdown elements
  // Headers
  content = content.replace(/^# (.*)/gm, '\\section{$1}');
  content = content.replace(/^## (.*)/gm, '\\subsection{$1}');
  content = content.replace(/^### (.*)/gm, '\\subsubsection{$1}');

  // Bold/Italic
  content = content.replace(/\*\*([^*]+)\*\*/g, '\\textbf{$1}');
  content = content.replace(/\*([^*]+)\*/g, '\\textit{$1}');

  // Figures
  content = content.replace(/!\[(.*?)\]\(figures\/(fig-\d+)\.svg\)/g, (match, caption, fileBase) => {
    return `\\begin{figure}[ht!]\\centering\\includegraphics[width=0.8\\linewidth]{../../figures/${fileBase}.pdf}\\caption{${escapeLatex(caption)}}\\end{figure}`;
  });

  // Links
  content = content.replace(/\[(.*?)\]\((.*?)\)/g, (match, text, url) => {
    return `\\href{${url.replace(/%/g, '\\%')}}{${escapeLatex(text)}}`;
  });

  // Lists
  // Unordered
  content = content.replace(/^\s*[\*-] (.*)/gm, '\\item $1');
  // Ordered
  content = content.replace(/^\s*\d+\. (.*)/gm, '\\item $1');

  // Wrap multiple items in itemize
  // This is still a bit tricky, let's use a simpler approach:
  // Any block of lines starting with \item should be wrapped.
  content = content.replace(/((?:^\\item .*?\n?)+)/gm, (match) => {
    return `\\begin{itemize}\n${match}\\end{itemize}\n`;
  });

  // Blockquotes
  content = content.replace(/^\> (.*)/gm, '\\begin{quote}$1\\end{quote}');

  // 6. Escape remaining special characters in text (not in commands)
  // Actually, at this point most things are handled. 
  // We should explicitly escape %, &, _, #, $ that are NOT part of our placeholders.
  content = content.replace(/([&%#_])/g, (match) => {
    // If it's already part of a LaTeX command or placeholder, it might be tricky.
    // But since we protected math and code, we can be more aggressive.
    return '\\' + match;
  });

  // Fix beta and other symbols
  content = content.replace(/β/g, '$\\beta$');
  content = content.replace(/≈/g, '$\\approx$');
  content = content.replace(/×/g, '$\\times$');
  content = content.replace(/🎉/g, ''); // Remove emojis
  content = content.replace(/→/g, '$\\rightarrow$');
  content = content.replace(/μs/g, '$\\mu s$');
  content = content.replace(/O\(N²\)/g, '$O(N^2)$');
  content = content.replace(/N×baseline/g, '$N \\times \\text{baseline}$');

  // 7. Restore protected blocks
  mathBlocks.forEach((val, i) => content = content.replace(`___MATHBLOCK${i}___`, val));
  inlineMath.forEach((val, i) => content = content.replace(`___MATHINLINE${i}___`, val));
  codeBlocks.forEach((val, i) => content = content.replace(`___CODEBLOCK${i}___`, val));
  inlineCode.forEach((val, i) => content = content.replace(`___CODEINLINE${i}___`, val));
  tables.forEach((val, i) => content = content.replace(`___TABLE${i}___`, val));

  // Cleanup double backslashes for underscore etc.
  content = content.replace(/\\\\([&%#_])/g, '\\$1');

  return content;
}

ids.forEach(id => {
  const paperDir = path.join(PAPERS_DIR, id);
  const mdPath = path.join(paperDir, 'manuscript', 'content.md');
  if (!fs.existsSync(mdPath)) return;

  const md = fs.readFileSync(mdPath, 'utf-8');
  let texBody = md2tex(md);

  fs.writeFileSync(path.join(paperDir, 'manuscript', 'content.tex'), texBody);
  console.log(`Updated content.tex for ${id}`);
});
