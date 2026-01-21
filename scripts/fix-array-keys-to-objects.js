const fs = require('fs');
const path = require('path');

const EN_FILE = path.resolve(__dirname, '../src/messages/en.json');
const en = JSON.parse(fs.readFileSync(EN_FILE, 'utf-8'));

// Initialize Whitepaper structure if needed
if (!en.Whitepaper) en.Whitepaper = {};

// Convert arrays to objects with numeric keys for section3.table1.rows
if (!en.Whitepaper.section3) en.Whitepaper.section3 = {};
if (!en.Whitepaper.section3.table1) en.Whitepaper.section3.table1 = {};
en.Whitepaper.section3.table1.rows = {
    "0": { label: "Deployment Time", legacy: "6-8 weeks", aso: "2-4 hours" },
    "1": { label: "Configuration Errors", legacy: "15-20%", aso: "<2%" },
    "2": { label: "Compliance Audit Time", legacy: "40 hours", aso: "4 hours" },
    "3": { label: "Multi-Cloud Support", legacy: "Manual", aso: "Automated" }
};

// Convert arrays to objects with numeric keys for section11.table2.rows
if (!en.Whitepaper.section11) en.Whitepaper.section11 = {};
if (!en.Whitepaper.section11.table2) en.Whitepaper.section11.table2 = {};
en.Whitepaper.section11.table2.rows = {
    "0": { label: "MTTR (Mean Time To Repair)", legacy: "4-6 hours", aso: "15-30 minutes" },
    "1": { label: "Compliance Violations", legacy: "12-15 per quarter", aso: "0-2 per quarter" },
    "2": { label: "OpEx Savings", legacy: "Baseline", aso: "30-40% reduction" },
    "3": { label: "Deployment Frequency", legacy: "Monthly", aso: "Daily" }
};

// Convert arrays to objects with numeric keys for section11.proof.table3.rows
if (!en.Whitepaper.section11.proof) en.Whitepaper.section11.proof = {};
if (!en.Whitepaper.section11.proof.table3) en.Whitepaper.section11.proof.table3 = {};
en.Whitepaper.section11.proof.table3.rows = {
    "0": { label: "Automation Coverage", legacy: "40-50%", aso: "95-98%" },
    "1": { label: "Policy Enforcement", legacy: "Manual", aso: "Automated" },
    "2": { label: "Audit Trail", legacy: "Partial", aso: "Complete" },
    "3": { label: "Cross-Cloud Portability", legacy: "Limited", aso: "Full" }
};

// Add ResearchPages.distributedSystems.relatedReading as object with numeric keys
if (!en.ResearchPages) en.ResearchPages = {};
if (!en.ResearchPages.distributedSystems) en.ResearchPages.distributedSystems = {};
en.ResearchPages.distributedSystems.relatedReading = {
    "0": {
        title: "Cloud-Native Architecture Patterns",
        excerpt: "Exploring modern cloud-native design patterns and best practices",
        category: "Architecture"
    },
    "1": {
        title: "Multi-Cloud Governance Strategies",
        excerpt: "Comprehensive guide to governing resources across multiple cloud providers",
        category: "Governance"
    },
    "2": {
        title: "Automated Compliance in Hybrid Clouds",
        excerpt: "Implementing automated compliance checks in hybrid cloud environments",
        category: "Compliance"
    }
};

// Add Whitepaper.footer as object (not string) since code uses footer.lab and footer.copyright
if (!en.Whitepaper.footer) en.Whitepaper.footer = {};
en.Whitepaper.footer.lab = "OmniGCloud Research Lab";
en.Whitepaper.footer.copyright = "© 2026 OmniGCloud. All rights reserved.";

fs.writeFileSync(EN_FILE, JSON.stringify(en, null, 2) + '\n', 'utf-8');
console.log('✅ Fixed all array-based keys to use object notation with numeric keys');
