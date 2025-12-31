import type { MultiSeriesDataPoint, DistributionDataPoint, FunnelDataPoint, TimeSeriesDataPoint } from './types';

// Latency time series data (p50, p95, p99)
export const generateLatencyData = (): MultiSeriesDataPoint[] => {
    const hours = 24;
    return Array.from({ length: hours }, (_, i) => ({
        timestamp: `${i}:00`,
        p50: Math.random() * 20 + 10,
        p95: Math.random() * 50 + 40,
        p99: Math.random() * 100 + 80
    }));
};

// Error rate data
export const generateErrorRateData = (): TimeSeriesDataPoint[] => {
    const days = 30;
    return Array.from({ length: days }, (_, i) => ({
        timestamp: `Day ${i + 1}`,
        value: Math.max(0.1, Math.random() * 2 - (i * 0.05)) // Decreasing trend
    }));
};

// Request volume / throughput
export const generateThroughputData = (): TimeSeriesDataPoint[] => {
    const hours = 24;
    return Array.from({ length: hours }, (_, i) => {
        const baseValue = 1000;
        const peakHours = i >= 9 && i <= 17; // Business hours
        const multiplier = peakHours ? 2.5 : 1;
        return {
            timestamp: `${i}:00`,
            value: Math.floor(baseValue * multiplier * (1 + Math.random() * 0.3))
        };
    });
};

// Cost savings projection
export const generateCostSavingsData = (): MultiSeriesDataPoint[] => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, i) => ({
        timestamp: month,
        withOmniGCloud: 15000 + i * 500,
        traditional: 35000 + i * 800,
        savings: 20000 + i * 300
    }));
};

// Cloud provider distribution
export const generateCloudDistribution = (): DistributionDataPoint[] => [
    { name: 'AWS', value: 42, percentage: 42, color: '#FF9900' },
    { name: 'Azure', value: 28, percentage: 28, color: '#0078D4' },
    { name: 'GCP', value: 18, percentage: 18, color: '#4285F4' },
    { name: 'OCI', value: 12, percentage: 12, color: '#F80000' }
];

// Conversion funnel
export const generateConversionFunnelData = (): FunnelDataPoint[] => [
    { stage: 'Visitors', value: 10000, percentage: 100 },
    { stage: 'Sign Ups', value: 3500, percentage: 35 },
    { stage: 'Trial Started', value: 2100, percentage: 21 },
    { stage: 'Active Users', value: 1400, percentage: 14 },
    { stage: 'Paid Customers', value: 850, percentage: 8.5 }
];

// SLA compliance over time
export const generateSLAComplianceData = (): TimeSeriesDataPoint[] => {
    const weeks = 12;
    return Array.from({ length: weeks }, (_, i) => ({
        timestamp: `W${i + 1}`,
        value: 99.5 + Math.random() * 0.48 // Between 99.5 and 99.98
    }));
};

// Region distribution
export const generateRegionData = (): DistributionDataPoint[] => [
    { name: 'US-East', value: 3500, percentage: 35, color: '#3B82F6' },
    { name: 'US-West', value: 2800, percentage: 28, color: '#8B5CF6' },
    { name: 'EU-West', value: 2100, percentage: 21, color: '#10B981' },
    { name: 'APAC', value: 1600, percentage: 16, color: '#F59E0B' }
];

// Adoption progress (cumulative)
export const generateAdoptionData = (): TimeSeriesDataPoint[] => {
    const months = 12;
    let cumulative = 0;
    return Array.from({ length: months }, (_, i) => {
        cumulative += Math.floor(Math.random() * 150 + 100);
        return {
            timestamp: `M${i + 1}`,
            value: cumulative
        };
    });
};

// Risk/Compliance scores
export const generateComplianceScores = (): DistributionDataPoint[] => [
    { name: 'SOC 2', value: 98, color: '#10B981' },
    { name: 'GDPR', value: 95, color: '#3B82F6' },
    { name: 'HIPAA', value: 92, color: '#8B5CF6' },
    { name: 'ISO 27001', value: 96, color: '#F59E0B' }
];

// Pipeline stages
export const generatePipelineData = (): FunnelDataPoint[] => [
    { stage: 'Leads', value: 5000, percentage: 100 },
    { stage: 'Qualified', value: 2500, percentage: 50 },
    { stage: 'Demo', value: 1250, percentage: 25 },
    { stage: 'Proposal', value: 625, percentage: 12.5 },
    { stage: 'Closed Won', value: 250, percentage: 5 }
];

// Revenue/ARR projection (sample)
export const generateRevenueProjection = (): MultiSeriesDataPoint[] => {
    const quarters = ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025'];
    return quarters.map((quarter, i) => ({
        timestamp: quarter,
        actual: i < 4 ? 2000000 + i * 500000 : 0,
        projected: i >= 4 ? 3500000 + (i - 4) * 600000 : 0
    }));
};

// Availability/Uptime
export const generateAvailabilityData = (): TimeSeriesDataPoint[] => {
    const days = 30;
    return Array.from({ length: days }, (_, i) => ({
        timestamp: `${i + 1}`,
        value: 99.8 + Math.random() * 0.19 // Between 99.8 and 99.99
    }));
};

// Feature usage data
export const generateFeatureUsageData = (): DistributionDataPoint[] => [
    { name: 'Multi-Cloud Deploy', value: 8500, percentage: 85, color: '#3B82F6' },
    { name: 'Auto Scaling', value: 7200, percentage: 72, color: '#8B5CF6' },
    { name: 'Cost Optimization', value: 9100, percentage: 91, color: '#10B981' },
    { name: 'Security Scanning', value: 6800, percentage: 68, color: '#F59E0B' },
    { name: 'Compliance Audit', value: 5400, percentage: 54, color: '#EF4444' }
];

// Performance scorecards
export const generatePerformanceScores = (): DistributionDataPoint[] => [
    { name: 'Latency', value: 94, color: '#10B981' },
    { name: 'Throughput', value: 89, color: '#3B82F6' },
    { name: 'Availability', value: 99, color: '#10B981' },
    { name: 'Error Rate', value: 92, color: '#8B5CF6' }
];
