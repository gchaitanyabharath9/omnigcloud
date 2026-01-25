"use client";

import React, { useState, useEffect } from "react";
import { Activity, Globe, Zap, Server } from "lucide-react";
import { useTranslations } from "next-intl";

interface NodeStatus {
  id: string;
  region: string;
  provider: string;
  latency: number;
  status: "optimal" | "stable" | "degraded";
}

const REGIONS = [
  { id: "us-east", name: "US East (N. Virginia)", provider: "AWS" },
  { id: "us-west", name: "US West (Oregon)", provider: "AWS" },
  { id: "eu-west", name: "Europe (Frankfurt)", provider: "GCP" },
  { id: "ap-south", name: "Asia Pacific (Mumbai)", provider: "Azure" },
  { id: "ap-east", name: "Asia Pacific (Tokyo)", provider: "OCP" },
  { id: "sa-east", name: "South America (São Paulo)", provider: "Oracle" },
];

export default function LatencyMonitor() {
  const t = useTranslations("Components.Visuals.LatencyMonitor");
  const [nodes, setNodes] = useState<NodeStatus[]>([]);
  const [avgLatency, setAvgLatency] = useState(0);

  useEffect(() => {
    // Initial state
    const initialNodes = REGIONS.map((r) => ({
      id: r.id,
      region: r.name,
      provider: r.provider,
      latency: Math.floor(Math.random() * 40) + 10,
      status: "optimal" as const,
    }));
    setNodes(initialNodes);

    // Update loop to simulate live latency analysis
    const interval = setInterval(() => {
      setNodes((prev) => {
        const updated = prev.map((node) => {
          const jitter = Math.floor(Math.random() * 5) - 2;
          const newLatency = Math.max(8, node.latency + jitter);
          let status: NodeStatus["status"] = "optimal";
          if (newLatency > 60) status = "degraded";
          else if (newLatency > 35) status = "stable";

          return { ...node, latency: newLatency, status };
        });

        const avg = updated.reduce((acc, n) => acc + n.latency, 0) / updated.length;
        setAvgLatency(avg);
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="glass-panel"
      style={{
        padding: "1.5rem",
        borderRadius: "1.25rem",
        border: "1px solid var(--card-border)",
        background: "var(--bg-surface-2)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
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
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              padding: "0.5rem",
              background: "rgba(59, 130, 246, 0.1)",
              borderRadius: "0.75rem",
              color: "var(--primary)",
            }}
          >
            <Zap size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 800, margin: 0 }}>{t("title")}</h4>
            <p style={{ fontSize: "0.7rem", color: "var(--muted)", margin: 0 }}>
              OmniGCloud Autonomous Discovery
            </p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{ fontSize: "1.25rem", fontWeight: 900, color: "var(--primary)", lineHeight: 1 }}
          >
            {avgLatency.toFixed(1)}
            <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>ms</span>
          </div>
          <div style={{ fontSize: "0.6rem", color: "var(--color-success)", fontWeight: 800 }}>
            MESH_HEALTH: 100%
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {nodes.map((node) => (
          <div
            key={node.id}
            style={{
              padding: "0.75rem",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background:
                    node.status === "optimal"
                      ? "#10b981"
                      : node.status === "stable"
                        ? "#f59e0b"
                        : "#ef4444",
                  boxShadow: `0 0 8px ${node.status === "optimal" ? "#10b981" : "#f59e0b"}`,
                }}
              />
              <div>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, lineHeight: 1 }}>
                  {node.region}
                </div>
                <div style={{ fontSize: "0.65rem", color: "var(--muted)", marginTop: "0.2rem" }}>
                  {node.provider} Node
                </div>
              </div>
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: node.status === "optimal" ? "#10b981" : "var(--foreground)",
              }}
            >
              {node.latency}ms
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "1.5rem",
          borderTop: "1px solid var(--card-border)",
          paddingTop: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.65rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--muted)",
          }}
        >
          <span>{t("meshScanPattern")}</span>
          <span style={{ color: "var(--primary)" }}>Real-time Analysis Active</span>
        </div>
        <div
          style={{
            marginTop: "0.5rem",
            height: "2px",
            background: "rgba(59, 130, 246, 0.1)",
            borderRadius: "1px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "40%",
              height: "100%",
              background: "var(--primary)",
              animation: "shimmer 2s infinite linear",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
      `}</style>
    </div>
  );
}
