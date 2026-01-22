const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.resolve(__dirname, '../src/messages');
const LOCALES = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];

LOCALES.forEach(locale => {
    const localePath = path.join(MESSAGES_DIR, `${locale}.json`);
    const localeData = JSON.parse(fs.readFileSync(localePath, 'utf-8'));

    // Handle Whitepaper.footer collision: it needs to be both a string AND have child keys
    if (localeData.Whitepaper) {
        if (typeof localeData.Whitepaper.footer === 'string') {
            // Convert string to object with _value
            const footerValue = localeData.Whitepaper.footer;
            localeData.Whitepaper.footer = {
                _value: footerValue,
                lab: "OmniGCloud Research Lab",
                copyright: "© 2026 OmniGCloud. All rights reserved."
            };
        } else if (typeof localeData.Whitepaper.footer === 'object' && !localeData.Whitepaper.footer._value) {
            // Add _value to existing object
            localeData.Whitepaper.footer._value = "© 2026 OmniGCloud. All rights reserved.";
        }
    }

    fs.writeFileSync(localePath, JSON.stringify(localeData, null, 2) + '\n', 'utf-8');
    console.log(`✅ Fixed ${locale}.json with _value pattern`);
});

console.log('🟢 All locales fixed with collision handling');
