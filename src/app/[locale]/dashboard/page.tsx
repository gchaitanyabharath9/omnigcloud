"use client";

import React, { useState, useEffect } from 'react';
import DashboardShell from '@/features/dashboard/DashboardShell';
import { EnhancedCostSavingsChart, LiveROIGauge, PulsingSecurityScore, AnimatedResourceUtilization, LiveDeploymentFrequency } from '@/components/visuals/EnhancedGraphs';
import { UptimeRing, ResponseTimeTrend } from '@/components/visuals/MetricsGraphs';
import { ErrorRateTrend, QueryPerformance, AutoScalingEvents } from '@/components/visuals/PerformanceMetrics';
import { TrendingUp, Zap, Globe, Shield, Activity, Server, Layers, AlertTriangle } from 'lucide-react';
import DashboardScroller from '@/features/dashboard/DashboardScroller';

// Map of metrics to their display configuration and components
import MetricDashboardLayout from '@/features/dashboard/MetricDashboardLayout';
import dynamic from 'next/dynamic';

const LatencyLineChart = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.LatencyLineChart), { ssr: false });
const CloudDistributionPie = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.CloudDistributionPie), { ssr: false });
const UptimeTrend = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.UptimeTrend), { ssr: false });
const ErrorRateArea = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.ErrorRateArea), { ssr: false });
const FeatureUsageBar = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.FeatureUsageBar), { ssr: false });
const ComplianceScoresBar = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.ComplianceScoresBar), { ssr: false });

const METRIC_CONFIG: Record<string, any> = {
    // EXECUTIVE SUMMARY (The "Page 1")
    'executive': {
        title: 'Executive Overview',
        subtitle: 'Strategic alignment & KPI summary',
        component: <MetricDashboardLayout
            title="Strategic Alignment"
            subtitle="Top-level business health indicators"
            mainVisual={
                <div className="flex flex-col items-center justify-center h-full gap-4">
                    <div className="text-6xl font-black text-white">98.4%</div>
                    <div className="text-sm font-mono text-emerald-400">HEALTH SCORE</div>
                    <div className="w-full max-w-md h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 w-[98.4%]" />
                    </div>
                </div>
            }
            stats={[
                { label: "Active Users", value: "14.2k", trend: "12%", trendUp: true },
                { label: "MRR", value: "$1.2M", trend: "8%", trendUp: true },
                { label: "Churn", value: "0.8%", trend: "0.2%", trendUp: true },
                { label: "NPS", value: "72", trend: "4", trendUp: true }
            ]}
            analysis="Overall system health is excellent. Strategic KPIs are trending positively with a significant reduction in operational overhead due to autonomous scaling."
            secondaryVisual={<div style={{ transform: 'scale(0.8)' }}><ComplianceScoresBar /></div>}
        />
    },
    // TECHNICAL SUMMARY
    'technical': {
        title: 'Technical Operations',
        subtitle: 'System health & engineering metrics',
        component: <MetricDashboardLayout
            title="Ops Control Plane"
            subtitle="Engineering velocity & stability"
            mainVisual={<div className="scale-125"><UptimeTrend /></div>}
            stats={[
                { label: "Pull Requests", value: "142", trend: "24", trendUp: true },
                { label: "Avg Build", value: "2m", trend: "10s", trendUp: true },
                { label: "Test Cov.", value: "88%", trend: "2%", trendUp: true },
                { label: "Issues", value: "3", trend: "Low", trendUp: true }
            ]}
            analysis="Technical debt reduction sprint is showing results with improved build times and higher test coverage across core microservices."
            secondaryVisual={<div style={{ transform: 'scale(0.8)' }}><FeatureUsageBar /></div>}
        />
    },

    // EXECUTIVE METRICS
    'roi': {
        title: 'ROI Performance',
        subtitle: 'Real-time return on investment',
        component: <MetricDashboardLayout
            title="ROI Performance"
            subtitle="Real-time return on investment tracking"
            mainVisual={<LiveROIGauge value={342} />}
            stats={[
                { label: "Current ROI", value: "342%", trend: "12%", trendUp: true },
                { label: "Net Savings", value: "$1.2M", trend: "8%", trendUp: true },
                { label: "Efficiency", value: "94%", trend: "2%", trendUp: true },
                { label: "Projection", value: "+400%", trend: "Q4", trendUp: true }
            ]}
            analysis="AI-driven arbitrage has optimised spot instance usage, resulting in a significantly lower TCO compared to on-demand provisioning this quarter."
            secondaryVisual={<div style={{ transform: 'scale(0.8)' }}><FeatureUsageBar /></div>}
        />
    },
    'cost': {
        title: 'Cost Arbitrage',
        subtitle: 'Multi-cloud cost optimization',
        component: <MetricDashboardLayout
            title="Cost Savings"
            subtitle="Multi-cloud cost optimization engine"
            mainVisual={<EnhancedCostSavingsChart />}
            stats={[
                { label: "Monthly Saved", value: "$45k", trend: "15%", trendUp: true },
                { label: "Avg Cost/Node", value: "$0.42", trend: "5%", trendUp: true },
                { label: "Spot Usage", value: "68%", trend: "12%", trendUp: true },
                { label: "Waste Reduc.", value: "-18%", trend: "3%", trendUp: true }
            ]}
            analysis="Multi-cloud routing is actively preventing vendor lock-in premiums by shifting non-critical workloads to OCI and Azure spot instances."
            secondaryVisual={<div style={{ transform: 'scale(0.8)' }}><CloudDistributionPie /></div>}
        />
    },
    'uptime': {
        title: 'Global Connectivity',
        subtitle: 'Platform availability and uptime',
        component: <MetricDashboardLayout
            title="System Uptime"
            subtitle="30-day global availability"
            mainVisual={<div className="scale-125"><UptimeRing uptime={99.99} /></div>}
            stats={[
                { label: "Availability", value: "99.99%", trend: "Stable", trendUp: true },
                { label: "Downtime", value: "0s", trend: "0%", trendUp: true },
                { label: "MTTR", value: "14ms", trend: "2ms", trendUp: true },
                { label: "Incidents", value: "0", trend: "Clear", trendUp: true }
            ]}
            analysis="Global mesh routing automatically bypassed 3 regional carrier outages in the last 24 hours, preserving 100% application uptime."
            secondaryVisual={<div style={{ transform: 'scale(0.8)' }}><UptimeTrend /></div>}
        />
    },
    'security': {
        title: 'Compliance Radar',
        subtitle: 'Security posture & threat protection',
        component: <MetricDashboardLayout
            title="Security Posture"
            subtitle="Real-time compliance monitoring"
            mainVisual={<div className="scale-125"><PulsingSecurityScore score={94} /></div>}
            stats={[
                { label: "Security Score", value: "94/100", trend: "2pts", trendUp: true },
                { label: "Threats Blocked", value: "1.4k", trend: "Low", trendUp: true },
                { label: "Compliance", value: "SOC2", trend: "Pass", trendUp: true },
                { label: "Open Issues", value: "0", trend: "Clear", trendUp: true }
            ]}
            analysis="Automated compliance guardrails are active. No critical vulnerabilities detected in the latest continuous audit cycle."
            secondaryVisual={<div style={{ transform: 'scale(0.8)' }}><ComplianceScoresBar /></div>}
        />
    },

    // TECHNICAL
    'resources': {
        title: 'Resource Telemetry',
        subtitle: 'Live infrastructure metrics',
        component: <MetricDashboardLayout
            title="Cluster Resources"
            subtitle="CPU, Memory, and Storage telemetry"
            mainVisual={<AnimatedResourceUtilization />}
            stats={[
                { label: "CPU Usage", value: "42%", trend: "Optimal", trendUp: true },
                { label: "Memory", value: "64GB", trend: "Stable", trendUp: true },
                { label: "Active Pods", value: "256", trend: "12", trendUp: true },
                { label: "Node Count", value: "14", trend: "Fixed", trendUp: true }
            ]}
            analysis="Cluster auto-scaling is maintaining optimal bin packing, ensuring resources are utilized efficiently without over-provisioning."
            secondaryVisual={<div style={{ transform: 'scale(0.8)' }}><FeatureUsageBar /></div>}
        />
    },
    'deployment': {
        title: 'Velocity Metrics',
        subtitle: 'Weekly deployment frequency',
        component: <MetricDashboardLayout
            title="CI/CD Velocity"
            subtitle="Pipeline throughput and failure rate"
            mainVisual={<LiveDeploymentFrequency />}
            stats={[
                { label: "Deploys/Day", value: "12", trend: "2", trendUp: true },
                { label: "Build Time", value: "45s", trend: "5s", trendUp: true },
                { label: "Success Rate", value: "100%", trend: "Stable", trendUp: true },
                { label: "Rollbacks", value: "0", trend: "Clear", trendUp: true }
            ]}
            analysis="CI/CD pipelines are operating at peak velocity with zero regressions detected in staging or production environments today."
            secondaryVisual={<div style={{ transform: 'scale(0.8)' }}><UptimeTrend /></div>}
        />
    },
    'scaling': {
        title: 'Auto-Scale Events',
        subtitle: '24-hour scaling activity',
        component: <MetricDashboardLayout
            title="Scaling Activity"
            subtitle="Dynamic provisioning log"
            mainVisual={<AutoScalingEvents />}
            stats={[
                { label: "Scale Ups", value: "8", trend: "Peak", trendUp: true },
                { label: "Scale Downs", value: "6", trend: "Night", trendUp: true },
                { label: "Est. Savings", value: "$204", trend: "Daily", trendUp: true },
                { label: "Max Nodes", value: "22", trend: "Cap", trendUp: true }
            ]}
            analysis="Predictive scaling preempted traffic spikes in EU-West-1, keeping latency below 50ms during global user wakeup."
            secondaryVisual={<div style={{ transform: 'scale(0.8)' }}><LatencyLineChart /></div>}
        />
    },
    'error': {
        title: 'Threat Analysis',
        subtitle: 'Error rate & threat trend',
        component: <MetricDashboardLayout
            title="Error & Anomalies"
            subtitle="System-wide anomaly detection"
            mainVisual={<ErrorRateTrend />}
            stats={[
                { label: "Global Error %", value: "0.01%", trend: "OK", trendUp: true },
                { label: "5xx Rates", value: "0", trend: "Clear", trendUp: true },
                { label: "Anomalies", value: "0", trend: "Clean", trendUp: true },
                { label: "Self-Healed", value: "2", trend: "Auto", trendUp: true }
            ]}
            analysis="Self-healing subsystems recovered 2 pods automatically after detecting memory leaks, preventing user-facing errors."
            secondaryVisual={<div style={{ transform: 'scale(0.8)' }}><ErrorRateArea /></div>}
        />
    }
};

export default function DashboardPage() {
    const [activeMetric, setActiveMetric] = useState('executive');
    const [title, setTitle] = useState('Executive Overview');
    const [subtitle, setSubtitle] = useState('Strategic alignment & KPI summary');

    // Define explicit order for scrollable stream
    const METRIC_ORDER = [
        'executive',
        'roi', 'cost', 'uptime', 'security',
        'technical',
        'resources', 'deployment', 'scaling', 'error'
    ];

    // Filter order to make sure we only include keys that exist
    const VALID_ORDER = METRIC_ORDER.filter(key => METRIC_CONFIG[key]);

    // Handle hash changes
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            const metric = hash || 'executive';

            if (METRIC_CONFIG[metric]) {
                setActiveMetric(metric);
                setTitle(METRIC_CONFIG[metric].title);
                setSubtitle(METRIC_CONFIG[metric].subtitle);
            }
        };

        // Set initial state
        handleHashChange();

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <DashboardShell title={title} subtitle={subtitle}>
            <DashboardScroller activeMetric={activeMetric} configs={METRIC_CONFIG} order={VALID_ORDER} />
        </DashboardShell>
    );
}
