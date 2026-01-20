/**
 * Fix Breadcrumb sub-keys in all locale message files
 */

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../src/messages');
const locales = ['es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];

const breadcrumbTranslations = {
    "home": "Home",
    "products": "Products",
    "pricing": "Pricing",
    "platform": "Platform",
    "services": "Services",
    "docs": "Documentation",
    "company": "Company",
    "contact": "Contact",
    "blog": "Blog",
    "research": "Research",
    "solutions": "Solutions",
    "industries": "Industries",
    "resources": "Resources",
    "onboarding": "Onboarding",
    "dashboard": "Dashboard",
    "compliance_maps": "Compliance Maps",
    "whitepaper": "Whitepaper",
    "papers": "Papers",
    "frameworks": "Frameworks"
};

for (const locale of locales) {
    const filePath = path.join(messagesDir, `${locale}.json`);

    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const messages = JSON.parse(content);

        // Ensure Breadcrumb namespace exists
        if (!messages.Breadcrumb) {
            messages.Breadcrumb = {};
        }

        // Merge missing keys
        let updated = false;
        for (const [key, value] of Object.entries(breadcrumbTranslations)) {
            if (!messages.Breadcrumb[key]) {
                messages.Breadcrumb[key] = value;
                updated = true;
            }
        }

        if (updated) {
            // Write back with proper formatting
            fs.writeFileSync(filePath, JSON.stringify(messages, null, 2) + '\n', 'utf-8');
            console.log(`✅ Updated Breadcrumb keys in ${locale}.json`);
        } else {
            console.log(`ℹ️  No Breadcrumb keys missing in ${locale}.json`);
        }
    } catch (error) {
        console.error(`❌ Error processing ${locale}.json:`, error.message);
    }
}

console.log('\n✅ All locale files corrected!');
