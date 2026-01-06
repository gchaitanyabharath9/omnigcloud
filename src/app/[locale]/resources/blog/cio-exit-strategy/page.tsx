import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';
import React from 'react';
import { TrendingUp, Shield, ArrowRight, Code, MessageCircle, BarChart3, Lock, CheckCircle2, Globe, Bookmark, Target, Briefcase } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import EngagementBox from '@/components/EngagementBox';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "The CIO's Guide to Cloud Exit Strategies | OmniGCloud",
        description: "A formal decision-making playbook for evaluating the true cost of vendor lock-in and the ROI of early-stage sovereign architecture.",
        keywords: ["Cloud exit strategy", "CIO cloud strategy", "Vendor lock-in ROI", "Infrastructure portability", "Sovereign cloud investment"],
    };
}

export default async function CIOExitStrategyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <div className="bg-background min-h-screen">
            <Section className="py-24 bg-[#050810]">
                <PageShell>
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-sm mb-8">
                            <Briefcase size={16} /> EXECUTIVE_STRATEGY // v1.2
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
                            The <span className="text-primary text-gradient">CIO's Guide</span> to Cloud Exit Strategies
                        </h1>
                        <div className="flex items-center gap-6 mb-12 border-y border-white/5 py-6">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">ES</div>
                                <span className="text-sm font-bold">Executive Strategy Team</span>
                            </div>
                            <span className="text-xs opacity-50 font-bold">JANUARY 10, 2026</span>
                            <span className="text-xs bg-white/5 px-3 py-1 rounded-full font-bold">18 MIN READ</span>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none leading-relaxed">
                            <p className="text-xl text-muted-foreground mb-10 leading-relaxed font-semibold">
                                "In 2026, the question is no longer 'How do we move to the cloud?' but 'How do we maintain the option to leave?' A cloud strategy without an exit path is a hostage situation, not a partnership."
                            </p>

                            <h2 className="text-3xl font-bold mt-16 mb-8">The Economic Trap of 'Ease of Use'</h2>
                            <p className="mb-6">
                                The most dangerous phrase in cloud procurement is "It just works natively." Every native service consumed (AWS Athena, Azure CosmosDB, Google BigQuery) increases the technical and economic gravity of your data. For Global 2000 organizations, the 'Exit Cost'—the combined cost of refactoring code, egressing data, and retraining staff—now frequently exceeds the total OpEx of the cloud itself over a 5-year period.
                            </p>
                            <p className="mb-6">
                                This guide provides CIOs with a formal decision-making playbook to build <strong>Reversible Infrastructure</strong>.
                            </p>

                            <h2 className="text-3xl font-bold mt-16 mb-8">1. Quantifying the Portability ROI</h2>
                            <p className="mb-6">
                                Investing in cloud-agnostic platform engineering (like the OmniGCloud kernel) has a higher upfront CAPEX than consuming native services. However, the ROI of this investment is realized through <strong>Cost Arbitrage</strong> and <strong>Risk Mitigation</strong>.
                            </p>
                            <div className="glass-panel p-8 my-10 rounded-3xl border-white/5 bg-white/5 flex flex-col md:flex-row gap-8 items-center">
                                <div className="shrink-0 p-4 rounded-2xl bg-primary/20 text-primary">
                                    <Target size={40} />
                                </div>
                                <div>
                                    <h5 className="font-bold text-lg mb-2 text-white">The 60-Minute Mandate</h5>
                                    <p className="text-sm opacity-60">Strategic leaders are now mandating that critical applications must be capable of migrating from Provider A to Provider B within 60 minutes. This is not just for disaster recovery; it is for economic leverage during contract renewals.</p>
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold mt-16 mb-8">2. The Exit Strategy Matrix</h2>
                            <p className="mb-6">
                                Not every application needs a 100% exit path. CIOs must categorize their portfolio into three buckets:
                            </p>
                            <div className="space-y-6 my-10">
                                <div className="border border-white/5 p-6 rounded-2xl">
                                    <h4 className="font-bold text-white mb-2">Tier 1: Sovereign Core</h4>
                                    <p className="text-sm opacity-60">High-consequence apps (Banking, Compliance, Core IP). Must be 100% container-native on an agnostic control plane.</p>
                                </div>
                                <div className="border border-white/5 p-6 rounded-2xl">
                                    <h4 className="font-bold text-white mb-2">Tier 2: Business Logic</h4>
                                    <p className="text-sm opacity-60">Customer-facing apps. Can use native databases but must maintain an automated data sync to a sovereign schema.</p>
                                </div>
                                <div className="border border-white/5 p-6 rounded-2xl">
                                    <h4 className="font-bold text-white mb-2">Tier 3: Auxiliary Services</h4>
                                    <p className="text-sm opacity-60">Email, Analytics, Interior Tools. Can be 100% native as the cost of replacement is low.</p>
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold mt-16 mb-8">3. Navigating Geopolitical Sovereignty</h2>
                            <p className="mb-6">
                                With the rise of national cloud mandates across EMEA and APAC, a CIO's exit strategy is now a legal requirement. If a cloud provider is deemed non-compliant by a national regulator, the exit path must be pre-validated and technically 'warm.'
                            </p>

                            <h2 className="text-3xl font-bold mt-16 mb-12">The CIO Playbook FAQ</h2>
                            <div className="space-y-6">
                                {[
                                    { q: "Doesn't an exit strategy slow down innovation?", a: "Initially, yes. But it accelerates innovation in the long term by ensuring that your developers are learning open standards (Kubernetes, OCP, Terraform) that are portable, rather than proprietary APIs that have a shelf life." },
                                    { q: "How do we talk to the board about the cost of portability?", a: "Frame it as 'Infrastructure Insurance.' The cost of building agnostic architecture is a fraction of the cost of a provider-level outage or a 400% price hike during a contract renewal." },
                                    { q: "Can we use AI to automate the exit strategy?", a: "Yes. In fact, that is the core of OmniGCloud—using Generative Agents to autonomously map and refactor infrastructure intent into clean manifests for the next provider." }
                                ].map((faq, i) => (
                                    <div key={i} className="border-l-2 border-emerald-500/30 pl-6 py-2">
                                        <h5 className="font-bold text-lg mb-2">{faq.q}</h5>
                                        <p className="text-sm opacity-70 italic">"{faq.a}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <EngagementBox
                            titleKey="thoughtLeadership.title"
                            subtitleKey="thoughtLeadership.subtitle"
                        />
                    </div>
                </PageShell>
            </Section>

            {/* RELATED POSTS */}
            <Section className="py-24 border-t border-white/5">
                <PageShell>
                    <div className="max-w-4xl mx-auto">
                        <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-10">Advanced Resources</h4>
                        <div className="grid md:grid-cols-2 gap-8">
                            <Link href={`/${locale}/resources/blog/sovereignty-framework`} className="group">
                                <h5 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">The Multi-Cloud Sovereignty Framework</h5>
                                <p className="text-sm opacity-50 mb-4">The formal mathematical model for evaluating cross-cloud integrity.</p>
                                <span className="text-primary text-xs font-bold flex items-center gap-2">Read Post <ArrowRight size={12} /></span>
                            </Link>
                            <Link href={`/${locale}/resources/blog/devops-best-practices`} className="group">
                                <h5 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Sovereign DevOps Best Practices</h5>
                                <p className="text-sm opacity-50 mb-4">Operational patterns for high-velocity multi-cloud delivery.</p>
                                <span className="text-primary text-xs font-bold flex items-center gap-2">Read Post <ArrowRight size={12} /></span>
                            </Link>
                        </div>
                    </div>
                </PageShell>
            </Section>
        </div>
    );
}
