"use client";
// @ts-nocheck

import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import NoSSR from '../visuals/NoSSR';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

// Container wrapper
const ChartCard = ({ title, children, height = 180 }: { title: string; children: React.ReactNode; height?: number }) => (
    <div className="glass-panel p-3 rounded-xl">
        <h3 className="text-xs font-black mb-2 uppercase opacity-60 letter-spacing-wider">{title}</h3>
        <div style={{ width: '100%', height }}>
            {children}
        </div>
    </div>
);

// 1. Simple Line Chart - Latency
export const LatencyLineChart = ({ height = 180 }: { height?: number }) => {
    const data = Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        p50: Math.random() * 20 + 10,
        p95: Math.random() * 50 + 40,
        p99: Math.random() * 100 + 80
    }));

    return (
        <ChartCard title="API Latency (ms)" height={height}>
            <NoSSR>
                <ResponsiveContainer width="99%" height="100%" minWidth={0} debounce={200}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="hour" stroke="#888" style={{ fontSize: '10px' }} />
                        <YAxis stroke="#888" style={{ fontSize: '10px' }} />
                        <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155' }} />
                        <Legend wrapperStyle={{ whiteSpace: 'nowrap' }} />
                        <Line type="monotone" dataKey="p50" stroke="#10b981" strokeWidth={2} />
                        <Line type="monotone" dataKey="p95" stroke="#f59e0b" strokeWidth={2} />
                        <Line type="monotone" dataKey="p99" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </NoSSR>
        </ChartCard>
    );
};

// 2. Area Chart - Cost Savings
export const CostSavingsArea = ({ height = 180 }: { height?: number }) => {
    const data = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => ({
        month,
        traditional: 35000 + i * 800,
        optimized: 15000 + i * 500,
    }));

    return (
        <ChartCard title="Monthly Cost Comparison ($)" height={height}>
            <NoSSR>
                <ResponsiveContainer width="99%" height="100%" minWidth={0} debounce={200}>
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="month" stroke="#888" style={{ fontSize: '10px' }} />
                        <YAxis stroke="#888" style={{ fontSize: '10px' }} />
                        <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155' }} />
                        <Legend />
                        <Area type="monotone" dataKey="traditional" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="optimized" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    </AreaChart>
                </ResponsiveContainer>
            </NoSSR>
        </ChartCard>
    );
};

// 3. Bar Chart - Request Volume
export const RequestVolumeBar = ({ height = 180 }: { height?: number }) => {
    const data = Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        requests: Math.floor(Math.random() * 2000 + 500) * (i >= 9 && i <= 17 ? 2 : 1)
    }));

    return (
        <ChartCard title="Hourly Request Volume" height={height}>
            <NoSSR>
                <ResponsiveContainer width="99%" height="100%" minWidth={0} debounce={200}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="hour" stroke="#888" style={{ fontSize: '10px' }} />
                        <YAxis stroke="#888" style={{ fontSize: '10px' }} />
                        <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155' }} />
                        <Bar dataKey="requests" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </NoSSR>
        </ChartCard>
    );
};

// 4. Pie Chart - Cloud Distribution
export const CloudDistributionPie = ({ height = 180 }: { height?: number }) => {
    const data = [
        { name: 'AWS', value: 42 },
        { name: 'Azure', value: 28 },
        { name: 'GCP', value: 18 },
        { name: 'OCI', value: 12 }
    ];

    return (
        <ChartCard title="Multi-Cloud Distribution (%)" height={height}>
            <NoSSR>
                <ResponsiveContainer width="99%" height="100%" minWidth={0} debounce={200}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(entry) => `${entry.name}: ${entry.value}%`}
                            outerRadius={height < 150 ? 45 : 70}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155' }} />
                    </PieChart>
                </ResponsiveContainer>
            </NoSSR>
        </ChartCard>
    );
};

// 5. Line Chart - Uptime
export const UptimeTrend = ({ height = 180 }: { height?: number }) => {
    const data = Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        uptime: 99.8 + Math.random() * 0.19
    }));

    return (
        <ChartCard title="30-Day Uptime (%)" height={height}>
            <NoSSR>
                <ResponsiveContainer width="99%" height="100%" minWidth={0} debounce={200}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="day" stroke="#888" style={{ fontSize: '10px' }} />
                        <YAxis domain={[99.5, 100]} stroke="#888" style={{ fontSize: '10px' }} />
                        <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155' }} />
                        <Line type="monotone" dataKey="uptime" stroke="#10b981" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </NoSSR>
        </ChartCard>
    );
};

// 6. Bar Chart - Compliance Scores
export const ComplianceScoresBar = ({ height = 180 }: { height?: number }) => {
    const data = [
        { name: 'SOC 2', score: 98 },
        { name: 'GDPR', score: 95 },
        { name: 'HIPAA', score: 92 },
        { name: 'ISO 27001', score: 96 }
    ];

    return (
        <ChartCard title="Compliance Framework Scores" height={height}>
            <NoSSR>
                <ResponsiveContainer width="99%" height="100%" minWidth={0} debounce={200}>
                    <BarChart data={data} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis type="number" domain={[0, 100]} stroke="#888" hide={height < 150} style={{ fontSize: '10px' }} />
                        <YAxis dataKey="name" type="category" stroke="#888" width={100} style={{ fontSize: '10px' }} />
                        <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155' }} />
                        <Bar dataKey="score" radius={[0, 8, 8, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </NoSSR>
        </ChartCard>
    );
};

// 7. Area Chart - Error Rate
export const ErrorRateArea = ({ height = 180 }: { height?: number }) => {
    const data = Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        errors: Math.max(0.1, 2 - (i * 0.05))
    }));

    return (
        <ChartCard title="Error Rate Trend (%)" height={height}>
            <NoSSR>
                <ResponsiveContainer width="99%" height="100%" minWidth={0} debounce={200}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="errorGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="day" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155' }} />
                        <Area type="monotone" dataKey="errors" stroke="#ef4444" fill="url(#errorGrad)" />
                    </AreaChart>
                </ResponsiveContainer>
            </NoSSR>
        </ChartCard>
    );
};

// 8. Bar Chart - Feature Usage
export const FeatureUsageBar = ({ height = 180 }: { height?: number }) => {
    const data = [
        { feature: 'Multi-Cloud', usage: 85 },
        { feature: 'Auto-Scaling', usage: 72 },
        { feature: 'Cost Optimization', usage: 91 },
        { feature: 'Security Scanning', usage: 68 }
    ];

    return (
        <ChartCard title="Feature Adoption Rate (%)" height={height}>
            <NoSSR>
                <ResponsiveContainer width="99%" height="100%" minWidth={0} debounce={200}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="feature" stroke="#888" />
                        <YAxis domain={[0, 100]} stroke="#888" />
                        <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155' }} />
                        <Bar dataKey="usage" radius={[8, 8, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </NoSSR>
        </ChartCard>
    );
};
