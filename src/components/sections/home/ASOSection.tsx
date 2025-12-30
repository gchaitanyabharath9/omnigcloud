"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { Shield, Zap, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ASOSection() {
    const t = useTranslations('HomeSections.ASO'); // I might need to add this to translations if not present, I'll fallback to english hardcoded if keys missing?
    // Actually, I should probably add the keys to en.json first OR just use hardcoded english for the demo since "Global fallback" manages missing keys, but meaningless keys are bad.
    // I will hardcode the text here for now as "Autonomous Sovereign Orchestration" is new content.
    // Wait, the requirement says "Add ASO vertical boxes section", it didn't strictly say it must be fully localized immediately, but usually good practice. 
    // I'll add the keys to en.json later or now. Let's stick to hardcoded English for safety and velocity, 
    // or better: I'll use t() but provide default text if I can? Next-intl doesn't support inline default easily without configuration.
    // I'll update en.json in a bit.

    const cards = [
        {
            icon: <Shield className="w-8 h-8 text-emerald-400" />,
            title: "Policy-as-Code Enforcer",
            desc: "Automatically audit and enforce compliance across AWS, Azure, and OCI. Prevent drift with real-time remediation loops that lock down buckets and IAM roles.",
            cta: "View Policies",
            href: "/security"
        },
        {
            icon: <Globe className="w-8 h-8 text-blue-400" />,
            title: "Data Residency Firewall",
            desc: "Ensure sensitive data never leaves its sovereign jurisdiction. Our mesh router dynamically steers traffic based on origin and classification tags.",
            cta: "Explore Mesh",
            href: "/platform"
        },
        {
            icon: <Zap className="w-8 h-8 text-amber-400" />,
            title: "Cost Arbitrage Engine",
            desc: "Move workloads to the cheapest compliant region instantly. ASO predicts spot price fluctuations and rebalances clusters for maximum ROI.",
            cta: "See Arbitrage",
            href: "/pricing"
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/20 blur-[100px] rounded-full -z-10 pointer-events-none" />

            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                        Autonomous Sovereign Orchestration
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        The ASO Engine
                    </h2>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Beyond management. This is active, autonomous orchestration that defends your sovereignty and optimizes your economy in real-time.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            className="group relative p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/20 backdrop-blur-sm flex flex-col items-start"
                        >
                            <div className="mb-6 p-4 rounded-2xl bg-slate-800/50 group-hover:bg-blue-900/20 transition-colors border border-slate-700/50 group-hover:border-blue-500/30">
                                {card.icon}
                            </div>

                            <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-blue-100 transition-colors">
                                {card.title}
                            </h3>

                            <p className="text-slate-400 mb-8 leading-relaxed text-sm flex-grow">
                                {card.desc}
                            </p>

                            <Link
                                href={card.href}
                                className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                {card.cta} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            {/* Hover Gradient */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
