import { config } from '@/config';
import { MetadataRoute } from 'next';

export const revalidate = 86400; // Cache for 24 hours

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = config.site.url;
    const locales = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];

    const routes = [
        '',
        '/platform',
        '/platform/ai-engine',
        '/platform/observability',
        '/products',
        '/services',
        '/services/cloud-modernization',
        '/services/devops',
        '/services/microservices',
        '/services/cloud-migration',
        '/services/openshift-modernization',
        '/services/application-modernization',
        '/services/cloud-cost-optimization',
        '/services/ai-cloud-platform',
        '/industries/finance',
        '/industries/healthcare',
        '/resources/blog/cloud-modernization-guide',
        '/resources/blog/devops-best-practices',
        '/resources/blog/sovereignty-framework',
        '/resources/blog/cio-exit-strategy',
        '/solutions',
        '/industries',
        '/pricing',
        '/security',
        '/compliance',
        '/privacy',
        '/use-cases',
        '/company',
        '/founder',
        '/architecture',
        '/contact',
        '/docs',
        '/docs/whitepaper',
        '/case-studies',
        '/blog',
        '/newsroom',
        '/community',
        '/partners',
        '/staffing',
        '/research',
        '/research/metrics',
        '/research/architecture',
        '/research/automated-multilingual-quality-assurance',
        '/research/distributed-systems-resilience',
        '/publications',
        '/architecture/a1-cloud-native-enterprise-reference',
        '/architecture/cloud-native-reference-architecture',
        '/architecture/ai-driven-enterprise-observability',
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
