"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { Activity, ShieldCheck, PieChart, Globe, Zap, ArrowUpRight } from 'lucide-react';
import { PerformanceAreaChart, ComplianceBarChart } from '@/components/visuals/InteractiveGraphs';

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
                    {/* Panel 1: Performance */}
                    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900 }}>Global Ingress Performance</h4>
                                <p style={{ fontSize: '0.7rem', opacity: 0.5, margin: 0 }}>Real-time latency across OCI vs Hyperscalers</p>
                            </div>
                            <div className="badge badge-success-subtle" style={{ fontSize: '0.6rem' }}>
                                <Activity size={10} className="mr-1" /> LIVE_SYNC
                            </div>
                        </div>
                        <div style={{ flex: 1, minHeight: '180px' }}>
                            <PerformanceAreaChart />
                        </div>
                        <div className="flex gap-4 mt-2" style={{ fontSize: '0.65rem', fontWeight: 700 }}>
                            <div className="flex items-center gap-1"><div style={{ width: 8, height: 8, background: 'var(--primary)', borderRadius: '2px' }}></div> OCI NATIVE</div>
                            <div className="flex items-center gap-1 opacity-50"><div style={{ width: 8, height: 8, background: 'rgba(255,255,255,0.3)', borderRadius: '2px' }}></div> AWS/AZURE</div>
                        </div>
                    </div>

                    {/* Panel 2: Compliance */}
                    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900 }}>Compliance Drift Engine</h4>
                                <p style={{ fontSize: '0.7rem', opacity: 0.5, margin: 0 }}>Continuous regulatory state enforcement</p>
                            </div>
                            <ShieldCheck size={20} color="var(--color-success)" />
                        </div>
                        <div style={{ flex: 1, minHeight: '180px', display: 'flex', alignItems: 'center' }}>
                            <ComplianceBarChart />
                        </div>
                        <div style={{ fontSize: '0.7rem', background: 'rgba(16, 185, 129, 0.05)', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div className="animate-pulse" style={{ width: 6, height: 6, background: '#10b981', borderRadius: '50%' }}></div>
                            AUTO-REMEDIATION ACTIVE: 2 DRIFTS BLOCKED (24H)
                        </div>
                    </div>

                    {/* Panel 3: Cost Arbitrage */}
                    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900 }}>FinOps Arbitrage Meter</h4>
                                <p style={{ fontSize: '0.7rem', opacity: 0.5, margin: 0 }}>Workload placement for cost efficiency</p>
                            </div>
                            <Zap size={20} color="var(--color-warning)" />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
                            <div className="flex justify-between items-end">
                                <span style={{ fontSize: '2.5rem', fontWeight: 950 }}>$0.012<span style={{ fontSize: '1rem', opacity: 0.5 }}>/req</span></span>
                                <div style={{ textAlign: 'right', color: 'var(--color-success)', fontSize: '0.8rem', fontWeight: 800 }}>
                                    <ArrowUpRight size={14} style={{ display: 'inline' }} /> 22% SAVED
                                </div>
                            </div>
                            <div style={{ height: '40px', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', position: 'relative', overflow: 'hidden', border: '1px solid var(--card-border)' }}>
                                <div style={{ height: '100%', width: '78%', background: 'linear-gradient(90deg, var(--primary) 0%, var(--color-accent-purple) 100%)', opacity: 0.8 }}></div>
                                <div style={{ position: 'absolute', top: 0, left: '10%', height: '100%', width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
                                <div style={{ position: 'absolute', top: 0, left: '30%', height: '100%', width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
                                <div style={{ position: 'absolute', top: 0, left: '50%', height: '100%', width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
                                <div style={{ position: 'absolute', top: 0, left: '70%', height: '100%', width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
                            </div>
                            <div className="flex justify-between" style={{ fontSize: '0.6rem', opacity: 0.5 }}>
                                <span>AWS_us_east_1</span>
                                <span>OCI_frankfurt_1</span>
                            </div>
                        </div>
                    </div>

                    {/* Panel 4: Node Map */}
                    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.4) 0%, rgba(2, 6, 23, 0.8) 100%)' }}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 900 }}>Sovereign Node Topology</h4>
                                <p style={{ fontSize: '0.7rem', opacity: 0.5, margin: 0 }}>Global mesh state (v4.2 protocol)</p>
                            </div>
                            <Globe size={20} color="var(--primary)" />
                        </div>
                        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                border: '2px solid var(--primary-glow)',
                                borderRadius: '50%',
                                position: 'relative',
                                animation: 'spin 20s linear infinite'
                            }}>
                                <div style={{ position: 'absolute', top: '-6px', left: '50%', width: 12, height: 12, background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 15px var(--primary)' }}></div>
                                <div style={{ position: 'absolute', bottom: '-6px', left: '50%', width: 12, height: 12, background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 15px var(--primary)' }}></div>
                                <div style={{ position: 'absolute', top: '50%', left: '-6px', width: 12, height: 12, background: '#8b5cf6', borderRadius: '50%', boxShadow: '0 0 15px #8b5cf6' }}></div>
                                <div style={{ position: 'absolute', top: '50%', right: '-6px', width: 12, height: 12, background: '#10b981', borderRadius: '50%', boxShadow: '0 0 15px #10b981' }}></div>
                            </div>
                            <div style={{ position: 'absolute', fontSize: '1.5rem', fontWeight: 950, color: 'var(--foreground)' }}>142<span style={{ fontSize: '0.8rem', opacity: 0.5 }}>/nodes</span></div>

                            <svg style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.1 }}>
                                <circle cx="50%" cy="50%" r="40" fill="none" stroke="white" strokeWidth="0.5" />
                                <circle cx="50%" cy="50%" r="60" fill="none" stroke="white" strokeWidth="0.5" />
                                <circle cx="50%" cy="50%" r="80" fill="none" stroke="white" strokeWidth="0.5" />
                            </svg>
                        </div>
                        <div className="mt-4 flex justify-between" style={{ fontSize: '0.65rem', fontWeight: 800 }}>
                            <span>LATENCY_SYNC</span>
                            <span style={{ color: 'var(--primary)' }}>0.82ms</span>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
}
