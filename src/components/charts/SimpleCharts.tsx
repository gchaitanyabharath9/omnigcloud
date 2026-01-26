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
        <div className="text-[12px] font-mono text-primary/60 uppercase tracking-[0.2em] font-black mb-2">
          {tSafe(t, "syncing", "Data Synchronizing")}
        </div>
        <div className="flex gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-bounce"
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
        <div className="w-full h-full relative transition-transform duration-500 group-hover:scale-[1.01]">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-4 rounded-xl flex flex-col border-white/10 hover:border-primary/30 transition-all duration-300 group">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[13px] font-black uppercase opacity-80 tracking-[0.2em] font-mono text-primary">
            {title}
          </h3>
          <div className="w-2 h-2 rounded-full bg-primary/20 animate-pulse hidden group-hover:block" />
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
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="hour"
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 700, fontFamily: "var(--font-mono)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 700, fontFamily: "var(--font-mono)" }}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                backdropFilter: "blur(16px)",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
              }}
              itemStyle={{ fontSize: "11px", fontWeight: 700 }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ paddingTop: "20px", fontSize: "12px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em" }}
            />
            <Line
              type="monotone"
              dataKey="p50"
              stroke="#10b981"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="p95"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="p99"
              stroke="#ef4444"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
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
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOpt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 700, fontFamily: "var(--font-mono)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 700, fontFamily: "var(--font-mono)" }}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                backdropFilter: "blur(16px)",
              }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ paddingTop: "15px", fontSize: "10px", fontWeight: 700 }}
            />
            <Area
              type="monotone"
              dataKey="traditional"
              stackId="1"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#colorTrad)"
              fillOpacity={1}
            />
            <Area
              type="monotone"
              dataKey="optimized"
              stackId="2"
              stroke="#3b82f6"
              strokeWidth={2}
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
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="hour"
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 700, fontFamily: "var(--font-mono)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 700, fontFamily: "var(--font-mono)" }}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{
                background: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                backdropFilter: "blur(16px)",
              }}
            />
            <Bar dataKey="requests" fill="url(#barGrad)" radius={[4, 4, 0, 0]} />
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
              innerRadius={height < 150 ? 25 : 45}
              outerRadius={height < 150 ? 45 : 70}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  style={{ filter: `drop-shadow(0 0 5px ${COLORS[index % COLORS.length]}40)` }}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                backdropFilter: "blur(16px)",
              }}
            />
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
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 700, fontFamily: "var(--font-mono)" }}
            />
            <YAxis
              domain={[99.5, 100]}
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 700, fontFamily: "var(--font-mono)" }}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                backdropFilter: "blur(16px)",
              }}
            />
            <Line type="stepAfter" dataKey="uptime" stroke="#10b981" strokeWidth={3} dot={false} />
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
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              type="number"
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 700, fontFamily: "var(--font-mono)" }}
            />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              width={100}
              style={{ fontSize: "12px", fontWeight: 700, fontFamily: "var(--font-mono)" }}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                backdropFilter: "blur(16px)",
              }}
            />
            <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={height < 150 ? 8 : 12}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={0.8}
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
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="errorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 700, fontFamily: "var(--font-mono)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 700, fontFamily: "var(--font-mono)" }}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                backdropFilter: "blur(16px)",
              }}
            />
            <Area
              type="monotone"
              dataKey="errors"
              stroke="#ef4444"
              strokeWidth={3}
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
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="usageGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="feature"
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 700, fontFamily: "var(--font-mono)" }}
            />
            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              stroke="#94a3b8"
              style={{ fontSize: "12px", fontWeight: 700, fontFamily: "var(--font-mono)" }}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                backdropFilter: "blur(16px)",
              }}
            />
            <Bar dataKey="usage" fill="url(#usageGrad)" radius={[4, 4, 0, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </NoSSR>
    </ChartCard>
  );
};
