import React from 'react';
import { Landmark, ShieldCheck, PhoneCall, Building2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function IndustriesSection() {
    const t = useTranslations('HomeSections.Industries');

    const industries = [
        { key: 'banking', icon: Landmark, color: '#3b82f6' },
        { key: 'insurance', icon: ShieldCheck, color: '#10b981' },
        { key: 'telco', icon: PhoneCall, color: '#f59e0b' },
        { key: 'gov', icon: Building2, color: '#8b5cf6' }
    ];

    return (
        <section className="py-24 relative overflow-hidden" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tighter">{t('title')}</h2>
                    <p className="text-muted-foreground mx-auto font-medium leading-relaxed" style={{ maxWidth: '800px', fontSize: '1.1rem' }}>
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {industries.map((industry, i) => (
                        <div key={i} className="glass-panel group p-8 rounded-2xl flex flex-col border-white/5 bg-white/[0.02] hover:border-primary/40 hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-2">
                            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-8 border border-white/10 group-hover:border-primary/50 transition-all duration-500 relative">
                                <div className="absolute inset-0 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <industry.icon size={26} style={{ color: industry.color }} className="relative z-10" />
                            </div>

                            <h3 className="text-xl font-black text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors">
                                {t(`items.${industry.key}.title`)}
                            </h3>

                            <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1 opacity-80 font-medium">
                                {t(`items.${industry.key}.desc`)}
                            </p>

                            <div className="pt-6 border-t border-white/5 flex flex-col gap-1">
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-60">
                                    {t('keyImpact')}
                                </span>
                                <span className="text-lg font-mono font-black text-foreground tracking-tighter">
                                    {t(`items.${industry.key}.metrics`)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
