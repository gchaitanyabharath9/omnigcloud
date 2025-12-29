"use client";

import React from 'react';
import { useTranslations } from 'next-intl';

export default function ComplianceDriftGraph() {
    const t = useTranslations('Visuals.drift');
    return (
        <div className="glass-panel" style={{
            padding: '2rem',
            borderRadius: '2rem',
            border: '1px solid var(--card-border)',
            background: 'rgba(2, 6, 23, 0.4)',
            overflow: 'hidden'
        }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f59e0b', marginBottom: '1.5rem' }}>{t('title')}</h4>

            <div style={{ position: 'relative', height: '180px' }}>
                <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%' }}>
                    {/* Grid Lines */}
                    {[0, 50, 100, 150].map(y => (
                        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    ))}

                    {/* Drift Path */}
                    <path
                        d="M0,180 L40,160 L80,170 L120,130 L160,140 L200,90 L240,110 L280,60 L320,80 L360,40 L400,50"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="drift-animate"
                    />

                    {/* Shadow/Glow Area */}
                    <path
                        d="M0,180 L40,160 L80,170 L120,130 L160,140 L200,90 L240,110 L280,60 L320,80 L360,40 L400,50 L400,200 L0,200 Z"
                        fill="url(#gradient-drift)"
                        opacity="0.1"
                    />

                    <defs>
                        <linearGradient id="gradient-drift" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#f59e0b' }}>{t('detected')}</span>
                </div>
                <button style={{ background: '#10b981', color: '#000', border: 'none', padding: '0.4rem 1rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 900, cursor: 'pointer' }}>
                    {t('remediate')}
                </button>
            </div>

            <style>{`
                .drift-animate {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: dash 3s linear forwards infinite;
                }
                @keyframes dash {
                    to { stroke-dashoffset: 0; }
                }
            `}</style>
        </div>
    );
}
