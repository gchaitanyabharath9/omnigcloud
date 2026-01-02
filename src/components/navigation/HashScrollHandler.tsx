/**
 * HashScrollHandler - Client component to handle hash scrolling on page load
 * Should be included in the root layout
 */

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { scrollToElement } from '@/utils/anchorScroll';

export function HashScrollHandler() {
    const pathname = usePathname();

    useEffect(() => {
        // Handle hash on initial load and route changes
        const hash = window.location.hash.slice(1);
        if (hash) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                scrollToElement(hash, 'smooth');
            }, 100);
        }
    }, [pathname]);

    return null;
}
