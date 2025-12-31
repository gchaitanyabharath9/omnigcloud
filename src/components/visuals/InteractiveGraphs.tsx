"use client";

import React from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
    Cell
} from 'recharts';
import NoSSR from './NoSSR';

const data = [
    { time: '00:00', aws: 45, azure: 52, oci: 38 },
    { time: '04:00', aws: 48, azure: 60, oci: 40 },
    { time: '08:00', aws: 65, azure: 75, oci: 42 },
    { time: '12:00', aws: 80, azure: 85, oci: 45 },
    { time: '16:00', aws: 70, azure: 65, oci: 41 },
    { time: '20:00', aws: 55, azure: 58, oci: 39 },
    { time: '23:59', aws: 42, azure: 50, oci: 37 },
];

export function PerformanceAreaChart() {
    return (
        <div style={{ width: '100%', height: 200 }}>
            <NoSSR>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorOci" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="time"
                            hide
                        />
                        <YAxis hide />
                        <Tooltip
                            contentStyle={{
                                background: 'var(--header-bg)',
                                border: '1px solid var(--card-border)',
                                borderRadius: '0.5rem',
                                fontSize: '0.75rem'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="oci"
                            stroke="var(--primary)"
                            fillOpacity={1}
                            fill="url(#colorOci)"
                            strokeWidth={3}
                        />
                        <Area
                            type="monotone"
                            dataKey="aws"
                            stroke="rgba(255,255,255,0.2)"
                            fill="transparent"
                            strokeWidth={1}
                            strokeDasharray="5 5"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </NoSSR>
        </div>
    );
}

export function ComplianceBarChart() {
    const barData = [
        { name: 'SOC2', value: 98, color: 'var(--color-success)' },
        { name: 'GDPR', value: 95, color: 'var(--primary)' },
        { name: 'HIPAA', value: 88, color: 'var(--color-warning)' },
        { name: 'ISO', value: 92, color: 'var(--color-success)' },
    ];

    return (
        <div style={{ width: '100%', height: 180 }}>
            <NoSSR>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} layout="vertical">
                        <XAxis type="number" hide domain={[0, 100]} />
                        <YAxis
                            dataKey="name"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
                            width={50}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{
                                background: 'var(--header-bg)',
                                border: '1px solid var(--card-border)',
                                borderRadius: '0.5rem',
                                fontSize: '0.75rem'
                            }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                            {barData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </NoSSR>
        </div>
    );
}
