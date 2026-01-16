const fs = require('fs');
const path = require('path');

const WORKSPACE = process.cwd();
const RESEARCH_DIR = path.join(WORKSPACE, 'src/app/[locale]/research/papers');

const papers = [
    'a2-high-throughput-distributed-systems/A2-PAPER-FULL.md',
    'a3-enterprise-observability-operational-intelligence/A3-PAPER-FULL.md',
    'a4-platform-governance-multicloud-hybrid/A4-PAPER-FULL.md',
    'a5-monolith-to-cloud-native-modernization/A5-PAPER-FULL.md',
    'a6-adaptive-policy-enforcement/A6-PAPER-FULL.md',
    'scholarly-article/SCHOLARLY-ARTICLE-ENTERPRISE-ARCHITECTURE.md',
    'aecp/AECP-FULL.md'
];

papers.forEach(p => {
    const fullPath = path.join(RESEARCH_DIR, p);
    if (!fs.existsSync(fullPath)) return;

    let content = fs.readFileSync(fullPath, 'utf-8');

    // Fix sequenceDiagram blocks
    content = content.replace(/```mermaid\s*sequenceDiagram([\s\S]*?)```/g, (match, code) => {
        let lines = code.split('\n');
        let filteredLines = lines.filter(line => {
            const trimmed = line.trim();
            // Remove classDef and class assignments which are invalid in sequenceDiagram
            return !trimmed.startsWith('classDef') && !trimmed.startsWith('class ');
        });
        return '```mermaid\nsequenceDiagram' + filteredLines.join('\n') + '\n```';
    });

    fs.writeFileSync(fullPath, content);
    console.log(`Cleaned Mermaid sequenceDiagrams in ${p}`);
});
