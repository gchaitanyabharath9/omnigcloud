const fs = require('fs');
const path = require('path');

const WORKSPACE = process.cwd();
const RESEARCH_DIR = path.join(WORKSPACE, 'src/app/[locale]/research/papers');

// A1 is EXCLUDED from modifications in this turn's scope
const papers = [
    'a2-high-throughput-distributed-systems/A2-PAPER-FULL.md',
    'a3-enterprise-observability-operational-intelligence/A3-PAPER-FULL.md',
    'a4-platform-governance-multicloud-hybrid/A4-PAPER-FULL.md',
    'a5-monolith-to-cloud-native-modernization/A5-PAPER-FULL.md',
    'a6-adaptive-policy-enforcement/A6-PAPER-FULL.md',
    'scholarly-article/SCHOLARLY-ARTICLE-ENTERPRISE-ARCHITECTURE.md',
    'aecp/AECP-FULL.md'
];

const PALETTE_LINES = [
    '    classDef Control fill:#4E79A7,stroke:#2C3E50,stroke-width:2px,color:#fff;',
    '    classDef Data fill:#59A14F,stroke:#274E13,stroke-width:2px,color:#fff;',
    '    classDef Policy fill:#9C6ADE,stroke:#4B0082,stroke-width:2px,color:#fff;',
    '    classDef Obs fill:#F28E2B,stroke:#8B4513,stroke-width:2px,color:#fff;',
    '    classDef Risk fill:#E15759,stroke:#7B241C,stroke-width:2px,color:#fff;',
    '    classDef State fill:#76B7B2,stroke:#0E6251,stroke-width:2px,color:#fff;',
    '    classDef Actor fill:#BAB0AC,stroke:#515A5A,stroke-width:2px,color:#000;'
];

const captionExpansions = {
    'a2-high-throughput-distributed-systems/A2-PAPER-FULL.md': [
        { target: 'Theoretical limit visualized via USL.', add: ' This visualization clarifies the separation between coordination crosstalk (control path) and throughput scaling (data path) in high-volume systems.' },
        { target: 'The Shock Absorber Architecture.', add: ' This clarifies the separation between high-velocity ingress (data path) and complex asynchronous processing (control/state reconciliation).' }
    ],
    'a3-enterprise-observability-operational-intelligence/A3-PAPER-FULL.md': [
        { target: 'The Observability Triangle.', add: ' The model demonstrates the interconnectedness of signals required for rapid correlation across the control and data planes.' },
        { target: 'The "Cardinality Cliff."', add: ' This shift in complexity from metrics to traces protects the scalability of the monitoring control plane.' }
    ],
    'a4-platform-governance-multicloud-hybrid/A4-PAPER-FULL.md': [
        { target: 'The Policy-as-Code (PaC) Compilation Pipeline.', add: ' The diagram illustrates the asynchronous propagation from policy definition (control plane) to runtime enforcement (data path).' }
    ],
    'a5-monolith-to-cloud-native-modernization/A5-PAPER-FULL.md': [
        { target: 'The Strangler Fig Pattern.', add: ' This shows the incremental transition of the data path from legacy monoliths to cloud-native microservices, managed by a programmable control plane.' }
    ],
    'a6-adaptive-policy-enforcement/A6-PAPER-FULL.md': [
        { target: 'The Autonomic OODA Control Loop.', add: ' The model defines the deterministic interaction between observability sensors (control plane) and runtime actuators (data path) during steady-state and failure response.' }
    ],
    'aecp/AECP-FULL.md': [
        { target: 'Traditional vs. AECP Architecture.', add: ' The comparison highlights the inversion of the data path, where policy-defined intent (control plane) strictly governs the infrastructure lifecycle.' }
    ]
};

papers.forEach(p => {
    const fullPath = path.join(RESEARCH_DIR, p);
    if (!fs.existsSync(fullPath)) return;

    let content = fs.readFileSync(fullPath, 'utf-8');

    // 1. Update Mermaid Palette
    content = content.replace(/```mermaid([\s\S]*?)```/g, (match, code) => {
        if (code.includes('sequenceDiagram')) return match; // Already handled, no classDef support

        let lines = code.split('\n').map(l => l.trim()).filter(l => l.length > 0);

        // Remove old palette lines
        lines = lines.filter(l => !l.startsWith('classDef '));

        const typeLine = lines[0]; // e.g. graph TD
        const rest = lines.slice(1);

        // Filter out existing class assignments to re-apply later if needed, 
        // but for now we trust they are already standard.
        // We'll just inject the new PALETTE_LINES after the typeLine.

        const newBody = [typeLine, ...PALETTE_LINES, ...rest];

        return '```mermaid\n' + newBody.join('\n') + '\n```';
    });

    // 2. Expand Captions
    if (captionExpansions[p]) {
        captionExpansions[p].forEach(exp => {
            if (content.includes(exp.target) && !content.includes(exp.add)) {
                content = content.replace(exp.target, exp.target + exp.add);
            }
        });
    }

    fs.writeFileSync(fullPath, content);
    console.log(`Final Premium Polish applied to ${p}`);
});
