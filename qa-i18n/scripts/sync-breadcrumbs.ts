import fs from 'fs';
import path from 'path';

const ROUTES_PATH = path.join(process.cwd(), 'qa-i18n/routes.json');
const EN_PATH = path.join(process.cwd(), 'messages/en.json');

function syncBreadcrumbs() {
    const routes = JSON.parse(fs.readFileSync(ROUTES_PATH, 'utf-8'));
    const en = JSON.parse(fs.readFileSync(EN_PATH, 'utf-8'));

    if (!en.Breadcrumb) en.Breadcrumb = {};

    const segments = new Set<string>();
    routes.forEach((route: string) => {
        route.split('/').filter(Boolean).forEach(seg => {
            if (!seg.startsWith('[') && !seg.endsWith(']')) {
                segments.add(seg);
            }
        });
    });

    const mapping: Record<string, string> = {
        'ai-data': 'AI Data',
        'app': 'Application',
        'settings': 'Settings',
        'security': 'Security',
        'architecture': 'Architecture',
        'blog': 'Blog',
        'business-ideas': 'Business Ideas',
        'case-studies': 'Case Studies',
        'command-center': 'Command Center',
        'community': 'Community',
        'company': 'Company',
        'compliance': 'Compliance',
        'contact': 'Contact',
        'dashboard': 'Dashboard',
        'executive': 'Executive',
        'technical': 'Technical',
        'demo': 'Demo',
        'docs': 'Documentation',
        'api': 'API',
        'governance': 'Governance',
        'guide': 'Guide',
        'whitepaper': 'Whitepaper',
        'founder': 'Founder',
        'industries': 'Industries',
        'newsroom': 'Newsroom',
        'onboarding': 'Onboarding',
        'partners': 'Partners',
        'platform': 'Platform',
        'ai-engine': 'AI Engine',
        'observability': 'Observability',
        'pricing': 'Pricing',
        'privacy': 'Privacy',
        'products': 'Products',
        'register': 'Register',
        'research': 'Research',
        'metrics': 'Metrics',
        'resources': 'Resources',
        'services': 'Services',
        'ai-cloud-platform': 'AI Cloud Platform',
        'application-modernization': 'App Modernization',
        'cloud-cost-optimization': 'Cost Optimization',
        'cloud-modernization': 'Cloud Modernization',
        'openshift-modernization': 'OpenShift Modernization',
        'solutions': 'Solutions',
        'staffing': 'Staffing',
        'terms': 'Terms',
        'use-cases': 'Use Cases',
        'visual-library': 'Visual Library',
        'security_page': 'Sovereignty & Trust',
        'home': 'Home'
    };

    let addedCount = 0;
    segments.forEach(seg => {
        if (!en.Breadcrumb[seg]) {
            en.Breadcrumb[seg] = mapping[seg] || (seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' '));
            addedCount++;
        }
    });

    fs.writeFileSync(EN_PATH, JSON.stringify(en, null, 2) + '\n');
    console.log(`✅ Added ${addedCount} missing breadcrumb keys to en.json`);
}

syncBreadcrumbs();
