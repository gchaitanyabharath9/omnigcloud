import { getTranslations } from 'next-intl/server';
import { generateSEOMetadata, SEO_KEYWORDS } from '@/utils/seo';
import CaseStudiesClient from './CaseStudiesClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const tm = await getTranslations({ locale, namespace: 'Metadata.CaseStudies' });

    return generateSEOMetadata({
        title: tm('title'),
        description: tm('description'),
        keywords: [
            ...SEO_KEYWORDS.platform,
            ...SEO_KEYWORDS.security,
            'case studies',
            'enterprise implementations',
            'customer success',
            'cloud transformation outcomes',
        ],
        ogImage: `/og-images/case-studies.png`,
    }, locale);
}

export function generateStaticParams() {
    return ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].map((locale) => ({ locale }));
}

export default function Page() {
    return <CaseStudiesClient />;
}
