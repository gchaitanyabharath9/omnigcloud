"use client";

import React from 'react';
import { Activity, BarChart3, Search, Shield, Zap, Eye, Lock, Globe, MessageCircle, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function ObservabilityPage() {
    return (
        <div className="bg-background min-h-screen pt-24 pb-20">
            <div className="container">
                {/* HERO SECTION */}
                <div className="max-w-4xl mb-24">
                    <div className="flex items-center gap-2 text-primary font-mono text-sm font-black uppercase tracking-widest mb-4">
                        <Activity size={18} /> Sovereign Observability
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter">
                        See Everything, <br /><span className="text-primary text-gradient">Audit Everywhere</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                        Modernization requires radical visibility. OmniGCloud's observability stack provides a unified view of health, security, and cost across all your sovereign cloud clusters.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/en/contact" className="btn-primary py-4 px-10">Request Metrics Access</Link>
                        <Link href="/en/docs/whitepaper" className="btn-secondary py-4 px-10">Observability Spec</Link>
                    </div>
                </div>

                {/* THE MESH VIEW */}
                <div className="py-24 border-y border-white/5 bg-[#050810]/50 -mx-4 px-4 overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="glass-panel p-8 border-primary/20 bg-slate-900/40 relative">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="text-sm font-black uppercase tracking-widest opacity-50">Global Mesh Latency</div>
                                    <div className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-black rounded-lg">LIVE_STREAM</div>
                                </div>
                                <div className="space-y-6">
                                    {[
                                        { l: "Azure East US ➜ OCP On-Prem", v: "12ms", h: "70%" },
                                        { l: "AWS West 2 ➜ Azure Singapore", v: "84ms", h: "40%" },
                                        { l: "Privacy Node A ➜ Sovereign Mesh", v: "4ms", h: "90%" }
                                    ].map((m, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-xs font-mono mb-2">
                                                <span>{m.l}</span>
                                                <span className="text-primary font-bold">{m.v}</span>
                                            </div>
                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: m.h }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">Real-Time Insight</h2>
                            <h3 className="text-3xl font-black mb-6">Zero-PII Metrics</h3>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                Most observability tools leak sensitive data. OmniGCloud implements <strong>PII-Stripping at Source</strong>, ensuring that metrics and logs can be centralized without violating sovereignty laws or internal compliance policies.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { t: "Latency Graphs", i: Share2 },
                                    { t: "Security Audits", i: Shield },
                                    { t: "Cost Analytics", i: BarChart3 },
                                    { t: "Error Tracking", i: Activity }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-xl">
                                        <item.i size={18} className="text-primary" />
                                        <span className="text-sm font-bold">{item.t}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ SECTION */}
                <div className="py-24 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black mb-12 text-center">Observability FAQ</h2>
                    <div className="space-y-6">
                        {[
                            { q: "Do you integrate with Datadog or Splunk?", a: "Yes. We act as a sovereign aggregator. We can forward anonymized logs and metrics to any enterprise monitoring tool while keeping the raw sensitive data isolated." },
                            { q: "What is the performance overhead?", a: "The Sovereign Agent has a sub-5ms overhead and consumes less than 1% of CPU capacity per node." },
                            { q: "Is the data encrypted in transit?", a: "All observability data is encrypted using FIPS 140-3 compliant protocols between our nodes and the unified dashboard." }
                        ].map((faq, i) => (
                            <div key={i} className="glass-panel p-6 border-white/5">
                                <h4 className="font-bold mb-2 flex items-center gap-2 text-primary">
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
