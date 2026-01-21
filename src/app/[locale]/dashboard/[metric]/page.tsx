
import React from 'react';
// Force re-compile
import { notFound } from 'next/navigation';
import DashboardShell from '@/features/dashboard/DashboardShell';
import { EnhancedCostSavingsChart, LiveROIGauge, PulsingSecurityScore, AnimatedResourceUtilization, LiveDeploymentFrequency } from '@/components/visuals/EnhancedGraphs';
import { UptimeRing, ResponseTimeTrend } from '@/components/visuals/MetricsGraphs';
import { ErrorRateTrend, QueryPerformance, AutoScalingEvents } from '@/components/visuals/PerformanceMetrics';
import { TrendingUp, Zap, Globe, Shield, Activity, Server, Layers, AlertTriangle } from 'lucide-react';
import DashboardScroller from '@/features/dashboard/DashboardScroller';

// Map of metrics to their display configuration and components
import MetricDashboardLayout from '@/features/dashboard/MetricDashboardLayout';
import {
    LatencyLineChart,
    CloudDistributionPie,
    UptimeTrend,
    ErrorRateArea,
    FeatureUsageBar,
    ComplianceScoresBar
} from '@/components/charts/SimpleCharts';


import { getTranslations } from 'next-intl/server';
import { getDashboardMetrics } from '@/features/dashboard/dashboardConfig';

export default async function DashboardMetricPage({ params }: { params: Promise<{ locale: string; metric: string }> }) {
    const { locale, metric } = await params;
    const t = await getTranslations('Dashboard.Metrics');
    const METRIC_CONFIG = getDashboardMetrics(t) as Record<string, any>;

    // Verify the metric exists
    if (!METRIC_CONFIG[metric]) {
        notFound();
    }

    // Define explicit order for scrollable stream
    const METRIC_ORDER = [
        'executive', // Page 1
        'roi', 'cost', 'uptime', 'security',
        'technical', // Context switch?
        'resources', 'deployment', 'scaling', 'error'
    ];

    // Filter order to make sure we only include keys that exist
    const VALID_ORDER = METRIC_ORDER.filter(key => METRIC_CONFIG[key]);

    const activeConfig = METRIC_CONFIG[metric];

    return (
        <DashboardShell title={activeConfig.title} subtitle={activeConfig.subtitle}>
            <DashboardScroller key={metric} activeMetric={metric} configs={METRIC_CONFIG} order={VALID_ORDER} />
        </DashboardShell>
    );
}

const DASHBOARD_SECTION_IDS = [
    'executive', 'technical', 'roi', 'cost', 'uptime',
    'security', 'resources', 'deployment', 'scaling', 'error'
];

export async function generateStaticParams() {
    const locales = ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'];
    const metrics = DASHBOARD_SECTION_IDS;

    return locales.flatMap((locale) =>
        metrics.map((metric) => ({ locale, metric }))
    );
}
