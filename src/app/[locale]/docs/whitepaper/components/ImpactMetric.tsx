import React from "react";

interface ImpactMetricProps {
  value: string;
  label: string;
  description: string;
  color: string;
}

export const ImpactMetric: React.FC<ImpactMetricProps> = ({ value, label, description, color }) => (
  <div
    style={{
      padding: "1.5rem",
      border: "1px solid var(--border)",
      borderRadius: "0.5rem",
      background: "var(--bg-surface-2)",
    }}
  >
    <div style={{ fontSize: "2rem", fontWeight: 900, color, marginBottom: "0.25rem" }}>{value}</div>
    <div style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>{label}</div>
    <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>{description}</div>
  </div>
);
