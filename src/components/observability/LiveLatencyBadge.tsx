'use client';

import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

export default function LiveLatencyBadge() {
    const [latency, setLatency] = useState(24);

    useEffect(() => {
        const interval = setInterval(() => {
            setLatency(prev => {
                const jitter = Math.floor(Math.random() * 3) - 1;
                return Math.max(12, prev + jitter);
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.25rem 0.6rem',
            background: 'rgba(59, 130, 246, 0.08)',
            border: '1px solid rgba(59, 130, 246, 0.15)',
            borderRadius: '99px',
            fontSize: '0.65rem',
            fontWeight: 800,
            color: 'var(--primary)',
            fontFamily: 'monospace'
        }}>
            <Zap size={10} fill="var(--primary)" className="animate-pulse" />
            <span>MESH_RT: {latency}ms</span>
        </div>
    );
}
