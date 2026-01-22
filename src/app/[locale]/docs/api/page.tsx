import Link from "next/link";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";
import type { Metadata } from 'next';
import { generateSEOMetadata, SEO_KEYWORDS } from '@/utils/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Docs.api' });
    return generateSEOMetadata({
        title: t('title'),
        description: t('description'),
        keywords: [...SEO_KEYWORDS.modernization, ...t.raw('keywords')],
        canonical: `https://www.omnigcloud.com/${locale}/docs/api`,
    }, locale);
}

export default async function ApiPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('Docs.api');

    return (
        <>
            <section className="snap-section" style={{ minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))', display: 'flex', alignItems: 'center', background: 'var(--background)' }}>
                <div className="container">
                    <div style={{ marginBottom: '2rem' }}></div>
                    <h1 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '2rem' }}>{t('title')}</h1>
                    <div className="glass-panel" style={{ padding: '3rem', borderRadius: '2rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>{t('versionLabel')}</h3>
                        <p style={{ opacity: 0.7, marginBottom: '2rem', lineHeight: 1.6 }}>
                            {t('description')}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                { method: "GET", path: "/v1/discovery/assets", desc: t('endpoints.discovery.desc') },
                                { method: "POST", path: "/v1/modernization/deploy", desc: t('endpoints.modernization.desc') },
                                { method: "GET", path: "/v1/governance/drift", desc: t('endpoints.governance.desc') }
                            ].map((api, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
                                    <span style={{ fontWeight: 900, color: 'var(--primary)', fontSize: '0.8rem', background: 'var(--primary-glow)', padding: '0.2rem 0.5rem', borderRadius: '0.4rem' }}>{api.method}</span>
                                    <span style={{ fontWeight: 800, fontFamily: 'monospace', fontSize: '0.9rem' }}>{api.path}</span>
                                    <span style={{ opacity: 0.5, fontSize: '0.85rem' }}>{api.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </section>
        </>
    );
}
