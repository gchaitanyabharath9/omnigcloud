// @ts-nocheck
"use client";
import NoSSR from '../visuals/NoSSR';

import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartContainer from './ChartContainer';
import type { MultiSeriesDataPoint, TimeSeriesDataPoint } from './types';

// 1. Latency Chart (p50, p95, p99)
export const LatencyChart: React.FC<{ data: MultiSeriesDataPoint[] }> = ({ data }) => (
    <ChartContainer
        title="API Latency Distribution"
        description="P50, P95, and P99 latency metrics over 24 hours"
        badge="LIVE"
    >
        <NoSSR>
            <ResponsiveContainer width="100%" height={280}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="timestamp" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.75rem' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.75rem' }} />
                    <Tooltip
                        contentStyle={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(96, 239, 255, 0.3)', borderRadius: '0.5rem' }}
                        labelStyle={{ color: '#60efff' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '0.75rem' }} />
                    <Line type="monotone" dataKey="p50" stroke="#10b981" strokeWidth={2} dot={false} name="P50" />
                    <Line type="monotone" dataKey="p95" stroke="#f59e0b" strokeWidth={2} dot={false} name="P95" />
                    <Line type="monotone" dataKey="p99" stroke="#ef4444" strokeWidth={2} dot={false} name="P99" />
                </LineChart>
            </ResponsiveContainer>
        </NoSSR>
    </ChartContainer>
);

// 2. Error Rate Trend
export const ErrorRateChart: React.FC<{ data: TimeSeriesDataPoint[] }> = ({ data }) => (
    <ChartContainer
        title="Error Rate Trend"
        description="30-day error rate showing improvement over time"
        badge="DECREASING"
    >
        <NoSSR>
            <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="errorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="timestamp" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.75rem' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.75rem' }} />
                    <Tooltip
                        contentStyle={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.5rem' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#errorGradient)" />
                </AreaChart>
            </ResponsiveContainer>
        </NoSSR>
    </ChartContainer>
);

// 3. Throughput/Request Volume
export const ThroughputChart: React.FC<{ data: TimeSeriesDataPoint[] }> = ({ data }) => (
    <ChartContainer
        title="Request Volume"
        description="Hourly request throughput with peak hour detection"
        badge="REAL-TIME"
    >
        <NoSSR>
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="timestamp" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.75rem' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.75rem' }} />
                    <Tooltip
                        contentStyle={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '0.5rem' }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </NoSSR>
    </ChartContainer>
);

// 4. Cost Savings Projection
export const CostSavingsChart: React.FC<{ data: MultiSeriesDataPoint[] }> = ({ data }) => (
    <ChartContainer
        title="Cost Comparison: Traditional vs OmniGCloud"
        description="Monthly infrastructure costs showing significant savings"
        badge="PROJECTED"
    >
        <NoSSR>
            <ResponsiveContainer width="100%" height={280}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="timestamp" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.75rem' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.75rem' }} />
                    <Tooltip
                        contentStyle={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '0.5rem' }}
                        formatter={(value?: number) => value ? `$${value.toLocaleString()}` : ''}
                    />
                    <Legend wrapperStyle={{ fontSize: '0.75rem' }} />
                    <Line type="monotone" dataKey="traditional" stroke="#ef4444" strokeWidth={2} dot={false} name="Traditional" />
                    <Line type="monotone" dataKey="withOmniGCloud" stroke="#10b981" strokeWidth={2} dot={false} name="With OmniGCloud" />
                </LineChart>
            </ResponsiveContainer>
        </NoSSR>
    </ChartContainer>
);

// 5. SLA Compliance
export const SLAComplianceChart: React.FC<{ data: TimeSeriesDataPoint[] }> = ({ data }) => (
    <ChartContainer
        title="SLA Compliance"
        description="Weekly SLA adherence tracking (target: 99.9%)"
        badge="✓ COMPLIANT"
    >
        <NoSSR>
            <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="slaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="timestamp" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.75rem' }} />
                    <YAxis domain={[99, 100]} stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.75rem' }} />
                    <Tooltip
                        contentStyle={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '0.5rem' }}
                        formatter={(value?: number) => value ? `${value.toFixed(2)}%` : ''}
                    />
                    <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#slaGradient)" />
                </AreaChart>
            </ResponsiveContainer>
        </NoSSR>
    </ChartContainer>
);
