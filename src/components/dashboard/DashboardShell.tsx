"use client";

import React, { useState, useEffect } from 'react';
import { Activity, Server, Database, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

interface DashboardShellProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

export default function DashboardShell({ title, subtitle, children }: DashboardShellProps) {
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
                top: 'var(--header-height)',
                zIndex: 100,
                background: 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)',
                borderBottom: '1px solid rgba(96, 239, 255, 0.2)',
                padding: '1.5rem 0',
                backdropFilter: 'blur(20px)',
                marginTop: '0'
            }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 950, margin: 0, color: '#60efff', letterSpacing: '-0.02em' }}>
                                {title}
                            </h1>
                            <div style={{ fontSize: '0.85rem', opacity: 0.6, marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                                {subtitle}
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

            {/* MAIN CONTENT */}
            <div className="container overflow-x-hidden" style={{ padding: '2rem', flex: 1 }}>

                {/* CRITICAL METRICS ROW - Always Visible for Context */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                    <div className="glass-panel" style={{
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        background: 'linear-gradient(135deg, rgba(96, 239, 255, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
                        border: '1px solid rgba(96, 239, 255, 0.2)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>Active Assets</div>
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
                            <div style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>Revenue Impact</div>
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
                            <div style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>Cloud Spend</div>
                            <Database size={20} color="#8b5cf6" />
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 950, color: '#8b5cf6' }}>-40%</div>
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
                            <div style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>Active Alerts</div>
                            {activeAlerts > 0 ? <AlertTriangle size={20} color="#f59e0b" /> : <CheckCircle size={20} color="#10b981" />}
                        </div>
                        <div style={{ fontSize: '2.5rem', fontWeight: 950, color: activeAlerts > 0 ? '#f59e0b' : '#10b981' }}>{activeAlerts}</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.5rem' }}>
                            {activeAlerts > 0 ? 'Requires attention' : 'All systems nominal'}
                        </div>
                    </div>
                </div>

                {children}
            </div>
        </div>
    );
}
