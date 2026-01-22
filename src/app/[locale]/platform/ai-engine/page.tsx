"use client";

import React from 'react';
import { Cpu, Brain, Zap, Settings, ShieldAlert, Workflow, BarChart4, MessageCircle, Code, Terminal } from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function AiEnginePage() {
    const t = useTranslations("AiEngine");
    return (
        <div className="bg-background min-h-screen pt-24 pb-20">
            <div className="container">
                {/* HERO SECTION */}
                <div className="max-w-4xl mb-24">
                    <div className="flex items-center gap-2 text-primary font-mono text-sm font-black uppercase tracking-widest mb-4">
                        <Cpu size={18} /> {t("hero.badge")}
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter">
                        {t("hero.title")} <br /><span className="text-primary text-gradient">{t("hero.titleHighlight")}</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                        {t("hero.subtitle")}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/contact" className="btn-primary py-4 px-10">{t("hero.cta1")}</Link>
                        <Link href="/architecture" className="btn-secondary py-4 px-10">{t("hero.cta2")}</Link>
                    </div>
                </div>

                {/* HOW IT WORKS */}
                <div className="py-24 border-y border-white/5 bg-slate-900/50 -mx-4 px-4 overflow-hidden">
                    <h2 className="text-4xl font-black text-center mb-16">{t("loop.title")}</h2>
                    <div className="grid lg:grid-cols-4 gap-4">
                        {[
                            { id: "ingest", icon: Terminal },
                            { id: "understand", icon: Brain },
                            { id: "plan", icon: Settings },
                            { id: "execute", icon: Zap }
                        ].map((step, i) => (
                            <div key={i} className="glass-panel p-8 text-center group hover:border-primary/50 transition-all">
                                <step.icon size={40} className="text-primary mx-auto mb-6 group-hover:scale-110 transition-transform" />
                                <h4 className="text-xl font-bold mb-2">{t(`loop.${step.id}.title`)}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">{t(`loop.${step.id}.desc`)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ARCHITECTURE DETAIL */}
                <div className="py-24">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-black mb-6">{t("detail.title")}</h2>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                {t("detail.desc")}
                            </p>
                            <div className="space-y-6">
                                {[
                                    { id: "graph" },
                                    { id: "policy" },
                                    { id: "benchmark" }
                                ].map((s, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="bg-primary/10 p-2 rounded-lg shrink-0 h-fit"><Code size={20} className="text-primary" /></div>
                                        <div>
                                            <div className="font-bold">{t(`detail.features.${s.id}.t`)}</div>
                                            <div className="text-sm text-muted-foreground">{t(`detail.features.${s.id}.d`)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="glass-panel p-1 border-primary/20 bg-black/40 overflow-hidden group">
                            <div style={{
                                flex: 1,
                                height: 'auto',
                                background: '#1e293b',
                                borderRadius: '1rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                padding: '1.5rem',
                                fontFamily: 'monospace',
                                fontSize: '0.8rem',
                                color: '#a5b4fc',
                                overflow: 'hidden',
                                position: 'relative'
                            }}>
                                <div className="text-slate-600 mb-2">{t('code.header')}</div>
                                <pre className="text-emerald-400">
                                    {JSON.stringify({
                                        "intent": t('code.intent'),
                                        "strategy": t('code.strategy'),
                                        "targets": [t('code.targets.0'), t('code.targets.1')],
                                        "analysis_agents": [
                                            { "name": t('code.agents.0.name'), "role": t('code.agents.0.role') },
                                            { "name": t('code.agents.1.name'), "role": t('code.agents.1.role') }
                                        ],
                                        "governance": t('code.governance')
                                    }, null, 2)}
                                </pre>
                                <div className="mt-4 animate-pulse">{t('code.running')}</div>

                                {/* Scan Line Animation */}
                                <div className="absolute inset-0 pointer-events-none" style={{
                                    background: 'linear-gradient(to bottom, transparent 50%, rgba(99, 102, 241, 0.1) 51%, transparent 51%)',
                                    backgroundSize: '100% 4px',
                                    animation: 'scanline 10s linear infinite'
                                }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
