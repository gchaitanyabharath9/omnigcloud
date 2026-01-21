import React from 'react';
import MetricDashboardLayout from '@/features/dashboard/MetricDashboardLayout';
import { EnhancedCostSavingsChart, LiveROIGauge, PulsingSecurityScore, AnimatedResourceUtilization, LiveDeploymentFrequency } from '@/components/visuals/EnhancedGraphs';
import { UptimeRing } from '@/components/visuals/MetricsGraphs';
import { ErrorRateTrend, AutoScalingEvents } from '@/components/visuals/PerformanceMetrics';
import { tSafe } from '@/lib/i18n/tSafe';

// Dynamic imports need to be handled carefuly if used in a function that returns JSX
// But here they are just components used in JSX
import dynamic from 'next/dynamic';

const LatencyLineChart = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.LatencyLineChart));
const CloudDistributionPie = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.CloudDistributionPie));
const UptimeTrend = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.UptimeTrend));
const ErrorRateArea = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.ErrorRateArea));
const FeatureUsageBar = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.FeatureUsageBar));
const ComplianceScoresBar = dynamic(() => import('@/components/charts/SimpleCharts').then(mod => mod.ComplianceScoresBar));

export const getDashboardMetrics = (t: any) => ({
    'executive': {
        title: tSafe(t, 'executive.pageTitle', 'Executive Overview'),
        subtitle: tSafe(t, 'executive.pageSubtitle', 'Strategic alignment & KPI summary'),
        component: <MetricDashboardLayout
            title={tSafe(t, 'executive.title', "Strategic Alignment")}
            subtitle={tSafe(t, 'executive.subtitle', "Top-level business health indicators")}
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
                { label: tSafe(t, 'executive.stats.activeUsers', "Active Users"), value: "14.2k", trend: "12%", trendUp: true },
                { label: tSafe(t, 'executive.stats.mrr', "MRR"), value: "$1.2M", trend: "8%", trendUp: true },
                { label: tSafe(t, 'executive.stats.churn', "Churn"), value: "0.8%", trend: "0.2%", trendUp: true },
                { label: tSafe(t, 'executive.stats.nps', "NPS"), value: "72", trend: "4", trendUp: true }
            ]}
            analysis={tSafe(t, 'executive.analysis', "Overall system health is excellent. Strategic KPIs are trending positively with a significant reduction in operational overhead due to autonomous scaling.")}
            secondaryVisual={<div style={{ transform: 'scale(0.8)' }}><ComplianceScoresBar /></div>}
        />
    },
    'technical': {
        title: tSafe(t, 'technical.pageTitle', 'Technical Operations'),
        subtitle: tSafe(t, 'technical.pageSubtitle', 'System health & engineering metrics'),
        component: <MetricDashboardLayout
            title={tSafe(t, 'technical.title', "Ops Control Plane")}
            subtitle={tSafe(t, 'technical.subtitle', "Engineering velocity & stability")}
            mainVisual={<div className="scale-125"><UptimeTrend /></div>}
            stats={[
                { label: tSafe(t, 'technical.stats.prs', "Pull Requests"), value: "142", trend: "24", trendUp: true },
                { label: tSafe(t, 'technical.stats.buildTime', "Avg Build"), value: "2m", trend: "10s", trendUp: true },
                { label: tSafe(t, 'technical.stats.coverage', "Test Cov."), value: "88%", trend: "2%", trendUp: true },
                { label: tSafe(t, 'technical.stats.issues', "Issues"), value: "3", trend: "Low", trendUp: true }
            ]}
            analysis={tSafe(t, 'technical.analysis', "Technical debt reduction sprint is showing results with improved build times and higher test coverage across core microservices.")}
            secondaryVisual={<div style={{ transform: 'scale(0.8)' }}><FeatureUsageBar /></div>}
        />
    },
    'roi': {
        title: tSafe(t, 'roi.pageTitle', 'ROI Performance'),
        subtitle: tSafe(t, 'roi.pageSubtitle', 'Real-time return on investment'),
        component: <MetricDashboardLayout
            title={tSafe(t, 'roi.title', "ROI Performance")}
            subtitle={tSafe(t, 'roi.subtitle', "Real-time return on investment tracking")}
            mainVisual={<LiveROIGauge value={342} />}
            stats={[
                { label: tSafe(t, 'roi.stats.current', "Current ROI"), value: "342%", trend: "12%", trendUp: true },
                { label: tSafe(t, 'roi.stats.savings', "Net Savings"), value: "$1.2M", trend: "8%", trendUp: true },
                { label: tSafe(t, 'roi.stats.efficiency', "Efficiency"), value: "94%", trend: "2%", trendUp: true },
                { label: tSafe(t, 'roi.stats.projection', "Projection"), value: "+400%", trend: "Q4", trendUp: true }
            ]}
            analysis={tSafe(t, 'roi.analysis', "AI-driven arbitrage has optimised spot instance usage, resulting in a significantly lower TCO compared to on-demand provisioning this quarter.")}
            secondaryVisual={<div style={{ transform: 'scale(0.8)' }}><FeatureUsageBar /></div>}
        />
    },
    'cost': {
        title: tSafe(t, 'cost.pageTitle', 'Cost Arbitrage'),
        subtitle: tSafe(t, 'cost.pageSubtitle', 'Multi-cloud cost optimization'),
        component: <MetricDashboardLayout
            title={tSafe(t, 'cost.title', "Cost Savings")}
            subtitle={tSafe(t, 'cost.subtitle', "Multi-cloud cost optimization engine")}
            mainVisual={<EnhancedCostSavingsChart />}
            stats={[
                { label: tSafe(t, 'cost.stats.monthly', "Monthly Saved"), value: "$45k", trend: "15%", trendUp: true },
                { label: tSafe(t, 'cost.stats.avgNode', "Avg Cost/Node"), value: "$0.42", trend: "5%", trendUp: true },
                { label: tSafe(t, 'cost.stats.spot', "Spot Usage"), value: "68%", trend: "12%", trendUp: true },
                { label: tSafe(t, 'cost.stats.waste', "Waste Reduc."), value: "-18%", trend: "3%", trendUp: true }
            ]}
            analysis={tSafe(t, 'cost.analysis', "Multi-cloud routing is actively preventing vendor lock-in premiums by shifting non-critical workloads to OCI and Azure spot instances.")}
            secondaryVisual={<div style={{ transform: 'scale(0.8)' }}><CloudDistributionPie /></div>}
        />
    },
    'uptime': {
        title: tSafe(t, 'uptime.pageTitle', 'Global Connectivity'),
        subtitle: tSafe(t, 'uptime.pageSubtitle', 'Platform availability and uptime'),
        component: <MetricDashboardLayout
            title={tSafe(t, 'uptime.title', "System Uptime")}
            subtitle={tSafe(t, 'uptime.subtitle', "30-day global availability")}
            mainVisual={<div className="scale-125"><UptimeRing uptime={99.99} /></div>}
            stats={[
                { label: tSafe(t, 'uptime.stats.availability', "Availability"), value: "99.99%", trend: "Stable", trendUp: true },
                { label: tSafe(t, 'uptime.stats.downtime', "Downtime"), value: "0s", trend: "0%", trendUp: true },
                { label: tSafe(t, 'uptime.stats.mttr', "MTTR"), value: "14ms", trend: "2ms", trendUp: true },
                { label: tSafe(t, 'uptime.stats.incidents', "Incidents"), value: "0", trend: "Clear", trendUp: true }
            ]}
            analysis={tSafe(t, 'uptime.analysis', "Global mesh routing automatically bypassed 3 regional carrier outages in the last 24 hours, preserving 100% application uptime.")}
            secondaryVisual={<div style={{ transform: 'scale(0.8)' }}><UptimeTrend /></div>}
        />
    },
    'security': {
        title: tSafe(t, 'security.pageTitle', 'Compliance Radar'),
        subtitle: tSafe(t, 'security.pageSubtitle', 'Security posture & threat protection'),
        component: <MetricDashboardLayout
            title={tSafe(t, 'security.title', "Security Posture")}
            subtitle={tSafe(t, 'security.subtitle', "Real-time compliance monitoring")}
            mainVisual={<div className="scale-125"><PulsingSecurityScore score={94} /></div>}
            stats={[
                { label: tSafe(t, 'security.stats.score', "Security Score"), value: "94/100", trend: "2pts", trendUp: true },
                { label: tSafe(t, 'security.stats.threats', "Threats Blocked"), value: "1.4k", trend: "Low", trendUp: true },
                { label: tSafe(t, 'security.stats.compliance', "Compliance"), value: "SOC2", trend: "Pass", trendUp: true },
                { label: tSafe(t, 'security.stats.issues', "Open Issues"), value: "0", trend: "Clear", trendUp: true }
            ]}
            analysis={tSafe(t, 'security.analysis', "Automated compliance guardrails are active. No critical vulnerabilities detected in the latest continuous audit cycle.")}
            secondaryVisual={<div style={{ transform: 'scale(0.8)' }}><ComplianceScoresBar /></div>}
        />
    },
    'resources': {
        title: tSafe(t, 'resources.pageTitle', 'Resource Telemetry'),
        subtitle: tSafe(t, 'resources.pageSubtitle', 'Live infrastructure metrics'),
        component: <MetricDashboardLayout
            title={tSafe(t, 'resources.title', "Cluster Resources")}
            subtitle={tSafe(t, 'resources.subtitle', "CPU, Memory, and Storage telemetry")}
            mainVisual={<AnimatedResourceUtilization />}
            stats={[
                { label: tSafe(t, 'resources.stats.cpu', "CPU Usage"), value: "42%", trend: "Optimal", trendUp: true },
                { label: tSafe(t, 'resources.stats.memory', "Memory"), value: "64GB", trend: "Stable", trendUp: true },
                { label: tSafe(t, 'resources.stats.pods', "Active Pods"), value: "256", trend: "12", trendUp: true },
                { label: tSafe(t, 'resources.stats.nodes', "Node Count"), value: "14", trend: "Fixed", trendUp: true }
            ]}
            analysis={tSafe(t, 'resources.analysis', "Cluster auto-scaling is maintaining optimal bin packing, ensuring resources are utilized efficiently without over-provisioning.")}
            secondaryVisual={<div style={{ transform: 'scale(0.8)' }}><FeatureUsageBar /></div>}
        />
    },
    'deployment': {
        title: tSafe(t, 'deployment.pageTitle', 'Velocity Metrics'),
        subtitle: tSafe(t, 'deployment.pageSubtitle', 'Weekly deployment frequency'),
        component: <MetricDashboardLayout
            title={tSafe(t, 'deployment.title', "CI/CD Velocity")}
            subtitle={tSafe(t, 'deployment.subtitle', "Pipeline throughput and failure rate")}
            mainVisual={<LiveDeploymentFrequency />}
            stats={[
                { label: tSafe(t, 'deployment.stats.deploys', "Deploys/Day"), value: "12", trend: "2", trendUp: true },
                { label: tSafe(t, 'deployment.stats.buildTime', "Build Time"), value: "45s", trend: "5s", trendUp: true },
                { label: tSafe(t, 'deployment.stats.success', "Success Rate"), value: "100%", trend: "Stable", trendUp: true },
                { label: tSafe(t, 'deployment.stats.rollbacks', "Rollbacks"), value: "0", trend: "Clear", trendUp: true }
            ]}
            analysis={tSafe(t, 'deployment.analysis', "CI/CD pipelines are operating at peak velocity with zero regressions detected in staging or production environments today.")}
            secondaryVisual={<div style={{ transform: 'scale(0.8)' }}><UptimeTrend /></div>}
        />
    },
    'scaling': {
        title: tSafe(t, 'scaling.pageTitle', 'Auto-Scale Events'),
        subtitle: tSafe(t, 'scaling.pageSubtitle', '24-hour scaling activity'),
        component: <MetricDashboardLayout
            title={tSafe(t, 'scaling.title', "Scaling Activity")}
            subtitle={tSafe(t, 'scaling.subtitle', "Dynamic provisioning log")}
            mainVisual={<AutoScalingEvents />}
            stats={[
                { label: tSafe(t, 'scaling.stats.ups', "Scale Ups"), value: "8", trend: "Peak", trendUp: true },
                { label: tSafe(t, 'scaling.stats.downs', "Scale Downs"), value: "6", trend: "Night", trendUp: true },
                { label: tSafe(t, 'scaling.stats.savings', "Est. Savings"), value: "$204", trend: "Daily", trendUp: true },
                { label: tSafe(t, 'scaling.stats.nodes', "Max Nodes"), value: "22", trend: "Cap", trendUp: true }
            ]}
            analysis={tSafe(t, 'scaling.analysis', "Predictive scaling preempted traffic spikes in EU-West-1, keeping latency below 50ms during global user wakeup.")}
            secondaryVisual={<div style={{ transform: 'scale(0.8)' }}><LatencyLineChart /></div>}
        />
    },
    'error': {
        title: tSafe(t, 'error.pageTitle', 'Threat Analysis'),
        subtitle: tSafe(t, 'error.pageSubtitle', 'Error rate & threat trend'),
        component: <MetricDashboardLayout
            title={tSafe(t, 'error.title', "Error & Anomalies")}
            subtitle={tSafe(t, 'error.subtitle', "System-wide anomaly detection")}
            mainVisual={<ErrorRateTrend />}
            stats={[
                { label: tSafe(t, 'error.stats.errorRate', "Global Error %"), value: "0.01%", trend: "OK", trendUp: true },
                { label: tSafe(t, 'error.stats.5xx', "5xx Rates"), value: "0", trend: "Clear", trendUp: true },
                { label: tSafe(t, 'error.stats.anomalies', "Anomalies"), value: "0", trend: "Clean", trendUp: true },
                { label: tSafe(t, 'error.stats.healed', "Self-Healed"), value: "2", trend: "Auto", trendUp: true }
            ]}
            analysis={tSafe(t, 'error.analysis', "Self-healing subsystems recovered 2 pods automatically after detecting memory leaks, preventing user-facing errors.")}
            secondaryVisual={<div style={{ transform: 'scale(0.8)' }}><ErrorRateArea /></div>}
        />
    }
});
