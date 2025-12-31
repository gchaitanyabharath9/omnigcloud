import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ShieldAlert, PlayCircle, Globe, Activity, Layers, Cpu, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
    const t = useTranslations('Hero');
    const locale = useLocale();

    return (
        <section id="hero" className="snap-section" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: '2rem', overflow: 'hidden' }}>
            {/* Premium Grid Background */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `
                    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                zIndex: 0,
                pointerEvents: 'none',
                WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
            }}></div>

            {/* Ambient Glows */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                left: '20%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
                filter: 'blur(100px)',
                zIndex: 0,
                pointerEvents: 'none'
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', paddingTop: '1rem' }}>
                <div className="hero-grid-layout">
                    {/* Left Column: Messaging & Performance Monitor */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div>
                            <div className="badge badge-primary-subtle mb-4 w-fit">
                                <ShieldAlert size={14} color="var(--primary)" />
                                <span>{t('badge')}</span>
                            </div>

                            <h1 className="mb-6" style={{ lineHeight: 1.2, fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', letterSpacing: '-0.02em', fontWeight: 800 }}>
                                Omni<span style={{ color: 'var(--primary)' }}>G</span>Cloud:
                                <br />
                                <span className="text-gradient">Break Free from Vendor Lock-In</span>
                            </h1>

                            <p className="text-lead mb-8" style={{ fontSize: '1.2rem', maxWidth: '90%', lineHeight: 1.6, opacity: 0.9 }}>
                                {t('subtitle')}
                            </p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                <Link href={`/${locale}/contact`} className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                                    {t('ctaPrimary')}
                                </Link>
                                <Link href={`/${locale}/docs/whitepaper`} className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center' }}>
                                    <PlayCircle size={20} style={{ marginRight: '0.5rem' }} /> {t('ctaSecondary')}
                                </Link>
                            </div>
                        </div>

                        {/* Enhanced Health Monitor Widget */}
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
                                    <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>Sovereignty Health Monitor</h3>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                        <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white' }}>114ms</span>
                                        <span style={{ fontSize: '1rem', color: '#10b981', fontWeight: 700 }}>● OPTIMAL</span>
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
                                Real-time network latency monitoring across multi-cloud edge nodes. Tracks sub-millisecond variations to ensure optimal sovereign data routing and compliance standards.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Dashboard Visualization & Compliance */}
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
                                    {[{ l: t('stats.assets'), v: '$2.4B' }, { l: t('stats.drift'), v: '0%', c: '#10b981' }, { l: t('stats.nodes'), v: '4k+', c: 'var(--primary)' }].map((s, i) => (
                                        <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.75rem', border: '1px solid var(--card-border)' }}>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase' }}>{s.l}</div>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: s.c || 'white' }}>{s.v}</div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ height: '280px', borderRadius: '1rem', border: '1px solid var(--card-border)', position: 'relative', overflow: 'hidden', background: '#020617' }}>
                                    <Image
                                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                                        alt="Global Sovereign Dashboard"
                                        fill
                                        style={{ objectFit: 'cover', opacity: 0.3 }}
                                    />
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px var(--primary-glow)' }}>
                                            <Globe size={40} color="var(--primary)" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Regional Compliance Widget */}
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', border: '1px solid var(--card-border)', background: 'rgba(59, 130, 246, 0.05)' }}>
                            <h3 style={{ fontSize: '0.9rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>Sovereignty Compliance Index</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    { label: 'EU-West (GDPR Residency)', val: 98, color: '#10b981' },
                                    { label: 'US-East (HIPAA Sovereignty)', val: 94, color: '#3b82f6' },
                                    { label: 'Global (Threat Detection)', val: 89, color: '#f59e0b' }
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
                                Automated audit scores based on regional data residency and encryption standards across all cloud providers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ENTERPRISE TRUST BAR */}
            <div style={{
                width: '100%',
                borderTop: '1px solid var(--card-border)',
                background: 'rgba(2, 6, 23, 0.4)',
                backdropFilter: 'blur(12px)',
                padding: '1.5rem 0',
                marginTop: 'auto'
            }}>
                <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--muted)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{t('trust')}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem', opacity: 0.5 }}>
                        {[Globe, ShieldAlert, Activity, CheckCircle, Cpu, Layers].map((Icon, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, fontSize: '0.8rem' }}>
                                <Icon size={16} /> CLIENT_ENTITY_{i + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
