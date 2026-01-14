import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import React from 'react';
import { Settings, Zap, Shield, Search, ArrowRight, Code, MessageCircle, BarChart3, Lock, CheckCircle2, Terminal, Layers, Globe } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateSEOMetadata, SEO_KEYWORDS } from '@/utils/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return generateSEOMetadata({
        title: "Enterprise DevOps & GitOps Services | Automated Pipelines",
        description: "Accelerate your delivery cycle with our sovereign DevOps practices. We implement secure CI/CD, GitOps workflows, and automated infrastructure as code.",
        keywords: [
            ...SEO_KEYWORDS.modernization,
            ...SEO_KEYWORDS.performance,
            "devops services",
            "gitops implementation",
            "ci/cd pipelines",
            "infrastructure as code",
            "site reliability engineering",
        ],
        canonical: `https://www.omnigcloud.com/${locale}/services/devops`,
        ogImage: 'https://www.omnigcloud.com/og-images/services/devops.png',
        ogType: 'website',
    }, locale);
}

export default async function DevOpsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <div className="bg-background min-h-screen">
            {/* HERO SECTION */}
            <Section className="py-24 bg-gradient-to-b from-[#020617] to-[var(--background)]">
                <PageShell>
                    <div className="max-w-4xl">
                        <div className="badge badge-primary-subtle mb-6 flex items-center gap-2">
                            <Terminal size={14} /> CONTINUOUS DELIVERY & AUTOMATION
                        </div>
                        <h1 className="text-6xl font-black mb-8 leading-tight tracking-tight">
                            Engineered for <br /><span className="text-gradient">Velocity & Governance</span>
                        </h1>
                        <p className="text-xl opacity-70 mb-10 leading-relaxed max-w-2xl">
                            Traditional DevOps is fragmented. OmniGCloud's platform-level DevOps services unify CI/CD across AWS, Azure, and OpenShift, providing a single control plane for compliance-first delivery.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href={`/${locale}/contact`} className="btn-primary py-4 px-10 rounded-full font-bold">Accelerate Pipeline</Link>
                            <Link href={`/${locale}/platform`} className="btn-secondary py-4 px-10 rounded-full font-bold">Platform Overview</Link>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* DETAILED CONTENT SECTION 1: THE EVOULTION */}
            <Section className="py-24 border-y border-white/5">
                <PageShell>
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Transitioning to Platform Engineering</h2>
                            <h3 className="text-4xl font-bold mb-8">Why Static DevOps Silos Fail the Modern Enterprise</h3>
                            <div className="space-y-6 text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-6 mb-8 text-lg">
                                "The complexity of modern multi-cloud environments has outpaced the capability of manual scripting. Enterprises need a sovereign, automated pipeline that enforces policy at the code level."
                            </div>
                            <p className="text-lg opacity-80 leading-relaxed mb-6">
                                For years, DevOps was synonymous with Jenkins and manual YAML configuration. In the era of sovereign cloud and AI-driven infrastructure, this approach creates bottlenecks. OmniGCloud introduces <strong>Autonomous DevOps</strong>: an engineering model where infrastructure as code (IaC) is not just written, but continuously validated against global compliance mandates in real-time.
                            </p>
                            <p className="text-lg opacity-80 leading-relaxed">
                                Our engineers deconstruct your delivery bottlenecks. By implementing 100% immutable pipelines, we ensure that every deployment—whether to a regional Azure node or a sovereign OpenShift cluster—is identical, secure, and fully audited.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            {[
                                { title: "Automated Drift Remediation", desc: "Instantly detect and reverse unauthorized manual changes to infrastructure state.", icon: Shield },
                                { title: "Policy-as-Code Gating", desc: "Integrate SOC2 and GDPR checks directly into your CI/CD feedback loop.", icon: Lock },
                                { title: "Cross-Cloud Parity", desc: "One manifest, multiple providers. Eliminate environmental drift across AWS, OCI, and Azure.", icon: Globe }
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

            {/* VALUE PROPOSITIONS */}
            <Section className="py-24 bg-[var(--bg-surface-2)]">
                <PageShell>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Enterprise Value Drivers</h2>
                        <p className="opacity-60 max-w-2xl mx-auto">Measurable improvements in deployment frequency and security posture.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="glass-panel p-10 rounded-3xl bg-background border-white/5">
                            <h3 className="text-5xl font-black text-primary mb-4">85%</h3>
                            <h4 className="text-xl font-bold mb-4">Reduction in Lead Time</h4>
                            <p className="text-sm opacity-60 leading-relaxed">Automate the provisioning of complex multi-cloud environments from days to under 15 minutes using our Sovereign IaC modules.</p>
                        </div>
                        <div className="glass-panel p-10 rounded-3xl bg-background border-primary-glow">
                            <h3 className="text-5xl font-black text-emerald-500 mb-4">Zero</h3>
                            <h4 className="text-xl font-bold mb-4">Unmanaged Drift</h4>
                            <p className="text-sm opacity-60 leading-relaxed">Active state synchronization ensures that production environments never diverge from the git-defined desired state.</p>
                        </div>
                        <div className="glass-panel p-10 rounded-3xl bg-background border-white/5">
                            <h3 className="text-5xl font-black text-blue-500 mb-4">100%</h3>
                            <h4 className="text-xl font-bold mb-4">Audit Transparency</h4>
                            <p className="text-sm opacity-60 leading-relaxed">Every change is recorded in an immutable ledger, providing immediate proof of compliance for regulatory auditors.</p>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* DETAILED CONTENT SECTION 2: THE TECH */}
            <Section className="py-24">
                <PageShell>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black mb-10">Modernizing the CI/CD Stack</h2>
                        <div className="prose prose-invert prose-slate max-w-none">
                            <p className="text-lg mb-6">
                                To achieve true sovereignty, an organization cannot rely on a single vendor's proprietary automation tools. OmniGCloud's DevOps services prioritize open standards. We leverage <strong>Crossplane</strong> for cloud infrastructure management, <strong>ArgoCD</strong> for GitOps-driven deployment, and <strong>Terraform</strong> for baseline resource definition.
                            </p>
                            <h4 className="text-xl font-bold mb-4 mt-10">Declarative Intent vs. Imperative Scripts</h4>
                            <p className="mb-6">
                                We help teams move away from imperative shell scripts that fail silently. By using a declarative intent model, your infrastructure defines <em>what</em> it should be, and our control plane ensures it <em>becomes</em> that across every region. This is critical for maintaining high availability in regulated sectors where a misconfiguration can result in significant legal exposure.
                            </p>
                            <h4 className="text-xl font-bold mb-4 mt-8">Secure Secret Management</h4>
                            <p>
                                A major vulnerability in many DevOps pipelines is secret leakage. We implement localized, sovereign secret vaults based on HashiCorp Vault or cloud-native providers (Azure Key Vault, AWS KMS) with hardware security module (HSM) backing. This ensures that sensitive credentials never traverse border lines unless explicitly permitted by policy.
                            </p>
                        </div>
                    </div>
                </PageShell>
            </Section>

            {/* FAQ SECTION */}
            <Section className="py-24 bg-[var(--bg-card)]">
                <PageShell>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-black mb-12 text-center">DevOps & Platform FAQ</h2>
                        <div className="space-y-4">
                            {[
                                { q: "How do you handle multi-cloud secret synchronization?", a: "We use a bi-directional sync engine that injects secrets into Kubernetes namespaces at runtime, ensuring that no sensitive data is stored in version control while maintaining parity across regions." },
                                { q: "Do you support RedHat OpenShift in your DevOps workflows?", a: "Yes, we specialize in OpenShift fleet management. Our pipelines are designed to handle OCP-specific artifacts like BuildConfigs and DeploymentConfigs natively." },
                                { q: "Can we integrate existing legacy Jenkins pipelines?", a: "Absolutely. We offer a 'Wrap-and-Replace' strategy where we encapsulate legacy Jenkins jobs into a modern GitOps-driven control plane, allowing for a phased transition to full automation." },
                                { q: "What is the difference between DevOps and Platform Engineering in your model?", a: "DevOps is the methodology; Platform Engineering is the product. We build 'Internal Developer Platforms' (IDPs) that allow your devs to self-serve infrastructure while ensuring your Ops team maintains control over the guardrails." }
                            ].map((faq, i) => (
                                <div key={i} className="glass-panel p-6 rounded-2xl border-white/5 hover:border-primary/20 transition-colors">
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

            {/* INTERNAL LINKS / FOOTER CROSS-REF */}
            <Section className="py-24 border-t border-white/5">
                <PageShell>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 glass-panel p-12 rounded-[3rem] bg-gradient-to-r from-background to-primary/5 mb-16">
                        <div className="max-w-md">
                            <h4 className="text-2xl font-bold mb-4">Explore Complementary Services</h4>
                            <p className="opacity-60 text-sm mb-6">Unify your infrastructure modernization with our AI-driven assessment and cost optimization platforms.</p>
                            <div className="flex flex-wrap gap-4">
                                <Link href={`/${locale}/services/cloud-modernization`} className="text-primary font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
                                    Cloud Modernization <ArrowRight size={14} />
                                </Link>
                                <Link href={`/${locale}/services/cloud-cost-optimization`} className="text-primary font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
                                    FinOps Intelligence <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                        <div className="bg-primary p-6 rounded-2xl text-white font-black text-xl">
                            READY_TO_AUTO_GATE?
                        </div>
                    </div>

                    <EngagementBox />
                </PageShell>
            </Section>
        </div>
    );
}

import EngagementBox from '@/components/EngagementBox';
