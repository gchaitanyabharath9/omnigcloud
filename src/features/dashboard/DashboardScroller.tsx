"use client";

import React, { useEffect } from 'react';

interface DashboardScrollerProps {
    activeMetric: string;
    configs: Record<string, { title: string; subtitle: string; component: React.ReactNode }>;
    order: string[];
}

export default function DashboardScroller({ activeMetric, configs, order }: DashboardScrollerProps) {
    // We rely on the global HashScrollHandler for physical scrolling.
    // This component now just focuses on rendering the segments.
    return (
        <div className="flex flex-col w-full max-w-full mx-auto pb-32">
            {order.map((key) => {
                const config = configs[key];
                return (
                    <div
                        key={key}
                        id={key}
                        className="w-full flex flex-col justify-start relative border-b border-white/5 last:border-0"
                        // Force each section to be at least a full viewport height for "page" feel
                        // scrollMarginTop accounts for the fixed header so content starts cleanly below it
                        style={{
                            paddingTop: '1.5rem',
                            paddingBottom: '1.5rem',
                            scrollMarginTop: 'calc(var(--header-height) + var(--breadcrumb-height) + 1rem)'
                        }}
                    >
                        {config.component}
                    </div>
                );
            })}
        </div>
    );
}
