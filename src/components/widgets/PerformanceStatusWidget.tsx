"use client";

import React, { useEffect, useState } from "react";
import { Activity, CheckCircle, AlertTriangle, AlertOctagon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { safeFetch } from "@/lib/safe-fetch";
import { useTranslations } from "next-intl";

interface MetricsData {
  latencyMs: {
    p50: number;
    p95: number;
    p99: number;
  };
  rps: number;
  errorRate: number;
  status: "ok" | "warn" | "critical";
}

export default function PerformanceStatusWidget() {
  const t = useTranslations("Components.Widgets.PerformanceStatus");
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    const data = await safeFetch<MetricsData>("/api/metrics", {
      timeoutMs: 3000,
      maxRetries: 1,
    });

    if (data) {
      setMetrics(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // 30s refresh
    return () => clearInterval(interval);
  }, []);

  if (loading || !metrics) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-sm animate-pulse">
        <div className="w-2 h-2 rounded-full bg-slate-600" />
        <span className="text-xs font-mono text-slate-400">{t("connecting")}</span>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ok":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "warn":
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "critical":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-slate-400 bg-slate-400/10 border-slate-400/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ok":
        return <CheckCircle size={14} className="text-emerald-400" />;
      case "warn":
        return <AlertTriangle size={14} className="text-amber-400" />;
      case "critical":
        return <AlertOctagon size={14} className="text-red-400" />;
      default:
        return <Activity size={14} className="text-slate-400" />;
    }
  };

  return (
    <div
      className={twMerge(
        "flex items-center gap-4 px-4 py-2 rounded-full border backdrop-blur-md transition-colors duration-500",
        getStatusColor(metrics.status)
      )}
    >
      <div className="flex items-center gap-2">
        <div className="relative flex items-center justify-center">
          {metrics.status === "ok" && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-20" />
          )}
          {getStatusIcon(metrics.status)}
        </div>
        <span className="text-sm font-bold tracking-tight">{metrics.status.toUpperCase()}</span>
      </div>

      <div className="h-4 w-px bg-current opacity-20" />

      <div className="flex items-center gap-3 text-xs font-mono">
        <div>
          <span className="opacity-50 mr-1">P95</span>
          <span className="font-bold">{metrics.latencyMs.p95}ms</span>
        </div>
        <div>
          <span className="opacity-50 mr-1">RPS</span>
          <span className="font-bold">{metrics.rps.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
