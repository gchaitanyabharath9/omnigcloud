"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Activity, Server, ShieldAlert } from 'lucide-react';

const LatencyChart = dynamic(() => import('../../charts/MetricsCharts').then(mod => mod.LatencyChart), { ssr: false, loading: () => <ChartSkeleton /> });
const RpsChart = dynamic(() => import('../../charts/MetricsCharts').then(mod => mod.RpsChart), { ssr: false, loading: () => <ChartSkeleton /> });
const ErrorRateChart = dynamic(() => import('../../charts/MetricsCharts').then(mod => mod.ErrorRateChart), { ssr: false, loading: () => <ChartSkeleton /> });

function ChartSkeleton() {
    return <div className="w-full h-full bg-slate-800/20 animate-pulse rounded-xl" />;
}

export default function SecurityPerformanceSection() {
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
        <section className="glass-panel p-8 rounded-xl mb-8">
            <h2 className="text-3xl font-bold mb-6">Real-Time Threat Latency</h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-8">
                Monitoring global ingress points for anomalous latency spikes indicating DDoS or probing attacks.
            </p>

            <div className="grid md:grid-cols-2 gap-6 h-auto">
                {/* Latency Card */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 flex flex-col min-h-[350px] min-w-0">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-200 flex items-center gap-2">
                            <Activity size={18} className="text-blue-400" /> Cleaning Latency
                        </h3>
                        <span className="text-xs font-mono text-slate-500">Live</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <LatencyChart data={data} />
                    </div>
                </div>

                {/* Error Rate Card */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 flex flex-col min-h-[350px] min-w-0">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-200 flex items-center gap-2">
                            <ShieldAlert size={18} className="text-red-400" /> WAF Block Rate
                        </h3>
                        <span className="text-xs font-mono text-slate-500">SLA Monitor</span>
                    </div>
                    <div className="flex-grow">
                        <ErrorRateChart data={data} />
                    </div>
                </div>
            </div>
        </section>
    );
}
