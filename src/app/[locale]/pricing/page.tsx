import { getTranslations } from 'next-intl/server';
import { Check, X, Shield, Globe, Cpu, Zap, Award, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { safeJsonLd } from '@/lib/security';

const CostSavingsArea = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.CostSavingsArea));
const CloudDistributionPie = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.CloudDistributionPie));
const FeatureUsageBar = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.FeatureUsageBar));
// ComplianceScoresBar is unused

export const metadata: Metadata = {
    title: 'Pricing | OmniGCloud Enterprise Cloud Governance',
    description: 'Transparent pricing for multi-cloud governance. From developer-friendly free tier to enterprise-grade sovereign plans. No hidden fees, no vendor lock-in.',
    keywords: ['cloud governance pricing', 'enterprise cloud management cost', 'multi-cloud pricing', 'compliance automation pricing'],
};

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('Pricing');

    const plans = [
        {
            id: "developer",
            price: "0",
            features: [
                "1 Sovereign Region",
                "10 Automated Audits/mo",
                "Community Discord Access",
                "G-Framework CLI Access",
                "Basic Governance Templates"
            ],
            notIncluded: [
                "Custom Compliance Packs",
                "Multi-Cloud Failover",
                "Priority SRE Support",
                "Dedicated Private Cluster"
            ],
            highlight: false
        },
        {
            id: "professional",
            price: "250",
            features: [
                "3 Sovereign Regions",
                "500 Automated Audits/mo",
                "Standard Email Support",
                "Multi-Cloud Circuit Breakers",
                "Advanced Policy-as-Logic",
                "Custom Audit Export (PDF/JSON)"
            ],
            notIncluded: [
                "Dedicated Private Cluster",
                "SLA-Backed Performance",
                "SSO & RBAC (Advanced)"
            ],
            highlight: true
        },
        {
            id: "business",
            price: "950",
            features: [
                "Unlimited Regions",
                "5,000 Automated Audits/mo",
                "Priority 24/7 Support",
                "Full Governance Blueprints",
                "SSO & Directory Sync",
                "Advanced Role-Based Access",
                "Custom Compliance Engine"
            ],
            notIncluded: [
                "Dedicated Private Cluster",
                "On-Premise Deployment"
            ],
            highlight: false
        },
        {
            id: "sovereign",
            price: "Custom",
            features: [
                "Dedicated OKE Cluster",
                "Unlimited Audits & Logs",
                "Dedicated Solutions Architect",
                "White-Glove Onboarding",
                "Custom Legal/GDPR Hardening",
                "On-Premise / Air-Gapped",
                "FedRAMP / ISO Assistance"
            ],
            notIncluded: [],
            highlight: false
        }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "OmniGCloud Platform",
        "description": t('hero.subtitle'),
        "offers": plans.map(plan => ({
            "@type": "Offer",
            "name": t(`plans.${plan.id}.name`),
            "price": plan.price === "Custom" ? "0" : plan.price,
            "priceCurrency": "USD",
            "description": t(`plans.${plan.id}.desc`),
            "url": `https://omnigcloud.com/${locale}/pricing#${plan.id}`
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
            />

            {/* HERO & PRICING GRID - Snap 1 */}
            <section className="snap-section" style={{ minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '1rem', paddingBottom: '1rem' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <div className="badge badge-primary-subtle mb-3">{t('hero.tag')}</div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '0.75rem', letterSpacing: '-1px' }}>
                            {t('hero.title')}
                        </h1>
                        <p style={{ fontSize: '0.95rem', opacity: 0.7, maxWidth: '650px', margin: '0 auto', lineHeight: '1.4' }}>
                            {t('hero.subtitle')}
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '0.75rem',
                        alignItems: 'stretch'
                    }}>
                        {plans.map((plan, idx) => (
                            <div key={idx} id={plan.id} className={`glass-panel ${plan.highlight ? 'border-primary' : ''}`} style={{
                                padding: '1.25rem',
                                borderRadius: '1.25rem',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                background: plan.highlight ? 'rgba(59, 130, 246, 0.03)' : 'var(--card-bg)',
                                border: plan.highlight ? '2px solid var(--primary)' : '1px solid var(--card-border)',
                                transform: plan.highlight ? 'scale(1.02)' : 'none',
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
                                        {plan.features.slice(0, 7).map((feature, fidx) => (
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
                </div>
            </section>

            {/* COST ANALYSIS METRICS */}
            <section className="snap-section" style={{ background: 'var(--background)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div className="badge badge-primary-subtle mb-3">COST INTELLIGENCE</div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '0.5rem' }}>Real Savings, Real Numbers</h2>
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
                            />
                        </div>
                        <CloudDistributionPie />
                        <FeatureUsageBar />
                    </div>
                </div>
            </section>

            {/* TRUSTED BY & FAQ - Snap 2 */}
            <section className="snap-section" style={{ background: 'var(--bg-surface-2)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', alignItems: 'start' }}>
                        {/* Trust Section */}
                        <div id="trust" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ gridColumn: 'span 2' }}>
                                <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>{t('trust.title')}</h2>
                                <p style={{ opacity: 0.7, marginBottom: '1.5rem', fontSize: '0.9rem' }}>{t('trust.subtitle')}</p>
                            </div>
                            <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.25rem' }}>
                                <Shield color="var(--primary)" size={24} className="mb-2" />
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.5rem' }}>{t('trust.residency.title')}</h4>
                                <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>{t('trust.residency.desc')}</p>
                            </div>
                            <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.25rem' }}>
                                <Globe color="var(--primary)" size={24} className="mb-2" />
                                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.5rem' }}>{t('trust.neutrality.title')}</h4>
                                <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>{t('trust.neutrality.desc')}</p>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div id="faq">
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1.5rem' }}>FAQ</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {[
                                    { q: t('faq.q1.q'), a: t('faq.q1.a') },
                                    { q: t('faq.q2.q'), a: t('faq.q2.a') },
                                    { q: t('faq.q3.q'), a: t('faq.q3.a') }
                                ].map((faq, idx) => (
                                    <div key={idx} className="glass-panel" style={{ padding: '1rem', borderRadius: '0.75rem' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                                            <HelpCircle size={14} color="var(--primary)" />
                                            <h4 style={{ fontWeight: 800, margin: 0, fontSize: '0.85rem' }}>{faq.q}</h4>
                                        </div>
                                        <p style={{ fontSize: '0.75rem', opacity: 0.7, marginLeft: '1.5rem' }}>{faq.a}</p>
                                    </div>
                                ))}
                            </div>
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
                                {t('cta.button') || 'Get Started Now'} <ArrowRight size={20} className="ml-2" />
                            </Link>
                            <p style={{ fontSize: '0.7rem', opacity: 0.7, fontWeight: 700, letterSpacing: '0.1em' }}>
                                NO CREDIT CARD REQUIRED • SOC-2 COMPLIANT ONBOARDING
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SITEMAP / FOOTER SNAP SECTION */}
            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </section>
        </>
    );
}
