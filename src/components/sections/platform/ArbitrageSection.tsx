import React from 'react';
import { useTranslations } from 'next-intl';
import BillingForecast from '@/components/visuals/BillingForecast';
import CloudSwitchSim from '@/components/visuals/CloudSwitchSim';
import { TrendingUp, ArrowLeftRight, Shield } from 'lucide-react';

export default function ArbitrageSection() {
    const t = useTranslations('Platform.arbitrage');

    return (
        <section id="arbitrage" className="snap-section container" style={{ padding: '8rem 0' }}>
            <div className="flex flex-col items-center text-center mb-16">
                <div className="badge badge-primary-subtle mb-4">{t('tag')}</div>
                <h2 className="mb-6 leading-tight max-w-3xl">
                    {t('title')}
                </h2>
                <p className="text-lead max-w-2xl opacity-70">
                    {t('subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                    <div className="glass-panel p-8 group hover:border-primary transition-all duration-500" style={{ borderRadius: '2rem', background: 'rgba(255,255,255,0.02)' }}>
                        <div className="flex gap-4 mb-6">
                            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 group-hover:scale-110 transition-transform">
                                <TrendingUp size={32} className="text-primary" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">{t('forecastTitle')}</h3>
                                <p className="opacity-60 text-sm">
                                    {t('forecastDesc')}
                                </p>
                            </div>
                        </div>
                        <BillingForecast />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="glass-panel p-6 border border-white/5 bg-white/2">
                            <h4 className="font-bold mb-2 flex items-center gap-2">
                                <Shield size={16} className="text-primary" />
                                {t('lockinTitle')}
                            </h4>
                            <p className="text-xs opacity-50">{t('lockinDesc')}</p>
                        </div>
                        <div className="glass-panel p-6 border border-white/5 bg-white/2">
                            <h4 className="font-bold mb-2 flex items-center gap-2">
                                <ArrowLeftRight size={16} className="text-primary" />
                                {t('portabilityTitle')}
                            </h4>
                            <p className="text-xs opacity-50">{t('portabilityDesc')}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-8 lg:sticky lg:top-24">
                    <div className="glass-panel p-8 group hover:border-primary transition-all duration-500" style={{ borderRadius: '2rem', background: 'rgba(255,255,255,0.02)' }}>
                        <div className="flex gap-4 mb-6">
                            <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20 group-hover:scale-110 transition-transform">
                                <ArrowLeftRight size={32} className="text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">{t('switchTitle')}</h3>
                                <p className="opacity-60 text-sm">
                                    {t('switchDesc')}
                                </p>
                            </div>
                        </div>
                        <CloudSwitchSim />
                    </div>

                    <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                        <h4 className="text-xl font-black mb-4 uppercase tracking-tighter">{t('eb1aTag')}</h4>
                        <p className="text-sm opacity-80 leading-relaxed mb-6">
                            {t('eb1aDesc')}
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-mono text-xs border border-white/20">JS</div>
                            <div>
                                <div className="text-xs font-bold text-white">{t('auditor')}</div>
                                <div className="text-[10px] opacity-50">{t('auditorTitle')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
