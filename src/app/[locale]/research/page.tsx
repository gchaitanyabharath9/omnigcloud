import React from 'react';
import { FileText, BarChart3, Layers, ShieldCheck, Award, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default async function ResearchHubPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <div className="min-h-screen bg-[var(--background)]">
            {/* HERO - Layer 2: Scholarly Focus */}
            <section className="py-20 border-b border-[var(--card-border)] bg-[var(--bg-surface-2)]">
                <div className="container text-center">
                    <div className="badge badge-primary-subtle mb-6 mx-auto flex items-center gap-2">
                        <Award size={14} /> TECHNICAL RESEARCH REPOSITORY
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                        Software <span className="text-gradient">Architecture Research</span>
                    </h1>
                    <p className="text-xl opacity-70 max-w-3xl mx-auto leading-relaxed text-balance">
                        This repository documents original contributions to global software delivery systems,
                        focusing on automated quality enforcement and request routing safety.
                    </p>
                </div>
            </section>

            {/* RESEARCH INDEX */}
            <section className="py-20">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* FEATURED WHITE PAPER */}
                        <div className="glass-panel p-10 rounded-[2.5rem] flex flex-col justify-between border-t-4 border-[var(--primary)] hover:translate-y-[-4px] transition-transform">
                            <div>
                                <div className="text-[var(--primary)] mb-4 font-mono text-xs font-bold uppercase tracking-widest">Featured Publication</div>
                                <h2 className="text-2xl font-bold mb-4">
                                    Automated Multilingual Quality Assurance for Global Web Applications (v1.0)
                                </h2>
                                <p className="opacity-70 mb-8 leading-relaxed">
                                    This paper presents an original methodology for automated release gating in multi-language environments,
                                    addressing the "silent regression" defect common in decentralized i18n architectures.
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link href={`/${locale}/research/automated-multilingual-quality-assurance`} className="btn-primary flex items-center gap-2 px-6">
                                    Read Publication <ChevronRight size={18} />
                                </Link>
                                <span className="text-[10px] opacity-40 font-mono italic">EXHIBIT A-1</span>
                            </div>
                        </div>

                        {/* OTHER RESOURCES */}
                        <div className="grid grid-cols-1 gap-4">
                            <Link href={`/${locale}/research/architecture`} className="glass-panel p-8 rounded-[2rem] flex items-center justify-between group">
                                <div className="flex items-center gap-6">
                                    <Layers className="text-[var(--primary)]" size={32} />
                                    <div>
                                        <h3 className="font-bold text-lg">System Architecture</h3>
                                        <p className="text-sm opacity-60">Architectural evidence and diagrams.</p>
                                    </div>
                                </div>
                                <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>

                            <Link href={`/${locale}/research/metrics`} className="glass-panel p-8 rounded-[2rem] flex items-center justify-between group">
                                <div className="flex items-center gap-6">
                                    <BarChart3 className="text-[var(--primary)]" size={32} />
                                    <div>
                                        <h3 className="font-bold text-lg">Operational Metrics</h3>
                                        <p className="text-sm opacity-60">Verified validation logs and impact data.</p>
                                    </div>
                                </div>
                                <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>

                            <Link href={`/${locale}/research/distributed-systems-resilience`} className="glass-panel p-8 rounded-[2rem] flex items-center justify-between group">
                                <div className="flex items-center gap-6">
                                    <FileText className="text-[var(--primary)]" size={32} />
                                    <div>
                                        <h3 className="font-bold text-lg">Distributed Systems Resilience</h3>
                                        <p className="text-sm opacity-60">Patterns for reliability in unreliable networks.</p>
                                    </div>
                                </div>
                                <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* AUTHORSHIP FOOTER */}
            <section className="py-20 border-t border-[var(--card-border)] footer-attribution">
                <div className="container text-center">
                    <ShieldCheck size={40} className="mx-auto text-[var(--primary)] mb-6" />
                    <p className="text-xs opacity-50 tracking-widest uppercase mb-4">Authorship Declaration</p>
                    <p className="opacity-70 max-w-2xl mx-auto italic text-sm leading-relaxed">
                        "The software systems and architectural patterns documented herein were independently designed
                        and implemented by [Applicant Name] to secure the global surface area of the OmniGCloud platform.
                        Public dissemination is provided for scholarly evidentiary purposes."
                    </p>
                    <div className="mt-8 text-[10px] opacity-30 font-mono">
                        © 2024 [APPLICANT NAME]. ALL RIGHTS RESERVED.
                    </div>
                </div>
            </section>
        </div>
    );
}
