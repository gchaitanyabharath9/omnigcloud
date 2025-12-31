import { useTranslations } from 'next-intl';
import { Activity } from 'lucide-react';
import Footer from '@/components/Footer';
import Grid2x2Section from '@/components/layout/Grid2x2Section';
import { USE_CASES } from '@/data/use-cases';

export default function UseCasesPage() {
    const t = useTranslations('UseCases');

    return (
        <>
            {/* HERO */}
            <section className="snap-section" style={{ background: 'var(--bg-surface-2)', borderBottom: '1px solid var(--card-border)', minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <div className="badge badge-primary-subtle mb-4">
                        <Activity size={14} className="mr-2" /> {t('hero.tag')}
                    </div>
                    <h1 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '1.5rem', letterSpacing: '-1.5px' }}>
                        {t('hero.title')}
                    </h1>
                    <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '750px', lineHeight: 1.6 }}>
                        {t('hero.subtitle')}
                    </p>
                </div>
            </section>

            {/* USE CASES */}
            {USE_CASES.map((uc, idx) => (
                <Grid2x2Section
                    key={uc.id}
                    {...uc}
                    title={t(`${uc.id}.title`)}
                    tag={t(`${uc.id}.tag`)}
                    description={t(`${uc.id}.description`)}
                    explanation={t(`${uc.id}.explanation`)}
                    darkBg={idx % 2 !== 0}
                    reverse={idx % 2 !== 0}
                />
            ))}

            {/* SITEMAP / FOOTER SNAP SECTION */}
            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </section>
        </>
    );
}
