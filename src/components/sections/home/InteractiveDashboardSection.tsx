"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Activity, ShieldCheck, TrendingUp, Zap } from 'lucide-react';

const ChartSkeleton = () => <div className="w-full h-full bg-white/5 animate-pulse rounded-lg" />;

// Lazy load heavy chart components
const LiveROIGauge = dynamic(() => import('@/components/visuals/EnhancedGraphs').then(mod => mod.LiveROIGauge), { ssr: false, loading: () => <ChartSkeleton /> });
const EnhancedCostSavingsChart = dynamic(() => import('@/components/visuals/EnhancedGraphs').then(mod => mod.EnhancedCostSavingsChart), { ssr: false, loading: () => <ChartSkeleton /> });
const PulsingSecurityScore = dynamic(() => import('@/components/visuals/EnhancedGraphs').then(mod => mod.PulsingSecurityScore), { ssr: false, loading: () => <ChartSkeleton /> });
const LatencyLineChart = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.LatencyLineChart), { ssr: false, loading: () => <ChartSkeleton /> });
const CloudDistributionPie = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.CloudDistributionPie), { ssr: false, loading: () => <ChartSkeleton /> });
const ComplianceScoresBar = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.ComplianceScoresBar), { ssr: false, loading: () => <ChartSkeleton /> });

export default function InteractiveDashboardSection() {
    const t = useTranslations('Dashboard');
    const [isMounted, setIsMounted] = useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section id="playground" className="snap-section" style={{
            background: 'var(--background)',
            paddingTop: '4rem',
            paddingBottom: '4rem',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background elements */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="container relative z-10">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black mb-4 uppercase tracking-[0.2em] backdrop-blur-md">
                        <Activity size={12} className="animate-pulse" />
                        {t('badge')}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-foreground">
                        {t('liveTitle')}
                    </h2>
                    <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed font-medium">
                        {t('liveSubtitle')}
                    </p>
                </div>

                {/* 2x2 Grid with mix of Content, Charts, and Images */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* TOP LEFT: ROI & PERFORMANCE (Chart mix) */}
                    <div className="glass-panel p-5 rounded-2xl flex flex-col min-h-[240px] border-white/5 bg-white/[0.02] hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-500 group">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="text-base font-black text-foreground group-hover:text-primary transition-colors">{t('roiTitle')}</h4>
                                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">{t('roiSubtitle')}</p>
                            </div>
                            <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                                <TrendingUp size={16} />
                            </div>
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <div className="h-[160px] flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
                                {isMounted && <LiveROIGauge value={342} />}
                            </div>
                            <div className="h-[160px]">
                                {isMounted && <LatencyLineChart height={160} standalone />}
                            </div>
                        </div>
                    </div>

                    {/* TOP RIGHT: SYSTEM ARCHITECTURE (Image mix) */}
                    <div className="glass-panel p-5 rounded-2xl overflow-hidden relative min-h-[240px] border-white/5 flex flex-col justify-end group">
                        <Image
                            src="/images/home/data-center.png"
                            alt="Data Center"
                            fill
                            className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />

                        <div className="relative z-20">
                            <h4 className="text-base font-black text-foreground mb-1">{t('infraTitle')}</h4>
                            <p className="text-[10px] font-medium text-muted-foreground mb-4">{t('infraSubtitle')}</p>
                            <div className="bg-black/40 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-2xl">
                                <div className="flex justify-between mb-1 items-center">
                                    <span className="text-[9px] text-primary font-black tracking-widest uppercase">{t('globalHealth')}</span>
                                    <span className="text-xs text-emerald-400 font-mono font-black animate-pulse">99.999%</span>
                                </div>
                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="shimmer-effect w-[99.999%] h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM LEFT: COST & DISTRIBUTION (Mixed charts) */}
                    <div className="glass-panel p-5 rounded-2xl flex flex-col min-h-[240px] border-white/5 bg-white/[0.02] hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-500 group">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="text-base font-black text-foreground group-hover:text-primary transition-colors">{t('optimizationTitle')}</h4>
                                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">{t('optimizationSubtitle')}</p>
                            </div>
                            <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-500">
                                <Zap size={16} />
                            </div>
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <div className="h-[160px]">
                                {isMounted && <CloudDistributionPie height={160} standalone />}
                            </div>
                            <div className="h-[160px]">
                                {isMounted && <EnhancedCostSavingsChart height={160} />}
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM RIGHT: SECURITY & COMPLIANCE (Metrics mix) */}
                    <div className="glass-panel p-5 rounded-2xl flex flex-col min-h-[240px] border-white/5 bg-white/[0.02] hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-500 group">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="text-base font-black text-foreground group-hover:text-primary transition-colors">{t('trustTitle')}</h4>
                                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">{t('trustSubtitle')}</p>
                            </div>
                            <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-500">
                                <ShieldCheck size={16} />
                            </div>
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                            <div className="h-[160px] flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full" />
                                {isMounted && <PulsingSecurityScore score={94} />}
                            </div>
                            <div className="h-[160px]">
                                {isMounted && <ComplianceScoresBar height={160} standalone />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .shimmer-effect {
                    position: relative;
                    overflow: hidden;
                }
                .shimmer-effect::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                    animation: shimmer 2s infinite;
                }
                @keyframes shimmer {
                    100% { left: 100%; }
                }
            `}</style>
        </section>
    );
}
