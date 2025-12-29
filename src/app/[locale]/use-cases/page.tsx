import { useTranslations } from 'next-intl';
import { Activity } from 'lucide-react';
import Footer from '@/components/Footer';
import Grid2x2Section from '@/components/layout/Grid2x2Section';
import { USE_CASES } from '@/data/use-cases';

export default function UseCasesPage() {
    const t = useTranslations('UseCases');

    return (
        <div className="main-content">
            {/* HERO */}
            <section style={{ padding: '8rem 0 4rem', background: 'var(--bg-surface-2)', borderBottom: '1px solid var(--card-border)' }}>
                <div className="container">
                    <div className="badge badge-primary-subtle mb-4">
                        <Activity size={14} className="mr-2" /> {t('hero.tag')}
                    </div>
                    <h1 style={{ fontSize: '4rem', fontWeight: 950, marginBottom: '2rem' }}>
                        {t('hero.title')}
                    </h1>
                    <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '800px', lineHeight: 1.6 }}>
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

            <Footer />
        </div>
    );
}
