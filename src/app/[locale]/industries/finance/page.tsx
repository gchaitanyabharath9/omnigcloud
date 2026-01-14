import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import React from 'react';
import { Landmark, Zap, Shield, Search, ArrowRight, Code, MessageCircle, BarChart3, Lock, CheckCircle2, Globe, Building2, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generateSEOMetadata, SEO_KEYWORDS } from '@/utils/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return generateSEOMetadata({
        title: "Financial Services Cloud Infrastructure | PCI-DSS Compliant",
        description: "Secure, high-frequency cloud infrastructure for the financial sector. We ensure PCI-DSS compliance, data residency, and micro-latency performance.",
        keywords: [
            ...SEO_KEYWORDS.security,
            ...SEO_KEYWORDS.platform,
            "financial services cloud",
            "fintech infrastructure",
            "pci dss compliance",
            "banking cloud",
            "high frequency trading",
            "secure payment processing",
        ],
        canonical: `https://www.omnigcloud.com/${locale}/industries/finance`,
        ogImage: 'https://www.omnigcloud.com/og-images/industries/finance.png',
        ogType: 'website',
    }, locale);
}

export default async function FinanceIndustryPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <div className="bg-background min-h-screen">
            <Section className="py-24 bg-gradient-to-b from-[#020617] to-[var(--background)]">
                <PageShell>
                    <div className="max-w-4xl">
                        <div className="badge badge-primary-subtle mb-6 flex items-center gap-2">
                            <Landmark size={14} /> FINANCIAL SECTOR SOVEREIGNTY
                        </div>
                        <h1 className="text-6xl font-black mb-8 leading-tight tracking-tight">
                            Modernizing the <span className="text-gradient">Digital Ledger</span>
                        </h1>
                        <p className="text-xl opacity-70 mb-10 leading-relaxed max-w-2xl">
                            Eliminate the risk of legacy technical debt. OmniGCloud provides banks, fintechs, and insurance giants with the autonomous control plane needed to modernize core systems while maintaining absolute data residency.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${locale}/contact`} className="btn-primary py-4 px-10 rounded-full font-bold">Industry Briefing</Link>
                            <Link href={`/${locale}/use-cases/financial`} className="btn-secondary py-4 px-10 rounded-full font-bold">Banking Case Study</Link>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* DETAILED CONTENT SECTION 1 */}
            <Section className="py-24 border-y border-white/5">
                <PageShell>
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Regulated Innovation</h2>
                            <h3 className="text-4xl font-bold mb-8">Balancing Agility with Strict Governance</h3>
                            <p className="text-lg opacity-80 leading-relaxed mb-6">
                                The financial services industry is in the midst of a dual crisis: the need to innovate at fintech speeds while navigating increasingly complex sovereignty laws (GDPR, SarbOx, and regional banking mandates). OmniGCloud solves this by decoupling the <strong>Infrastructure Execution</strong> from the <strong>Governance Intent</strong>.
                            </p>
                            <p className="text-lg opacity-80 leading-relaxed">
                                Our platform and consultancy services help Tier-1 banks deconstruct monolithic cores in favor of resilient microservices clusters. By utilizing 'Sovereign Nodes', we ensure that transactional data never leaves its jurisdictional boundary, even when utilizing global cloud providers like AWS or Azure for compute arbitrage.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            {[
                                { title: "Compliance-first Refactoring", desc: "Automated auditing of legacy code for data-leak vulnerabilities before migration.", icon: Shield },
                                { title: "High-Frequency Telemetry", desc: "Sub-millisecond monitoring of transaction latency across multi-cloud regions.", icon: TrendingUp },
                                { title: "Residency Gating", desc: "Enforce 100% data localization with autonomous policy-driven routing.", icon: Globe }
                            ].map((feature, i) => (
                                <div key={i} className="glass-panel p-6 rounded-2xl flex gap-6 items-start hover:border-primary/30 transition-all">
                                    <div className="bg-primary-glow p-3 rounded-lg text-primary">
                                        <feature.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-2 text-xl">{feature.title}</h4>
                                        <p className="opacity-60 text-sm leading-relaxed">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* INDUSTRY SPECIFICS */}
            <Section className="py-24 bg-[var(--bg-surface-2)]">
                <PageShell>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black mb-10 text-center">Banking & Fintech Modernization Pillars</h2>
                        <div className="prose prose-invert prose-slate max-w-none">
                            <h4 className="text-xl font-bold mb-4 mt-10">1. Core Banking Deconstruction</h4>
                            <p className="mb-6">
                                Most major banks still rely on COBOL or legacy Java monoliths for core ledgers. We provide the 'Modernization Factory'—an AI-assisted pipeline that identifies business domains within the monolith and automatically generates containerized microservices blueprints to replace them incrementally.
                            </p>
                            <h4 className="text-xl font-bold mb-4">2. Sovereign Managed Kubernetes</h4>
                            <p className="mb-6">
                                We specialize in deploying RedHat OpenShift (OCP) and Azure Kubernetes (AKS) clusters with pre-hardened financial guardrails. We implement FIPS-validated encryption, strict VPC isolation, and automated secret rotations as part of the baseline platform build.
                            </p>
                            <h4 className="text-xl font-bold mb-4">3. Fraud Detection with Localized AI</h4>
                            <p>
                                Leverage the power of Generative AI without compromising privacy. Our 'Sovereign Knowledge' RAG engine allows banks to process sensitive customer telemetry locally, training fraud detection models within a shielded VPC that never exposes PII (Personally Identifiable Information) to public LLM providers.
                            </p>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* FAQ SECTION */}
            <Section className="py-24 bg-[var(--bg-card)]">
                <PageShell>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black mb-12 text-center">Finance Sector FAQ</h2>
                        <div className="space-y-4">
                            {[
                                { q: "Do you support SWIFT and ISO 20022 message synchronization?", a: "Yes. Our cloud-native data fabrics are designed to handle high-volume financial messaging with bi-directional sync and zero-loss guarantees across regions." },
                                { q: "How do you handle PCI-DSS compliance in a multi-cloud setup?", a: "Our Governance Guard product continuously audits your infrastructure against PCI-DSS standards. If a misconfiguration (like an open port or unencrypted volume) is detected, it is auto-remedied in seconds." },
                                { q: "Can we use OmniGCloud for insurance claims processing?", a: "Absolutely. We help insurance firms automate 'catastrophic scaling'—ensuring that during major events, their claims infrastructure can scale 10x instantly without violating data residency laws." },
                                { q: "What is your approach to legacy mainframe integration?", a: "We utilize high-speed API adaptors and event-driven bridges (Kafka) to 'strangle' the mainframe, allowing new digital services to read/write state while the core systems are gradually moved to the cloud." }
                            ].map((faq, i) => (
                                <div key={i} className="glass-panel p-6 rounded-2xl border-white/5">
                                    <h4 className="font-bold mb-3 flex items-center gap-3 text-primary text-lg">
                                        <MessageCircle size={20} /> {faq.q}
                                    </h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed pl-8">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* INTERNAL LINKS */}
            <Section className="py-24 border-t border-white/5">
                <PageShell>
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <Link href={`/${locale}/services/microservices`} className="glass-panel p-10 rounded-[2.5rem] group hover:border-primary/50 transition-all">
                            <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Microservices Architecture</h4>
                            <p className="opacity-60 text-sm mb-6">Learn how to deconstruct financial monoliths into scalable, resilient distributed systems.</p>
                            <div className="text-primary font-bold flex items-center gap-2">Explore Architecture <ArrowRight size={14} /></div>
                        </Link>
                        <Link href={`/${locale}/services/cloud-migration`} className="glass-panel p-10 rounded-[2.5rem] group hover:border-primary/50 transition-all">
                            <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Strategic Migration</h4>
                            <p className="opacity-60 text-sm mb-6">Execute a low-risk, high-velocity migration of your core banking assets to the cloud.</p>
                            <div className="text-primary font-bold flex items-center gap-2">Plan Migration <ArrowRight size={14} /></div>
                        </Link>
                    </div>

                    <EngagementBox />
                </PageShell>
            </Section>
        </div>
    );
}

import EngagementBox from '@/components/EngagementBox';
