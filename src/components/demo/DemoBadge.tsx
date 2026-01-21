import React from 'react';

interface DemoBadgeProps {
    label?: string; // e.g. "Demo View"
    tooltip?: string;
    className?: string;
}

export const DemoBadge: React.FC<DemoBadgeProps> = ({
    label = "Demo View",
    tooltip = "This data is simulated for demonstration purposes.",
    className = ""
}) => {
    return (
        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium border border-blue-200 dark:border-blue-800 ${className}`} title={tooltip}>
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            {label}
        </div>
    );
};
