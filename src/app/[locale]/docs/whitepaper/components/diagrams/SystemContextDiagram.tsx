
import React from 'react';
import { useTranslations } from 'next-intl';
import { User, Shield, Layers, Cpu, Cloud } from 'lucide-react';

export const SystemContextDiagram = () => {
    const t = useTranslations('docs.whitepaper.diagrams');
    return (
        <div style={{ padding: '2rem', background: 'var(--bg-surface-2)', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr 1fr', gap: '2rem', alignItems: 'center' }}>
                {/* Users */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ border: '1px dashed var(--border)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center', width: '100%', background: 'var(--bg-surface)' }}>
                        <User size={24} className="mx-auto mb-2 opacity-60" />
                        <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{t('devOpsTitle')}</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>{t('devOpsDesc')}</div>
                    </div>
                    <div style={{ border: '1px dashed var(--border)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center', width: '100%', background: 'var(--bg-surface)' }}>
                        <Shield size={24} className="mx-auto mb-2 opacity-60" />
                        <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{t('complianceTitle')}</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>{t('complianceDesc')}</div>
                    </div>
                </div>

                {/* AECP Core */}
                <div style={{ border: '2px solid #3b82f6', borderRadius: '1rem', padding: '1.5rem', background: 'var(--bg-surface)', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#3b82f6', color: 'white', padding: '0.1rem 1rem', fontSize: '0.75rem', fontWeight: 800, borderRadius: '1rem' }}>{t('controlPlane')}</div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                            <Layers size={20} className="mx-auto mb-2 text-blue-500" />
                            <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>{t('intentInterpreter')}</div>
                        </div>
                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                            <Cpu size={20} className="mx-auto mb-2 text-green-500" />
                            <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>{t('decisionEngine')}</div>
                        </div>
                    </div>
                    <div style={{ borderTop: '2px dashed var(--border)', margin: '1rem 0' }}></div>
                    <div style={{ background: 'var(--bg-surface-2)', padding: '0.8rem', borderRadius: '0.5rem', textAlign: 'center', fontSize: '0.8rem', opacity: 0.8 }}>
                        <strong>{t('stateReconciliation')}</strong> {t('stateReconciliationDesc')}
                    </div>
                </div>

                {/* External Cloud */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[t('clouds.aws'), t('clouds.azure'), t('clouds.gcp')].map(name => (
                        <div key={name} style={{ background: 'var(--bg-surface-2)', padding: '1rem', borderRadius: '0.5rem', opacity: 0.8, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Cloud size={16} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
