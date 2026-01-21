const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/messages/en.json', 'utf8'));

// Ensure Common.sidebar exists
if (!data.Common) data.Common = {};
if (!data.Common.sidebar) data.Common.sidebar = {};

data.Common.sidebar = {
    ...data.Common.sidebar,
    customBriefingTitle: "Need a customized briefing?",
    customBriefingText: "Speak with our founding engineering team about specific ASO implementations.",
    contactArchitectureOffice: "Contact Architecture Office"
};

fs.writeFileSync('src/messages/en.json', JSON.stringify(data, null, 2));
console.log('✅ Added Common Sidebar keys to en.json');
