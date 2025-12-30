import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ShieldAlert, PlayCircle, CheckCircle, Globe, Activity, Layers } from 'lucide-react';

export default function HeroSection() {
    const t = useTranslations('Hero');
    const locale = useLocale();

    return (
        <section id="hero" className="snap-section" style={{ position: 'relative' }}>

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
                maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)' /* Fade out at bottom */
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

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>

                {/* 2x2 GRID CONTROL CENTER LAYOUT - HIGH DENSITY */}
                <div className="hero-grid-layout">

                    {/* Q1: Top-Left (Headline & Intro & CTA) - Tight & Top Aligned */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '2rem' }}>
                        <div>
                            <div className="badge badge-primary-subtle mb-4 w-fit">
                                <ShieldAlert size={14} color="var(--primary)" />
                                <span>{t('badge')}</span>
                            </div>

                            <h1 className="mb-4" style={{ lineHeight: 1.1, fontSize: 'clamp(2rem, 5vw, 2.5rem)', letterSpacing: '-0.03em', fontWeight: 800 }}>
                                Omni<span style={{ color: 'var(--primary)' }}>G</span>Cloud:
                                <br />
                                <span className="text-gradient">{t('title')}</span>
                            </h1>

                            <p className="text-lead mb-8" style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', maxWidth: '95%', lineHeight: 1.5 }}>
                                {t('subtitle')}
                            </p>

                            {/* CTA Buttons */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                <Link href={`/${locale}/contact`} className="btn-primary" style={{ flex: '1 1 auto', textAlign: 'center' }}>
                                    {t('ctaPrimary')}
                                </Link>
                                <Link href={`/${locale}/docs/whitepaper`} className="btn-secondary" style={{ flex: '1 1 auto', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <PlayCircle size={18} style={{ marginRight: '0.5rem' }} /> {t('ctaSecondary')}
                                </Link>
                            </div>
                        </div>

                        {/* NEW: Console Style System Status */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{
                                background: 'rgba(2, 6, 23, 0.5)', /* Dark Console BG */
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '1rem',
                                padding: '1.25rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem',
                                backdropFilter: 'blur(8px)',
                                maxWidth: '400px'
                            }}>
                                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{t('systemStatus.title')}</span>
                                    <span style={{ color: '#10b981' }}>● {t('systemStatus.live')}</span>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                    <CheckCircle size={14} color="#10b981" />
                                    <span style={{ opacity: 0.9 }}>{t('systemStatus.sync')}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                    <CheckCircle size={14} color="#10b981" />
                                    <span style={{ opacity: 0.9 }}>{t('systemStatus.policy')} <span style={{ color: '#3b82f6' }}>{t('systemStatus.enforcing')}</span></span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                    <Activity size={14} color="#f59e0b" />
                                    <span style={{ opacity: 0.9 }}>{t('systemStatus.threat')}: <span style={{ color: '#f59e0b' }}>{t('systemStatus.monitoring')}</span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Q2: Top-Right (Main Dashboard Visual - The 'Table') */}
                    {/* Size Increased to Push Bottom Row Down */}
                    <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <div className="glass-panel" style={{
                            width: '100%',
                            height: '450px', /* Consistency */
                            maxHeight: '450px',
                            padding: '0',
                            borderRadius: '1.25rem',
                            border: '1px solid var(--card-border)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            overflow: 'hidden',
                            background: 'var(--bg-surface-2)',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            {/* Dashboard Body */}
                            <div style={{ flex: 1, padding: '1.5rem', position: 'relative', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{
                                    position: 'absolute', top: 0, right: 0, width: '100%', height: '100%',
                                    backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&fit=crop)',
                                    backgroundSize: 'cover', opacity: 0.1, pointerEvents: 'none'
                                }}></div>

                                {/* Top Row Stats */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', position: 'relative', zIndex: 2 }}>
                                    <div className="dashboard-stat-card" style={{ padding: '0.75rem' }}>
                                        <div className="stat-label" style={{ fontSize: '0.6rem' }}>{t('stats.assets')}</div>
                                        <div className="stat-value" style={{ fontSize: '1.1rem' }}>$2.4B</div>
                                    </div>
                                    <div className="dashboard-stat-card" style={{ padding: '0.75rem' }}>
                                        <div className="stat-label" style={{ fontSize: '0.6rem' }}>{t('stats.drift')}</div>
                                        <div className="stat-value" style={{ fontSize: '1.1rem', color: 'var(--color-success)' }}>0%</div>
                                    </div>
                                    <div className="dashboard-stat-card" style={{ padding: '0.75rem' }}>
                                        <div className="stat-label" style={{ fontSize: '0.6rem' }}>{t('stats.nodes')}</div>
                                        <div className="stat-value" style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>4k+</div>
                                    </div>
                                </div>

                                {/* Main Visual */}
                                <div style={{ flex: 1, borderRadius: '0.5rem', border: '1px solid var(--card-border)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" className="img-cover" style={{ opacity: 0.4 }} alt="Data Graph" />
                                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px var(--primary-glow)', zIndex: 2, border: '1px solid rgba(59, 130, 246, 0.4)' }}>
                                        <Globe size={32} color="#60a5fa" strokeWidth={1.5} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Q3: Bottom-Left (Expert Contact Panel) */}
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start' }}>
                        <div className="glass-panel" style={{ height: '100%', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--card-border)', background: 'var(--bg-surface-2)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {[
                                            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=64&h=64&q=80&fit=crop',
                                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&fit=crop',
                                            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&q=80&fit=crop',
                                            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&q=80&fit=crop'
                                        ].map((src, i) => (
                                            <img key={i} src={src} style={{ width: '44px', height: '44px', borderRadius: '50%', border: '2px solid var(--bg-surface-2)', marginLeft: i > 0 ? '-16px' : 0 }} alt="Team" />
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <span style={{ fontSize: '0.95rem', fontWeight: 800, lineHeight: 1 }}>{t('experts.count')}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{t('experts.status')}</span>
                                    </div>
                                </div>

                                <Link href="/contact" className="btn-secondary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem', height: 'auto' }}>
                                    {t('experts.cta')}
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Q4: Bottom-Right (Data Density) */}
                    <div className="grid-2" style={{ gap: '1rem', height: '100%' }}>

                        {/* Interactive Graph Card */}
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--card-border)', background: 'var(--bg-surface-2)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.7, textTransform: 'uppercase', marginBottom: '0.25rem' }}>{t('efficiency')}</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#10b981' }}>+245%</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '60px', width: '100%', marginTop: '0.5rem' }}>
                                {[35, 45, 30, 60, 75, 50, 80, 100].map((h, i) => (
                                    <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 7 ? '#10b981' : 'var(--card-border)', borderRadius: '2px 2px 0 0', opacity: i === 7 ? 1 : 0.5 }}></div>
                                ))}
                            </div>
                        </div>

                        {/* Impact Card */}
                        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--primary-glow)', background: 'rgba(59, 130, 246, 0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                <div style={{ background: 'var(--primary)', width: '30px', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.4)' }}>
                                    <Activity size={16} color="white" />
                                </div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em' }}>{t('impact.label')}</div>
                            </div>
                            <p style={{ fontSize: '0.8rem', opacity: 0.9, lineHeight: 1.4, fontWeight: 500 }}>
                                {t.rich('impact.text', {
                                    span: (chunks) => <span style={{ color: 'var(--primary-light)', fontWeight: 700 }}>{chunks}</span>
                                })}
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* ENTERPRISE TRUST BAR - HIGH DENSITY */}
            <div style={{
                width: '100%',
                borderTop: '1px solid var(--card-border)',
                borderBottom: '1px solid var(--card-border)',
                padding: '1.5rem 0',
                background: 'rgba(2, 6, 23, 0.3)',
                backdropFilter: 'blur(10px)',
                zIndex: 10,
                marginTop: '4rem'
            }}>
                <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        {t('trust')}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 'clamp(1rem, 4vw, 3rem)', opacity: 0.5 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, fontSize: 'clamp(0.7rem, 2vw, 0.85rem)', whiteSpace: 'nowrap' }}>
                            <Globe size={16} /> CLOUD_STRAT
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, fontSize: 'clamp(0.7rem, 2vw, 0.85rem)', whiteSpace: 'nowrap' }}>
                            <ShieldAlert size={16} /> SECURE_CAPITAL
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, fontSize: 'clamp(0.7rem, 2vw, 0.85rem)', whiteSpace: 'nowrap' }}>
                            <Activity size={16} /> DATA_CORP
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, fontSize: 'clamp(0.7rem, 2vw, 0.85rem)', whiteSpace: 'nowrap' }}>
                            <CheckCircle size={16} /> GLOBAL_SYS
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, fontSize: 'clamp(0.7rem, 2vw, 0.85rem)', whiteSpace: 'nowrap' }}>
                            <Layers size={16} /> CORE_INFRA
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
