const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/messages/en.json', 'utf8'));

// Ensure Dashboard namespace
if (!data.Dashboard) data.Dashboard = {};
if (!data.Dashboard.Executive) data.Dashboard.Executive = {};

data.Dashboard.Executive = {
    title: "EXECUTIVE OVERVIEW",
    version: "STRATEGIC_ALIGNMENT_VIEW_v4.2.1",
    status: {
        operational: "operational",
        degraded: "degraded",
        critical: "critical"
    },
    metrics: {
        activeAssets: "Active Assets",
        revenueImpact: "Revenue Impact",
        cloudSpend: "Cloud Spend",
        systemHealth: "System Health",
        healthStatus: "OPTIMAL"
    },
    roi: {
        title: "Executive Overview",
        subtitle: "Real-time return on investment",
        badge: "GROWING"
    },
    cost: {
        title: "Cost Arbitrage",
        subtitle: "Multi-cloud cost optimization",
        impact: "$45K SAVED THIS MONTH • 275% YOY INCREASE"
    },
    uptime: {
        title: "Global Connectivity",
        subtitle: "Platform availability and uptime"
    },
    compliance: {
        title: "Compliance Radar",
        subtitle: "Security posture & threat protection"
    }
};

fs.writeFileSync('src/messages/en.json', JSON.stringify(data, null, 2));
console.log('✅ Added Executive Dashboard keys');
