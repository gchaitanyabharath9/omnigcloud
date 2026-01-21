
import React from 'react';
import { useTranslations } from 'next-intl';
import { Lock, Globe, Shield } from 'lucide-react';

export const SecurityOverlayDiagram = () => {
    const t = useTranslations('WhitePaper.detailedDiagrams.security');
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '1rem' }}>
            {[
                { icon: <Lock size={24} className="text-red-500" />, title: t('zeroTrust.title'), desc: t('zeroTrust.desc') },
                { icon: <Globe size={24} className="text-blue-500" />, title: t('fence.title'), desc: t('fence.desc') },
                { icon: <Shield size={24} className="text-amber-500" />, title: t('audit.title'), desc: t('audit.desc') }
            ].map((item, idx) => (
                <div key={idx} style={{ padding: '1.5rem', border: '1px solid var(--border)', borderRadius: '0.5rem', background: 'var(--bg-surface)' }}>
                    <div style={{ marginBottom: '1rem' }}>{item.icon}</div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.5rem' }}>{item.title}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7, lineHeight: 1.5 }}>{item.desc}</div>
                </div>
            ))}
        </div>
    );
};
