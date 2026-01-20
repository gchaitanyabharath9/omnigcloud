/**
 * Add all missing i18n keys to all locale message files
 */

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../src/messages');
const locales = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];

// Missing keys identified from nav.ts and components
const missingKeys = {
    "Header": {
        "nav": {
            "dashboard": "Dashboard",
            "products": "Products",
            "solutions": "Solutions",
            "docs": "Documentation",
            "pricing": "Pricing",
            "company": "Company",
            "performance": "Performance",
            "telemetry": "Telemetry",
            "pillars": "Core Products",
            "advanced": "Advanced Features",
            "industries": "Industries",
            "useCases": "Use Cases",
            "documentation": "Documentation",
            "community": "Community",
            "tiers": "Pricing Tiers",
            "analysis": "Analysis & Value",
            "trust_compliance": "Trust & Compliance",
            "organization": "Organization",
            "contact_us": "Contact Us",
            "dashboard_links": {
                "executive": "Executive Dashboard",
                "roi": "ROI Analysis",
                "cost": "Cost Optimization",
                "uptime": "Uptime Monitoring",
                "security": "Security Overview",
                "technical": "Technical Metrics",
                "resources": "Resource Utilization",
                "deployment": "Deployment Status",
                "scaling": "Auto-Scaling",
                "error": "Error Tracking"
            },
            "products_links": {
                "playground": "Sovereign Playground",
                "workflows": "G-Workflows",
                "guard": "Governance Guard",
                "knowledge": "Sovereign Knowledge",
                "deploy": "Obsidian Deploy",
                "nexus": "Cross-Cloud Nexus"
            },
            "solutions_links": {
                "financial": "Financial Services",
                "insurance": "Insurance",
                "telecom": "Telecommunications",
                "healthcare": "Healthcare",
                "logistics": "Logistics",
                "finance_mod": "Financial Modernization",
                "health_mod": "Healthcare Compliance",
                "gov_trust": "Government Trust"
            },
            "docs_links": {
                "tech_docs": "Technical Documentation",
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
                "sovereign": "Sovereign",
                "savings_analysis": "Savings Analysis",
                "value_economy": "Value Economy",
                "visual_architecture": "Visual Architecture",
                "compliance": "Compliance",
                "trust": "Trust",
                "faq": "FAQ"
            },
            "company_links": {
                "about": "About Us",
                "leadership": "Leadership",
                "operations": "Global Operations",
                "newsroom": "Newsroom",
                "investors": "Investors",
                "executive": "Executive Office",
                "contact": "Contact",
                "global_hq": "Global HQ"
            },
            "trust_links": {
                "compliance_maps": "Compliance Maps"
            }
        }
    }
};

function deepMerge(target, source) {
    for (const key in source) {
        if (source[key] instanceof Object && key in target) {
            Object.assign(source[key], deepMerge(target[key], source[key]));
        }
    }
    Object.assign(target || {}, source);
    return target;
}

for (const locale of locales) {
    const filePath = path.join(messagesDir, `${locale}.json`);

    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const messages = JSON.parse(content);

        // Deep merge missing keys
        deepMerge(messages, missingKeys);

        // Write back with proper formatting
        fs.writeFileSync(filePath, JSON.stringify(messages, null, 2) + '\n', 'utf-8');
        console.log(`✅ Updated ${locale}.json with missing keys`);
    } catch (error) {
        console.error(`❌ Error processing ${locale}.json:`, error.message);
    }
}

console.log('\n✅ All locale files updated with missing navigation keys!');
