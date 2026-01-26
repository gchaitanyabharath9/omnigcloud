"use client";
// @ts-nocheck
import { useTranslations } from "next-intl";
import { tSafe } from "@/lib/i18n/tSafe";

import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import NoSSR from "../visuals/NoSSR";

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];

// Container wrapper
const ChartCard = ({
  title,
  children,
  height = 220,
  standalone = false,
}: {
  title?: string;
  children: React.ReactNode;
  height?: number;
  standalone?: boolean;
}) => {
  const t = useTranslations("Dashboard.Charts");

  if (!children) {
    return (
      <div
        className={`flex flex-col items-center justify-center ${standalone ? "" : "glass-panel border-white/5"} p-4 text-center bg-white/[0.02]`}
        style={{ height }}
      >
        <div className="text-[14px] font-mono text-primary/60 uppercase tracking-[0.3em] font-black mb-2 animate-pulse">
          {tSafe(t, "syncing", "SYNCING_BLOB...")}
        </div>
        <div className="flex gap-2">
          <div
            className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    );
  }

  if (standalone) {
    return (
      <div
        className="w-full relative overflow-hidden flex flex-col items-center justify-center group"
        style={{ height }}
      >
        <div className="w-full h-full relative transition-all duration-700 group-hover:scale-[1.03]">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 rounded-[2.5rem] flex flex-col border-white/10 hover:border-primary/40 transition-all duration-500 group shadow-2xl bg-white/[0.01]">
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[14px] font-black uppercase opacity-90 tracking-[0.3em] font-mono text-primary drop-shadow-lg">
            {title}
          </h3>
          <div className="flex gap-1.5 items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-pulse shadow-[0_0_8px_var(--primary)]" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/10" />
          </div>
        </div>
      )}
      <div
        className="relative overflow-hidden flex-1"
        style={{ width: "100%", minHeight: height, minWidth: "1px" }}
      >
        {children}
      </div>
    </div>
  );
};

// 1. Simple Line Chart - Latency
export const LatencyLineChart = ({
  height = 220,
  standalone = false,
}: {
  height?: number;
  standalone?: boolean;
}) => {
  const data = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    p50: Math.random() * 20 + 10,
    p95: Math.random() * 50 + 40,
    p99: Math.random() * 100 + 80,
  }));

  const t = useTranslations("Dashboard.Charts");

  return (
    <ChartCard
      title={tSafe(t, "apiLatency", "API Latency (ms)")}
      height={height}
      standalone={standalone}
    >
      <NoSSR>
        <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="hour"
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 900, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 900, fontFamily: "var(--font-mono)" }}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "20px",
                backdropFilter: "blur(20px)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
                padding: "12px 16px"
              }}
              itemStyle={{ fontSize: "14px", fontWeight: 900, textTransform: "uppercase" }}
              labelStyle={{ color: "rgba(255,255,255,0.5)", fontWeight: 900, marginBottom: "8px", fontSize: "12px", fontFamily: "var(--font-mono)" }}
            />
            <Legend
              iconType="circle"
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: "25px", fontSize: "12px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "var(--font-mono)" }}
            />
            <Line
              type="monotone"
              dataKey="p50"
              stroke="#10b981"
              strokeWidth={5}
              dot={false}
              activeDot={{ r: 8, strokeWidth: 0, fill: "#10b981" }}
            />
            <Line
              type="monotone"
              dataKey="p95"
              stroke="#f59e0b"
              strokeWidth={5}
              dot={false}
              activeDot={{ r: 8, strokeWidth: 0, fill: "#f59e0b" }}
            />
            <Line
              type="monotone"
              dataKey="p99"
              stroke="#ef4444"
              strokeWidth={5}
              dot={false}
              activeDot={{ r: 8, strokeWidth: 0, fill: "#ef4444" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </NoSSR>
    </ChartCard>
  );
};

// 2. Area Chart - Cost Savings
export const CostSavingsArea = ({
  height = 220,
  standalone = false,
}: {
  height?: number;
  standalone?: boolean;
}) => {
  const t = useTranslations("Dashboard.Charts");
  const data = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => ({
    month,
    traditional: 35000 + i * 800,
    optimized: 15000 + i * 500,
  }));

  return (
    <ChartCard
      title={tSafe(t, "monthlyCost", "Monthly Cost Comparison ($)")}
      height={height}
      standalone={standalone}
    >
      <NoSSR>
        <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="colorTrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOpt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 900, fontFamily: "var(--font-mono)", textTransform: "uppercase" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 900, fontFamily: "var(--font-mono)" }}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "20px",
                backdropFilter: "blur(20px)",
                padding: "16px"
              }}
              itemStyle={{ fontSize: "14px", fontWeight: 900 }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ paddingTop: "20px", fontSize: "12px", fontWeight: 900, textTransform: "uppercase", fontFamily: "var(--font-mono)" }}
            />
            <Area
              type="monotone"
              dataKey="traditional"
              stackId="1"
              stroke="#ef4444"
              strokeWidth={4}
              fill="url(#colorTrad)"
              fillOpacity={1}
            />
            <Area
              type="monotone"
              dataKey="optimized"
              stackId="2"
              stroke="#3b82f6"
              strokeWidth={4}
              fill="url(#colorOpt)"
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </NoSSR>
    </ChartCard>
  );
};

// 3. Bar Chart - Request Volume
export const RequestVolumeBar = ({
  height = 220,
  standalone = false,
}: {
  height?: number;
  standalone?: boolean;
}) => {
  const t = useTranslations("Dashboard.Charts");
  const data = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    requests: Math.floor(Math.random() * 2000 + 500) * (i >= 9 && i <= 17 ? 2 : 1),
  }));

  return (
    <ChartCard
      title={tSafe(t, "hourlyRequestVolume", "Hourly Request Volume")}
      height={height}
      standalone={standalone}
    >
      <NoSSR>
        <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="hour"
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 900, fontFamily: "var(--font-mono)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 900, fontFamily: "var(--font-mono)" }}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{
                background: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "20px",
                backdropFilter: "blur(20px)",
                padding: "16px"
              }}
              itemStyle={{ fontWeight: 900 }}
            />
            <Bar dataKey="requests" fill="url(#barGrad)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </NoSSR>
    </ChartCard>
  );
};

// 4. Pie Chart - Cloud Distribution
export const CloudDistributionPie = ({
  height = 220,
  standalone = false,
}: {
  height?: number;
  standalone?: boolean;
}) => {
  const t = useTranslations("Dashboard.Charts");
  const data = [
    { name: "AWS", value: 42 },
    { name: "Azure", value: 28 },
    { name: "GCP", value: 18 },
    { name: "OCI", value: 12 },
  ];

  return (
    <ChartCard
      title={tSafe(t, "multiCloudDistribution", "Multi-Cloud Distribution (%)")}
      height={height}
      standalone={standalone}
    >
      <NoSSR>
        <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={height < 150 ? 30 : 60}
              outerRadius={height < 150 ? 55 : 90}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  style={{ filter: `drop-shadow(0 0 15px ${COLORS[index % COLORS.length]}60)` }}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "20px",
                backdropFilter: "blur(20px)",
                padding: "12px 16px"
              }}
              itemStyle={{ fontWeight: 900, fontSize: "16px" }}
            />
            <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: "20px", fontSize: "14px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.1em" }} />
          </PieChart>
        </ResponsiveContainer>
      </NoSSR>
    </ChartCard>
  );
};

// 5. Line Chart - Uptime
export const UptimeTrend = ({
  height = 220,
  standalone = false,
}: {
  height?: number;
  standalone?: boolean;
}) => {
  const t = useTranslations("Dashboard.Charts");
  const data = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    uptime: 99.8 + Math.random() * 0.19,
  }));

  return (
    <ChartCard
      title={tSafe(t, "uptime30Day", "30-Day Uptime (%)")}
      height={height}
      standalone={standalone}
    >
      <NoSSR>
        <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 900, fontFamily: "var(--font-mono)" }}
            />
            <YAxis
              domain={[99.5, 100]}
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 900, fontFamily: "var(--font-mono)" }}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "20px",
                backdropFilter: "blur(20px)",
                padding: "16px"
              }}
              itemStyle={{ fontWeight: 900 }}
            />
            <Line type="stepAfter" dataKey="uptime" stroke="#10b981" strokeWidth={5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </NoSSR>
    </ChartCard>
  );
};

// 6. Bar Chart - Compliance Scores
export const ComplianceScoresBar = ({
  height = 220,
  standalone = false,
}: {
  height?: number;
  standalone?: boolean;
}) => {
  const t = useTranslations("Dashboard.Charts");
  const data = [
    { name: "SOC 2", score: 98 },
    { name: "GDPR", score: 95 },
    { name: "HIPAA", score: 92 },
    { name: "ISO 27001", score: 96 },
  ];

  return (
    <ChartCard
      title={tSafe(t, "complianceScores", "Compliance Framework Scores")}
      height={height}
      standalone={standalone}
    >
      <NoSSR>
        <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="rgba(255,255,255,0.08)"
            />
            <XAxis
              type="number"
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 900, fontFamily: "var(--font-mono)" }}
            />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              width={120}
              style={{ fontSize: "14px", fontWeight: 950, fontFamily: "var(--font-mono)", textTransform: "uppercase" }}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "20px",
                backdropFilter: "blur(20px)",
                padding: "16px"
              }}
              itemStyle={{ fontWeight: 900 }}
            />
            <Bar dataKey="score" radius={[0, 10, 10, 0]} barSize={height < 150 ? 12 : 30}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={0.9}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </NoSSR>
    </ChartCard>
  );
};

// 7. Area Chart - Error Rate
export const ErrorRateArea = ({
  height = 220,
  standalone = false,
}: {
  height?: number;
  standalone?: boolean;
}) => {
  const t = useTranslations("Dashboard.Charts");
  const data = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    errors: Math.max(0.1, 2 - i * 0.05),
  }));

  return (
    <ChartCard
      title={tSafe(t, "errorRateTrend", "Error Rate Trend (%)")}
      height={height}
      standalone={standalone}
    >
      <NoSSR>
        <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="errorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 900, fontFamily: "var(--font-mono)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 900, fontFamily: "var(--font-mono)" }}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "20px",
                backdropFilter: "blur(20px)",
                padding: "16px"
              }}
              itemStyle={{ fontWeight: 900 }}
            />
            <Area
              type="monotone"
              dataKey="errors"
              stroke="#ef4444"
              strokeWidth={5}
              fill="url(#errorGrad)"
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </NoSSR>
    </ChartCard>
  );
};

// 8. Bar Chart - Feature Usage
export const FeatureUsageBar = ({
  height = 220,
  standalone = false,
}: {
  height?: number;
  standalone?: boolean;
}) => {
  const t = useTranslations("Dashboard.Charts");
  const data = [
    { feature: "Multi-Cloud", usage: 85 },
    { feature: "Auto-Scaling", usage: 72 },
    { feature: "Cost Optimization", usage: 91 },
    { feature: "Security Scanning", usage: 68 },
  ];

  return (
    <ChartCard
      title={tSafe(t, "featureAdoption", "Feature Adoption Rate (%)")}
      height={height}
      standalone={standalone}
    >
      <NoSSR>
        <ResponsiveContainer width="99%" height="100%" minWidth={0} minHeight={0}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="usageGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="feature"
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "11px", fontWeight: 950, fontFamily: "var(--font-mono)", textTransform: "uppercase" }}
            />
            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 900, fontFamily: "var(--font-mono)" }}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "20px",
                backdropFilter: "blur(20px)",
                padding: "16px"
              }}
              itemStyle={{ fontWeight: 900 }}
            />
            <Bar dataKey="usage" fill="url(#usageGrad)" radius={[10, 10, 0, 0]} barSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </NoSSR>
    </ChartCard>
  );
};
