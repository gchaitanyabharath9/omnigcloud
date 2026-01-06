import { MetadataRoute } from 'next'
import { config } from '@/config'

export const revalidate = 86400; // Cache for 24 hours

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: ['/', '/docs/whitepaper'],
                disallow: [
                    '/content/',
                    '/private/',
                    '/_next/',
                    '/AECP-Whitepaper-*.pdf',
                    '/tmp/',
                    '/dashboard/',
                    '/en/dashboard/',
                    '/es/dashboard/',
                    '/fr/dashboard/',
                    '/de/dashboard/',
                    '/zh/dashboard/',
                    '/hi/dashboard/',
                    '/ja/dashboard/',
                    '/ko/dashboard/',
                ],
            },
            {
                userAgent: 'GPTBot',
                disallow: ['/docs/whitepaper'], // Protect research intellectual property from basic crawlers if required
            }
        ],
        sitemap: `${config.site.url}/sitemap.xml`,
    }
}
