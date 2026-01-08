import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { WatermarkOverlay } from '@/components/WatermarkOverlay';

// Modular Components
import { ResearchHeader } from '@/features/resources/research/ResearchHeader';
import { ResearchContent } from '@/features/resources/research/ResearchContent';
import { ResearchActions } from '@/features/resources/research/ResearchActions';
import { ResearchFooter } from '@/features/resources/research/ResearchFooter';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    return {
        title: 'Automated Multilingual Quality Assurance Framework | OmniGCloud Research',
        description: 'A deterministic framework for automated multilingual quality assurance in global-scale web applications.',
        alternates: {
            canonical: 'https://www.omnigcloud.com/en/research/automated-multilingual-quality-assurance'
        },
        openGraph: {
            title: 'Automated Multilingual Quality Assurance Framework',
            description: 'Research paper on deterministic QA frameworks for multilingual systems.',
            type: 'article',
            publishedTime: '2024-12-01T12:00:00.000Z',
            authors: ['Chaitanya Bharath Gopu'],
        }
    };
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
