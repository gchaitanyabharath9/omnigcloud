import { ShieldAlert, Globe, CpuIcon, Database, ArrowRight, Activity, Server, Lock } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function EcosystemSection() {
    const t = useTranslations('Ecosystem');

    return (
        <section id="ecosystem" className="snap-section" style={{ background: 'var(--background)', position: 'relative', overflow: 'hidden' }}>
            {/* Background Map Image - Optimized with next/image */}
            <div className="bg-cover-overlay" style={{ opacity: 0.15 }}>
                <Image
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&fit=crop&q=80"
                    alt="Global Network"
                    fill
                    className="img-cover"
                    sizes="100vw"
                    priority={false}
                />
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
                    <div className="badge badge-primary-subtle mb-2">
                        <Activity size={14} /> {t('badge')}
                    </div>
                    <h2 className="mb-1" style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 900 }}>{t('title')}</h2>
                    <p className="text-section-lead" style={{ maxWidth: '800px', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid-2x2-strict" style={{ gap: '0.75rem' }}>
                    {/* 1. Governance Hub */}
                    <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', height: '100%', borderTop: '4px solid var(--primary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                            <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                <ShieldAlert size={18} />
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, opacity: 0.05, lineHeight: 0.8 }}>01</div>
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>{t('governance.title')}</h3>
                        <p style={{ opacity: 0.7, fontSize: '0.75rem', lineHeight: 1.4, flex: 1, marginBottom: '0.75rem' }}>
                            {t('governance.desc')}
                        </p>
                        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--card-border)', paddingTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--muted)' }}>{t('governance.status')}</span>
                            <Link href="/platform/governance" style={{ textDecoration: 'none', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem' }}>
                                {t('governance.link')} <ArrowRight size={12} />
                            </Link>
                        </div>
                    </div>

                    {/* 2. Global Mesh */}
                    <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', height: '100%', borderTop: '4px solid #818cf8' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                            <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                                <Globe size={18} />
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, opacity: 0.05, lineHeight: 0.8 }}>02</div>
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>{t('mesh.title')}</h3>
                        <p style={{ opacity: 0.7, fontSize: '0.75rem', lineHeight: 1.4, flex: 1, marginBottom: '0.75rem' }}>
                            {t('mesh.desc')}
                        </p>
                        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--card-border)', paddingTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--muted)' }}>{t('mesh.status')}</span>
                            <Link href="/platform/mesh" style={{ textDecoration: 'none', color: '#818cf8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem' }}>
                                {t('mesh.link')} <ArrowRight size={12} />
                            </Link>
                        </div>
                    </div>

                    {/* 3. AI Ops Lab */}
                    <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', height: '100%', borderTop: '4px solid #c084fc' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                            <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                                <CpuIcon size={18} />
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, opacity: 0.05, lineHeight: 0.8 }}>03</div>
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>{t('ai.title')}</h3>
                        <p style={{ opacity: 0.7, fontSize: '0.75rem', lineHeight: 1.4, flex: 1, marginBottom: '0.75rem' }}>
                            {t('ai.desc')}
                        </p>
                        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--card-border)', paddingTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--muted)' }}>{t('ai.status')}</span>
                            <Link href="/platform/ai" style={{ textDecoration: 'none', color: '#c084fc', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem' }}>
                                {t('ai.link')} <ArrowRight size={12} />
                            </Link>
                        </div>
                    </div>

                    {/* 4. Sovereign Data */}
                    <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', height: '100%', borderTop: '4px solid #2dd4bf' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                            <div className="p-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400">
                                <Database size={18} />
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, opacity: 0.05, lineHeight: 0.8 }}>04</div>
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>{t('vault.title')}</h3>
                        <p style={{ opacity: 0.7, fontSize: '0.75rem', lineHeight: 1.4, flex: 1, marginBottom: '0.75rem' }}>
                            {t('vault.desc')}
                        </p>
                        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--card-border)', paddingTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--muted)' }}>{t('vault.status')}</span>
                            <Link href="/platform/data" style={{ textDecoration: 'none', color: '#2dd4bf', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem' }}>
                                {t('vault.link')} <ArrowRight size={12} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
