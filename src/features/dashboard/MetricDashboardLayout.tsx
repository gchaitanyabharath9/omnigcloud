"use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface MetricDashboardLayoutProps {
    title: string;
    subtitle: string;
    mainVisual: React.ReactNode;
    stats: { label: string; value: string; trend?: string; trendUp?: boolean }[];
    analysis: string;
    secondaryVisual: React.ReactNode;
}

import { useTranslations } from 'next-intl';
import { tSafe } from '@/lib/i18n/tSafe';
import { DemoBadge } from '@/components/demo/DemoBadge';

export default function MetricDashboardLayout({
    title,
    subtitle,
    mainVisual,
    stats,
    analysis,
    secondaryVisual
}: MetricDashboardLayoutProps) {
    const t = useTranslations('Dashboard.Charts');

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-auto">
            {/* QUADRANT 1: Main Visual (Top-Left) */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-75">
                    <DemoBadge label={tSafe(t, 'liveView', 'Live View')} />
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-black tracking-tight text-foreground">{title}</h2>
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                </div>
                <div className="flex-1 flex items-center justify-center min-h-[250px]">
                    {mainVisual}
                </div>
            </div>

            {/* QUADRANT 2: Key Stats (Top-Right) */}
            <div className="grid grid-rows-2 gap-4">
                {/* Top Half of Right Col: Big Stats */}
                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-center">
                    <div className="grid grid-cols-2 gap-4 h-full">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white/5 rounded-xl p-4 flex flex-col justify-center border border-white/5 hover:bg-white/10 transition-colors">
                                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">{stat.label}</span>
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-mono font-bold text-foreground leading-none">{stat.value}</span>
                                    {stat.trend && (
                                        <span className={`text-xs font-bold mb-1 ${stat.trendUp ? 'text-emerald-400' : 'text-rose-400'} flex items-center`}>
                                            {stat.trendUp ? '↑' : '↓'} {stat.trend}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Half of Right Col: Analysis Text */}
                <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-primary/5 to-transparent flex flex-col justify-center relative overflow-hidden text-balance">
                    <div className="absolute top-4 left-4">
                        <ArrowUpRight className="text-primary/50" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2 pl-8">{tSafe(t, 'aiAnalysis', 'AI Analysis')}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed pl-8 border-l-2 border-primary/20">
                        {analysis}
                    </p>
                </div>
            </div>

            {/* QUADRANT 3: Secondary Visual (Bottom-Left) */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col min-h-[300px]">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-muted-foreground">{tSafe(t, 'historicalTrend', 'Historical Trend')}</span>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center relative overflow-hidden rounded-xl bg-white/5">
                    {/* Overlay for "Deep Dive" feel */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                    {secondaryVisual}
                </div>
            </div>

            {/* QUADRANT 4: Logs / Details (Bottom-Right) */}
            <div className="glass-panel p-0 rounded-2xl flex flex-col overflow-hidden min-h-[300px]">
                <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">{tSafe(t, 'systemLogs', 'System Logs')}</span>
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500/20" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                        <div className="w-2 h-2 rounded-full bg-green-500/20" />
                    </div>
                </div>
                <div className="flex-1 p-4 font-mono text-xs text-muted-foreground/70 overflow-hidden relative">
                    <div className="absolute inset-0 p-4 space-y-2">
                        <div className="flex gap-2"><span className="text-blue-400">INFO</span> <span>[Orchestrator] Optimizing bin packing for region us-east-1...</span></div>
                        <div className="flex gap-2"><span className="text-emerald-400">SUCCESS</span> <span>Rebalanced 4 nodes. Savings: $4.20/hr</span></div>
                        <div className="flex gap-2"><span className="text-blue-400">INFO</span> <span>Telemetry stream synced. Latency: 12ms</span></div>
                        <div className="flex gap-2"><span className="text-purple-400">DEBUG</span> <span>Checking compliance policies for new buckets...</span></div>
                        <div className="flex gap-2"><span className="text-emerald-400">PASS</span> <span>SOC2 Control 4.1 verified.</span></div>
                        <div className="flex gap-2"><span className="text-blue-400">INFO</span> <span>Scaling event triggered by load predictor.</span></div>
                    </div>
                    {/* Fade out bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent" />
                </div>
            </div>
        </div>
    );
}
