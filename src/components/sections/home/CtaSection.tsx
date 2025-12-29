import Link from 'next/link';
import Footer from '@/components/Footer';
import { useLocale, useTranslations } from 'next-intl';

export default function CtaSection() {
    const locale = useLocale();
    const t = useTranslations('HomeSections.Cta');
    return (
        <section className="snap-section">
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '2rem', paddingBottom: '1rem', textAlign: 'center' }}>
                <div className="container">
                    <div className="card-cta">
                        <h2 className="mb-3">{t('title')}</h2>
                        <p className="text-section-lead mb-6">
                            {t('subtitle')}
                        </p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <Link href={`/${locale}/onboarding`} className="btn-primary" style={{ padding: '0.75rem 2.5rem', fontSize: '0.95rem', borderRadius: '0.75rem' }}>
                                {t('primary')}
                            </Link>
                            <Link href={`/${locale}/contact`} className="btn-secondary" style={{ padding: '0.75rem 2.5rem', fontSize: '0.95rem', borderRadius: '0.75rem' }}>
                                {t('secondary')}
                            </Link>
                        </div>
                        <div className="mt-10 text-sm opacity-60 font-bold tracking-wider">
                            {t('disclaimer')}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer sits at the bottom of the last snap section */}
            <div id="sitemap" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)', paddingTop: '1.5rem' }}>
                <Footer />
            </div>
        </section>
    );
}
