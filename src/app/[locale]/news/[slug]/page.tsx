import React from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';
import { notFound } from 'next/navigation';
import { Clock, Calendar, Share2 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function NewsArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { slug, locale } = await params;

    const validSlugs = ['bank', 'egress', 'integration'];
    if (!validSlugs.includes(slug)) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: 'Newsroom' });

    // Determine content based on slug
    const title = t(`news.${slug}.title`);
    const date = t(`news.${slug}.date`);
    const source = t(`news.${slug}.source`);
    const tag = t(`news.${slug}.tag`);

    // Mock image map
    const images: Record<string, string> = {
        bank: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
        egress: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
        integration: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80"
    };

    return (
        <article className="main-content min-h-screen pb-24">
            {/* Header / Hero */}
            <div className="relative h-[60vh] min-h-[400px] w-full">
                <Image
                    src={images[slug] || images.bank}
                    alt={title}
                    fill
                    className="object-cover brightness-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <div className="container mx-auto max-w-4xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {tag}
                            </span>
                            <span className="text-slate-300 flex items-center gap-2 text-sm font-medium">
                                <Calendar size={14} /> {date}
                            </span>
                            <span className="text-slate-300 flex items-center gap-2 text-sm font-medium">
                                <Clock size={14} /> {t('article.minRead')}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 text-shadow-lg">
                            {title}
                        </h1>

                        <p className="text-xl text-slate-300 font-medium">
                            {source}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="container mx-auto max-w-3xl px-6 py-16">
                <div className="prose prose-lg prose-invert prose-blue max-w-none">
                    <p className="lead text-2xl text-slate-200 mb-10 leading-relaxed font-light">
                        {t(`news.${slug}.desc` as any) || "Detailed analysis of this sovereign cloud breakthrough."}
                    </p>

                    <p>
                        <strong>{t('article.intro', { date, tag })}</strong>
                    </p>

                    <h3>{t('article.challengeTitle')}</h3>
                    <p>
                        {t('article.challengeDesc')}
                    </p>
                    <ul>
                        <li>{t('article.challengeList.0')}</li>
                        <li>{t('article.challengeList.1')}</li>
                        <li>{t('article.challengeList.2')}</li>
                    </ul>

                    <h3>{t('article.solutionTitle')}</h3>
                    <p>
                        {t('article.solutionDesc')}
                    </p>

                    <div className="bg-slate-900 border-l-4 border-blue-500 p-6 my-8 rounded-r-xl">
                        <p className="italic text-slate-300 m-0">
                            "{t('article.quote')}"
                        </p>
                        <div className="mt-4 font-bold text-white">{t('article.quoteAuthor')}</div>
                    </div>

                    <h3>{t('article.impactTitle')}</h3>
                    <p>
                        {t('article.impactDesc')}
                    </p>
                    <p>
                        {t('article.docsLinkPrefix')} <Link href="/docs">{t('article.docsLinkText')}</Link>{t('article.docsLinkSuffix')}
                    </p>
                </div>

                <hr className="my-12 border-slate-800" />

                <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <Share2 size={18} /> {t('article.share')}
                        </button>
                    </div>
                    <Link href="/contact" className="btn-primary px-8 py-3 rounded-full text-sm font-bold">
                        {t('article.cta')}
                    </Link>
                </div>
            </div>
        </article>
    );
}
export async function generateStaticParams() {
    const locales = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];
    const slugs = ['bank', 'egress', 'integration'];

    return locales.flatMap((locale) =>
        slugs.map((slug) => ({ locale, slug }))
    );
}
