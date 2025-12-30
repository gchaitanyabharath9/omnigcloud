"use client";

import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Zap, Clock, Shield, Database, Activity } from 'lucide-react';

// 1. Cost Savings Over Time (Line Chart)
export const CostSavingsChart = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const savings = [12000, 18500, 24000, 31000, 38500, 45000];
    const maxSaving = Math.max(...savings);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '0.5rem', padding: '1rem 0' }}>
                {savings.map((val, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                            width: '100%',
                            height: `${(val / maxSaving) * 100}%`,
                            background: 'linear-gradient(180deg, var(--primary) 0%, var(--color-accent-purple) 100%)',
                            borderRadius: '0.5rem 0.5rem 0 0',
                            position: 'relative',
                            minHeight: '20px',
                            transition: 'all 0.3s ease'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '-1.5rem',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                fontSize: '0.65rem',
                                fontWeight: 800,
                                color: 'var(--primary)',
                                whiteSpace: 'nowrap'
                            }}>
                                ${(val / 1000).toFixed(0)}k
                            </div>
                        </div>
                        <div style={{ fontSize: '0.6rem', opacity: 0.5, fontWeight: 700 }}>{months[i]}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 2. ROI Gauge
export const ROIGauge = ({ value = 342 }: { value?: number }) => {
    const percentage = Math.min(value / 500 * 100, 100);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <svg width="180" height="180" viewBox="0 0 180 180">
                <circle cx="90" cy="90" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                <circle
                    cx="90"
                    cy="90"
                    r="70"
                    fill="none"
                    stroke="url(#roiGradient)"
                    strokeWidth="12"
                    strokeDasharray={`${2 * Math.PI * 70 * (percentage / 100)} ${2 * Math.PI * 70}`}
                    strokeLinecap="round"
                    transform="rotate(-90 90 90)"
                />
                <defs>
                    <linearGradient id="roiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--primary)" />
                        <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                </defs>
            </svg>
            <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 950, color: 'var(--primary)' }}>{value}%</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>ROI</div>
            </div>
        </div>
    );
};

// 3. Infrastructure Cost Breakdown (Donut Chart)
export const CostBreakdownDonut = () => {
    const segments = [
        { label: 'Compute', value: 45, color: '#3b82f6' },
        { label: 'Storage', value: 25, color: '#8b5cf6' },
        { label: 'Network', value: 20, color: '#10b981' },
        { label: 'Other', value: 10, color: '#f59e0b' }
    ];

    let currentAngle = 0;
    const radius = 60;
    const centerX = 90;
    const centerY = 90;

    const createArc = (startAngle: number, endAngle: number) => {
        const start = polarToCartesian(centerX, centerY, radius, endAngle);
        const end = polarToCartesian(centerX, centerY, radius, startAngle);
        const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
        return `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
    };

    const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
        const rad = (angle - 90) * Math.PI / 180;
        return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
            <svg width="180" height="180" viewBox="0 0 180 180">
                <circle cx="90" cy="90" r="35" fill="var(--bg-surface-2)" />
                {segments.map((seg, i) => {
                    const angle = (seg.value / 100) * 360;
                    const path = createArc(currentAngle, currentAngle + angle);
                    currentAngle += angle;
                    return <path key={i} d={path} fill={seg.color} opacity="0.8" />;
                })}
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {segments.map((seg, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: seg.color }}></div>
                        <span style={{ opacity: 0.7 }}>{seg.label}</span>
                        <span style={{ fontWeight: 800, marginLeft: 'auto' }}>{seg.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 4. Response Time Trend
export const ResponseTimeTrend = () => {
    const data = [45, 38, 42, 35, 32, 28, 25, 23, 22, 20];
    const max = Math.max(...data);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', gap: '0.25rem', padding: '1rem 0' }}>
            {data.map((val, i) => (
                <div key={i} style={{
                    flex: 1,
                    height: `${(val / max) * 100}%`,
                    background: i === data.length - 1 ? 'var(--color-success)' : 'rgba(255,255,255,0.1)',
                    borderRadius: '0.25rem',
                    minHeight: '10px',
                    transition: 'all 0.3s ease'
                }}></div>
            ))}
        </div>
    );
};

// 5. Uptime Percentage Ring
export const UptimeRing = ({ uptime = 99.99 }: { uptime?: number }) => {
    const percentage = uptime;
    const circumference = 2 * Math.PI * 65;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <svg width="160" height="160" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="65" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                <circle
                    cx="80"
                    cy="80"
                    r="65"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 80 80)"
                />
            </svg>
            <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 950, color: '#10b981' }}>{uptime}%</div>
                <div style={{ fontSize: '0.65rem', opacity: 0.5, fontWeight: 700 }}>UPTIME</div>
            </div>
        </div>
    );
};

// 6. Resource Utilization Bars
export const ResourceUtilization = () => {
    const resources = [
        { name: 'CPU', value: 68, color: '#3b82f6' },
        { name: 'Memory', value: 54, color: '#8b5cf6' },
        { name: 'Disk', value: 42, color: '#10b981' },
        { name: 'Network', value: 31, color: '#f59e0b' }
    ];

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '0.5rem 0' }}>
            {resources.map((res, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                        <span style={{ opacity: 0.7, fontWeight: 700 }}>{res.name}</span>
                        <span style={{ fontWeight: 900, color: res.color }}>{res.value}%</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', overflow: 'hidden' }}>
                        <div style={{
                            width: `${res.value}%`,
                            height: '100%',
                            background: res.color,
                            borderRadius: '1rem',
                            transition: 'width 0.5s ease'
                        }}></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// 7. Deployment Frequency
export const DeploymentFrequency = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const deploys = [12, 18, 15, 22, 19, 8, 5];
    const max = Math.max(...deploys);

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', gap: '0.5rem', padding: '1rem 0' }}>
            {deploys.map((val, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                        width: '100%',
                        height: `${(val / max) * 100}%`,
                        background: i >= 5 ? 'rgba(139, 92, 246, 0.6)' : 'var(--primary)',
                        borderRadius: '0.5rem 0.5rem 0 0',
                        minHeight: '15px',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '-1.25rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: '0.6rem',
                            fontWeight: 800,
                            opacity: 0.8
                        }}>
                            {val}
                        </div>
                    </div>
                    <div style={{ fontSize: '0.55rem', opacity: 0.5, fontWeight: 700 }}>{days[i]}</div>
                </div>
            ))}
        </div>
    );
};

// 8. Security Score Meter
export const SecurityScoreMeter = ({ score = 94 }: { score?: number }) => {
    const getColor = (s: number) => {
        if (s >= 90) return '#10b981';
        if (s >= 70) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: 950, color: getColor(score) }}>{score}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>Security Score</div>
            </div>
            <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', overflow: 'hidden' }}>
                <div style={{
                    width: `${score}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${getColor(score)} 0%, ${getColor(score)}dd 100%)`,
                    borderRadius: '1rem'
                }}></div>
            </div>
        </div>
    );
};
