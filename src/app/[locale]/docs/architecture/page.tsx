import React from 'react';
import { Award, Globe, Shield, Zap, TrendingUp, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { DocsSidebar } from "@/components/navigation/DocsSidebar";
import Footer from "@/components/Footer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata.Docs.architecture' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function PatternsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Docs.architecture' });

    const patterns = [
        {
            icon: <Globe size={40} />,
            title: t('patterns.0.title'),
            description: t('patterns.0.description'),
            explanation: t('patterns.0.explanation'),
            images: [
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=1200"
            ],
            impact: t('patterns.0.impact')
        },
        {
            icon: <Shield size={40} />,
            title: t('patterns.1.title'),
            description: t('patterns.1.description'),
            explanation: t('patterns.1.explanation'),
            images: [
                "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200"
            ],
            impact: t('patterns.1.impact')
        },
        {
            icon: <Zap size={40} />,
            title: t('patterns.2.title'),
            description: t('patterns.2.description'),
            explanation: t('patterns.2.explanation'),
            images: [
                "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200"
            ],
            impact: t('patterns.2.impact')
        },
        {
            icon: <TrendingUp size={40} />,
            title: t('patterns.3.title'),
            description: t('patterns.3.description'),
            explanation: t('patterns.3.explanation'),
            images: [
                "https://images.unsplash.com/photo-1611974714851-48206138d731?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200"
            ],
            impact: t('patterns.3.impact')
        },
        {
            icon: <RefreshCw size={40} />,
            title: t('patterns.4.title'),
            description: t('patterns.4.description'),
            explanation: t('patterns.4.explanation'),
            images: [
                "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200"
            ],
            impact: t('patterns.4.impact')
        }
    ];

    return (
        <>
            <section className="snap-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', paddingTop: '1rem' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '3rem', paddingTop: '20px' }}>
                        <DocsSidebar />

                        <main>
                            {/* HERO */}
                            <div style={{ paddingBottom: '4rem', borderBottom: '1px solid var(--card-border)' }}>
                                <div className="badge badge-primary-subtle mb-4">
                                    <Award size={14} className="mr-2" /> {t('hero.badge')}
                                </div>
                                <h1 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '2rem' }}>
                                    {t('hero.titlePart1')} <span className="text-gradient">{t('hero.titleHighlight')}</span>
                                </h1>
                                <p style={{ fontSize: '1rem', opacity: 0.8, maxWidth: '800px', lineHeight: 1.6 }}>
                                    {t('hero.description')}
                                </p>
                            </div>

                            {/* EXPANDED PATTERNS */}
                            {patterns.map((p, idx) => (
                                <div key={idx} style={{ padding: '4rem 0', borderBottom: '1px solid var(--card-border)' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '2rem' }}>
                                            <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>{p.icon}</div>
                                            <h2 style={{ fontSize: '2rem', fontWeight: 950, marginBottom: '1.5rem' }}>{p.title}</h2>
                                            <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '2rem' }}>{p.description}</p>
                                            <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '1.5rem', borderRadius: '1rem', borderLeft: '4px solid var(--primary)' }}>
                                                <p style={{ fontSize: '0.95rem', opacity: 0.7, fontStyle: 'italic', margin: 0 }}>{p.explanation}</p>
                                            </div>
                                            <div style={{ marginTop: '2rem', fontWeight: 900, fontSize: '0.75rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                                {p.impact}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div style={{ padding: '4rem 0', textAlign: 'center' }}>
                                <h2 style={{ fontSize: '2rem', fontWeight: 950, marginBottom: '2rem' }}>{t('compendium.title')}</h2>
                                <p style={{ opacity: 0.7, maxWidth: '700px', margin: '0 auto 3rem', fontSize: '1rem', lineHeight: 1.6 }}>
                                    {t('compendium.description')}
                                </p>
                                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                                    <Link href={`/${locale}/docs/whitepaper`} className="btn-primary py-3 px-8">
                                        {t('cta.whitepaper')}
                                    </Link>
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

