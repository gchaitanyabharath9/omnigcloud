import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://omnigcloud.com'
    const currentDate = new Date()

    // Main pages
    const mainPages = [
        '',
        '/about',
        '/pricing',
        '/contact',
        '/blog',
        '/research',
        '/solutions',
        '/platform',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }))

    // Research papers (high priority for SEO)
    const researchPapers = [
        '/research/papers/a1-cloud-native-enterprise-reference',
        '/research/papers/a2-high-throughput-distributed-systems',
        '/research/papers/a3-enterprise-observability-operational-intelligence',
        '/research/papers/a4-platform-governance-multicloud-hybrid',
        '/research/papers/a5-monolith-to-cloud-native-modernization',
        '/research/papers/a6-adaptive-policy-enforcement',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    // Scholarly article and frameworks
    const academicContent = [
        '/research/scholarly-article',
        '/research/frameworks/aecp',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    return [...mainPages, ...researchPapers, ...academicContent]
}
