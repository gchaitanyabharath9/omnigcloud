'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface ObservabilityProviderProps {
    children: React.ReactNode;
    locale: string;
}

/**
 * ObservabilityProvider - Zero-cost client-side monitoring
 * Captured signals:
 * - Client errors (window.onerror)
 * - Unhandled rejections
 * - Navigation performance marks
 * 
 * All signals are logged as structured JSON to the console.
 * In a real-world scenario, these could be POSTed to an ingestion endpoint.
 */
export function ObservabilityProvider({ children, locale }: ObservabilityProviderProps) {
    const pathname = usePathname();

    useEffect(() => {
        // 1. Error Capture
        const handleError = (event: ErrorEvent | PromiseRejectionEvent) => {
            const error = 'error' in event ? event.error : event.reason;
            const log = {
                signal: 'CLIENT_ERROR',
                timestamp: new Date().toISOString(),
                route: pathname,
                locale,
                userAgent: navigator.userAgent,
                message: event instanceof ErrorEvent ? event.message : 'Unhandled Promise Rejection',
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

    return <>{children}</>;
}
