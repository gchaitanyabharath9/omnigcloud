import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import React from 'react';
import { Cloud, Zap, Shield, Search, ArrowRight, Code, MessageCircle, BarChart3, Lock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generateSEOMetadata, SEO_KEYWORDS } from '@/utils/seo';
import { getTranslations } from "next-intl/server";
import EngagementBox from '@/components/EngagementBox';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata.Services.cloud-modernization' });
    return generateSEOMetadata({
        title: t('title'),
        description: t('description'),
        keywords: [
            ...SEO_KEYWORDS.modernization,
            ...SEO_KEYWORDS.platform,
            "application modernization",
            "legacy modernization",
            "mainframe modernization",
            "cloud native transformation",
            "containerization",
        ],
        canonical: `https://www.omnigcloud.com/${locale}/services/cloud-modernization`,
        ogImage: 'https://www.omnigcloud.com/og-images/services/modernization.png',
        ogType: 'website',
    }, locale);
}

export default async function CloudModernizationPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('Services.cloud-modernization');
    const tCommon = await getTranslations('Common');

    return (
        <div className="bg-background min-h-screen">
            {/* HERO SECTION */}
            <Section className="py-24 bg-gradient-to-b from-[#020617] to-[var(--background)]">
                <PageShell>
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-2 text-primary font-mono text-sm font-black uppercase tracking-widest mb-4">
                            <Cloud size={18} /> {t('hero.badge')}
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter">
                            {t('hero.titlePart1')} <br /><span className="text-primary text-gradient">{t('hero.titleHighlight')}</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl text-lg">
                            {t('hero.subtitle')}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${locale}/contact`} className="btn-primary py-4 px-10 rounded-full font-bold">{t('hero.ctaPrimary')}</Link>
                            <Link href={`/${locale}/docs/whitepaper`} className="btn-secondary py-4 px-10 rounded-full font-bold">{t('hero.ctaSecondary')}</Link>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* THE PROBLEM SECTION */}
            <Section className="py-24 border-y border-white/5 bg-[#050810]/50">
                <PageShell>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-xs font-black text-red-500 uppercase tracking-[0.2em] mb-4">{t('challenge.badge')}</h2>
                            <h3 className="text-3xl font-black mb-6">{t('challenge.title')}</h3>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                {t('challenge.p1')}
                            </p>
                            <div className="space-y-4">
                                {[0, 1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-3 text-slate-300 font-bold">
                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                        {t(`challenge.items.${i}`)}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="glass-panel p-10 border-red-500/10 relative">
                            <div className="text-5xl font-black text-red-500/20 mb-4">{t('challenge.lostRoi')}</div>
                            <p className="italic text-slate-400 mb-6">{t('challenge.quote')}</p>
                            <div className="text-xs font-mono text-red-500 opacity-50">{t('challenge.errorCode')}</div>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* OUR APPROACH SECTION */}
            <Section className="py-24">
                <PageShell>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">{t('pipeline.title')}</h2>
                        <p className="opacity-60 max-w-xl mx-auto">{t('pipeline.subtitle')}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: "01", icon: Search, key: 'step1' },
                            { step: "02", icon: Code, key: 'step2' },
                            { step: "03", icon: Zap, key: 'step3' }
                        ].map((item, i) => (
                            <div key={i} className="glass-panel p-8 relative overflow-hidden group hover:border-primary/50 transition-all">
                                <span className="absolute top-4 right-4 text-4xl font-black text-white/5 group-hover:text-primary/10 transition-colors tracking-tighter">{item.step}</span>
                                <item.icon size={40} className="text-primary mb-6" />
                                <h4 className="text-xl font-bold mb-4">{t(`pipeline.${item.key}.title`)}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">{t(`pipeline.${item.key}.desc`)}</p>
                            </div>
                        ))}
                    </div>
                </PageShell>
            </Section>

            {/* DETAILED EDUCATIONAL CONTENT */}
            <Section className="py-24 bg-[var(--bg-surface-2)]">
                <PageShell>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black mb-10">{t('patterns.title')}</h2>
                        <div className="prose prose-invert prose-slate max-w-none leading-relaxed">
                            <p className="text-lg mb-8">
                                {t('patterns.intro')}
                            </p>

                            <h4 className="text-xl font-bold mb-4">{t('patterns.pattern1Title')}</h4>
                            <p className="mb-6">
                                {t('patterns.pattern1Desc')}
                            </p>

                            <h4 className="text-xl font-bold mb-4">{t('patterns.pattern2Title')}</h4>
                            <p className="mb-6">
                                {t('patterns.pattern2Desc')}
                            </p>

                            <h4 className="text-xl font-bold mb-4">{t('patterns.pattern3Title')}</h4>
                            <p>
                                {t('patterns.pattern3Desc')}
                            </p>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* FAQ SECTION */}
            <Section className="py-24 bg-[var(--bg-card)]">
                <PageShell>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black mb-12 text-center">{t('faq.title')}</h2>
                        <div className="space-y-6">
                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className="glass-panel p-6 border-white/5 bg-background rounded-2xl hover:border-primary/30 transition-colors">
                                    <h4 className="font-bold mb-2 flex items-center gap-3 text-primary">
                                        <MessageCircle size={18} /> {t(`faq.item${i}.q`)}
                                    </h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed pl-8">{t(`faq.item${i}.a`)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* INTERNAL LINKS */}
            <Section className="py-24 border-t border-white/5">
                <PageShell>
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <Link href={`/${locale}/services/devops`} className="glass-panel p-10 rounded-[2.5rem] group hover:border-primary/50 transition-all bg-gradient-to-br from-transparent to-primary/5">
                            <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{t('footer.devopsTitle')}</h4>
                            <p className="opacity-60 text-sm mb-6">{t('footer.devopsDesc')}</p>
                            <div className="text-primary font-bold flex items-center gap-2">{tCommon('view_service')} <ArrowRight size={14} /></div>
                        </Link>
                        <Link href={`/${locale}/resources/blog/cloud-modernization-guide`} className="glass-panel p-10 rounded-[2.5rem] group hover:border-primary/50 transition-all bg-gradient-to-br from-transparent to-blue-500/5">
                            <h4 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">{t('footer.guideTitle')}</h4>
                            <p className="opacity-60 text-sm mb-6">{t('footer.guideDesc')}</p>
                            <div className="text-blue-400 font-bold flex items-center gap-2">{t('footer.readGuide')} <ArrowRight size={14} /></div>
                        </Link>
                    </div>

                    <EngagementBox />
                </PageShell>
            </Section>
        </div>
    );
}
