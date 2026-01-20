/**
 * HashScrollHandler - Advanced client component for cross-page anchor scrolling
 */

'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function HashScrollHandler() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lastPath = useRef<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
            if (!hash) return;

            const targetElement = document.getElementById(hash);

            const scrollToElement = () => {
                const element = document.getElementById(hash);
                if (element) {
                    // Force a layout calculation check
                    const rect = element.getBoundingClientRect();

                    // Get the scroll margin from CSS variables (header + breadcrumb height)
                    const computedStyle = getComputedStyle(document.documentElement);
                    const headerHeight = parseInt(computedStyle.getPropertyValue('--header-height')) || 70;
                    const breadcrumbHeight = parseInt(computedStyle.getPropertyValue('--breadcrumb-height')) || 48;
                    const scrollMargin = headerHeight + breadcrumbHeight;

                    // Calculate scroll position accounting for the scroll margin
                    // Use 'auto' (instant) scroll for deterministic positioning
                    window.scrollTo({
                        top: window.scrollY + rect.top - scrollMargin,
                        behavior: 'auto'
                    });

                    lastPath.current = pathname + window.location.hash;
                    return true;
                }
                return false;
            };

            // Strategy: 
            // 1. Wait for layout stabilization using multiple frames
            // 2. Retry if element not found (async content load)
            // 3. Ensure no recursion

            if (pathname + window.location.hash === lastPath.current) return;

            // Initial attempt with 2 frames delay for hydration to settle
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (!scrollToElement()) {
                        // Retry loop for slow mounting components
                        let count = 0;
                        const interval = setInterval(() => {
                            count++;
                            if (scrollToElement() || count > 20) {
                                clearInterval(interval);
                            }
                        }, 150);
                    }
                });
            });
        };

        handleScroll();

        window.addEventListener('hashchange', handleScroll);
        return () => window.removeEventListener('hashchange', handleScroll);
    }, [pathname, searchParams]);

    return null;
}
