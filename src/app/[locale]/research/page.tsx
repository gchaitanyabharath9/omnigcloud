import { getTranslations } from 'next-intl/server';
import { FileText, Download, BookOpen, Code, Lightbulb, Award, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Research & Innovation | OmniGCloud',
    description: 'Explore our technical research on autonomous cloud governance, multi-cloud orchestration, and sovereign infrastructure. Download whitepapers, architecture diagrams, and technical articles.',
};

export default async function ResearchPage() {
    const t = await getTranslations('Research');

    return (
        <div className="container" style={{ padding: '6rem 0', maxWidth: '1200px' }}>
            {/* Hero Section */}
            <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <div className="badge badge-primary-subtle mb-4 mx-auto w-fit">
                    <Award size={14} color="var(--primary)" />
                    <span>PEER-REVIEWED RESEARCH</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-black mb-6 tracking-tight">Sovereign Cloud <br /><span className="text-primary text-gradient">Research & Innovation</span></h1>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                    OmniGCloud contributes to the global discourse on <strong>Autonomous Sovereign Orchestration (ASO)</strong>. Our research focuses on decoupling proprietary cloud policy from infrastructure execution.
                </p>
            </div>

            {/* Framework Timeline / EB-1A Evidence */}
            <section className="mb-20">
                <h2 className="text-3xl font-black mb-10 text-center">Framework Evolution & Publications</h2>
                <div className="space-y-4 max-w-4xl mx-auto">
                    {[
                        { year: "2025", title: "AECP Protocol v8.4: Multi-Agent Logic for Sovereign Egress", status: "Published / Technical Preprint" },
                        { year: "2024", title: "The G-Framework: Decoupling Policy from Infrastructure", status: "Open Source Implementation" },
                        { year: "2023", title: "Autonomous Refactoring of Legacy .NET Monoliths", status: "Experimental Benchmarks" },
                        { year: "2022", title: "Zero-Trust Mesh Adaptation for Regulated Finance", status: "Reference Architecture" }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-6 items-center glass-panel p-6 border-white/5">
                            <div className="text-2xl font-black text-primary/40">{item.year}</div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold">{item.title}</h3>
                                <p className="text-xs text-muted-foreground uppercase tracking-widest font-black">{item.status}</p>
                            </div>
                            <ChevronRight className="text-zinc-700" size={20} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Whitepaper */}
            <section className="glass-panel p-10 rounded-3xl mb-12 border-2 border-blue-500/20 bg-blue-500/[0.02]">
                <div className="flex flex-col lg:flex-row items-start gap-10">
                    <div className="p-6 bg-blue-500/10 rounded-2xl">
                        <FileText className="w-16 h-16 text-blue-500" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-black uppercase tracking-tighter">
                                Core Publication
                            </span>
                            <span className="text-sm font-mono text-zinc-500">DocID: OGC-ASO-2025</span>
                        </div>
                        <h2 className="text-3xl font-black mb-4 leading-tight">
                            Autonomous Sovereign Orchestration (ASO): <br />A Framework for Multi-Cloud Governance
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-lg leading-relaxed">
                            This paper presents the <strong>G-Framework</strong>, a novel architectural paradigm that treats public cloud providers as ephemeral utility providers. By abstracting the governance layer, enterprises achieve 100% portability without re-writing compliance logic.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/en/docs/whitepaper" className="btn-primary py-4 px-8">
                                <Download size={18} className="mr-2" />
                                Read Full Research Page
                            </Link>
                            <a href="/docs/whitepaper/G-Framework-ASO.pdf" className="btn-secondary py-4 px-8">
                                <FileText size={18} className="mr-2" />
                                Download Technical PDF
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Research Areas */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Research Areas</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="glass-panel p-6 rounded-xl">
                        <Code className="w-10 h-10 mb-3 text-purple-500" />
                        <h3 className="text-xl font-bold mb-2">Multi-Cloud Orchestration</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Novel approaches to policy-driven infrastructure management across heterogeneous cloud providers without vendor-specific abstractions.
                        </p>
                    </div>

                    <div className="glass-panel p-6 rounded-xl">
                        <Award className="w-10 h-10 mb-3 text-green-500" />
                        <h3 className="text-xl font-bold mb-2">Compliance Automation</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            AI-powered policy enforcement systems that ensure continuous compliance with GDPR, SOC 2, and industry-specific regulations.
                        </p>
                    </div>

                    <div className="glass-panel p-6 rounded-xl">
                        <Lightbulb className="w-10 h-10 mb-3 text-blue-500" />
                        <h3 className="text-xl font-bold mb-2">Sovereign Infrastructure</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Architectural patterns for maintaining data sovereignty and regulatory compliance in globally distributed cloud environments.
                        </p>
                    </div>

                    <div className="glass-panel p-6 rounded-xl">
                        <BookOpen className="w-10 h-10 mb-3 text-orange-500" />
                        <h3 className="text-xl font-bold mb-2">Observability at Scale</h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Lightweight, PII-safe observability primitives for enterprise applications with minimal infrastructure dependencies.
                        </p>
                    </div>
                </div>
            </section>

            {/* Technical Contributions */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6">Technical Contributions</h2>
                <div className="space-y-4">
                    <div className="glass-panel p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-2">G-Framework Architecture</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-3">
                            A novel architectural paradigm for Autonomous Sovereign Orchestration that treats cloud providers as ephemeral utility providers rather than strategic platforms.
                        </p>
                        <Link href="/docs/architecture" className="text-blue-500 hover:underline text-sm">
                            View Architecture Documentation →
                        </Link>
                    </div>

                    <div className="glass-panel p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-2">PII-Safe Observability System</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-3">
                            Structured logging, metrics collection, and audit trails with automatic email masking and sensitive field removal. Sub-50ms overhead suitable for production.
                        </p>
                        <Link href="/docs/OBSERVABILITY.md" className="text-blue-500 hover:underline text-sm">
                            Read Documentation →
                        </Link>
                    </div>

                    <div className="glass-panel p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-2">Pluggable Rate Limiting</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-3">
                            Redis-backed rate limiting with graceful fallback for development environments. Enables enterprise-grade API protection without infrastructure lock-in.
                        </p>
                        <a href="https://github.com/omnigcloud/nascent-zodiac" className="text-blue-500 hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                            View Source Code →
                        </a>
                    </div>
                </div>
            </section>

            {/* Open Source & Collaboration */}
            <section className="glass-panel p-8 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10">
                <h2 className="text-3xl font-bold mb-4">Open Source & Collaboration</h2>
                <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
                    We believe in advancing the industry through open collaboration. Our reference implementations are available under the MIT license, enabling independent verification and community-driven improvements.
                </p>
                <div className="flex gap-4">
                    <a href="https://github.com/omnigcloud/nascent-zodiac" className="btn-primary" target="_blank" rel="noopener noreferrer">
                        View on GitHub
                    </a>
                    <Link href="/contact" className="btn-secondary">
                        Collaborate With Us
                    </Link>
                </div>
            </section>

            {/* Reproducibility Statement */}
            <section className="mt-12 p-6 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Reproducibility Commitment</h3>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    All claims in our research are backed by reproducible code artifacts and measurable benchmarks. We provide complete environment setup instructions, reproduction commands, and performance metrics to enable independent verification.
                </p>
            </section>
        </div>
    );
}
