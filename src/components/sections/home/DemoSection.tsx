import { Search, Code, RefreshCw, ShieldAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function DemoSection() {
    const t = useTranslations('DemoSection');
    return (
        <section id="demo" className="snap-section">
            <div className="container">
                <div className="section-title-group">
                    <div style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.15em' }}>{t('badge')}</div>
                    <h2 className="mb-2">{t.rich('title', {
                        span: (chunks) => <span style={{ color: 'var(--primary)' }}>{chunks}</span>
                    })}</h2>
                    <p className="text-section-lead">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid-2 gap-6">
                    {/* Box 1: Discovery */}
                    <div className="card-feature">
                        <div className="icon-circle mb-4" style={{ background: 'rgba(96, 239, 255, 0.1)' }}>
                            <Search color="var(--primary)" size={24} />
                        </div>
                        <div>
                            <h3 className="card-title text-lg">{t('discovery.title')}</h3>
                            <p className="card-body text-base">
                                {t('discovery.desc')}
                            </p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-white-05 text-mono text-tiny" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: 'var(--primary)' }}>
                            {t('discovery.code')}
                        </div>
                    </div>

                    {/* Box 2: Blueprinting */}
                    <div className="card-feature">
                        <div className="icon-circle mb-4" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                            <Code color="#8b5cf6" size={24} />
                        </div>
                        <div>
                            <h3 className="card-title text-lg">{t('iac.title')}</h3>
                            <p className="card-body text-base">
                                {t('iac.desc')}
                            </p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-white-05 text-mono text-tiny" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: '#8b5cf6' }}>
                            {t('iac.code')}
                        </div>
                    </div>

                    {/* Box 3: Sync */}
                    <div className="card-feature">
                        <div className="icon-circle mb-4" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                            <RefreshCw color="#10b981" size={24} />
                        </div>
                        <div>
                            <h3 className="card-title text-lg">{t('sync.title')}</h3>
                            <p className="card-body text-base">
                                {t('sync.desc')}
                            </p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-white-05 text-mono text-tiny" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: '#10b981' }}>
                            {t('sync.code')}
                        </div>
                    </div>

                    {/* Box 4: Drift */}
                    <div className="card-feature">
                        <div className="icon-circle mb-4" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                            <ShieldAlert color="#ef4444" size={24} />
                        </div>
                        <div>
                            <h3 className="card-title text-lg">{t('drift.title')}</h3>
                            <p className="card-body text-base">
                                {t('drift.desc')}
                            </p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-white-05 text-mono text-tiny" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: '#ef4444' }}>
                            {t('drift.code')}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
