"use client";

import React, { useEffect } from 'react';

interface DashboardScrollerProps {
    activeMetric: string;
    configs: Record<string, { title: string; subtitle: string; component: React.ReactNode }>;
    order: string[];
}

export default function DashboardScroller({ activeMetric, configs, order }: DashboardScrollerProps) {
    useEffect(() => {
        const element = document.getElementById(activeMetric);
        if (element) {
            // Immediate jump for better responsiveness
            element.scrollIntoView({ behavior: 'auto', block: 'start' });

            // Smooth correction after render paint
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);

            // Backup retry in case of layout shifts
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 500);
        }
    }, [activeMetric]);

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
                            minHeight: '100vh',
                            paddingTop: '2rem',
                            paddingBottom: '4rem',
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
