"use client";

import React from 'react';
import { Award, BookOpen, Briefcase, GraduationCap, Link as LinkIcon, Linkedin, Mail, Twitter, ChevronRight, Verified, CheckCircle, Globe } from 'lucide-react';
import Link from 'next/link';

export default function FounderPage() {
    return (
        <div className="bg-background min-h-screen">
            {/* HERO SECTION */}
            <section className="relative py-24 border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/5 to-transparent pointer-events-none"></div>
                <div className="container relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/3">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative bg-[#0a0f1d] border border-white/10 rounded-2xl overflow-hidden aspect-[4/5]">
                                    {/* Profile Image Space */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-[#1e293b]">
                                        <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                                            <Verified size={40} className="text-blue-500" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-white mb-2">Chaitanya Bharath Gopu</p>
                                            <p className="text-xs text-blue-400 font-mono">DISTINGUISHED PLATFORM ARCHITECT</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-center gap-4">
                                <a href="#" className="p-3 bg-white/5 hover:bg-blue-500/10 rounded-full transition-colors"><Linkedin size={20} /></a>
                                <a href="#" className="p-3 bg-white/5 hover:bg-blue-500/10 rounded-full transition-colors"><Twitter size={20} /></a>
                                <a href="mailto:architects@omnigcloud.com" className="p-3 bg-white/5 hover:bg-blue-500/10 rounded-full transition-colors"><Mail size={20} /></a>
                            </div>
                        </div>

                        <div className="lg:w-2/3">
                            <div className="flex items-center gap-2 text-blue-500 font-mono text-sm font-bold tracking-widest uppercase mb-4">
                                <Award size={16} /> Technical Authority & Visionary
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight">Chaitanya Bharath <span className="text-blue-500">Gopu</span></h1>
                            <p className="text-xl text-slate-400 leading-relaxed mb-8 max-w-3xl">
                                With over 19+ years of distinguished experience in enterprise cloud architecture, Chaitanya is the lead visionary behind the OmniGCloud G-Framework. He specializes in large-scale modernization for regulated industries, focusing on autonomous multi-cloud orchestration and sovereign data residency.
                            </p>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { l: "Years Experience", v: "19+" },
                                    { l: "Global Certs", v: "45+" },
                                    { l: "Architecture Papers", v: "12" },
                                    { l: "System Patents", v: "2 Pending" }
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-xl">
                                        <div className="text-3xl font-black text-white">{stat.v}</div>
                                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">{stat.l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* EXPERIENCE & CONTRIBUTIONS */}
            <section className="py-24 bg-[#050810]">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Expertise */}
                        <div>
                            <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                                <Briefcase className="text-blue-500" /> Core Contributions
                            </h2>
                            <div className="space-y-6">
                                {[
                                    { t: "G-Framework Architecture", d: "Inventor of the autonomous synchronization framework for cloud-agnostic modernization." },
                                    { t: "Sovereign Modernization Engine", d: "Engineered high-side/low-side isolation protocols for sensitive government defense workloads." },
                                    { t: "OpenShift-First Strategy", d: "Designed reference architectures for RedHat OCP at scale for global Tier-1 banking entities." },
                                    { t: "AI Migration Planning", d: "Developer of machine learning models for legacy monolith assessment and automated refactoring." }
                                ].map((item, i) => (
                                    <div key={i} className="relative pl-8 border-l border-blue-500/30">
                                        <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] bg-blue-500 rounded-full"></div>
                                        <h3 className="font-bold text-lg mb-1">{item.t}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">{item.d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Publications */}
                        <div>
                            <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                                <BookOpen className="text-blue-500" /> Research & Publications
                            </h2>
                            <div className="space-y-4">
                                {[
                                    "AECP-2025: Autonomous Enterprise Cloud Protocol v8",
                                    "Sovereign Multi-Cloud: Resilience in Fragmented Geographies",
                                    "Legacy Modernization: From Monolith to OCP Service Mesh",
                                    "Securing Multi-Cloud Egress in Regulated Finance Environments"
                                ].map((pub, i) => (
                                    <div key={i} className="bg-white/5 p-5 rounded-xl border border-white/5 flex items-center justify-between group hover:border-blue-500/30 transition-colors">
                                        <span className="font-bold text-slate-300 group-hover:text-white transition-colors">{pub}</span>
                                        <ChevronRight size={18} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </div>
                            <Link href="/en/research" className="mt-8 inline-flex items-center gap-2 text-blue-500 font-bold hover:underline">
                                View Research Repository <ChevronRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ARCHITECT */}
            <section className="py-24">
                <div className="container text-center">
                    <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-blue-800 p-1 rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20">
                        <div className="bg-[#0a0f1d] p-12 lg:p-20 rounded-[22px]">
                            <h2 className="text-4xl lg:text-5xl font-black mb-8">Work with a <span className="text-blue-500">Master Architect</span></h2>
                            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                                Chaitanya leads a select team of elite architects on mission-critical system migrations. We are currently accepting architecture audit requests for 2026.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link href="/en/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl transition-all hove:scale-105">
                                    Book Architecture Audit
                                </Link>
                                <Link href="/en/docs/whitepaper" className="bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-10 rounded-xl transition-all border border-white/10">
                                    Read Governance Framework
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
