
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateSEOMetadata } from '@/utils/seo';
import { papersManifest, PaperManifestItem } from '@/content/papers/papers.manifest';
import { PaperLanding } from '@/components/papers/PaperLanding';

// Generate params for all papers and locales
export function generateStaticParams() {
    const locales = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];
    const params: { locale: string; slug: string }[] = [];

    for (const locale of locales) {
        for (const paper of papersManifest) {
            params.push({ locale, slug: paper.slug });
        }
    }

    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;
    const paper = papersManifest.find(p => p.slug === slug);

    if (!paper) {
        return {};
    }

    // Since we don't have access to t here easily without await getTranslations, 
    // and we want to keep it simple, we can use a hardcoded fallback or try to fetch.
    // Ideally we use getTranslations from next-intl/server

    // For now, let's use a generic description with the "Paper ID" or similar if we can't fully localize inside metadata easily 
    // without async. Actually we can await getTranslations.

    // BUT, for speed/stability, let's use the English text or similar if mostly English for now?
    // Or simpler: "Official Technical Report: [ID]"

    const title = `Technical Report: ${paper.id.toUpperCase()}`;
    const description = `Read the official technical report and reference architecture for ${paper.id.toUpperCase()}.`;

    return generateSEOMetadata({
        title,
        description,
        canonical: `https://www.omnigcloud.com/${locale}/research/papers/${slug}`,
        // ogImage: ... could map dynamically
    }, locale);
}

export default async function PaperPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const paper = papersManifest.find(p => p.slug === slug);

    if (!paper) {
        notFound();
    }

    return <PaperLanding paper={paper} locale={locale} />;
}
