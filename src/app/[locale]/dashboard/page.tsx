"use client";

import React, { useState, useEffect } from 'react';
import DashboardShell from '@/features/dashboard/DashboardShell';
import { EnhancedCostSavingsChart, LiveROIGauge, PulsingSecurityScore, AnimatedResourceUtilization, LiveDeploymentFrequency } from '@/components/visuals/EnhancedGraphs';
import { UptimeRing, ResponseTimeTrend } from '@/components/visuals/MetricsGraphs';
import { ErrorRateTrend, QueryPerformance, AutoScalingEvents } from '@/components/visuals/PerformanceMetrics';
import { TrendingUp, Zap, Globe, Shield, Activity, Server, Layers, AlertTriangle } from 'lucide-react';
import DashboardScroller from '@/features/dashboard/DashboardScroller';

// Map of metrics to their display configuration and components
import { useTranslations } from 'next-intl';
import { getDashboardMetrics } from '@/features/dashboard/dashboardConfig';

export default function DashboardPage() {
    const t = useTranslations('Dashboard.Metrics');
    const METRIC_CONFIG = getDashboardMetrics(t) as Record<string, any>;
    const [activeMetric, setActiveMetric] = useState('executive');
    const [title, setTitle] = useState(METRIC_CONFIG['executive']?.title || '');
    const [subtitle, setSubtitle] = useState(METRIC_CONFIG['executive']?.subtitle || '');

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
    }, [METRIC_CONFIG]); // Added dependency

    return (
        <DashboardShell title={title} subtitle={subtitle}>
            <DashboardScroller activeMetric={activeMetric} configs={METRIC_CONFIG} order={VALID_ORDER} />
        </DashboardShell>
    );
}
