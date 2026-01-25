"use client";

import React from "react";
import { useTranslations } from "next-intl";

// 9. Cloud Provider Cost Comparison
export const CloudCostComparison = () => {
  const providers = [
    { name: "AWS", cost: 8500, color: "#ff9900" },
    { name: "Azure", cost: 7200, color: "#0078d4" },
    { name: "GCP", cost: 6800, color: "#4285f4" },
    { name: "OCI", cost: 4200, color: "#f80000" },
  ];
  const maxCost = Math.max(...providers.map((p) => p.cost));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "0.5rem 0",
      }}
    >
      {providers.map((provider, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: "50px", fontSize: "0.7rem", fontWeight: 800, opacity: 0.7 }}>
            {provider.name}
          </div>
          <div
            style={{
              flex: 1,
              height: "24px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "0.5rem",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                width: `${(provider.cost / maxCost) * 100}%`,
                height: "100%",
                background: provider.color,
                borderRadius: "0.5rem",
                transition: "width 0.5s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: "0.5rem",
              }}
            >
              <span style={{ fontSize: "0.65rem", fontWeight: 900, color: "white" }}>
                ${(provider.cost / 1000).toFixed(1)}k
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// 10. Compliance Score Progress
export const ComplianceProgress = () => {
  const frameworks = [
    { name: "SOC 2", score: 98, color: "#10b981" },
    { name: "GDPR", score: 95, color: "#3b82f6" },
    { name: "HIPAA", score: 92, color: "#8b5cf6" },
    { name: "ISO 27001", score: 96, color: "#f59e0b" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        padding: "0.5rem 0",
      }}
    >
      {frameworks.map((fw, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem" }}>
            <span style={{ opacity: 0.7, fontWeight: 700 }}>{fw.name}</span>
            <span style={{ fontWeight: 900, color: fw.color }}>{fw.score}%</span>
          </div>
          <div
            style={{
              height: "6px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "1rem",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${fw.score}%`,
                height: "100%",
                background: fw.color,
                borderRadius: "1rem",
                transition: "width 0.5s ease",
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// 11. API Request Volume Heatmap
export const APIRequestHeatmap = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const [intensities, setIntensities] = React.useState(() => hours.map(() => 0));

  React.useEffect(() => {
    // Generate random intensities only after mount (client-side only)
    setIntensities(
      hours.map((hour) => {
        if (hour >= 9 && hour <= 17) return Math.random() * 0.5 + 0.5; // i18n-ignore: code comparison
        if (hour >= 6 && hour <= 20) return Math.random() * 0.3 + 0.3; // i18n-ignore: code comparison
        return Math.random() * 0.2;
      })
    );
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: "0.25rem",
        padding: "0.5rem 0",
      }}
    >
      {hours.map((hour, idx) => {
        const intensity = intensities[idx];
        return (
          <div
            key={hour}
            style={{
              aspectRatio: "1",
              background: `rgba(59, 130, 246, ${intensity})`,
              borderRadius: "0.25rem",
              border: "1px solid rgba(59, 130, 246, 0.2)",
              position: "relative",
            }}
            title={`${hour}:00 - ${Math.round((intensity || 0) * 1000)} req/s`}
          />
        );
      })}
    </div>
  );
};

// 12. Data Transfer Volume
export const DataTransferVolume = () => {
  const regions = [
    { name: "US-East", inbound: 450, outbound: 380, color: "#3b82f6" },
    { name: "EU-West", inbound: 320, outbound: 290, color: "#8b5cf6" },
    { name: "APAC", inbound: 280, outbound: 310, color: "#10b981" },
  ];
  const maxValue = 500;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        gap: "1rem",
        padding: "1rem 0",
      }}
    >
      {regions.map((region, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "0.25rem",
              alignItems: "flex-end",
              height: "100px",
            }}
          >
            <div
              style={{
                flex: 1,
                height: `${(region.inbound / maxValue) * 100}%`,
                background: `${region.color}cc`,
                borderRadius: "0.25rem 0.25rem 0 0",
                minHeight: "10px",
              }}
            ></div>
            <div
              style={{
                flex: 1,
                height: `${(region.outbound / maxValue) * 100}%`,
                background: region.color,
                borderRadius: "0.25rem 0.25rem 0 0",
                minHeight: "10px",
              }}
            ></div>
          </div>
          <div style={{ fontSize: "0.6rem", opacity: 0.5, fontWeight: 700, textAlign: "center" }}>
            {region.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export const IncidentResponseTime = () => {
  const t = useTranslations("Components.Visuals.AdvancedMetrics");
  const weeks = ["W1", "W2", "W3", "W4"];
  const avgTimes = [45, 38, 32, 28]; // minutes
  const maxTime = 60;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", fontWeight: 950, color: "var(--color-success)" }}>
          {avgTimes[avgTimes.length - 1]}
          <span style={{ fontSize: "1rem", opacity: 0.5 }}>min</span>
        </div>
        <div style={{ fontSize: "0.65rem", opacity: 0.5, fontWeight: 700 }}>
          {t("avgResponseTime")}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", height: "60px" }}>
        {avgTimes.map((time, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <div
              style={{
                width: "100%",
                height: `${(time / maxTime) * 100}%`,
                background:
                  i === avgTimes.length - 1 ? "var(--color-success)" : "rgba(255,255,255,0.2)",
                borderRadius: "0.25rem 0.25rem 0 0",
                minHeight: "10px",
              }}
            ></div>
            <div style={{ fontSize: "0.55rem", opacity: 0.5 }}>{weeks[i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const StorageOptimization = () => {
  const t = useTranslations("Components.Visuals.AdvancedMetrics");
  const before = 2400; // GB
  const after = 1650; // GB
  const saved = before - after;
  const percentage = ((saved / before) * 100).toFixed(0);

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
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", fontWeight: 950, color: "var(--primary)" }}>
          {saved}
          <span style={{ fontSize: "1rem", opacity: 0.5 }}>GB</span>
        </div>
        <div style={{ fontSize: "0.65rem", opacity: 0.5, fontWeight: 700 }}>
          {t("storageSaved")}
        </div>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <div
          style={{
            flex: 1,
            height: "40px",
            background: "rgba(239, 68, 68, 0.2)",
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.7rem",
            fontWeight: 800,
          }}
        >
          {t("before")}
          <br />
          {before}GB
        </div>
        <div style={{ fontSize: "1.5rem", color: "var(--primary)" }}>→</div>
        <div
          style={{
            flex: 1,
            height: "40px",
            background: "rgba(16, 185, 129, 0.2)",
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.7rem",
            fontWeight: 800,
          }}
        >
          {t("after")}
          <br />
          {after}GB
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: "0.8rem",
          color: "var(--color-success)",
          fontWeight: 800,
        }}
      >
        {t("reduction", { percentage })}
      </div>
    </div>
  );
};

// 15. Multi-Cloud Distribution
export const MultiCloudDistribution = () => {
  const clouds = [
    { name: "AWS", workloads: 42, color: "#ff9900" },
    { name: "Azure", workloads: 28, color: "#0078d4" },
    { name: "GCP", workloads: 18, color: "#4285f4" },
    { name: "OCI", workloads: 12, color: "#f80000" },
  ];
  const total = clouds.reduce((sum, c) => sum + c.workloads, 0);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "0.25rem",
          height: "30px",
          borderRadius: "0.5rem",
          overflow: "hidden",
        }}
      >
        {clouds.map((cloud, i) => (
          <div
            key={i}
            style={{
              flex: cloud.workloads,
              background: cloud.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.65rem",
              fontWeight: 900,
              color: "white",
            }}
          >
            {((cloud.workloads / total) * 100).toFixed(0)}%
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
        {clouds.map((cloud, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.7rem" }}
          >
            <div
              style={{ width: "8px", height: "8px", borderRadius: "2px", background: cloud.color }}
            ></div>
            <span style={{ opacity: 0.7 }}>{cloud.name}</span>
            <span style={{ fontWeight: 800, marginLeft: "auto" }}>{cloud.workloads}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 16. License Optimization
export const LicenseOptimization = () => {
  const t = useTranslations("Components.Visuals.AdvancedMetrics");
  const licenses = [
    { type: t("licenseTypes.unused"), count: 45, color: "#ef4444" },
    { type: t("licenseTypes.underused"), count: 32, color: "#f59e0b" },
    { type: t("licenseTypes.optimized"), count: 123, color: "#10b981" },
  ];
  const total = licenses.reduce((sum, l) => sum + l.count, 0);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2rem",
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {licenses.map((lic, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "60px", fontSize: "0.65rem", opacity: 0.7, fontWeight: 700 }}>
              {lic.type}
            </div>
            <div
              style={{
                flex: 1,
                height: "18px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "0.5rem",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${(lic.count / total) * 100}%`,
                  height: "100%",
                  background: lic.color,
                  borderRadius: "0.5rem",
                }}
              ></div>
            </div>
            <div style={{ width: "30px", fontSize: "0.7rem", fontWeight: 900, textAlign: "right" }}>
              {lic.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 17. Backup Success Rate
export const BackupSuccessRate = () => {
  const t = useTranslations("Components.Visuals.AdvancedMetrics");
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const [successRate, setSuccessRate] = React.useState(() => days.map(() => 1)); // Default to all success

  React.useEffect(() => {
    // Generate random success rate only after mount (client-side only)
    setSuccessRate(days.map(() => (Math.random() > 0.05 ? 1 : 0))); // 95% success rate
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "2rem", fontWeight: 950, color: "var(--color-success)" }}>
          {((successRate.filter((s) => s === 1).length / successRate.length) * 100).toFixed(1)}%
        </div>
        <div style={{ fontSize: "0.65rem", opacity: 0.5, fontWeight: 700 }}>
          {t("successRate30d")}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "0.2rem" }}>
        {successRate.map((success, i) => (
          <div
            key={i}
            style={{
              aspectRatio: "1",
              background: success ? "var(--color-success)" : "var(--color-danger)",
              borderRadius: "0.2rem",
              opacity: 0.8,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// 18. Network Latency Map
export const NetworkLatencyMap = () => {
  const regions = [
    { name: "US-E", latency: 12, color: "#10b981" },
    { name: "US-W", latency: 18, color: "#10b981" },
    { name: "EU", latency: 45, color: "#f59e0b" },
    { name: "APAC", latency: 78, color: "#ef4444" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        padding: "0.5rem 0",
      }}
    >
      {regions.map((region, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: "50px", fontSize: "0.7rem", fontWeight: 800, opacity: 0.7 }}>
            {region.name}
          </div>
          <div
            style={{
              flex: 1,
              height: "20px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "0.5rem",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                width: `${Math.min((region.latency / 100) * 100, 100)}%`,
                height: "100%",
                background: region.color,
                borderRadius: "0.5rem",
                display: "flex",
                alignItems: "center",
                paddingLeft: "0.5rem",
              }}
            >
              <span style={{ fontSize: "0.6rem", fontWeight: 900, color: "white" }}>
                {region.latency}ms
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
