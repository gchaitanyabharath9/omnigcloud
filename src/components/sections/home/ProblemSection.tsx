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
                            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
                            alt="Data Fragmentation"
                            fill
                            className="img-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="card-overlay"></div>
                        <div className="card-content-overlay p-8 flex-col justify-end">
                            <div className="mb-2 p-2 rounded-lg w-fit backdrop-blur-md border" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}>
                                <Layers size={24} color="var(--primary)" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{t('fragmentation.title')}</h3>
                            <p className="opacity-80 text-sm">{t('fragmentation.desc')}</p>
                        </div>
                    </div>

                    {/* BOX 2: REGULATORY DRIFT - GRAPHIC CARD -> NOW IMAGE BG */}
                    <div className="img-card-container">
                        <Image
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                            alt="Compliance Dashboard"
                            fill
                            className="img-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="card-overlay" style={{ background: 'linear-gradient(0deg, rgba(2,6,23,0.95) 20%, rgba(2,6,23,0.5) 100%)' }}></div>
                        <div className="card-content-overlay p-8 flex-col justify-end">
                            <div className="flex justify-between items-end mb-2">
                                <Globe size={20} color="var(--primary)" />
                                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--primary)' }}>+300%</div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{t('regulatory.title')}</h3>
                            <p className="opacity-80 text-sm">
                                {t('regulatory.desc')}
                            </p>
                            <div className="dashboard-console mt-4 mb-0 p-2 text-tiny bg-black/50 border border-white/10 backdrop-blur-sm">
                                <div className="flex justify-between mb-1 fontWeight-700">
                                    <span>{t('regulatory.score')}</span>
                                    <span style={{ color: 'var(--color-warning)' }}>{t('regulatory.risk')}</span>
                                </div>
                                <div className="w-full" style={{ height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                                    <div style={{ width: '45%', height: '100%', background: 'var(--color-warning)', borderRadius: '3px' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOX 3: VENDOR LOCK-IN - PEOPLE IMAGE */}
                    <div className="img-card-container">
                        <Image
                            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80"
                            alt="Meeting Room Crisis"
                            fill
                            className="img-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="card-overlay"></div>
                        <div className="card-content-overlay p-8 flex-col justify-end">
                            <div className="mb-2 p-2 rounded-lg bg-warning/10 w-fit backdrop-blur-md border border-warning/20">
                                <Lock size={24} color="#fbbf24" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{t('vendor.title')}</h3>
                            <p className="opacity-80 text-sm">{t('vendor.desc')}</p>
                        </div>
                    </div>

                    {/* BOX 4: DARK DATA OPACITY - SCANNER VISUAL -> NOW IMAGE BG */}
                    <div className="img-card-container">
                        <Image
                            src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80"
                            alt="Dark Data"
                            fill
                            className="img-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="card-overlay" style={{ background: 'linear-gradient(0deg, rgba(2,6,23,0.95) 30%, rgba(16, 185, 129, 0.2) 100%)' }}></div>
                        <div className="card-content-overlay p-8 flex-col justify-center text-center">
                            <div className="mx-auto mb-2 p-2 rounded-full w-fit bg-black/40 backdrop-blur-md border border-emerald-500/30">
                                <ShieldAlert size={28} color="var(--color-success)" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{t('opacity.title')}</h3>
                            <p className="opacity-80 text-sm">
                                {t('opacity.desc')}
                            </p>
                            <div className="text-mono mt-2 p-2 bg-black/60 rounded border border-emerald-500/20 text-emerald-400" style={{ fontSize: '0.7rem' }}>
                                {t('opacity.scanning')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
