import React from 'react';
import { useTranslations } from 'next-intl';
import { Check, X } from 'lucide-react';

export default function ComparisonSection() {
    const t = useTranslations('Platform.comparison');

    const rows = [
        { label: t('rows.neutrality'), legacy: false, sovereign: true },
        { label: t('rows.audits'), legacy: false, sovereign: true },
        { label: t('rows.sync'), legacy: t('limited'), sovereign: true },
        { label: t('rows.refactoring'), legacy: false, sovereign: true },
        { label: t('rows.encryption'), legacy: t('partial'), sovereign: true },
        { label: t('rows.iam'), legacy: true, sovereign: false },
        { label: t('rows.arbitrage'), legacy: false, sovereign: true }
    ];

    return (
        <section style={{ padding: '6rem 0', background: 'var(--bg-surface-2)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '1.5rem' }}>{t('title')}</h2>
                    <p style={{ opacity: 0.7 }}>{t('subtitle')}</p>
                </div>

                <div className="glass-panel" style={{ borderRadius: '2rem', overflow: 'hidden', border: '1px solid var(--card-border)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.02)' }}>
                                <th style={{ padding: '2rem', fontSize: '1.2rem', fontWeight: 900 }}>{t('capability')}</th>
                                <th style={{ padding: '2rem', fontSize: '1.2rem', fontWeight: 900, opacity: 0.5 }}>{t('legacy')}</th>
                                <th style={{ padding: '2rem', fontSize: '1.5rem', fontWeight: 950, color: 'var(--primary)' }}>{t('sovereign')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid var(--card-border)' }}>
                                    <td style={{ padding: '1.5rem 2rem', fontWeight: 700, opacity: 0.8 }}>{row.label}</td>
                                    <td style={{ padding: '1.5rem 2rem' }}>
                                        {row.legacy === true ? <Check size={20} color="#ef4444" /> :
                                            row.legacy === false ? <X size={20} opacity={0.3} /> :
                                                <span style={{ fontSize: '0.9rem', opacity: 0.5 }}>{row.legacy}</span>}
                                    </td>
                                    <td style={{ padding: '1.5rem 2rem', background: 'rgba(59, 130, 246, 0.03)' }}>
                                        {row.sovereign === true ? <Check size={24} color="var(--primary)" /> :
                                            row.sovereign === false ? <X size={24} opacity={0.3} /> :
                                                <span style={{ fontWeight: 800 }}>{row.sovereign}</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ marginTop: '3rem', fontSize: '0.8rem', opacity: 0.5, textAlign: 'center' }}>
                    {t('footer')}
                </div>
            </div>
        </section>
    );
}
