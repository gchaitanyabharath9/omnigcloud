import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import React from 'react';
import { Layers, Shield, Zap, Search, ArrowRight, Code, MessageCircle, Server, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generateSEOMetadata, SEO_KEYWORDS } from '@/utils/seo';
import { getTranslations } from "next-intl/server";
import Footer from "@/components/Footer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata.Services.openshift-modernization' });
    return generateSEOMetadata({
        title: t('title'),
        description: t('description'),
        keywords: [
            ...SEO_KEYWORDS.modernization,
            "RedHat OpenShift",
            "OCP modernization",
            "OpenShift fleet management",
            "Azure RedHat OpenShift",
            "ROSA AWS",
            "Multi-cluster Kubernetes",
        ],
        canonical: `https://www.omnigcloud.com/${locale}/services/openshift-modernization`,
        ogImage: 'https://www.omnigcloud.com/og-images/services/openshift.png',
        ogType: 'website',
    }, locale);
}

export default async function OpenShiftModernizationPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('Services.openshift-modernization');
    const tCommon = await getTranslations('Common');

    return (
        <div className="snap-container">
            <section className="snap-section" style={{ minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))', display: 'flex', alignItems: 'center', background: 'linear-gradient(to bottom, #020617, var(--background))' }}>
                <PageShell>
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-2 text-red-500 font-mono text-sm font-black uppercase tracking-widest mb-4">
                            <Layers size={18} /> {t('hero.badge')}
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter">
                            {t('hero.title')}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
                            {t('hero.subtitle')}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${locale}/contact`} className="btn-primary py-4 px-10 rounded-full font-bold bg-red-600 border-red-600 hover:bg-red-700">{t('hero.ctaPrimary')}</Link>
                            <Link href={`/${locale}/docs/whitepaper`} className="btn-secondary py-4 px-10 rounded-full font-bold">{t('hero.ctaSecondary')}</Link>
                        </div>
                    </div>
                </PageShell>
            </section>

            {/* DETAILED CONTENT SECTION 1 */}
            <Section className="snap-section py-24 border-y border-white/5 bg-red-900/5">
                <PageShell>
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="text-sm font-black text-red-500 uppercase tracking-widest mb-6">{t('core.badge')}</h2>
                            <h3 className="text-4xl font-bold mb-8">{t('core.title')}</h3>
                            <p className="text-lg opacity-80 leading-relaxed mb-6">
                                {t('core.p1')}
                            </p>
                            <p className="text-lg opacity-80 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('core.p2') }} />
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            {[
                                { key: 'fleet', icon: Server },
                                { key: 'mesh', icon: Zap },
                                { key: 'compliance', icon: Shield }
                            ].map((feature, i) => (
                                <div key={i} className="glass-panel p-6 rounded-2xl flex gap-6 items-start hover:border-red-500/30 transition-all border-red-500/5">
                                    <div className="bg-red-500/10 p-3 rounded-lg text-red-500">
                                        <feature.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2 text-xl">{t(`core.features.${feature.key}.title`)}</h4>
                                        <p className="opacity-60 text-sm leading-relaxed">{t(`core.features.${feature.key}.desc`)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* STRATEGY SECTION */}
            <Section className="snap-section py-24">
                <PageShell>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black mb-10 text-center">{t('factory.title')}</h2>
                        <div className="prose prose-invert prose-slate max-w-none leading-relaxed">
                            <h4 className="text-xl font-bold mb-4 mt-10 text-red-500">{t('factory.item1Title')}</h4>
                            <p className="mb-6">
                                {t('factory.item1Desc')}
                            </p>
                            <h4 className="text-xl font-bold mb-4 text-red-500">{t('factory.item2Title')}</h4>
                            <p className="mb-6">
                                {t('factory.item2Desc')}
                            </p>
                            <h4 className="text-xl font-bold mb-4 text-red-500">{t('factory.item3Title')}</h4>
                            <p>
                                {t('factory.item3Desc')}
                            </p>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* FAQ SECTION */}
            <Section className="snap-section py-24 bg-[var(--bg-card)]">
                <PageShell>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black mb-12 text-center">{t('faq.title')}</h2>
                        <div className="space-y-4">
                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className="glass-panel p-6 rounded-2xl border-white/5 border-red-500/5 hover:border-red-500/20 transition-colors">
                                    <h4 className="font-bold mb-3 flex items-center gap-3 text-red-500 text-lg">
                                        <MessageCircle size={20} /> {t(`faq.item${i}.q`)}
                                    </h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed pl-8">{t(`faq.item${i}.a`)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* INTERNAL LINKS */}
            <Section className="snap-section py-24 border-t border-white/5">
                <PageShell>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Link href={`/${locale}/services/devops`} className="glass-panel p-10 rounded-[2.5rem] group hover:border-red-500/50 transition-all border-red-500/10 bg-red-500/5">
                            <h4 className="text-2xl font-bold mb-4 group-hover:text-red-500 transition-colors">{t('footer.automationTitle')}</h4>
                            <p className="opacity-60 text-sm mb-6">{t('footer.automationDesc')}</p>
                            <div className="text-red-500 font-bold flex items-center gap-2">{tCommon('view_service')} <ArrowRight size={14} /></div>
                        </Link>
                        <Link href={`/${locale}/services/cloud-modernization`} className="glass-panel p-10 rounded-[2.5rem] group hover:border-white/20 transition-all border-white/5">
                            <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{t('footer.modernizationTitle')}</h4>
                            <p className="opacity-60 text-sm mb-6">{t('footer.modernizationDesc')}</p>
                            <div className="text-primary font-bold flex items-center gap-2">{tCommon('view_service')} <ArrowRight size={14} /></div>
                        </Link>
                    </div>
                </PageShell>
            </Section>
            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </section>
        </div>
    );
}
