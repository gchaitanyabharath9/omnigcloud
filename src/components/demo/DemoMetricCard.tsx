import React from 'react';

interface DemoMetricCardProps {
    label: string;
    value: string;
    trend?: string;
    trendDirection?: 'up' | 'down' | 'neutral';
}

export const DemoMetricCard: React.FC<DemoMetricCardProps> = ({
    label,
    value,
    trend,
    trendDirection = 'neutral'
}) => {
    const trendColor =
        trendDirection === 'up' ? 'text-green-600 dark:text-green-400' :
            trendDirection === 'down' ? 'text-red-600 dark:text-red-400' :
                'text-gray-500';

    return (
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
                {/* Mini purely visual indicator */}
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500"></div>
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1 truncate">
                {label}
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {value}
            </div>
            {trend && (
                <div className={`text-xs font-medium mt-2 ${trendColor} flex items-center gap-1`}>
                    {trendDirection === 'up' && '↑'}
                    {trendDirection === 'down' && '↓'}
                    {trend}
                    <span className="text-slate-400 font-normal ml-1">(simulated)</span>
                </div>
            )}
        </div>
    );
};
