import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.omnigcloud.com'
    const currentDate = new Date()
    const locales = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko']

    // Main pages (Priority: 1.0)
    const mainPages = [
        '', // Homepage
        '/pricing',
        '/products',
        '/solutions',
        '/dashboard',
        '/company',
        '/contact',
    ]

    // Documentation & Resources (Priority: 0.9)
    const docsPages = [
        '/docs',
        '/docs/whitepaper',
        '/research',
        '/research/papers',
        '/research/frameworks',
        '/visual-library',
        '/community',
    ]

    // Research Papers (Priority: 0.9)
    const researchPapers = [
        '/research/papers/a1-cloud-native-enterprise-reference',
        '/research/papers/a2-high-throughput-distributed-systems',
        '/research/papers/a3-enterprise-observability-operational-intelligence',
        '/research/papers/a4-platform-governance-multicloud-hybrid',
        '/research/papers/a5-monolith-to-cloud-native-modernization',
        '/research/papers/a6-adaptive-policy-enforcement',
    ]

    // Research Frameworks (Priority: 0.9)
    const researchFrameworks = [
        '/research/frameworks/aecp',
        '/research/scholarly-article',
        '/research/distributed-systems-resilience',
        '/research/automated-multilingual-quality-assurance',
    ]

    // Services (Priority: 0.8)
    const servicePages = [
        '/services/cloud-migration',
        '/services/cloud-modernization',
        '/services/microservices',
        '/services/devops',
    ]

    // Industries (Priority: 0.8)
    const industryPages = [
        '/industries/finance',
        '/industries/healthcare',
    ]

    // Platform Pages (Priority: 0.8)
    const platformPages = [
        '/platform/ai-engine',
        '/platform/observability',
    ]

    // Company Pages (Priority: 0.7)
    const companyPages = [
        '/newsroom',
        '/partners',
        '/publications',
        '/founder',
    ]

    // Legal Pages (Priority: 0.5)
    const legalPages = [
        '/privacy',
        '/terms',
        '/security',
        '/compliance',
    ]

    // Other Pages (Priority: 0.6)
    const otherPages = [
        '/blog',
        '/case-studies',
        '/onboarding',
        '/demo',
        '/architecture',
    ]

    // Combine all routes with their priorities
    const routeGroups = [
        { routes: mainPages, priority: 1.0, changeFreq: 'daily' as const },
        { routes: docsPages, priority: 0.9, changeFreq: 'weekly' as const },
        { routes: researchPapers, priority: 0.9, changeFreq: 'monthly' as const },
        { routes: researchFrameworks, priority: 0.9, changeFreq: 'monthly' as const },
        { routes: servicePages, priority: 0.8, changeFreq: 'weekly' as const },
        { routes: industryPages, priority: 0.8, changeFreq: 'weekly' as const },
        { routes: platformPages, priority: 0.8, changeFreq: 'weekly' as const },
        { routes: companyPages, priority: 0.7, changeFreq: 'monthly' as const },
        { routes: otherPages, priority: 0.6, changeFreq: 'weekly' as const },
        { routes: legalPages, priority: 0.5, changeFreq: 'yearly' as const },
    ]

    const sitemapEntries: MetadataRoute.Sitemap = []

    // Generate entries for all routes in all locales
    for (const group of routeGroups) {
        for (const route of group.routes) {
            for (const locale of locales) {
                // Handle root path correctly
                const urlPath = route === '' ? `/${locale}` : `/${locale}${route}`

                sitemapEntries.push({
                    url: `${baseUrl}${urlPath}`,
                    lastModified: currentDate,
                    changeFrequency: group.changeFreq,
                    priority: group.priority,
                })
            }
        }
    }

    // Sort by priority (highest first) then by URL
    sitemapEntries.sort((a, b) => {
        if (b.priority !== a.priority) {
            return (b.priority || 0) - (a.priority || 0)
        }
        return a.url.localeCompare(b.url)
    })

    return sitemapEntries
}
