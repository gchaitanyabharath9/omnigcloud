import { getTranslations } from 'next-intl/server';
import { useTranslations, useLocale } from 'next-intl';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const tm = await getTranslations({ locale, namespace: 'Metadata.Products' });
    return {
        title: tm('title'),
        description: tm('description'),
    };
}
import { Cpu, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import Footer from '@/components/Footer';
import ProductScroller from '@/components/products/ProductScroller';
import {
    LatencyLineChart,
    CloudDistributionPie,
    UptimeTrend,
    ErrorRateArea,
    FeatureUsageBar,
    ComplianceScoresBar
} from '@/components/charts/SimpleCharts';

import { PageShell } from '@/components/layout/PageShell';
import { Section } from '@/components/layout/Section';

export default function ProductsPage() {
    const t = useTranslations('Products');
    const locale = useLocale();

    return (
        <>
            {/* HERO */}
            <Section className="flex items-start justify-center border-b border-white/10" style={{ minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))' }}>
                {/* Background Visual */}
                <div className="absolute inset-0 z-0 select-none pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
                        alt="Product Suite"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                </div>

                <PageShell className="relative z-10 flex flex-col items-center pt-32 lg:pt-48 pb-20">
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="badge badge-primary-subtle mb-4">
                            <Cpu size={14} className="mr-2" /> {t('hero.tag')}
                        </div>
                    </div>
                    <h1 className="text-center animate-fade-in-up" style={{
                        fontSize: '4.5rem',
                        fontWeight: 950,
                        marginBottom: '1rem',
                        letterSpacing: '-2px',
                        lineHeight: 1.1,
                        color: 'white',
                        textShadow: '0 0 40px rgba(255,255,255,0.1)',
                        animationDelay: '0.2s'
                    }}>
                        {t('hero.title')}
                    </h1>
                    <p className="text-center animate-fade-in-up" style={{
                        fontSize: '1.25rem',
                        opacity: 0.7,
                        maxWidth: '750px',
                        margin: '0 auto 3rem',
                        lineHeight: 1.6,
                        animationDelay: '0.3s'
                    }}>
                        {t('hero.subtitle')}
                    </p>
                </PageShell>
            </Section>

            {/* PRODUCT STREAM */}
            <ProductScroller activeProduct="" products={PRODUCTS} />

            {/* SITEMAP / FOOTER */}
            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </section>
        </>
    );
}
