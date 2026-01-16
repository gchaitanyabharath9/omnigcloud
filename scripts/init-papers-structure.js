const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const WORKSPACE = 'c:/Users/SOHAN/.gemini/antigravity/playground/nascent-zodiac';
const SRC_PAPERS_DIR = path.join(WORKSPACE, 'src/app/[locale]/research/papers');
const OUTPUT_ROOT = path.join(WORKSPACE, 'papers');

const papers = [
    { id: 'A1', dir: 'a1-cloud-native-enterprise-reference', file: 'A1-PAPER-FULL.md' },
    { id: 'A2', dir: 'a2-high-throughput-distributed-systems', file: 'A2-PAPER-FULL.md' },
    { id: 'A3', dir: 'a3-enterprise-observability-operational-intelligence', file: 'A3-PAPER-FULL.md' },
    { id: 'A4', dir: 'a4-platform-governance-multicloud-hybrid', file: 'A4-PAPER-FULL.md' },
    { id: 'A5', dir: 'a5-monolith-to-cloud-native-modernization', file: 'A5-PAPER-FULL.md' },
    { id: 'A6', dir: 'a6-adaptive-policy-enforcement', file: 'A6-PAPER-FULL.md' },
    { id: 'AECP', dir: 'aecp', file: 'AECP-FULL.md' },
    { id: 'SCHOLARLY', dir: 'scholarly-article', file: 'SCHOLARLY-ARTICLE-ENTERPRISE-ARCHITECTURE.md' }
];

if (!fs.existsSync(OUTPUT_ROOT)) fs.mkdirSync(OUTPUT_ROOT);

papers.forEach(paper => {
    const paperOutDir = path.join(OUTPUT_ROOT, paper.id);
    const subDirs = ['manuscript', 'figures', 'refs', 'build/ieee', 'build/acm', 'build/arxiv', 'exports'];

    subDirs.forEach(sub => {
        const fullSub = path.join(paperOutDir, sub);
        if (!fs.existsSync(fullSub)) fs.mkdirSync(fullSub, { recursive: true });
    });

    const srcPath = path.join(SRC_PAPERS_DIR, paper.dir, paper.file);
    const destPath = path.join(paperOutDir, 'manuscript', 'canonical.md');
    fs.copyFileSync(srcPath, destPath);

    console.log(`Initialized structure for ${paper.id}`);
});
