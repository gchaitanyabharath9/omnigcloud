import { TriangleAlert, Layers, Globe, Lock, ShieldAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function ProblemSection() {
    const t = useTranslations('Problem');
    return (
        <section id="problem" className="snap-section">
            <div className="container">
                <div className="text-center mb-4 mt-0">
                    <div className="badge badge-warning-subtle mb-2 text-tiny">
                        <TriangleAlert size={10} /> {t('badge')}
                    </div>
                    <h2 className="mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)' }}>
                        {t('title')}
                    </h2>
                    <p className="text-lead text-small mx-auto w-full" style={{ maxWidth: '600px', fontSize: '1rem', marginBottom: '0' }}>
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid-2x2-strict w-full">
                    {/* BOX 1: DATA FRAGMENTATION - IMAGE CARD */}
                    <div className="img-card-container">
                        <Image
                            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop&q=75"
                            alt="Data Fragmentation"
                            fill
                            className="img-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                        <div className="card-overlay"></div>
                        <div className="card-content-overlay p-6 flex-col justify-end">
                            <div className="mb-2 p-1.5 rounded-lg w-fit backdrop-blur-md border" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}>
                                <Layers size={20} color="var(--primary)" />
                            </div>
                            <h3 className="text-lg font-bold mb-1">{t('fragmentation.title')}</h3>
                            <p className="opacity-70 text-xs leading-tight">{t('fragmentation.desc')}</p>
                        </div>
                    </div>

                    {/* BOX 2: REGULATORY DRIFT - GRAPHIC CARD -> NOW IMAGE BG */}
                    <div className="img-card-container">
                        <Image
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=75"
                            alt="Compliance Dashboard"
                            fill
                            className="img-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                        <div className="card-overlay" style={{ background: 'linear-gradient(0deg, rgba(2,6,23,0.95) 20%, rgba(2,6,23,0.5) 100%)' }}></div>
                        <div className="card-content-overlay p-6 flex-col justify-end">
                            <div className="flex justify-between items-end mb-1">
                                <Globe size={18} color="var(--primary)" />
                                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--primary)' }}>+300%</div>
                            </div>
                            <h3 className="text-lg font-bold mb-1">{t('regulatory.title')}</h3>
                            <p className="opacity-70 text-xs leading-tight">
                                {t('regulatory.desc')}
                            </p>
                            <div className="dashboard-console mt-2 mb-0 p-1.5 text-tiny bg-black/50 border border-white/10 backdrop-blur-sm">
                                <div className="flex justify-between mb-1 fontWeight-700" style={{ fontSize: '0.6rem' }}>
                                    <span>{t('regulatory.score')}</span>
                                    <span style={{ color: 'var(--color-warning)' }}>{t('regulatory.risk')}</span>
                                </div>
                                <div className="w-full" style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                                    <div style={{ width: '45%', height: '100%', background: 'var(--color-warning)', borderRadius: '2px' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOX 3: VENDOR LOCK-IN - PEOPLE IMAGE */}
                    <div className="img-card-container">
                        <Image
                            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=900&auto=format&fit=crop&q=75"
                            alt="Meeting Room Crisis"
                            fill
                            className="img-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="card-overlay"></div>
                        <div className="card-content-overlay p-6 flex-col justify-end">
                            <div className="mb-2 p-1.5 rounded-lg bg-warning/10 w-fit backdrop-blur-md border border-warning/20">
                                <Lock size={20} color="#fbbf24" />
                            </div>
                            <h3 className="text-lg font-bold mb-1">{t('vendor.title')}</h3>
                            <p className="opacity-70 text-xs leading-tight">{t('vendor.desc')}</p>
                        </div>
                    </div>

                    {/* BOX 4: DARK DATA OPACITY - SCANNER VISUAL -> NOW IMAGE BG */}
                    <div className="img-card-container">
                        <Image
                            src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=900&auto=format&fit=crop&q=75"
                            alt="Dark Data"
                            fill
                            className="img-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="card-overlay" style={{ background: 'linear-gradient(0deg, rgba(2,6,23,0.95) 30%, rgba(16, 185, 129, 0.2) 100%)' }}></div>
                        <div className="card-content-overlay p-6 flex-col justify-center text-center">
                            <div className="mx-auto mb-2 p-1.5 rounded-full w-fit bg-black/40 backdrop-blur-md border border-emerald-500/30">
                                <ShieldAlert size={24} color="var(--color-success)" />
                            </div>
                            <h3 className="text-lg font-bold mb-1">{t('opacity.title')}</h3>
                            <p className="opacity-70 text-xs leading-tight">
                                {t('opacity.desc')}
                            </p>
                            <div className="text-mono mt-2 p-1.5 bg-black/60 rounded border border-emerald-500/20 text-emerald-400" style={{ fontSize: '0.6rem' }}>
                                {t('opacity.scanning')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-8 space-x-8 items-center border-t border-white/5 pt-8">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Immediate Mitigation:</p>
                    <a href="mailto:architects@omnigcloud.com?subject=Drift%20Mitigation%20Request" className="text-sm font-black text-primary hover:underline underline-offset-4">
                        Request Security Audit
                    </a>
                    <span className="opacity-20">|</span>
                    <a href="mailto:architects@omnigcloud.com?subject=TCO%20Analysis%20Request" className="text-sm font-black text-primary hover:underline underline-offset-4">
                        Request TCO Analysis
                    </a>
                </div>
            </div>
        </section>
    );
}
