'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Zap } from 'lucide-react';

export default function LiveLatencyBadge() {
    const t = useTranslations('Header');
    const [latency, setLatency] = useState(14);

    useEffect(() => {
        const interval = setInterval(() => {
            setLatency(prev => {
                const jitter = Math.floor(Math.random() * 3) - 1;
                return Math.max(8, prev + jitter);
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider select-none transition-all duration-300 hover:bg-blue-500/10 cursor-help group"
            style={{
                background: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59, 130, 246, 0.15)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                backdropFilter: 'blur(4px)'
            }}>
            <Zap size={10} className="text-primary animate-pulse group-hover:scale-110 transition-transform" />
            <span className="text-primary/90 group-hover:text-primary transition-colors">
                {t('latency_badge')}: <span className="text-primary">{latency}ms</span>
            </span>
        </div>
    );
}
