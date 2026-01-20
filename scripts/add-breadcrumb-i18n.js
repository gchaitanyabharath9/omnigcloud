/**
 * Add Breadcrumb namespace to all locale message files
 */

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../src/messages');
const locales = ['es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];

const breadcrumbTranslations = {
    "Breadcrumb": {
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
    }
};

for (const locale of locales) {
    const filePath = path.join(messagesDir, `${locale}.json`);

    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const messages = JSON.parse(content);

        // Add Breadcrumb namespace if it doesn't exist
        if (!messages.Breadcrumb) {
            messages.Breadcrumb = breadcrumbTranslations.Breadcrumb;

            // Write back with proper formatting
            fs.writeFileSync(filePath, JSON.stringify(messages, null, 2) + '\n', 'utf-8');
            console.log(`✅ Added Breadcrumb namespace to ${locale}.json`);
        } else {
            console.log(`ℹ️  Breadcrumb namespace already exists in ${locale}.json`);
        }
    } catch (error) {
        console.error(`❌ Error processing ${locale}.json:`, error.message);
    }
}

console.log('\n✅ All locale files updated!');
