import React from 'react';
import { FileText, Layers, ShieldCheck, Award, ChevronRight, Network, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Research Repository | OmniGCloud',
    description: 'Independent technical research frameworks and architecture specifications.',
};

export default async function ResearchHubPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <div className="min-h-screen bg-[var(--background)]">
            {/* HERO */}
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
                        focusing on automated quality enforcement, request routing safety, and sovereign control planes.
                    </p>
                </div>
            </section>

            {/* FEATURED: SCHOLARLY ARTICLE */}
            <section className="py-16 border-b border-white/5">
                <div className="container">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-2 text-primary">
                            <Award size={18} />
                            <span className="text-xs font-bold font-mono uppercase tracking-widest">Featured Publication</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight">The Enterprise Architecture Tension</h2>
                    </div>

                    <Link href={`/${locale}/research/scholarly-article`} className="glass-panel p-0 rounded-[2rem] border border-white/10 hover:border-primary/50 transition-all group relative overflow-hidden block">
                        {/* Dynamic Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

                        {/* Abstract Architectural Decoration */}
                        <div className="absolute top-0 right-0 p-8 md:p-12 opacity-10 group-hover:opacity-20 transition-all duration-500 group-hover:scale-110">
                            <div className="relative">
                                <Network size={200} className="text-primary" />
                                <ShieldCheck size={80} className="absolute bottom-0 right-0 text-white" />
                                <Layers size={80} className="absolute top-0 left-0 text-white" />
                            </div>
                        </div>

                        <div className="relative z-10 p-8 md:p-12 max-w-4xl">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-mono font-bold uppercase tracking-wider border border-primary/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]">
                                    New Publication
                                </span>
                                <span className="text-muted-foreground text-xs font-mono uppercase">Jan 2026</span>
                            </div>

                            <h3 className="text-3xl md:text-5xl font-black mb-6 leading-[1.1] tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
                                Reconciling Sovereignty, Scale, and Complexity
                            </h3>

                            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                                Why do systems that work at 10k RPS fail at 100k RPS? This position paper analyzes the "Cliff of Failure" and proposes a <strong>Plane Separation</strong> model to resolve the enterprise architecture tension.
                            </p>

                            <div className="flex flex-wrap gap-3 items-center">
                                <span className="btn-primary rounded-full px-8 py-4 flex items-center gap-2 text-lg shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all">
                                    Read Article <ArrowRight size={20} />
                                </span>
                                <div className="hidden sm:flex items-center gap-3 ml-4">
                                    <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-sm font-mono text-slate-300 border border-white/10">
                                        <FileText size={14} /> 5,400 Words
                                    </span>
                                    <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-sm font-mono text-slate-300 border border-white/10">
                                        <Layers size={14} /> 6 Diagrams
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            {/* CATEGORY 1: FRAMEWORKS */}
            <section className="py-16 border-b border-white/5">
                <div className="container">
                    <div className="flex items-center gap-3 mb-8">
                        <Network className="text-primary" size={24} />
                        <h2 className="text-2xl font-bold tracking-tight">Research Frameworks</h2>
                    </div>

                    <div className="grid grid-cols-1">
                        <Link href={`/${locale}/research/frameworks/aecp`} className="glass-panel p-10 rounded-[2rem] flex flex-col md:flex-row items-center justify-between border-t-4 border-primary hover:translate-y-[-4px] transition-transform group">
                            <div className="max-w-3xl">
                                <div className="text-primary mb-3 font-mono text-xs font-bold uppercase tracking-widest">Foundational Framework</div>
                                <h3 className="text-3xl font-bold mb-4">Adaptive Enterprise Control Plane (AECP)</h3>
                                <p className="opacity-70 text-lg leading-relaxed">
                                    A theoretical framework for managing entropy in hyper-scale distributed systems through probabilistic failure injection and policy-as-code governance. The methodology establishes the "Control Plane" as a distinct, sovereign primitive separate from infrastructure.
                                </p>
                            </div>
                            <div className="mt-8 md:mt-0">
                                <span className="btn-secondary rounded-full px-8 py-3 flex items-center gap-2">
                                    View Framework <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CATEGORY 2: APPLIED PAPERS */}
            <section className="py-16">
                <div className="container">
                    <div className="flex items-center gap-3 mb-8">
                        <BookOpen className="text-primary" size={24} />
                        <h2 className="text-2xl font-bold tracking-tight">Applied Architecture Papers</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* A1 */}
                        <PaperCard
                            locale={locale}
                            href="/research/papers/a1-cloud-native-enterprise-reference"
                            id="A1"
                            title="Cloud-Native Enterprise Reference Architecture"
                            desc="The flagship specification for scalable, sovereign enterprise platforms."
                        />

                        {/* A2 */}
                        <PaperCard
                            locale={locale}
                            href="/research/papers/a2-high-throughput-distributed-systems"
                            id="A2"
                            title="High-Throughput Distributed Systems"
                            desc="Handling 500k RPS with sub-10ms latency budgets."
                        />

                        {/* A3 */}
                        <PaperCard
                            locale={locale}
                            href="/research/papers/a3-enterprise-observability-operational-intelligence"
                            id="A3"
                            title="Enterprise Observability & Operational Intelligence"
                            desc="Moving beyond logs/metrics to symptom-based alerting."
                        />

                        {/* A4 */}
                        <PaperCard
                            locale={locale}
                            href="/research/papers/a4-platform-governance-multicloud-hybrid"
                            id="A4"
                            title="Platform Governance in Multi-Cloud"
                            desc="Decentralized policy enforcement for hybrid estates."
                        />

                        {/* A5 */}
                        <PaperCard
                            locale={locale}
                            href="/research/papers/a5-monolith-to-cloud-native-modernization"
                            id="A5"
                            title="Monolith to Cloud-Native Modernization"
                            desc="Strangler Fig patterns for fail-safe legacy migration."
                        />

                        {/* A6 */}
                        <PaperCard
                            locale={locale}
                            href="/research/papers/a6-adaptive-policy-enforcement"
                            id="A6"
                            title="Adaptive Policy Enforcement"
                            desc="Late-binding governance for continuous compliance."
                        />

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
                        and implemented by CHAITANYA BHARATH GOPU to secure the global surface area of the OmniGCloud platform.
                        Public dissemination is provided for technical knowledge sharing."
                    </p>
                    <div className="mt-8 text-[10px] opacity-30 font-mono">
                        © 2026 CHAITANYA BHARATH GOPU. ALL RIGHTS RESERVED.
                    </div>
                </div>
            </section>
        </div>
    );
}

function PaperCard({ locale, href, id, title, desc }: { locale: string, href: string, id: string, title: string, desc: string }) {
    return (
        <Link href={`/${locale}${href}`} className="glass-panel p-6 rounded-2xl flex flex-col hover:border-primary/50 transition-colors group">
            <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold font-mono">
                    {id}
                </div>
                <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" size={20} />
            </div>
            <h3 className="font-bold text-lg mb-2 leading-tight">{title}</h3>
            <p className="text-sm opacity-60 leading-relaxed">{desc}</p>
        </Link>
    );
}
