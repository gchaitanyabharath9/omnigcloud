const fs = require('fs');
const path = require('path');

function fix(id, oldStr, newStr) {
    const p = path.join('papers', id, 'manuscript', 'canonical.md');
    if (!fs.existsSync(p)) return;
    let c = fs.readFileSync(p, 'utf-8');
    // Use split/join for global replace
    c = c.split(oldStr).join(newStr);
    fs.writeFileSync(p, c);
}

fix('A2', 'state Phase 1: "Scale Ingress as P1"', 'state "Phase 1: Scale Ingress" as P1');
fix('A2', 'state Phase 2: "Dual Write as P2"', 'state "Phase 2: Dual Write" as P2');
fix('A2', 'state Phase 3: "Backfill as P3"', 'state "Phase 3: Backfill" as P3');
fix('A2', 'state Phase 4: "Consumer Switch as P4"', 'state "Phase 4: Consumer Switch" as P4');
fix('A2', 'state Phase 5: "Cleanup as P5"', 'state "Phase 5: Cleanup" as P5');

fix('AECP', 'x-axis Low Automation --> High Automation', 'x-axis "Low Automation --> High Automation"');
fix('AECP', 'y-axis Low Coverage --> High Coverage', 'y-axis "Low Coverage --> High Coverage"');

fix('A2', '|Hash("ID")%4|', '|Hash ID|');
