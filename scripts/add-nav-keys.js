const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../src/messages');
const enPath = path.join(messagesDir, 'en.json');
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Struct to merge
const NAV_KEYS = {
    "Header": {
        "nav": {
            "dashboard": "Dashboard",
            "performance": "Performance",
            "telemetry": "Telemetry",
            "products": "Products",
            "pillars": "Pillars",
            "advanced": "Advanced",
            "solutions": "Solutions",
            "industries": "Industries",
            "useCases": "Use Cases",
            "docs": "Docs",
            "documentation": "Documentation",
            "community": "Community",
            "pricing": "Pricing",
            "tiers": "Tiers",
            "analysis": "Value Analysis",
            "trust_compliance": "Trust & Compliance",
            "company": "Company",
            "organization": "Organization",
            "contact_us": "Contact Us",
            "onboarding": "Onboard Now",
            "menu_accessibility_label": "Toggle Menu",
            "dashboard_links": {
                "executive": "Executive View",
                "roi": "ROI Analysis",
                "cost": "Cost Guard",
                "uptime": "Uptime Monitor",
                "security": "Security Status",
                "technical": "Technical Metrics",
                "resources": "Resource Usage",
                "deployment": "Deployments",
                "scaling": "Auto Scaling",
                "error": "Error Logs"
            },
            "products_links": {
                "playground": "Playground",
                "workflows": "Workflows",
                "guard": "Guardrails",
                "knowledge": "Knowledge Base",
                "deploy": "Deployment",
                "nexus": "Mesh Nexus",
                "sangam": "Sangam Fusion"
            },
            "solutions_links": {
                "financial": "Financial Services",
                "insurance": "Insurance",
                "telecom": "Telecom",
                "healthcare": "Healthcare",
                "logistics": "Logistics & Supply Chain",
                "finance_mod": "Finance Modernization",
                "health_mod": "Health Data",
                "gov_trust": "Government Trust"
            },
            "docs_links": {
                "tech_docs": "Technical Docs",
                "patterns": "Architecture Patterns",
                "api": "API Reference",
                "visual_library": "Visual Library",
                "newsroom": "Newsroom",
                "open_source": "Open Source"
            },
            "pricing_links": {
                "developer": "Developer",
                "professional": "Professional",
                "business": "Business",
                "sovereign": "Sovereign Enterprise",
                "savings_analysis": "Savings Analysis",
                "value_economy": "Value Economy",
                "visual_architecture": "Visual Architecture",
                "compliance": "Compliance",
                "trust": "Trust Center",
                "faq": "FAQ"
            },
            "company_links": {
                "about": "About Us",
                "leadership": "Leadership",
                "operations": "Global Operations",
                "newsroom": "Newsroom",
                "investors": "Investors",
                "executive": "Executive Office",
                "contact": "Contact Sales",
                "global_hq": "Global HQ"
            },
            "trust_links": {
                "compliance_maps": "Compliance Maps"
            }
        }
    }
};

function deepMerge(target, source) {
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object && key in target && target[key] instanceof Object) {
            deepMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
}

// 1. Merge into EN
if (!en.Header) en.Header = {};
deepMerge(en, NAV_KEYS);

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
console.log('Updated en.json with Nav keys');

// 2. Propagate to others
const files = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json') && f !== 'en.json');

files.forEach(file => {
    const filePath = path.join(messagesDir, file);
    try {
        const localeJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (!localeJson.Header) localeJson.Header = {};
        deepMerge(localeJson, NAV_KEYS); // Use EN keys as placeholders
        fs.writeFileSync(filePath, JSON.stringify(localeJson, null, 2));
        console.log(`Synced ${file}`);
    } catch (e) {
        console.error(`Error syncing ${file}:`, e);
    }
});
