import fs from 'fs';
import path from 'path';

// This script extracts Tier-1 keys from the codebase
// 1. Navigation keys from src/config/nav.ts
// 2. Metadata keys (Metadata.*, Header.title)
// 3. CTA keys (Hero.*, HomeSections.Cta.*)

const SRC_DIR = path.join(process.cwd(), 'src');
const OUTPUT_PATH = path.join(process.cwd(), 'qa-i18n/scripts/tier1-keys.json');

function extractNavKeys() {
    const navPath = path.join(SRC_DIR, 'config/nav.ts');
    if (!fs.existsSync(navPath)) return [];
    const content = fs.readFileSync(navPath, 'utf-8');
    const keys = new Set<string>();

    // Simple regex to find labelKey: '...'
    const regex = /labelKey:\s*['"](.*?)['"]/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        keys.add(match[1]);
    }
    return Array.from(keys);
}

function getHardcodedTier1Keys() {
    return [
        // Global Metadata
        'Metadata.default.title',
        'Metadata.default.description',
        'Header.title',

        // Page Metadata
        'Metadata.Home.title',
        'Metadata.Home.description',
        'Metadata.Pricing.title',
        'Metadata.Pricing.description',
        'Metadata.Products.title',
        'Metadata.Products.description',

        // CTAs & Essential Logic
        'Hero.ctaPrimary',
        'Hero.ctaArchitecture',
        'Hero.ctaWhitepaper',
        'HomeSections.Cta.primary',
        'HomeSections.Cta.secondary',
        'HomeSections.Pricing.core.cta',
        'HomeSections.Pricing.enterprise.cta',
        'HomeSections.Pricing.federal.cta',
        'Pricing.plans.developer.cta',
        'Pricing.plans.professional.cta',
        'Pricing.plans.business.cta',
        'Pricing.plans.sovereign.cta',
        'Header.nav.contactSales',
        'ContactSales.subject',
        'ContactSales.bodyIntro',
        'ContactSales.fallbackTitle',
        'ContactSales.fallbackInstruction',
        'ContactSales.copyLabel',
        'ContactSales.whatsappLabel',
        'ContactSales.rateLimitMessage',
        'ContactSales.copyToast'
    ];
}

async function generate() {
    console.log('🔍 Generating Tier-1 Key List...');
    const navKeys = extractNavKeys();
    const hardcoded = getHardcodedTier1Keys();

    const allTier1 = Array.from(new Set([...navKeys, ...hardcoded])).sort();

    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(allTier1, null, 2));

    console.log(`✅ Generated ${allTier1.length} Tier-1 keys at ${OUTPUT_PATH}`);
}

generate();
