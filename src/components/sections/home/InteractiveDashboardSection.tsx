"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Activity, ShieldCheck, TrendingUp, Zap } from "lucide-react";

const ChartSkeleton = () => <div className="w-full h-full bg-white/5 animate-pulse rounded-lg" />;

// Lazy load heavy chart components
const LiveROIGauge = dynamic(
  () => import("@/components/visuals/EnhancedGraphs").then((mod) => mod.LiveROIGauge),
  { ssr: false, loading: () => <ChartSkeleton /> }
);
const EnhancedCostSavingsChart = dynamic(
  () => import("@/components/visuals/EnhancedGraphs").then((mod) => mod.EnhancedCostSavingsChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);
const PulsingSecurityScore = dynamic(
  () => import("@/components/visuals/EnhancedGraphs").then((mod) => mod.PulsingSecurityScore),
  { ssr: false, loading: () => <ChartSkeleton /> }
);
const LatencyLineChart = dynamic(
  () => import("@/components/charts/SimpleCharts").then((mod) => mod.LatencyLineChart),
  { ssr: false, loading: () => <ChartSkeleton /> }
);
const UptimeTrend = dynamic(
  () => import("@/components/charts/SimpleCharts").then((mod) => mod.UptimeTrend),
  { ssr: false, loading: () => <ChartSkeleton /> }
);
const CloudDistributionPie = dynamic(
  () => import("@/components/charts/SimpleCharts").then((mod) => mod.CloudDistributionPie),
  { ssr: false, loading: () => <ChartSkeleton /> }
);
const ComplianceScoresBar = dynamic(
  () => import("@/components/charts/SimpleCharts").then((mod) => mod.ComplianceScoresBar),
  { ssr: false, loading: () => <ChartSkeleton /> }
);

import { tSafe } from "@/lib/i18n/tSafe";

export default function InteractiveDashboardSection() {
  const t = useTranslations("Dashboard");
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="playground"
      className="snap-section"
      style={{
        background: "var(--background)",
        paddingTop: "4rem",
        paddingBottom: "4rem",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background elements */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(var(--primary) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container relative z-10">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black mb-4 uppercase tracking-[0.2em] backdrop-blur-md">
            <Activity size={12} className="animate-pulse" />
            {t("badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-foreground">
            {t("liveTitle")}
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed font-medium">
            {t("liveSubtitle")}
          </p>
        </div>

        {/* 2x2 Grid with mix of Content, Charts, and Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* TOP LEFT: ROI & PERFORMANCE (Chart mix) */}
          <div className="glass-panel p-5 rounded-2xl flex flex-col min-h-[240px] border-white/5 bg-white/[0.02] hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-500 group">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-base font-black text-foreground group-hover:text-primary transition-colors">
                  {t("roiTitle")}
                </h4>
                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">
                  {t("roiSubtitle")}
                </p>
              </div>
              <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                <TrendingUp size={16} />
              </div>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="h-[160px] flex items-center justify-center relative">
                <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
                {isMounted && <LiveROIGauge value={342} />}
              </div>
              <div className="h-[160px]">
                {isMounted && <LatencyLineChart height={160} standalone />}
              </div>
            </div>
          </div>

          {/* TOP RIGHT: HISTORICAL TREND (Live Analytics) */}
          <div className="glass-panel p-5 rounded-2xl overflow-hidden relative min-h-[240px] border-white/5 flex flex-col group">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/dashboard/trend-bg.png"
                alt={tSafe(t, "Charts.historicalTrend", "Trend Analytics")}
                fill
                className="object-cover opacity-10 group-hover:scale-110 transition-transform duration-[20s]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/60 to-slate-950" />
            </div>

            <div className="relative z-20 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-base font-black text-foreground group-hover:text-primary transition-colors uppercase tracking-tight">
                    {tSafe(t, "Charts.historicalTrend", "Historical Trend")}
                  </h4>
                  <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">
                    {tSafe(t, "Charts.infraVelocity", "Infrastructure Velocity")}
                  </p>
                </div>
                <TrendingUp size={16} className="text-primary" />
              </div>

              <div className="flex-1 w-full min-h-[140px] relative">
                {isMounted && (
                  <div className="absolute inset-0 scale-90">
                    <UptimeTrend standalone height={140} />
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">{tSafe(t, "Charts.liveSyncAlpha", "Live Sync Alpha")}</span>
                </div>
                <span className="text-[10px] font-mono font-black text-primary saturate-150">↑ 12.4%</span>
              </div>
            </div>
          </div>

          {/* BOTTOM LEFT: COST & DISTRIBUTION (Mixed charts) */}
          <div className="glass-panel p-5 rounded-2xl flex flex-col min-h-[240px] border-white/5 bg-white/[0.02] hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-500 group">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-base font-black text-foreground group-hover:text-primary transition-colors">
                  {t("optimizationTitle")}
                </h4>
                <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">
                  {t("optimizationSubtitle")}
                </p>
              </div>
              <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-500">
                <Zap size={16} />
              </div>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="h-[160px]">
                {isMounted && <CloudDistributionPie height={160} standalone />}
              </div>
              <div className="h-[160px]">
                {isMounted && <EnhancedCostSavingsChart height={160} />}
              </div>
            </div>
          </div>

          {/* BOTTOM RIGHT: AI ANALYSIS (Neural Layer) */}
          <div className="glass-panel p-5 rounded-2xl flex flex-col min-h-[240px] border-white/5 bg-black/40 hover:border-primary/30 transition-all duration-500 group overflow-hidden relative">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/dashboard/ai-bg.png"
                alt={tSafe(t, "Charts.aiAnalysis", "AI Analysis")}
                fill
                className="object-cover opacity-[0.05] group-hover:scale-110 transition-transform duration-[15s]"
              />
            </div>

            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-base font-black text-foreground group-hover:text-primary transition-colors uppercase tracking-tight">
                    {tSafe(t, "Charts.aiAnalysis", "AI Analysis")}
                  </h4>
                  <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">
                    {tSafe(t, "Charts.autoGovernance", "Autonomous Governance")}
                  </p>
                </div>
                <Activity size={16} className="text-primary animate-pulse" />
              </div>

              <div className="flex-1 bg-black/40 rounded-xl border border-white/5 p-4 font-mono text-[10px] overflow-hidden">
                <div className="space-y-3">
                  {[
                    { cmd: "ANALYZE_NODES", status: "PASS", color: "text-emerald-400" },
                    { cmd: "REBALANCE_CLUSTER", status: "ACTIVE", color: "text-blue-400" },
                    { cmd: "DRIFT_DETECTION", status: "STABLE", color: "text-purple-400" },
                  ].map((log, i) => (
                    <div key={i} className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-muted-foreground opacity-60 truncate mr-2">/usr/bin/{log.cmd}</span>
                      <span className={`${log.color} font-black`}>{log.status}</span>
                    </div>
                  ))}
                  <div className="pt-2 italic text-muted-foreground opacity-80 leading-relaxed">
                    "{tSafe(t, "Charts.aiInsight", "AI predictive scaling identified 42% cost inefficiency in AP-SOUTH-1. Auto-remediation triggered...")}"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }
        .shimmer-effect::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: shimmer 2s infinite;
        }
        @keyframes shimmer {
          100% {
            left: 100%;
          }
        }
      `}</style>
    </section>
  );
}
