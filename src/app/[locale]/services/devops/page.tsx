import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import React from 'react';
import { Settings, Zap, Shield, Search, ArrowRight, Code, MessageCircle, BarChart3, Lock, CheckCircle2, Terminal, Layers, Globe } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateSEOMetadata, SEO_KEYWORDS } from '@/utils/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return generateSEOMetadata({
        title: "Enterprise DevOps & GitOps Services | Automated Pipelines",
        description: "Accelerate your delivery cycle with our sovereign DevOps practices. We implement secure CI/CD, GitOps workflows, and automated infrastructure as code.",
        keywords: [
            ...SEO_KEYWORDS.modernization,
            ...SEO_KEYWORDS.performance,
            "devops services",
            "gitops implementation",
            "ci/cd pipelines",
            "infrastructure as code",
            "site reliability engineering",
        ],
        canonical: `https://www.omnigcloud.com/${locale}/services/devops`,
        ogImage: 'https://www.omnigcloud.com/og-images/services/devops.png',
        ogType: 'website',
    }, locale);
}

export default async function DevOpsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('Services.devops');

    return (
        <div className="bg-background min-h-screen">
            {/* HERO SECTION */}
            <Section className="py-24 bg-gradient-to-b from-[#020617] to-[var(--background)]">
                <PageShell>
                    <div className="max-w-4xl">
                        <div className="badge badge-primary-subtle mb-6 flex items-center gap-2">
                            <Terminal size={14} /> {t('hero.badge')}
                        </div>
                        <h1 className="text-6xl font-black mb-8 leading-tight tracking-tight">
                            {t('hero.title')} <br /><span className="text-gradient">{t('hero.titleHighlight')}</span>
                        </h1>
                        <p className="text-xl opacity-70 mb-10 leading-relaxed max-w-2xl">
                            {t('hero.subtitle')}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${locale}/contact`} className="btn-primary py-4 px-10 rounded-full font-bold">{t('hero.ctaPrimary')}</Link>
                            <Link href={`/${locale}/platform`} className="btn-secondary py-4 px-10 rounded-full font-bold">{t('hero.ctaSecondary')}</Link>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* DETAILED CONTENT SECTION 1: THE EVOULTION */}
            <Section className="py-24 border-y border-white/5">
                <PageShell>
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="text-sm font-black text-primary uppercase tracking-widest mb-6">{t('evolution.badge')}</h2>
                            <h3 className="text-4xl font-bold mb-8">{t('evolution.title')}</h3>
                            <div className="space-y-6 text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-6 mb-8 text-lg">
                                {t('evolution.quote')}
                            </div>
                            <p className="text-lg opacity-80 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t.raw('evolution.description1') }} />
                            <p className="text-lg opacity-80 leading-relaxed">
                                {t('evolution.description2')}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            {[
                                { key: 'drift', icon: Shield },
                                { key: 'gating', icon: Lock },
                                { key: 'parity', icon: Globe }
                            ].map((feature, i) => (
                                <div key={i} className="glass-panel p-6 rounded-2xl flex gap-6 items-start hover:border-primary/30 transition-all">
                                    <div className="bg-primary-glow p-3 rounded-lg text-primary">
                                        <feature.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2 text-xl">{t(`evolution.features.${feature.key}.title`)}</h4>
                                        <p className="opacity-60 text-sm leading-relaxed">{t(`evolution.features.${feature.key}.desc`)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* VALUE PROPOSITIONS */}
            <Section className="py-24 bg-[var(--bg-surface-2)]">
                <PageShell>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">{t('value.title')}</h2>
                        <p className="opacity-60 max-w-2xl mx-auto">{t('value.subtitle')}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="glass-panel p-10 rounded-3xl bg-background border-white/5">
                            <h3 className="text-5xl font-black text-primary mb-4">85%</h3>
                            <h4 className="text-xl font-bold mb-4">{t('value.cards.leadTime.title')}</h4>
                            <p className="text-sm opacity-60 leading-relaxed">{t('value.cards.leadTime.desc')}</p>
                        </div>
                        <div className="glass-panel p-10 rounded-3xl bg-background border-primary-glow">
                            <h3 className="text-5xl font-black text-emerald-500 mb-4">Zero</h3>
                            <h4 className="text-xl font-bold mb-4">{t('value.cards.drift.title')}</h4>
                            <p className="text-sm opacity-60 leading-relaxed">{t('value.cards.drift.desc')}</p>
                        </div>
                        <div className="glass-panel p-10 rounded-3xl bg-background border-white/5">
                            <h3 className="text-5xl font-black text-blue-500 mb-4">100%</h3>
                            <h4 className="text-xl font-bold mb-4">{t('value.cards.audit.title')}</h4>
                            <p className="text-sm opacity-60 leading-relaxed">{t('value.cards.audit.desc')}</p>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* DETAILED CONTENT SECTION 2: THE TECH */}
            <Section className="py-24">
                <PageShell>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black mb-10">{t('tech.title')}</h2>
                        <div className="prose prose-invert prose-slate max-w-none">
                            <p className="text-lg mb-6" dangerouslySetInnerHTML={{ __html: t.raw('tech.stackDesc') }} />
                            <h4 className="text-xl font-bold mb-4 mt-10">{t('tech.intentTitle')}</h4>
                            <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.raw('tech.intentDesc') }} />
                            <h4 className="text-xl font-bold mb-4 mt-8">{t('tech.securityTitle')}</h4>
                            <p>
                                {t('tech.securityDesc')}
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
                        <div className="space-y-4">
                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className="glass-panel p-6 rounded-2xl border-white/5 hover:border-primary/20 transition-colors">
                                    <h4 className="font-bold mb-3 flex items-center gap-3 text-primary text-lg">
                                        <MessageCircle size={20} /> {t(`faq.items.${i}.q`)}
                                    </h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed pl-8">{t(`faq.items.${i}.a`)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* INTERNAL LINKS / FOOTER CROSS-REF */}
            <Section className="py-24 border-t border-white/5">
                <PageShell>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 glass-panel p-12 rounded-[3rem] bg-gradient-to-r from-background to-primary/5 mb-16">
                        <div className="max-w-md">
                            <h4 className="text-2xl font-bold mb-4">{t('footer.title')}</h4>
                            <p className="opacity-60 text-sm mb-6">{t('footer.subtitle')}</p>
                            <div className="flex flex-wrap gap-4">
                                <Link href={`/${locale}/services/cloud-modernization`} className="text-primary font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
                                    {t('footer.links.modernization')} <ArrowRight size={14} />
                                </Link>
                                <Link href={`/${locale}/services/cloud-cost-optimization`} className="text-primary font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
                                    {t('footer.links.finops')} <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                        <div className="bg-primary p-6 rounded-2xl text-white font-black text-xl">
                            {t('footer.ready')}
                        </div>
                    </div>

                    <EngagementBox />
                </PageShell>
            </Section>
        </div>
    );
}

import EngagementBox from '@/components/EngagementBox';
