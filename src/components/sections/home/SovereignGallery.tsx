import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function SovereignGallery() {
    const t = useTranslations('SovereignGallery');

    const items = [
        {
            id: "control",
            images: [
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=75&w=900",
                "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=75&w=900"
            ]
        },
        {
            id: "failover",
            images: [
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=75&w=900",
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=75&w=900"
            ]
        }
    ];

    return (
        <>
            {items.map((item, idx) => (
                <section key={idx} className="snap-section" style={{ background: idx % 2 === 0 ? 'var(--background)' : 'var(--bg-surface-2)' }}>
                    <div className="container">
                        {idx === 0 && (
                            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                                <h2 style={{ fontSize: 'var(--h2-size)', fontWeight: 950, marginBottom: '1rem' }}>{t('title')}</h2>
                                <p style={{ opacity: 0.7, fontSize: 'var(--body-size)', maxWidth: '600px', margin: '0 auto' }}>{t('subtitle')}</p>
                            </div>
                        )}

                        <div className="grid-2" style={{
                            gap: '3rem',
                            alignItems: 'center'
                        }}>
                            <div style={{ order: idx % 2 === 0 ? 1 : 2 }}>
                                <h3 style={{ fontSize: 'var(--h3-size)', fontWeight: 900, marginBottom: '1.5rem' }}>{t(`${item.id}.title`)}</h3>
                                <p style={{ fontSize: 'var(--body-size)', lineHeight: 1.6, opacity: 0.8, color: 'var(--foreground)' }}>
                                    {t(`${item.id}.description`)}
                                </p>
                            </div>
                            <div className="grid-2" style={{
                                gap: '1rem',
                                order: idx % 2 === 0 ? 2 : 1
                            }}>
                                <div className="glass-panel" style={{ borderRadius: '1rem', overflow: 'hidden', height: '220px', position: 'relative' }}>
                                    <Image src={item.images[0]} alt="Sovereign View A" fill style={{ objectFit: 'cover' }} unoptimized />
                                </div>
                                <div className="glass-panel" style={{ borderRadius: '1rem', overflow: 'hidden', height: '220px', position: 'relative' }}>
                                    <Image src={item.images[1]} alt="Sovereign View B" fill style={{ objectFit: 'cover' }} unoptimized />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </>
    );
}
