import { getTranslations } from 'next-intl/server';
import { FileText, Download, BookOpen, Code, Lightbulb, Award } from 'lucide-react';
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
                    <Lightbulb size={14} />
                    <span>THOUGHT LEADERSHIP</span>
                </div>
                <h1 className="text-5xl font-bold mb-4">Research & Innovation</h1>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
                    Advancing the state of the art in cloud governance, multi-cloud orchestration, and enterprise sovereignty through original research and open collaboration.
                </p>
            </div>

            {/* Featured Whitepaper */}
            <section className="glass-panel p-8 rounded-xl mb-12 border-2 border-blue-500/20">
                <div className="flex items-start gap-6">
                    <div className="p-4 bg-blue-500/10 rounded-xl">
                        <FileText className="w-12 h-12 text-blue-500" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-semibold">
                                Featured
                            </span>
                            <span className="text-sm text-zinc-500">Technical Preprint v0.1</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-3">
                            Autonomous Sovereign Orchestration (ASO): A Framework for Multi-Cloud Governance
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                            Multi-cloud adoption has created operational complexity in maintaining data sovereignty, regulatory compliance, and vendor portability. We present the G-Framework, an architectural pattern for Autonomous Sovereign Orchestration that decouples organizational policy from provider-specific implementations.
                        </p>
                        <div className="flex gap-4">
                            <Link href="/docs/whitepaper" className="btn-primary">
                                <Download size={18} className="mr-2" />
                                Read Whitepaper
                            </Link>
                            <a href="/docs/whitepaper/G-Framework-ASO.md" download className="btn-secondary">
                                <Download size={18} className="mr-2" />
                                Download PDF
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
