/**
 * Navigation Configuration - Single Source of Truth
 * 
 * This file defines all navigation items across the app with:
 * - Translation keys for i18n
 * - Type (page vs section anchor)
 * - Routes and hashes
 * - Icons
 */

import {
    BarChart3, Terminal, GitBranch, ShieldCheck, Database, Activity, Layers,
    Building2, Zap, Box, BookOpen, FileText, Newspaper, Users, Camera,
    Briefcase, HelpCircle, Globe, TrendingUp, Settings, Server, AlertTriangle, Shield
} from 'lucide-react';

export type NavItemType = 'page' | 'section';

export interface NavItem {
    id: string;
    labelKey: string; // i18n translation key
    type: NavItemType;
    section?: string; // Group header translation key
    route?: string; // for pages (without locale prefix)
    hash?: string; // for sections
    icon?: any;
    external?: boolean;
    target?: string;
}

export interface NavGroup {
    id: string;
    labelKey: string;
    mainRoute: string;
    items: NavItem[];
}

/**
 * Main navigation structure
 */
export const NAV_CONFIG: NavGroup[] = [
    {
        id: 'dashboard',
        labelKey: 'Header.nav.dashboard',
        mainRoute: '/dashboard',
        items: [
            // Performance
            { id: 'dashboard-executive', labelKey: 'Header.nav.dashboard_links.executive', type: 'section', route: '/dashboard', hash: 'executive', icon: BarChart3, section: 'Header.nav.performance' },
            { id: 'dashboard-roi', labelKey: 'Header.nav.dashboard_links.roi', type: 'section', route: '/dashboard', hash: 'roi', icon: TrendingUp, section: 'Header.nav.performance' },
            { id: 'dashboard-cost', labelKey: 'Header.nav.dashboard_links.cost', type: 'section', route: '/dashboard', hash: 'cost', icon: Zap, section: 'Header.nav.performance' },
            { id: 'dashboard-uptime', labelKey: 'Header.nav.dashboard_links.uptime', type: 'section', route: '/dashboard', hash: 'uptime', icon: Activity, section: 'Header.nav.performance' },
            { id: 'dashboard-security', labelKey: 'Header.nav.dashboard_links.security', type: 'section', route: '/dashboard', hash: 'security', icon: ShieldCheck, section: 'Header.nav.performance' },
            // Telemetry
            { id: 'dashboard-technical', labelKey: 'Header.nav.dashboard_links.technical', type: 'section', route: '/dashboard', hash: 'technical', icon: Settings, section: 'Header.nav.telemetry' },
            { id: 'dashboard-resources', labelKey: 'Header.nav.dashboard_links.resources', type: 'section', route: '/dashboard', hash: 'resources', icon: Server, section: 'Header.nav.telemetry' },
            { id: 'dashboard-deployment', labelKey: 'Header.nav.dashboard_links.deployment', type: 'section', route: '/dashboard', hash: 'deployment', icon: Activity, section: 'Header.nav.telemetry' },
            { id: 'dashboard-scaling', labelKey: 'Header.nav.dashboard_links.scaling', type: 'section', route: '/dashboard', hash: 'scaling', icon: Layers, section: 'Header.nav.telemetry' },
            { id: 'dashboard-error', labelKey: 'Header.nav.dashboard_links.error', type: 'section', route: '/dashboard', hash: 'error', icon: AlertTriangle, section: 'Header.nav.telemetry' },
        ]
    },
    {
        id: 'products',
        labelKey: 'Header.nav.products',
        mainRoute: '/products',
        items: [
            // Pillars
            { id: 'products-playground', labelKey: 'Header.nav.products_links.playground', type: 'section', route: '/products', hash: 'playground', icon: Terminal, section: 'Header.nav.pillars' },
            { id: 'products-workflows', labelKey: 'Header.nav.products_links.workflows', type: 'section', route: '/products', hash: 'workflows', icon: GitBranch, section: 'Header.nav.pillars' },
            { id: 'products-guard', labelKey: 'Header.nav.products_links.guard', type: 'section', route: '/products', hash: 'guard', icon: ShieldCheck, section: 'Header.nav.pillars' },
            // Advanced
            { id: 'products-knowledge', labelKey: 'Header.nav.products_links.knowledge', type: 'section', route: '/products', hash: 'knowledge', icon: Database, section: 'Header.nav.advanced' },
            { id: 'products-deploy', labelKey: 'Header.nav.products_links.deploy', type: 'section', route: '/products', hash: 'deploy', icon: Activity, section: 'Header.nav.advanced' },
            { id: 'products-nexus', labelKey: 'Header.nav.products_links.nexus', type: 'section', route: '/products', hash: 'nexus', icon: Layers, section: 'Header.nav.advanced' },
        ]
    },
    {
        id: 'solutions',
        labelKey: 'Header.nav.solutions',
        mainRoute: '/solutions',
        items: [
            // Industries
            { id: 'industries-financial', labelKey: 'Header.nav.solutions_links.financial', type: 'section', route: '/solutions', hash: 'financial-services', icon: Building2, section: 'Header.nav.industries' },
            { id: 'industries-insurance', labelKey: 'Header.nav.solutions_links.insurance', type: 'section', route: '/solutions', hash: 'insurance', icon: ShieldCheck, section: 'Header.nav.industries' },
            { id: 'industries-telecom', labelKey: 'Header.nav.solutions_links.telecom', type: 'section', route: '/solutions', hash: 'telecom', icon: Zap, section: 'Header.nav.industries' },
            { id: 'industries-healthcare', labelKey: 'Header.nav.solutions_links.healthcare', type: 'section', route: '/solutions', hash: 'healthcare', icon: Activity, section: 'Header.nav.industries' },
            { id: 'industries-logistics', labelKey: 'Header.nav.solutions_links.logistics', type: 'section', route: '/solutions', hash: 'logistics', icon: Box, section: 'Header.nav.industries' },
            // Use Cases
            // Use Cases
            { id: 'use-cases-financial', labelKey: 'Header.nav.solutions_links.finance_mod', type: 'section', route: '/solutions', hash: 'use-case-financial', icon: BarChart3, section: 'Header.nav.useCases' },
            { id: 'use-cases-healthcare', labelKey: 'Header.nav.solutions_links.health_mod', type: 'section', route: '/solutions', hash: 'use-case-healthcare', icon: Activity, section: 'Header.nav.useCases' },
            { id: 'use-cases-government', labelKey: 'Header.nav.solutions_links.gov_trust', type: 'section', route: '/solutions', hash: 'use-case-government', icon: ShieldCheck, section: 'Header.nav.useCases' },
        ]
    },
    {
        id: 'docs',
        labelKey: 'Header.nav.docs',
        mainRoute: '/docs',
        items: [
            // Research
            { id: 'research-overview', labelKey: 'Header.nav.research_links.overview', type: 'page', route: '/research', icon: BookOpen, section: 'Header.nav.research' },
            { id: 'research-papers', labelKey: 'Header.nav.research_links.papers', type: 'page', route: '/research/papers', icon: FileText, section: 'Header.nav.research' },
            { id: 'research-frameworks', labelKey: 'Header.nav.research_links.frameworks', type: 'page', route: '/research/frameworks/aecp', icon: Layers, section: 'Header.nav.research' },
            // Documentation
            { id: 'docs-main', labelKey: 'Header.nav.docs_links.tech_docs', type: 'section', route: '/docs', hash: 'intro', icon: Terminal, section: 'Header.nav.documentation' },
            { id: 'docs-architecture', labelKey: 'Header.nav.docs_links.patterns', type: 'section', route: '/docs', hash: 'architecture', icon: Layers, section: 'Header.nav.documentation' },
            { id: 'docs-api', labelKey: 'Header.nav.docs_links.api', type: 'section', route: '/docs', hash: 'api', icon: Terminal, section: 'Header.nav.documentation' },
            // Community
            { id: 'visual-library', labelKey: 'Header.nav.docs_links.visual_library', type: 'page', route: '/visual-library', icon: Camera, section: 'Header.nav.community' },
            { id: 'company-newsroom', labelKey: 'Header.nav.docs_links.newsroom', type: 'section', route: '/company', hash: 'newsroom', icon: Newspaper, section: 'Header.nav.community' },
            { id: 'community', labelKey: 'Header.nav.docs_links.open_source', type: 'page', route: '/community', icon: Users, section: 'Header.nav.community' },
        ]
    },
    {
        id: 'pricing',
        labelKey: 'Header.nav.pricing',
        mainRoute: '/pricing',
        items: [
            // Tiers
            { id: 'pricing-developer', labelKey: 'Header.nav.pricing_links.developer', type: 'section', route: '/pricing', hash: 'developer', icon: Briefcase, section: 'Header.nav.tiers' },
            { id: 'pricing-professional', labelKey: 'Header.nav.pricing_links.professional', type: 'section', route: '/pricing', hash: 'professional', icon: Zap, section: 'Header.nav.tiers' },
            { id: 'pricing-business', labelKey: 'Header.nav.pricing_links.business', type: 'section', route: '/pricing', hash: 'business', icon: Building2, section: 'Header.nav.tiers' },
            { id: 'pricing-sovereign', labelKey: 'Header.nav.pricing_links.sovereign', type: 'section', route: '/pricing', hash: 'sovereign', icon: ShieldCheck, section: 'Header.nav.tiers' },
            // Analysis & Value
            { id: 'pricing-savings', labelKey: 'Header.nav.pricing_links.savings_analysis', type: 'section', route: '/pricing', hash: 'savings-analysis', icon: TrendingUp, section: 'Header.nav.analysis' },
            { id: 'pricing-value-economy', labelKey: 'Header.nav.pricing_links.value_economy', type: 'section', route: '/pricing', hash: 'value-economy', icon: Zap, section: 'Header.nav.analysis' },
            { id: 'pricing-visual-arch', labelKey: 'Header.nav.pricing_links.visual_architecture', type: 'section', route: '/pricing', hash: 'visual-architecture', icon: Layers, section: 'Header.nav.analysis' },
            // Trust & Compliance
            { id: 'pricing-compliance', labelKey: 'Header.nav.pricing_links.compliance', type: 'section', route: '/pricing', hash: 'compliance', icon: ShieldCheck, section: 'Header.nav.trust_compliance' },
            { id: 'pricing-trust', labelKey: 'Header.nav.pricing_links.trust', type: 'section', route: '/pricing', hash: 'trust', icon: Shield, section: 'Header.nav.trust_compliance' },
            { id: 'pricing-faq', labelKey: 'Header.nav.pricing_links.faq', type: 'section', route: '/pricing', hash: 'faq', icon: HelpCircle, section: 'Header.nav.trust_compliance' },
        ]
    },
    {
        id: 'company',
        labelKey: 'Header.nav.company',
        mainRoute: '/company',
        items: [
            // Organization
            { id: 'company-about', labelKey: 'Header.nav.company_links.about', type: 'section', route: '/company', hash: 'about', icon: Building2, section: 'Header.nav.organization' },
            { id: 'company-leadership', labelKey: 'Header.nav.company_links.leadership', type: 'section', route: '/company', hash: 'leadership', icon: Users, section: 'Header.nav.organization' },
            { id: 'company-operations', labelKey: 'Header.nav.company_links.operations', type: 'section', route: '/company', hash: 'global-operations', icon: Globe, section: 'Header.nav.organization' },
            { id: 'company-newsroom-main', labelKey: 'Header.nav.company_links.newsroom', type: 'section', route: '/company', hash: 'newsroom', icon: Newspaper, section: 'Header.nav.organization' },
            { id: 'company-investors', labelKey: 'Header.nav.company_links.investors', type: 'section', route: '/company', hash: 'investors', icon: TrendingUp, section: 'Header.nav.organization' },
            // Contact
            { id: 'company-executive', labelKey: 'Header.nav.company_links.executive', type: 'section', route: '/company', hash: 'executive-office', icon: Briefcase, section: 'Header.nav.contact_us' },
            { id: 'contact', labelKey: 'Header.nav.company_links.contact', type: 'page', route: '/contact', icon: FileText, section: 'Header.nav.contact_us' },
            { id: 'contact-hq', labelKey: 'Header.nav.company_links.global_hq', type: 'section', route: '/contact', hash: 'hq', icon: Globe, section: 'Header.nav.contact_us' },
            { id: 'security-compliance', labelKey: 'Header.nav.trust_links.compliance_maps', type: 'section', route: '/security', hash: 'compliance-maps', icon: ShieldCheck, section: 'Header.nav.contact_us' },
        ]
    },
];

/**
 * Helper to build full URL with locale
 */
export function buildNavUrl(item: NavItem, locale: string): string {
    const base = `/${locale}${item.route || ''}`;
    return item.hash ? `${base}#${item.hash}` : base;
}

/**
 * Helper to check if nav item is currently active
 */
export function isNavItemActive(item: NavItem, currentPath: string, currentHash: string): boolean {
    if (item.type === 'section') {
        const pathMatches = currentPath.includes(item.route || '');
        const hashMatches = currentHash === item.hash;
        return pathMatches && hashMatches;
    }
    return currentPath.includes(item.route || '');
}
