"use client";

import React from 'react';

// 19. Auto-Scaling Events
export const AutoScalingEvents = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const events = hours.map(h => {
        if (h >= 8 && h <= 18) return Math.floor(Math.random() * 15) + 5;
        return Math.floor(Math.random() * 5);
    });
    const maxEvents = Math.max(...events);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', gap: '0.15rem', padding: '0.5rem 0' }}>
            {events.map((count, i) => (
                <div
                    key={i}
                    style={{
                        flex: 1,
                        height: `${(count / maxEvents) * 100}%`,
                        background: count > 10 ? 'var(--color-warning)' : 'var(--primary)',
                        borderRadius: '0.2rem 0.2rem 0 0',
                        minHeight: '5px',
                        opacity: 0.8
                    }}
                    title={`${i}:00 - ${count} events`}
                />
            ))}
        </div>
    );
};

// 20. Cost Per Transaction
export const CostPerTransaction = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const costs = [0.042, 0.038, 0.035, 0.031, 0.028, 0.024]; // dollars

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 950, color: 'var(--color-success)' }}>
                    ${costs[costs.length - 1].toFixed(3)}
                </div>
                <div style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700 }}>COST PER TRANSACTION</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: '60px' }}>
                {costs.map((cost, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                        <div style={{
                            width: '100%',
                            height: `${(cost / Math.max(...costs)) * 100}%`,
                            background: i === costs.length - 1 ? 'var(--color-success)' : 'rgba(59, 130, 246, 0.6)',
                            borderRadius: '0.25rem 0.25rem 0 0',
                            minHeight: '10px'
                        }}></div>
                        <div style={{ fontSize: '0.5rem', opacity: 0.4 }}>{months[i]}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 21. Error Rate Trend
export const ErrorRateTrend = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const errorRates = [0.8, 0.6, 0.4, 0.3, 0.2, 0.15, 0.12]; // percentage

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 950, color: 'var(--color-success)' }}>
                    {errorRates[errorRates.length - 1]}%
                </div>
                <div style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700 }}>ERROR RATE</div>
            </div>
            <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="errorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--color-danger)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="var(--color-danger)" stopOpacity="0.05" />
                    </linearGradient>
                </defs>
                <polyline
                    points={errorRates.map((rate, i) => `${(i / (errorRates.length - 1)) * 200},${60 - (rate / Math.max(...errorRates)) * 50}`).join(' ')}
                    fill="url(#errorGradient)"
                    stroke="var(--color-danger)"
                    strokeWidth="2"
                />
            </svg>
        </div>
    );
};

// 22. Database Query Performance
export const QueryPerformance = () => {
    const queries = [
        { type: 'SELECT', avgMs: 12, color: '#10b981' },
        { type: 'INSERT', avgMs: 18, color: '#3b82f6' },
        { type: 'UPDATE', avgMs: 24, color: '#8b5cf6' },
        { type: 'DELETE', avgMs: 15, color: '#f59e0b' }
    ];
    const maxMs = Math.max(...queries.map(q => q.avgMs));

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '0.5rem 0' }}>
            {queries.map((query, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '60px', fontSize: '0.65rem', fontWeight: 800, opacity: 0.7 }}>{query.type}</div>
                    <div style={{ flex: 1, height: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', overflow: 'hidden' }}>
                        <div style={{
                            width: `${(query.avgMs / maxMs) * 100}%`,
                            height: '100%',
                            background: query.color,
                            borderRadius: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: '0.5rem'
                        }}>
                            <span style={{ fontSize: '0.6rem', fontWeight: 900, color: 'white' }}>{query.avgMs}ms</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// 23. Cache Hit Rate
export const CacheHitRate = ({ hitRate = 94.5 }: { hitRate?: number }) => {
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: 950, color: 'var(--primary)' }}>{hitRate}%</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.5, fontWeight: 700 }}>CACHE HIT RATE</div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-success)' }}>{hitRate}%</div>
                    <div style={{ fontSize: '0.6rem', opacity: 0.5 }}>Hits</div>
                </div>
                <div style={{ width: '1px', background: 'var(--card-border)' }}></div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-danger)' }}>{(100 - hitRate).toFixed(1)}%</div>
                    <div style={{ fontSize: '0.6rem', opacity: 0.5 }}>Misses</div>
                </div>
            </div>
        </div>
    );
};

// 24. Serverless Function Invocations
export const ServerlessInvocations = () => {
    const functions = [
        { name: 'auth', invocations: 45000, color: '#3b82f6' },
        { name: 'api', invocations: 38000, color: '#8b5cf6' },
        { name: 'webhook', invocations: 22000, color: '#10b981' },
        { name: 'cron', invocations: 1200, color: '#f59e0b' }
    ];
    const total = functions.reduce((sum, f) => sum + f.invocations, 0);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 950, color: 'var(--primary)' }}>
                    {(total / 1000).toFixed(0)}k
                </div>
                <div style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700 }}>TOTAL INVOCATIONS</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {functions.map((fn, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '50px', fontSize: '0.65rem', opacity: 0.7, fontWeight: 700 }}>{fn.name}</div>
                        <div style={{ flex: 1, height: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', overflow: 'hidden' }}>
                            <div style={{
                                width: `${(fn.invocations / total) * 100}%`,
                                height: '100%',
                                background: fn.color,
                                borderRadius: '0.5rem'
                            }}></div>
                        </div>
                        <div style={{ width: '40px', fontSize: '0.65rem', fontWeight: 900, textAlign: 'right' }}>
                            {(fn.invocations / 1000).toFixed(0)}k
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 25. Container Resource Efficiency
export const ContainerEfficiency = () => {
    const metrics = [
        { name: 'CPU Efficiency', value: 87, target: 85, color: '#10b981' },
        { name: 'Memory Efficiency', value: 82, target: 80, color: '#3b82f6' },
        { name: 'Network Efficiency', value: 91, target: 85, color: '#8b5cf6' }
    ];

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0.5rem 0' }}>
            {metrics.map((metric, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                        <span style={{ opacity: 0.7, fontWeight: 700 }}>{metric.name}</span>
                        <span style={{ fontWeight: 900, color: metric.value >= metric.target ? metric.color : 'var(--color-warning)' }}>
                            {metric.value}%
                        </span>
                    </div>
                    <div style={{ position: 'relative', height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', overflow: 'hidden' }}>
                        <div style={{
                            position: 'absolute',
                            left: `${metric.target}%`,
                            top: 0,
                            bottom: 0,
                            width: '2px',
                            background: 'rgba(255,255,255,0.3)',
                            zIndex: 2
                        }}></div>
                        <div style={{
                            width: `${metric.value}%`,
                            height: '100%',
                            background: metric.value >= metric.target ? metric.color : 'var(--color-warning)',
                            borderRadius: '1rem',
                            transition: 'width 0.5s ease',
                            zIndex: 1
                        }}></div>
                    </div>
                </div>
            ))}
        </div>
    );
};
