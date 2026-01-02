import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

/**
 * Section - A full-width layout primitive.
 * Replaces usages of w-screen or 100vw.
 * Ensures overflow is hidden and width is constrained to 100% of parent (viewport).
 */
export const Section = ({
    children,
    className = '',
    ...props
}: SectionProps) => {
    return (
        <section
            className={`w-full relative overflow-hidden ${className}`}
            {...props}
        >
            {children}
        </section>
    );
};
