"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Activity, Server, ShieldAlert } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Dynamic imports for charts to reduce initial JS load
const LatencyChart = dynamic(() => import('../../charts/MetricsCharts').then(mod => mod.LatencyChart), { ssr: false, loading: () => <ChartSkeleton /> });
const RpsChart = dynamic(() => import('../../charts/MetricsCharts').then(mod => mod.RpsChart), { ssr: false, loading: () => <ChartSkeleton /> });
const ErrorRateChart = dynamic(() => import('../../charts/MetricsCharts').then(mod => mod.ErrorRateChart), { ssr: false, loading: () => <ChartSkeleton /> });

function ChartSkeleton() {
    return <div className="w-full h-full bg-slate-800/20 animate-pulse rounded-xl" />;
}

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
                const last = prev[prev.length - 1];
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
        <section className="py-24 bg-slate-950/50 border-t border-b border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                            <Activity size={14} /> Live Telemetry
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                            Global Control Plane Status
                        </h2>
                        <p className="text-slate-400 max-w-xl">
                            Real-time observability across 32 sovereign regions.
                            Aggregated p99 latency and throughput metrics.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-auto">
                    {/* Latency Card */}
                    <div className="glass-panel p-6 bg-slate-900/40 border-slate-800 flex flex-col h-[400px]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-200 flex items-center gap-2">
                                <Activity size={18} className="text-blue-400" /> Latency (ms)
                            </h3>
                            <span className="text-xs font-mono text-slate-500">Global Agg.</span>
                        </div>
                        <div className="flex-grow">
                            <LatencyChart data={data} />
                        </div>
                    </div>

                    {/* RPS Card */}
                    <div className="glass-panel p-6 bg-slate-900/40 border-slate-800 flex flex-col h-[400px]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-200 flex items-center gap-2">
                                <Server size={18} className="text-violet-400" /> Throughput (RPS)
                            </h3>
                            <span className="text-xs font-mono text-slate-500">Live Ingress</span>
                        </div>
                        <div className="flex-grow">
                            <RpsChart data={data} />
                        </div>
                    </div>

                    {/* Error Rate Card */}
                    <div className="glass-panel p-6 bg-slate-900/40 border-slate-800 flex flex-col h-[400px]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-200 flex items-center gap-2">
                                <ShieldAlert size={18} className="text-emerald-400" /> Error Rate (%)
                            </h3>
                            <span className="text-xs font-mono text-slate-500">SLA Monitor</span>
                        </div>
                        <div className="flex-grow">
                            <ErrorRateChart data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
