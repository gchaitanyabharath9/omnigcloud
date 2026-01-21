const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.resolve(__dirname, '../src/messages');
const LOCALES = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];

LOCALES.forEach(locale => {
    const localePath = path.join(MESSAGES_DIR, `${locale}.json`);
    const localeData = JSON.parse(fs.readFileSync(localePath, 'utf-8'));

    // Add WhitePaper.footer.copyright
    if (!localeData.WhitePaper) localeData.WhitePaper = {};
    if (!localeData.WhitePaper.footer) localeData.WhitePaper.footer = {};
    localeData.WhitePaper.footer.copyright = "© 2026 OmniGCloud. All rights reserved.";

    // Add Platform.comparison.footer.copyright
    if (!localeData.Platform) localeData.Platform = {};
    if (!localeData.Platform.comparison) localeData.Platform.comparison = {};
    if (!localeData.Platform.comparison.footer) localeData.Platform.comparison.footer = {};
    localeData.Platform.comparison.footer.copyright = "© 2026 OmniGCloud. All rights reserved.";

    fs.writeFileSync(localePath, JSON.stringify(localeData, null, 2) + '\n', 'utf-8');
    console.log(`✅ Fixed ${locale}.json`);
});

console.log('🟢 All locales fixed with footer.copyright keys');
