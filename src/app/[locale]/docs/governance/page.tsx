import { Download } from "lucide-react";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";
import { Metadata } from 'next';
import { DocsSidebar } from "@/components/navigation/DocsSidebar";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata.Docs.governance' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function GovernanceDocsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Docs.governance' });

    const blueprintIds = ['aws', 'azure', 'openshift', 'hybrid'];

    return (
        <>
            <section className="snap-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', paddingTop: '1rem' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '3rem', paddingTop: '20px' }}>
                        <DocsSidebar />

                        <main id="governance">
                            <h1 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '2rem' }}>{t('hero.title')}</h1>
                            <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '2rem' }}>
                                <p style={{ opacity: 0.7, marginBottom: '2.5rem', lineHeight: 1.6, fontSize: '1.1rem' }}>
                                    {t('hero.description')}
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                                    {[0, 1, 2, 3].map((i) => (
                                        <div key={i} id={blueprintIds[i]} className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', background: 'rgba(255,255,255,0.02)', scrollMarginTop: '120px' }}>
                                            <h4 style={{ fontWeight: 900, marginBottom: '0.75rem' }}>{t(`blueprints.${i}.title`)}</h4>
                                            <p style={{ fontSize: '0.85rem', opacity: 0.5, marginBottom: '1.25rem' }}>{t(`blueprints.${i}.desc`)}</p>
                                            <button style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Download size={14} /> {t('download')}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>

            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)', paddingTop: '2.5rem' }}>
                <Footer />
            </section>
        </>
    );
}

