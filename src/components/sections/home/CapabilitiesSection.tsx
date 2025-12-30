import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';

export default function CapabilitiesSection() {
    const t = useTranslations('Capabilities');
    const tp = useTranslations('Products');

    return (
        <section className="snap-section" style={{ background: 'var(--bg-surface-2)' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '3rem', alignItems: 'center' }}>
                    {/* Column 1: Header Info */}
                    <div>
                        <div className="badge badge-primary-subtle mb-3">{t('tag')}</div>
                        <h2 style={{ fontSize: 'var(--h2-size)', fontWeight: 950, marginBottom: '1.5rem', lineHeight: '1.1' }}>{t('title')}</h2>
                        <p style={{ opacity: 0.7, fontSize: '1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                            {t('subtitle')}
                        </p>
                        <Link href="/products" className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '0.85rem', fontWeight: 900 }}>
                            {t('cta')}
                        </Link>
                    </div>

                    {/* Column 2: 2x2 High Density Grid */}
                    <div className="grid-2x2-strict" style={{ gap: '1rem', margin: 0 }}>
                        {PRODUCTS.slice(0, 4).map((p, i) => (
                            <div key={i} className="glass-panel" style={{
                                padding: '1.25rem',
                                borderRadius: '1.25rem',
                                border: '1px solid var(--card-border)',
                                display: 'flex',
                                flexDirection: 'column',
                                background: 'rgba(30, 41, 59, 0.4)',
                                minHeight: '160px'
                            }}>
                                <div style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}>{p.miniIcon}</div>
                                <h4 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: '0.5rem' }}>{tp(`${p.id}.title`)}</h4>
                                <p style={{ opacity: 0.6, fontSize: '0.75rem', lineHeight: 1.4, flexGrow: 1, marginBottom: '1rem' }}>{tp(`${p.id}.shortDesc`)}</p>
                                <Link href={`/products#${p.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: 'var(--primary)', fontSize: '0.65rem', textDecoration: 'none' }}>
                                    {t('explore')} <ArrowRight size={12} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
