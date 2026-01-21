"use client";

import React, { useState, useEffect } from 'react';
import { Activity, Zap, Shield, Globe, Server, Database, Cloud, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { AnimatedResourceUtilization, LiveDeploymentFrequency } from '@/components/visuals/EnhancedGraphs';
import { ResponseTimeTrend } from '@/components/visuals/MetricsGraphs';
import { ErrorRateTrend, QueryPerformance, AutoScalingEvents } from '@/components/visuals/PerformanceMetrics';
import { useTranslations } from 'next-intl';
import { tSafe } from '@/lib/i18n/tSafe';

export default function TechnicalDashboardPage() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeAlerts, setActiveAlerts] = useState(2);
    const [systemStatus, setSystemStatus] = useState<'operational' | 'degraded' | 'critical'>('operational');
    const t = useTranslations('Dashboard.Technical');
    const tCommon = useTranslations('Dashboard.Shell');

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
                                {tSafe(t, 'title', "TECHNICAL OPERATIONS")}
                            </h1>
                            <div style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                                {tSafe(t, 'subtitle', "OMNIGCLOUD_CONTROL_PLANE_v4.2.1")}
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
                                    {systemStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN GRID */}
            <div className="container" style={{ padding: '2rem' }}>
                {/* TOP ROW - Critical Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                    <div className="glass-panel" style={{
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        background: 'linear-gradient(135deg, rgba(96, 239, 255, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
                        border: '1px solid rgba(96, 239, 255, 0.2)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>{tSafe(t, 'activeNodes', "Active Nodes")}</div>
                            <Server size={20} color="#60efff" />
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 950, color: '#60efff' }}>142</div>
                        <div style={{ fontSize: '0.7rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
                            <TrendingUp size={12} /> {tSafe(t, 'trend', "+8 (24h)")}
                        </div>
                    </div>

                    <div className="glass-panel" style={{
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)',
                        border: '1px solid rgba(16, 185, 129, 0.2)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>{tSafe(t, 'requestsSec', "Requests/sec")}</div>
                            <Activity size={20} color="#10b981" />
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 950, color: '#10b981' }}>8.4k</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.5rem' }}>{tSafe(t, 'avg', "Avg: 7.2k")}</div>
                    </div>

                    <div className="glass-panel" style={{
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)',
                        border: '1px solid rgba(139, 92, 246, 0.2)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>{tSafe(t, 'dataTransfer', "Data Transfer")}</div>
                            <Database size={20} color="#8b5cf6" />
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 950, color: '#8b5cf6' }}>2.1TB</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.5rem' }}>{tSafe(t, 'lastHour', "Last hour")}</div>
                    </div>

                    <div className="glass-panel" style={{
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        background: activeAlerts > 0
                            ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(217, 119, 6, 0.05) 100%)'
                            : 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)',
                        border: `1px solid ${activeAlerts > 0 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>{tSafe(tCommon, 'activeAlerts', "Active Alerts")}</div>
                            {activeAlerts > 0 ? <AlertTriangle size={20} color="#f59e0b" /> : <CheckCircle size={20} color="#10b981" />}
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 950, color: activeAlerts > 0 ? '#f59e0b' : '#10b981' }}>{activeAlerts}</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.5rem' }}>
                            {activeAlerts > 0 ? tSafe(tCommon, 'requiresAttention', "Requires attention") : tSafe(tCommon, 'nominal', "All systems nominal")}
                        </div>
                    </div>
                </div>

                {/* TECHNICAL GRID */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    <div id="resources" className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'rgba(10, 10, 10, 0.8)', scrollMarginTop: '120px' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 900, marginBottom: '0.5rem' }}>{tSafe(t, 'resourceTitle', "Resource Telemetry")}</h4>
                        <p style={{ fontSize: '0.65rem', opacity: 0.5, marginBottom: '1rem' }}>{tSafe(t, 'resourceDesc', "Live infrastructure metrics")}</p>
                        <AnimatedResourceUtilization />
                    </div>

                    <div id="deployment" className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'rgba(10, 10, 10, 0.8)', scrollMarginTop: '120px' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 900, marginBottom: '0.5rem' }}>{tSafe(t, 'velocityTitle', "Velocity Metrics")}</h4>
                        <p style={{ fontSize: '0.65rem', opacity: 0.5, marginBottom: '1rem' }}>{tSafe(t, 'velocityDesc', "Weekly deployment frequency")}</p>
                        <LiveDeploymentFrequency />
                    </div>

                    <div id="scaling" className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'rgba(10, 10, 10, 0.8)', scrollMarginTop: '120px' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 900, marginBottom: '0.5rem' }}>{tSafe(t, 'scalingTitle', "Auto-Scale Events")}</h4>
                        <p style={{ fontSize: '0.65rem', opacity: 0.5, marginBottom: '1rem' }}>{tSafe(t, 'scalingDesc', "24-hour scaling activity")}</p>
                        <AutoScalingEvents />
                    </div>

                    <div id="errors" className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'rgba(10, 10, 10, 0.8)', scrollMarginTop: '120px' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 900, marginBottom: '0.5rem' }}>{tSafe(t, 'threatTitle', "Threat Analysis")}</h4>
                        <p style={{ fontSize: '0.65rem', opacity: 0.5, marginBottom: '1rem' }}>{tSafe(t, 'threatDesc', "Error rate & threat trend")}</p>
                        <ErrorRateTrend />
                    </div>

                    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'rgba(10, 10, 10, 0.8)' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 900, marginBottom: '0.5rem' }}>{tSafe(t, 'queryTitle', "Query Performance")}</h4>
                        <p style={{ fontSize: '0.65rem', opacity: 0.5, marginBottom: '1rem' }}>{tSafe(t, 'queryDesc', "Database operations")}</p>
                        <QueryPerformance />
                    </div>

                    <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem', background: 'rgba(10, 10, 10, 0.8)' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 900, marginBottom: '0.5rem' }}>{tSafe(t, 'latencyTitle', "Global Latency")}</h4>
                        <p style={{ fontSize: '0.65rem', opacity: 0.5, marginBottom: '1rem' }}>{tSafe(t, 'latencyDesc', "Real-time system latency metrics")}</p>
                        <ResponseTimeTrend />
                    </div>

                </div>
            </div>
        </div>
    );
}
