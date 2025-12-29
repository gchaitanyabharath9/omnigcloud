import { useTranslations } from 'next-intl';
import { Cpu } from 'lucide-react';
import Link from 'next/link';
import Grid2x2Section from '@/components/layout/Grid2x2Section';
import { PRODUCTS } from '@/data/products';

export default function ProductsPage() {
    const t = useTranslations('Products');

    return (
        <div className="main-content">
            {/* HERO */}
            <section style={{ padding: '8rem 0 6rem', background: 'var(--bg-surface-2)', borderBottom: '1px solid var(--card-border)' }}>
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

            {/* CALL TO ACTION */}
            <section style={{ padding: '8rem 0', textAlign: 'center' }}>
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
        </div>
    );
}
