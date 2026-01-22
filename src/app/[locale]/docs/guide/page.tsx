import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata.Docs.guide' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function GuidePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Docs.guide' });

    return (
        <>
            <section className="snap-section" style={{ minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <div style={{ marginBottom: '2rem' }}></div>
                    <h1 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '2rem' }}>{t('hero.title')}</h1>
                    <div className="glass-panel" style={{ padding: '3rem', borderRadius: '2rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>{t('hero.step1.title')}</h3>
                        <p style={{ opacity: 0.7, marginBottom: '1.5rem', lineHeight: 1.6 }}>
                            {t('hero.step1.description')}
                        </p>
                        <div style={{ background: '#050a14', padding: '1.5rem', borderRadius: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '2rem' }}>
                            {t('hero.step1.code.install')} <br />
                            {t('hero.step1.code.login')}
                        </div>

                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>{t('hero.step2.title')}</h3>
                        <p style={{ opacity: 0.7, marginBottom: '1.5rem', lineHeight: 1.6 }}>
                            {t('hero.step2.description')}
                        </p>
                        <button className="btn-primary">{t('hero.cta')}</button>
                    </div>
                </div>
            </section>
            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </section>
        </>
    );
}
