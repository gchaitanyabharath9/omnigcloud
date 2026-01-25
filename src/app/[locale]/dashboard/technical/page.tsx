"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  Zap,
  Shield,
  Globe,
  Server,
  Database,
  Cloud,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import {
  AnimatedResourceUtilization,
  LiveDeploymentFrequency,
} from "@/components/visuals/EnhancedGraphs";
import { ResponseTimeTrend } from "@/components/visuals/MetricsGraphs";
import {
  ErrorRateTrend,
  QueryPerformance,
  AutoScalingEvents,
} from "@/components/visuals/PerformanceMetrics";
import { useTranslations, useLocale } from "next-intl";

export default function TechnicalDashboardPage() {
  const locale = useLocale();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeAlerts, setActiveAlerts] = useState(2);
  const [systemStatus, setSystemStatus] = useState<"operational" | "degraded" | "critical">(
    "operational"
  );
  const t = useTranslations("Dashboard.Technical");
  const tCommon = useTranslations("Dashboard.Shell");
  const tExec = useTranslations("Dashboard.Executive");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ background: "#000000", minHeight: "100vh", color: "white" }}>
      {/* COMMAND HEADER */}
      <div
        style={{
          position: "sticky",
          top: "0",
          zIndex: 100,
          background: "linear-gradient(180deg, #0a0a0a 0%, #000000 100%)",
          borderBottom: "1px solid rgba(96, 239, 255, 0.2)",
          padding: "1rem 0",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h1
                style={{
                  fontSize: "2rem",
                  fontWeight: 950,
                  margin: 0,
                  color: "#60efff",
                  letterSpacing: "-0.02em",
                }}
              >
                {t("title")}
              </h1>
              <div
                style={{
                  fontSize: "0.75rem",
                  opacity: 0.5,
                  marginTop: "0.25rem",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {t("subtitle")}
              </div>
            </div>
            <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{ fontSize: "1.5rem", fontWeight: 900, fontFamily: "var(--font-mono)" }}
                >
                  {currentTime.toLocaleTimeString(locale, { hour12: false })}
                </div>
                <div style={{ fontSize: "0.65rem", opacity: 0.5 }}>
                  {currentTime.toLocaleDateString(locale, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background:
                    systemStatus === "operational"
                      ? "rgba(16, 185, 129, 0.1)"
                      : "rgba(239, 68, 68, 0.1)",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  border: `1px solid ${systemStatus === "operational" ? "#10b981" : "#ef4444"}`,
                }}
              >
                <div
                  className="animate-pulse"
                  style={{
                    width: 8,
                    height: 8,
                    background: systemStatus === "operational" ? "#10b981" : "#ef4444",
                    borderRadius: "50%",
                    boxShadow: `0 0 10px ${systemStatus === "operational" ? "#10b981" : "#ef4444"}`,
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 900,
                    color: systemStatus === "operational" ? "#10b981" : "#ef4444",
                    textTransform: "uppercase",
                  }}
                >
                  {tExec(`status.${systemStatus}`)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="container" style={{ padding: "2rem" }}>
        {/* TOP ROW - Critical Metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div
            className="glass-panel"
            style={{
              padding: "1.5rem",
              borderRadius: "1rem",
              background:
                "linear-gradient(135deg, rgba(96, 239, 255, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)",
              border: "1px solid rgba(96, 239, 255, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.65rem",
                  opacity: 0.5,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {t("activeNodes")}
              </div>
              <Server size={20} color="#60efff" />
            </div>
            <div style={{ fontSize: "2.5rem", fontWeight: 950, color: "#60efff" }}>
              {t("activeNodesValue")}
            </div>
            <div
              style={{
                fontSize: "0.7rem",
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                marginTop: "0.5rem",
              }}
            >
              <TrendingUp size={12} /> {t("trend")}
            </div>
          </div>

          <div
            className="glass-panel"
            style={{
              padding: "1.5rem",
              borderRadius: "1rem",
              background:
                "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.65rem",
                  opacity: 0.5,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {t("requestsSec")}
              </div>
              <Activity size={20} color="#10b981" />
            </div>
            <div style={{ fontSize: "2.5rem", fontWeight: 950, color: "#10b981" }}>
              {t("requestsSecValue")}
            </div>
            <div style={{ fontSize: "0.7rem", opacity: 0.5, marginTop: "0.5rem" }}>{t("avg")}</div>
          </div>

          <div
            className="glass-panel"
            style={{
              padding: "1.5rem",
              borderRadius: "1rem",
              background:
                "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.65rem",
                  opacity: 0.5,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {t("dataTransfer")}
              </div>
              <Database size={20} color="#8b5cf6" />
            </div>
            <div style={{ fontSize: "2.5rem", fontWeight: 950, color: "#8b5cf6" }}>
              {t("dataTransferValue")}
            </div>
            <div style={{ fontSize: "0.7rem", opacity: 0.5, marginTop: "0.5rem" }}>
              {t("lastHour")}
            </div>
          </div>

          <div
            className="glass-panel"
            style={{
              padding: "1.5rem",
              borderRadius: "1rem",
              background:
                activeAlerts > 0
                  ? "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(217, 119, 6, 0.05) 100%)"
                  : "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)",
              border: `1px solid ${activeAlerts > 0 ? "rgba(245, 158, 11, 0.2)" : "rgba(16, 185, 129, 0.2)"}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.65rem",
                  opacity: 0.5,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {tCommon("activeAlerts")}
              </div>
              {activeAlerts > 0 ? (
                <AlertTriangle size={20} color="#f59e0b" />
              ) : (
                <CheckCircle size={20} color="#10b981" />
              )}
            </div>
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: 950,
                color: activeAlerts > 0 ? "#f59e0b" : "#10b981",
              }}
            >
              {activeAlerts}
            </div>
            <div style={{ fontSize: "0.7rem", opacity: 0.5, marginTop: "0.5rem" }}>
              {activeAlerts > 0 ? tCommon("requiresAttention") : tCommon("nominal")}
            </div>
          </div>
        </div>

        {/* TECHNICAL GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          <div
            id="resources"
            className="glass-panel"
            style={{
              padding: "1.5rem",
              borderRadius: "1rem",
              background: "rgba(10, 10, 10, 0.8)",
              scrollMarginTop: "120px",
            }}
          >
            <h4 style={{ fontSize: "0.9rem", fontWeight: 900, marginBottom: "0.5rem" }}>
              {t("resourceTitle")}
            </h4>
            <p style={{ fontSize: "0.65rem", opacity: 0.5, marginBottom: "1rem" }}>
              {t("resourceDesc")}
            </p>
            <AnimatedResourceUtilization />
          </div>

          <div
            id="deployment"
            className="glass-panel"
            style={{
              padding: "1.5rem",
              borderRadius: "1rem",
              background: "rgba(10, 10, 10, 0.8)",
              scrollMarginTop: "120px",
            }}
          >
            <h4 style={{ fontSize: "0.9rem", fontWeight: 900, marginBottom: "0.5rem" }}>
              {t("velocityTitle")}
            </h4>
            <p style={{ fontSize: "0.65rem", opacity: 0.5, marginBottom: "1rem" }}>
              {t("velocityDesc")}
            </p>
            <LiveDeploymentFrequency />
          </div>

          <div
            id="scaling"
            className="glass-panel"
            style={{
              padding: "1.5rem",
              borderRadius: "1rem",
              background: "rgba(10, 10, 10, 0.8)",
              scrollMarginTop: "120px",
            }}
          >
            <h4 style={{ fontSize: "0.9rem", fontWeight: 900, marginBottom: "0.5rem" }}>
              {t("scalingTitle")}
            </h4>
            <p style={{ fontSize: "0.65rem", opacity: 0.5, marginBottom: "1rem" }}>
              {t("scalingDesc")}
            </p>
            <AutoScalingEvents />
          </div>

          <div
            id="errors"
            className="glass-panel"
            style={{
              padding: "1.5rem",
              borderRadius: "1rem",
              background: "rgba(10, 10, 10, 0.8)",
              scrollMarginTop: "120px",
            }}
          >
            <h4 style={{ fontSize: "0.9rem", fontWeight: 900, marginBottom: "0.5rem" }}>
              {t("threatTitle")}
            </h4>
            <p style={{ fontSize: "0.65rem", opacity: 0.5, marginBottom: "1rem" }}>
              {t("threatDesc")}
            </p>
            <ErrorRateTrend />
          </div>

          <div
            className="glass-panel"
            style={{ padding: "1.5rem", borderRadius: "1rem", background: "rgba(10, 10, 10, 0.8)" }}
          >
            <h4 style={{ fontSize: "0.9rem", fontWeight: 900, marginBottom: "0.5rem" }}>
              {t("queryTitle")}
            </h4>
            <p style={{ fontSize: "0.65rem", opacity: 0.5, marginBottom: "1rem" }}>
              {t("queryDesc")}
            </p>
            <QueryPerformance />
          </div>

          <div
            className="glass-panel"
            style={{ padding: "1.5rem", borderRadius: "1rem", background: "rgba(10, 10, 10, 0.8)" }}
          >
            <h4 style={{ fontSize: "0.9rem", fontWeight: 900, marginBottom: "0.5rem" }}>
              {t("latencyTitle")}
            </h4>
            <p style={{ fontSize: "0.65rem", opacity: 0.5, marginBottom: "1rem" }}>
              {t("latencyDesc")}
            </p>
            <ResponseTimeTrend />
          </div>
        </div>
      </div>
    </div>
  );
}
