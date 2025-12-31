"use client";

import React from 'react';
import { Cpu, Brain, Zap, Search, ArrowRight, Share2, MessageCircle, Bot, Network, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AiCloudPlatformPage() {
    return (
        <div className="bg-background min-h-screen pt-24 pb-20">
            <div className="container">
                {/* HERO SECTION */}
                <div className="max-w-4xl mb-24">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm font-black uppercase tracking-widest mb-4">
                        <Cpu size={18} /> High-Density AI Infrastructure
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter">
                        The Infrastructure <br />for <span className="text-cyan-400">Agentic AI</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                        Deploy, scale, and govern large-scale AI workloads across heterogeneous GPU clusters. OmniGCloud provides the sovereign control plane required for secure enterprise generative AI.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/en/contact" className="btn-primary py-4 px-10" style={{ background: 'var(--primary)', borderColor: 'var(--primary)' }}>Request GPU Benchmarks</Link>
                        <Link href="/en/docs/whitepaper" className="btn-secondary py-4 px-10">AI Deployment Guide</Link>
                    </div>
                </div>

                {/* THE CHALLENGE */}
                <div className="py-24 border-y border-white/5 bg-cyan-900/5 -mx-4 px-4 overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-xs font-black text-cyan-400 uppercase tracking-[0.2em] mb-4">The AI Bottleneck</h2>
                            <h3 className="text-3xl font-black mb-6">Fragmented Compute</h3>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                AI teams are blocked by lack of GPU availability and high egress costs for large model training. OmniGCloud unifies distributed GPU capacity into a single, sovereign compute fabric.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "GPU scarcity and provisioning delays",
                                    "Insecure data pipelines for training",
                                    "Lack of agentic governance controls",
                                    "Expensive GPU-to-CPU latency"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-slate-300 font-bold">
                                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="glass-panel p-10 border-cyan-400/20 bg-cyan-400/5">
                            <div className="text-5xl font-black text-cyan-400/10 mb-4">GPU_MESH</div>
                            <p className="italic text-slate-400">"OmniGCloud allowed us to use GPUs across three different providers as if they were in one data center, reducing training time by 60%." — Head of AI Engineering</p>
                        </div>
                    </div>
                </div>

                {/* OUR PROCESS */}
                <div className="py-24">
                    <h2 className="text-4xl font-black text-center mb-16">The AI-Native Control Plane</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: "Compute Orchestration", desc: "Scheduling training and inference pods on the most efficient available GPU nodes.", icon: Network },
                            { step: "02", title: "Sovereign Pipelines", desc: "Ensuring PII-safe data ingestion and model weights isolation.", icon: Brain },
                            { step: "03", title: "Agentic Monitoring", desc: "Tracking agent chain-of-thought and infrastructure impact in real-time.", icon: Bot }
                        ].map((item, i) => (
                            <div key={i} className="glass-panel p-8 relative overflow-hidden group border-cyan-400/10 hover:border-cyan-400/30">
                                <span className="absolute top-4 right-4 text-4xl font-black text-cyan-400/5 group-hover:text-cyan-400/10 transition-colors">{item.step}</span>
                                <item.icon size={40} className="text-cyan-400 mb-6" />
                                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ SECTION */}
                <div className="py-24 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black mb-12 text-center">AI Infrastructure FAQ</h2>
                    <div className="space-y-6">
                        {[
                            { q: "Which GPUs do you support?", a: "We support NVIDIA H100, A100, and T4 instances across AWS, Azure, GCP, and custom Bare-Metal providers." },
                            { q: "Can we run LLMs on-premise?", a: "Yes. Our platform is designed for locally-hosted deployments where data cannot leave the corporate firewall." },
                            { q: "How do you handle AI governance?", a: "We provide 'Policy Overlays' that monitor LLM output and resource usage, enforcing constraints at the infrastructure level." }
                        ].map((faq, i) => (
                            <div key={i} className="glass-panel p-6 border-white/5">
                                <h4 className="font-bold mb-2 flex items-center gap-2 text-cyan-400">
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
