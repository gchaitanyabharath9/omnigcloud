import { Link } from '@/navigation';
import Footer from '@/components/Footer';
import { useLocale, useTranslations } from 'next-intl';
import { ErrorRateArea, UptimeTrend, FeatureUsageBar, CostSavingsArea } from '@/components/charts/SimpleCharts';
import { TrendingDown, TrendingUp, Shield, DollarSign } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export default function CtaSection() {
    const locale = useLocale();
    const t = useTranslations('HomeSections.Cta');
    return (
        <>
            <section className="snap-section py-12">
                <Container>
                    {/* Key Metrics Grid */}
                    <div className="mb-12">
                        <div className="text-center mb-8">
                            <div className="badge badge-primary-subtle mb-3 text-[0.6rem] tracking-widest">
                                {t('platformMetrics')}
                            </div>
                            <h2 className="text-[length:var(--h2-size)] font-black mb-2">
                                {t('realResults')}
                            </h2>
                            <p className="opacity-70 max-w-[700px] mx-auto text-[0.95rem]">
                                {t('metricsDesc')}
                            </p>
                        </div>

                        {/* 2x2 Chart Grid - Horizontal Internal Layout */}
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 mb-8">
                            <div className="grid grid-cols-[1.2fr_0.8fr] gap-4 items-center">
                                <ErrorRateArea height={180} />
                                <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                                    <div className="flex items-center gap-2 mb-1">
                                        <TrendingDown size={18} className="text-emerald-500" />
                                        <span className="text-xl font-black text-emerald-500">-73%</span>
                                    </div>
                                    <p className="text-xs opacity-70 m-0 leading-tight">
                                        {t('metrics.errorReduction')}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-[1.2fr_0.8fr] gap-4 items-center">
                                <UptimeTrend height={180} />
                                <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/20">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Shield size={18} className="text-blue-500" />
                                        <span className="text-xl font-black text-blue-500">99.99%</span>
                                    </div>
                                    <p className="text-xs opacity-70 m-0 leading-tight">
                                        {t('metrics.averageUptime')}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-[1.2fr_0.8fr] gap-4 items-center">
                                <CostSavingsArea height={180} />
                                <div className="p-3 bg-amber-500/5 rounded-xl border border-amber-500/20">
                                    <div className="flex items-center gap-2 mb-1">
                                        <DollarSign size={18} className="text-amber-500" />
                                        <span className="text-xl font-black text-amber-500">$2.8M</span>
                                    </div>
                                    <p className="text-xs opacity-70 m-0 leading-tight">
                                        {t('metrics.annualSavings')}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-[1.2fr_0.8fr] gap-4 items-center">
                                <FeatureUsageBar height={180} />
                                <div className="p-3 bg-violet-500/5 rounded-xl border border-violet-500/20">
                                    <div className="flex items-center gap-2 mb-1">
                                        <TrendingUp size={18} className="text-violet-500" />
                                        <span className="text-xl font-black text-violet-500">87%</span>
                                    </div>
                                    <p className="text-xs opacity-70 m-0 leading-tight">
                                        {t('metrics.adoptionRate')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Card */}
                    <div className="card-cta mt-24">
                        <h2 className="mb-3">{t('title')}</h2>
                        <p className="text-section-lead mb-6">
                            {t('subtitle')}
                        </p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <Link href="/onboarding" className="btn-primary px-10 py-3 text-[0.95rem] rounded-xl">
                                {t('primary')}
                            </Link>
                            <Link href="/contact" className="btn-secondary px-10 py-3 text-[0.95rem] rounded-xl">
                                {t('secondary')}
                            </Link>
                        </div>
                        <div className="mt-10 text-sm opacity-60 font-bold tracking-wider">
                            {t('disclaimer')}
                        </div>
                    </div>
                </Container>
            </section>

            {/* STANDALONE SITEMAP / FOOTER SNAP SECTION */}
            <section id="sitemap" className="snap-section bg-background border-t border-card-border pt-8">
                <Footer />
            </section>
        </>
    );
}
