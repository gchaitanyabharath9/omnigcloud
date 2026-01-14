import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { generateSEOMetadata, SEO_KEYWORDS } from '@/utils/seo';
import { WatermarkOverlay } from '@/components/WatermarkOverlay';

// Modular Components
import { ResearchHeader } from '@/features/resources/research/ResearchHeader';
import { ResearchContent } from '@/features/resources/research/ResearchContent';
import { ResearchActions } from '@/features/resources/research/ResearchActions';
import { ResearchFooter } from '@/features/resources/research/ResearchFooter';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return generateSEOMetadata({
        title: 'Automated Multilingual Quality Assurance Framework',
        description: 'A deterministic framework for automated multilingual quality assurance in global-scale web applications.',
        keywords: [
            ...SEO_KEYWORDS.platform,
            'quality assurance',
            'multilingual testing',
            'automation framework',
            'i18n testing',
            'l10n automation',
            'regulatory compliance',
        ],
        canonical: `https://www.omnigcloud.com/${locale}/research/automated-multilingual-quality-assurance`,
        ogImage: 'https://www.omnigcloud.com/og-images/research/qa-framework.png',
        ogType: 'article',
        author: 'Chaitanya Bharath Gopu',
        publishedTime: '2024-12-01T12:00:00.000Z',
        section: 'Research',
        tags: ['qa', 'automation', 'multilingual', 'compliance'],
    }, locale);
}

export default async function PublicationPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <div className="min-h-screen bg-[var(--background)] py-20 text-balance relative">
            {/* IN-BROWSER WATERMARK PROTECTION */}
            <WatermarkOverlay />

            <div className="container max-w-4xl mx-auto relative z-10 px-4 md:px-0">
                <Link href={`/${locale}/research`} className="flex items-center gap-2 text-[var(--primary)] mb-12 hover:translate-x-[-4px] transition-transform no-print">
                    <ChevronLeft size={18} /> Back to Research Repository
                </Link>

                <ResearchHeader />
                <ResearchContent />
                <ResearchActions />
                <ResearchFooter />
            </div>
        </div>
    );
}
