const fs = require('fs');
const path = require('path');

const EN_FILE = path.resolve(__dirname, '../src/messages/en.json');
const en = JSON.parse(fs.readFileSync(EN_FILE, 'utf-8'));

// Helper to set deep nested keys
function setDeep(obj, path, value) {
    const parts = path.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        // Check if it's an array index
        if (/^\d+$/.test(part)) {
            const idx = parseInt(part);
            if (!Array.isArray(current)) {
                console.warn(`Expected array at ${parts.slice(0, i).join('.')}, converting`);
                current = [];
            }
            while (current.length <= idx) {
                current.push({});
            }
            current = current[idx];
        } else {
            if (current[part] === undefined) {
                // Check if next part is a number (array index)
                if (i + 1 < parts.length - 1 && /^\d+$/.test(parts[i + 1])) {
                    current[part] = [];
                } else {
                    current[part] = {};
                }
            } else if (typeof current[part] !== 'object' || current[part] === null) {
                console.warn(`Converting primitive at ${parts.slice(0, i + 1).join('.')} to object`);
                current[part] = { "_value": current[part] };
            }
            current = current[part];
        }
    }
    const leaf = parts[parts.length - 1];
    if (/^\d+$/.test(leaf)) {
        const idx = parseInt(leaf);
        if (!Array.isArray(current)) {
            console.error(`Cannot set array index on non-array`);
            return;
        }
        while (current.length <= idx) {
            current.push({});
        }
        current[idx] = value;
    } else {
        current[leaf] = value;
    }
}

// Initialize Whitepaper structure if needed
if (!en.Whitepaper) en.Whitepaper = {};

// Add table rows for section3.table1
const table1Rows = [
    { label: "Deployment Time", legacy: "6-8 weeks", aso: "2-4 hours" },
    { label: "Configuration Errors", legacy: "15-20%", aso: "<2%" },
    { label: "Compliance Audit Time", legacy: "40 hours", aso: "4 hours" },
    { label: "Multi-Cloud Support", legacy: "Manual", aso: "Automated" }
];

if (!en.Whitepaper.section3) en.Whitepaper.section3 = {};
if (!en.Whitepaper.section3.table1) en.Whitepaper.section3.table1 = {};
en.Whitepaper.section3.table1.rows = table1Rows;

// Add table rows for section11.table2
const table2Rows = [
    { label: "MTTR (Mean Time To Repair)", legacy: "4-6 hours", aso: "15-30 minutes" },
    { label: "Compliance Violations", legacy: "12-15 per quarter", aso: "0-2 per quarter" },
    { label: "OpEx Savings", legacy: "Baseline", aso: "30-40% reduction" },
    { label: "Deployment Frequency", legacy: "Monthly", aso: "Daily" }
];

if (!en.Whitepaper.section11) en.Whitepaper.section11 = {};
if (!en.Whitepaper.section11.table2) en.Whitepaper.section11.table2 = {};
en.Whitepaper.section11.table2.rows = table2Rows;

// Add table rows for section11.proof.table3
const table3Rows = [
    { label: "Automation Coverage", legacy: "40-50%", aso: "95-98%" },
    { label: "Policy Enforcement", legacy: "Manual", aso: "Automated" },
    { label: "Audit Trail", legacy: "Partial", aso: "Complete" },
    { label: "Cross-Cloud Portability", legacy: "Limited", aso: "Full" }
];

if (!en.Whitepaper.section11.proof) en.Whitepaper.section11.proof = {};
if (!en.Whitepaper.section11.proof.table3) en.Whitepaper.section11.proof.table3 = {};
en.Whitepaper.section11.proof.table3.rows = table3Rows;

// Add ResearchPages.distributedSystems.relatedReading
if (!en.ResearchPages) en.ResearchPages = {};
if (!en.ResearchPages.distributedSystems) en.ResearchPages.distributedSystems = {};
en.ResearchPages.distributedSystems.relatedReading = [
    {
        title: "Cloud-Native Architecture Patterns",
        excerpt: "Exploring modern cloud-native design patterns and best practices",
        category: "Architecture"
    },
    {
        title: "Multi-Cloud Governance Strategies",
        excerpt: "Comprehensive guide to governing resources across multiple cloud providers",
        category: "Governance"
    },
    {
        title: "Automated Compliance in Hybrid Clouds",
        excerpt: "Implementing automated compliance checks in hybrid cloud environments",
        category: "Compliance"
    }
];

// Add Whitepaper.footer
en.Whitepaper.footer = "© 2026 OmniGCloud. All rights reserved.";

fs.writeFileSync(EN_FILE, JSON.stringify(en, null, 2) + '\n', 'utf-8');
console.log('✅ Added all missing array-based and nested keys to en.json');
