import React from 'react';

interface MarketingSectionProps {
    id: string;
    title?: string;
    subtitle?: string;
    badge?: string;
    children: React.ReactNode;
    darkBg?: boolean;
    noPadding?: boolean;
    className?: string;
}

/**
 * Standardized marketing section wrapper
 * - Provides consistent spacing and visual boundaries
 * - Supports anchor navigation via id
 * - Handles scroll margin for sticky headers
 */
export default function MarketingSection({
    id,
    title,
    subtitle,
    badge,
    children,
    darkBg = false,
    noPadding = false,
    className = ''
}: MarketingSectionProps) {
    return (
        <section
            id={id}
            className={`w-full ${darkBg ? 'bg-[var(--bg-surface-2)]' : 'bg-[var(--background)]'} ${className}`}
            style={{
                scrollMarginTop: '140px', // Account for sticky header
                borderBottom: '1px solid var(--card-border)',
                padding: noPadding ? '0' : '4rem 0'
            }}
        >
            <div className="container">
                {(title || badge) && (
                    <div className="text-center mb-12">
                        {badge && (
                            <div className="badge badge-primary-subtle mb-4 inline-block">
                                {badge}
                            </div>
                        )}
                        {title && (
                            <h2 className="text-4xl font-black mb-4 tracking-tight">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-lg opacity-70 max-w-3xl mx-auto">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}
                {children}
            </div>
        </section>
    );
}
