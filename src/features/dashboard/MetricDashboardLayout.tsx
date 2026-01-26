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
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 auto-rows-auto">
      {/* QUADRANT 1: Main Visual (Top-Left) */}
      <div className="glass-panel p-10 rounded-[3rem] flex flex-col relative overflow-hidden group transition-all duration-700 hover:border-primary/40 hover:shadow-[0_0_80px_rgba(59,130,246,0.2)] shadow-2xl bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-3xl border border-white/10">
        <div className="absolute top-0 right-0 p-6 z-20">
          <DemoBadge label={tSafe(t, "liveView", "Live View")} />
        </div>

        {/* Ambient background blob */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="mb-10 relative z-10">
          <h2
            className="font-black tracking-tighter text-foreground mb-2 drop-shadow-2xl"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.04em" }}
          >
            {title}
          </h2>
          <p className="text-[14px] text-primary/80 font-mono font-black uppercase tracking-[0.4em] opacity-90 drop-shadow-md">
            {subtitle}
          </p>
        </div>

        <div className="flex-1 relative w-full min-h-[350px] flex items-center justify-center bg-black/40 rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden group-hover:scale-[1.01] transition-transform duration-700">
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none z-0"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="w-full h-full flex items-center justify-center relative z-10">{mainVisual}</div>
        </div>
      </div>

      {/* QUADRANT 2: Key Stats (Top-Right) */}
      <div className="grid grid-rows-2 gap-4">
        {/* Top Half of Right Col: Big Stats */}
        <div className="glass-panel p-8 rounded-[3rem] flex flex-col justify-center border-white/10 bg-white/[0.02]">
          <div className="grid grid-cols-2 gap-4 h-full">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/[0.04] rounded-2xl p-6 flex flex-col justify-center border border-white/10 hover:bg-white/[0.08] hover:border-primary/40 hover:scale-[1.05] transition-all duration-500 group/stat shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500" />
                <div className="flex justify-between items-start mb-2 relative z-10">
                  <span className="text-[12px] text-muted-foreground/90 uppercase tracking-[0.3em] font-black group-hover/stat:text-primary transition-colors">
                    {stat.label}
                  </span>
                  {stat.trend && (
                    <div
                      className={`px-3 py-1 rounded-full text-[11px] font-black ${stat.trendUp ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border border-rose-500/30"} flex items-center gap-1 shadow-lg`}
                    >
                      {stat.trendUp ? "↑" : "↓"} {stat.trend}
                    </div>
                  )}
                </div>
                <div className="flex items-end gap-2 relative z-10">
                  <span className="text-5xl font-mono font-black text-foreground leading-none tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] saturate-200">
                    {stat.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Half of Right Col: Analysis Text */}
        <div className="glass-panel p-10 rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary/10 via-transparent to-transparent flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/15 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute top-6 right-6">
            <ArrowUpRight
              className="text-primary/40 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500"
              size={24}
            />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-8 bg-primary rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
            <h3 className="text-sm font-black text-primary uppercase tracking-[0.3em]">
              {tSafe(t, "aiAnalysis", "AI ANALYSIS")}
            </h3>
          </div>
          <p
            className="text-[16px] text-foreground leading-relaxed font-black italic opacity-95 pl-6 border-l-2 border-primary/40 drop-shadow-lg"
            style={{ maxWidth: "95%" }}
          >
            " {analysis} "
          </p>
        </div>
      </div>

      {/* QUADRANT 3: Secondary Visual (Bottom-Left) */}
      <div className="glass-panel p-8 rounded-[2rem] flex flex-col min-h-[300px] relative overflow-hidden border-white/5 bg-white/[0.01]">
        <div className="mb-8 flex items-center justify-between relative z-10">
          <span className="text-[14px] font-black uppercase text-primary tracking-[0.4em] font-mono opacity-90 drop-shadow-lg">
            {tSafe(t, "historicalTrend", "HISTORICAL TREND")}
          </span>
          <div className="flex items-center gap-3 bg-emerald-500/20 px-4 py-1.5 rounded-full border border-emerald-500/40 shadow-2xl">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_#10b981]" />
            <span className="text-[11px] font-black text-emerald-400 font-mono tracking-widest">
              {tSafe(t, "liveDataFeed", "LIVE_FEED_v4")}
            </span>
          </div>
        </div>
        <div className="flex-1 relative w-full overflow-hidden rounded-[2.5rem] bg-black/50 border border-white/10 backdrop-blur-3xl shadow-2xl flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent pointer-events-none z-10" />
          <div className="w-full h-full relative z-0 flex items-center justify-center scale-105 group-hover:scale-110 transition-transform duration-1000">
            {secondaryVisual}
          </div>
        </div>
      </div>

      {/* QUADRANT 4: Logs / Details (Bottom-Right) */}
      <div className="glass-panel p-0 rounded-[2rem] flex flex-col overflow-hidden min-h-[300px] border-white/10 bg-black/40 shadow-2xl">
        <div className="px-8 py-5 border-b border-white/10 bg-white/[0.03] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--primary)]" />
            <span className="text-[11px] font-black font-mono text-primary uppercase tracking-[0.3em]">
              {tSafe(t, "systemLogs", "SYSTEM_LOG_v8.2")}
            </span>
          </div>
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
        </div>
        <div className="flex-1 p-10 font-mono text-[13px] text-muted-foreground/95 overflow-hidden relative">
          <div className="absolute inset-0 p-8 space-y-4">
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
                className="flex gap-4 items-center animate-fade-in opacity-0"
                style={{ animationDelay: `${i * 150}ms`, animationFillMode: "forwards" }}
              >
                <span className="text-[11px] opacity-60 font-black whitespace-nowrap min-w-[80px] text-primary/70">
                  [{getTimestamp(log.delay)}]
                </span>
                <span
                  className={`px-3 py-1 rounded-md font-black text-[10px] tracking-[0.2em] min-w-[90px] text-center shadow-lg ${log.level === "success"
                    ? "bg-emerald-500/30 text-emerald-400 border border-emerald-500/40"
                    : log.level === "debug"
                      ? "bg-purple-500/30 text-purple-400 border border-purple-500/40"
                      : "bg-blue-500/30 text-blue-400 border border-blue-500/40"
                    }`}
                >
                  {tSafe(t, `Logs.levels.${log.level}`, log.level.toUpperCase())}
                </span>
                <span className="leading-tight font-black tracking-tight text-foreground/90">
                  {tSafe(t, `Logs.${log.msg}`, log.msg)}
                </span>
              </div>
            ))}
          </div>
          {/* Fade out bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
