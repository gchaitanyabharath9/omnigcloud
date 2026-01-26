"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Activity, Zap, AlertTriangle } from "lucide-react";
import { DemoChartPlaceholder } from "./../demo/DemoChartPlaceholder";

// Re-export simple charts for components that depend on this file
export {
  LatencyLineChart as LiveDeploymentFrequency,
  FeatureUsageBar as AnimatedResourceUtilization,
  CloudDistributionPie as CloudCostComparison,
} from "@/components/charts/SimpleCharts";

// Enhanced Cost Savings with hover and animation
export const EnhancedCostSavingsChart = ({ height = 180 }: { height?: number }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const savings = [12000, 18500, 24000, 31000, 38500, 45000];
  const maxSaving = Math.max(...savings);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <DemoChartPlaceholder />;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          gap: "0.75rem",
          padding: "1rem 0.5rem",
        }}
      >
        {savings.map((val, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              style={{
                width: "100%",
                height: `${(val / maxSaving) * 100}%`,
                background:
                  hoveredIndex === i
                    ? "linear-gradient(180deg, #60efff 0%, var(--primary) 100%)"
                    : "linear-gradient(180deg, var(--primary) 0%, rgba(139, 92, 246, 0.5) 100%)",
                borderRadius: "0.75rem 0.75rem 0 0",
                position: "relative",
                minHeight: "24px",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                transform: hoveredIndex === i ? "scaleY(1.05) translateY(-5px)" : "scaleY(1)",
                boxShadow:
                  hoveredIndex === i
                    ? "0 0 30px rgba(96, 239, 255, 0.6)"
                    : "0 4px 10px rgba(0,0,0,0.2)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-2.5rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: hoveredIndex === i ? "0.85rem" : "0.75rem",
                  fontWeight: 900,
                  color: hoveredIndex === i ? "#60efff" : "var(--primary)",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s ease",
                  opacity: hoveredIndex === i ? 1 : 0,
                  textShadow: "0 0 10px currentColor",
                }}
              >
                ${(val / 1000).toFixed(0)}k
              </div>
            </div>
            <div
              style={{
                fontSize: "0.65rem",
                opacity: hoveredIndex === i ? 1 : 0.6,
                fontWeight: hoveredIndex === i ? 800 : 600,
                transition: "all 0.3s ease",
                color: hoveredIndex === i ? "white" : "inherit",
              }}
            >
              {months[i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import { useTranslations } from "next-intl";
import { tSafe } from "@/lib/i18n/tSafe";

// Real-time updating ROI Gauge
export const LiveROIGauge = ({ value = 342 }: { value?: number }) => {
  const t = useTranslations("Dashboard.Graphs");
  const [currentValue, setCurrentValue] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const timer = setTimeout(() => {
      if (currentValue < value) {
        setCurrentValue((prev) => Math.min(prev + 5, value));
      }
    }, 30);
    return () => clearTimeout(timer);
  }, [currentValue, value, isMounted]);

  if (!isMounted) return <DemoChartPlaceholder />;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <svg width="200" height="200" viewBox="0 0 180 180">
        <defs>
          <linearGradient id="roiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx="90"
          cy="90"
          r="70"
          fill="none"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="16"
        />
        <circle
          cx="90"
          cy="90"
          r="70"
          fill="none"
          stroke="url(#roiGradient)"
          strokeWidth="16"
          strokeDasharray={`${2 * Math.PI * 70 * (currentValue / 500)} ${2 * Math.PI * 70}`}
          strokeLinecap="round"
          transform="rotate(-90 90 90)"
          style={{ transition: "stroke-dasharray 0.5s ease-out", filter: "url(#glow)" }}
        />
      </svg>
      <div style={{ position: "absolute", textAlign: "center" }}>
        <div style={{
          fontSize: "3rem",
          fontWeight: 950,
          background: "linear-gradient(to right, var(--primary), #10b981)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 0 10px rgba(16, 185, 129, 0.3))"
        }}>
          {currentValue}%
        </div>
        <div
          style={{ fontSize: "0.75rem", opacity: 0.7, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}
        >
          {tSafe(t, "roi", "ROI")}
        </div>
      </div>
    </div>
  );
};

// Pulsing Security Score
export const PulsingSecurityScore = ({ score = 94 }: { score?: number }) => {
  const t = useTranslations("Dashboard.Graphs");
  const [isPulsing, setIsPulsing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const getColor = (s: number) => {
    if (s >= 90) return "#10b981";
    if (s >= 70) return "#f59e0b";
    return "#ef4444";
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const interval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMounted]);

  if (!isMounted) return <DemoChartPlaceholder />;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1.5rem",
      }}
    >
      <div style={{ textAlign: "center", position: "relative" }}>
        <div
          style={{
            fontSize: "4rem",
            fontWeight: 950,
            color: getColor(score),
            transition: "all 0.3s ease",
            transform: isPulsing ? "scale(1.05)" : "scale(1)",
            textShadow: `0 0 30px ${getColor(score)}40`,
            lineHeight: 1,
            letterSpacing: "-0.05em"
          }}
        >
          {score}
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: `2px solid ${getColor(score)}`,
            animation: "pulse-ring 1s ease-out",
            opacity: isPulsing ? 1 : 0,
            pointerEvents: "none",
          }}
        />

        <div
          style={{ fontSize: "0.8rem", opacity: 0.7, fontWeight: 800, textTransform: "uppercase", marginTop: "0.5rem", letterSpacing: "0.1em" }}
        >
          {tSafe(t, "securityScore", "Security Score")}
        </div>
      </div>
      <div
        style={{
          height: "16px",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "1rem",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.05)",
          margin: "0 10%"
        }}
      >
        <div
          style={{
            width: `${score}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${getColor(score)} 0%, ${getColor(score)}dd 100%)`,
            borderRadius: "1rem",
            transition: "width 1s ease",
            boxShadow: `0 0 20px ${getColor(score)}60`
          }}
        ></div>
      </div>
      <style jsx>{`
        @keyframes pulse-ring {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
