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

    return (
        <div className="main-content">
            {/* HERO */}
            <section style={{ padding: '6rem 0 4rem', textAlign: 'center' }}>
                <div className="container">
                    <div className="badge badge-primary-subtle mb-4">{t('hero.tag')}</div>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 950, marginBottom: '1.5rem' }}>
                        {t('hero.title')}
                    </h1>
                    <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '700px', margin: '0 auto' }}>
                        {t('hero.subtitle')}
                    </p>
                </div>
            </section>

            {/* PRICING GRID */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1.5rem',
                        alignItems: 'stretch'
                    }}>
                        {plans.map((plan, idx) => (
                            <div key={idx} id={plan.id} className={`glass-panel ${plan.highlight ? 'border-primary' : ''}`} style={{
                                padding: '2.5rem',
                                borderRadius: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                background: plan.highlight ? 'rgba(59, 130, 246, 0.03)' : 'var(--card-bg)',
                                border: plan.highlight ? '2px solid var(--primary)' : '1px solid var(--card-border)',
                                transform: plan.highlight ? 'scale(1.05)' : 'none',
                                zIndex: plan.highlight ? 10 : 1
                            }}>
                                {plan.highlight && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-15px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        padding: '4px 12px',
                                        borderRadius: '1rem',
                                        fontSize: '0.75rem',
                                        fontWeight: 900,
                                        letterSpacing: '0.05em'
                                    }}>
                                        {t('plans.popular')}
                                    </div>
                                )}
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>{t(`plans.${plan.id}.name`)}</h3>
                                <p style={{ fontSize: '0.875rem', opacity: 0.6, marginBottom: '2rem', height: '3rem' }}>{t(`plans.${plan.id}.desc`)}</p>

                                <div style={{ marginBottom: '2rem' }}>
                                    <span style={{ fontSize: '2.5rem', fontWeight: 950 }}>{plan.price !== "Custom" ? `$${plan.price}` : plan.price}</span>
                                    {plan.price !== "Custom" && <span style={{ opacity: 0.5, fontSize: '1rem' }}> {t('plans.month')}</span>}
                                </div>

                                <div style={{ flexGrow: 1, marginBottom: '2rem' }}>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {plan.features.map((feature, fidx) => (
                                            <li key={fidx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.9rem' }}>
                                                <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '50%', padding: '2px' }}>
                                                    <Check size={14} />
                                                </div>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                        {plan.notIncluded && plan.notIncluded.map((feature, fidx) => (
                                            <li key={fidx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.9rem', opacity: 0.4 }}>
                                                <div style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'rgba(255,255,255,0.4)', borderRadius: '50%', padding: '2px' }}>
                                                    <X size={14} />
                                                </div>
                                                <span style={{ textDecoration: 'line-through' }}>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link href="/contact" className={plan.highlight ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%', textAlign: 'center' }}>
                                    {t(`plans.${plan.id}.cta`)}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TRUSTED BY EB-1A NOTE */}
            <section style={{ padding: '6rem 0', background: 'var(--bg-surface-2)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>{t('trust.title')}</h2>
                    <p style={{ opacity: 0.7, marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
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
            <section style={{ padding: '6rem 0' }}>
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
                    <div className="glass-panel" style={{ padding: '4rem', borderRadius: '3rem', background: 'linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)', color: 'white' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '1.5rem' }}>{t('cta.title')}</h2>
                        <p style={{ opacity: 0.9, marginBottom: '2.5rem', fontSize: '1.1rem' }}>{t('cta.subtitle')}</p>
                        <Link href="/contact" className="btn-primary" style={{ background: 'white', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
                            {t('cta.button')} <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
