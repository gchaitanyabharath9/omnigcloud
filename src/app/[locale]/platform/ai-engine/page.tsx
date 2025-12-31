"use client";

import React from 'react';
import { Cpu, Brain, Zap, Settings, ShieldAlert, Workflow, BarChart4, MessageCircle, Code, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function AiEnginePage() {
    return (
        <div className="bg-background min-h-screen pt-24 pb-20">
            <div className="container">
                {/* HERO SECTION */}
                <div className="max-w-4xl mb-24">
                    <div className="flex items-center gap-2 text-primary font-mono text-sm font-black uppercase tracking-widest mb-4">
                        <Cpu size={18} /> The AECP Engine (v8.4)
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter">
                        The Neural <br /><span className="text-primary text-gradient">Orchestration Core</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                        AECP (Autonomous Enterprise Cloud Protocol) is the intelligence layer that powers OmniGCloud. It uses multi-agent LLM analysis to interpret legacy system intent and execute precise modernization actions.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/en/contact" className="btn-primary py-4 px-10">Request Engine Demo</Link>
                        <Link href="/en/architecture" className="btn-secondary py-4 px-10">View Logical Model</Link>
                    </div>
                </div>

                {/* HOW IT WORKS */}
                <div className="py-24 border-y border-white/5 bg-slate-900/50 -mx-4 px-4 overflow-hidden">
                    <h2 className="text-4xl font-black text-center mb-16">The AECP Reasoning Loop</h2>
                    <div className="grid lg:grid-cols-4 gap-4">
                        {[
                            { title: "Ingest", icon: Terminal, desc: "Reading source code, config, and live traffic patterns." },
                            { title: "Understand", icon: Brain, desc: "Building a semantic graph of business logic and constraints." },
                            { title: "Plan", icon: Settings, desc: "Generating a target-state architecture and step-by-step migration path." },
                            { title: "Execute", icon: Zap, desc: "Automating the delivery of containerized bundles and IaC." }
                        ].map((step, i) => (
                            <div key={i} className="glass-panel p-8 text-center group hover:border-primary/50 transition-all">
                                <step.icon size={40} className="text-primary mx-auto mb-6 group-hover:scale-110 transition-transform" />
                                <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ARCHITECTURE DETAIL */}
                <div className="py-24">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-black mb-6">Autonomous Code Synthesis</h2>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                Unlike simple transpilers, AECP understands <strong>Design Patterns</strong>. It can detect a "God Object" in an old monolith and suggest ways to decouple it into clean, domain-driven microservices.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { t: "Semantic Graph Extraction", d: "Maps 100% of application interfaces without manual tagging." },
                                    { t: "Policy Correlation", d: "Ensures every generated service inherits corporate security rules." },
                                    { t: "Benchmark Feedback", d: "Continuously learns from deployment performance to optimize future code." }
                                ].map((s, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="bg-primary/10 p-2 rounded-lg shrink-0 h-fit"><Code size={20} className="text-primary" /></div>
                                        <div>
                                            <div className="font-bold">{s.t}</div>
                                            <div className="text-sm text-muted-foreground">{s.d}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="glass-panel p-1 border-primary/20 bg-black/40 overflow-hidden group">
                            <div className="bg-slate-900 p-6 font-mono text-xs text-emerald-400 overflow-x-auto">
                                <div className="text-slate-600 mb-2">// AECP_GEN_BLUEPRINT v8.4.2</div>
                                <div className="mb-1">{"{"}</div>
                                <div className="pl-4">"intent": "modernize_legacy_java_monolith",</div>
                                <div className="pl-4">"strategy": "domain_based_extraction",</div>
                                <div className="pl-4">"targets": ["azure-aks", "redhat-ocp"],</div>
                                <div className="pl-4">"agents": [</div>
                                <div className="pl-8">{"{ \"name\": \"ParserAgent\", \"role\": \"semantic_scan\" }"},</div>
                                <div className="pl-8">{"{ \"name\": \"BlueprintAgent\", \"role\": \"iac_synthesis\" }"}</div>
                                <div className="pl-4">],</div>
                                <div className="pl-4">"governance": "sovereign_v2_strict"</div>
                                <div className="mb-1">{"}"}</div>
                                <div className="mt-4 animate-pulse">Running analysis_agent_3... [OK]</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
