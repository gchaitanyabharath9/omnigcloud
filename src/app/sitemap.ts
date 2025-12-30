import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://omnigcloud.com';
    const locales = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja'];

    const routes = [
        '',
        '/platform',
        '/products',
        '/services',
        '/solutions',
        '/industries',
        '/pricing',
        '/security',
        '/compliance',
        '/privacy',
        '/use-cases',
        '/company',
        '/contact',
        '/docs',
        '/case-studies',
        '/blog',
        '/newsroom',
        '/community',
        '/onboarding',
        '/demo',
        '/partners',
        '/staffing',
        '/research',
        '/terms',
        '/ai-data'
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
