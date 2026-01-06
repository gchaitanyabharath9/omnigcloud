import { PageShell } from '@/components/layout/PageShell';
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

export function generateStaticParams() {
    return ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].map((locale) => ({ locale }));
}

export const revalidate = 3600;

const PRICING_SECTION_IDS = ['developer', 'professional', 'business', 'sovereign', 'savings-analysis', 'value-economy', 'visual-architecture', 'compliance', 'trust', 'faq'];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const tm = await getTranslations({ locale, namespace: 'Metadata.Pricing' });
    return {
        title: tm('title'),
        description: tm('description'),
        keywords: ['cloud governance pricing', 'enterprise cloud management cost', 'multi-cloud pricing', 'compliance automation pricing'],
    };
}

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
                </PageShell>
            </section>

            {/* ANALYZE YOUR SAVINGS POTENTIAL */}
            <section id="savings-analysis" className="snap-section" style={{ background: 'var(--background)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div className="badge badge-primary-subtle mb-3">COST INTELLIGENCE</div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '0.5rem' }}>Analyze Your Savings Potential</h2>
                        <p style={{ opacity: 0.7, maxWidth: '700px', margin: '0 auto', fontSize: '0.95rem' }}>Get a custom TCO analysis to compare your current cloud spend against a sovereign architecture.</p>
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
                    <div style={{ marginTop: '3rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '1.5rem', opacity: 0.9 }}>Related Strategy & Insights</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                            <Link
                                href={`/${locale}/resources/blog/cloud-modernization-guide`}
                                className="glass-panel"
                                style={{
                                    padding: '1.5rem',
                                    borderRadius: '1rem',
                                    textDecoration: 'none',
                                    display: 'block',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    border: '1px solid var(--card-border)'
                                }}
                            >
                                <div style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>STRATEGY</div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Cloud Modernization</h4>
                                <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.5, color: 'var(--text-secondary)' }}>Comprehensive guide to modernizing your cloud infrastructure</p>
                            </Link>
                            <Link
                                href={`/${locale}/resources/blog/sovereignty-framework`}
                                className="glass-panel"
                                style={{
                                    padding: '1.5rem',
                                    borderRadius: '1rem',
                                    textDecoration: 'none',
                                    display: 'block',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    border: '1px solid var(--card-border)'
                                }}
                            >
                                <div style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>FRAMEWORK</div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Sovereign Finance</h4>
                                <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.5, color: 'var(--text-secondary)' }}>Financial sovereignty through cloud-agnostic architecture</p>
                            </Link>
                            <Link
                                href={`/${locale}/resources/blog/devops-best-practices`}
                                className="glass-panel"
                                style={{
                                    padding: '1.5rem',
                                    borderRadius: '1rem',
                                    textDecoration: 'none',
                                    display: 'block',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    border: '1px solid var(--card-border)'
                                }}
                            >
                                <div style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>BLUEPRINT</div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Modernization Blueprint</h4>
                                <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.5, color: 'var(--text-secondary)' }}>Step-by-step DevOps transformation roadmap</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* VALUE-BASED INFRASTRUCTURE ECONOMY */}
            <section id="value-economy" className="snap-section" style={{ background: 'var(--bg-surface-2)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <Zap size={40} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '1rem' }}>Value-Based Infrastructure Economy</h2>
                        <p style={{ opacity: 0.7, maxWidth: '800px', margin: '0 auto', fontSize: '1rem' }}>Our autonomous framework follows a rigorous 3-step synchronization process to ensure absolute sovereignty and compliance across your multi-cloud estate.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
                            <div style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '0.5rem', fontWeight: 900 }}>01</div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>Transparent Units</h3>
                            <p style={{ opacity: 0.7, lineHeight: 1.6 }}>Pricing based on managed sovereign nodes rather than complex CPU/Memory abstractions.</p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
                            <div style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '0.5rem', fontWeight: 900 }}>02</div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>Egress Arbitrage</h3>
                            <p style={{ opacity: 0.7, lineHeight: 1.6 }}>Our platform automatically identifies and utilizes the most cost-effective compliant route for data.</p>
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
                            <div style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '0.5rem', fontWeight: 900 }}>03</div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>Predictive Burn Rate</h3>
                            <p style={{ opacity: 0.7, lineHeight: 1.6 }}>Real-time cost forecasting across OCI, AWS, and Azure with 99.8% precision.</p>
                        </div>
                    </div>

                    {/* Economic Sovereignty */}
                    <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1rem' }}>Economic Sovereignty</h3>
                        <p style={{ opacity: 0.8, lineHeight: 1.7, marginBottom: '1.5rem' }}>Digital sovereignty is impossible without economic sovereignty. If your cloud costs are non-negotiable due to technical debt, you are not truly in control. Our pricing and platform model restores that bargaining power.</p>

                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'var(--card-bg)' }}>
                            <Zap size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                            <h4 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '1rem' }}>Automated Cost Arbitrage</h4>
                            <p style={{ opacity: 0.7, lineHeight: 1.6 }}>The platform's arbitrage engine continuously scans across thousands of region-specific pricing APIs to identify the most cost-effective compliant route for your workloads, often reducing OpEx by 30% or more.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* VISUAL ARCHITECTURE BREAKDOWN */}
            <section id="visual-architecture" className="snap-section" style={{ background: 'var(--background)' }}>
                <div className="container">
                    <div style={{ marginBottom: '2rem' }}>
                        <Image
                            src="/images/pricing-value-map.png"
                            alt="Pricing Value Map - ARCHITECTURE_VISUAL_01"
                            width={120}
                            height={40}
                            style={{ marginBottom: '1rem', opacity: 0.7 }}
                            unoptimized
                        />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '1rem' }}>Visual Architecture Breakdown</h2>
                        <p style={{ opacity: 0.7, maxWidth: '900px', fontSize: '1rem', lineHeight: 1.6 }}>Our pricing is aligned with the sovereign nodes you manage, ensuring that your costs scale linearly with your infrastructure value, not your provider's proprietary egress fees.</p>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', marginBottom: '2rem', background: 'rgba(59, 130, 246, 0.03)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '1.2rem' }}>ℹ️</span>
                            </div>
                            <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>This diagram is updated in real-time as your multi-cloud orchestration logic evolves within the AECP kernel.</p>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '1.5rem', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <Shield size={32} color="var(--primary)" />
                            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0 }}>The Hidden Costs of Cloud Lock-In</h3>
                        </div>
                        <p style={{ opacity: 0.8, lineHeight: 1.7, fontSize: '1rem', marginBottom: '1.5rem' }}>Vendor lock-in isn't just a technical problem: it's a massive financial risk. Egress fees and proprietary services can increase your long-term cloud spend by up to 90% through artificial gravity.</p>
                        <p style={{ opacity: 0.8, lineHeight: 1.7, fontSize: '1rem' }}>OmniGCloud's pricing philosophy is built on 'Economic Neutrality'. By enabling workload portability, we allow you to arbitrage cloud providers against each other, ensuring you always get the best market rate for your sovereign compute and storage requirements.</p>
                    </div>
                </div>
            </section>

            {/* ENTERPRISE-GRADE COMPLIANCE */}
            <section id="compliance" className="snap-section" style={{ background: 'var(--bg-surface-2)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <Shield size={40} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '1rem' }}>Enterprise-Grade Compliance</h2>
                        <p style={{ opacity: 0.7, maxWidth: '700px', margin: '0 auto', fontSize: '1rem' }}>Built for regulated industries with strict data residency and sovereignty requirements.</p>
                    </div>

                    {/* FAQ Section */}
                    <div id="faq" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '2rem', textAlign: 'center' }}>Frequently Asked Questions</h3>
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
                                {t('cta.button') || 'Get Started Now'} <ArrowRight size={20} className="ml-2" />
                            </Link>
                            <p style={{ fontSize: '0.7rem', opacity: 0.7, fontWeight: 700, letterSpacing: '0.1em' }}>
                                NO CREDIT CARD REQUIRED • SOC-2 COMPLIANT ONBOARDING
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <HowItWorks pageKey="Pricing" />

            <VisualSection
                pageKey="Pricing"
                imageUrl="/images/seo/architecture.png"
                alt="Pricing Value Map"
                description="Our pricing is aligned with the sovereign nodes you manage, ensuring that your costs scale linearly with your infrastructure value, not your provider's proprietary egress fees."
            />

            <DeepDive
                pageKey="Pricing"
                relatedLinks={[
                    { label: "Cloud Modernization", href: "/services/cloud-modernization" },
                    { label: "Sovereign Finance", href: "/industries/finance" },
                    { label: "Modernization Blueprint", href: "/resources/blog/cloud-modernization-guide" }
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
