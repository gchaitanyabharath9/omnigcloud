// Chart data type definitions
export interface TimeSeriesDataPoint {
    timestamp: string;
    value: number;
    label?: string;
}

export interface MultiSeriesDataPoint {
    timestamp: string;
    [key: string]: string | number;
}

export interface DistributionDataPoint {
    name: string;
    value: number;
    percentage?: number;
    color?: string;
}

export interface FunnelDataPoint {
    stage: string;
    value: number;
    percentage?: number;
}

export interface HeatmapDataPoint {
    x: string;
    y: string;
    value: number;
}

export interface ChartContainerProps {
    title: string;
    description?: string;
    className?: string;
    children: React.ReactNode;
}
