"use client";

import React, { useState, useEffect } from "react";
import { Activity, Server, Database, AlertTriangle, CheckCircle } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Footer from "@/components/Footer";


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
        paddingTop: "var(--header-height)",
      }}
    >
      {/* AMBIENT VISUALS (From Products Page Design) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-10%] left-[20%] w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full animate-pulse"
          style={{ animationDuration: "10s" }}
        />
        <div
          className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 blur-[100px] rounded-full"
        />
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/5 blur-[100px] rounded-full"
        />
      </div>

      {/* GRID OVERLAY */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          pointerEvents: "none",
          zIndex: 0,
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
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
                  fontSize: "clamp(2.5rem, 4vw, 4rem)",
                  fontWeight: 950,
                  margin: 0,
                  color: "var(--foreground)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  textShadow: "0 0 40px rgba(255,255,255,0.1)",
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
                    textShadow: "0 0 20px rgba(96, 239, 255, 0.3)",
                  }}
                >
                  {currentTime.toLocaleTimeString(locale, { hour12: false })}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    opacity: 0.7,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--primary)",
                  }}
                >
                  {currentTime.toLocaleDateString(locale, {
                    weekday: "long",
                    month: "long",
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
                      ? "rgba(16, 185, 129, 0.1)"
                      : "rgba(239, 68, 68, 0.1)",
                  padding: "0.8rem 1.5rem",
                  borderRadius: "999px",
                  border: `1px solid ${systemStatus === "operational" ? "rgba(16, 185, 129, 0.4)" : "rgba(239, 68, 68, 0.4)"}`,
                  boxShadow: `0 0 20px ${systemStatus === "operational" ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
                  backdropFilter: "blur(10px)",
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
                    fontSize: "0.8rem",
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
          padding: "3rem 2rem",
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
            gap: "2.5rem",
            marginBottom: "5rem",
          }}
        >
          {[
            {
              label: t("activeAssets"),
              value: "142",
              icon: Server,
              color: "#60efff",
              bg: "rgba(96, 239, 255, 0.08)",
              border: "rgba(96, 239, 255, 0.4)",
            },
            {
              label: t("revenueImpact"),
              value: "+18%",
              icon: Activity,
              color: "#10b981",
              bg: "rgba(16, 185, 129, 0.08)",
              border: "rgba(16, 185, 129, 0.4)",
            },
            {
              label: t("cloudSpend"),
              value: "-40%",
              icon: Database,
              color: "#8b5cf6",
              bg: "rgba(139, 92, 246, 0.08)",
              border: "rgba(139, 92, 246, 0.4)",
            },
            {
              label: t("activeAlerts"),
              value: activeAlerts.toString(),
              icon: activeAlerts > 0 ? AlertTriangle : CheckCircle,
              color: activeAlerts > 0 ? "#f59e0b" : "#10b981",
              bg: activeAlerts > 0 ? "rgba(245, 158, 11, 0.08)" : "rgba(16, 185, 129, 0.08)",
              border: activeAlerts > 0 ? "rgba(245, 158, 11, 0.4)" : "rgba(16, 185, 129, 0.4)",
              subtext: activeAlerts > 0 ? t("requiresAttention") : t("nominal"),
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-panel group cursor-help transition-all duration-700 hover:scale-[1.1] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-3xl"
              style={{
                padding: "2rem",
                borderRadius: "2rem",
                border: `1px solid ${item.border}`,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
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
                  background: `radial-gradient(circle at 100% 0%, ${item.color}25 0%, transparent 60%)`,
                  pointerEvents: "none",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  marginBottom: "1rem",
                  position: "relative",
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    opacity: 0.9,
                    fontWeight: 950,
                    textTransform: "uppercase",
                    letterSpacing: "0.25em",
                    fontFamily: "var(--font-mono)",
                    color: "white"
                  }}
                >
                  {item.label}
                </div>
                <item.icon
                  size={22}
                  color={item.color}
                  style={{ filter: `drop-shadow(0 0 12px ${item.color})` }}
                />
              </div>
              <div
                style={{
                  fontSize: "3.5rem",
                  fontWeight: 950,
                  color: "white",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  position: "relative",
                  zIndex: 10,
                  textShadow: `0 0 30px ${item.color}40`,
                  filter: "saturate(200%)"
                }}
              >
                {item.value}
              </div>
              {item.subtext && (
                <div
                  className="animate-pulse"
                  style={{
                    fontSize: "0.7rem",
                    color: item.color,
                    marginTop: "0.75rem",
                    fontWeight: 900,
                    position: "relative",
                    zIndex: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em"
                  }}
                >
                  {item.subtext}
                </div>
              )}
              {/* Progress bar simulation for density */}
              <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden relative z-10">
                <div className="h-full animate-shimmer" style={{ width: "70%", backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          {children}
        </div>
      </div>
      <Footer />
    </div >
  );
}
