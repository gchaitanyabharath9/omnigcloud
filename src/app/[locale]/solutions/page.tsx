import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import React from 'react';
import { Shield, Globe, Layers, ArrowRight, ChevronRight, Award, Landmark, Phone, HeartPulse, Truck, Activity, BarChart3, Building2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { USE_CASES } from '@/data/use-cases';
import Grid2x2Section from '@/components/layout/Grid2x2Section';
import { HowItWorks, VisualSection, DeepDive, TopicalAuthority, TechnicalInsights, FAQSection } from '@/components/seo/Enrichment';
import EnterprisePillars from "@/components/sections/enterprise/EnterpriseApproach";

const industryConfigs = [
    { id: "financial-services", key: "financial", icon: <Landmark size={32} /> },
    { id: "insurance", key: "insurance", icon: <Shield size={32} /> },
    { id: "telecom", key: "telecom", icon: <Phone size={32} /> },
    { id: "healthcare", key: "healthcare", icon: <HeartPulse size={32} /> },
    { id: "logistics", key: "logistics", icon: <Truck size={32} /> }
];

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('Industries');
    const uct = await getTranslations('UseCases');

    return (
        <div className="flex-col w-full">
            {/* HERO */}
            <section className="snap-section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(to bottom, #020617, var(--background))' }}>
                <PageShell>
                    <div className="hero-grid-layout" style={{ gap: '2rem' }}>
                        <div>
                            <div className="badge badge-primary-subtle" style={{ marginBottom: '1.5rem' }}>ENTERPRISE SOLUTIONS</div>
                            <h1 style={{ fontSize: '3.5rem', fontWeight: 950, marginBottom: '1.5rem', lineHeight: '1.1' }}>
                                Sovereign Cloud <br /><span className="text-gradient">Modernization</span>
                            </h1>
                            <p style={{ fontSize: '1.1rem', opacity: 0.7, marginBottom: '2.5rem', lineHeight: '1.6', maxWidth: '600px' }}>
                                OmniGCloud addresses the complexities of multi-regional cloud compliance
                                with research-backed architectural patterns. We implement automated
                                safeguards to secure platform stability across global markets.
                            </p>
                            <Link href={`/${locale}/contact`} className="btn-primary" style={{ padding: '1rem 2.5rem', borderRadius: '2rem' }}>
                                Request Enterprise Evaluation <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                            </Link>
                        </div>
                        <div className="relative justify-center" style={{ display: 'flex' }}>
                            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '3rem', border: '1px solid var(--primary-glow)' }}>
                                <Globe size={240} className="text-[var(--primary)]" style={{ opacity: 0.3, margin: '0 auto' }} strokeWidth={1} />
                            </div>
                        </div>
                    </div>
                </PageShell>
            </section>

            {/* INDUSTRIES GRID */}
            <section id="industries" className="snap-section" style={{ background: 'var(--bg-surface-2)', padding: '6rem 0' }}>
                <PageShell>
                    <div className="text-center" style={{ marginBottom: '4rem' }}>
                        <div className="badge badge-primary-subtle mb-4">SECTOR EXPERTISE</div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>Industry-Specific Governance</h2>
                        <p style={{ opacity: 0.6, maxWidth: '700px', margin: '0 auto' }}>
                            We provide tailored compliance and modernization frameworks for highly regulated industries.
                        </p>
                    </div>

                    <div className="grid-2" style={{ gap: '2rem' }}>
                        {industryConfigs.map((item) => (
                            <div key={item.id} id={item.id} className="glass-panel" style={{ padding: '3rem', scrollMarginTop: '120px' }}>
                                <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>{item.icon}</div>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '1rem' }}>{t(`${item.key}.name`)}</h3>
                                <p style={{ opacity: 0.6, fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                                    {t(`${item.key}.desc`)}
                                </p>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {[1, 2, 3].map(i => (
                                        <span key={i} className="text-[0.65rem] font-bold px-3 py-1 bg-white/5 rounded-full border border-white/10 opacity-70">
                                            {t(`${item.key}.c${i}`)}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </PageShell>
            </section>

            {/* USE CASES SNAP SECTION */}
            <section id="use-cases-intro" className="snap-section" style={{ padding: '6rem 0' }}>
                <PageShell>
                    <div className="text-center" style={{ marginBottom: '4rem' }}>
                        <div className="badge badge-primary-subtle mb-4">STRATEGIC IMPACT</div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>Featured Use Cases</h2>
                        <p style={{ opacity: 0.6, maxWidth: '700px', margin: '0 auto' }}>
                            Measurable velocity across regulated regions: Compliance, Security, and Intelligence.
                        </p>
                    </div>

                    <div className="flex-col" style={{ gap: '6rem' }}>
                        {USE_CASES.filter(uc => ['financial', 'healthcare', 'government'].includes(uc.id)).map((uc, idx) => (
                            <div key={uc.id} id={uc.id} style={{ scrollMarginTop: '100px' }}>
                                <Grid2x2Section
                                    {...uc}
                                    title={uct(`${uc.id}.title`)}
                                    tag={uct(`${uc.id}.tag`)}
                                    description={uct(`${uc.id}.description`)}
                                    explanation={uct(`${uc.id}.explanation`)}
                                    darkBg={idx % 2 !== 0}
                                    reverse={idx % 2 !== 0}
                                />
                            </div>
                        ))}
                    </div>
                </PageShell>
            </section>

            {/* PROBLEM / SOLUTION / OUTCOMES */}
            <section className="snap-section" style={{ background: 'var(--bg-card)', padding: '6rem 0' }}>
                <PageShell>
                    <div className="text-center" style={{ marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>A Framework of Reliability</h2>
                        <p style={{ opacity: 0.6, maxWidth: '700px', margin: '0 auto' }}>
                            OmniGCloud’s infrastructure is engineered to mitigate risks in global
                            user experienced through research-backed technical safeguards.
                        </p>
                    </div>

                    <div className="grid-3" style={{ gap: '2rem' }}>
                        <div className="glass-panel" style={{ background: 'var(--bg-surface-2)', padding: '2.5rem' }}>
                            <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase' }}>The Challenge</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '1rem' }}>Localized Data Drift</h3>
                            <p style={{ opacity: 0.6, fontSize: '0.85rem', lineHeight: 1.5 }}>
                                Standard cloud infrastructures frequently fail to maintain content integrity across regions.
                            </p>
                        </div>
                        <div className="glass-panel" style={{ background: 'var(--bg-surface-2)', padding: '2.5rem', border: '1px solid var(--primary-glow)' }}>
                            <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase' }}>The Solution</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '1rem' }}>Automated Gating</h3>
                            <p style={{ opacity: 0.6, fontSize: '0.85rem', lineHeight: 1.5 }}>
                                We utilize proprietary release gates that audit over 400 unique endpoints per cycle.
                            </p>
                        </div>
                        <div className="glass-panel" style={{ background: 'var(--bg-surface-2)', padding: '2.5rem' }}>
                            <div style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase' }}>The Outcome</div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '1rem' }}>Enterprise Compliance</h3>
                            <p style={{ opacity: 0.6, fontSize: '0.85rem', lineHeight: 1.5 }}>
                                Guaranteed content synchronization across 8 global markets, reducing manual audit costs by 95%.
                            </p>
                        </div>
                    </div>
                </PageShell>
            </section>

            {/* CROSS-REFERENCE TO RESEARCH */}
            <section className="snap-section" style={{ padding: '6rem 0' }}>
                <PageShell>
                    <div className="glass-panel" style={{ padding: '4rem', borderRadius: '4rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', background: 'linear-gradient(to right, transparent, var(--primary-glow))', border: '1px solid var(--primary-glow)' }}>
                        <div style={{ flex: '1 1 500px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '1rem' }}>
                                <Award size={20} /> TECHNICAL RESEARCH EVIDENCE
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>Founded on Original Engineering</h2>
                            <p style={{ opacity: 0.7, lineHeight: 1.6, marginBottom: '2rem' }}>
                                The architectural foundation of OmniGCloud is documented in original technical research
                                authored by our founding engineers.
                            </p>
                            <Link href={`/${locale}/research`} style={{ color: 'var(--primary)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                                Review Published Technical Research <ChevronRight size={18} />
                            </Link>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Layers size={140} style={{ color: 'var(--primary)', opacity: 0.2 }} />
                        </div>
                    </div>
                </PageShell>
            </section>

            <HowItWorks pageKey="Solutions" />

            <VisualSection
                pageKey="Solutions"
                imageUrl="/images/seo/architecture.png"
                alt="Global Solution Fabric"
                description="Our solutions are mapped to regional sovereign fabrics, ensuring that your modernization efforts are always in sync with local regulatory mandates."
            />

            <EnterprisePillars />

            <DeepDive
                pageKey="Solutions"
                relatedLinks={[
                    { label: "Financial Sovereignty", href: "/industries/finance" },
                    { label: "Cloud Modernization", href: "/services/cloud-modernization" },
                    { label: "Sovereign AI Deployment", href: "/products/playground" }
                ]}
            />

            <TopicalAuthority pageKey="Solutions" />
            <TechnicalInsights pageKey="Solutions" />
            <FAQSection pageKey="Solutions" />
        </div>
    );
}
