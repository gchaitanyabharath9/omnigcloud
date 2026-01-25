import React from "react";

interface ChartPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * ChartPanel - A robust wrapper for Recharts components.
 * Enforces relative positioning, overflow hiding, and min-width
 * to prevent the extensive "width(-1)" and infinite resize loop issues.
 */
export const ChartPanel = ({ children, className = "", ...props }: ChartPanelProps) => {
  return (
    <div className={`w-full h-full min-w-0 relative overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
};
