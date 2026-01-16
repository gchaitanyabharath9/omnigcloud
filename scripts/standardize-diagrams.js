const fs = require('fs');
const path = require('path');

const WORKSPACE = process.cwd();
const RESEARCH_DIR = path.join(WORKSPACE, 'src/app/[locale]/research/papers');

const PALETTE_LINES = [
    '    classDef Control fill:#4E79A7,stroke:#2C3E50,color:#fff;',
    '    classDef Data fill:#59A14F,stroke:#274E13,color:#fff;',
    '    classDef Policy fill:#9C6ADE,stroke:#4B0082,color:#fff;',
    '    classDef Obs fill:#F28E2B,stroke:#8B4513,color:#fff;',
    '    classDef Risk fill:#E15759,stroke:#7B241C,color:#fff;',
    '    classDef State fill:#76B7B2,stroke:#0E6251,color:#fff;',
    '    classDef Actor fill:#BAB0AC,stroke:#515A5A,color:#000;'
];

const papers = [
    'a1-cloud-native-enterprise-reference/A1-PAPER-FULL.md',
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

    // Replace existing style lines and clean up from previous run if any
    content = content.replace(/```mermaid([\s\S]*?)```/g, (match, code) => {
        let lines = code.split('\n').map(l => l.trim()).filter(l => l.length > 0);

        // Remove existing style/classDef/class lines
        lines = lines.filter(l => !l.startsWith('style ') && !l.startsWith('classDef ') && !l.startsWith('class '));

        const typeLine = lines[0]; // e.g. graph TD
        const bodyContent = lines.slice(1);

        const newLines = [typeLine, ...PALETTE_LINES];

        const assigned = new Set();
        const assignments = [];

        bodyContent.forEach(line => {
            newLines.push('    ' + line);

            // Match specific node definitions with labels: ID["Label"], ID(Label), ID{Label}, ID((Label))
            const nodeWithLabelRegex = /([A-Za-z0-9_]+)(?:\[|\(|\{|\(\()(.*?)(?:\]|\)|\}|\)\))/g;
            let match;
            while ((match = nodeWithLabelRegex.exec(line)) !== null) {
                const id = match[1];
                const label = match[2].toLowerCase();

                if (assigned.has(id)) continue;

                let cls = '';
                if (label.includes('user') || label.includes('client') || label.includes('actor') || label.includes('human') || label.includes('traffic')) cls = 'Actor';
                else if (label.includes('fail') || label.includes('risk') || label.includes('error') || label.includes('down') || label.includes('degraded') || label.includes('attacker') || label.includes('threat')) cls = 'Risk';
                else if (label.includes('policy') || label.includes('gov') || label.includes('rego') || label.includes('compliance')) cls = 'Policy';
                else if (label.includes('obs') || label.includes('telemetry') || label.includes('metric') || label.includes('log') || label.includes('trace') || label.includes('monitor') || label.includes('alert')) cls = 'Obs';
                else if (label.includes('state') || label.includes('db') || label.includes('storage') || label.includes('vault') || label.includes('repository') || label.includes('shard')) cls = 'State';
                else if (label.includes('control') || label.includes('orchestrat') || label.includes('manager') || label.includes('api') || label.includes('gslb') || label.includes('facade') || label.includes('dns') || label.includes('load balancer') || label.includes('lb')) cls = 'Control';
                else if (label.includes('data') || label.includes('service') || label.includes('app') || label.includes('worker') || label.includes('node') || label.includes('cluster') || label.includes('region') || label.includes('cell')) cls = 'Data';

                if (cls) {
                    assignments.push(`    class ${id} ${cls};`);
                    assigned.add(id);
                }
            }
        });

        return '```mermaid\n' + newLines.join('\n') + '\n' + assignments.join('\n') + '\n```';
    });

    fs.writeFileSync(fullPath, content);
    console.log(`Professional semantic enhancement applied to ${p}`);
});
