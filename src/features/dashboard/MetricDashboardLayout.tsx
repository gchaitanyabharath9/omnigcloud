"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface MetricDashboardLayoutProps {
  title: string;
  subtitle: string;
  mainVisual: React.ReactNode;
  stats: { label: string; value: string; trend?: string; trendUp?: boolean }[];
  analysis: string;
  secondaryVisual: React.ReactNode;
}

import { useTranslations } from "next-intl";
import { tSafe } from "@/lib/i18n/tSafe";
import { DemoBadge } from "@/components/demo/DemoBadge";

export default function MetricDashboardLayout({
  title,
  subtitle,
  mainVisual,
  stats,
  analysis,
  secondaryVisual,
}: MetricDashboardLayoutProps) {
  const t = useTranslations("Dashboard.Charts");

  // Generate pseudo-timestamps for logs
  const now = new Date();
  const getTimestamp = (offsetSecs: number) => {
    const time = new Date(now.getTime() - offsetSecs * 1000);
    return time.toLocaleTimeString([], {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 auto-rows-auto">
      {/* QUADRANT 1: Main Visual (Top-Left) */}
      <div className="glass-panel p-6 rounded-[2rem] flex flex-col relative overflow-hidden group transition-all duration-500 hover:border-primary/40 hover:shadow-2xl shadow-xl bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl border border-white/10">
        <div className="absolute top-0 right-0 p-4 z-10">
          <DemoBadge label={tSafe(t, "liveView", "Live View")} />
        </div>

        {/* Subtle corner accent */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent pointer-events-none blur-2xl" />

        <div className="mb-4 relative z-10">
          <h2 className="text-2xl font-black tracking-tighter text-foreground mb-1 drop-shadow-lg">{title}</h2>
          <p className="text-[10px] text-primary/70 font-mono font-bold uppercase tracking-[0.2em]">
            {subtitle}
          </p>
        </div>

        <div className="flex-1 relative w-full min-h-[200px] flex items-center justify-center bg-gradient-to-b from-black/5 to-black/20 rounded-2xl border border-white/5 shadow-inner">
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="w-full h-full flex items-center justify-center p-4">{mainVisual}</div>
        </div>
      </div>

      {/* QUADRANT 2: Key Stats (Top-Right) */}
      <div className="grid grid-rows-2 gap-3">
        {/* Top Half of Right Col: Big Stats */}
        <div className="glass-panel p-4 rounded-[2rem] flex flex-col justify-center border-white/10 bg-white/[0.01]">
          <div className="grid grid-cols-2 gap-3 h-full">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/[0.03] rounded-xl p-4 flex flex-col justify-center border border-white/5 hover:bg-white/[0.07] hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 group/stat shadow-lg"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] text-muted-foreground/80 uppercase tracking-widest font-black group-hover/stat:text-primary transition-colors">
                    {stat.label}
                  </span>
                  {stat.trend && (
                    <div
                      className={`px-1.5 py-0.5 rounded-full text-[9px] font-black ${stat.trendUp ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"} flex items-center gap-0.5`}
                    >
                      {stat.trendUp ? "↑" : "↓"} {stat.trend}
                    </div>
                  )}
                </div>
                <div className="flex items-end gap-1.5">
                  <span className="text-3xl font-mono font-black text-foreground leading-none tracking-tighter drop-shadow-xl saturate-150">
                    {stat.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Half of Right Col: Analysis Text */}
        <div className="glass-panel p-5 rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/10 blur-3xl rounded-full" />
          <div className="absolute top-3 right-3">
            <ArrowUpRight
              className="text-primary/30 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              size={16}
            />
          </div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1 h-6 bg-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            <h3 className="text-xs font-black text-primary uppercase tracking-widest">
              {tSafe(t, "aiAnalysis", "AI Analysis")}
            </h3>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed font-medium italic opacity-90 pl-3">
            " {analysis} "
          </p>
        </div>
      </div>

      {/* QUADRANT 3: Secondary Visual (Bottom-Left) */}
      <div className="glass-panel p-4 rounded-xl flex flex-col min-h-[180px] relative overflow-hidden">
        <div className="mb-3 flex items-center justify-between relative z-10">
          <span className="text-[9px] font-black uppercase text-primary/60 tracking-[0.2em] font-mono">
            {tSafe(t, "historicalTrend", "Historical Trend")}
          </span>
          <div className="flex items-center gap-1.5 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black text-emerald-400 font-mono tracking-tighter">
              {tSafe(t, "liveDataFeed", "LIVE DATA FEED")}
            </span>
          </div>
        </div>
        <div className="flex-1 relative w-full overflow-hidden rounded-lg bg-black/20 border border-white/5 backdrop-blur-sm self-center justify-center flex items-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10" />
          <div className="w-full h-full flex items-center justify-center p-2">
            {secondaryVisual}
          </div>
        </div>
      </div>

      {/* QUADRANT 4: Logs / Details (Bottom-Right) */}
      <div className="glass-panel p-0 rounded-xl flex flex-col overflow-hidden min-h-[180px] border-white/10">
        <div className="px-4 py-2.5 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] font-black font-mono text-primary/70 uppercase tracking-widest">
              {tSafe(t, "systemLogs", "System Logs")}
            </span>
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-white/5" />
            <div className="w-2 h-2 rounded-full bg-white/5" />
            <div className="w-2 h-2 rounded-full bg-white/5" />
          </div>
        </div>
        <div className="flex-1 p-4 font-mono text-[9px] text-muted-foreground/80 overflow-hidden relative bg-black/20">
          <div className="absolute inset-0 p-5 space-y-2.5">
            {[
              { level: "info", msg: "optimizing", delay: 120 },
              { level: "success", msg: "rebalanced", delay: 85 },
              { level: "debug", msg: "checking", delay: 42 },
              { level: "info", msg: "synced", delay: 28 },
              { level: "success", msg: "verified", delay: 15 },
              { level: "info", msg: "scaling", delay: 5 },
            ].map((log, i) => (
              <div
                key={i}
                className="flex gap-3 items-start animate-fade-in opacity-0"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
              >
                <span className="text-[9px] opacity-30 font-bold whitespace-nowrap">
                  {getTimestamp(log.delay)}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded-[4px] font-black text-[8px] tracking-tighter min-w-[55px] text-center ${log.level === "success"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : log.level === "debug"
                      ? "bg-purple-500/10 text-purple-400"
                      : "bg-blue-500/10 text-blue-400"
                    }`}
                >
                  {tSafe(t, `Logs.levels.${log.level}`, log.level.toUpperCase())}
                </span>
                <span className="leading-tight">{tSafe(t, `Logs.${log.msg}`, log.msg)}</span>
              </div>
            ))}
          </div>
          {/* Fade out bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
