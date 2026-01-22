
import React from 'react';
import { useTranslations } from 'next-intl';
import { Shield, Globe } from 'lucide-react';

export const FederationTopologyDiagram = () => {
    const t = useTranslations('docs.whitepaper.diagrams');
    return (
        <div style={{ padding: '2rem', background: 'var(--bg-surface-2)', borderRadius: '0.5rem', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', position: 'relative', zIndex: 2 }}>
                {/* Node 1 */}
                <div style={{ border: '1px solid #3b82f6', background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Shield size={16} style={{ color: '#3b82f6' }} />
                        <div style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--foreground)' }}>{t('federationUsTitle')}</div>
                    </div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.8, color: 'var(--foreground)' }}>{t('federationUsPolicy')}</div>
                    <div style={{ marginTop: '0.5rem', height: '4px', background: '#3b82f6', borderRadius: '2px', width: '80%' }}></div>
                </div>

                {/* Node 2 */}
                <div style={{ border: '1px solid #10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Shield size={16} style={{ color: '#10b981' }} />
                        <div style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--foreground)' }}>{t('federationEuTitle')}</div>
                    </div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.8, color: 'var(--foreground)' }}>{t('federationEuPolicy')}</div>
                    <div style={{ marginTop: '0.5rem', height: '4px', background: '#10b981', borderRadius: '2px', width: '60%' }}></div>
                </div>

                {/* Node 3 */}
                <div style={{ border: '1px solid #f59e0b', background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Shield size={16} style={{ color: '#f59e0b' }} />
                        <div style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--foreground)' }}>{t('federationApTitle')}</div>
                    </div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.8, color: 'var(--foreground)' }}>{t('federationApPolicy')}</div>
                    <div style={{ marginTop: '0.5rem', height: '4px', background: '#f59e0b', borderRadius: '2px', width: '90%' }}></div>
                </div>
            </div>

            {/* Connections */}
            <div style={{ textAlign: 'center', marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-surface)', padding: '0.5rem 1rem', borderRadius: '2rem', border: '1px solid var(--border)', boxShadow: 'var(--card-shadow)' }}>
                    <Globe size={16} style={{ color: 'var(--primary)' }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--foreground)' }}>{t('federationProtocol')}</span>
                </div>
            </div>
        </div>
    );
};
