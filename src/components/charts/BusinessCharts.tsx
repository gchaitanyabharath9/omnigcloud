// @ts-nocheck
"use client";

import NoSSR from '../visuals/NoSSR';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import ChartContainer from './ChartContainer';
import type { FunnelDataPoint, TimeSeriesDataPoint, MultiSeriesDataPoint } from './types';

// 11. Conversion Funnel
export const ConversionFunnelChart: React.FC<{ data: FunnelDataPoint[] }> = ({ data }) => (
    <ChartContainer
        title="Conversion Funnel"
        description="User journey from visitor to paid customer"
        badge="MARKETING"
    >
        <NoSSR>
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis type="number" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.75rem' }} />
                    <YAxis dataKey="stage" type="category" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.75rem' }} width={100} />
                    <Tooltip
                        contentStyle={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(96, 239, 255, 0.3)', borderRadius: '0.5rem' }}
                        formatter={(value: number, name: string, props: any) => [
                            `${value.toLocaleString()} (${props.payload.percentage}%)`,
                            'Count'
                        ]}
                    />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`hsl(${200 + index * 20}, 70%, 50%)`} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </NoSSR>
    </ChartContainer>
);

// 12. Sales Pipeline
export const PipelineChart: React.FC<{ data: FunnelDataPoint[] }> = ({ data }) => (
    <ChartContainer
        title="Sales Pipeline"
        description="Current sales funnel stages and conversion rates"
        badge="SALES"
    >
        <NoSSR>
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis type="number" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.75rem' }} />
                    <YAxis dataKey="stage" type="category" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.75rem' }} width={90} />
                    <Tooltip
                        contentStyle={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '0.5rem' }}
                        formatter={(value: number, name: string, props: any) => [
                            `${value.toLocaleString()} (${props.payload.percentage}%)`,
                            'Count'
                        ]}
                    />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`hsl(${120 - index * 15}, 70%, 50%)`} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </NoSSR>
    </ChartContainer>
);

// 13. Adoption Progress (Cumulative Line)
export const AdoptionProgressChart: React.FC<{ data: TimeSeriesDataPoint[] }> = ({ data }) => (
    <ChartContainer
        title="Cumulative Platform Adoption"
        description="Total active users over time"
        badge="GROWING"
    >
        <NoSSR>
            <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="adoptionGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="timestamp" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.75rem' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.75rem' }} />
                    <Tooltip
                        contentStyle={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '0.5rem' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#adoptionGradient)" />
                </AreaChart>
            </ResponsiveContainer>
        </NoSSR>
    </ChartContainer>
);

// 14. Revenue Projection (Sample Data)
export const RevenueProjectionChart: React.FC<{ data: MultiSeriesDataPoint[] }> = ({ data }) => (
    <ChartContainer
        title="ARR Growth Projection"
        description="Historical and projected annual recurring revenue (illustrative)"
        badge="FORECAST"
    >
        <NoSSR>
            <ResponsiveContainer width="100%" height={280}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="timestamp" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.75rem' }} />
                    <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.75rem' }} />
                    <Tooltip
                        contentStyle={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '0.5rem' }}
                        formatter={(value: number) => `$${(value / 1000000).toFixed(1)}M`}
                    />
                    <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} name="Actual" />
                    <Line type="monotone" dataKey="projected" stroke="#60efff" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 5 }} name="Projected" />
                </LineChart>
            </ResponsiveContainer>
        </NoSSR>
    </ChartContainer>
);

// 15. Availability/Uptime Trend
export const AvailabilityChart: React.FC<{ data: TimeSeriesDataPoint[] }> = ({ data }) => (
    <ChartContainer
        title="System Availability"
        description="30-day uptime percentage (target: 99.9%)"
        badge="99.95%"
    >
        <NoSSR>
            <ResponsiveContainer width="100%" height={280}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="timestamp" stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.75rem' }} />
                    <YAxis domain={[99.5, 100]} stroke="rgba(255,255,255,0.5)" style={{ fontSize: '0.75rem' }} />
                    <Tooltip
                        contentStyle={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '0.5rem' }}
                        formatter={(value: number) => `${value.toFixed(3)}%`}
                    />
                    <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </NoSSR>
    </ChartContainer>
);
