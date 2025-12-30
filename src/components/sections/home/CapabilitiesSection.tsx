import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';

export default function CapabilitiesSection() {
    const t = useTranslations('Capabilities');
    const tp = useTranslations('Products');

    // Split products into 2 groups of 3 for better snapping density
    const chunk1 = PRODUCTS.slice(0, 3);
    const chunk2 = PRODUCTS.slice(3, 6);

    return (
        <>
            {/* FIRST ROW OF PRODUCTS */}
            <section className="snap-section" style={{ background: 'var(--bg-surface-2)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div className="badge badge-primary-subtle mb-3">{t('tag')}</div>
                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 950, marginBottom: '1rem' }}>{t('title')}</h2>
                        <p style={{ opacity: 0.7, maxWidth: '700px', margin: '0 auto', fontSize: '1rem' }}>
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="grid-3" style={{ gap: '1.25rem' }}>
                        {chunk1.map((p, i) => (
                            <div key={i} className="glass-panel" style={{ padding: '1.75rem', borderRadius: '1.5rem', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{p.miniIcon}</div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.75rem' }}>{tp(`${p.id}.title`)}</h4>
                                <p style={{ opacity: 0.7, fontSize: '0.85rem', lineHeight: 1.5, flexGrow: 1, marginBottom: '1.5rem' }}>{tp(`${p.id}.shortDesc`)}</p>
                                <Link href={`/products#${p.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: 'var(--primary)', fontSize: '0.75rem', textDecoration: 'none' }}>
                                    {t('explore')} <ArrowRight size={14} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECOND ROW OF PRODUCTS */}
            <section className="snap-section" style={{ background: 'var(--background)' }}>
                <div className="container">
                    <div className="grid-3" style={{ gap: '1.25rem', marginBottom: '3rem' }}>
                        {chunk2.map((p, i) => (
                            <div key={i} className="glass-panel" style={{ padding: '1.75rem', borderRadius: '1.5rem', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{p.miniIcon}</div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.75rem' }}>{tp(`${p.id}.title`)}</h4>
                                <p style={{ opacity: 0.7, fontSize: '0.85rem', lineHeight: 1.5, flexGrow: 1, marginBottom: '1.5rem' }}>{tp(`${p.id}.shortDesc`)}</p>
                                <Link href={`/products#${p.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: 'var(--primary)', fontSize: '0.75rem', textDecoration: 'none' }}>
                                    {t('explore')} <ArrowRight size={14} />
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <Link href="/products" className="btn-primary" style={{ padding: '0.75rem 2.5rem', fontSize: '1rem', fontWeight: 900 }}>
                            {t('cta')}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
