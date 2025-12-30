import { useTranslations } from 'next-intl';
import { Check, X, Shield, Globe, Cpu, Zap, Award, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pricing | OmniGCloud Enterprise Cloud Governance',
    description: 'Transparent pricing for multi-cloud governance. From developer-friendly free tier to enterprise-grade sovereign plans. No hidden fees, no vendor lock-in.',
    keywords: ['cloud governance pricing', 'enterprise cloud management cost', 'multi-cloud pricing', 'compliance automation pricing'],
};

export default function PricingPage() {
    const t = useTranslations('Pricing');

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
            "url": `https://omnigcloud.com/pricing#${plan.id}`
        }))
    };

    return (
        <div className="main-content">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* HERO */}
            <section style={{ padding: '4rem 0', textAlign: 'center' }}>
                <div className="container">
                    <div className="badge badge-primary-subtle mb-4">{t('hero.tag')}</div>
                    <h1 style={{ fontSize: 'var(--h1-size)', fontWeight: 950, marginBottom: '1.5rem' }}>
                        {t('hero.title')}
                    </h1>
                    <p style={{ fontSize: '1.1rem', opacity: 0.7, maxWidth: '750px', margin: '0 auto' }}>
                        {t('hero.subtitle')}
                    </p>
                </div>
            </section>

            {/* PRICING GRID */}
            <section style={{ padding: '2rem 0 4rem' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1rem',
                        alignItems: 'stretch'
                    }}>
                        {plans.map((plan, idx) => (
                            <div key={idx} id={plan.id} className={`glass-panel ${plan.highlight ? 'border-primary' : ''}`} style={{
                                padding: '2rem',
                                borderRadius: '1.5rem',
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
                                        top: '-12px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        padding: '4px 12px',
                                        borderRadius: '1rem',
                                        fontSize: '0.65rem',
                                        fontWeight: 900,
                                        letterSpacing: '0.1em'
                                    }}>
                                        {t('plans.popular')}
                                    </div>
                                )}
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '0.5rem' }}>{t(`plans.${plan.id}.name`)}</h3>
                                <p style={{ fontSize: '0.85rem', opacity: 0.6, marginBottom: '1.5rem', height: '2.5rem', lineHeight: '1.4' }}>{t(`plans.${plan.id}.desc`)}</p>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <span style={{ fontSize: '2rem', fontWeight: 950 }}>{plan.price !== "Custom" ? `$${plan.price}` : plan.price}</span>
                                    {plan.price !== "Custom" && <span style={{ opacity: 0.5, fontSize: '0.9rem' }}> {t('plans.month')}</span>}
                                </div>

                                <div style={{ flexGrow: 1, marginBottom: '1.5rem' }}>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                                        {plan.features.map((feature, fidx) => (
                                            <li key={fidx} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', fontSize: '0.85rem' }}>
                                                <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '50%', padding: '2px' }}>
                                                    <Check size={12} />
                                                </div>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                        {plan.notIncluded && plan.notIncluded.map((feature, fidx) => (
                                            <li key={fidx} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', fontSize: '0.85rem', opacity: 0.4 }}>
                                                <div style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'rgba(255,255,255,0.4)', borderRadius: '50%', padding: '2px' }}>
                                                    <X size={12} />
                                                </div>
                                                <span style={{ textDecoration: 'line-through' }}>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link href="/contact" className={plan.highlight ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%', textAlign: 'center', padding: '0.6rem 1rem', fontSize: '0.9rem' }}>
                                    {t(`plans.${plan.id}.cta`)}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TRUSTED BY EB-1A NOTE */}
            <section id="trust" style={{ padding: '6rem 0', background: 'var(--bg-surface-2)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: 'var(--h2-size)', fontWeight: 900, marginBottom: '1rem' }}>{t('trust.title')}</h2>
                    <p style={{ opacity: 0.7, marginBottom: '4rem', maxWidth: '650px', margin: '0 auto 4rem', fontSize: '1.1rem' }}>
                        {t('trust.subtitle')}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', textAlign: 'left' }}>
                            <Shield color="var(--primary)" size={24} className="mb-3" />
                            <h4 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>{t('trust.residency.title')}</h4>
                            <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>{t('trust.residency.desc')}</p>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', textAlign: 'left' }}>
                            <Globe color="var(--primary)" size={24} className="mb-3" />
                            <h4 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>{t('trust.neutrality.title')}</h4>
                            <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>{t('trust.neutrality.desc')}</p>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', textAlign: 'left' }}>
                            <Award color="var(--primary)" size={24} className="mb-3" />
                            <h4 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>{t('trust.scholarly.title')}</h4>
                            <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>{t('trust.scholarly.desc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" style={{ padding: '6rem 0' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '3rem', textAlign: 'center' }}>{t('faq.title')}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {[
                            { q: t('faq.q1.q'), a: t('faq.q1.a') },
                            { q: t('faq.q2.q'), a: t('faq.q2.a') },
                            { q: t('faq.q3.q'), a: t('faq.q3.a') }
                        ].map((faq, idx) => (
                            <div key={idx} className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                                    <HelpCircle size={20} color="var(--primary)" />
                                    <h4 style={{ fontWeight: 800, margin: 0 }}>{faq.q}</h4>
                                </div>
                                <p style={{ fontSize: '0.9rem', opacity: 0.7, marginLeft: '2.5rem' }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section style={{ padding: '6rem 0', textAlign: 'center' }}>
                <div className="container">
                    <div className="glass-panel" style={{
                        padding: '5rem 2rem',
                        borderRadius: '3rem',
                        background: 'linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)',
                        color: 'white',
                        border: 'none',
                        boxShadow: '0 20px 50px rgba(59, 130, 246, 0.3)'
                    }}>
                        <h2 style={{ fontSize: 'var(--h2-size)', fontWeight: 950, marginBottom: '1.5rem', color: 'white' }}>
                            {t('cta.title')}
                        </h2>
                        <p style={{ opacity: 0.9, marginBottom: '2.5rem', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                            {t('cta.subtitle')}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                            <Link href="/contact" className="btn-primary" style={{
                                background: 'white',
                                color: '#1e40af',
                                border: 'none',
                                padding: '1rem 3rem',
                                fontSize: '1.1rem',
                                fontWeight: 900
                            }}>
                                {t('cta.button') || 'Get Started Now'} <ArrowRight size={20} className="ml-2" />
                            </Link>
                            <p style={{ fontSize: '0.75rem', opacity: 0.7, fontWeight: 700, letterSpacing: '0.1em' }}>
                                NO CREDIT CARD REQUIRED • SOC-2 COMPLIANT ONBOARDING
                            </p>
                        </div>

                        {/* ATTACHED CONTENT / TRUST BADGES */}
                        <div style={{
                            marginTop: '4rem',
                            paddingTop: '3rem',
                            borderTop: '1px solid rgba(255,255,255,0.1)',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '3rem',
                            flexWrap: 'wrap'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.8 }}>
                                <Shield size={16} /> <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Zero-Trust Architecture</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.8 }}>
                                <Globe size={16} /> <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Multi-Cloud Resiliency</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.8 }}>
                                <Zap size={16} /> <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Instant Sovereignty</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
