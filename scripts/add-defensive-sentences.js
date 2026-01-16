const fs = require('fs');
const path = require('path');

const WORKSPACE = 'c:/Users/SOHAN/.gemini/antigravity/playground/nascent-zodiac';
const RESEARCH_DIR = path.join(WORKSPACE, 'src/app/[locale]/research/papers');

const additions = [
    {
        file: 'a3-enterprise-observability-operational-intelligence/A3-PAPER-FULL.md',
        target: 'It should be emphasized that this framework formalizes architectural observability requirements and feedback invariants rather than providing guidance on specific commercial observability tools or vendor-locked implementations.',
        sentence: 'A3 defines architectural observability requirements, not monitoring tools or vendor stacks.'
    },
    {
        file: 'a4-platform-governance-multicloud-hybrid/A4-PAPER-FULL.md',
        target: 'A4 treats governance specifically as an architectural control plane with formal invariants rather than as a procedural or checklist-driven compliance activity.',
        sentence: 'Governance is treated as an architectural control plane, not a procedural compliance checklist.'
    },
    {
        file: 'a5-monolith-to-cloud-native-modernization/A5-PAPER-FULL.md',
        target: 'Crucially, this paper does not advocate for a specific modernization project or consulting engagement, but instead formalizes a general, repeatable migration safety model applicable across diverse legacy architectures.',
        sentence: 'The paper defines migration safety invariants, not organizational or consulting process guidance.'
    },
    {
        file: 'a6-adaptive-policy-enforcement/A6-PAPER-FULL.md',
        target: 'It is important to clarify that A6 defines architectural policy-control logic and deterministic feedback mechanisms, rather than proposing an autonomous or self-directed AI-based operational system.',
        sentence: 'The framework defines deterministic architectural control logic, not autonomous or self-directing AI systems.'
    },
    {
        file: 'aecp/AECP-FULL.md',
        target: 'Importantly, the AECP framework operationalizes the architectural invariants defined in the A1-REF-STD reference architecture and is intended to complement, rather than replace, that foundational structural model.',
        sentence: 'AECP operationalizes A1 invariants and does not replace the reference architecture.'
    }
];

additions.forEach(item => {
    const fullPath = path.join(RESEARCH_DIR, item.file);
    if (!fs.existsSync(fullPath)) return;

    let content = fs.readFileSync(fullPath, 'utf-8');

    // We add the NEW sentence after the existing one to ensure no word count reduction.
    // Or we replace the existing one IF we are sure the new one is longer or we add it additionally.
    // Let's just add it as a new paragraph or a trailing sentence.

    if (content.includes(item.target)) {
        content = content.replace(item.target, item.target + ' ' + item.sentence);
    } else {
        // Fallback: append to the end of the first paragraph of Introduction
        content = content.replace(/## 1\. Introduction[\s\S]*?\n\n/m, (match) => match.trim() + ' ' + item.sentence + '\n\n');
    }

    fs.writeFileSync(fullPath, content);
    console.log(`Added sentence to ${item.file}`);
});
