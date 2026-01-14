import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import React from 'react';
import { Cloud, Zap, Shield, Search, ArrowRight, Code, MessageCircle, BarChart3, Lock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { generateSEOMetadata, SEO_KEYWORDS } from '@/utils/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return generateSEOMetadata({
        title: "Application Modernization Services | Cloud Native Transformation",
        description: "Transform legacy monoliths into scalable microservices using our automated 6R methodology (Rehost, Replatform, Refactor).",
        keywords: [
            ...SEO_KEYWORDS.modernization,
            ...SEO_KEYWORDS.platform,
            "application modernization",
            "legacy modernization",
            "mainframe modernization",
            "cloud native transformation",
            "containerization",
        ],
        canonical: `https://www.omnigcloud.com/${locale}/services/cloud-modernization`,
        ogImage: 'https://www.omnigcloud.com/og-images/services/modernization.png',
        ogType: 'website',
    }, locale);
}

export default async function CloudModernizationPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <div className="bg-background min-h-screen">
            {/* HERO SECTION */}
            <Section className="py-24 bg-gradient-to-b from-[#020617] to-[var(--background)]">
                <PageShell>
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-2 text-primary font-mono text-sm font-black uppercase tracking-widest mb-4">
                            <Cloud size={18} /> Enterprise Cloud Modernization
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter">
                            Move Beyond <br /><span className="text-primary text-gradient">Lift-and-Shift</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl text-lg">
                            Stop migrating technical debt. OmniGCloud's AI-driven modernization factory assesses your legacy application portfolio and systematically refactors it for the multi-cloud, sovereign era.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${locale}/contact`} className="btn-primary py-4 px-10 rounded-full font-bold">Start Portfolio Audit</Link>
                            <Link href={`/${locale}/docs/whitepaper`} className="btn-secondary py-4 px-10 rounded-full font-bold">Modernization Framework</Link>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* THE PROBLEM SECTION */}
            <Section className="py-24 border-y border-white/5 bg-[#050810]/50">
                <PageShell>
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-xs font-black text-red-500 uppercase tracking-[0.2em] mb-4">The Challenge</h2>
                            <h3 className="text-3xl font-black mb-6">The "Migration Trap" in Enterprise IT</h3>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                Studies show that 70% of cloud migrations fail to deliver expected ROI because organizations simply move legacy monoliths to VM-based cloud instances. This creates <strong>Cloud Technical Debt</strong>, higher latency, and redundant operational costs without any of the agility benefits of cloud-native architecture.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Proprietary cloud lock-in via specialized APIs",
                                    "Stretched security perimeters and lack of identity",
                                    "Inefficient resource utilization (Zombie VMs)",
                                    "Manual deployment bottlenecks and ivory-tower ops"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-slate-300 font-bold">
                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="glass-panel p-10 border-red-500/10 relative">
                            <div className="text-5xl font-black text-red-500/20 mb-4">LOST_ROI</div>
                            <p className="italic text-slate-400 mb-6">"We moved 500 applications to AWS, but our hosting bill doubled and our release cycle didn't change." — Fortune 500 CIO</p>
                            <div className="text-xs font-mono text-red-500 opacity-50">ERROR_CODE: INFRA_STAGNATION_v4.2</div>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* OUR APPROACH SECTION */}
            <Section className="py-24">
                <PageShell>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">The OmniSource Modernization Pipeline</h2>
                        <p className="opacity-60 max-w-xl mx-auto">A Three-Phase autonomous framework for systemic transformation.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: "Autonomous Discovery", desc: "Our AI scanners map application dependencies, identifying monolithic anti-patterns in Java, .NET, and legacy C++ codebases automatically.", icon: Search },
                            { step: "02", title: "Intelligent Refactoring", desc: "We utilize generative agents to reverse-engineer legacy binaries into clean, container-ready microservices blueprints and Terraform manifests.", icon: Code },
                            { step: "03", title: "Sovereign Orchestration", desc: "Seamless deployment to RedHat OpenShift or Azure native clusters with 100% policy parity and localized data residency gating.", icon: Zap }
                        ].map((item, i) => (
                            <div key={i} className="glass-panel p-8 relative overflow-hidden group hover:border-primary/50 transition-all">
                                <span className="absolute top-4 right-4 text-4xl font-black text-white/5 group-hover:text-primary/10 transition-colors tracking-tighter">{item.step}</span>
                                <item.icon size={40} className="text-primary mb-6" />
                                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </PageShell>
            </Section>

            {/* DETAILED EDUCATIONAL CONTENT */}
            <Section className="py-24 bg-[var(--bg-surface-2)]">
                <PageShell>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black mb-10">Strategic Modernization Patterns</h2>
                        <div className="prose prose-invert prose-slate max-w-none leading-relaxed">
                            <p className="text-lg mb-8">
                                Modernization is not a one-size-fits-all process. Depending on your business goals and compliance requirements, OmniGCloud employs a variety of industry-validated architectural patterns to ensure a low-risk transition.
                            </p>

                            <h4 className="text-xl font-bold mb-4">Containerization & Re-platforming</h4>
                            <p className="mb-6">
                                For applications that require rapid scaling but have moderate technical debt, we employ 'Intelligent Re-platforming.' This involves containerizing the application without full code refactoring, while injecting a <strong>Service Mesh (Istio/Envoy)</strong> to handle advanced networking, logging, and security sidecars.
                            </p>

                            <h4 className="text-xl font-bold mb-4">Domain-Driven Decomposition</h4>
                            <p className="mb-6">
                                For mission-critical monoliths, we perform a deep deconvolution based on Domain-Driven Design (DDD). We identify 'Bounded Contexts' within the monolith and extract them into independent microservices. This eliminates the 'Spaghetti Dependency' problem, allowing your teams to deploy features 5x faster than before.
                            </p>

                            <h4 className="text-xl font-bold mb-4">Data Residency Gating</h4>
                            <p>
                                In regulated industries, modernization must account for sovereignty. Our platform includes native 'Residency Gating'—mechanisms that ensure your application state and user data remain within specific geographic boundaries (e.g., EU, UAE, or USA) regardless of where the compute nodes are located.
                            </p>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* FAQ SECTION */}
            <Section className="py-24 bg-[var(--bg-card)]">
                <PageShell>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black mb-12 text-center">Modernization FAQ</h2>
                        <div className="space-y-6">
                            {[
                                { q: "How long does a typical portfolio audit take?", a: "Using our autonomous scanners, we can map a 500-app portfolio in less than 48 hours, providing a complete dependency graph and a prioritization heatmap for modernization." },
                                { q: "Can we modernize without re-coding the entire application?", a: "Absolutely. We offer 'Intelligent Re-platforming' where we wrap legacy components in sovereign containers with managed identity proxies, providing 80% of the benefits of microservices with 20% of the effort." },
                                { q: "What is the typical cost saving from modernization?", a: "Enterprises usually realize a 25-40% reduction in underlying VM costs by moving to high-density container orchestration, and up to 60% reduction in operational manual labor." },
                                { q: "Do you support sovereign cloud vendors like RedHat and Oracle?", a: "Yes, we are cloud-agnostic. We specialize in deploying your modernized stack to RedHat OpenShift (OCP), Azure, AWS, and OCI with identical policy mappings." }
                            ].map((faq, i) => (
                                <div key={i} className="glass-panel p-6 border-white/5 bg-background rounded-2xl hover:border-primary/30 transition-colors">
                                    <h4 className="font-bold mb-2 flex items-center gap-3 text-primary">
                                        <MessageCircle size={18} /> {faq.q}
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
                        <Link href={`/${locale}/services/devops`} className="glass-panel p-10 rounded-[2.5rem] group hover:border-primary/50 transition-all bg-gradient-to-br from-transparent to-primary/5">
                            <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">DevOps & Automation</h4>
                            <p className="opacity-60 text-sm mb-6">Integrate modernization with automated platform engineering for continuous, compliant delivery.</p>
                            <div className="text-primary font-bold flex items-center gap-2">View Service <ArrowRight size={14} /></div>
                        </Link>
                        <Link href={`/${locale}/resources/blog/cloud-modernization-guide`} className="glass-panel p-10 rounded-[2.5rem] group hover:border-primary/50 transition-all bg-gradient-to-br from-transparent to-blue-500/5">
                            <h4 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">Modernization Guide</h4>
                            <p className="opacity-60 text-sm mb-6">Read our 2026 blueprint for transitioning from legacy monoliths to sovereign architectures.</p>
                            <div className="text-blue-400 font-bold flex items-center gap-2">Read Guide <ArrowRight size={14} /></div>
                        </Link>
                    </div>

                    <EngagementBox />
                </PageShell>
            </Section>
        </div>
    );
}

import EngagementBox from '@/components/EngagementBox';
