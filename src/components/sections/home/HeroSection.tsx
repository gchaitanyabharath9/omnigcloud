import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { ShieldAlert, PlayCircle, Globe, Activity, Layers, Cpu, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { AboveTheFoldDescription } from '@/components/seo/Enrichment';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/cn';

export default function HeroSection() {
    const t = useTranslations('Hero');

    return (
        <section id="hero" className="snap-section relative min-h-screen flex flex-col justify-start pb-8 overflow-hidden">
            {/* Premium Grid Background */}
            <div className="absolute inset-0 pointer-events-none z-0" style={{
                backgroundImage: `
                    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
            }} />

            {/* Ambient Glows */}
            <div className="absolute -top-[20%] left-[20%] w-[600px] h-[600px] bg-blue-500/10 blur-[100px] z-0 pointer-events-none" />

            <Container className="relative z-10 flex items-start pt-4">
                <div className="hero-grid-layout">
                    {/* Left Column: Messaging & Performance Monitor */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <div className="badge badge-primary-subtle mb-4 w-fit">
                                <ShieldAlert size={14} className="text-primary" />
                                <span>{t('badge')}</span>
                            </div>

                            <h1 className="mb-6 text-[clamp(1.5rem,3.5vw,2.2rem)] font-extrabold leading-[1.2] tracking-tight">
                                Omni<span className="text-primary">G</span>Cloud:
                                <br />
                                <span className="text-gradient">{t('title')}</span>
                            </h1>

                            <p className="text-lead mb-8 text-[1.2rem] max-w-[90%] leading-relaxed opacity-90">
                                {t('subtitle')}
                            </p>

                            <AboveTheFoldDescription pageKey="Home" />

                            <div className="flex flex-wrap gap-4">
                                <Link href="/platform" className="btn-primary px-7 py-3 text-base">
                                    {t('ctaPrimary')}
                                </Link>
                                <Link href="/research/papers" className="btn-secondary px-7 py-3 text-base flex items-center gap-2">
                                    <Layers size={18} /> {t('ctaArchitecture')}
                                </Link>
                                <Link href="/docs/whitepaper" className="btn-secondary px-7 py-3 text-base flex items-center gap-2 opacity-80">
                                    <PlayCircle size={18} /> {t('ctaWhitepaper')}
                                </Link>
                            </div>
                        </div>

                        {/* Enhanced Health Monitor Widget */}
                        <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-sm font-extrabold uppercase text-primary mb-2 tracking-widest">{t('monitor.title')}</h3>
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-4xl font-black text-foreground">{t('monitor.latency')}</span>
                                        <span className="text-base font-bold text-emerald-500">● {t('monitor.status')}</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                    <Activity size={24} className="text-primary" />
                                </div>
                            </div>

                            {/* Live Animation Graph */}
                            <div className="h-[100px] relative my-4">
                                <svg width="100%" height="100" viewBox="0 0 400 100" preserveAspectRatio="none">
                                    <path d="M0 60 Q 40 50, 80 55 T 160 40 T 240 50 T 320 35 T 400 30" fill="none" stroke="var(--primary)" strokeWidth="4" />
                                    <circle cx="400" cy="30" r="5" fill="var(--primary)">
                                        <animate attributeName="r" from="5" to="8" dur="1s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" from="1" to="0" dur="1s" repeatCount="indefinite" />
                                    </circle>
                                </svg>
                            </div>

                            <p className="text-sm text-muted leading-relaxed">
                                {t('monitor.desc')}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Dashboard Visualization & Compliance */}
                    <div className="flex flex-col gap-8">
                        <div className="glass-panel p-0 overflow-hidden bg-surface-2 shadow-2xl">
                            <div className="p-8 flex flex-col gap-6">
                                <div className="grid grid-cols-3 gap-4">
                                    {[{ l: t('stats.assets'), v: '$2.4B' }, { l: t('stats.drift'), v: '0%', c: '#10b981' }, { l: t('stats.nodes'), v: '4k+', c: 'var(--primary)' }].map((s, i) => (
                                        <div key={i} className="p-4 bg-white/5 rounded-xl border border-card-border">
                                            <div className="text-xs text-muted uppercase">{s.l}</div>
                                            <div className="text-xl font-black" style={{ color: s.c || 'var(--foreground)' }}>{s.v}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="h-[280px] rounded-2xl border border-card-border relative overflow-hidden bg-slate-950">
                                    <Image
                                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=90"
                                        alt="Global Sovereign Dashboard"
                                        fill
                                        style={{ objectFit: 'cover', opacity: 0.3 }}
                                        priority
                                        fetchPriority="high"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-primary flex items-center justify-center shadow-[0_0_40px_var(--primary-glow)]">
                                            <Globe size={40} className="text-primary" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Regional Compliance Widget */}
                        <div className="glass-panel p-8 bg-blue-500/5">
                            <h3 className="text-sm font-black uppercase mb-6 tracking-widest">{t('compliance.title')}</h3>
                            <div className="flex flex-col gap-4">
                                {[
                                    { label: t('compliance.regions.eu'), val: 98, color: '#10b981' },
                                    { label: t('compliance.regions.us'), val: 94, color: '#3b82f6' },
                                    { label: t('compliance.regions.global'), val: 89, color: '#f59e0b' }
                                ].map((reg, idx) => (
                                    <div key={idx} className="flex flex-col gap-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="font-semibold">{reg.label}</span>
                                            <span className="font-black">{reg.val}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full rounded-full" style={{ width: `${reg.val}%`, background: reg.color }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-muted mt-6">
                                {t('compliance.desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </Container>

            {/* ENTERPRISE TRUST BAR */}
            <div className="w-full border-t border-card-border bg-slate-950/40 backdrop-blur-md py-6 mt-auto">
                <Container className="flex flex-col items-center gap-4">
                    <div className="text-[0.65rem] font-black text-muted tracking-[0.2em] uppercase">{t('trust')}</div>
                    <div className="flex flex-wrap justify-center gap-12 opacity-50">
                        {[Globe, ShieldAlert, Activity, CheckCircle, Cpu, Layers].map((Icon, i) => (
                            <div key={i} className="flex items-center gap-2 font-black text-xs">
                                <Icon size={16} /> {t(`trustEntities.${i}`)}
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        </section>
    );
}
