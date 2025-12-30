"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Activity, Server, ShieldAlert, Globe, Radio, Cpu, Share2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Dynamic imports for charts
const LatencyChart = dynamic(() => import('../../charts/MetricsCharts').then(mod => mod.LatencyChart), { ssr: false, loading: () => <ChartSkeleton /> });
const RpsChart = dynamic(() => import('../../charts/MetricsCharts').then(mod => mod.RpsChart), { ssr: false, loading: () => <ChartSkeleton /> });
const ErrorRateChart = dynamic(() => import('../../charts/MetricsCharts').then(mod => mod.ErrorRateChart), { ssr: false, loading: () => <ChartSkeleton /> });

function ChartSkeleton() {
    return <div className="w-full h-full bg-slate-800/20 animate-pulse rounded-xl" />;
}

// Visual Component: Abstract Global Network Topology
const GlobalTopology = () => {
    return (
        <div className="relative w-full h-full min-h-[400px] flex items-center justify-center select-none overflow-hidden rounded-3xl bg-slate-950 border border-slate-800/50 group">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

            {/* Radar Sweep Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-[scan_4s_linear_infinite]" />

            {/* Central Node (HQ) */}
            <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 blur-[40px] opacity-20 rounded-full animate-pulse" />
                    <div className="w-24 h-24 rounded-full border border-blue-500/30 bg-slate-900/80 flex items-center justify-center backdrop-blur-sm relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                        <Globe className="w-10 h-10 text-blue-400 animate-[spin_10s_linear_infinite]" />
                    </div>
                    {/* Orbiting particles */}
                    <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)] -translate-x-1/2 -translate-y-1/2" />
                    </div>
                </div>
                <div className="mt-6 flex flex-col items-center gap-1">
                    <span className="text-sm font-bold text-slate-200 tracking-widest uppercase">Global Mesh</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20 animate-pulse">
                        SYSTEM OPTIMAL
                    </span>
                </div>
            </div>

            {/* Connecting Nodes (Decorative) */}
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-3 h-3 bg-slate-800 border border-slate-600 rounded-full"
                    style={{
                        top: `${50 + 35 * Math.sin(i * (Math.PI / 3))}%`,
                        left: `${50 + 35 * Math.cos(i * (Math.PI / 3))}%`,
                    }}
                >
                    <div className="absolute inset-0 bg-blue-400/50 rounded-full animate-ping" style={{ animationDuration: `${2 + i}s` }} />
                    {/* Connecting Lines */}
                    <div
                        className="absolute top-1/2 left-1/2 h-[1px] bg-gradient-to-r from-blue-500/20 to-transparent origin-left -z-10"
                        style={{
                            width: '150px',
                            transform: `rotate(${i * 60 + 180}deg)`,
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default function AnalyticsSection() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        // Generate mock historical data
        const now = new Date();
        const history = Array.from({ length: 20 }).map((_, i) => {
            const time = new Date(now.getTime() - (20 - i) * 60000);
            return {
                time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                p50: Math.floor(Math.random() * 20 + 20),
                p99: Math.floor(Math.random() * 50 + 80),
                rps: Math.floor(Math.random() * 500 + 1500),
                errorRate: Number((Math.random() * 0.02).toFixed(4))
            };
        });
        setData(history);

        const interval = setInterval(() => {
            setData(prev => {
                const nextTime = new Date();
                const newEntry = {
                    time: nextTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    p50: Math.floor(Math.random() * 20 + 20),
                    p99: Math.floor(Math.random() * 50 + 80),
                    rps: Math.floor(Math.random() * 500 + 1500),
                    errorRate: Number((Math.random() * 0.02).toFixed(4))
                };
                return [...prev.slice(1), newEntry];
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 bg-slate-950 border-t border-b border-white/5 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            <div className="container mx-auto px-6">

                {/* Section Header */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                            <Radio size={14} className="animate-pulse" /> Live Telemetry
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
                            Global Control Plane
                        </h2>
                        <p className="text-slate-400 max-w-xl text-lg">
                            Real-time observability across 32 sovereign regions.
                            Active monitoring of p99 latency, partition tolerance, and throughput.
                        </p>
                    </div>
                    {/* Summary Stats Badges */}
                    <div className="flex gap-4">
                        <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center">
                            <span className="text-xs text-slate-500 uppercase font-bold">Regions</span>
                            <span className="text-xl font-mono text-white">32</span>
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center">
                            <span className="text-xs text-slate-500 uppercase font-bold">Uptime</span>
                            <span className="text-xl font-mono text-emerald-400">99.99%</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    {/* Left Column: Visual Diagram (4 Cols) */}
                    <div className="lg:col-span-5 xl:col-span-4 h-full min-h-[400px]">
                        <GlobalTopology />
                    </div>

                    {/* Right Column: Metrics Cards (8 Cols) */}
                    <div className="lg:col-span-7 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Latency Card - Spans 2 cols on md */}
                        <div className="md:col-span-2 glass-panel p-6 bg-slate-900/40 border border-slate-800 rounded-3xl flex flex-col h-[300px] hover:border-slate-700 transition-colors">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="font-bold text-slate-200 flex items-center gap-2 text-lg">
                                        <Activity size={20} className="text-blue-400" /> Global Latency
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1">Aggregated p50/p99 across all edge nodes.</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-mono text-white font-bold">{data.length > 0 ? data[data.length - 1].p50 : '--'}</span>
                                    <span className="text-xs text-slate-500 ml-1">ms</span>
                                </div>
                            </div>
                            <div className="flex-grow w-full relative">
                                <LatencyChart data={data} />
                            </div>
                        </div>

                        {/* RPS Card */}
                        <div className="glass-panel p-6 bg-slate-900/40 border border-slate-800 rounded-3xl flex flex-col h-[280px] hover:border-slate-700 transition-colors">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-200 flex items-center gap-2">
                                    <Server size={18} className="text-violet-400" /> Throughput
                                </h3>
                                <span className="text-xs font-mono text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded">RPS</span>
                            </div>
                            <div className="flex-grow w-full relative">
                                <RpsChart data={data} />
                            </div>
                        </div>

                        {/* Error Rate Card */}
                        <div className="glass-panel p-6 bg-slate-900/40 border border-slate-800 rounded-3xl flex flex-col h-[280px] hover:border-slate-700 transition-colors">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-200 flex items-center gap-2">
                                    <ShieldAlert size={18} className="text-emerald-400" /> Error Rate
                                </h3>
                                <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">%</span>
                            </div>
                            <div className="flex-grow w-full relative">
                                <ErrorRateChart data={data} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

