import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';

export default function CapabilitiesSection() {
    const t = useTranslations('Capabilities');
    const tp = useTranslations('Products');

    return (
        <section className="snap-section" style={{ background: 'var(--bg-surface-2)', padding: '6rem 0', borderTop: '1px solid var(--card-border)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div className="badge badge-primary-subtle mb-4">{t('tag')}</div>
                    <h2 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '1.5rem' }}>{t('title')}</h2>
                    <p style={{ opacity: 0.7, maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                        {t('subtitle')}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                    {PRODUCTS.map((p, i) => (
                        <div key={i} className="glass-panel" style={{ padding: '2.5rem', borderRadius: '2rem', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>{p.miniIcon}</div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '1rem' }}>{tp(`${p.id}.title`)}</h4>
                            <p style={{ opacity: 0.7, fontSize: '0.9rem', lineHeight: 1.6, flexGrow: 1, marginBottom: '2rem' }}>{tp(`${p.id}.shortDesc`)}</p>
                            <Link href={`/products#${p.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: 'var(--primary)', fontSize: '0.8rem', textDecoration: 'none' }}>
                                {t('explore')} <ArrowRight size={14} />
                            </Link>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <Link href="/products" className="btn-primary">
                        {t('cta')}
                    </Link>
                </div>
            </div>
        </section>
    );
}
