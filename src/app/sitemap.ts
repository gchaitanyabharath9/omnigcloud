import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://omnigcloud.com';
    const locales = ['en', 'fr', 'de', 'es']; // Add supported locales

    const routes = [
        '',
        '/platform',
        '/services',
        '/solutions',
        '/pricing',
        '/security',
        '/compliance',
        '/use-cases',
        '/company',
        '/contact',
        '/docs',
        '/case-studies',
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    locales.forEach((locale) => {
        routes.forEach((route) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1 : 0.8,
            });
        });
    });

    return sitemapEntries;
}
