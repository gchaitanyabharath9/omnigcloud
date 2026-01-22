"use client";

import React from 'react';
import { Activity, BarChart3, Search, Shield, Zap, Eye, Lock, Globe, MessageCircle, Share2 } from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function ObservabilityPage() {
    const t = useTranslations("Observability");
    return (
        <div className="bg-background min-h-screen pt-24 pb-20">
            <div className="container">
                {/* HERO SECTION */}
                <div className="max-w-4xl mb-24">
                    <div className="flex items-center gap-2 text-primary font-mono text-sm font-black uppercase tracking-widest mb-4">
                        <Activity size={18} /> {t("hero.badge")}
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter">
                        {t("hero.title")} <br /><span className="text-primary text-gradient">{t("hero.titleHighlight")}</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                        {t("hero.subtitle")}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/contact" className="btn-primary py-4 px-10">{t("hero.cta1")}</Link>
                        <Link href="/docs/whitepaper" className="btn-secondary py-4 px-10">{t("hero.cta2")}</Link>
                    </div>
                </div>

                {/* THE MESH VIEW */}
                <div className="py-24 border-y border-white/5 bg-[#050810]/50 -mx-4 px-4 overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="glass-panel p-8 border-primary/20 bg-slate-900/40 relative">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="text-sm font-black uppercase tracking-widest opacity-50">{t("mesh.title")}</div>
                                    <div className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-black rounded-lg">{t("mesh.badge")}</div>
                                </div>
                                <div className="space-y-6">
                                    {[0, 1, 2].map((i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-xs font-mono mb-2">
                                                <span>{t(`mesh.metrics.${i}.l`)}</span>
                                                <span className="text-primary font-bold">{t(`mesh.metrics.${i}.v`)}</span>
                                            </div>
                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: i === 0 ? "70%" : i === 1 ? "40%" : "90%" }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">{t("mesh.featureTitle")}</h2>
                            <h3 className="text-3xl font-black mb-6">{t("mesh.featureSubtitle")}</h3>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                {t.rich("mesh.featureDesc", { strong: (chunks) => <strong>{chunks}</strong> })}
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { t: t("features.latency"), i: Share2 },
                                    { t: t("features.security"), i: Shield },
                                    { t: t("features.cost"), i: BarChart3 },
                                    { t: t("features.error"), i: Activity }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-xl">
                                        <item.i size={18} className="text-primary" />
                                        <span className="text-sm font-bold">{item.t}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ SECTION */}
                <div className="py-24 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black mb-12 text-center">{t("faq.title")}</h2>
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="glass-panel p-6 border-white/5">
                                <h4 className="font-bold mb-2 flex items-center gap-2 text-primary">
                                    <MessageCircle size={16} /> {t(`faq.q${i}`)}
                                </h4>
                                <p className="text-muted-foreground text-sm leading-relaxed pl-6">{t(`faq.a${i}`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
