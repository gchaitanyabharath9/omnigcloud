import React from "react";
import MetricDashboardLayout from "@/features/dashboard/MetricDashboardLayout";
import {
  EnhancedCostSavingsChart,
  LiveROIGauge,
  PulsingSecurityScore,
  AnimatedResourceUtilization,
  LiveDeploymentFrequency,
} from "@/components/visuals/EnhancedGraphs";
import { UptimeRing } from "@/components/visuals/MetricsGraphs";
import { ErrorRateTrend, AutoScalingEvents } from "@/components/visuals/PerformanceMetrics";
import { FullVisual } from "@/components/visuals/FullVisual";
import { tSafe } from "@/lib/i18n/tSafe";

import dynamic from "next/dynamic";

const LatencyLineChart = dynamic(() =>
  import("@/components/charts/SimpleCharts").then((mod) => mod.LatencyLineChart)
);
const CloudDistributionPie = dynamic(() =>
  import("@/components/charts/SimpleCharts").then((mod) => mod.CloudDistributionPie)
);
const UptimeTrend = dynamic(() =>
  import("@/components/charts/SimpleCharts").then((mod) => mod.UptimeTrend)
);
const ErrorRateArea = dynamic(() =>
  import("@/components/charts/SimpleCharts").then((mod) => mod.ErrorRateArea)
);
const FeatureUsageBar = dynamic(() =>
  import("@/components/charts/SimpleCharts").then((mod) => mod.FeatureUsageBar)
);
const ComplianceScoresBar = dynamic(() =>
  import("@/components/charts/SimpleCharts").then((mod) => mod.ComplianceScoresBar)
);

export const getDashboardMetrics = (t: any) => ({
  executive: {
    title: tSafe(t, "executive.pageTitle", "Executive Overview"),
    subtitle: tSafe(t, "executive.pageSubtitle", "Strategic alignment & KPI summary"),
    component: (
      <MetricDashboardLayout
        title={tSafe(t, "executive.title", "Strategic Alignment")}
        subtitle={tSafe(t, "executive.subtitle", "Top-level business health indicators")}
        mainVisual={
          <FullVisual imageSrc="/images/dashboard/executive.png">
            <div className="flex flex-col items-center justify-center gap-6 p-8 glass-panel rounded-[2rem] border-white/20 shadow-2xl scale-125">
              <div className="text-7xl font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">98.4%</div>
              <div className="text-xs font-black font-mono text-emerald-400 tracking-[0.3em]">
                {tSafe(t, "common.healthScore", "HEALTH_SCORE_v8")}
              </div>
              <div className="w-64 h-2.5 bg-white/10 rounded-full overflow-hidden border border-white/5 shadow-inner">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 w-[98.4%] animate-shimmer" />
              </div>
            </div>
          </FullVisual>
        }
        stats={[
          {
            label: tSafe(t, "executive.stats.activeUsers", "Active Users"),
            value: "14.2k",
            trend: "12%",
            trendUp: true,
          },
          {
            label: tSafe(t, "executive.stats.mrr", "MRR"),
            value: "$1.2M",
            trend: "8%",
            trendUp: true,
          },
          {
            label: tSafe(t, "executive.stats.churn", "Churn"),
            value: "0.8%",
            trend: "0.2%",
            trendUp: true,
          },
          { label: tSafe(t, "executive.stats.nps", "NPS"), value: "72", trend: "4", trendUp: true },
        ]}
        analysis={tSafe(
          t,
          "executive.analysis",
          "Overall system health is excellent. Strategic KPIs are trending positively with a significant reduction in operational overhead due to autonomous scaling."
        )}
        secondaryVisual={<ComplianceScoresBar standalone={true} />}
      />
    ),
  },
  technical: {
    title: tSafe(t, "technical.pageTitle", "Technical Operations"),
    subtitle: tSafe(t, "technical.pageSubtitle", "System health & engineering metrics"),
    component: (
      <MetricDashboardLayout
        title={tSafe(t, "technical.title", "Ops Control Plane")}
        subtitle={tSafe(t, "technical.subtitle", "Engineering velocity & stability")}
        mainVisual={
          <FullVisual imageSrc="/images/dashboard/technical.png">
            <div className="w-full h-full scale-110">
              <UptimeTrend standalone={true} height={300} />
            </div>
          </FullVisual>
        }
        stats={[
          {
            label: tSafe(t, "technical.stats.prs", "Pull Requests"),
            value: "142",
            trend: "24",
            trendUp: true,
          },
          {
            label: tSafe(t, "technical.stats.buildTime", "Avg Build"),
            value: "2m",
            trend: "10s",
            trendUp: true,
          },
          {
            label: tSafe(t, "technical.stats.coverage", "Test Cov."),
            value: "88%",
            trend: "2%",
            trendUp: true,
          },
          {
            label: tSafe(t, "technical.stats.issues", "Issues"),
            value: "3",
            trend: "Low",
            trendUp: true,
          },
        ]}
        analysis={tSafe(
          t,
          "technical.analysis",
          "Technical debt reduction sprint is showing results with improved build times and higher test coverage across core microservices."
        )}
        secondaryVisual={<FeatureUsageBar standalone={true} />}
      />
    ),
  },
  roi: {
    title: tSafe(t, "roi.pageTitle", "ROI Performance"),
    subtitle: tSafe(t, "roi.pageSubtitle", "Real-time return on investment"),
    component: (
      <MetricDashboardLayout
        title={tSafe(t, "roi.title", "ROI Performance")}
        subtitle={tSafe(t, "roi.subtitle", "Real-time return on investment tracking")}
        mainVisual={
          <FullVisual imageSrc="/images/dashboard/roi.png">
            <div className="scale-125">
              <LiveROIGauge value={342} />
            </div>
          </FullVisual>
        }
        stats={[
          {
            label: tSafe(t, "roi.stats.current", "Current ROI"),
            value: "342%",
            trend: "12%",
            trendUp: true,
          },
          {
            label: tSafe(t, "roi.stats.savings", "Net Savings"),
            value: "$1.2M",
            trend: "8%",
            trendUp: true,
          },
          {
            label: tSafe(t, "roi.stats.efficiency", "Efficiency"),
            value: "94%",
            trend: "2%",
            trendUp: true,
          },
          {
            label: tSafe(t, "roi.stats.projection", "Projection"),
            value: "+400%",
            trend: "Q4",
            trendUp: true,
          },
        ]}
        analysis={tSafe(
          t,
          "roi.analysis",
          "AI-driven arbitrage has optimised spot instance usage, resulting in a significantly lower TCO compared to on-demand provisioning this quarter."
        )}
        secondaryVisual={<FeatureUsageBar standalone={true} />}
      />
    ),
  },
  cost: {
    title: tSafe(t, "cost.pageTitle", "Cost Arbitrage"),
    subtitle: tSafe(t, "cost.pageSubtitle", "Multi-cloud cost optimization"),
    component: (
      <MetricDashboardLayout
        title={tSafe(t, "cost.title", "Cost Savings")}
        subtitle={tSafe(t, "cost.subtitle", "Multi-cloud cost optimization engine")}
        mainVisual={
          <FullVisual imageSrc="/images/dashboard/roi.png">
            <div className="w-full h-full p-4">
              <EnhancedCostSavingsChart />
            </div>
          </FullVisual>
        }
        stats={[
          {
            label: tSafe(t, "cost.stats.monthly", "Monthly Saved"),
            value: "$45k",
            trend: "15%",
            trendUp: true,
          },
          {
            label: tSafe(t, "cost.stats.avgNode", "Avg Cost/Node"),
            value: "$0.42",
            trend: "5%",
            trendUp: true,
          },
          {
            label: tSafe(t, "cost.stats.spot", "Spot Usage"),
            value: "68%",
            trend: "12%",
            trendUp: true,
          },
          {
            label: tSafe(t, "cost.stats.waste", "Waste Reduc."),
            value: "-18%",
            trend: "3%",
            trendUp: true,
          },
        ]}
        analysis={tSafe(
          t,
          "cost.analysis",
          "Multi-cloud routing is actively preventing vendor lock-in premiums by shifting non-critical workloads to OCI and Azure spot instances."
        )}
        secondaryVisual={<CloudDistributionPie standalone={true} />}
      />
    ),
  },
  uptime: {
    title: tSafe(t, "uptime.pageTitle", "Global Connectivity"),
    subtitle: tSafe(t, "uptime.pageSubtitle", "Platform availability and uptime"),
    component: (
      <MetricDashboardLayout
        title={tSafe(t, "uptime.title", "System Uptime")}
        subtitle={tSafe(t, "uptime.subtitle", "30-day global availability")}
        mainVisual={
          <FullVisual imageSrc="/images/dashboard/connectivity.png">
            <div className="scale-150 drop-shadow-[0_0_40px_rgba(16,185,129,0.4)]">
              <UptimeRing />
            </div>
          </FullVisual>
        }
        stats={[
          {
            label: tSafe(t, "uptime.stats.availability", "Availability"),
            value: "99.99%",
            trend: "Stable",
            trendUp: true,
          },
          {
            label: tSafe(t, "uptime.stats.downtime", "Downtime"),
            value: "0s",
            trend: "0%",
            trendUp: true,
          },
          {
            label: tSafe(t, "uptime.stats.mttr", "MTTR"),
            value: "14ms",
            trend: "2ms",
            trendUp: true,
          },
          {
            label: tSafe(t, "uptime.stats.incidents", "Incidents"),
            value: "0",
            trend: "Clear",
            trendUp: true,
          },
        ]}
        analysis={tSafe(
          t,
          "uptime.analysis",
          "Global mesh routing automatically bypassed 3 regional carrier outages in the last 24 hours, preserving 100% application uptime."
        )}
        secondaryVisual={<UptimeTrend standalone={true} />}
      />
    ),
  },
  security: {
    title: tSafe(t, "security.pageTitle", "Compliance Radar"),
    subtitle: tSafe(t, "security.pageSubtitle", "Security posture & threat protection"),
    component: (
      <MetricDashboardLayout
        title={tSafe(t, "security.title", "Security Posture")}
        subtitle={tSafe(t, "security.subtitle", "Real-time compliance monitoring")}
        mainVisual={
          <FullVisual imageSrc="/images/dashboard/security.png">
            <div className="scale-150 drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <PulsingSecurityScore score={94} />
            </div>
          </FullVisual>
        }
        stats={[
          {
            label: tSafe(t, "security.stats.score", "Security Score"),
            value: "94/100",
            trend: "2pts",
            trendUp: true,
          },
          {
            label: tSafe(t, "security.stats.threats", "Threats Blocked"),
            value: "1.4k",
            trend: "Low",
            trendUp: true,
          },
          {
            label: tSafe(t, "security.stats.compliance", "Compliance"),
            value: "SOC2",
            trend: "Pass",
            trendUp: true,
          },
          {
            label: tSafe(t, "security.stats.issues", "Open Issues"),
            value: "0",
            trend: "Clear",
            trendUp: true,
          },
        ]}
        analysis={tSafe(
          t,
          "security.analysis",
          "Automated compliance guardrails are active. No critical vulnerabilities detected in the latest continuous audit cycle."
        )}
        secondaryVisual={<ComplianceScoresBar standalone={true} />}
      />
    ),
  },
  resources: {
    title: tSafe(t, "resources.pageTitle", "Resource Telemetry"),
    subtitle: tSafe(t, "resources.pageSubtitle", "Live infrastructure metrics"),
    component: (
      <MetricDashboardLayout
        title={tSafe(t, "resources.title", "Cluster Resources")}
        subtitle={tSafe(t, "resources.subtitle", "CPU, Memory, and Storage telemetry")}
        mainVisual={
          <FullVisual imageSrc="/images/dashboard/infrastructure.png">
            <div className="w-full h-full flex flex-col items-center justify-center p-6 scale-125">
              <AnimatedResourceUtilization />
            </div>
          </FullVisual>
        }
        stats={[
          {
            label: tSafe(t, "resources.stats.cpu", "CPU Usage"),
            value: "42%",
            trend: "Optimal",
            trendUp: true,
          },
          {
            label: tSafe(t, "resources.stats.memory", "Memory"),
            value: "64GB",
            trend: "Stable",
            trendUp: true,
          },
          {
            label: tSafe(t, "resources.stats.pods", "Active Pods"),
            value: "256",
            trend: "12",
            trendUp: true,
          },
          {
            label: tSafe(t, "resources.stats.nodes", "Node Count"),
            value: "14",
            trend: "Fixed",
            trendUp: true,
          },
        ]}
        analysis={tSafe(
          t,
          "resources.analysis",
          "Cluster auto-scaling is maintaining optimal bin packing, ensuring resources are utilized efficiently without over-provisioning."
        )}
        secondaryVisual={<FeatureUsageBar standalone={true} />}
      />
    ),
  },
  deployment: {
    title: tSafe(t, "deployment.pageTitle", "Velocity Metrics"),
    subtitle: tSafe(t, "deployment.pageSubtitle", "Weekly deployment frequency"),
    component: (
      <MetricDashboardLayout
        title={tSafe(t, "deployment.title", "CI/CD Velocity")}
        subtitle={tSafe(t, "deployment.subtitle", "Pipeline throughput and failure rate")}
        mainVisual={
          <FullVisual imageSrc="/images/dashboard/deployment.png">
            <div className="scale-125">
              <LiveDeploymentFrequency />
            </div>
          </FullVisual>
        }
        stats={[
          {
            label: tSafe(t, "deployment.stats.deploys", "Deploys/Day"),
            value: "12",
            trend: "2",
            trendUp: true,
          },
          {
            label: tSafe(t, "deployment.stats.buildTime", "Build Time"),
            value: "45s",
            trend: "5s",
            trendUp: true,
          },
          {
            label: tSafe(t, "deployment.stats.success", "Success Rate"),
            value: "100%",
            trend: "Stable",
            trendUp: true,
          },
          {
            label: tSafe(t, "deployment.stats.rollbacks", "Rollbacks"),
            value: "0",
            trend: "Clear",
            trendUp: true,
          },
        ]}
        analysis={tSafe(
          t,
          "deployment.analysis",
          "CI/CD pipelines are operating at peak velocity with zero regressions detected in staging or production environments today."
        )}
        secondaryVisual={<UptimeTrend standalone={true} />}
      />
    ),
  },
  scaling: {
    title: tSafe(t, "scaling.pageTitle", "Auto-Scale Events"),
    subtitle: tSafe(t, "scaling.pageSubtitle", "24-hour scaling activity"),
    component: (
      <MetricDashboardLayout
        title={tSafe(t, "scaling.title", "Scaling Activity")}
        subtitle={tSafe(t, "scaling.subtitle", "Dynamic provisioning log")}
        mainVisual={
          <FullVisual imageSrc="/images/dashboard/executive.png">
            <AutoScalingEvents />
          </FullVisual>
        }
        stats={[
          {
            label: tSafe(t, "scaling.stats.ups", "Scale Ups"),
            value: "8",
            trend: "Peak",
            trendUp: true,
          },
          {
            label: tSafe(t, "scaling.stats.downs", "Scale Downs"),
            value: "6",
            trend: "Night",
            trendUp: true,
          },
          {
            label: tSafe(t, "scaling.stats.savings", "Est. Savings"),
            value: "$204",
            trend: "Daily",
            trendUp: true,
          },
          {
            label: tSafe(t, "scaling.stats.nodes", "Max Nodes"),
            value: "22",
            trend: "Cap",
            trendUp: true,
          },
        ]}
        analysis={tSafe(
          t,
          "scaling.analysis",
          "Predictive scaling preempted traffic spikes in EU-West-1, keeping latency below 50ms during global user wakeup."
        )}
        secondaryVisual={<LatencyLineChart standalone={true} />}
      />
    ),
  },
  error: {
    title: tSafe(t, "error.pageTitle", "Threat Analysis"),
    subtitle: tSafe(t, "error.pageSubtitle", "Error rate & threat trend"),
    component: (
      <MetricDashboardLayout
        title={tSafe(t, "error.title", "Error & Anomalies")}
        subtitle={tSafe(t, "error.subtitle", "System-wide anomaly detection")}
        mainVisual={
          <FullVisual imageSrc="/images/dashboard/anomalies.png">
            <div className="w-full h-full scale-125">
              <ErrorRateTrend />
            </div>
          </FullVisual>
        }
        stats={[
          {
            label: tSafe(t, "error.stats.errorRate", "Global Error %"),
            value: "0.01%",
            trend: "OK",
            trendUp: true,
          },
          {
            label: tSafe(t, "error.stats.5xx", "5xx Rates"),
            value: "0",
            trend: "Clear",
            trendUp: true,
          },
          {
            label: tSafe(t, "error.stats.anomalies", "Anomalies"),
            value: "0",
            trend: "Clean",
            trendUp: true,
          },
          {
            label: tSafe(t, "error.stats.healed", "Self-Healed"),
            value: "2",
            trend: "Auto",
            trendUp: true,
          },
        ]}
        analysis={tSafe(
          t,
          "error.analysis",
          "Self-healing subsystems recovered 2 pods automatically after detecting memory leaks, preventing user-facing errors."
        )}
        secondaryVisual={<ErrorRateArea standalone={true} />}
      />
    ),
  },
});
