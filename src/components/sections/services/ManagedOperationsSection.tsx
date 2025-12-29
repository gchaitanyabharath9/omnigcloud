import { Globe, BarChart, Zap, ShieldCheck } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function ManagedOperationsSection() {
    const t = useTranslations('Services.Operations');
    return (
        <section id="managed-ops" className="snap-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 'var(--section-pt)', paddingBottom: '4rem' }}>
            <div className="container">
                <div className="section-title-group">
                    <h2 className="mb-2">{t('title')}</h2>
                    <p className="text-section-lead text-center mx-auto">{t('subtitle')}</p>
                </div>

                <div className="grid-2x2-strict">
                    {/* Card 1: 24/7 - Image */}
                    <div className="img-card-container">
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&fit=crop" alt="NOC Room" className="img-cover" />
                        <div className="card-overlay" style={{ background: 'linear-gradient(0deg, rgba(88, 28, 135, 0.9) 0%, rgba(88, 28, 135, 0.4) 100%)' }}></div>
                        <div className="card-content-overlay p-6 justify-end">
                            <div className="icon-circle mb-2 bg-white/10"><Globe size={20} color="#fff" /></div>
                            <h3 className="card-title">{t('sre.title')}</h3>
                            <p className="card-body text-white/80">{t('sre.desc')}</p>
                        </div>
                    </div>

                    {/* Card 2: FinOps */}
                    <div className="card-feature">
                        <BarChart size={32} color="#fbbf24" className="mb-4" />
                        <h3 className="card-title">{t('finops.title')}</h3>
                        <p className="card-body">{t('finops.desc')}</p>
                    </div>

                    {/* Card 3: Healing */}
                    <div className="card-feature">
                        <Zap size={32} color="#60efff" className="mb-4" />
                        <h3 className="card-title">{t('healing.title')}</h3>
                        <p className="card-body">{t('healing.desc')}</p>
                    </div>

                    {/* Card 4: Compliance - Image */}
                    <div className="img-card-container">
                        <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&fit=crop" alt="Audit Papers" className="img-cover" />
                        <div className="card-overlay"></div>
                        <div className="card-content-overlay p-6 justify-end">
                            <div className="icon-circle mb-2 bg-white/10"><ShieldCheck size={20} color="#fff" /></div>
                            <h3 className="card-title">{t('audit.title')}</h3>
                            <p className="card-body text-white/80">{t('audit.desc')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
