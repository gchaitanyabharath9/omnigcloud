const fs = require('fs');

const en = JSON.parse(fs.readFileSync('src/messages/en.json', 'utf8'));
const locales = ['es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];

for (const locale of locales) {
    const target = JSON.parse(fs.readFileSync(`src/messages/${locale}.json`, 'utf8'));

    // Copy all new keys from en to target
    if (en.FloatingActions) target.FloatingActions = en.FloatingActions;
    if (en.ChatWidget) target.ChatWidget = en.ChatWidget;
    if (en.GlobalError) target.GlobalError = en.GlobalError;
    if (en.Solutions) target.Solutions = en.Solutions;
    if (en.Research) target.Research = en.Research;
    if (en.ResearchPages) target.ResearchPages = en.ResearchPages;
    if (en.Blog) target.Blog = en.Blog;

    // Update nested keys
    if (en.Products && en.Products.detail) {
        if (!target.Products) target.Products = {};
        target.Products.detail = en.Products.detail;
    }

    if (en.Services && en.Services.devops) {
        if (!target.Services) target.Services = {};
        target.Services.devops = en.Services.devops;
    }

    if (en.Whitepaper && en.Whitepaper.intro) {
        if (!target.Whitepaper) target.Whitepaper = {};
        target.Whitepaper.intro = en.Whitepaper.intro;
    }

    if (en.HomeSections && en.HomeSections.Cta) {
        if (!target.HomeSections) target.HomeSections = {};
        target.HomeSections.Cta = en.HomeSections.Cta;
    }

    fs.writeFileSync(`src/messages/${locale}.json`, JSON.stringify(target, null, 2));
    console.log(`✅ Updated ${locale}.json`);
}

console.log('✅ All locales synced');
