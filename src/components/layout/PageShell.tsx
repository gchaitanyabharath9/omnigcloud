import React from 'react';

interface PageShellProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    as?: React.ElementType;
    fluid?: boolean; // If true, max-width is removed
}

/**
 * PageShell - The standard container for all page content.
 * Enforces centering, max-width, and responsive padding.
 * Includes min-w-0 to prevent flex child overflow issues.
 */
export const PageShell = ({
    children,
    className = '',
    as: Component = 'div',
    fluid = false,
    ...props
}: PageShellProps) => {
    // "container" class behavior explicitly defined here to centralize it.
    // replacing the dependency on layout.css .container over time.
    const containerClasses = fluid
        ? 'w-full px-4 sm:px-6 lg:px-8'
        : 'w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8';

    return (
        <Component
            className={`${containerClasses} min-w-0 ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
};
