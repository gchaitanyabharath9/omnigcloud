import React from 'react';
import { useTranslations } from 'next-intl';
import { LineChart } from 'lucide-react';

export const DemoChartPlaceholder = () => {
    const t = useTranslations('Demo.Charts');
    return (
        <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden rounded-xl bg-white/5 border border-white/5">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            <LineChart size={48} className="text-primary/20 mb-4" />
            <div className="space-y-2 relative z-10">
                <div className="text-sm font-bold text-muted-foreground">{t('empty')}</div>
                <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-mono text-primary/40 uppercase tracking-widest">{t('loading')}</span>
                </div>
            </div>

            {/* Simulation of chart bars in background */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 flex items-end justify-center gap-1 px-4 opacity-5">
                {[40, 70, 45, 90, 65, 80, 50, 95, 40, 60].map((h, i) => (
                    <div key={i} style={{ height: `${h}%`, width: '100%', background: 'var(--primary)', borderRadius: '2px 2px 0 0' }} />
                ))}
            </div>
        </div>
    );
};
