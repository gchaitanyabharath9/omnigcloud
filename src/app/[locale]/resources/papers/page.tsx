import { PageShell } from "@/components/layout/PageShell";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { generateSEOMetadata, SEO_KEYWORDS } from "@/utils/seo";
import { Link } from "@/navigation";
import { FileText, ArrowRight, User, Calendar, Tag, ShieldCheck } from "lucide-react";
import { PAPERS_REGISTRY } from "@/content/papers/papers.index";
import type { Metadata } from "next";

export function generateStaticParams() {
    return ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    setRequestLocale(locale);
    const tRoot = await getTranslations({ locale });

    return generateSEOMetadata({
        title: tRoot("Metadata.Papers.title"),
        description: tRoot("Metadata.Papers.description"),
        keywords: [...SEO_KEYWORDS.platform, ...tRoot.raw("Metadata.Papers.keywords")],
        ogType: "website"
    }, locale);
}

export default async function PapersListingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Papers");

    return (
        <div className="pb-24">
            <header className="relative py-20 border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

                <div className="container relative z-10 px-4">
                    <div className="badge badge-primary-subtle mb-6">{t('hero.badge')}</div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6" dangerouslySetInnerHTML={{ __html: t.raw('hero.title') }} />
                    <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                        {t('hero.subtitle')}
                    </p>
                </div>
            </header>

            <PageShell>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-16">
                    {PAPERS_REGISTRY.map((paper) => (
                        <Link
                            key={paper.slug}
                            href={`/resources/papers/${paper.slug}`}
                            className="group block glass-panel p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 relative overflow-hidden underline-none"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                                <FileText size={80} className="text-primary" />
                            </div>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-primary/10 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-500">
                                    <ShieldCheck size={20} className="text-primary" />
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                                    {t(`Items.${paper.id}.keywords`).split(',')[0]}
                                </div>
                            </div>

                            <h2 className="text-2xl font-black text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                                {t(`Items.${paper.id}.title`)}
                            </h2>

                            <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                                {t(`Items.${paper.id}.subtitle`)}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-[11px] font-mono text-slate-500 border-t border-white/5 pt-6">
                                <div className="flex items-center gap-2">
                                    <User size={14} className="text-primary" />
                                    {paper.authors}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} className="text-primary" />
                                    {paper.publishedDate}
                                </div>
                            </div>

                            <div className="mt-8 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                                {t('hero.viewAbstract')} <ArrowRight size={14} />
                            </div>
                        </Link>
                    ))}
                </div>
            </PageShell>
        </div>
    );
}
