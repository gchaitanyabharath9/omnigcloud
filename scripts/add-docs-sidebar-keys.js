const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/messages/en.json', 'utf8'));

// Ensure Docs.sidebar exists
if (!data.Docs) data.Docs = {};
if (!data.Docs.sidebar) data.Docs.sidebar = {};

data.Docs.sidebar = {
    ...data.Docs.sidebar,
    customBriefingTitle: "Need a customized briefing?",
    customBriefingText: "Speak with our founding engineering team about specific ASO implementations.",
    contactArchitectureOffice: "Contact Architecture Office"
};

fs.writeFileSync('src/messages/en.json', JSON.stringify(data, null, 2));
console.log('✅ Added Docs Sidebar keys to en.json');
