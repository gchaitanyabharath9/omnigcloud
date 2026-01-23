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
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 auto-rows-auto">
            {/* QUADRANT 1: Main Visual (Top-Left) */}
            <div className="glass-panel p-4 rounded-xl flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-75">
                    <DemoBadge label={tSafe(t, 'liveView', 'Live View')} />
                </div>
                <div className="mb-2">
                    <h2 className="text-lg font-black tracking-tight text-foreground">{title}</h2>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-tight opacity-70">{subtitle}</p>
                </div>
                <div className="flex-1 relative w-full min-h-[200px] flex items-center justify-center">
                    {mainVisual}
                </div>
            </div>

            {/* QUADRANT 2: Key Stats (Top-Right) */}
            <div className="grid grid-rows-2 gap-4">
                {/* Top Half of Right Col: Big Stats */}
                <div className="glass-panel p-4 rounded-xl flex flex-col justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white/5 rounded-lg p-2.5 flex flex-col justify-center border border-white/5 hover:bg-white/10 transition-colors">
                                <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold mb-0.5">{stat.label}</span>
                                <div className="flex items-end gap-1">
                                    <span className="text-xl font-mono font-bold text-foreground leading-none">{stat.value}</span>
                                    {stat.trend && (
                                        <span className={`text-[9px] font-bold mb-0.5 ${stat.trendUp ? 'text-emerald-400' : 'text-rose-400'} flex items-center`}>
                                            {stat.trendUp ? '↑' : '↓'} {stat.trend}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Half of Right Col: Analysis Text */}
                <div className="glass-panel p-4 rounded-xl border border-white/5 bg-gradient-to-br from-primary/5 to-transparent flex flex-col justify-center relative overflow-hidden text-balance">
                    <div className="absolute top-2 left-2">
                        <ArrowUpRight className="text-primary/50" size={16} />
                    </div>
                    <h3 className="text-sm font-bold text-primary mb-1 pl-6">{tSafe(t, 'aiAnalysis', 'AI Analysis')}</h3>
                    <p className="text-xs text-muted-foreground leading-snug pl-6 border-l-2 border-primary/20">
                        {analysis}
                    </p>
                </div>
            </div>

            {/* QUADRANT 3: Secondary Visual (Bottom-Left) */}
            <div className="glass-panel p-4 rounded-xl flex flex-col min-h-[220px]">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase text-muted-foreground tracking-widest">{tSafe(t, 'historicalTrend', 'Historical Trend')}</span>
                    <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                </div>
                <div className="flex-1 relative w-full overflow-hidden rounded-lg bg-white/5 border border-white/5">
                    {/* Overlay for "Deep Dive" feel */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        {secondaryVisual}
                    </div>
                </div>
            </div>

            {/* QUADRANT 4: Logs / Details (Bottom-Right) */}
            <div className="glass-panel p-0 rounded-xl flex flex-col overflow-hidden min-h-[220px]">
                <div className="p-2.5 border-b border-white/5 bg-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-muted-foreground">{tSafe(t, 'systemLogs', 'System Logs')}</span>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500/20" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                        <div className="w-2 h-2 rounded-full bg-green-500/20" />
                    </div>
                </div>
                <div className="flex-1 p-4 font-mono text-xs text-muted-foreground/70 overflow-hidden relative">
                    <div className="absolute inset-0 p-4 space-y-2">
                        {[
                            { level: 'info', msg: 'optimizing' },
                            { level: 'success', msg: 'rebalanced' },
                            { level: 'info', msg: 'synced' },
                            { level: 'debug', msg: 'checking' },
                            { level: 'success', msg: 'verified' },
                            { level: 'info', msg: 'scaling' }
                        ].map((log, i) => (
                            <div key={i} className="flex gap-2">
                                <span className={
                                    log.level === 'success' || log.level === 'pass' ? "text-emerald-400" :
                                        log.level === 'debug' ? "text-purple-400" : "text-blue-400"
                                }>
                                    {tSafe(t, `Logs.levels.${log.level}`, log.level.toUpperCase())}
                                </span>
                                <span>{tSafe(t, `Logs.${log.msg}`, log.msg)}</span>
                            </div>
                        ))}
                    </div>
                    {/* Fade out bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent" />
                </div>
            </div>
        </div>
    );
}
