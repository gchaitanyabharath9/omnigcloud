import { MetadataRoute } from 'next'
import { config } from '@/config'
import { locales } from '@/navigation'
import { PRIVATE_ROUTES } from '@/config/routes'

export const revalidate = 86400; // Cache for 24 hours

export default function robots(): MetadataRoute.Robots {
    const baseUrl = config.site.url.replace(/\/$/, '')

    // Generate disallow rules for all private routes across all locales
    const localeDisallows = locales.flatMap(locale =>
        PRIVATE_ROUTES.map(route => `/${locale}${route}`)
    );

    return {
        rules: [
            {
                userAgent: '*',
                allow: ['/', '/docs/whitepaper'],
                disallow: [
                    '/content/',
                    '/private/',
                    '/_next/',
                    '/*.pdf',
                    '/tmp/',
                    ...localeDisallows,
                    // Also disallow non-locale prefixed private paths just in case
                    ...PRIVATE_ROUTES.map(route => `${route}/`),
                ],
            },
            {
                userAgent: 'GPTBot',
                disallow: ['/'],
            },
            {
                userAgent: 'CCBot',
                disallow: ['/'],
            },
            {
                userAgent: 'Google-Extended',
                disallow: ['/'],
            },
            {
                userAgent: 'anthropic-ai',
                disallow: ['/'],
            },
            {
                userAgent: 'Claude-Web',
                disallow: ['/'],
            },
            {
                userAgent: 'FacebookBot',
                disallow: ['/'],
            },
            {
                userAgent: 'Bytespider',
                disallow: ['/'],
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
