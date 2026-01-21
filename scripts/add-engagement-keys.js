const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/messages/en.json', 'utf8'));

// Ensure Engagement block exists and has necessary keys
if (!data.Engagement) {
    data.Engagement = {};
}

data.Engagement = {
    ...data.Engagement,
    title: "Ready for Sovereign AI?",
    subtitle: "Join the Fortune 500 companies reclaiming their digital independence.",
    primary: "Create My Strategy",
    secondary: "Consulting Inquiry",
    thoughtLeadership: {
        title: "Ready for Sovereign AI?",
        subtitle: "Join the Fortune 500 companies reclaiming their digital independence."
    }
};

fs.writeFileSync('src/messages/en.json', JSON.stringify(data, null, 2));
console.log('✅ Added Engagement keys');
