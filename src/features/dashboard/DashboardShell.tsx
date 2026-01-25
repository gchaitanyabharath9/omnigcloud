"use client";

import React, { useState, useEffect } from "react";
import { Activity, Server, Database, AlertTriangle, CheckCircle } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

interface DashboardShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  hideNav?: boolean;
}

export default function DashboardShell({
  title,
  subtitle,
  children,
  hideNav = false,
}: DashboardShellProps) {
  const t = useTranslations("Dashboard.Shell");
  const locale = useLocale();
  const [currentTime, setCurrentTime] = useState(new Date());
  const activeAlerts = 2;
  const systemStatus = "operational";

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tExec = useTranslations("Dashboard.Executive");

  return (
    <div
      style={{
        background: "var(--background)",
        minHeight: "100vh",
        color: "var(--foreground)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* PREMIUM BACKGROUND EFFECTS */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "500px",
          background:
            "radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      ></div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: 0,
          maskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      ></div>

      {/* COMMAND HEADER */}
      <div
        style={{
          position: "sticky",
          top: "var(--header-height)",
          zIndex: 100,
          background: "var(--header-bg)",
          borderBottom: "1px solid var(--card-border)",
          padding: "1.25rem 0",
          backdropFilter: "blur(32px)",
          marginTop: "0",
        }}
      >
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 900,
                  color: "var(--primary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  marginBottom: "0.25rem",
                }}
              >
                COMMAND_CENTER_STATUS_v4.2
              </div>
              <h1
                style={{
                  fontSize: "2.25rem",
                  fontWeight: 950,
                  margin: 0,
                  color: "var(--foreground)",
                  letterSpacing: "-0.03em",
                }}
              >
                {title}
              </h1>
              <div
                style={{
                  fontSize: "0.85rem",
                  opacity: 0.6,
                  marginTop: "0.25rem",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {subtitle}
              </div>
            </div>
            <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 950,
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "-0.05em",
                  }}
                >
                  {currentTime.toLocaleTimeString(locale, { hour12: false })}
                </div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    opacity: 0.5,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
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
                  gap: "0.75rem",
                  background:
                    systemStatus === "operational"
                      ? "rgba(16, 185, 129, 0.08)"
                      : "rgba(239, 68, 68, 0.08)",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "1rem",
                  border: `1px solid ${systemStatus === "operational" ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="animate-pulse"
                  style={{
                    width: 10,
                    height: 10,
                    background: systemStatus === "operational" ? "#10b981" : "#ef4444",
                    borderRadius: "50%",
                    boxShadow: `0 0 15px ${systemStatus === "operational" ? "#10b981" : "#ef4444"}`,
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 900,
                    color: systemStatus === "operational" ? "#10b981" : "#ef4444",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {tExec(`status.${systemStatus}`)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div
        className="container max-w-6xl mx-auto min-w-0"
        style={{
          padding: "2rem",
          paddingBottom: "10rem",
          flex: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* CRITICAL METRICS ROW - Always Visible for Context */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {[
            {
              label: t("activeAssets"),
              value: "142",
              icon: Server,
              color: "#60efff",
              bg: "rgba(96, 239, 255, 0.03)",
              border: "rgba(96, 239, 255, 0.2)",
            },
            {
              label: t("revenueImpact"),
              value: "+18%",
              icon: Activity,
              color: "#10b981",
              bg: "rgba(16, 185, 129, 0.03)",
              border: "rgba(16, 185, 129, 0.2)",
            },
            {
              label: t("cloudSpend"),
              value: "-40%",
              icon: Database,
              color: "#8b5cf6",
              bg: "rgba(139, 92, 246, 0.03)",
              border: "rgba(139, 92, 246, 0.2)",
            },
            {
              label: t("activeAlerts"),
              value: activeAlerts.toString(),
              icon: activeAlerts > 0 ? AlertTriangle : CheckCircle,
              color: activeAlerts > 0 ? "#f59e0b" : "#10b981",
              bg: activeAlerts > 0 ? "rgba(245, 158, 11, 0.03)" : "rgba(16, 185, 129, 0.03)",
              border: activeAlerts > 0 ? "rgba(245, 158, 11, 0.2)" : "rgba(16, 185, 129, 0.2)",
              subtext: activeAlerts > 0 ? t("requiresAttention") : t("nominal"),
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-panel group cursor-help transition-all duration-500 hover:scale-[1.02]"
              style={{
                padding: "1.25rem",
                borderRadius: "1rem",
                background: item.bg,
                border: `1px solid ${item.border}`,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: `radial-gradient(circle at 100% 0%, ${item.color}15 0%, transparent 50%)`,
                  pointerEvents: "none",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "0.75rem",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontSize: "0.65rem",
                    opacity: 0.5,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {item.label}
                </div>
                <item.icon
                  size={18}
                  color={item.color}
                  style={{ filter: `drop-shadow(0 0 8px ${item.color}40)` }}
                />
              </div>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 950,
                  color: item.color,
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  position: "relative",
                }}
              >
                {item.value}
              </div>
              {item.subtext && (
                <div
                  style={{
                    fontSize: "0.7rem",
                    opacity: 0.5,
                    marginTop: "0.5rem",
                    fontWeight: 700,
                    position: "relative",
                  }}
                >
                  {item.subtext}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
