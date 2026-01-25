import React from "react";

interface Row {
  label: string;
  legacy: string;
  aso: React.ReactNode;
}

interface ComparisonTableProps {
  title: string;
  headers: [string, string, string];
  rows: Row[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ title, headers, rows }) => (
  <div
    style={{
      margin: "2rem 0",
      border: "1px solid var(--border)",
      borderRadius: "0.5rem",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        background: "var(--bg-surface-2)",
        padding: "1rem",
        fontWeight: 700,
        fontSize: "0.9rem",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {title}
    </div>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
      <thead>
        <tr style={{ textAlign: "left", background: "var(--bg-surface-2)" }}>
          <th style={{ padding: "1rem", width: "30%" }}>{headers[0]}</th>
          <th style={{ padding: "1rem", width: "35%" }}>{headers[1]}</th>
          <th style={{ padding: "1rem", width: "35%", color: "#3b82f6" }}>{headers[2]}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr
            key={index}
            style={{ borderBottom: index < rows.length - 1 ? "1px solid var(--border)" : "none" }}
          >
            <td style={{ padding: "1rem", fontWeight: 600 }}>{row.label}</td>
            <td style={{ padding: "1rem" }}>{row.legacy}</td>
            <td style={{ padding: "1rem", fontWeight: 700 }}>{row.aso}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
