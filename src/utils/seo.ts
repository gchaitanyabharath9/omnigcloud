/**
 * SEO Utilities - Centralized SEO Metadata Generation
 * 
 * This utility provides consistent SEO metadata across all pages including:
 * - Meta descriptions
 * - Open Graph tags
 * - Twitter Cards
 * - Structured Data (Schema.org)
 * - Canonical URLs
 */

import { Metadata } from 'next';

export interface SEOConfig {
    title: string;
    description: string;
    keywords?: string[];
    canonical?: string;
    ogImage?: string;
    ogType?: 'website' | 'article';
    twitterCard?: 'summary' | 'summary_large_image';
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
}

const SITE_NAME = 'OmniGCloud';
const SITE_URL = 'https://www.omnigcloud.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const TWITTER_HANDLE = '@omnigcloud';

/**
 * Generate comprehensive metadata for a page
 */
export function generateSEOMetadata(config: SEOConfig, locale: string = 'en'): Metadata {
    const {
        title,
        description,
        keywords = [],
        canonical,
        ogImage = DEFAULT_OG_IMAGE,
        ogType = 'website',
        twitterCard = 'summary_large_image',
        author,
        publishedTime,
        modifiedTime,
        section,
        tags = []
    } = config;

    const fullTitle = `${title} | ${SITE_NAME}`;
    const canonicalUrl = canonical || `${SITE_URL}/${locale}`;

    return {
        title: fullTitle,
        description,
        keywords: keywords.join(', '),
        authors: author ? [{ name: author }] : undefined,

        // Canonical URL
        alternates: {
            canonical: canonicalUrl,
            languages: {
                'en': `${SITE_URL}/en`,
                'es': `${SITE_URL}/es`,
                'fr': `${SITE_URL}/fr`,
                'de': `${SITE_URL}/de`,
                'zh': `${SITE_URL}/zh`,
                'hi': `${SITE_URL}/hi`,
                'ja': `${SITE_URL}/ja`,
                'ko': `${SITE_URL}/ko`,
            }
        },

        // Open Graph
        openGraph: {
            title: fullTitle,
            description,
            url: canonicalUrl,
            siteName: SITE_NAME,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                }
            ],
            locale,
            type: ogType,
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime }),
            ...(section && { section }),
            ...(tags.length > 0 && { tags }),
        },

        // Twitter Card
        twitter: {
            card: twitterCard,
            title: fullTitle,
            description,
            images: [ogImage],
            creator: TWITTER_HANDLE,
            site: TWITTER_HANDLE,
        },

        // Robots
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },

        // Verification
        verification: {
            google: 'your-google-verification-code',
            // yandex: 'your-yandex-verification-code',
            // bing: 'your-bing-verification-code',
        },
    };
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        description: 'Sovereign Multi-Cloud Platform for Enterprise-Grade Infrastructure',
        sameAs: [
            'https://twitter.com/omnigcloud',
            'https://linkedin.com/company/omnigcloud',
            'https://github.com/omnigcloud',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-850-443-1481',
            contactType: 'customer service',
            email: 'omnigcloud@gmail.com',
            areaServed: 'Worldwide',
            availableLanguage: ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko']
        },
        address: {
            '@type': 'PostalAddress',
            streetAddress: '3354 Jasmine Hill Rd',
            addressLocality: 'Tallahassee',
            addressRegion: 'FL',
            postalCode: '32311',
            addressCountry: 'US'
        }
    };
}

/**
 * Generate JSON-LD structured data for Article
 */
export function generateArticleSchema(config: {
    title: string;
    description: string;
    author: string;
    publishedTime: string;
    modifiedTime?: string;
    image?: string;
    url: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: config.title,
        description: config.description,
        image: config.image || DEFAULT_OG_IMAGE,
        datePublished: config.publishedTime,
        dateModified: config.modifiedTime || config.publishedTime,
        author: {
            '@type': 'Person',
            name: config.author,
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': config.url,
        },
    };
}

/**
 * Generate JSON-LD structured data for Product/Service
 */
export function generateProductSchema(config: {
    name: string;
    description: string;
    image?: string;
    sku?: string;
    brand?: string;
    offers?: {
        price: string;
        priceCurrency: string;
    };
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: config.name,
        description: config.description,
        image: config.image || DEFAULT_OG_IMAGE,
        sku: config.sku,
        brand: {
            '@type': 'Brand',
            name: config.brand || SITE_NAME,
        },
        ...(config.offers && {
            offers: {
                '@type': 'Offer',
                price: config.offers.price,
                priceCurrency: config.offers.priceCurrency,
                availability: 'https://schema.org/InStock',
            },
        }),
    };
}

/**
 * Generate JSON-LD structured data for Breadcrumbs
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

/**
 * Generate JSON-LD structured data for FAQ
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

/**
 * Common SEO keywords by category
 */
export const SEO_KEYWORDS = {
    platform: [
        'multi-cloud platform',
        'sovereign cloud',
        'enterprise infrastructure',
        'cloud-native',
        'hybrid cloud',
        'cloud orchestration',
    ],
    security: [
        'zero trust',
        'data sovereignty',
        'compliance automation',
        'security governance',
        'GDPR compliance',
        'HIPAA compliance',
    ],
    performance: [
        'high availability',
        'distributed systems',
        'scalability',
        'performance optimization',
        'latency reduction',
        'throughput optimization',
    ],
    modernization: [
        'cloud migration',
        'legacy modernization',
        'microservices',
        'DevOps',
        'infrastructure as code',
        'continuous deployment',
    ],
};
