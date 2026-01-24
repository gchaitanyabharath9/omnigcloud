"use client";

import React from 'react';
import { BadgeCheck, Terminal, Activity, Zap, Shield, Globe, Cpu, Server, Play, ChevronRight, BarChart, Layers } from 'lucide-react';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

// Mock data for "dense" feel if real data is missing
const MOCK_SPECS = [
    { label: "Latency", value: "12ms", icon: <Activity size={12} /> },
    { label: "Uptime", value: "99.99%", icon: <Server size={12} /> },
    { label: "Regions", value: "24", icon: <Globe size={12} /> },
    { label: "Compliance", value: "SOC2", icon: <Shield size={12} /> },
];

interface ProductDetailProps {
    id: string;
    icon: React.ReactNode;
    title: string;
    tag: string;
    description: string;
    explanation: string;
    images: string[];
    visual?: React.ReactNode;
}

const ProductDetailView: React.FC<ProductDetailProps> = ({
    id, icon, title, tag, description, explanation, images, visual
}) => {
    const t = useTranslations('Products.detail');
    return (
        <div className="animate-fade-in" style={{ paddingTop: '1rem' }}>
            <div className="hero-grid-layout">
                {/* LEFT COLUMN: Messaging & Performance Monitor (matches HeroSection left) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                        <div className="badge badge-primary-subtle mb-4 w-fit">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {icon}
                                <span>{tag}</span>
                            </div>
                        </div>

                        <h1 className="mb-6 text-center" style={{
                            lineHeight: 1.1,
                            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                            letterSpacing: '-0.04em',
                            fontWeight: 950,
                            maxWidth: '100%',
                            margin: '0 auto 1.5rem auto'
                        }}>
                            {title}
                        </h1>

                        <p className="text-lead mb-8" style={{ fontSize: '1.2rem', maxWidth: '90%', lineHeight: 1.6, opacity: 0.9 }}>
                            {description}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            <button className="btn-primary" style={{ padding: '0.8rem 1.8rem', fontSize: '1rem' }}>
                                {t('explore')}
                            </button>
                            <button className="btn-secondary" style={{ padding: '0.8rem 1.8rem', fontSize: '1rem', display: 'flex', alignItems: 'center' }}>
                                <Layers size={18} style={{ marginRight: '0.5rem' }} /> {t('architecture')}
                            </button>
                            <button className="btn-secondary" style={{ padding: '0.8rem 1.8rem', fontSize: '1rem', display: 'flex', alignItems: 'center', opacity: 0.8 }}>
                                <Terminal size={18} style={{ marginRight: '0.5rem' }} /> {t('documentation')}
                            </button>
                        </div>
                    </div>

                    {/* Enhanced Health Monitor Widget (matches HeroSection) */}
                    <div style={{
                        background: 'rgba(2, 6, 23, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '1.5rem',
                        padding: '2rem',
                        backdropFilter: 'blur(12px)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <div>
                                <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>{t('healthMonitor')}</h3>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                    <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white' }}>114ms</span>
                                    <span style={{ fontSize: '1rem', color: '#10b981', fontWeight: 700 }}>● {t('optimal')}</span>
                                </div>
                            </div>
                            <div style={{ width: '48px', height: '48px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Activity size={24} color="var(--primary)" />
                            </div>
                        </div>

                        {/* Live Animation Graph */}
                        <div style={{ height: '100px', position: 'relative', margin: '1rem 0' }}>
                            <svg width="100%" height="100" viewBox="0 0 400 100" preserveAspectRatio="none">
                                <path d="M0 60 Q 40 50, 80 55 T 160 40 T 240 50 T 320 35 T 400 30" fill="none" stroke="var(--primary)" strokeWidth="4" />
                                <circle cx="400" cy="30" r="5" fill="var(--primary)">
                                    <animate attributeName="r" from="5" to="8" dur="1s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" from="1" to="0" dur="1s" repeatCount="indefinite" />
                                </circle>
                            </svg>
                        </div>

                        <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                            {explanation}
                        </p>
                    </div>
                </div>

                {/* RIGHT COLUMN: Dashboard Visualization & Compliance (matches HeroSection right) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="glass-panel" style={{
                        padding: '0',
                        borderRadius: '1.5rem',
                        border: '1px solid var(--card-border)',
                        overflow: 'hidden',
                        background: 'var(--bg-surface-2)',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
                    }}>
                        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                {[{ l: t('metrics.assets'), v: '$2.4B' }, { l: t('metrics.drift'), v: '0%', c: '#10b981' }, { l: t('metrics.nodes'), v: '4k+', c: 'var(--primary)' }].map((s, i) => (
                                    <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.75rem', border: '1px solid var(--card-border)' }}>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase' }}>{s.l}</div>
                                        <div style={{ fontSize: '1.25rem', fontWeight: 900, color: s.c || 'white' }}>{s.v}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ height: '280px', borderRadius: '1rem', border: '1px solid var(--card-border)', position: 'relative', overflow: 'hidden', background: '#020617' }}>
                                {visual ? (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                                        {visual}
                                    </div>
                                ) : (
                                    <>
                                        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3 }}></div>
                                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px var(--primary-glow)' }}>
                                                <Globe size={40} color="var(--primary)" />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Regional Compliance Widget (matches HeroSection) */}
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', border: '1px solid var(--card-border)', background: 'rgba(59, 130, 246, 0.05)' }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>{t('complianceIndex')}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { label: t('regions.eu'), val: 98, color: '#10b981' },
                                { label: t('regions.us'), val: 94, color: '#3b82f6' },
                                { label: t('regions.global'), val: 89, color: '#f59e0b' }
                            ].map((reg, idx) => (
                                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                                        <span style={{ fontWeight: 600 }}>{reg.label}</span>
                                        <span style={{ fontWeight: 900 }}>{reg.val}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{ width: `${reg.val}%`, height: '100%', background: reg.color, borderRadius: '3px' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '1.5rem' }}>
                            {t('complianceDesc')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailView;
