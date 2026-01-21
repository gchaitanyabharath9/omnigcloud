
import React from 'react';
import { useTranslations } from 'next-intl';

export const ImpactMetricsChart = () => {
    const t = useTranslations('WhitePaper.detailedDiagrams.impact');
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                <div style={{ height: '80px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px', marginBottom: '1rem' }}>
                    <div style={{ width: '20px', height: '100%', background: '#e2e8f0', borderRadius: '4px' }}></div>
                    <div style={{ width: '20px', height: '10%', background: '#10b981', borderRadius: '4px' }}></div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{t('mttr.value')}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('mttr.title')}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '0.5rem' }}>{t('mttr.desc')}</div>
            </div>
            <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                <div style={{ height: '80px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px', marginBottom: '1rem' }}>
                    <div style={{ width: '20px', height: '100%', background: '#e2e8f0', borderRadius: '4px' }}></div>
                    <div style={{ width: '20px', height: '69%', background: '#3b82f6', borderRadius: '4px' }}></div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{t('opex.value')}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('opex.title')}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '0.5rem' }}>{t('opex.desc')}</div>
            </div>
            <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                <div style={{ height: '80px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px', marginBottom: '1rem' }}>
                    <div style={{ width: '20px', height: '87%', background: '#e2e8f0', borderRadius: '4px' }}></div>
                    <div style={{ width: '20px', height: '100%', background: '#f59e0b', borderRadius: '4px' }}></div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{t('compliance.value')}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('compliance.title')}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '0.5rem' }}>{t('compliance.desc')}</div>
            </div>
        </div>
    );
};
