const fs = require('fs');
const path = require('path');

const papers = [
    'src/app/[locale]/research/papers/a1-cloud-native-enterprise-reference/A1-PAPER-FULL.md',
    'src/app/[locale]/research/papers/a2-high-throughput-distributed-systems/A2-PAPER-FULL.md',
    'src/app/[locale]/research/papers/a3-enterprise-observability-operational-intelligence/A3-PAPER-FULL.md',
    'src/app/[locale]/research/papers/a4-platform-governance-multicloud-hybrid/A4-PAPER-FULL.md',
    'src/app/[locale]/research/papers/a5-monolith-to-cloud-native-modernization/A5-PAPER-FULL.md',
    'src/app/[locale]/research/papers/a6-adaptive-policy-enforcement/A6-PAPER-FULL.md',
    'src/app/[locale]/research/papers/scholarly-article/SCHOLARLY-ARTICLE-ENTERPRISE-ARCHITECTURE.md',
    'src/app/[locale]/research/papers/aecp/AECP-FULL.md'
];

console.log('=== BASELINE WORD COUNTS ===\n');

const results = [];
let total = 0;

papers.forEach(p => {
    const content = fs.readFileSync(p, 'utf8');
    const words = content.split(/\s+/).filter(w => w.length > 0).length;
    const name = path.basename(p);
    results.push({ name, words, path: p });
    total += words;
    console.log(`${name.padEnd(70)} : ${words.toString().padStart(7)} words`);
});

console.log('\n' + '='.repeat(80));
console.log(`${'TOTAL'.padEnd(70)} : ${total.toString().padStart(7)} words`);
console.log('='.repeat(80));

// Save to JSON for tracking
fs.writeFileSync('word-count-baseline.json', JSON.stringify(results, null, 2));
console.log('\nBaseline saved to word-count-baseline.json');
