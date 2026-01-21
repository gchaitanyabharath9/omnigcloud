const fs = require('fs');
const path = require('path');

const EN_FILE = path.resolve(__dirname, '../src/messages/en.json');

const en = JSON.parse(fs.readFileSync(EN_FILE, 'utf-8'));

// Add missing keys found by the scanner
// These are being used in the code but missing from en.json

// Common namespace keys
if (!en.Common) en.Common = {};
if (!en.Common.abstract) en.Common.abstract = {};
en.Common.abstract.content = "Abstract content";
en.Common.abstract.paragraph1 = "First paragraph of abstract";
en.Common.abstract.paragraph2 = "Second paragraph of abstract";
en.Common.abstract.title = "Abstract";

if (!en.Common.featured) en.Common.featured = {};
en.Common.featured.abstract = "Featured abstract";

if (!en.Common.sections) en.Common.sections = {};
en.Common.sections.validationProtocols = "Validation Protocols";

en.Common.technicalLibrary = "Technical Library";

// docs namespace keys (lowercase)
if (!en.docs) en.docs = {};
if (!en.docs.whitepaper) en.docs.whitepaper = {};
if (!en.docs.whitepaper.diagrams) en.docs.whitepaper.diagrams = {};
en.docs.whitepaper.diagrams.validation = "Validation Diagram";
en.docs.whitepaper.diagrams.validationDesc = "Validation process diagram";

fs.writeFileSync(EN_FILE, JSON.stringify(en, null, 2) + '\n', 'utf-8');
console.log('✅ Added missing scan keys to en.json');
