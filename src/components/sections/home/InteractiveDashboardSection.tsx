"use client";

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Activity, ShieldCheck, TrendingUp, Zap, BarChart3, Cloud } from 'lucide-react';
import { LiveROIGauge, EnhancedCostSavingsChart, PulsingSecurityScore } from '@/components/visuals/EnhancedGraphs';
import { UptimeRing } from '@/components/visuals/MetricsGraphs';
import { LatencyLineChart, CloudDistributionPie, RequestVolumeBar, ComplianceScoresBar } from '@/components/charts/SimpleCharts';

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
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem'
                }}>
                    {/* TOP LEFT: ROI & PERFORMANCE (Chart mix) */}
                    <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', minHeight: '260px' }}>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900 }}>{t('roiTitle')}</h4>
                                <p style={{ fontSize: '0.75rem', opacity: 0.6, margin: 0 }}>{t('roiSubtitle')}</p>
                            </div>
                            <TrendingUp size={16} color="var(--primary)" />
                        </div>
                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ height: '140px' }}>
                                {isMounted && <LiveROIGauge value={342} />}
                            </div>
                            <div>
                                <LatencyLineChart height={110} />
                            </div>
                        </div>
                    </div>

                    {/* TOP RIGHT: SYSTEM ARCHITECTURE (Image mix) */}
                    <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.5rem', overflow: 'hidden', position: 'relative', minHeight: '260px' }}>
                        <img
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
                            alt="Data Center"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
                        />
                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 950, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{t('infraTitle')}</h4>
                            <p style={{ fontSize: '0.75rem', opacity: 0.9, marginTop: '0.25rem', fontWeight: 600 }}>{t('infraSubtitle')}</p>
                            <div style={{ marginTop: '5rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                    <span style={{ fontSize: '0.7rem' }}>{t('globalHealth')}</span>
                                    <span style={{ fontSize: '0.7rem', color: '#10b981' }}>99.999%</span>
                                </div>
                                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                    <div style={{ width: '99%', height: '100%', background: '#10b981' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM LEFT: COST & DISTRIBUTION (Mixed charts) */}
                    <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', minHeight: '260px' }}>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900 }}>{t('optimizationTitle')}</h4>
                            </div>
                            <Zap size={16} color="var(--color-warning)" />
                        </div>
                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                {isMounted && <CloudDistributionPie height={110} />}
                            </div>
                            <div>
                                {isMounted && <EnhancedCostSavingsChart height={110} />}
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM RIGHT: SECURITY & COMPLIANCE (Metrics mix) */}
                    <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', minHeight: '260px' }}>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900 }}>{t('trustTitle')}</h4>
                            </div>
                            <ShieldCheck size={16} color="var(--color-success)" />
                        </div>
                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'start' }}>
                            <div style={{ height: '140px' }}>
                                {isMounted && <PulsingSecurityScore score={94} />}
                            </div>
                            <div>
                                {isMounted && <ComplianceScoresBar height={110} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
