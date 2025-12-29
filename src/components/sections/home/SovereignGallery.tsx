import React from 'react';
import { useTranslations } from 'next-intl';

export default function SovereignGallery() {
    const t = useTranslations('SovereignGallery');

    const items = [
        {
            id: "control",
            images: [
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
            ]
        },
        {
            id: "failover",
            images: [
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200"
            ]
        }
    ];

    return (
        <section style={{ padding: '8rem 0', background: 'var(--background)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '1.5rem' }}>{t('title')}</h2>
                    <p style={{ opacity: 0.7, fontSize: '1.1rem' }}>{t('subtitle')}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
                    {items.map((item, idx) => (
                        <div key={idx} style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '4rem',
                            alignItems: 'center'
                        }}>
                            <div style={{ order: idx % 2 === 0 ? 1 : 2 }}>
                                <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem' }}>{t(`${item.id}.title`)}</h3>
                                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, opacity: 0.8, color: 'var(--foreground)' }}>
                                    {t(`${item.id}.description`)}
                                </p>
                            </div>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1.5rem',
                                order: idx % 2 === 0 ? 2 : 1
                            }}>
                                <div className="glass-panel" style={{ borderRadius: '1.5rem', overflow: 'hidden', height: '250px' }}>
                                    <img src={item.images[0]} alt="Sovereign View A" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className="glass-panel" style={{ borderRadius: '1.5rem', overflow: 'hidden', height: '250px' }}>
                                    <img src={item.images[1]} alt="Sovereign View B" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
