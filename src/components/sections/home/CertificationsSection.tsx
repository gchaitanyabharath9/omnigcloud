import React from 'react';
import { Cloud, CheckCircle2, Shield, Zap, Lock, Cpu } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function CertificationsSection() {
    const t = useTranslations('Certifications');

    const certs = [
        { name: "AWS Advanced Partner", provider: t('items.aws') },
        { name: "Azure Solutions Architect", provider: t('items.azure') },
        { name: "Google Cloud Professional", provider: t('items.gcp') },
        { name: "Kubernetes Certified", provider: t('items.k8s') },
        { name: "OpenShift Specialist", provider: t('items.openshift') },
        { name: "Oracle Cloud Expert", provider: t('items.oracle') }
    ];

    return (
        <section className="py-20" style={{ background: 'var(--background)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 70%)' }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>{t('tag')}</h2>
                        <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>{t('title')}</h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        {certs.map((cert, i) => (
                            <div key={i} className="glass-panel text-center p-6 hover-lift" style={{ border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.02)' }}>
                                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                    <CheckCircle2 size={24} color="var(--primary)" opacity={0.5} />
                                </div>
                                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '0.25rem' }}>{cert.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 600 }}>{cert.provider}</div>
                            </div>
                        ))}
                    </div>

                    <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                        {t('desc')}
                    </p>
                </div>
            </div>
        </section>
    );
}
