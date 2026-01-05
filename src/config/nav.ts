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
    Briefcase, HelpCircle, Globe, TrendingUp, Settings, Server, AlertTriangle
} from 'lucide-react';

export type NavItemType = 'page' | 'section';

export interface NavItem {
    id: string;
    labelKey: string; // i18n translation key
    type: NavItemType;
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
            { id: 'dashboard-executive', labelKey: 'Header.nav.dashboard_links.executive', type: 'section', route: '/dashboard', hash: 'executive', icon: BarChart3 },
            { id: 'dashboard-roi', labelKey: 'Header.nav.dashboard_links.roi', type: 'section', route: '/dashboard', hash: 'roi', icon: TrendingUp },
            { id: 'dashboard-cost', labelKey: 'Header.nav.dashboard_links.cost', type: 'section', route: '/dashboard', hash: 'cost', icon: Zap },
            { id: 'dashboard-uptime', labelKey: 'Header.nav.dashboard_links.uptime', type: 'section', route: '/dashboard', hash: 'uptime', icon: Activity },
            { id: 'dashboard-security', labelKey: 'Header.nav.dashboard_links.security', type: 'section', route: '/dashboard', hash: 'security', icon: ShieldCheck },
            // Telemetry
            { id: 'dashboard-technical', labelKey: 'Header.nav.dashboard_links.technical', type: 'section', route: '/dashboard', hash: 'technical', icon: Settings },
            { id: 'dashboard-resources', labelKey: 'Header.nav.dashboard_links.resources', type: 'section', route: '/dashboard', hash: 'resources', icon: Server },
            { id: 'dashboard-deployment', labelKey: 'Header.nav.dashboard_links.deployment', type: 'section', route: '/dashboard', hash: 'deployment', icon: Activity },
            { id: 'dashboard-scaling', labelKey: 'Header.nav.dashboard_links.scaling', type: 'section', route: '/dashboard', hash: 'scaling', icon: Layers },
            { id: 'dashboard-error', labelKey: 'Header.nav.dashboard_links.error', type: 'section', route: '/dashboard', hash: 'error', icon: AlertTriangle },
        ]
    },
    {
        id: 'products',
        labelKey: 'Header.nav.products',
        mainRoute: '/products',
        items: [
            // Pillars
            { id: 'products-playground', labelKey: 'Header.nav.products_links.playground', type: 'section', route: '/products', hash: 'playground', icon: Terminal },
            { id: 'products-workflows', labelKey: 'Header.nav.products_links.workflows', type: 'section', route: '/products', hash: 'workflows', icon: GitBranch },
            { id: 'products-guard', labelKey: 'Header.nav.products_links.guard', type: 'section', route: '/products', hash: 'guard', icon: ShieldCheck },
            // Advanced
            { id: 'products-knowledge', labelKey: 'Header.nav.products_links.knowledge', type: 'section', route: '/products', hash: 'knowledge', icon: Database },
            { id: 'products-deploy', labelKey: 'Header.nav.products_links.deploy', type: 'section', route: '/products', hash: 'deploy', icon: Activity },
            { id: 'products-nexus', labelKey: 'Header.nav.products_links.nexus', type: 'section', route: '/products', hash: 'nexus', icon: Layers },
        ]
    },
    {
        id: 'solutions',
        labelKey: 'Header.nav.solutions',
        mainRoute: '/solutions',
        items: [
            // Industries
            { id: 'industries-financial', labelKey: 'Header.nav.solutions_links.financial', type: 'page', route: '/industries/financial-services', icon: Building2 },
            { id: 'industries-insurance', labelKey: 'Header.nav.solutions_links.insurance', type: 'page', route: '/industries/insurance', icon: ShieldCheck },
            { id: 'industries-telecom', labelKey: 'Header.nav.solutions_links.telecom', type: 'page', route: '/industries/telecom', icon: Zap },
            { id: 'industries-healthcare', labelKey: 'Header.nav.solutions_links.healthcare', type: 'page', route: '/industries/healthcare', icon: Activity },
            { id: 'industries-logistics', labelKey: 'Header.nav.solutions_links.logistics', type: 'page', route: '/industries/logistics', icon: Box },
            // Use Cases
            { id: 'use-cases-financial', labelKey: 'Header.nav.solutions_links.finance_mod', type: 'page', route: '/use-cases/financial', icon: BarChart3 },
            { id: 'use-cases-healthcare', labelKey: 'Header.nav.solutions_links.health_mod', type: 'page', route: '/use-cases/healthcare', icon: Activity },
            { id: 'use-cases-government', labelKey: 'Header.nav.solutions_links.gov_trust', type: 'page', route: '/use-cases/government', icon: ShieldCheck },
        ]
    },
    {
        id: 'docs',
        labelKey: 'Header.nav.docs',
        mainRoute: '/docs',
        items: [
            // Documentation
            { id: 'docs-main', labelKey: 'Header.nav.docs_links.tech_docs', type: 'page', route: '/docs', icon: BookOpen },
            { id: 'docs-architecture', labelKey: 'Header.nav.docs_links.patterns', type: 'page', route: '/docs/architecture', icon: Layers },
            { id: 'docs-whitepaper', labelKey: 'Header.nav.docs_links.whitepaper', type: 'page', route: '/docs/whitepaper', icon: FileText },
            { id: 'docs-guide', labelKey: 'Header.nav.docs_links.guide', type: 'page', route: '/docs/guide', icon: BookOpen },
            { id: 'docs-api', labelKey: 'Header.nav.docs_links.api', type: 'page', route: '/docs/api', icon: Terminal },
            // Community
            { id: 'visual-library', labelKey: 'Header.nav.docs_links.visual_library', type: 'page', route: '/visual-library', icon: Camera },
            { id: 'company-newsroom', labelKey: 'Header.nav.docs_links.newsroom', type: 'page', route: '/company#newsroom', icon: Newspaper },
            { id: 'community', labelKey: 'Header.nav.docs_links.open_source', type: 'page', route: '/community', icon: Users },
        ]
    },
    {
        id: 'pricing',
        labelKey: 'Header.nav.pricing',
        mainRoute: '/pricing',
        items: [
            // Tiers
            { id: 'pricing-developer', labelKey: 'Header.nav.pricing_links.developer', type: 'section', route: '/pricing', hash: 'developer', icon: Briefcase },
            { id: 'pricing-professional', labelKey: 'Header.nav.pricing_links.professional', type: 'section', route: '/pricing', hash: 'professional', icon: Zap },
            { id: 'pricing-business', labelKey: 'Header.nav.pricing_links.business', type: 'section', route: '/pricing', hash: 'business', icon: Building2 },
            { id: 'pricing-sovereign', labelKey: 'Header.nav.pricing_links.sovereign', type: 'section', route: '/pricing', hash: 'sovereign', icon: ShieldCheck },
            // Information
            { id: 'pricing-compare', labelKey: 'Header.nav.pricing_links.compare', type: 'page', route: '/pricing', icon: Layers },
            { id: 'pricing-trust', labelKey: 'Header.nav.pricing_links.trust', type: 'section', route: '/pricing', hash: 'trust', icon: ShieldCheck },
            { id: 'pricing-faq', labelKey: 'Header.nav.pricing_links.faq', type: 'section', route: '/pricing', hash: 'faq', icon: HelpCircle },
        ]
    },
    {
        id: 'company',
        labelKey: 'Header.nav.company',
        mainRoute: '/company',
        items: [
            // Organization
            { id: 'company-about', labelKey: 'Header.nav.company_links.about', type: 'section', route: '/company', hash: 'about', icon: Building2 },
            { id: 'company-leadership', labelKey: 'Header.nav.company_links.leadership', type: 'section', route: '/company', hash: 'leadership', icon: Users },
            { id: 'company-operations', labelKey: 'Header.nav.company_links.operations', type: 'section', route: '/company', hash: 'global-operations', icon: Globe },
            { id: 'company-newsroom-main', labelKey: 'Header.nav.company_links.newsroom', type: 'section', route: '/company', hash: 'newsroom', icon: Newspaper },
            // Contact
            { id: 'company-executive', labelKey: 'Header.nav.company_links.executive', type: 'section', route: '/company', hash: 'executive-office', icon: Briefcase },
            { id: 'contact', labelKey: 'Header.nav.company_links.contact', type: 'page', route: '/contact', icon: FileText },
            { id: 'contact-hq', labelKey: 'Header.nav.company_links.global_hq', type: 'section', route: '/contact', hash: 'hq', icon: Globe },
            { id: 'security-compliance', labelKey: 'Header.nav.trust_links.compliance_maps', type: 'section', route: '/security', hash: 'compliance-maps', icon: ShieldCheck },
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
