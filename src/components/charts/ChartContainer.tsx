"use client";

import React from 'react';

interface ChartContainerProps {
    title: string;
    description?: string;
    badge?: string;
    className?: string;
    children: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
    title,
    description,
    badge,
    className = '',
    children
}) => {
    return (
        <div className={`glass-panel p-6 rounded-2xl ${className}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-black m-0">{title}</h3>
                    {description && (
                        <p className="text-xs opacity-50 m-0 mt-1">{description}</p>
                    )}
                </div>
                {badge && (
                    <div className="badge badge-primary-subtle text-xs">
                        {badge}
                    </div>
                )}
            </div>
            <div className="w-full" style={{ minHeight: '280px' }}>
                {children}
            </div>
        </div>
    );
};

export default ChartContainer;
