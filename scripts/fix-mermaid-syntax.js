const fs = require('fs');
const path = require('path');

const filePath = path.resolve('src/app/[locale]/research/papers/a1-cloud-native-enterprise-reference/A1-PAPER-FULL.md');
let content = fs.readFileSync(filePath, 'utf-8');

console.log(`Scanning ${filePath} for Mermaid syntax issues...`);

const cleanLabel = (lbl) => {
    let clean = lbl.trim();
    // Replace inner double quotes with single quotes
    clean = clean.replace(/"/g, "'");
    return clean;
};

const processLabel = (rawLabel) => {
    let inner = rawLabel.trim();
    if (inner.startsWith('"') && inner.endsWith('"') && inner.length > 1) {
        inner = inner.slice(1, -1);
    }
    return `"${cleanLabel(inner)}"`;
};

const mermaidBlockRegex = /```mermaid([\s\S]*?)```/g;

content = content.replace(mermaidBlockRegex, (match, code) => {
    let lines = code.split('\n');
    let fixedLines = lines.map(line => {
        let fixedLine = line;

        // ---------------------------------------------------------
        // FIX 3: Subgraph Titles
        // ---------------------------------------------------------
        if (fixedLine.trim().startsWith('subgraph')) {
            const subRegex = /subgraph\s+(\w+)\s*\[(.+)\]/;
            const match = fixedLine.match(subRegex);
            if (match) {
                const [full, id, rawLabel] = match;
                const newLabel = processLabel(rawLabel);
                const newLine = `    subgraph ${id} [${newLabel}]`;
                if (newLine.trim() !== fixedLine.trim()) {
                    fixedLine = newLine;
                    console.log(`Fixed subgraph: ${rawLabel} -> ${newLabel}`);
                }
                return fixedLine;
            }
            // Handle no-bracket case: subgraph ID "Title"
            const subNoBr = /subgraph\s+(\w+)\s+"(.+)"/;
            const matchNoBr = fixedLine.match(subNoBr);
            if (matchNoBr) {
                const [full, id, rawLabel] = matchNoBr;
                const newLabel = processLabel(rawLabel);
                fixedLine = `    subgraph ${id} [${newLabel}]`;
                console.log(`Fixed subgraph (brackets): ${rawLabel} -> ${newLabel}`);
                return fixedLine;
            }
        }

        // ---------------------------------------------------------
        // FIX 4: Graph Node Labels
        // ---------------------------------------------------------
        // Match ID followed by bracket, then CONTENT, then close bracket.
        // We use non-greedy match for content.
        const nodeRegex = /(\b[A-Za-z0-9_]+)\s*(\[|\(|\{\{)(.+?)(\]|\)|\}\})/;
        let nodeMatch = fixedLine.match(nodeRegex);
        if (nodeMatch) {
            const [full, id, open, rawLabel, close] = nodeMatch;
            // Ignore if it looks like a subgraph line (redundant check but safe)
            if (!line.includes('subgraph')) {
                const newLabel = processLabel(rawLabel);
                // Only replace if it actually changes (to preserve original brackets if they were good)
                // But wait, if we change inner quotes, we MUST replace.
                // Construct new node string
                const newNode = `${id}${open}${newLabel}${close}`;
                if (newNode !== full) {
                    fixedLine = fixedLine.replace(full, newNode);
                    console.log(`Fixed node: ${rawLabel} -> ${newLabel}`);
                }
            }
        }

        // ---------------------------------------------------------
        // FIX 1: Sequence Diagram Participants
        // ---------------------------------------------------------
        if (fixedLine.trim().startsWith('participant')) {
            const partRegex = /participant\s+(\w+)\s+as\s+(.+)$/;
            const match = fixedLine.match(partRegex);
            if (match) {
                const [full, id, rawLabel] = match;
                const newLabel = processLabel(rawLabel);
                // Reconstruct is tricky because we replaced the end of line
                if (!full.endsWith(newLabel)) {
                    fixedLine = `    participant ${id} as ${newLabel}`;
                    console.log(`Fixed participant: ${rawLabel} -> ${newLabel}`);
                }
            }
        }

        return fixedLine;
    });

    return '```mermaid\n' + fixedLines.join('\n') + '\n```';
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Done cleaning Mermaid syntax (Deep Clean).');
