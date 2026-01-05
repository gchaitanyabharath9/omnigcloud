import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import React from 'react';
import { Shield, Globe, Layers, ArrowRight, ChevronRight, Award } from 'lucide-react';
import Link from 'next/link';

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <div className="min-h-screen">
            {/* HERO - Layer 1: Marketing */}
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

            {/* PROBLEM / SOLUTION / OUTCOMES */}
            <section className="py-24 bg-[var(--bg-surface-2)]">
                <PageShell>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">A Framework of Reliability</h2>
                        <p className="opacity-60 max-w-2xl mx-auto">
                            OmniGCloud’s infrastructure is engineered to mitigate risks in global
                            user experienced through research-backed technical safeguards.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* THE PROBLEM */}
                        <div className="glass-panel p-10 rounded-[2.5rem] bg-[var(--bg-card)]">
                            <div className="text-[var(--primary)] mb-6 font-black text-sm uppercase tracking-widest">The Challenge</div>
                            <h3 className="text-xl font-bold mb-4">Localized Data Drift</h3>
                            <p className="opacity-60 leading-relaxed text-sm">
                                Standard cloud infrastructures frequently fail to maintain content integrity across regions,
                                leading to "silent regressions" where localized documentation is lost.
                            </p>
                        </div>

                        {/* THE SOLUTION */}
                        <div className="glass-panel p-10 rounded-[2.5rem] bg-[var(--bg-card)] border border-[var(--primary-glow)]">
                            <div className="text-[var(--primary)] mb-6 font-black text-sm uppercase tracking-widest">The Solution</div>
                            <h3 className="text-xl font-bold mb-4">Automated Gating</h3>
                            <p className="opacity-60 leading-relaxed text-sm">
                                We utilize proprietary release gates that audit over 400 unique endpoints per
                                deployment cycle to ensure cross-locale integrity before any code reaches production.
                            </p>
                        </div>

                        {/* THE OUTCOME */}
                        <div className="glass-panel p-10 rounded-[2.5rem] bg-[var(--bg-card)]">
                            <div className="text-[var(--primary)] mb-6 font-black text-sm uppercase tracking-widest">The Outcome</div>
                            <h3 className="text-xl font-bold mb-4">Enterprise Compliance</h3>
                            <p className="opacity-60 leading-relaxed text-sm">
                                Guaranteed content synchronization across 8 global markets, reducing manual audit
                                costs by 95% while maintaining strict data sovereignty compliance.
                            </p>
                        </div>
                    </div>
                </PageShell>
            </section>

            {/* CROSS-REFERENCE TO RESEARCH - Layer 2 Link */}
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
                                authored by our founding engineers. View the published whitepapers on
                                automated quality assurance and routing safety.
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
