import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import React from 'react';
import { Layers, Shield, ArrowRight, Code, MessageCircle, BarChart3, Lock, CheckCircle2, Globe, Bookmark, Cpu, Database } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import EngagementBox from '@/components/EngagementBox';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "The Multi-Cloud Sovereignty Framework: A Mathematical Approach | OmniGCloud",
        description: "A formal architectural framework for evaluating and enforcing digital sovereignty in multi-cloud and hybrid environments.",
        keywords: ["Sovereignty framework", "Multi-cloud architecture", "Data sovereignty", "Cloud-agnostic enterprise", "Infrastructure governance"],
    };
}

export function generateStaticParams() {
    return ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].map((locale) => ({ locale }));
}

export const revalidate = 3600;

export default async function SovereigntyFrameworkPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('Resources.Blog.sovereigntyFramework');

    return (
        <div className="bg-background min-h-screen">
            <Section className="py-24 bg-[#050810]">
                <PageShell>
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-3 text-[var(--primary)] font-bold uppercase tracking-widest text-sm mb-8">
                            <Layers size={16} /> {t('hero.badge')}
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
                            {t('hero.titlePrefix')} <span className="text-gradient">{t('hero.titleHighlight')}</span>
                        </h1>
                        <div className="flex items-center gap-6 mb-12 border-y border-white/5 py-6">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">AB</div>
                                <span className="text-sm font-bold">{t('hero.author')}</span>
                            </div>
                            <span className="text-xs opacity-50 font-bold">{t('hero.date')}</span>
                            <span className="text-xs bg-white/5 px-3 py-1 rounded-full font-bold">{t('hero.readTime')}</span>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none leading-relaxed">
                            <p className="text-xl text-muted-foreground mb-10 leading-relaxed font-medium italic border-l-4 border-primary pl-6">
                                {t('intro.quote')}
                            </p>

                            <h2 className="text-3xl font-bold mt-16 mb-8">{t('body.introTitle')}</h2>
                            <p className="mb-6">
                                {t('body.p1')}
                            </p>
                            <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.raw('body.p2') }} />

                            <div className="grid md:grid-cols-2 gap-6 my-12">
                                <div className="glass-panel p-6 rounded-2xl border-white/5 bg-white/5">
                                    <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                                        <Database size={18} /> {t('body.grid.invariance.title')}
                                    </h4>
                                    <p className="text-xs opacity-60">{t('body.grid.invariance.text')}</p>
                                </div>
                                <div className="glass-panel p-6 rounded-2xl border-white/5 bg-white/5">
                                    <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                                        <Code size={18} /> {t('body.grid.portability.title')}
                                    </h4>
                                    <p className="text-xs opacity-60">{t('body.grid.portability.text')}</p>
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold mt-16 mb-8">{t('body.exitGateTitle')}</h2>
                            <p className="mb-6">
                                {t('body.exitGateText')}
                            </p>

                            <h3 className="text-2xl font-bold mt-12 mb-4">{t('body.mathTitle')}</h3>
                            <div className="bg-black/50 p-8 rounded-3xl font-mono text-sm border border-primary/20 my-8" dangerouslySetInnerHTML={{ __html: t.raw('body.mathBody') }} />

                            <h2 className="text-3xl font-bold mt-16 mb-8">{t('body.nodesTitle')}</h2>
                            <p className="mb-6">
                                {t('body.nodesText')}
                            </p>

                            <h3 className="text-2xl font-bold mt-12 mb-4">{t('body.frameworkStepsTitle')}</h3>
                            <ul className="space-y-4 mb-12">
                                {[0, 1, 2].map((i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold">{i + 1}</div>
                                        <div dangerouslySetInnerHTML={{ __html: t.raw(`body.steps.${i}.text`) }} />
                                    </li>
                                ))}
                            </ul>

                            <blockquote className="border-l-4 border-primary pl-8 my-16 bg-primary/5 p-10 rounded-r-3xl italic text-lg opacity-80">
                                {t('body.quote2')}
                            </blockquote>
                        </div>

                        <EngagementBox
                            titleKey="thoughtLeadership.title"
                            subtitleKey="thoughtLeadership.subtitle"
                        />
                    </div>
                </PageShell>
            </Section>

            {/* RELATED POSTS */}
            <Section className="py-24 border-t border-white/5">
                <PageShell>
                    <div className="max-w-4xl mx-auto">
                        <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-10">{t('related.title')}</h4>
                        <div className="grid md:grid-cols-2 gap-8">
                            <Link href={`/${locale}/resources/blog/cio-exit-strategy`} className="group">
                                <h5 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{t('related.card1.title')}</h5>
                                <p className="text-sm opacity-50 mb-4">{t('related.card1.desc')}</p>
                                <span className="text-primary text-xs font-bold flex items-center gap-2">{t('related.readPost')} <ArrowRight size={12} /></span>
                            </Link>
                            <Link href={`/${locale}/resources/blog/cloud-modernization-guide`} className="group">
                                <h5 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{t('related.card2.title')}</h5>
                                <p className="text-sm opacity-50 mb-4">{t('related.card2.desc')}</p>
                                <span className="text-primary text-xs font-bold flex items-center gap-2">{t('related.readPost')} <ArrowRight size={12} /></span>
                            </Link>
                        </div>
                    </div>
                </PageShell>
            </Section>
        </div>
    );
}
