import { MetadataRoute } from 'next'

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
        sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://omnigcloud.com'}/sitemap.xml`,
    }
}
