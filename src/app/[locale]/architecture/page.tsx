import { getTranslations } from 'next-intl/server';
import { generateSEOMetadata, SEO_KEYWORDS } from '@/utils/seo';
import ArchitectureClient from './ArchitectureClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const tm = await getTranslations({ locale, namespace: 'Metadata.Architecture' });

    return generateSEOMetadata({
        title: tm('title'),
        description: tm('description'),
        keywords: [
            ...SEO_KEYWORDS.platform,
            ...SEO_KEYWORDS.modernization,
            'cellular architecture',
            'plane separation',
            'enterprise architecture',
        ],
        ogImage: `/og-images/architecture.png`,
    }, locale);
}

export function generateStaticParams() {
    return ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].map((locale) => ({ locale }));
}

export default function Page() {
    return <ArchitectureClient />;
}
