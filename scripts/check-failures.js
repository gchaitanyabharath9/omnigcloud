const fs = require('fs');
const path = require('path');

const ids = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'AECP', 'SCHOLARLY'];
const WORKSPACE = process.cwd();

ids.forEach(id => {
    const manuscriptPath = path.join(WORKSPACE, 'papers', id, 'manuscript', 'content.md');
    if (!fs.existsSync(manuscriptPath)) return;

    const content = fs.readFileSync(manuscriptPath, 'utf-8');
    const failedMatch = content.match(/!\[Failed Diagram \d+\]/g);
    if (failedMatch) {
        console.log(`${id} has ${failedMatch.length} failed diagrams.`);
    } else {
        console.log(`${id} all diagrams OK.`);
    }
});
