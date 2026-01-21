const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];
const baseDir = path.resolve('src/messages');

locales.forEach(locale => {
    const filePath = path.join(baseDir, `${locale}.json`);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    if (content.Dashboard && content.Dashboard.Executive && content.Dashboard.Executive.cost) {
        // Replace hardcoded impact with template
        content.Dashboard.Executive.cost.impactTemplate = "{amount} saved this month • {percent}% YoY increase";
        delete content.Dashboard.Executive.cost.impact;
    }

    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
    console.log(`Updated ${locale}.json`);
});
