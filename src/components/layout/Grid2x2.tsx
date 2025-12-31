import React from 'react';

interface Grid2x2Props {
    children: React.ReactNode;
    gap?: string;
    className?: string;
}

/**
 * Standardized 2x2 grid layout for marketing pages
 * - Desktop: 2 columns
 * - Tablet: 2 columns
 * - Mobile: 1 column
 */
export default function Grid2x2({ children, gap = '1.5rem', className = '' }: Grid2x2Props) {
    return (
        <div
            className={`grid grid-cols-1 md:grid-cols-2 ${className}`}
            style={{ gap, alignItems: 'stretch' }}
        >
            {children}
        </div>
    );
}
