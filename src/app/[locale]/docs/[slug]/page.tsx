import { Code, Layers, BookOpen, ShieldCheck, ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { Metadata } from 'next';
import { generateSEOMetadata, SEO_KEYWORDS } from '@/utils/seo';

interface DocMetadata {
    id: string;
    key: string;
    icon: React.ReactNode;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;
    const t = await getTranslations({ locale, namespace: 'Docs' });

    // Fallback if metadata is missing for a specific slug
    const title = t(`cards.${slug}.title`) || t('meta.title');
    const description = t(`cards.${slug}.description`) || t('meta.description');

    return generateSEOMetadata({
        title,
        description,
        keywords: [
            ...SEO_KEYWORDS.modernization,
            "Sovereign Documentation",
            slug,
        ],
        canonical: `https://www.omnigcloud.com/${locale}/docs/${slug}`,
    }, locale);
}

export default async function DocDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const t = await getTranslations('Docs');
    const locale = await getLocale();
    const { slug } = await params;

    const docs: DocMetadata[] = [
        { id: "architecture", key: "architecture", icon: <Layers size={40} /> },
        { id: "guide", key: "guide", icon: <BookOpen size={40} /> },
        { id: "api", key: "api", icon: <Code size={40} /> },
        { id: "governance", key: "governance", icon: <ShieldCheck size={40} /> }
    ];

    const doc = docs.find(d => d.id === slug);

    if (!doc) {
        notFound();
    }

    return (
        <div className="animate-fade-in flex flex-col gap-12 pb-12">
            <div>
                <Link href={`/${locale}/docs`} className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:opacity-70 transition-opacity">
                    <ArrowLeft size={16} /> {t('technicalLibrary')}
                </Link>

                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-2xl text-primary border border-primary/20">
                        {doc.icon}
                    </div>
                    <div>
                        <div className="text-[0.65rem] font-black text-primary uppercase tracking-widest mb-1">
                            {t('documentation_label')}
                        </div>
                        <h1 className="text-4xl font-black tracking-tight">{t(`cards.${doc.key}.title`)}</h1>
                    </div>
                </div>

                <p className="text-xl opacity-80 leading-relaxed mb-10 max-w-2xl">
                    {t(`cards.${doc.key}.description`)}
                </p>

                <div className="glass-panel p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.02]">
                    <h3 className="text-xl font-bold mb-6">{t('abstract.title')}</h3>
                    <div className="space-y-4 opacity-70 leading-relaxed text-sm">
                        <p>
                            {t('abstract.paragraph1', { title: t(`cards.${doc.key}.title`) })}
                        </p>
                        <p>
                            {t('abstract.paragraph2')}
                        </p>
                    </div>

                    <div className="mt-10 pt-10 border-t border-white/5 flex flex-col gap-4">
                        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between group cursor-pointer hover:bg-primary/10 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">01</div>
                                <div>
                                    <h4 className="font-bold text-sm">{t('sections.empiricalDataSet')}</h4>
                                    <p className="text-xs opacity-50">{t('sections.empiricalDataSetDesc')}</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                        </div>
                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/[0.04] transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">02</div>
                                <div>
                                    <h4 className="font-bold text-sm">{t('sections.validationProtocols')}</h4>
                                    <p className="text-xs opacity-50">{t('sections.autonomousGatingLogs')}</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-card-border">
                <Footer />
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const locales = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];
    const slugs = ['architecture', 'guide', 'api', 'governance'];

    return locales.flatMap((locale) =>
        slugs.map((slug) => ({ locale, slug }))
    );
}
