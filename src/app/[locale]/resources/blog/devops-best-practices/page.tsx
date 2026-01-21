import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import React from 'react';
import { Terminal, Zap, Shield, Search, ArrowRight, Code, MessageCircle, BarChart3, Lock, CheckCircle2, Globe, Bookmark } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "DevOps Best Practices for Multi-Cloud 2026 | OmniGCloud",
        description: "Explore the essential DevOps patterns for managing complex multi-cloud and sovereign environments. Learn about GitOps, policy-as-code, and automated gating.",
        keywords: ["DevOps best practices", "Multi-cloud DevOps", "GitOps strategy", "Policy as Code", "CI/CD automation patterns"],
    };
}

export function generateStaticParams() {
    return ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].map((locale) => ({ locale }));
}

export const revalidate = 3600;

export default async function DevOpsBestPracticesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('Resources.Blog.devopsBestPractices');

    return (
        <div className="bg-background min-h-screen">
            <Section className="py-24 bg-[#050810]">
                <PageShell>
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-sm mb-8">
                            <Terminal size={16} /> {t('hero.badge')}
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
                            {t('hero.titlePrefix')} <span className="text-primary text-gradient">{t('hero.titleHighlight')}</span> {t('hero.titleSuffix')}
                        </h1>
                        <div className="flex items-center gap-6 mb-12 border-y border-white/5 py-6">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs">DO</div>
                                <span className="text-sm font-bold">{t('hero.author')}</span>
                            </div>
                            <span className="text-xs opacity-50 font-bold">{t('hero.date')}</span>
                            <span className="text-xs bg-white/5 px-3 py-1 rounded-full font-bold">{t('hero.readTime')}</span>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none leading-relaxed">
                            <p className="text-xl text-muted-foreground mb-10 leading-relaxed font-semibold">
                                {t('intro.quote')}
                            </p>

                            <h2 className="text-3xl font-bold mt-16 mb-8">{t('body.introTitle')}</h2>
                            <p className="mb-6">
                                {t('body.p1')}
                            </p>
                            <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.raw('body.p2') }} />

                            <h2 className="text-3xl font-bold mt-16 mb-8">{t('body.dist1.title')}</h2>
                            <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.raw('body.dist1.text') }} />

                            <h2 className="text-3xl font-bold mt-16 mb-8">{t('body.dist2.title')}</h2>
                            <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.raw('body.dist2.text') }} />

                            <h2 className="text-3xl font-bold mt-16 mb-8">{t('body.dist3.title')}</h2>
                            <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.raw('body.dist3.text') }} />

                            <h2 className="text-3xl font-bold mt-16 mb-8">{t('body.dist4.title')}</h2>
                            <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.raw('body.dist4.text') }} />

                            <h2 className="text-3xl font-bold mt-16 mb-12">{t('faq.title')}</h2>
                            <div className="space-y-4">
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className="glass-panel p-8 rounded-3xl border-white/5 bg-white/5">
                                        <h5 className="font-bold text-xl mb-3 flex items-center gap-3">
                                            <Code size={20} className="text-primary" /> {t(`faq.items.${i}.q`)}
                                        </h5>
                                        <p className="opacity-60 text-sm leading-relaxed">{t(`faq.items.${i}.a`)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <EngagementBox
                            titleKey="thoughtLeadership.title"
                            subtitleKey="thoughtLeadership.subtitle"
                        />
                    </div>
                </PageShell>
            </Section>

            {/* NAV LINKS */}
            <Section className="py-24 border-t border-white/5">
                <PageShell>
                    <div className="max-w-4xl mx-auto flex justify-between items-center">
                        <Link href={`/${locale}/resources/blog/sovereignty-framework`} className="text-sm font-bold flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                            <ArrowRight size={14} className="rotate-180" /> {t('nav.prev')}
                        </Link>
                        <Link href={`/${locale}/blog`} className="text-sm font-bold opacity-50 hover:opacity-100 transition-opacity">
                            {t('nav.back')}
                        </Link>
                    </div>
                </PageShell>
            </Section>
        </div>
    );
}

import EngagementBox from '@/components/EngagementBox';
