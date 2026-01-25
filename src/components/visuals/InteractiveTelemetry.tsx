"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function InteractiveTelemetry() {
  const t = useTranslations("Visuals.telemetry");
  return (
    <div
      className="glass-panel"
      style={{
        padding: "2rem",
        borderRadius: "2rem",
        border: "1px solid var(--card-border)",
        background: "rgba(2, 6, 23, 0.4)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h4 style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--primary)" }}>
          {t("title")}
        </h4>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 10px #10b981",
            }}
          ></div>
          <span style={{ fontSize: "0.7rem", opacity: 0.5 }}>{t("live")}</span>
        </div>
      </div>

      <div
        style={{
          height: "200px",
          display: "flex",
          alignItems: "flex-end",
          gap: "4px",
          position: "relative",
        }}
      >
        {[40, 70, 45, 90, 65, 80, 50, 95, 60, 75, 40, 85, 55, 70, 45].map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h}%`,
              background: "linear-gradient(to top, var(--primary), #60efff)",
              borderRadius: "2px 2px 0 0",
              opacity: 0.6 + i * 0.02,
              transition: "height 0.5s ease",
              animation: `pulse-bar ${1 + i * 0.1}s infinite alternate`,
            }}
          ></div>
        ))}

        {/* SVG Line Overlay */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
            zIndex: 2,
          }}
        >
          <path
            d="M0,120 Q50,80 100,100 T200,60 T300,90 T400,40"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeDasharray="5,5"
            style={{ opacity: 0.5 }}
          />
        </svg>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          marginTop: "1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingTop: "1rem",
        }}
      >
        <div>
          <div style={{ fontSize: "0.65rem", opacity: 0.5, marginBottom: "0.25rem" }}>
            {t("latency")}
          </div>
          <div style={{ fontSize: "1.1rem", fontWeight: 900 }}>14ms</div>
        </div>
        <div>
          <div style={{ fontSize: "0.65rem", opacity: 0.5, marginBottom: "0.25rem" }}>
            {t("throughput")}
          </div>
          <div style={{ fontSize: "1.1rem", fontWeight: 900 }}>2.4 GB/s</div>
        </div>
        <div>
          <div style={{ fontSize: "0.65rem", opacity: 0.5, marginBottom: "0.25rem" }}>
            {t("loss")}
          </div>
          <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#10b981" }}>0.0001%</div>
        </div>
      </div>

      <style>{`
                @keyframes pulse-bar {
                    from { opacity: 0.4; }
                    to { opacity: 0.9; }
                }
            `}</style>
    </div>
  );
}
