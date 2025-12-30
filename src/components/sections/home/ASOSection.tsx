"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { Shield, Zap, Globe, ArrowRight, Activity, Server, Lock } from 'lucide-react';
import Link from 'next/link';

// CSS-only Architecture Diagram Component
const SystemPulse = () => {
    return (
        <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center select-none pointer-events-none">
            {/* Background Glows */}
            <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full" />

            {/* Outer Ring (Orbit 3) */}
            <div className="absolute w-[90%] h-[90%] border border-slate-800/60 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[90%] h-[90%] rounded-full animate-[spin_60s_linear_infinite_reverse]">
                {/* Satellite Nodes */}
                <div className="absolute top-1/2 -right-3 w-6 h-6 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center transform -translate-y-1/2 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <Globe className="w-3 h-3 text-blue-400" />
                </div>
                <div className="absolute top-0 left-1/2 -mt-3 w-6 h-6 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center transform -translate-x-1/2">
                    <Zap className="w-3 h-3 text-amber-400" />
                </div>
            </div>

            {/* Middle Ring (Orbit 2) - Dashed */}
            <div className="absolute w-[65%] h-[65%] border border-dashed border-slate-700/50 rounded-full animate-[spin_40s_linear_infinite]" />

            {/* Inner Ring (Orbit 1) */}
            <div className="absolute w-[40%] h-[40%] border border-blue-500/30 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-full h-full bg-blue-500/5 rounded-full" />
            </div>

            {/* Core */}
            <div className="relative z-10 w-32 h-32 bg-slate-950 border border-blue-500/50 rounded-full flex flex-col items-center justify-center shadow-2xl shadow-blue-500/20 backdrop-blur-xl group">
                {/* Core Inner Detail */}
                <div className="absolute inset-2 border border-blue-500/20 rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full" />

                <Activity className="w-8 h-8 text-blue-400 mb-1 animate-pulse" />
                <span className="text-[10px] font-bold text-blue-300 tracking-widest uppercase">ASO Core</span>
                <div className="absolute bottom-4 flex gap-1">
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            </div>

            {/* Connecting Lines (Decorative) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <div className="w-[120%] h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent rotate-45" />
                <div className="w-[120%] h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent -rotate-45" />
            </div>
        </div>
    );
};

export default function ASOSection() {
    // Hardcoded for now as requested, but keeping structure ready for i18n
    const cards = [
        {
            icon: <Lock className="w-6 h-6 text-emerald-400" />,
            title: "Policy-as-Code Enforcer",
            desc: "Automated compliance auditing across AWS, Azure, and OCI using strict drift-detection loops.",
            stat: "100% Audit",
            href: "/security"
        },
        {
            icon: <Globe className="w-6 h-6 text-blue-400" />,
            title: "Data Residency Firewall",
            desc: "Dynamic traffic steering based on classification tags to ensure data never leaves its sovereign jurisdiction.",
            stat: "< 10ms Latency",
            href: "/platform"
        },
        {
            icon: <Zap className="w-6 h-6 text-amber-400" />,
            title: "Cost Arbitrage Engine",
            desc: "Real-time spot price prediction and cluster rebalancing to maximize ROI across compliant regions.",
            stat: "-40% Costs",
            href: "/pricing"
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-slate-950">
            {/* Global Gradients */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-blue-900/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Content */}
                    <div className="order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-8">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            Autonomous Orchestration
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-white leading-tight">
                            The <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-white">ASO Engine</span>
                        </h2>

                        <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl">
                            Beyond passive management. This is active, autonomous orchestration that defends your sovereignty and optimizes your cloud economy in real-time.
                        </p>

                        <div className="space-y-6">
                            {cards.map((card, idx) => (
                                <Link
                                    href={card.href}
                                    key={idx}
                                    className="group flex flex-col sm:flex-row gap-6 p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all duration-300 relative overflow-hidden"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-14 h-14 rounded-xl bg-slate-950 border border-slate-700/50 flex items-center justify-center group-hover:border-blue-500/30 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all">
                                            {card.icon}
                                        </div>
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">
                                                {card.title}
                                            </h3>
                                            <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                                                {card.stat}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-400 leading-relaxed max-w-md group-hover:text-slate-300 transition-colors">
                                            {card.desc}
                                        </p>
                                    </div>

                                    {/* Hover State Indicator */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Visual Diagram */}
                    <div className="order-1 lg:order-2 flex flex-col items-center">
                        <SystemPulse />

                        <div className="mt-8 grid grid-cols-3 gap-8 text-center w-full max-w-sm">
                            {[
                                { label: 'Regions', val: '32' },
                                { label: 'Latency', val: '12ms' },
                                { label: 'Uptime', val: '99.99%' },
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="text-2xl font-bold text-white tabular-nums">{stat.val}</span>
                                    <span className="text-xs text-slate-500 uppercase tracking-widest">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

