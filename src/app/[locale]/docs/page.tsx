import { BookOpen, Code, Cpu, ShieldCheck, Zap, Search, ChevronRight, Layers, Settings, Globe, FileText, Award } from "lucide-react";
import { Link } from "@/navigation";

import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generateSEOMetadata, SEO_KEYWORDS } from '@/utils/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const tm = await getTranslations({ locale, namespace: 'Metadata.Docs' });

    return generateSEOMetadata({
        title: tm('title'),
        description: tm('description'),
        keywords: [
            ...SEO_KEYWORDS.platform,
            ...SEO_KEYWORDS.modernization,
            'technical documentation',
            'architecture guide',
            'api reference',
            'governance blueprints',
        ],
        ogImage: `/og-images/docs.png`,
        ogType: 'website',
    }, locale);
}

export function generateStaticParams() {
    return ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].map((locale) => ({ locale }));
}


export default async function DocsPage() {
    const t = await getTranslations('Docs');

    return (
        <div id="intro" className="flex flex-col gap-8 pb-12">
            <div className="mb-8">
                <div className="flex items-center gap-2.5 mb-3">
                    <Award size={20} className="text-primary" />
                    <h1 className="text-3xl font-black tracking-tight">{t('hero.title')}</h1>
                </div>
                <div className="badge badge-primary-subtle mb-4">{t('hero.badge')}</div>
                <p className="text-base opacity-80 leading-relaxed">
                    {t('hero.description')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div id="architecture" className="glass-panel p-5 rounded-2xl scroll-m-[120px]">
                    <div className="bg-primary/10 p-2 rounded-lg inline-block mb-3">
                        <Layers size={18} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-black mb-1.5">{t('cards.architecture.title')}</h3>
                    <div className="text-[0.65rem] font-black text-primary mb-2 uppercase">{t('cards.architecture.exhibit')}</div>
                    <p className="text-xs opacity-60 mb-4 leading-relaxed">
                        {t('cards.architecture.description')}
                    </p>
                    <Link href="/docs/architecture" className="text-primary font-extrabold text-sm flex items-center gap-1 no-underline hover:gap-2 transition-all">
                        {t('cards.architecture.cta')} <ChevronRight size={14} />
                    </Link>
                </div>
                <div id="whitepaper" className="glass-panel p-5 rounded-2xl scroll-m-[120px]">
                    <div className="bg-primary/10 p-2 rounded-lg inline-block mb-3">
                        <Award size={18} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-black mb-1.5">{t('cards.whitepaper.title')}</h3>
                    <div className="text-[0.65rem] font-black text-primary mb-2 uppercase">{t('cards.whitepaper.exhibit')}</div>
                    <p className="text-xs opacity-60 mb-4 leading-relaxed">
                        {t('cards.whitepaper.description')}
                    </p>
                    <Link href="/docs/whitepaper" className="text-primary font-extrabold text-sm flex items-center gap-1 no-underline hover:gap-2 transition-all">
                        {t('cards.whitepaper.cta')} <ChevronRight size={14} />
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div id="guide" className="glass-panel p-5 rounded-2xl scroll-m-[120px]">
                    <div className="bg-primary/10 p-2 rounded-lg inline-block mb-3">
                        <Zap size={18} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-black mb-1.5">{t('cards.guide.title')}</h3>
                    <div className="text-[0.65rem] font-black text-primary mb-2 uppercase">{t('cards.guide.exhibit')}</div>
                    <p className="text-xs opacity-60 mb-4 leading-relaxed">
                        {t('cards.guide.description')}
                    </p>
                    <Link href="/docs/guide" className="text-primary font-extrabold text-sm flex items-center gap-1 no-underline hover:gap-2 transition-all">
                        {t('cards.guide.cta')} <ChevronRight size={14} />
                    </Link>
                </div>
                <div id="api" className="glass-panel p-5 rounded-2xl scroll-m-[120px]">
                    <div className="bg-primary/10 p-2 rounded-lg inline-block mb-3">
                        <Code size={18} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-black mb-1.5">{t('cards.api.title')}</h3>
                    <div className="text-[0.65rem] font-black text-primary mb-2 uppercase">{t('cards.api.exhibit')}</div>
                    <p className="text-xs opacity-60 mb-4 leading-relaxed">
                        {t('cards.api.description')}
                    </p>
                    <Link href="/docs/api" className="text-primary font-extrabold text-sm flex items-center gap-1 no-underline hover:gap-2 transition-all">
                        {t('cards.api.cta')} <ChevronRight size={14} />
                    </Link>
                </div>
            </div>

            <div id="governance" className="glass-panel mt-6 p-6 rounded-3xl bg-primary/5 scroll-m-[120px]">
                <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck size={24} className="text-primary" />
                    <h3 className="text-2xl font-black">{t('banner.title')}</h3>
                </div>
                <p className="text-sm opacity-70 mb-5 leading-relaxed">
                    {t('banner.description')}
                </p>
                <Link href="/docs/governance" className="btn-primary inline-block py-2 px-6 text-sm no-underline">{t('banner.cta')}</Link>
            </div>

            {/* Footer attached to content */}
            <div className="mt-12 pt-8 border-t border-card-border">
                <Footer />
            </div>
        </div>
    );
}
