// @ts-nocheck
"use client";

import { useTranslations } from "next-intl";
import { tSafe } from "@/lib/i18n/tSafe";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import ChartContainer from "./ChartContainer";
import type { DistributionDataPoint } from "./types";

// 6. Cloud Provider Distribution (Pie Chart)
export const CloudDistributionChart: React.FC<{ data: DistributionDataPoint[] }> = ({ data }) => {
  const t = useTranslations("Dashboard.Distribution");
  return (
    <ChartContainer
      title={tSafe(t, "multiCloudTitle", "Multi-Cloud Workload Distribution")}
      description={tSafe(t, "multiCloudDesc", "Active workloads across cloud providers")}
      badge={tSafe(t, "badges.balanced", "BALANCED")}
    >
      <ResponsiveContainer width="100%" height={280} minWidth={0}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name} ${percentage}%`}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(96, 239, 255, 0.3)",
              borderRadius: "0.5rem",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "0.75rem" }} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

// 7. Region Distribution (Bar Chart)
export const RegionDistributionChart: React.FC<{ data: DistributionDataPoint[] }> = ({ data }) => {
  const t = useTranslations("Dashboard.Distribution");
  return (
    <ChartContainer
      title={tSafe(t, "regionalTitle", "Regional Deployment Distribution")}
      description={tSafe(t, "regionalDesc", "Workload distribution across global regions")}
      badge={tSafe(t, "badges.global", "GLOBAL")}
    >
      <ResponsiveContainer width="100%" height={280} minWidth={0}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis type="number" stroke="rgba(255,255,255,0.5)" style={{ fontSize: "0.75rem" }} />
          <YAxis
            dataKey="name"
            type="category"
            stroke="rgba(255,255,255,0.5)"
            style={{ fontSize: "0.75rem" }}
            width={80}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(96, 239, 255, 0.3)",
              borderRadius: "0.5rem",
            }}
          />
          <Bar dataKey="value" radius={[0, 8, 8, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

// 8. Compliance Scores (Horizontal Bar)
export const ComplianceScoresChart: React.FC<{ data: DistributionDataPoint[] }> = ({ data }) => {
  const t = useTranslations("Dashboard.Distribution");
  return (
    <ChartContainer
      title={tSafe(t, "complianceTitle", "Compliance Framework Scores")}
      description={tSafe(t, "complianceDesc", "Current compliance status across all frameworks")}
      badge={tSafe(t, "badges.audited", "AUDITED")}
    >
      <ResponsiveContainer width="100%" height={280} minWidth={0}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            type="number"
            domain={[0, 100]}
            stroke="rgba(255,255,255,0.5)"
            style={{ fontSize: "0.75rem" }}
          />
          <YAxis
            dataKey="name"
            type="category"
            stroke="rgba(255,255,255,0.5)"
            style={{ fontSize: "0.75rem" }}
            width={90}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "0.5rem",
            }}
            formatter={(value: number) => `${value}%`}
          />
          <Bar dataKey="value" radius={[0, 8, 8, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

// 9. Feature Usage (Horizontal Bar)
export const FeatureUsageChart: React.FC<{ data: DistributionDataPoint[] }> = ({ data }) => {
  const t = useTranslations("Dashboard.Distribution");
  return (
    <ChartContainer
      title={tSafe(t, "featureTitle", "Feature Adoption Rate")}
      description={tSafe(t, "featureDesc", "Active usage of key platform features")}
      badge={tSafe(t, "badges.tracked", "TRACKED")}
    >
      <ResponsiveContainer width="100%" height={280} minWidth={0}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis type="number" stroke="rgba(255,255,255,0.5)" style={{ fontSize: "0.75rem" }} />
          <YAxis
            dataKey="name"
            type="category"
            stroke="rgba(255,255,255,0.5)"
            style={{ fontSize: "0.75rem" }}
            width={130}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(96, 239, 255, 0.3)",
              borderRadius: "0.5rem",
            }}
          />
          <Bar dataKey="value" radius={[0, 8, 8, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

// 10. Performance Scores (Pie Chart)
export const PerformanceScoresChart: React.FC<{ data: DistributionDataPoint[] }> = ({ data }) => {
  const t = useTranslations("Dashboard.Distribution");
  return (
    <ChartContainer
      title={tSafe(t, "performanceTitle", "Performance Scorecard")}
      description={tSafe(t, "performanceDesc", "Real-time system performance metrics")}
      badge={tSafe(t, "badges.optimal", "OPTIMAL")}
    >
      <ResponsiveContainer width="100%" height={280} minWidth={0}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(96, 239, 255, 0.3)",
              borderRadius: "0.5rem",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
