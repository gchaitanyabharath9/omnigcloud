"use client";

import React from "react";
import DashboardShell from "@/features/dashboard/DashboardShell";
import DashboardScroller from "@/features/dashboard/DashboardScroller";
import { useTranslations } from "next-intl";
import { getDashboardMetrics } from "@/features/dashboard/dashboardConfig";

export default function TechnicalDashboardPage() {
  const t = useTranslations("Dashboard.Metrics");
  const METRIC_CONFIG = getDashboardMetrics(t) as Record<string, any>;
  const metric = "technical";

  const METRIC_ORDER = [
    "executive",
    "roi",
    "cost",
    "uptime",
    "security",
    "technical",
    "resources",
    "deployment",
    "scaling",
    "error",
  ];

  const VALID_ORDER = METRIC_ORDER.filter((key) => METRIC_CONFIG[key]);
  const activeConfig = METRIC_CONFIG[metric];

  if (!activeConfig) return null;

  return (
    <DashboardShell title={activeConfig.title} subtitle={activeConfig.subtitle}>
      <DashboardScroller
        activeMetric={metric}
        configs={METRIC_CONFIG}
        order={VALID_ORDER}
      />
    </DashboardShell>
  );
}
