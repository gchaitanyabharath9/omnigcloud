const fs = require('fs');
const path = require('path');

const EN_FILE = path.resolve(__dirname, '../src/messages/en.json');

const en = JSON.parse(fs.readFileSync(EN_FILE, 'utf-8'));

// Add the 3 remaining missing keys
if (!en.Common.sections) en.Common.sections = {};
en.Common.sections.autonomousGatingLogs = "Autonomous Gating Logs";
en.Common.sections.empiricalDataSet = "Empirical Data Set";
en.Common.sections.empiricalDataSetDesc = "Comprehensive empirical data set description";

fs.writeFileSync(EN_FILE, JSON.stringify(en, null, 2) + '\n', 'utf-8');
console.log('✅ Added 3 remaining missing keys to en.json');
