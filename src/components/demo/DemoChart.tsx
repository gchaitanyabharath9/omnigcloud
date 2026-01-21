'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Mon', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Tue', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Wed', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Thu', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Fri', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Sat', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Sun', uv: 3490, pv: 4300, amt: 2100 },
];

export const DemoChart = () => {
    const t = useTranslations('Demo.Charts');

    return (
        <div className="w-full h-[200px] relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <span className="bg-white/80 dark:bg-slate-900/80 px-3 py-1 rounded text-xs font-mono text-slate-500 border border-slate-200 dark:border-slate-700">
                    {t('loading')}
                </span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={200}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                        itemStyle={{ color: '#cbd5e1' }}
                    />
                    <Area type="monotone" dataKey="uv" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
