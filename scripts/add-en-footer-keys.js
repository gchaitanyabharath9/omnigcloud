const fs = require('fs');
const path = require('path');

const EN_FILE = path.resolve(__dirname, '../src/messages/en.json');
const en = JSON.parse(fs.readFileSync(EN_FILE, 'utf-8'));

// Add WhitePaper.footer.copyright
if (!en.WhitePaper) en.WhitePaper = {};
if (!en.WhitePaper.footer) en.WhitePaper.footer = {};
en.WhitePaper.footer.copyright = "© 2026 OmniGCloud. All rights reserved.";

// Add Platform.comparison.footer.copyright
if (!en.Platform) en.Platform = {};
if (!en.Platform.comparison) en.Platform.comparison = {};
if (!en.Platform.comparison.footer) en.Platform.comparison.footer = {};
en.Platform.comparison.footer.copyright = "© 2026 OmniGCloud. All rights reserved.";

fs.writeFileSync(EN_FILE, JSON.stringify(en, null, 2) + '\n', 'utf-8');
console.log('✅ Added WhitePaper.footer.copyright and Platform.comparison.footer.copyright to en.json');
