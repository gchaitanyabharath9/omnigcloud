import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { FileText, Calendar, Tag, ShieldCheck, Layers, ArrowRight } from 'lucide-react';

export const revalidate = 86400;

export function generateStaticParams() {
    return ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Papers.A2' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
        alternates: {
            canonical: `https://www.omnigcloud.com/${locale}/research/papers/a2-high-throughput-distributed-systems`,
        },
    };
}

export default async function A2PaperPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Papers.A2' });

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200">
            <header className="relative py-24 overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
                <div className="container relative z-10 mx-auto px-4">
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase">
                            <ShieldCheck size={12} /> {t('badge.standard')}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-8 text-white">{t('title')}</h1>
                    <div className="flex flex-wrap gap-8 text-sm font-mono text-slate-400">
                        <div className="flex items-center gap-2"><Calendar size={16} className="text-primary" /> {t('meta.date')}</div>
                        <div className="flex items-center gap-2"><Tag size={16} className="text-primary" /> {t('meta.category')}</div>
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 mb-12">
                        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                            <ArrowRight size={24} className="text-primary" /> {t('abstract.title')}
                        </h2>
                        <p className="text-slate-300 text-lg leading-relaxed mb-6">{t('abstract.content')}</p>
                        <Link href={`/${locale}/contact?subject=Paper%20Request:%20A2`} className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary/10 border border-primary/20 text-primary font-bold text-sm uppercase hover:bg-primary/20 transition-all">
                            <FileText size={16} /> {t('cta.request')}
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
