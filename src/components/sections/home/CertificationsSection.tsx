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
        <section className="py-24" style={{ background: 'var(--background)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%)' }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">{t('tag')}</h2>
                        <h3 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">{t('title')}</h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                        {certs.map((cert, i) => (
                            <div key={i} className="glass-panel group p-8 hover:border-primary/40 transition-all duration-500 border-white/5 bg-white/[0.02]" style={{ borderRadius: '1.25rem' }}>
                                <div className="mb-6 flex justify-center">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                                        <CheckCircle2 size={24} className="text-primary opacity-60 group-hover:opacity-100" />
                                    </div>
                                </div>
                                <div className="text-base font-black text-foreground mb-1 tracking-tight group-hover:text-primary transition-colors">{cert.name}</div>
                                <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">{cert.provider}</div>
                            </div>
                        ))}
                    </div>

                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-base text-muted-foreground font-medium leading-relaxed opacity-80">
                            {t('desc')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
