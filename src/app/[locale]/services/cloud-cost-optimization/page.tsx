"use client";

import React from 'react';
import { BarChart3, TrendingDown, Zap, Search, ArrowRight, Shield, MessageCircle, DollarSign, PieChart, Activity } from 'lucide-react';
import Link from 'next/link';

export default function CloudCostOptimizationPage() {
    return (
        <div className="bg-background min-h-screen pt-24 pb-20">
            <div className="container">
                {/* HERO SECTION */}
                <div className="max-w-4xl mb-24">
                    <div className="flex items-center gap-2 text-emerald-500 font-mono text-sm font-black uppercase tracking-widest mb-4">
                        <TrendingDown size={18} /> Enterprise FinOps Intelligence
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter">
                        Recover <span className="text-emerald-500">Unused</span> <br />Cloud Capital
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                        Stop overpaying for idle resources. OmniGCloud's autonomous FinOps engine rightsizes your multi-cloud infrastructure in real-time, delivering immediate ROI through policy-driven optimization.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/en/contact" className="btn-primary py-4 px-10" style={{ background: '#10b981', borderColor: '#10b981' }}>Start Cost Audit</Link>
                        <Link href="/en/docs/whitepaper" className="btn-secondary py-4 px-10">FinOps Strategy Guide</Link>
                    </div>
                </div>

                {/* THE PROBLEM */}
                <div className="py-24 border-y border-white/5 bg-emerald-900/5 -mx-4 px-4 overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-xs font-black text-emerald-500 uppercase tracking-[0.2em] mb-4">The FinOps Gap</h2>
                            <h3 className="text-3xl font-black mb-6">Invisible Waste</h3>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                Most enterprises waste 30% of their cloud budget on 'zombie' instances, oversized clusters, and unoptimized storage. Traditional cost tools only show you the bill—OmniGCloud automates the fix.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Oversized Kubernetes clusters",
                                    "Unmanaged data egress charges",
                                    "Idle development environments",
                                    "Unused reserved instance capacity"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-slate-300 font-bold">
                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="glass-panel p-10 border-emerald-500/20 bg-emerald-500/5">
                            <div className="text-5xl font-black text-emerald-500/10 mb-4">ROI_LEAK</div>
                            <p className="italic text-slate-400">"We reduced our monthly Azure bill by $85k in the first 30 days of deploying OmniGCloud optimization policies." — VP Infrastructure</p>
                        </div>
                    </div>
                </div>

                {/* OUR PROCESS */}
                <div className="py-24">
                    <h2 className="text-4xl font-black text-center mb-16">The Autonomous FinOps Cycle</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: "Real-Time Discovery", desc: "Granular visibility into resource utilization across every cloud provider.", icon: Search },
                            { step: "02", title: "Autonomous Rightsizing", desc: "Automated scaling and instance modification based on workload heuristics.", icon: Zap },
                            { step: "03", title: "Continuous Governance", desc: "Setting budget guardrails that prevent cost-drift through policy enforcement.", icon: Shield }
                        ].map((item, i) => (
                            <div key={i} className="glass-panel p-8 relative overflow-hidden group border-emerald-500/10 hover:border-emerald-500/30">
                                <span className="absolute top-4 right-4 text-4xl font-black text-emerald-500/5 group-hover:text-emerald-500/10 transition-colors">{item.step}</span>
                                <item.icon size={40} className="text-emerald-500 mb-6" />
                                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ SECTION */}
                <div className="py-24 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black mb-12 text-center">Cost Optimization FAQ</h2>
                    <div className="space-y-6">
                        {[
                            { q: "How is this different from CloudHealth or AWS Cost Explorer?", a: "Most tools are reactive dashboards. OmniGCloud is an active control plane that can automatically resize infrastructure and move workloads based on cost-efficiency policies." },
                            { q: "Does it support Multi-Cloud billing consolidation?", a: "Yes. We provide a single pane of glass for FinOps across AWS, Azure, GCP, and private cloud costs." },
                            { q: "Will it disrupt production workloads?", a: "No. Our algorithms prioritize availability. Rightsizing actions are only taken during maintenance windows or when risk profiles are met." }
                        ].map((faq, i) => (
                            <div key={i} className="glass-panel p-6 border-white/5">
                                <h4 className="font-bold mb-2 flex items-center gap-2 text-emerald-500">
                                    <MessageCircle size={16} /> {faq.q}
                                </h4>
                                <p className="text-muted-foreground text-sm leading-relaxed pl-6">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
