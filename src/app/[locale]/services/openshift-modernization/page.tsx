"use client";

import React from 'react';
import { Layers, Shield, Zap, Search, ArrowRight, Code, MessageCircle, Server, BarChart2 } from 'lucide-react';
import Link from 'next/link';

export default function OpenShiftModernizationPage() {
    return (
        <div className="bg-background min-h-screen pt-24 pb-20">
            <div className="container">
                {/* HERO SECTION */}
                <div className="max-w-4xl mb-24">
                    <div className="flex items-center gap-2 text-red-500 font-mono text-sm font-black uppercase tracking-widest mb-4">
                        <Layers size={18} /> Enterprise RedHat OpenShift Strategy
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter">
                        Scale <span className="text-red-500">OCP</span> <br />at Enterprise Velocity
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                        Maximize your investment in RedHat OpenShift. OmniGCloud provides the automation layers needed to manage thousands of OCP nodes across hybrid and sovereign cloud environments.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/en/contact" className="btn-primary py-4 px-10" style={{ background: '#e00', borderColor: '#e00' }}>Schedule OCP Audit</Link>
                        <Link href="/en/docs/whitepaper" className="btn-secondary py-4 px-10">View OCP Reference Model</Link>
                    </div>
                </div>

                {/* THE CHALLENGE */}
                <div className="py-24 border-y border-white/5 bg-red-900/5 -mx-4 px-4 overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-xs font-black text-red-500 uppercase tracking-[0.2em] mb-4">The Complexity</h2>
                            <h3 className="text-3xl font-black mb-6">OpenShift Sprawl</h3>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                Managing individual OCP clusters is easy. Managing 50+ clusters across global regions with fragmented security policies is where enterprise agility dies. Manual config drift and upgrade cycles create massive operational risks.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Inconsistent security perimeters",
                                    "Complex cross-cluster networking",
                                    "Struggling with multi-region state",
                                    "Resource-heavy Day-2 operations"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-slate-300 font-bold">
                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="glass-panel p-10 border-red-500/20 bg-red-500/5">
                            <div className="text-5xl font-black text-red-500/10 mb-4">DAY_2_OPS</div>
                            <p className="italic text-slate-400">"Our challenge wasn't installing OpenShift, it was keeping up with the security patches across 20 global clusters without downtime." — Lead Platform Engineer</p>
                        </div>
                    </div>
                </div>

                {/* OUR APPROACH */}
                <div className="py-24">
                    <h2 className="text-4xl font-black text-center mb-16">The OCP-Fleet Management Pattern</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: "GitOps Foundation", desc: "Automating cluster lifecycle using ArgoCD and sovereign config repositories.", icon: Code },
                            { step: "02", title: "Unified Service Mesh", desc: "Consolidating identity and traffic management across disparate OCP regions.", icon: Zap },
                            { step: "03", title: "Autonomous Observability", desc: "Deep metrics integration with zero-PII extraction for sovereign audit trails.", icon: BarChart2 }
                        ].map((item, i) => (
                            <div key={i} className="glass-panel p-8 relative overflow-hidden group border-red-500/10 hover:border-red-500/30">
                                <span className="absolute top-4 right-4 text-4xl font-black text-red-500/5 group-hover:text-red-500/10 transition-colors">{item.step}</span>
                                <item.icon size={40} className="text-red-500 mb-6" />
                                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ SECTION */}
                <div className="py-24 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black mb-12 text-center">OpenShift FAQ</h2>
                    <div className="space-y-6">
                        {[
                            { q: "Do you support ARO (Azure RedHat OpenShift)?", a: "Yes. We specialize in ARO and ROSA (OpenShift on AWS) architectures, providing a unified governance layer above the cloud provider manages." },
                            { q: "How do you handle multi-cluster networking?", a: "We implement advanced Submariner or Istio-based multi-cluster gateways to ensure secure, low-latency cross-region connectivity." },
                            { q: "Can we automate cluster upgrades?", a: "OmniGCloud enables zero-downtime, blue-green cluster upgrade patterns using automated state verification." }
                        ].map((faq, i) => (
                            <div key={i} className="glass-panel p-6 border-white/5">
                                <h4 className="font-bold mb-2 flex items-center gap-2 text-red-500">
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
