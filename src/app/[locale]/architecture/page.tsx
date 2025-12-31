"use client";

import React from 'react';
import { Layers, Shield, Cpu, Zap, Share2, Server, Database, Lock, Search, Code, Workflow, BarChart4 } from 'lucide-react';

const layers = [
    {
        title: "Autonomous Discovery Layer",
        icon: Search,
        desc: "Ingests legacy application signatures, network topology, and security policies using AI scan engines. Maps 100% of dependencies without agent installation.",
        tech: ["Legacy Scan Engine", "Dependency Mapper", "Policy Ingestor"]
    },
    {
        title: "Policy & Governance Plane",
        icon: Shield,
        desc: "A centralized control plane where sovereign compliance rules (GDPR, HIPAA, SOC2) are defined once and enforced globally across all cloud regions.",
        tech: ["Open Policy Agent", "Sovereign Rule Engine", "Compliance Guard"]
    },
    {
        title: "AI Modernization Engine",
        icon: Cpu,
        desc: "The AECP core analyze legacy code (Java, .NET) and automatically generates modernization blueprints for RedHat OCP or Azure native services.",
        tech: ["LLM Blueprinting", "Refactor AI", "IaC Generator"]
    },
    {
        title: "Multi-Cloud Execution Mesh",
        icon: Share2,
        desc: "Orchestrates deployment and state synchronization across AWS, Azure, GCP, and private cloud nodes. Ensures 100% vendor agnostic runtime.",
        tech: ["Cross-Cloud Mesh", "State Synchronizer", "Edge Broker"]
    }
];

export default function ArchitecturePage() {
    return (
        <div className="bg-background min-h-screen pt-24">
            <div className="container">
                {/* Header Section */}
                <div className="max-w-4xl mb-20">
                    <div className="flex items-center gap-2 text-primary font-mono text-sm font-black uppercase tracking-widest mb-4">
                        <Layers size={18} /> Architecture & System Design
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter">
                        The Sovereign <br /><span className="text-primary text-gradient">G-Framework</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        OmniGCloud's architecture is built on the principle of <strong>Absolute Abstraction</strong>. Our framework disconnects policy from infrastructure, allowing enterprises to move workloads across any cloud provider while maintaining 100% governance continuity.
                    </p>
                </div>

                {/* System Model Diagram Placeholder */}
                <div className="glass-panel p-1 border-primary/20 mb-24 aspect-[16/9] lg:aspect-[21/9] flex items-center justify-center relative overflow-hidden bg-slate-900/50">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]"></div>
                    <div className="relative text-center flex flex-col items-center gap-6">
                        <Share2 size={80} className="text-primary animate-pulse" />
                        <div>
                            <h3 className="text-2xl font-bold mb-2">OmniGCloud Unified Control Plane</h3>
                            <p className="text-muted-foreground">Reference Model v8.4.2 // Autonomous Orchestration</p>
                        </div>
                        <div className="flex gap-4">
                            <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-mono">SOVEREIGN_MESH</span>
                            <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-mono">AI_BRAIN_V2</span>
                            <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-mono">POLICY_SYNC</span>
                        </div>
                    </div>
                </div>

                {/* The Layers */}
                <div className="grid lg:grid-cols-2 gap-8 mb-24">
                    {layers.map((layer, i) => (
                        <div key={i} className="glass-panel p-10 border-white/5 hover:border-primary/30 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <layer.icon size={26} className="text-primary" />
                            </div>
                            <h2 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">{layer.title}</h2>
                            <p className="text-muted-foreground leading-relaxed mb-8">{layer.desc}</p>
                            <div className="flex flex-wrap gap-2">
                                {layer.tech.map((t, j) => (
                                    <span key={j} className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-md text-slate-400 group-hover:text-slate-200">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Security Section */}
                <div className="py-24 border-t border-white/5">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-2 text-emerald-500 font-mono text-sm font-black uppercase tracking-widest mb-4">
                                <Lock size={16} /> Security-Integrated Design
                            </div>
                            <h2 className="text-4xl font-black mb-6">Zero-Trust Modernization</h2>
                            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                                Security is not a layer on top of OmniGCloud—it is the material the framework is built from. We implement <strong>Adversary-Aware Pathing</strong> and <strong>Cryptographic Isolation</strong> for every service modernizing on our platform.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { t: "FIPS 140-3 Compliance", d: "End-to-end encryption for metadata synchronization." },
                                    { t: "Identity Federation", d: "Deep integration with Azure AD, Okta, and sovereign IDP." },
                                    { t: "Isolation Protocols", d: "Logical and physical separation for multi-tenant high-security grids." }
                                ].map((s, i) => (
                                    <div key={i} className="flex gap-4">
                                        <CheckCircle className="text-emerald-500 shrink-0" size={20} />
                                        <div>
                                            <div className="font-bold">{s.t}</div>
                                            <div className="text-sm text-muted-foreground">{s.d}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-slate-900/80 border border-white/5 rounded-3xl p-8 relative overflow-hidden aspect-square flex items-center justify-center">
                            <Shield size={160} className="text-emerald-500/20 absolute" />
                            <div className="relative text-center">
                                <div className="text-5xl font-black text-emerald-500 mb-2">99.99%</div>
                                <div className="text-xs font-mono text-emerald-400">POLICY_ENFORCEMENT_ACCURACY</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Architecture CTA */}
                <div className="py-24 text-center">
                    <h2 className="text-3xl font-black mb-8 opacity-50">Peer-Reviewed architecture frameworks for regulated enterprise.</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="/en/docs/whitepaper" className="btn-primary py-4 px-10">Read Whitepaper</a>
                        <a href="/en/research" className="btn-secondary py-4 px-10">Technical Library</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

const CheckCircle = ({ className, size }: { className?: string, size?: number }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || 24}
        height={size || 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M20 6 9 17l-5-5" />
    </svg>
);
