/**
 * HashScrollHandler - Advanced client component for cross-page anchor scrolling
 */

'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function HashScrollHandler() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lastHash = useRef<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const hash = window.location.hash.slice(1);
            if (!hash) {
                lastHash.current = null;
                return;
            }

            // Avoid redundant scrolling if hash hasn't changed
            if (hash === lastHash.current) return;

            const scrollToTarget = (targetId: string) => {
                const element = document.getElementById(targetId);
                if (element) {
                    lastHash.current = targetId;

                    // We use scrollIntoView with 'smooth' behavior. 
                    // The offset is handled by CSS [id] { scroll-margin-top: ... }
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    return true;
                }
                return false;
            };

            // Attempt scroll
            if (!scrollToTarget(hash)) {
                // Retry mechanism for hydration/async content
                let attempts = 0;
                const maxAttempts = 10;
                const interval = setInterval(() => {
                    attempts++;
                    if (scrollToTarget(hash) || attempts >= maxAttempts) {
                        clearInterval(interval);
                    }
                }, 150);
            }
        };

        // Run on mount and parameter changes
        handleScroll();

        // Specific listener for manual changes or Link clicks that only change hash
        window.addEventListener('hashchange', handleScroll);

        return () => window.removeEventListener('hashchange', handleScroll);
    }, [pathname, searchParams]);

    return null;
}
