import { MetadataRoute } from 'next'
import { config } from '@/config'
import { locales } from '@/navigation'
import { PUBLIC_ROUTES_MANIFEST } from '@/config/routes'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = config.site.url || 'https://www.omnigcloud.com'

    // Use a stable date (e.g., the start of the current month) to avoid daily churn in search engines
    // unless content actually changes. For a demo/static-ish site, monthly or constant is better.
    const lastModified = new Date();
    lastModified.setHours(0, 0, 0, 0);
    lastModified.setDate(1); // Set to 1st of the month for stability

    const sitemapEntries: MetadataRoute.Sitemap = []

    // Generate entries for all routes in all locales
    for (const route of PUBLIC_ROUTES_MANIFEST) {
        for (const locale of locales) {
            // Handle root path correctly
            const urlPath = route.path === '' ? `/${locale}` : `/${locale}${route.path}`

            sitemapEntries.push({
                url: `${baseUrl}${urlPath}`,
                lastModified: lastModified,
                changeFrequency: route.changeFreq,
                priority: route.priority,
            })
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
