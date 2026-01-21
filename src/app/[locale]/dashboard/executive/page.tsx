"use client";

import React, { useState, useEffect } from 'react';
import { Activity, Zap, Shield, Globe, Server, Database, Cloud, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { EnhancedCostSavingsChart, LiveROIGauge, PulsingSecurityScore } from '@/components/visuals/EnhancedGraphs';
import { UptimeRing } from '@/components/visuals/MetricsGraphs';
import { useTranslations } from 'next-intl';

export default function ExecutiveDashboardPage() {
    const t = useTranslations('Dashboard.Executive');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeAlerts, setActiveAlerts] = useState(2);
    const [systemStatus, setSystemStatus] = useState<'operational' | 'degraded' | 'critical'>('operational');

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ background: '#000000', minHeight: '100vh', color: 'white' }}>
            {/* COMMAND HEADER */}
            <div style={{
                position: 'sticky',
                top: '0',
                zIndex: 100,
                background: 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)',
                borderBottom: '1px solid rgba(96, 239, 255, 0.2)',
                padding: '1rem 0',
                backdropFilter: 'blur(20px)'
            }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 style={{ fontSize: '2rem', fontWeight: 950, margin: 0, color: '#60efff', letterSpacing: '-0.02em' }}>
                                {t('title')}
                            </h1>
                            <div style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                                {t('version')}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>
                                    {currentTime.toLocaleTimeString('en-US', { hour12: false })}
                                </div>
                                <div style={{ fontSize: '0.65rem', opacity: 0.5 }}>
                                    {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: systemStatus === 'operational' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.5rem',
                                border: `1px solid ${systemStatus === 'operational' ? '#10b981' : '#ef4444'}`
                            }}>
                                <div className="animate-pulse" style={{
                                    width: 8,
                                    height: 8,
                                    background: systemStatus === 'operational' ? '#10b981' : '#ef4444',
                                    borderRadius: '50%',
                                    boxShadow: `0 0 10px ${systemStatus === 'operational' ? '#10b981' : '#ef4444'}`
                                }}></div>
                                <span style={{
                                    fontSize: '0.7rem',
                                    fontWeight: 900,
                                    color: systemStatus === 'operational' ? '#10b981' : '#ef4444',
                                    textTransform: 'uppercase'
                                }}>
                                    {t(`status.${systemStatus}`)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN GRID */}
            <div className="container" style={{ padding: '2rem' }}>
                {/* TOP ROW - Critical Metrics Summary */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                    <div className="glass-panel" style={{
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        background: 'linear-gradient(135deg, rgba(96, 239, 255, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
                        border: '1px solid rgba(96, 239, 255, 0.2)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>{t('metrics.activeAssets')}</div>
                            <Server size={20} color="#60efff" />
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 950, color: '#60efff' }}>142</div>
                    </div>

                    <div className="glass-panel" style={{
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)',
                        border: '1px solid rgba(16, 185, 129, 0.2)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>{t('metrics.revenueImpact')}</div>
                            <Activity size={20} color="#10b981" />
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 950, color: '#10b981' }}>+18%</div>
                    </div>

                    <div className="glass-panel" style={{
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)',
                        border: '1px solid rgba(139, 92, 246, 0.2)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>{t('metrics.cloudSpend')}</div>
                            <Database size={20} color="#8b5cf6" />
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 950, color: '#8b5cf6' }}>-40%</div>
                    </div>

                    <div className="glass-panel" style={{
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)',
                        border: '1px solid rgba(16, 185, 129, 0.2)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>{t('metrics.systemHealth')}</div>
                            <CheckCircle size={20} color="#10b981" />
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 950, color: '#10b981' }}>{t('metrics.healthStatus')}</div>
                    </div>
                </div>

                {/* KPI GRID */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>

                    {/* ROI Performance */}
                    <div id="roi" className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', background: 'rgba(10, 10, 10, 0.8)', scrollMarginTop: '120px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, margin: 0 }}>{t('roi.title')}</h3>
                                <p style={{ fontSize: '0.7rem', opacity: 0.5, margin: '0.25rem 0 0 0' }}>{t('roi.subtitle')}</p>
                            </div>
                            <div className="badge badge-success-subtle" style={{ fontSize: '0.6rem' }}>
                                <TrendingUp size={10} className="mr-1" /> {t('roi.badge')}
                            </div>
                        </div>
                        <LiveROIGauge value={342} />
                    </div>

                    {/* Cost Arbitrage */}
                    <div id="cost" className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', background: 'rgba(10, 10, 10, 0.8)', scrollMarginTop: '120px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, margin: 0 }}>{t('cost.title')}</h3>
                                <p style={{ fontSize: '0.7rem', opacity: 0.5, margin: '0.25rem 0 0 0' }}>{t('cost.subtitle')}</p>
                            </div>
                            <Zap size={20} color="#f59e0b" />
                        </div>
                        <EnhancedCostSavingsChart />
                        <div style={{
                            fontSize: '0.7rem',
                            background: 'rgba(16, 185, 129, 0.1)',
                            padding: '0.75rem',
                            borderRadius: '0.75rem',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            color: '#10b981',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginTop: '1rem'
                        }}>
                            <div className="animate-pulse" style={{ width: 6, height: 6, background: '#10b981', borderRadius: '50%' }}></div>
                            {t('cost.impact')}
                        </div>
                    </div>

                    {/* Global Connectivity (Uptime) */}
                    <div id="uptime" className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', background: 'rgba(10, 10, 10, 0.8)', scrollMarginTop: '120px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, margin: 0 }}>{t('uptime.title')}</h3>
                                <p style={{ fontSize: '0.7rem', opacity: 0.5, margin: '0.25rem 0 0 0' }}>{t('uptime.subtitle')}</p>
                            </div>
                            <Globe size={20} color="#60efff" />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
                            <UptimeRing uptime={99.99} />
                        </div>
                    </div>

                    {/* Compliance Radar (Security) */}
                    <div id="security" className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', background: 'rgba(10, 10, 10, 0.8)', scrollMarginTop: '120px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, margin: 0 }}>{t('compliance.title')}</h3>
                                <p style={{ fontSize: '0.7rem', opacity: 0.5, margin: '0.25rem 0 0 0' }}>{t('compliance.subtitle')}</p>
                            </div>
                            <Shield size={20} color="#8b5cf6" />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
                            <PulsingSecurityScore score={94} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
