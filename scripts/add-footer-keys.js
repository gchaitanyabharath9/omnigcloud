const fs = require('fs');
const path = require('path');

const EN_FILE = path.resolve(__dirname, '../src/messages/en.json');
const en = JSON.parse(fs.readFileSync(EN_FILE, 'utf-8'));

// Add Whitepaper.footer keys
if (!en.Whitepaper) en.Whitepaper = {};
en.Whitepaper.footer = {
    lab: "OmniGCloud Research Lab",
    copyright: "© 2026 OmniGCloud. All rights reserved."
};

fs.writeFileSync(EN_FILE, JSON.stringify(en, null, 2) + '\n', 'utf-8');
console.log('✅ Added Whitepaper.footer.lab and Whitepaper.footer.copyright to en.json');
