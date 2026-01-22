import React from 'react';

interface DemoSparklineProps {
    data?: number[];
    color?: string;
    height?: number;
    width?: number;
}

export const DemoSparkline = ({
    data = [10, 40, 30, 50, 45, 70, 60, 90],
    color = "#3b82f6",
    height = 40,
    width = 100
}: DemoSparklineProps) => {
    // Generate SVG path from deterministic data
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
            <polyline
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
                style={{ filter: `drop-shadow(0 2px 4px ${color}40)` }}
            />
        </svg>
    );
};
