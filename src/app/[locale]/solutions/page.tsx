import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import React from 'react';
import { Shield, Globe, Layers, ArrowRight, ChevronRight, Award, Landmark, Phone, HeartPulse, Truck, Activity, BarChart3, Building2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { USE_CASES } from '@/data/use-cases';
import Grid2x2Section from '@/components/layout/Grid2x2Section';

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
        <div className="min-h-screen">
            {/* HERO */}
            <Section className="py-24 bg-gradient-to-b from-[#020617] to-[var(--background)]">
                <PageShell>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="badge badge-primary-subtle mb-6">ENTERPRISE SOLUTIONS</div>
                            <h1 className="text-6xl font-black mb-8 leading-[1.1]">
                                Sovereign Cloud <br /><span className="text-gradient">Modernization</span>
                            </h1>
                            <p className="text-xl opacity-70 mb-10 leading-relaxed">
                                OmniGCloud addresses the complexities of multi-regional cloud compliance
                                with research-backed architectural patterns. We implement automated
                                safeguards to secure platform stability across global markets.
                            </p>
                            <Link href={`/${locale}/contact`} className="btn-primary py-4 px-10 rounded-full inline-flex items-center gap-2 transition-all hover:scale-105">
                                Request Enterprise Evaluation <ArrowRight size={18} />
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="glass-panel p-8 rounded-[3rem] border border-[var(--primary-glow)] animate-pulse-slow">
                                <Globe size={320} className="text-[var(--primary)] opacity-40 mx-auto" strokeWidth={1} />
                            </div>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* INDUSTRIES GRID */}
            <section className="py-24 bg-[var(--bg-surface-2)]">
                <PageShell>
                    <div className="text-center mb-16">
                        <div className="badge badge-primary-subtle mb-4">SECTOR EXPERTISE</div>
                        <h2 className="text-4xl font-bold mb-4">Industry-Specific Governance</h2>
                        <p className="opacity-60 max-w-2xl mx-auto">
                            We provide tailored compliance and modernization frameworks for highly regulated industries.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {industryConfigs.map((item) => (
                            <div key={item.id} id={item.id} className="glass-panel p-10 rounded-[2.5rem] bg-[var(--bg-card)] border border-transparent hover:border-[var(--primary-glow)] transition-all">
                                <div className="text-[var(--primary)] mb-6">{item.icon}</div>
                                <h3 className="text-2xl font-black mb-4">{t(`${item.key}.name`)}</h3>
                                <p className="opacity-60 leading-relaxed text-sm mb-8">
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
            <section className="py-24">
                <PageShell>
                    <div className="text-center mb-16">
                        <div className="badge badge-primary-subtle mb-4">STRATEGIC IMPACT</div>
                        <h2 className="text-4xl font-bold mb-4">Featured Use Cases</h2>
                        <p className="opacity-60 max-w-2xl mx-auto">
                            Measurable velocity across regulated regions: Compliance, Security, and Intelligence.
                        </p>
                    </div>

                    <div className="space-y-24">
                        {USE_CASES.filter(uc => ['financial', 'healthcare', 'government'].includes(uc.id)).map((uc, idx) => (
                            <div key={uc.id} id={uc.id}>
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
            <section className="py-24 bg-[var(--bg-card)]">
                <PageShell>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">A Framework of Reliability</h2>
                        <p className="opacity-60 max-w-2xl mx-auto">
                            OmniGCloud’s infrastructure is engineered to mitigate risks in global
                            user experienced through research-backed technical safeguards.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="glass-panel p-10 rounded-[2.5rem] bg-[var(--bg-surface-2)]">
                            <div className="text-[var(--primary)] mb-6 font-black text-sm uppercase tracking-widest">The Challenge</div>
                            <h3 className="text-xl font-bold mb-4">Localized Data Drift</h3>
                            <p className="opacity-60 leading-relaxed text-sm">
                                Standard cloud infrastructures frequently fail to maintain content integrity across regions.
                            </p>
                        </div>
                        <div className="glass-panel p-10 rounded-[2.5rem] bg-[var(--bg-surface-2)] border border-[var(--primary-glow)]">
                            <div className="text-[var(--primary)] mb-6 font-black text-sm uppercase tracking-widest">The Solution</div>
                            <h3 className="text-xl font-bold mb-4">Automated Gating</h3>
                            <p className="opacity-60 leading-relaxed text-sm">
                                We utilize proprietary release gates that audit over 400 unique endpoints per cycle.
                            </p>
                        </div>
                        <div className="glass-panel p-10 rounded-[2.5rem] bg-[var(--bg-surface-2)]">
                            <div className="text-[var(--primary)] mb-6 font-black text-sm uppercase tracking-widest">The Outcome</div>
                            <h3 className="text-xl font-bold mb-4">Enterprise Compliance</h3>
                            <p className="opacity-60 leading-relaxed text-sm">
                                Guaranteed content synchronization across 8 global markets, reducing manual audit costs by 95%.
                            </p>
                        </div>
                    </div>
                </PageShell>
            </section>

            {/* CROSS-REFERENCE TO RESEARCH */}
            <section className="py-24">
                <PageShell>
                    <div className="glass-panel p-16 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-12 bg-gradient-to-r from-transparent to-[var(--primary-glow)] border border-[var(--primary-glow)]">
                        <div className="max-w-xl">
                            <div className="flex items-center gap-2 text-[var(--primary)] font-bold mb-4">
                                <Award size={20} /> TECHNICAL RESEARCH EVIDENCE
                            </div>
                            <h2 className="text-3xl font-bold mb-6">Founded on Original Engineering</h2>
                            <p className="opacity-70 leading-relaxed mb-8">
                                The architectural foundation of OmniGCloud is documented in original technical research
                                authored by our founding engineers.
                            </p>
                            <Link href={`/${locale}/research`} className="text-[var(--primary)] font-bold flex items-center gap-2 hover:translate-x-2 transition-all">
                                Review Published Technical Research <ChevronRight size={18} />
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <Layers size={140} className="text-[var(--primary)] opacity-40" />
                        </div>
                    </div>
                </PageShell>
            </section>
        </div>
    );
}
