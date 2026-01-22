
import fs from 'fs';
import path from 'path';

const EN_FILE = path.resolve(process.cwd(), 'src/messages/en.json');

const TITLES = [
    "Sovereign Cloud Mastery",
    "Enterprise Control Plane",
    "Autonomous Governance",
    "Multi-Cloud Compliance",
    "Infrastructure Sovereignty",
    "Data Residency Control",
    "Zero-Trust Architecture",
    "Global Policy Enforcement"
];

const DESCRIPTIONS = [
    "OmniGCloud provides a unified control plane to enforce data sovereignty across all your cloud providers.",
    "Decouple your business logic from vendor-specific APIs and regain full control of your digital estate.",
    "Automate compliance with real-time drift detection and auto-remediation policies.",
    "Ensure your data never leaves the jurisdiction you define, regardless of the underlying infrastructure.",
    "Seamlessly orchestrate workloads across AWS, Azure, and Google Cloud with strict governance boundaries.",
    "Achieve FIPS 140-2 Level 3 compliance with our shielded execution environments."
];

const SUBTITLES = [
    "Empowering the next generation of regulated enterprise.",
    "Control your data. Control your future.",
    "The standard for autonomous cloud governance.",
    "Security, compliance, and velocity in one platform."
];

const STEPS = [
    "Define your governance intent.",
    "Deploy the control plane agent.",
    "Monitor real-time infrastructure drift.",
    "Enforce auto-remediation policies.",
    "Generate audit-ready compliance reports."
];


function getRandom(arr: string[], salt: string) {
    let hash = 0;
    for (let i = 0; i < salt.length; i++) {
        hash = ((hash << 5) - hash) + salt.charCodeAt(i);
        hash |= 0;
    }
    return arr[Math.abs(hash) % arr.length];
}

function processValue(key: string, value: string, parentKey: string = ''): string {
    const trimmed = value.trim();

    // Explicit Fixes (User Request)
    if (key === 'liveTitle') return "System Operational Status";
    if (key === 'liveSubtitle') return "Real-time system performance metrics.";
    if (key === 'roiTitle') return "Cost & ROI Analysis";
    if (key === 'roiSubtitle') return "Projected savings and efficiency gains.";
    if (key === 'infraTitle') return "Infrastructure Health";
    if (key === 'infraSubtitle') return "Global node status and uptime.";
    if (key === 'trustTitle') return "Trust Compliance Score";
    if (key === 'optimizationTitle') return "Resource Optimization";

    // Pattern 1: Comprehensive content...
    if (/^Comprehensive (details|content) (regarding|for)/.test(trimmed)) {
        return getRandom(DESCRIPTIONS, key + parentKey);
    }

    // Pattern 2: Discover the power of...
    if (/^Discover the power of/.test(trimmed)) {
        return getRandom(SUBTITLES, key + parentKey);
    }

    // Pattern 3: Subtitle placeholders
    if (/Subtitle/i.test(trimmed) || trimmed === 'Live Subtitle' || trimmed === 'Roi Subtitle' || trimmed === 'Infra Subtitle') {
        return getRandom(SUBTITLES, key + parentKey);
    }

    // Pattern 4: Key + Title (e.g. "Hero Title")
    if (trimmed === `${parentKey} Title` || trimmed === `${key} Title` || trimmed === 'Title') {
        if (key === 'title') {
            // Try to make it better based on parent
            if (['Pricing', 'Home', 'Dashboard', 'Security', 'Compliance'].includes(parentKey)) {
                return `${parentKey} Overview`;
            }
            return getRandom(TITLES, key + parentKey);
        }
        return "Section Overview";
    }

    // Pattern 5: P1, P2...
    if (/^[PS]\d+$/.test(trimmed) || /^Step\d+$/.test(trimmed) || /^Infra\d+$/.test(trimmed)) {
        return getRandom(STEPS, key + parentKey);
    }

    // Pattern 6: Single word Title Case that equals key
    if (key.length > 2 && trimmed.toLowerCase() === key.toLowerCase() && !trimmed.includes(' ')) {
        if (key === 'active') return "Active Status";
        if (key === 'role') return "User Role";
        if (key === 'welcome') return "Welcome Back";
        return `${trimmed} Overview`;
    }

    // Pattern 7: "Link", "Status"
    if (trimmed === 'Link') return "View Resources";
    if (trimmed === 'Status') return "Active";
    if (trimmed === 'Exhibit') return "Figure 1";

    return value;
}

function traverse(obj: Record<string, any>, parentKey: string = '') {
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            traverse(obj[key], key);
        } else if (typeof obj[key] === 'string') {
            obj[key] = processValue(key, obj[key], parentKey);
        } else if (Array.isArray(obj[key])) {
            obj[key].forEach((item: Record<string, any>) => {
                if (typeof item === 'object') traverse(item, key);
                // if string array?
            });
        }
    }
}

async function run() {
    console.log('🛠 Fixing EN placeholders...');
    const en = JSON.parse(fs.readFileSync(EN_FILE, 'utf-8'));
    traverse(en);
    fs.writeFileSync(EN_FILE, JSON.stringify(en, null, 2));
    console.log('✅ EN file updated with real content.');
}

run();
