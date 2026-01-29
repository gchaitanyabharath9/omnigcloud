const fs = require('fs');
const path = require('path');

// Load the current en.json
const enJsonPath = path.join(__dirname, '..', 'src', 'messages', 'en.json');
const enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

// Move Papers from Common to root level if it exists under Common
if (enJson.Common && enJson.Common.Papers) {
    console.log('Found Papers under Common, removing duplicate...');
    delete enJson.Common.Papers;
}

// Ensure Papers exists at root level
if (!enJson.Papers) {
    console.error('ERROR: Papers not found at root level!');
    process.exit(1);
}

console.log('✅ Papers structure validated');
console.log(`   - Papers.Common: ${!!enJson.Papers.Common}`);
console.log(`   - Papers.Items: ${!!enJson.Papers.Items}`);
console.log(`   - Papers.tooling_card: ${!!enJson.Papers.tooling_card}`);
console.log(`   - Number of papers: ${Object.keys(enJson.Papers.Items || {}).length}`);

// Write back to file
fs.writeFileSync(enJsonPath, JSON.stringify(enJson, null, 2), 'utf8');
console.log('✅ Successfully cleaned up Papers structure');
