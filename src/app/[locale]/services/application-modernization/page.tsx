"use client";

import React from 'react';
import { Code, Cpu, Zap, Search, ArrowRight, Layers, MessageCircle, Bug, GitBranch, Box } from 'lucide-react';
import Link from 'next/link';

export default function ApplicationModernizationPage() {
    return (
        <div className="bg-background min-h-screen pt-24 pb-20">
            <div className="container">
                {/* HERO SECTION */}
                <div className="max-w-4xl mb-24">
                    <div className="flex items-center gap-2 text-purple-500 font-mono text-sm font-black uppercase tracking-widest mb-4">
                        <Code size={18} /> AI-Native Application Engineering
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter">
                        Refactor <span className="text-purple-500">Monoliths</span> <br />with AI Precision
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                        Transform legacy codebases into cloud-native microservices. OmniGCloud's code-analysis engines identify technical debt and automatically generate modernized service blueprints.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/en/contact" className="btn-primary py-4 px-10" style={{ background: 'var(--primary)', borderColor: 'var(--primary)' }}>Start Code Audit</Link>
                        <Link href="/en/docs/whitepaper" className="btn-secondary py-4 px-10">Application Patterns Guide</Link>
                    </div>
                </div>

                {/* THE PROBLEM */}
                <div className="py-24 border-y border-white/5 bg-purple-900/5 -mx-4 px-4 overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-xs font-black text-purple-500 uppercase tracking-[0.2em] mb-4">The Legacy Burden</h2>
                            <h3 className="text-3xl font-black mb-6">Fossilized Codebases</h3>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                Decades-old Java or .NET applications often contain millions of lines of tightly coupled logic. Manual refactoring is slow, error-prone, and expensive. OmniGCloud uses AI to deconstruct these monoliths into manageable services.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Hardcoded environment dependencies",
                                    "Monolithic database constraints",
                                    "Lack of automated test coverage",
                                    "Complex inter-service coupling"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-slate-300 font-bold">
                                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="glass-panel p-10 border-purple-500/20 bg-purple-500/5">
                            <div className="text-5xl font-black text-purple-500/10 mb-4">TECH_DEBT</div>
                            <p className="italic text-slate-400">"Our legacy CORE-banking system was a black box. OmniGCloud's AI scan mapped 4,000 hidden dependencies in 24 hours." — CTO, Regional Bank</p>
                        </div>
                    </div>
                </div>

                {/* OUR PROCESS */}
                <div className="py-24">
                    <h2 className="text-4xl font-black text-center mb-16">The AIA-Engineering Pipeline</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: "Semantic Analysis", desc: "Understanding legacy code intent using multi-agent LLM analysis.", icon: Bug },
                            { step: "02", title: "Domain Extraction", desc: "Identifying bounded contexts and microservice boundaries automatically.", icon: GitBranch },
                            { step: "03", title: "Contract Generation", desc: "Producing OpenAPI specs and gRPC contracts for the target architecture.", icon: Box }
                        ].map((item, i) => (
                            <div key={i} className="glass-panel p-8 relative overflow-hidden group border-purple-500/10 hover:border-purple-500/30">
                                <span className="absolute top-4 right-4 text-4xl font-black text-purple-500/5 group-hover:text-purple-500/10 transition-colors">{item.step}</span>
                                <item.icon size={40} className="text-purple-500 mb-6" />
                                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ SECTION */}
                <div className="py-24 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black mb-12 text-center">Application FAQ</h2>
                    <div className="space-y-6">
                        {[
                            { q: "Which languages do you support?", a: "We have optimized models for Java (EJB/Spring), .NET Framework (C#), C++, and legacy Python 2.x codebases." },
                            { q: "Do you provide automated code re-writing?", a: "We focus on 'Managed Assistance'—generating the boilerplate and refactoring suggestions that developers can review and commit using our G-Dev tools." },
                            { q: "Is the AI secure for private code?", a: "100%. Our AI engines run within your sovereign environment. Your source code never leaves your perimeter." }
                        ].map((faq, i) => (
                            <div key={i} className="glass-panel p-6 border-white/5">
                                <h4 className="font-bold mb-2 flex items-center gap-2 text-purple-500">
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
