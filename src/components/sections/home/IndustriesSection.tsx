import React from 'react';
import { Landmark, ShieldCheck, PhoneCall, Building2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function IndustriesSection() {
    const t = useTranslations('HomeSections.Industries');

    const industries = [
        {
            key: 'banking',
            icon: Landmark,
        },
        {
            key: 'insurance',
            icon: ShieldCheck,
        },
        {
            key: 'telco',
            icon: PhoneCall,
        },
        {
            key: 'gov',
            icon: Building2,
        }
    ];

    return (
        <section className="py-24" style={{ background: 'var(--bg-surface-1)', borderTop: '1px solid var(--card-border)' }}>
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-gradient mb-4" style={{ fontSize: '2.5rem', fontWeight: 800 }}>{t('title')}</h2>
                    <p className="text-muted mx-auto" style={{ maxWidth: '800px', fontSize: '1.1rem' }}>
                        {t('subtitle')}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {industries.map((industry, i) => (
                        <div key={i} className="glass-panel p-8" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid var(--card-border)' }}>
                                <industry.icon size={24} color="var(--primary)" />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>{t(`items.${industry.key}.title`)}</h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>
                                {t(`items.${industry.key}.desc`)}
                            </p>
                            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.05em' }}>{t('keyImpact')}</span>
                                <span style={{ fontSize: '0.9rem', fontWeight: 900 }}>{t(`items.${industry.key}.metrics`)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
