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
        '/research/papers',
        '/research/frameworks',
        '/research/papers/a1-cloud-native-enterprise-reference',
        '/research/papers/a2-high-throughput-distributed-systems',
        '/research/papers/a3-enterprise-observability-operational-intelligence',
        '/research/papers/a4-platform-governance-multicloud-hybrid',
        '/research/papers/a5-monolith-to-cloud-native-modernization',
        '/research/papers/a6-adaptive-policy-enforcement',
        '/research/automated-multilingual-quality-assurance',
        '/research/distributed-systems-resilience',

        '/terms',
        '/ai-data'
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    locales.forEach((locale) => {
        routes.forEach((route) => {
            let priority = 0.8;
            let changeFrequency: 'weekly' | 'monthly' = 'weekly';

            if (route === '') {
                priority = 1;
            } else if (route === '/research/papers/a1-cloud-native-enterprise-reference') {
                priority = 0.9;
                changeFrequency = 'monthly';
            } else if (route.startsWith('/research/papers/a')) {
                priority = 0.7;
                changeFrequency = 'monthly';
            } else if (route === '/research' || route === '/research/papers') {
                priority = 0.8;
                changeFrequency = 'monthly';
            }

            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency,
                priority,
            });
        });
    });

    return sitemapEntries;
}
