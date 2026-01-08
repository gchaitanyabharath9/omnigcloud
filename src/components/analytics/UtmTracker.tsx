"use client";

import { useEffect, Suspense } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { getUtmFromUrl, saveUtmToStorage } from '@/lib/utm';

function UtmTrackerInner() {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    useEffect(() => {
        if (searchParams) {
            const utms = getUtmFromUrl(searchParams);
            if (Object.keys(utms).length > 0) {
                saveUtmToStorage(utms);
                if (process.env.NODE_ENV === 'development') {
                    console.log('[Analytics] UTMs captured:', utms);
                }
            }
        }
    }, [searchParams, pathname]);

    return null;
}

export default function UtmTracker() {
    return (
        <Suspense fallback={null}>
            <UtmTrackerInner />
        </Suspense>
    );
}
