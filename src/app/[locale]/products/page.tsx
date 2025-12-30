import { useTranslations } from 'next-intl';
import { Cpu } from 'lucide-react';
import Link from 'next/link';
import Grid2x2Section from '@/components/layout/Grid2x2Section';
import { PRODUCTS } from '@/data/products';
import Footer from '@/components/Footer';
import { DeploymentFrequency, ResourceUtilization } from '@/components/visuals/MetricsGraphs';
import { MultiCloudDistribution } from '@/components/visuals/AdvancedMetrics';
import { ContainerEfficiency } from '@/components/visuals/PerformanceMetrics';

export default function ProductsPage() {
    const t = useTranslations('Products');

    return (
        <div className="main-content">
            {/* HERO */}
            <section className="snap-section" style={{ background: 'var(--bg-surface-2)', borderBottom: '1px solid var(--card-border)' }}>
                <div className="container">
                    <div className="badge badge-primary-subtle mb-4">
                        <Cpu size={14} className="mr-2" /> {t('hero.tag')}
                    </div>
                    <h1 style={{ fontSize: '4rem', fontWeight: 950, marginBottom: '2rem', lineHeight: '1.05' }}>
                        {t('hero.title')}
                    </h1>
                    <p style={{ fontSize: '1.4rem', opacity: 0.7, maxWidth: '800px', lineHeight: 1.6 }}>
                        {t('hero.subtitle')}
                    </p>
                </div>
            </section>

            {/* SECTIONS */}
            {PRODUCTS.map((product, idx) => (
                <Grid2x2Section
                    key={product.id}
                    {...product}
                    title={t(`${product.id}.title`)}
                    tag={t(`${product.id}.tag`)}
                    description={t(`${product.id}.description`)}
                    explanation={t(`${product.id}.explanation`)}
                    darkBg={idx % 2 !== 0}
                />
            ))}

            {/* PRODUCT METRICS */}
            <section className="snap-section" style={{ background: 'var(--bg-surface-2)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div className="badge badge-primary-subtle mb-3">PLATFORM METRICS</div>
                        <h2 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '1rem' }}>Performance at Scale</h2>
                        <p style={{ opacity: 0.7, maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                            Real-time insights into platform efficiency and resource optimization
                        </p>
                    </div>

                    <div className="grid-2x2-strict" style={{ gap: '1.5rem' }}>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem' }}>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.5rem' }}>Deployment Frequency</h4>
                            <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '1.5rem' }}>Weekly deployment activity across all environments</p>
                            <DeploymentFrequency />
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem' }}>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.5rem' }}>Resource Utilization</h4>
                            <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '1.5rem' }}>Real-time infrastructure resource consumption</p>
                            <ResourceUtilization />
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem' }}>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.5rem' }}>Multi-Cloud Distribution</h4>
                            <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '1.5rem' }}>Workload distribution across cloud providers</p>
                            <MultiCloudDistribution />
                        </div>

                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem' }}>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.5rem' }}>Container Efficiency</h4>
                            <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '1.5rem' }}>Resource optimization vs target thresholds</p>
                            <ContainerEfficiency />
                        </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="snap-section" style={{ textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '2rem' }}>{t('cta.title')}</h2>
                    <p style={{ opacity: 0.7, marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem', fontSize: '1.25rem' }}>
                        {t('cta.subtitle')}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                        <Link href="/contact" className="btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1.1rem' }}>{t('cta.primary')}</Link>
                        <Link href="/pricing" className="btn-secondary" style={{ padding: '1.25rem 3rem', fontSize: '1.1rem' }}>{t('cta.secondary')}</Link>
                    </div>
                </div>
            </section>

            {/* SITEMAP / FOOTER SNAP SECTION */}
            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </section>
        </div>
    );
}
