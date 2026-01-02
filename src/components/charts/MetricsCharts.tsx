"use client";

import NoSSR from '../visuals/NoSSR';
import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line
} from 'recharts';

const themeColors = {
    primary: '#3b82f6', // blue-500
    secondary: '#8b5cf6', // violet-500
    success: '#10b981', // emerald-500
    warning: '#f59e0b', // amber-500
    danger: '#ef4444', // red-500
    grid: 'rgba(255,255,255,0.1)',
    text: '#94a3b8' // slate-400
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl shadow-black/50 backdrop-blur-md">
                <p className="text-slate-300 text-xs mb-1 font-mono">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm font-bold" style={{ color: entry.color }}>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        {entry.name}: {entry.value}
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export function LatencyChart({ data }: { data: any[] }) {
    return (
        <div className="w-full h-full min-w-[1px] relative overflow-hidden">
            <NoSSR>
                <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={themeColors.primary} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={themeColors.primary} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={themeColors.grid} vertical={false} />
                        <XAxis
                            dataKey="time"
                            stroke={themeColors.text}
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke={themeColors.text}
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            unit="ms"
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: themeColors.grid, strokeWidth: 1 }} />
                        <Area
                            type="monotone"
                            dataKey="p99"
                            name="P99 Latency"
                            stroke={themeColors.danger}
                            fill="none"
                            strokeWidth={2}
                        />
                        <Area
                            type="monotone"
                            dataKey="p50"
                            name="P50 Latency"
                            stroke={themeColors.primary}
                            fill="url(#colorLatency)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </NoSSR>
        </div>
    );
}

export function RpsChart({ data }: { data: any[] }) {
    return (
        <div className="w-full h-full min-w-[1px] relative overflow-hidden">
            <NoSSR>
                <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
                    <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={themeColors.grid} vertical={false} />
                        <XAxis
                            dataKey="time"
                            stroke={themeColors.text}
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke={themeColors.text}
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                        <Bar
                            dataKey="rps"
                            name="Requests/sec"
                            fill={themeColors.secondary}
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </NoSSR>
        </div>
    );
}

export function ErrorRateChart({ data }: { data: any[] }) {
    return (
        <div className="w-full h-full min-w-[1px] relative overflow-hidden">
            <NoSSR>
                <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
                    <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={themeColors.grid} vertical={false} />
                        <XAxis
                            dataKey="time"
                            stroke={themeColors.text}
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke={themeColors.text}
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            unit="%"
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="stepAfter"
                            dataKey="errorRate"
                            name="Error Rate"
                            stroke={themeColors.success}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </NoSSR>
        </div>
    );
}
