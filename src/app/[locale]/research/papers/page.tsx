import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { BookOpen, Calendar, ChevronRight, FileText, Hash, ShieldCheck, Tag } from 'lucide-react';

export const revalidate = 86400; // Cache for 24 hours

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: 'Applied Architecture Papers | OmniGCloud Research',
        description: 'Index of independent technical papers (A1-A6) detailing the OmniGCloud sovereign architecture.',
        alternates: {
            canonical: `https://www.omnigcloud.com/${locale}/research/papers`
        }
    };
}

const PAPERS = [
    {
        id: "A1",
        slug: "a1-cloud-native-enterprise-reference",
        title: "A Reference Architecture for Cloud-Native Enterprise Platforms at Scale",
        abstract: "This paper addresses the challenge of managing operational complexity during the transition from monolithic to cloud-native architectures. It identifies a gap in existing approaches by providing a canonical Reference Architecture (A1) for building sovereign, scalable, and secure enterprise platforms.",
        version: "2.4 (Stable)",
        date: "Jan 2024",
        category: "Architecture"
    },
    {
        id: "A2",
        slug: "a2-high-throughput-distributed-systems",
        title: "High-Throughput Distributed Systems: A Queue-Theoretic Approach",
        abstract: "This paper addresses the challenge of maintaining system stability and low latency (under 50ms p99) when handling machine-generated traffic exceeding 250,000+ RPS. It presents a validated model based on queue theory, partitioning, and explicit backpressure.",
        version: "1.8 (Stable)",
        date: "Jan 2026",
        category: "Distributed Systems"
    },
    {
        id: "A3",
        slug: "a3-enterprise-observability-operational-intelligence",
        title: "Enterprise Observability: From Passive Monitoring to Operational Intelligence",
        abstract: "Addresses the insufficiency of traditional 'Three Pillars' observability in hyper-scale systems. Proposes a shift to 'Operational Intelligence' using a unified telemetry pipeline and cost-aware sampling.",
        version: "3.1 (Stable)",
        date: "Jan 2026",
        category: "Observability"
    },
    {
        id: "A4",
        slug: "a4-platform-governance-multicloud-hybrid",
        title: "Platform Governance in Multi-Cloud Architectures: Guardrails, Not Gates",
        abstract: "Addresses the challenges of maintaining governance across heterogeneous cloud environments. Proposes a 'Platform-Native Governance' model using Policy-as-Code to decouple definition from enforcement.",
        version: "2.0 (Stable)",
        date: "Jan 2026",
        category: "Governance"
    },
    {
        id: "A5",
        slug: "a5-monolith-to-cloud-native-modernization",
        title: "Modernizing Monolithic Systems: A Pattern-Language for Incremental Migration",
        abstract: "Addresses the high failure rate of 'Big Bang' rewrites. Formalizes the 'Strangler Fig Pattern' with a focus on 'Outside-In Extraction' and 'Event-Driven Decoupling' for safe modernization.",
        version: "1.2 (Stable)",
        date: "Feb 2026",
        category: "Modernization"
    },
    {
        id: "A6",
        slug: "a6-adaptive-policy-enforcement",
        title: "Adaptive Policy Enforcement: Decoupling Intent from Implementation",
        abstract: "Addresses the 'Policy Brittleness Paradox'. Introduces the Adaptive Policy Enforcement (APE) framework, a 'Late-Binding' approach that decouples policy intent from concrete implementation.",
        version: "1.0 (Proposal)",
        date: "Jan 2026",
        category: "Security"
    }
];

export default async function PapersIndexPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <header className="py-20 border-b border-[var(--card-border)] bg-[var(--bg-surface-2)]">
                <div className="container">
                    <div className="flex items-center gap-2 text-primary font-mono text-sm uppercase tracking-widest mb-6">
                        <BookOpen size={16} /> Research / Papers
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        Applied Architecture Papers
                    </h1>
                    <p className="text-xl opacity-70 max-w-3xl leading-relaxed">
                        A definitive collection of technical standards and architectural patterns for building sovereign, high-throughput enterprise systems.
                    </p>
                </div>
            </header>

            <main className="py-20">
                <div className="container">
                    <div className="grid gap-8 max-w-5xl">
                        {PAPERS.map((paper) => (
                            <Link
                                key={paper.id}
                                href={`/${locale}/research/papers/${paper.slug}`}
                                className="group block p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-primary select-none group-hover:scale-110 transition-transform duration-500">
                                    {paper.id}
                                </div>

                                <div className="relative z-10">
                                    <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                                        <span className="flex items-center gap-1 text-primary bg-primary/10 px-2 py-1 rounded">
                                            <Hash size={10} /> {paper.id}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Tag size={10} /> {paper.version}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar size={10} /> {paper.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <ShieldCheck size={10} /> Independent Technical Paper
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors pr-12">
                                        {paper.title}
                                    </h2>

                                    <p className="text-muted-foreground mb-6 leading-relaxed max-w-3xl">
                                        {paper.abstract}
                                    </p>

                                    <div className="flex items-center gap-2 text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                                        Read Paper <ChevronRight size={14} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
