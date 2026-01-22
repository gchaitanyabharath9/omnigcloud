import { PageShell } from '@/components/layout/PageShell';
import { getTranslations } from 'next-intl/server';
import { generateSEOMetadata, generateProductSchema, SEO_KEYWORDS } from '@/utils/seo';
import { Check, X, Shield, Globe, Cpu, Zap, Award, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from '@/navigation';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { safeJsonLd } from '@/lib/security';

const CostSavingsArea = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.CostSavingsArea));
const CloudDistributionPie = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.CloudDistributionPie));
const FeatureUsageBar = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.FeatureUsageBar));
const RelatedStrategyLinks = dynamic(() => import('@/components/pricing/RelatedStrategyLinks'));
// ComplianceScoresBar is unused

export function generateStaticParams() {
    return ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].map((locale) => ({ locale }));
}

export const revalidate = 3600;

const PRICING_SECTION_IDS = ['developer', 'professional', 'business', 'sovereign', 'savings-analysis', 'value-economy', 'visual-architecture', 'compliance', 'trust', 'faq'];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const tm = await getTranslations({ locale, namespace: 'Metadata.Pricing' });

    return generateSEOMetadata({
        title: tm('title'),
        description: tm('description'),
        keywords: tm.raw('keywords'),
        canonical: `https://www.omnigcloud.com/${locale}/pricing`,
        ogImage: `https://www.omnigcloud.com/og-images/pricing.png`,
        ogType: 'website',
    }, locale);
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('Pricing');

    const plans = [
        {
            id: "developer",
            price: "0",
            features: t.raw('plans.developer.features'),
            notIncluded: t.raw('plans.developer.notIncluded'),
            highlight: false
        },
        {
            id: "professional",
            price: "250",
            features: t.raw('plans.professional.features'),
            notIncluded: t.raw('plans.professional.notIncluded'),
            highlight: true
        },
        {
            id: "business",
            price: "950",
            features: t.raw('plans.business.features'),
            notIncluded: t.raw('plans.business.notIncluded'),
            highlight: false
        },
        {
            id: "sovereign",
            price: "Custom",
            features: t.raw('plans.sovereign.features'),
            notIncluded: [],
            highlight: false
        }
    ];

    const jsonLd = generateProductSchema({
        name: "OmniGCloud Platform",
        description: t('hero.subtitle'),
        image: "https://www.omnigcloud.com/og-images/pricing.png",
        sku: "OMNIG-PLATFORM-V3",
        brand: "OmniGCloud",
        offers: {
            price: "250",
            priceCurrency: "USD"
        }
    });

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
            />

            {/* HERO & PRICING GRID - Snap 1 */}
            <section className="snap-section" style={{ minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '1rem', paddingBottom: '1rem' }}>
                <PageShell>
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <div className="badge badge-primary-subtle mb-3">{t('hero.tag')}</div>
                        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 950, marginBottom: '0.75rem', letterSpacing: '-1px' }}>
                            {t('hero.title')}
                        </h1>
                        <p style={{ fontSize: '0.95rem', opacity: 0.7, maxWidth: '650px', margin: '0 auto 1rem', lineHeight: '1.4' }}>
                            {t('hero.subtitle')}
                        </p>
                        <div className="max-w-2xl mx-auto">
                            <AboveTheFoldDescription pageKey="Pricing" />
                        </div>
                    </div>

                    <div className="grid-4">
                        {plans.map((plan, idx) => (
                            <div key={idx} id={plan.id} className={`glass-panel ${plan.highlight ? 'border-primary pricing-plan-highlight' : ''}`} style={{
                                padding: '1.25rem',
                                borderRadius: '1.25rem',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                background: plan.highlight ? 'rgba(59, 130, 246, 0.03)' : 'var(--card-bg)',
                                border: plan.highlight ? '2px solid var(--primary)' : '1px solid var(--card-border)',
                                zIndex: plan.highlight ? 10 : 1
                            }}>
                                {plan.highlight && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-10px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        padding: '3px 10px',
                                        borderRadius: '1rem',
                                        fontSize: '0.6rem',
                                        fontWeight: 900,
                                        letterSpacing: '0.1em'
                                    }}>
                                        {t('plans.popular')}
                                    </div>
                                )}
                                <h3 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '0.2rem' }}>{t(`plans.${plan.id}.name`)}</h3>
                                <p style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '0.75rem', height: '2.2rem', lineHeight: '1.2' }}>{t(`plans.${plan.id}.desc`)}</p>

                                <div style={{ marginBottom: '0.75rem' }}>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 950 }}>{plan.price !== "Custom" ? `$${plan.price}` : plan.price}</span>
                                    {plan.price !== "Custom" && <span style={{ opacity: 0.5, fontSize: '0.7rem' }}> {t('plans.month')}</span>}
                                </div>

                                <div style={{ flexGrow: 1, marginBottom: '0.75rem' }}>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                        {plan.features.slice(0, 7).map((feature: string, fidx: number) => (
                                            <li key={fidx} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', fontSize: '0.7rem' }}>
                                                <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '50%', padding: '2px', flexShrink: 0 }}>
                                                    <Check size={9} />
                                                </div>
                                                <span className="truncate">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link href={`/${locale}/contact`} className={plan.highlight ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%', textAlign: 'center', padding: '0.4rem', fontSize: '0.75rem' }}>
                                    {t(`plans.${plan.id}.cta`)}
                                </Link>
                            </div>
                        ))}
                    </div>
                </PageShell>
            </section>

            {/* ANALYZE YOUR SAVINGS POTENTIAL */}
            <section id="savings-analysis" className="snap-section" style={{ background: 'var(--background)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div className="badge badge-primary-subtle mb-3">{t('savings.badge')}</div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '0.5rem' }}>{t('savings.title')}</h2>
                        <p style={{ opacity: 0.7, maxWidth: '700px', margin: '0 auto', fontSize: '0.95rem' }}>{t('savings.subtitle')}</p>
                    </div>

                    <div className="grid-2x2-strict" style={{ gap: '1.5rem', gridTemplateRows: 'auto' }}>
                        <CostSavingsArea />
                        <div className="glass-panel" style={{ padding: 0, borderRadius: '1.5rem', overflow: 'hidden', height: '220px', position: 'relative' }}>
                            <Image
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                                alt="Data Analysis"
                                fill
                                style={{ objectFit: 'cover', opacity: 0.6 }}
                                sizes="(max-width: 768px) 100vw, 33vw"
                                unoptimized
                            />
                        </div>
                        <CloudDistributionPie />
                        <FeatureUsageBar />
                    </div>

                    {/* Related Strategy & Insights */}
                    <RelatedStrategyLinks />
                </div>
            </section>

            {/* VALUE-BASED INFRASTRUCTURE ECONOMY */}
            <section id="value-economy" className="snap-section" style={{ background: 'var(--bg-surface-2)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <Zap size={40} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '1rem' }}>{t('economy.title')}</h2>
                        <p style={{ opacity: 0.7, maxWidth: '800px', margin: '0 auto', fontSize: '1rem' }}>{t('economy.subtitle')}</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
                            <div style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '0.5rem', fontWeight: 900 }}>01</div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>{t('economy.steps.1.title')}</h3>
                            <p style={{ opacity: 0.7, lineHeight: 1.6 }}>{t('economy.steps.1.desc')}</p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
                            <div style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '0.5rem', fontWeight: 900 }}>02</div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>{t('economy.steps.2.title')}</h3>
                            <p style={{ opacity: 0.7, lineHeight: 1.6 }}>{t('economy.steps.2.desc')}</p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
                            <div style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '0.5rem', fontWeight: 900 }}>03</div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>{t('economy.steps.3.title')}</h3>
                            <p style={{ opacity: 0.7, lineHeight: 1.6 }}>{t('economy.steps.3.desc')}</p>
                        </div>
                    </div>

                    {/* Economic Sovereignty */}
                    <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1rem' }}>{t('economy.sovereignty.title')}</h3>
                        <p style={{ opacity: 0.8, lineHeight: 1.7, marginBottom: '1.5rem' }}>{t('economy.sovereignty.desc')}</p>

                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'var(--card-bg)' }}>
                            <Zap size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                            <h4 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '1rem' }}>{t('economy.sovereignty.arbitrage.title')}</h4>
                            <p style={{ opacity: 0.7, lineHeight: 1.6 }}>{t('economy.sovereignty.arbitrage.desc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* VISUAL ARCHITECTURE BREAKDOWN */}
            <section id="visual-architecture" className="snap-section" style={{ background: 'var(--background)' }}>
                <div className="container">
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '1rem' }}>{t('visual.title')}</h2>
                        <p style={{ opacity: 0.7, maxWidth: '900px', fontSize: '1rem', lineHeight: 1.6 }}>{t('visual.subtitle')}</p>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', marginBottom: '2rem', background: 'rgba(59, 130, 246, 0.03)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '1.2rem' }}>ℹ️</span>
                            </div>
                            <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>{t('visual.diagram')}</p>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '1.5rem', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <Shield size={32} color="var(--primary)" />
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0 }}>{t('visual.lockin.title')}</h3>
                        </div>
                        <p style={{ opacity: 0.8, lineHeight: 1.7, fontSize: '1rem', marginBottom: '1.5rem' }}>{t('visual.lockin.desc1')}</p>
                        <p style={{ opacity: 0.8, lineHeight: 1.7, fontSize: '1rem' }}>{t('visual.lockin.desc2')}</p>
                    </div>
                </div>
            </section>

            {/* ENTERPRISE-GRADE COMPLIANCE */}
            <section id="compliance" className="snap-section" style={{ background: 'var(--bg-surface-2)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <Shield size={40} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '1rem' }}>{t('compliance.title')}</h2>
                        <p style={{ opacity: 0.7, maxWidth: '700px', margin: '0 auto', fontSize: '1rem' }}>{t('compliance.subtitle')}</p>
                    </div>

                    {/* FAQ Section */}
                    <div id="faq" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '2rem', textAlign: 'center' }}>{t('faq.title')}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { q: t('faq.q1.q'), a: t('faq.q1.a') },
                                { q: t('faq.q2.q'), a: t('faq.q2.a') },
                                { q: t('faq.q3.q'), a: t('faq.q3.a') }
                            ].map((faq, idx) => (
                                <div key={idx} className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                        <HelpCircle size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                        <h4 style={{ fontWeight: 800, margin: 0, fontSize: '1rem' }}>{faq.q}</h4>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', opacity: 0.7, marginLeft: '2rem', lineHeight: 1.6 }}>{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST & CERTIFICATIONS */}
            <section id="trust" className="snap-section" style={{ background: 'var(--background)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '1rem' }}>{t('trust.title')}</h2>
                        <p style={{ opacity: 0.7, maxWidth: '700px', margin: '0 auto', fontSize: '1rem' }}>{t('trust.subtitle')}</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.25rem' }}>
                            <Shield color="var(--primary)" size={32} className="mb-3" />
                            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>{t('trust.residency.title')}</h4>
                            <p style={{ fontSize: '0.95rem', opacity: 0.7, lineHeight: 1.6 }}>{t('trust.residency.desc')}</p>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.25rem' }}>
                            <Globe color="var(--primary)" size={32} className="mb-3" />
                            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>{t('trust.neutrality.title')}</h4>
                            <p style={{ fontSize: '0.95rem', opacity: 0.7, lineHeight: 1.6 }}>{t('trust.neutrality.desc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA - Snap 3 */}
            <section className="snap-section">
                <div className="container">
                    <div className="glass-panel" style={{
                        padding: '4rem 2rem',
                        borderRadius: '3rem',
                        background: 'linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)',
                        color: 'white',
                        border: 'none',
                        boxShadow: '0 20px 50px rgba(59, 130, 246, 0.3)',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '1.5rem', color: 'white' }}>
                            {t('cta.title')}
                        </h2>
                        <p style={{ opacity: 0.9, marginBottom: '2.5rem', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                            {t('cta.subtitle')}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                            <Link href={`/${locale}/contact`} className="btn-primary" style={{
                                background: 'white',
                                color: '#1e40af',
                                border: 'none',
                                padding: '1rem 3.5rem',
                                fontSize: '1rem',
                                fontWeight: 900
                            }}>
                                {t('cta.button')} <ArrowRight size={20} className="ml-2" />
                            </Link>
                            <p style={{ fontSize: '0.7rem', opacity: 0.7, fontWeight: 700, letterSpacing: '0.1em' }}>
                                {t('footer.legal')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <HowItWorks pageKey="Pricing" />

            <DeepDive
                pageKey="Pricing"
                relatedLinks={[
                    { label: t('deepDive.links.modernization'), href: "/services/cloud-modernization" },
                    { label: t('deepDive.links.finance'), href: "/industries/finance" },
                    { label: t('deepDive.links.blueprint'), href: "/resources/blog/cloud-modernization-guide" }
                ]}
            />

            <TopicalAuthority pageKey="Pricing" />
            <TechnicalInsights pageKey="Pricing" />
            <FAQSection pageKey="Pricing" />

            {/* SITEMAP / FOOTER SNAP SECTION */}
            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </section>
        </>
    );
}

import { AboveTheFoldDescription, HowItWorks, VisualSection, DeepDive, TopicalAuthority, TechnicalInsights, FAQSection } from '@/components/seo/Enrichment';
