import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { WatermarkOverlay } from '@/components/WatermarkOverlay';

// Modular Components
import { ResearchHeader } from '@/features/resources/research/ResearchHeader';
import { ResearchContent } from '@/features/resources/research/ResearchContent';
import { ResearchActions } from '@/features/resources/research/ResearchActions';
import { ResearchFooter } from '@/features/resources/research/ResearchFooter';

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
