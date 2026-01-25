import React from "react";

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
  className = "",
  as: Component = "div",
  fluid = false,
  ...props
}: PageShellProps) => {
  // Standardize constraint logic to match Dashboard/Landing pages
  const containerClasses = fluid ? "w-full px-4 sm:px-6 lg:px-8" : "container";

  return (
    <Component className={`${containerClasses} min-w-0 ${className}`} {...props}>
      {children}
    </Component>
  );
};
