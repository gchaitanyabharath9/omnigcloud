import { Link } from '@/navigation';
import Footer from '@/components/Footer';
import { useLocale, useTranslations } from 'next-intl';
import { ErrorRateArea, UptimeTrend, FeatureUsageBar, CostSavingsArea } from '@/components/charts/SimpleCharts';
import { TrendingDown, TrendingUp, Shield, DollarSign } from 'lucide-react';

export default function CtaSection() {
    const locale = useLocale();
    const t = useTranslations('HomeSections.Cta');
    return (
        <>
            <section className="snap-section" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                <div className="container">
                    {/* Key Metrics Grid */}
                    <div style={{ marginBottom: '3rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div className="badge badge-primary-subtle mb-3" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>
                                {t('platformMetrics')}
                            </div>
                            <h2 style={{ fontSize: 'var(--h2-size)', fontWeight: 900, marginBottom: '0.5rem' }}>
                                {t('realResults')}
                            </h2>
                            <p style={{ opacity: 0.7, maxWidth: '700px', margin: '0 auto', fontSize: '0.95rem' }}>
                                {t('metricsDesc')}
                            </p>
                        </div>

                        {/* 2x2 Chart Grid - Horizontal Internal Layout */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem', alignItems: 'center' }}>
                                <ErrorRateArea height={180} />
                                <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.75rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <TrendingDown size={18} color="#10b981" />
                                        <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#10b981' }}>-73%</span>
                                    </div>
                                    <p style={{ fontSize: '0.75rem', opacity: 0.7, margin: 0, lineHeight: 1.3 }}>
                                        {t('metrics.errorReduction')}
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem', alignItems: 'center' }}>
                                <UptimeTrend height={180} />
                                <div style={{ padding: '0.75rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '0.75rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <Shield size={18} color="#3b82f6" />
                                        <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#3b82f6' }}>99.99%</span>
                                    </div>
                                    <p style={{ fontSize: '0.75rem', opacity: 0.7, margin: 0, lineHeight: 1.3 }}>
                                        {t('metrics.averageUptime')}
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem', alignItems: 'center' }}>
                                <CostSavingsArea height={180} />
                                <div style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.05)', borderRadius: '0.75rem', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <DollarSign size={18} color="#f59e0b" />
                                        <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#f59e0b' }}>$2.8M</span>
                                    </div>
                                    <p style={{ fontSize: '0.75rem', opacity: 0.7, margin: 0, lineHeight: 1.3 }}>
                                        {t('metrics.annualSavings')}
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem', alignItems: 'center' }}>
                                <FeatureUsageBar height={180} />
                                <div style={{ padding: '0.75rem', background: 'rgba(139, 92, 246, 0.05)', borderRadius: '0.75rem', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <TrendingUp size={18} color="#8b5cf6" />
                                        <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#8b5cf6' }}>87%</span>
                                    </div>
                                    <p style={{ fontSize: '0.75rem', opacity: 0.7, margin: 0, lineHeight: 1.3 }}>
                                        {t('metrics.adoptionRate')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Card */}
                    <div className="card-cta" style={{ marginTop: '6rem' }}>
                        <h2 className="mb-3">{t('title')}</h2>
                        <p className="text-section-lead mb-6">
                            {t('subtitle')}
                        </p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <Link href="/onboarding" className="btn-primary" style={{ padding: '0.75rem 2.5rem', fontSize: '0.95rem', borderRadius: '0.75rem' }}>
                                {t('primary')}
                            </Link>
                            <Link href="/contact" className="btn-secondary" style={{ padding: '0.75rem 2.5rem', fontSize: '0.95rem', borderRadius: '0.75rem' }}>
                                {t('secondary')}
                            </Link>
                        </div>
                        <div className="mt-10 text-sm opacity-60 font-bold tracking-wider">
                            {t('disclaimer')}
                        </div>
                    </div>
                </div>
            </section>

            {/* STANDALONE SITEMAP / FOOTER SNAP SECTION */}
            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)', paddingTop: '2rem' }}>
                <Footer />
            </section>
        </>
    );
}
