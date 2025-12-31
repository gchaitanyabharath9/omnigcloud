import { MetadataRoute } from 'next'
import { config } from '@/config'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: ['/', '/docs/whitepaper'],
                disallow: [
                    '/private/',
                    '/_next/',
                    '/AECP-Whitepaper-*.pdf',
                    '/tmp/',
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
