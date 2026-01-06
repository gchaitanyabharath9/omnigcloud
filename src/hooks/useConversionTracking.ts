"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analytics } from '@/lib/analytics';

/**
 * Hook to track page views and scroll depth for funnel optimization.
 */
export function useConversionTracking() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Track Page View
        analytics.track('cta_click', {
            label: 'page_view',
            path: pathname,
            utm_source: searchParams.get('utm_source'),
        });

        // Simple Scroll Depth Tracking (25%, 50%, 75%, 90%)
        const trackScroll = () => {
            const h = document.documentElement;
            const b = document.body;
            const st = 'scrollTop';
            const sh = 'scrollHeight';
            const scrollPercent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;

            const markers = [25, 50, 75, 90];
            const tracked = new Set();

            markers.forEach(mark => {
                if (scrollPercent > mark && !tracked.has(mark)) {
                    analytics.track('cta_click', {
                        category: 'engagement',
                        label: `scroll_depth_${mark}`,
                        path: pathname
                    });
                    tracked.add(mark);
                }
            });
        };

        window.addEventListener('scroll', trackScroll, { passive: true });
        return () => window.removeEventListener('scroll', trackScroll);
    }, [pathname, searchParams]);

    const trackEngagement = (label: string) => {
        analytics.track('cta_click', { label, path: pathname });
    };

    return { trackEngagement };
}
