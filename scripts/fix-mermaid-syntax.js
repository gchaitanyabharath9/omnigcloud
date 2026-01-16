const fs = require('fs');
const path = require('path');

const WORKSPACE = process.cwd();
const PAPERS_DIR = path.join(WORKSPACE, 'papers');
const ids = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'AECP', 'SCHOLARLY'];

ids.forEach(id => {
    const p = path.join(PAPERS_DIR, id, 'manuscript', 'canonical.md');
    if (!fs.existsSync(p)) return;

    let content = fs.readFileSync(p, 'utf-8');

    // Very specific fixes for the identified lines using string replacement for safety
    content = content.replace(/\("\(Sovereignty"\)\)/g, '("Sovereignty")');
    content = content.replace(/\("\(Scale"\)\)/g, '("Scale")');
    content = content.replace(/\("\(Complexity"\)\)/g, '("Complexity")');
    content = content.replace(/\("\(IoT Device"\)\)/g, '("IoT Device")');
    content = content.replace(/\("\(Mobile App"\)\)/g, '("Mobile App")');
    content = content.replace(/\("\(Web"\)\)/g, '("Web")');
    content = content.replace(/\("\(Distributed Log"\)\)/g, '("Distributed Log")');
    content = content.replace(/\("\(State Store"\)\)/g, '("State Store")');
    content = content.replace(/\("\(A6: Sovereign Control"\)\)/g, '("A6: Sovereign Control")');
    content = content.replace(/\("\(Token Bucket"\)\)/g, '("Token Bucket")');

    // Also handle possible missing quote at end
    content = content.replace(/\("\(Sovereignty"\)\)/g, '("Sovereignty")');

    fs.writeFileSync(p, content);
});
