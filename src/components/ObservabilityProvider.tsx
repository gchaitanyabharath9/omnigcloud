'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/lib/analytics';

interface ObservabilityProviderProps {
    children: React.ReactNode;
    locale: string;
}

/**
 * ObservabilityProvider - Zero-cost client-side monitoring & Conversion Tracking
 */
export function ObservabilityProvider({ children, locale }: ObservabilityProviderProps) {
    const pathname = usePathname();

    useEffect(() => {
        // 1. Error Capture
        const handleError = (event: ErrorEvent | PromiseRejectionEvent) => {
            const error = 'error' in event ? event.error : event.reason;

            // Ignore telemetry/analytics errors (endpoint not yet implemented)
            const message = event instanceof ErrorEvent ? event.message : 'Unhandled Promise Rejection';
            if (message.includes('telemetry') || message.includes('/api/telemetry')) {
                return;
            }

            const log = {
                signal: 'CLIENT_ERROR',
                timestamp: new Date().toISOString(),
                route: pathname,
                locale,
                userAgent: navigator.userAgent,
                message,
                stack: error?.stack || 'N/A',
                type: event.type
            };

            // Log as structured JSON
            console.error('[OBSERVABILITY_SIGNAL]', JSON.stringify(log));
        };

        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleError);

        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleError);
        };
    }, [pathname, locale]);

    useEffect(() => {
        // 2. Performance Marks
        if (typeof window.performance !== 'undefined') {
            const logPerf = () => {
                const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
                if (!nav) return;

                const log = {
                    signal: 'PERF_MARK',
                    timestamp: new Date().toISOString(),
                    route: pathname,
                    locale,
                    metrics: {
                        duration: nav.duration,
                        domReady: nav.domContentLoadedEventEnd - nav.startTime,
                        loadTime: nav.loadEventEnd - nav.startTime,
                        ttfb: nav.responseStart - nav.requestStart
                    }
                };
                console.info('[OBSERVABILITY_SIGNAL]', JSON.stringify(log));
            };

            // Run after load to ensure nav timing is available
            if (document.readyState === 'complete') {
                logPerf();
            } else {
                window.addEventListener('load', logPerf, { once: true });
            }
        }
    }, [pathname, locale]);

    useEffect(() => {
        // 3. Conversion & Engagement Tracking
        analytics.track('cta_click', {
            category: 'navigation',
            label: 'page_view',
            path: pathname,
            locale
        });

        const trackScroll = () => {
            const h = document.documentElement;
            const b = document.body;
            const scrollPercent = (h.scrollTop || b.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;

            const markers = [50, 90];
            markers.forEach(mark => {
                if (scrollPercent > mark) {
                    analytics.track('cta_click', {
                        category: 'engagement',
                        label: `scroll_depth_${mark}`,
                        path: pathname
                    });
                }
            });
        };

        window.addEventListener('scroll', trackScroll, { passive: true });
        return () => window.removeEventListener('scroll', trackScroll);
    }, [pathname, locale]);

    return <>{children}</>;
}
