import { getTranslations, getLocale } from 'next-intl/server';
import Image from 'next/image';
import { Camera, ArrowRight, Layers, Shield, Zap, Globe } from 'lucide-react';
import { Link } from '@/navigation';
import Footer from '@/components/Footer';
import { generateSEOMetadata, SEO_KEYWORDS } from '@/utils/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const tm = await getTranslations({ locale, namespace: 'Metadata.VisualLibrary' });

    return generateSEOMetadata({
        title: tm('title'),
        description: tm('description'),
        keywords: [
            ...SEO_KEYWORDS.platform,
            'architectural diagrams',
            'cloud schemas',
            'technical visualization',
            'system models',
        ],
        ogImage: `/og-images/visual-library.png`,
    }, locale);
}

export function generateStaticParams() {
    return ['en', 'es', 'fr', 'de', 'zh', 'hi', 'ja', 'ko'].map((locale) => ({ locale }));
}

export const revalidate = 86400; // Cache for 24 hours (ISR)

export default async function VisualLibraryPage() {
    const t = await getTranslations('SovereignGallery');
    const locale = await getLocale();

    const items = [
        {
            id: "control",
            icon: <Globe size={32} />,
            badge: t("control.badge"),
            images: [
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=75&w=900",
                "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=75&w=900"
            ]
        },
        {
            id: "failover",
            icon: <Zap size={32} />,
            badge: t("failover.badge"),
            images: [
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=75&w=900",
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=75&w=900"
            ]
        }
    ];

    return (
        <>
            {/* HERO */}
            <section style={{ padding: '2rem 0', background: 'var(--bg-surface-2)', borderBottom: '1px solid var(--card-border)', minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <div className="badge badge-primary-subtle mb-4">
                        <Camera size={14} className="mr-2" /> {t("badge")}
                    </div>
                    <h1 style={{ fontSize: '4rem', fontWeight: 950, marginBottom: '2rem', lineHeight: '1.05' }}>
                        {t('title')}
                    </h1>
                    <p style={{ fontSize: '1.4rem', opacity: 0.7, maxWidth: '800px', lineHeight: 1.6 }}>
                        {t('subtitle')}
                    </p>
                </div>
            </section>

            {/* GALLERY ITEMS */}
            {items.map((item, idx) => (
                <section key={item.id} id={item.id} style={{
                    padding: '4rem 0',
                    background: idx % 2 === 0 ? 'transparent' : 'var(--bg-surface-2)',
                    borderBottom: '1px solid var(--card-border)'
                }}>
                    <div className="container">
                        <div style={{ display: 'grid', gridTemplateColumns: idx % 2 === 0 ? '1.2fr 0.8fr' : '0.8fr 1.2fr', gap: '6rem', alignItems: 'center' }}>
                            {idx % 2 === 0 ? (
                                <>
                                    <div className="glass-panel" style={{ padding: '4rem', borderRadius: '3rem' }}>
                                        <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>{item.icon}</div>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                                            {item.badge}
                                        </div>
                                        <h2 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '2rem' }}>{t(`${item.id}.title`)}</h2>
                                        <p style={{ fontSize: '1.3rem', opacity: 0.8, lineHeight: 1.8, marginBottom: '3rem' }}>
                                            {t(`${item.id}.description`)}
                                        </p>
                                        <Link href="/contact" className="btn-primary" style={{ padding: '1rem 2rem' }}>
                                            {t("cta")}
                                        </Link>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                                        <div className="glass-panel" style={{ borderRadius: '2rem', overflow: 'hidden', height: '320px', border: '1px solid var(--card-border)' }}>
                                            <Image src={item.images[0]} alt="Schema A" fill style={{ objectFit: 'cover' }} />
                                            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(2, 6, 23, 0.8)', padding: '0.5rem 1rem', borderRadius: '0.75rem', fontSize: '0.7rem', fontWeight: 900 }}>{t("imageA")}</div>
                                        </div>
                                        <div className="glass-panel" style={{ borderRadius: '2rem', overflow: 'hidden', height: '320px', border: '1px solid var(--card-border)' }}>
                                            <Image src={item.images[1]} alt="Schema B" fill style={{ objectFit: 'cover' }} />
                                            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(2, 6, 23, 0.8)', padding: '0.5rem 1rem', borderRadius: '0.75rem', fontSize: '0.7rem', fontWeight: 900 }}>{t("imageB")}</div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                                        <div className="glass-panel" style={{ borderRadius: '2rem', overflow: 'hidden', height: '320px', border: '1px solid var(--card-border)' }}>
                                            <Image src={item.images[0]} alt="Schema A" fill style={{ objectFit: 'cover' }} unoptimized />
                                            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(2, 6, 23, 0.8)', padding: '0.5rem 1rem', borderRadius: '0.75rem', fontSize: '0.7rem', fontWeight: 900 }}>{t("imageA")}</div>
                                        </div>
                                        <div className="glass-panel" style={{ borderRadius: '2rem', overflow: 'hidden', height: '320px', border: '1px solid var(--card-border)' }}>
                                            <Image src={item.images[1]} alt="Schema B" fill style={{ objectFit: 'cover' }} unoptimized />
                                            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(2, 6, 23, 0.8)', padding: '0.5rem 1rem', borderRadius: '0.75rem', fontSize: '0.7rem', fontWeight: 900 }}>{t("imageB")}</div>
                                        </div>
                                    </div>
                                    <div className="glass-panel" style={{ padding: '4rem', borderRadius: '3rem' }}>
                                        <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>{item.icon}</div>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                                            {item.badge}
                                        </div>
                                        <h2 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '2rem' }}>{t(`${item.id}.title`)}</h2>
                                        <p style={{ fontSize: '1.3rem', opacity: 0.8, lineHeight: 1.8, marginBottom: '3rem' }}>
                                            {t(`${item.id}.description`)}
                                        </p>
                                        <Link href="/contact" className="btn-primary" style={{ padding: '1rem 2rem' }}>
                                            {t("cta")}
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section >
            ))
            }

            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)', borderTop: '1px solid var(--card-border)' }}>
                <Footer />
            </section>
        </>
    );
}
