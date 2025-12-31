"use client";

import React from 'react';
import { Cloud, Zap, Shield, Search, ArrowRight, Code, MessageCircle, BarChart3, Lock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CloudModernizationPage() {
    return (
        <div className="bg-background min-h-screen pt-24 pb-20">
            <div className="container">
                {/* HERO SECTION */}
                <div className="max-w-4xl mb-24">
                    <div className="flex items-center gap-2 text-primary font-mono text-sm font-black uppercase tracking-widest mb-4">
                        <Cloud size={18} /> Enterprise Cloud Modernization
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter">
                        Move Beyond <br /><span className="text-primary text-gradient">Lift-and-Shift</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                        Stop migrating technical debt. OmniGCloud's AI-driven modernization factory assesses your legacy application portfolio and systematically refactors it for the multi-cloud era.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/en/contact" className="btn-primary py-4 px-10">Start Portoflio Audit</Link>
                        <Link href="/en/docs/whitepaper" className="btn-secondary py-4 px-10">View Modernization Framework</Link>
                    </div>
                </div>

                {/* THE PROBLEM */}
                <div className="py-24 border-y border-white/5 bg-[#050810]/50 -mx-4 px-4 overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-xs font-black text-red-500 uppercase tracking-[0.2em] mb-4">The Challenge</h2>
                            <h3 className="text-3xl font-black mb-6">The "Migration Trap"</h3>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                70% of cloud migrations fail to deliver expected ROI because organizations simply move legacy monoliths to VM-based cloud instances. This creates <strong>Cloud Technical Debt</strong>, higher latency, and redundant operational costs.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Proprietary cloud lock-in",
                                    "Stretched security perimeters",
                                    "Inefficient resource utilization",
                                    "Manual deployment bottlenecks"
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
                            <p className="italic text-slate-400">"We moved 500 applications to AWS, but our hosting bill doubled and our release cycle didn't change." — Fortune 500 CIO</p>
                        </div>
                    </div>
                </div>

                {/* OUR APPROACH */}
                <div className="py-24">
                    <h2 className="text-4xl font-black text-center mb-16">The AIA-Modernization Pipeline</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: "Autonomous Discovery", desc: "AI scanners map dependencies and identify monolith anti-patterns in Java, .NET, and C++.", icon: Search },
                            { step: "02", title: "Intelligent Refactoring", desc: "Automated generation of microservices blueprints and container specifications.", icon: Code },
                            { step: "03", title: "Sovereign Orchestration", desc: "Deployment to RedHat OCP or Azure native clusters with 100% policy parity.", icon: Zap }
                        ].map((item, i) => (
                            <div key={i} className="glass-panel p-8 relative overflow-hidden group">
                                <span className="absolute top-4 right-4 text-4xl font-black text-white/5 group-hover:text-primary/10 transition-colors">{item.step}</span>
                                <item.icon size={40} className="text-primary mb-6" />
                                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TOOLS & TECH */}
                <div className="py-20 border-t border-white/5">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">Core Stack</h2>
                        <h3 className="text-3xl font-bold">Unified Tech Integration</h3>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        {["RedHat OpenShift", "Azure Kubernetes", "AWS EKS", "Terraform", "ArgoCD", "Crossplane", "Prometheus"].map((tech, i) => (
                            <div key={i} className="px-6 py-3 bg-white/5 border border-white/5 rounded-full font-bold text-slate-400">
                                {tech}
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ SECTION */}
                <div className="py-24 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black mb-12 text-center">Modernization FAQ</h2>
                    <div className="space-y-6">
                        {[
                            { q: "How long does a typical portfolio audit take?", a: "Using our autonomous scanners, we can map a 500-app portfolio in less than 48 hours, providing a complete dependency graph and modernization roadmap." },
                            { q: "Can we modernize without re-coding?", a: "We offer 'Intelligent Re-platforming' which containerizes apps with minimal changes using our Sovereign Mesh to handle sidecar capabilities like mTLS and logging." },
                            { q: "What is the typical cost saving?", a: "Enterprises usually realize a 25-40% reduction in underlying VM costs by moving to high-density container orchestration." }
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
