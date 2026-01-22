
import React from 'react';
import { Metadata } from 'next';
import { generateSEOMetadata, SEO_KEYWORDS } from '@/utils/seo';
import { getTranslations } from 'next-intl/server';

// Dashboard metadata with noindex (secure area)
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata.Dashboard' });

    const baseMetadata = generateSEOMetadata({
        title: t('title'),
        description: t('description'),
        keywords: [
            ...SEO_KEYWORDS.performance,
            ...SEO_KEYWORDS.platform,
            'cloud dashboard',
            'infrastructure monitoring',
            'real-time analytics',
            'observability platform',
        ],
        canonical: `https://www.omnigcloud.com/${locale}/dashboard`,
        ogImage: `https://www.omnigcloud.com/og-images/dashboard.png`,
        ogType: 'website',
    }, locale);

    // Override robots to prevent indexing (secure dashboard)
    return {
        ...baseMetadata,
        robots: {
            index: false,
            follow: false,
            googleBot: {
                index: false,
                follow: false
            }
        }
    };
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}
