'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const ComplianceDriftChart = () => {
    const data = [
        { month: 'M0', manual: 100, autonomous: 100 },
        { month: 'M3', manual: 92, autonomous: 99.9 },
        { month: 'M6', manual: 85, autonomous: 99.99 },
        { month: 'M9', manual: 74, autonomous: 100 },
        { month: 'M12', manual: 60, autonomous: 100 },
    ];

    return (
        <div style={{ height: 300, width: '100%', marginTop: '2rem' }}>
            <ResponsiveContainer>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[50, 105]} label={{ value: 'Compliance Score (%)', angle: -90, position: 'insideLeft', style: { fill: 'var(--muted-foreground)' } }} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }} />
                    <Legend />
                    <Line type="monotone" dataKey="manual" name="Legacy (Manual Ops)" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="autonomous" name="ASO (Autonomous)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
            </ResponsiveContainer>
            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>
                Figure 6a: Longitudinal analysis of Compliance Drift over 12 months.
            </div>
        </div>
    );
};

export const CostEfficiencyChart = () => {
    const data = [
        { scale: '100 Nodes', legacy: 15000, aso: 12000 },
        { scale: '500 Nodes', legacy: 75000, aso: 45000 },
        { scale: '1k Nodes', legacy: 180000, aso: 85000 },
        { scale: '5k Nodes', legacy: 1200000, aso: 350000 },
    ];

    return (
        <div style={{ height: 300, width: '100%', marginTop: '2rem' }}>
            <ResponsiveContainer>
                <BarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} opacity={0.3} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="scale" type="category" stroke="var(--foreground)" width={70} fontSize={11} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }} formatter={(value: any) => [`$${(value / 1000).toFixed(0)}k`]} />
                    <Legend />
                    <Bar dataKey="legacy" name="Legacy OpEx ($)" fill="#94a3b8" barSize={20} radius={[0, 4, 4, 0]} />
                    <Bar dataKey="aso" name="ASO OpEx ($)" fill="#3b82f6" barSize={20} radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--muted-foreground)', marginTop: '0.5rem' }}>
                Figure 6b: Cost Scaling Curve - Legacy vs ASO (Logarithmic Efficiency Gain)
            </div>
        </div>
    );
};
