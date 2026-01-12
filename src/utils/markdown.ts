/**
 * Markdown utilities for research papers
 */

export interface ContentPart {
    type: 'text' | 'mermaid';
    content: string;
}

/**
 * Simple markdown parser to handle text and mermaid blocks
 */
export function parseMarkdownContent(content: string): ContentPart[] {
    const parts: ContentPart[] = [];
    const lines = content.split('\n');
    let currentText = [];
    let isMermaid = false;
    let mermaidCode = [];

    for (const line of lines) {
        if (line.trim().startsWith('```mermaid')) {
            if (currentText.length > 0) {
                parts.push({ type: 'text', content: currentText.join('\n') });
                currentText = [];
            }
            isMermaid = true;
            continue;
        }

        if (line.trim() === '```' && isMermaid) {
            isMermaid = false;
            parts.push({ type: 'mermaid', content: mermaidCode.join('\n') });
            mermaidCode = [];
            continue;
        }

        if (isMermaid) {
            mermaidCode.push(line);
        } else {
            currentText.push(line);
        }
    }

    if (currentText.length > 0) {
        parts.push({ type: 'text', content: currentText.join('\n') });
    }

    return parts;
}

/**
 * Improved markdown renderer with table support
 */
export function renderMarkdownToHTML(md: string): string {
    const lines = md.split('\n');
    let html = '';
    let inTable = false;
    let tableBuffer: string[] = [];

    function renderTable(rows: string[]) {
        if (rows.length === 0) return '';
        let tableHtml = '<div class="overflow-x-auto my-8 border border-white/10 rounded-lg"><table class="w-full text-left text-sm font-mono">';

        // Filter out separator lines (---)
        const contentRows = rows.filter(r => {
            const clean = r.trim();
            // ReDoS-safe check: line contains only separator chars and at least one dash sequence
            return !(/^[\s|:-]+$/.test(clean) && clean.includes('-'));
        });

        contentRows.forEach((row, idx) => {
            const cells = row.split('|').filter(c => c.trim().length > 0 || row.startsWith('|') || row.endsWith('|'));
            // Remove first/last empty elements if pipe-wrapped
            if (row.trim().startsWith('|')) cells.shift();
            if (row.trim().endsWith('|')) cells.pop();

            const tag = idx === 0 ? 'th' : 'td';
            tableHtml += `<tr class="${idx === 0 ? 'bg-white/5 border-b border-white/10' : 'border-b border-white/5'}">`;
            cells.forEach(cell => {
                tableHtml += `<${tag} class="p-4">${cell.trim()}</${tag}>`;
            });
            tableHtml += '</tr>';
        });

        tableHtml += '</table></div>';
        return tableHtml;
    }

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Table Detection
        if (line.trim().startsWith('|')) {
            inTable = true;
            tableBuffer.push(line);
            continue;
        } else if (inTable) {
            html += renderTable(tableBuffer);
            tableBuffer = [];
            inTable = false;
        }

        // Headers
        if (line.startsWith('# ')) {
            html += `<h1 class="text-4xl md:text-5xl font-black mb-8 mt-12 text-foreground tracking-tight">${line.substring(2)}</h1>`;
        } else if (line.startsWith('## ')) {
            html += `<h2 class="text-3xl font-bold mb-6 mt-16 text-foreground border-b border-primary/20 pb-2">${line.substring(3)}</h2>`;
        } else if (line.startsWith('### ')) {
            html += `<h3 class="text-2xl font-bold mb-4 mt-10 text-primary/90">${line.substring(4)}</h3>`;
        }
        // Metadata / Bold Metadata
        else if (line.startsWith('**Author:**')) {
            html += `<p class="text-sm font-mono text-primary mb-1">${line}</p>`;
        }
        else if (line.startsWith('**') && line.includes(':**')) {
            html += `<p class="text-sm font-mono text-muted-foreground mb-4 opacity-80">${line}</p>`;
        }
        // Lists
        else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            html += `<li class="ml-6 mb-2 list-disc opacity-90">${line.trim().substring(2)}</li>`;
        }
        else if (line.match(/^\d+\./)) {
            html += `<li class="ml-6 mb-2 list-decimal opacity-90">${line.trim().substring(line.indexOf('.') + 1)}</li>`;
        }
        // Horizontal Rule
        else if (line.trim() === '---') {
            html += `<hr class="my-12 border-white/10" />`;
        }
        // Images (handled simply)
        else if (line.startsWith('![')) {
            const match = line.match(/!\[(.*?)\]\((.*?)\)/);
            if (match) {
                html += `<figure class="my-12"><img src="${match[2]}" alt="${match[1]}" class="rounded-xl border border-white/10 w-full shadow-2xl" /><figcaption class="text-center text-xs mt-4 font-mono opacity-50 uppercase tracking-widest">${match[1]}</figcaption></figure>`;
            }
        }
        // Paragraphs (default)
        else if (line.trim() !== '') {
            // Check for bold items inside paragraph
            const processedLine = line
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-bold">$1</strong>')
                .replace(/`(.*?)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-xs text-primary font-mono">$1</code>');

            html += `<p class="mb-6 leading-relaxed opacity-90 text-lg">${processedLine}</p>`;
        }
    }

    // Flush remaining table
    if (inTable) {
        html += renderTable(tableBuffer);
    }

    return html;
}
