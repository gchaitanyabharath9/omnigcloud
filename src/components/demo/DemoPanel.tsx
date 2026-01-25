import React from "react";
import { DemoBadge } from "./DemoBadge";

interface DemoPanelProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export const DemoPanel: React.FC<DemoPanelProps> = ({ title, children, className = "" }) => {
  return (
    <div
      className={`border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 bg-gray-50/50 dark:bg-gray-800/20 flex flex-col items-center justify-center text-center gap-4 ${className}`}
    >
      {title && (
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
      )}
      <DemoBadge />
      <div className="text-gray-400 text-sm max-w-sm">{children || "Content simulated"}</div>
    </div>
  );
};
