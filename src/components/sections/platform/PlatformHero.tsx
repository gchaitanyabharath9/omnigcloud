import { useTranslations } from 'next-intl';
import { Layers } from "lucide-react";

export default function PlatformHero() {
    const t = useTranslations('Platform');

    return (
        <section id="platform-hero" className="snap-section container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 'var(--section-pt)', position: 'relative' }}>
            {/* Background Image */}
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&fit=crop&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.1,
                pointerEvents: 'none',
                zIndex: -1
            }}></div>

            <div className="mb-8 w-full">
            </div>

            <div className="grid-2-strict items-center gap-12">
                {/* Left Col: Main Text */}
                <div>
                    <div className="flex gap-2 mb-4">
                        {['Governance-v4', 'Global-Sovereignty', 'Multi-Cloud-Canvas'].map(c => (
                            <span key={c} className="badge badge-primary-subtle text-xs font-black">{c}</span>
                        ))}
                    </div>
                    <h1 className="mb-6 leading-tight">
                        {t('hero.title')}
                    </h1>
                    <p className="text-lead mb-8">
                        {t('hero.subtitle')}
                    </p>
                    <div className="flex gap-4">
                        <button className="btn-primary">{t('hero.ctaPrimary')}</button>
                        <button className="btn-secondary">{t('hero.ctaSecondary')}</button>
                    </div>
                </div>

                {/* Right Col: Architecture & Stack (Visual) */}
                <div className="grid-2x2 gap-4">
                    {/* Arch Intro Card */}
                    <div className="img-card-container col-span-2 h-48">
                        <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&fit=crop" alt="Server Core" className="img-cover" />
                        <div className="card-overlay" style={{ background: 'linear-gradient(to top, var(--card-bg) 10%, transparent)' }}></div>
                        <div className="card-content-overlay p-6 justify-end">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-500/20 rounded backdrop-blur">
                                    <Layers size={24} color="var(--primary)" />
                                </div>
                                <h3 className="text-lg font-bold">{t('core.title')}</h3>
                            </div>
                            <p className="text-sm opacity-80">{t('core.desc')}</p>
                        </div>
                    </div>

                    {/* Tech Stack List - Converted to Visual Cards */}
                    {[
                        { l: t('stack.api'), v: t('stack.shielded'), img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80" },
                        { l: t('stack.logic'), v: t('stack.active'), img: "https://images.unsplash.com/photo-1544197150-b99a580bbcbf?w=400&q=80" },
                        { l: t('stack.cluster'), v: t('stack.scaling'), img: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&q=80" },
                        { l: t('stack.db'), v: t('stack.verified'), img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80" }
                    ].map((m, i) => (
                        <div key={i} className="img-card-container h-32">
                            <img src={m.img} alt={m.l} className="img-cover" />
                            <div className="card-overlay" style={{ background: 'rgba(0,0,0,0.6)' }}></div>
                            <div className="card-content-overlay p-4 justify-center items-center text-center">
                                <h4 className="font-bold text-sm text-white mb-1">{m.l}</h4>
                                <span className="text-xs font-black text-primary px-2 py-1 bg-white/10 rounded">{m.v}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
