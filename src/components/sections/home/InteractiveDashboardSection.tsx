"use client";

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Activity, ShieldCheck, TrendingUp, Zap, BarChart3, Cloud } from 'lucide-react';
import { LiveROIGauge, EnhancedCostSavingsChart, PulsingSecurityScore } from '@/components/visuals/EnhancedGraphs';
import { UptimeRing } from '@/components/visuals/MetricsGraphs';
import dynamic from 'next/dynamic';
const LatencyLineChart = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.LatencyLineChart), { ssr: false });
const CloudDistributionPie = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.CloudDistributionPie), { ssr: false });
const RequestVolumeBar = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.RequestVolumeBar), { ssr: false });
const ComplianceScoresBar = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.ComplianceScoresBar), { ssr: false });

export default function InteractiveDashboardSection() {
    const t = useTranslations('Dashboard');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section className="snap-section" style={{ background: 'var(--bg-surface-2)', paddingTop: '0.5rem', paddingBottom: '0.5rem', minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-3 uppercase tracking-wider backdrop-blur-sm">
                        <Activity size={12} className="animate-pulse" />
                        {t('badge')}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight gradient-text-primary">
                        {t('liveTitle')}
                    </h2>
                    <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
                        {t('liveSubtitle')}
                    </p>
                </div>

                {/* 2x2 Grid with mix of Content, Charts, and Images */}
                <div className="grid-2" style={{ gap: '1rem' }}>
                    {/* TOP LEFT: ROI & PERFORMANCE (Chart mix) */}
                    <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', minHeight: '260px', minWidth: 0 }}>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900 }}>{t('roiTitle')}</h4>
                                <p style={{ fontSize: '0.75rem', opacity: 0.6, margin: 0 }}>{t('roiSubtitle')}</p>
                            </div>
                            <TrendingUp size={16} color="var(--primary)" />
                        </div>
                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ height: '160px' }}>
                                {isMounted && <LiveROIGauge value={342} />}
                            </div>
                            <div>
                                <LatencyLineChart height={160} />
                            </div>
                        </div>
                    </div>

                    {/* TOP RIGHT: SYSTEM ARCHITECTURE (Image mix) */}
                    <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.5rem', overflow: 'hidden', position: 'relative', minHeight: '260px', minWidth: 0 }}>
                        <img
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
                            alt="Data Center"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
                        />
                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 950, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{t('infraTitle')}</h4>
                            <p style={{ fontSize: '0.75rem', opacity: 0.9, marginTop: '0.25rem', fontWeight: 600 }}>{t('infraSubtitle')}</p>
                            <div style={{ marginTop: '5rem', background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(12px)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.75rem', color: '#ffffff', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{t('globalHealth')}</span>
                                    <span style={{ fontSize: '0.85rem', color: '#34d399', fontWeight: 900, textShadow: '0 0 10px rgba(52, 211, 153, 0.5)' }}>99.999%</span>
                                </div>
                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: '99%', height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)', borderRadius: '3px', boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM LEFT: COST & DISTRIBUTION (Mixed charts) */}
                    <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', minHeight: '260px', minWidth: 0 }}>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900 }}>{t('optimizationTitle')}</h4>
                            </div>
                            <Zap size={16} color="var(--color-warning)" />
                        </div>
                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                            <div>
                                {isMounted && <CloudDistributionPie height={160} />}
                            </div>
                            <div>
                                {isMounted && <EnhancedCostSavingsChart height={160} />}
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM RIGHT: SECURITY & COMPLIANCE (Metrics mix) */}
                    <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', minHeight: '260px', minWidth: 0 }}>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900 }}>{t('trustTitle')}</h4>
                            </div>
                            <ShieldCheck size={16} color="var(--color-success)" />
                        </div>
                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', alignItems: 'start' }}>
                            <div style={{ height: '160px' }}>
                                {isMounted && <PulsingSecurityScore score={94} />}
                            </div>
                            <div>
                                {isMounted && <ComplianceScoresBar height={160} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
