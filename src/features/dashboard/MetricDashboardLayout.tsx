"use client";

import React from "react";
import { ArrowUpRight, TrendingUp, Cpu } from "lucide-react";
import Image from "next/image";

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
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 auto-rows-auto p-4">
      {/* COLUMN 1: Visual Identity */}
      <div className="flex flex-col gap-8">
        {/* QUADRANT 1: Main Visual */}
        <div className="glass-panel p-10 rounded-[3rem] flex flex-col relative overflow-hidden group transition-all duration-700 hover:border-primary/40 hover:shadow-[0_0_80px_rgba(59,130,246,0.2)] shadow-2xl bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-3xl border border-white/10">
          <div className="absolute top-0 right-0 p-6 z-20">
            <DemoBadge label={tSafe(t, "liveView", "Live View")} />
          </div>

          <div className="mb-10 relative z-10">
            <h2
              className="font-black tracking-tighter text-foreground mb-2 drop-shadow-2xl"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1, letterSpacing: "-0.04em" }}
            >
              {title}
            </h2>
            <p className="text-[14px] text-primary/80 font-mono font-black uppercase tracking-[0.4em] opacity-90 drop-shadow-md">
              {subtitle}
            </p>
          </div>

          <div className="flex-1 relative w-full min-h-[450px] flex items-center justify-center bg-black/40 rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden group-hover:scale-[1.01] transition-transform duration-700">
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

        {/* QUADRANT 3: Global Signals (Trend Analysis) */}
        <div className="glass-panel p-8 rounded-[3rem] flex flex-col min-h-[350px] relative overflow-hidden border-white/5 bg-white/[0.01] shadow-2xl group">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/images/dashboard/trend-bg.png"
              alt="Historical Trend Analytics"
              fill
              className="object-cover opacity-20 group-hover:scale-110 transition-transform duration-[20s]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/40 to-slate-950" />
          </div>

          <div className="mb-8 flex items-center justify-between relative z-10 border-b border-white/10 pb-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-primary" />
                <span className="text-[16px] font-black uppercase text-primary tracking-[0.4em] font-mono opacity-90 drop-shadow-lg">
                  {tSafe(t, "historicalTrend", "HISTORICAL TREND")}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">
                {tSafe(t, "realtimePerf", "Neural Synthesis v4.2")}
              </span>
            </div>
            <div className="flex items-center gap-3 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/30">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_#10b981]" />
              <span className="text-[11px] font-black text-emerald-400 font-mono tracking-widest">
                STREAM_ACTIVE
              </span>
            </div>
          </div>
          <div className="flex-1 relative w-full overflow-hidden rounded-[2rem] bg-black/40 border border-white/5 backdrop-blur-3xl flex items-center justify-center p-6 mt-2 z-10">
            <div className="w-full h-full relative z-0 flex items-center justify-center">
              {secondaryVisual}
            </div>
          </div>
        </div>
      </div>

      {/* COLUMN 2: Intelligence & Activity */}
      <div className="flex flex-col gap-8">
        {/* QUADRANT 2: Dense Stats */}
        <div className="glass-panel p-10 rounded-[3rem] flex flex-col justify-center border-white/10 bg-white/[0.02] shadow-2xl min-h-[300px]">
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/[0.03] rounded-3xl p-8 flex flex-col justify-center border border-white/5 hover:bg-white/[0.08] hover:border-primary/40 hover:scale-[1.02] transition-all duration-500 group/stat shadow-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500" />
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span className="text-[13px] text-muted-foreground/80 uppercase tracking-[0.3em] font-black group-hover/stat:text-primary transition-colors">
                    {stat.label}
                  </span>
                  {stat.trend && (
                    <div
                      className={`px-3 py-1 rounded-full text-[12px] font-black ${stat.trendUp ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border border-rose-500/30"} shadow-lg`}
                    >
                      {stat.trendUp ? "↑" : "↓"} {stat.trend}
                    </div>
                  )}
                </div>
                <div className="relative z-10">
                  <span className="text-6xl font-mono font-black text-foreground drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] saturate-200">
                    {stat.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUADRANT 4: Intelligence Hub (AI Analysis + Activity Stream) */}
        <div className="glass-panel p-0 rounded-[3rem] flex flex-col overflow-hidden min-h-[500px] border border-primary/20 bg-black/80 shadow-[0_0_100px_rgba(59,130,246,0.15)] relative group">
          {/* Neural Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/images/dashboard/ai-bg.png"
              alt="Neural Analysis"
              fill
              className="object-cover opacity-10 group-hover:scale-105 transition-transform duration-[10s]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
          </div>

          {/* Neural Header */}
          <div className="px-10 py-8 border-b border-white/5 bg-gradient-to-r from-primary/10 to-transparent flex items-center justify-between relative z-10 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/40 animate-pulse">
                  <Cpu className="text-primary h-5 w-5" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-black font-mono text-primary uppercase tracking-[0.4em]">
                  {tSafe(t, "aiAnalysis", "INTELLIGENCE_LAYER_v8")}
                </span>
                <span className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] opacity-60">
                  {tSafe(t, "autoDecisionEngine", "Autonomous Decision Engine")}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-primary/40 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="w-2 h-2 rounded-full bg-primary/20" />
            </div>
          </div>

          <div className="flex-1 flex flex-col p-10 gap-10">
            {/* AI Analysis Block */}
            <div className="relative">
              <ArrowUpRight
                className="absolute -right-2 -top-2 text-primary/30 group-hover:text-primary group-hover:scale-125 transition-all duration-700"
                size={32}
              />
              <p
                className="text-[20px] text-foreground leading-relaxed font-black italic border-l-4 border-primary/60 pl-8 drop-shadow-xl"
                style={{ maxWidth: "100%" }}
              >
                "{analysis}"
              </p>
            </div>

            {/* Neural activity trace (Simplified Logs) */}
            <div className="mt-auto border-t border-white/5 pt-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[11px] font-black font-mono text-muted-foreground uppercase tracking-[0.3em]">
                  {tSafe(t, "systemLogs", "Neural Activity Trace")}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              <div className="space-y-5 font-mono text-[13px]">
                {[
                  { level: "info", msg: "optimizing", delay: 120 },
                  { level: "success", msg: "rebalanced", delay: 85 },
                  { level: "debug", msg: "checking", delay: 42 },
                  { level: "info", msg: "scaling", delay: 5 },
                ].map((log, i) => (
                  <div
                    key={i}
                    className="flex gap-6 items-center animate-fade-in"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    <span className="text-[11px] opacity-40 font-black whitespace-nowrap text-primary/70">
                      /{getTimestamp(log.delay)}/
                    </span>
                    <span
                      className={`px-3 py-1 rounded-md font-black text-[10px] tracking-[0.2em] border shadow-lg ${log.level === "success"
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : log.level === "debug"
                          ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                          : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                        }`}
                    >
                      {tSafe(t, `Logs.levels.${log.level}`, log.level.toUpperCase())}
                    </span>
                    <span className="leading-tight font-black tracking-tight text-foreground/70 group-hover:text-foreground transition-colors duration-500 lowercase">
                      {tSafe(t, `Logs.${log.msg}`, log.msg)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
