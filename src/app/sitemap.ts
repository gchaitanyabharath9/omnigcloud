import { MetadataRoute } from 'next'
import { config } from '@/config'
import { locales } from '@/navigation'
import { PUBLIC_ROUTES_MANIFEST } from '@/config/routes'

/**
 * Sitemap Generator
 * 
 * Generates a sitemap.xml for all public routes across all supported locales.
 * Uses a stable lastModified strategy to prevent unnecessary search engine re-indexing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = config.site.url.replace(/\/$/, '') // Remove trailing slash if any

    // Use a stable date (1st of the current month) to avoid daily churn
    const lastModified = new Date();
    lastModified.setHours(0, 0, 0, 0);
    lastModified.setDate(1);

    const sitemapEntries: MetadataRoute.Sitemap = []

    // Generate entries for all routes in all locales
    for (const route of PUBLIC_ROUTES_MANIFEST) {
        for (const locale of locales) {
            // Handle root path vs subpaths
            const path = route.path === '' ? '' : route.path
            const urlPath = `/${locale}${path}`

            sitemapEntries.push({
                url: `${baseUrl}${urlPath}`,
                lastModified,
                changeFrequency: route.changeFreq,
                priority: route.priority,
            })
        }
    }

    // Sort by priority (desc) then URL (asc)
    return sitemapEntries.sort((a, b) => {
        if (b.priority !== a.priority) {
            return (b.priority || 0) - (a.priority || 0)
        }
        return a.url.localeCompare(b.url)
    })
}
