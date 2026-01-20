/**
 * Comprehensive script to add ALL missing i18n keys to ALL locale files
 */

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../src/messages');
const locales = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];

const missingData = {
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
    },
    "Enterprise": {
        "approach": {
            "title": "Enterprise approach",
            "subtitle": "How we help you scale",
            "pillars": [
                { "title": "Security", "desc": "Enterprise-grade security" },
                { "title": "Scale", "desc": "Scale to millions" },
                { "title": "Stability", "desc": "99.999% uptime" }
            ]
        },
        "trust": {
            "title": "Trusted by Enterprises",
            "p1": "We provide the most secure platform.",
            "p2": "Used by Fortune 500 companies."
        },
        "partnership": {
            "title": "Our Partnership Model",
            "steps": [
                { "title": "Consultation", "desc": "We understand your needs" },
                { "title": "Implementation", "desc": "We build your solution" },
                { "title": "Support", "desc": "We grow with you" }
            ]
        }
    },
    "Header": {
        "nav": {
            "research": "Research",
            "onboarding": "Onboarding",
            "contactSales": "Contact Sales"
        }
    }
};

function deepMerge(target, source) {
    for (const key in source) {
        if (source[key] instanceof Array) {
            target[key] = source[key];
        } else if (source[key] instanceof Object) {
            if (!target[key]) target[key] = {};
            deepMerge(target[key], source[key]);
        } else {
            if (!target[key]) target[key] = source[key];
        }
    }
    return target;
}

for (const locale of locales) {
    const filePath = path.join(messagesDir, `${locale}.json`);

    try {
        let messages = {};
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            messages = JSON.parse(content);
        }

        deepMerge(messages, missingData);

        fs.writeFileSync(filePath, JSON.stringify(messages, null, 2) + '\n', 'utf-8');
        console.log(`✅ Fully updated ${locale}.json`);
    } catch (error) {
        console.error(`❌ Error processing ${locale}.json:`, error.message);
    }
}

console.log('\n✅ All locale files synchronized with complete set of keys!');
