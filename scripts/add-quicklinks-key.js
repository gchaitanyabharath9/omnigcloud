const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/messages/en.json', 'utf8'));

// Ensure Common.sidebar exists
if (!data.Common) data.Common = {};
if (!data.Common.sidebar) data.Common.sidebar = {};

data.Common.sidebar = {
    ...data.Common.sidebar,
    quickLinksHeading: "Quick Links"
};

fs.writeFileSync('src/messages/en.json', JSON.stringify(data, null, 2));
console.log('✅ Added quickLinksHeading to Common.sidebar in en.json');
