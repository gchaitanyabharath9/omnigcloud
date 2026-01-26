import { getTranslations, setRequestLocale } from "next-intl/server";
import { generateSEOMetadata } from "@/utils/seo";
import { PageShell } from "@/components/layout/PageShell";
import { Link } from "@/navigation";
import { PAPERS_REGISTRY } from "@/content/papers/papers.index";
import { FileText, Calendar, User, Tag, ShieldCheck, ArrowLeft, Mail, ChevronRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    const locales = ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"];
    const params: { locale: string; slug: string }[] = [];

    locales.forEach(locale => {
        PAPERS_REGISTRY.forEach(paper => {
            params.push({ locale, slug: paper.slug });
        });
    });

    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const paper = PAPERS_REGISTRY.find(p => p.slug === slug);
    if (!paper) return {};

    const t = await getTranslations("Papers");

    return generateSEOMetadata({
        title: t(`Items.${paper.id}.title`),
        description: t(`Items.${paper.id}.subtitle`),
        ogType: "article"
    }, locale);
}

export default async function PaperDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const paper = PAPERS_REGISTRY.find(p => p.slug === slug);
    if (!paper) notFound();

    const t = await getTranslations("Papers");

    return (
        <div className="pb-24">
            <header className="relative py-24 border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent" />

                <div className="container relative z-10 px-4">
                    <Link
                        href="/resources/papers"
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary mb-12 hover:gap-3 transition-all underline-none"
                    >
                        <ArrowLeft size={14} /> Back to Publications
                    </Link>

                    <div className="flex items-center gap-3 mb-8">
                        <span className="bg-primary/10 px-3 py-1 rounded-full border border-primary/20 text-[10px] font-black text-primary uppercase tracking-tighter">
                            {t(`Items.${paper.id}.keywords`).split(',')[0]}
                        </span>
                        <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10 text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                            RESEARCH_SPEC_{paper.id.toUpperCase()}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tight leading-[1.1] max-w-4xl">
                        {t(`Items.${paper.id}.title`)}
                    </h1>

                    <div className="flex flex-wrap items-center gap-8 text-sm font-mono text-slate-400">
                        <div className="flex items-center gap-2">
                            <User size={16} className="text-primary" /> {paper.authors}
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-primary" /> {paper.publishedDate}
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag size={16} className="text-primary" /> Technical Report
                        </div>
                    </div>
                </div>
            </header>

            <PageShell>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-20">
                    {/* Main Content (Abstract) */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className="glass-panel p-10 rounded-3xl border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <BookOpen size={120} className="text-primary" />
                            </div>

                            <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                                <ChevronRight size={28} className="text-primary" />
                                {t("Common.abstractHeading")}
                            </h2>

                            <p className="text-slate-300 text-lg leading-relaxed mb-10 italic border-l-4 border-primary/30 pl-8">
                                {t(`Items.${paper.id}.abstract`)}
                            </p>

                            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
                                    <ShieldCheck size={16} className="text-primary" /> Key Contributions
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {t(`Items.${paper.id}.subtitle`)}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="glass-panel p-8 rounded-2xl border border-white/5">
                                <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-4">
                                    {t("Common.keywordsHeading")}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {paper.keywords.map(kw => (
                                        <span key={kw} className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-xs text-slate-400 font-medium">
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="glass-panel p-8 rounded-2xl border border-white/5">
                                <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-4">
                                    {t("Common.publicationLinksHeading")}
                                </h3>
                                <div className="text-xs text-primary font-bold">
                                    {t("Common.technicalReport")}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar (CTA) */}
                    <div className="space-y-6">
                        <div className="glass-panel p-8 rounded-3xl border border-primary/20 bg-primary/5 sticky top-24">
                            <div className="bg-primary/20 p-4 rounded-2xl inline-block mb-6">
                                <FileText size={32} className="text-primary" />
                            </div>
                            <h3 className="text-xl font-black text-white mb-4">
                                Full Paper Request
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                {t("Common.requestFullTextDisclaimer")}
                            </p>

                            <Link
                                href={`mailto:office@omnigcloud.com?subject=Full Paper Request: ${paper.slug}`}
                                className="btn-primary w-full flex items-center justify-center gap-2 group underline-none"
                            >
                                <Mail size={16} /> Contact Office
                            </Link>

                            <div className="mt-8 pt-8 border-t border-white/10 text-[10px] uppercase font-black text-slate-500 tracking-widest text-center">
                                Sovereign Access Only
                            </div>
                        </div>
                    </div>
                </div>
            </PageShell>
        </div>
    );
}
