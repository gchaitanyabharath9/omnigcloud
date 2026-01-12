import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://omnigcloud.com'
    const currentDate = new Date()
    const locales = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko']

    // Base routes to internationalize
    const routes = [
        '',
        '/about',
        '/pricing',
        '/contact',
        '/blog',
        '/research',
        '/solutions',
        '/platform',
    ]

    // Research papers
    const researchRoutes = [
        '/research/papers/a1-cloud-native-enterprise-reference',
        '/research/papers/a2-high-throughput-distributed-systems',
        '/research/papers/a3-enterprise-observability-operational-intelligence',
        '/research/papers/a4-platform-governance-multicloud-hybrid',
        '/research/papers/a5-monolith-to-cloud-native-modernization',
        '/research/papers/a6-adaptive-policy-enforcement',
    ]

    // Academic content
    const academicRoutes = [
        '/research/scholarly-article',
        '/research/frameworks/aecp',
    ]

    const allRoutes = [...routes, ...academicRoutes]

    const sitemapEntries: MetadataRoute.Sitemap = []

    for (const route of allRoutes) {
        for (const locale of locales) {
            const priority = route === '' ? 1.0 : (route.includes('/research/') ? 0.9 : 0.8)
            const changeFrequency = route.includes('/research/') ? 'monthly' : 'weekly'

            // Handle root path correctly
            const urlPath = route === '' ? `/${locale}` : `/${locale}${route}`

            sitemapEntries.push({
                url: `${baseUrl}${urlPath}`,
                lastModified: currentDate,
                changeFrequency: changeFrequency as any, // Cast to any to satisfy stricter types if needed
                priority: priority,
            })
        }
    }

    // Add root URL (x-default behavior usually handled by headers, but good to have)
    // Note: The root '/' redirects to '/en', so strictly speaking we might exclude it 
    // to avoid "Page with redirect" in GSC, but for discovery it's often kept.
    // However, to strictly fix the GSC warning, we should point to the canonicals. 
    // The localized versions ABOVE are the canonicals.
    // We will OMIT the bare root '/' to prevent the redirect warning, 
    // relying on the locale-specific entries.

    return sitemapEntries
}
