"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { Activity, ShieldCheck, TrendingUp, Zap } from 'lucide-react';
import { ROIGauge, CostSavingsChart, UptimeRing, SecurityScoreMeter } from '@/components/visuals/MetricsGraphs';

export default function InteractiveDashboardSection() {
    const t = useTranslations('Dashboard');

    return (
        <section className="snap-section" style={{ background: 'var(--bg-surface-2)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div className="badge badge-primary-subtle mb-3" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>
                        {t('badge')}
                    </div>
                    <h2 style={{ fontSize: 'var(--h2-size)', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.05em' }}>
                        {t('liveTitle')}
                    </h2>
                    <p style={{ opacity: 0.7, maxWidth: '750px', margin: '0 auto', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        {t('liveSubtitle')}
                    </p>
                </div>

                <div className="grid-2x2-strict" style={{ gap: '1rem', gridTemplateRows: 'repeat(2, minmax(280px, auto))' }}>
                    {/* Panel 1: ROI Gauge */}
                    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900 }}>Return on Investment</h4>
                                <p style={{ fontSize: '0.7rem', opacity: 0.5, margin: 0 }}>Average ROI across all deployments</p>
                            </div>
                            <div className="badge badge-success-subtle" style={{ fontSize: '0.6rem' }}>
                                <TrendingUp size={10} className="mr-1" /> GROWING
                            </div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ROIGauge value={342} />
                        </div>
                    </div>

                    {/* Panel 2: Cost Savings */}
                    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900 }}>Monthly Cost Savings</h4>
                                <p style={{ fontSize: '0.7rem', opacity: 0.5, margin: 0 }}>Infrastructure optimization impact</p>
                            </div>
                            <Zap size={20} color="var(--color-warning)" />
                        </div>
                        <div style={{ flex: 1, minHeight: '180px' }}>
                            <CostSavingsChart />
                        </div>
                        <div style={{ fontSize: '0.7rem', background: 'rgba(16, 185, 129, 0.05)', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                            <div className="animate-pulse" style={{ width: 6, height: 6, background: '#10b981', borderRadius: '50%' }}></div>
                            $45K SAVED THIS MONTH • 275% INCREASE YOY
                        </div>
                    </div>

                    {/* Panel 3: Uptime */}
                    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900 }}>Platform Uptime</h4>
                                <p style={{ fontSize: '0.7rem', opacity: 0.5, margin: 0 }}>Last 30 days availability</p>
                            </div>
                            <div className="badge badge-success-subtle" style={{ fontSize: '0.6rem' }}>
                                <Activity size={10} className="mr-1" /> LIVE_SYNC
                            </div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <UptimeRing uptime={99.99} />
                        </div>
                    </div>

                    {/* Panel 4: Security Score */}
                    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.4) 0%, rgba(2, 6, 23, 0.8) 100%)' }}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900 }}>Security Posture</h4>
                                <p style={{ fontSize: '0.7rem', opacity: 0.5, margin: 0 }}>Compliance & threat protection</p>
                            </div>
                            <ShieldCheck size={20} color="var(--color-success)" />
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <SecurityScoreMeter score={94} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
