import { BookOpen, Code, Cpu, ShieldCheck, Zap, Search, ChevronRight, Layers, Settings, Globe, FileText, Award } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Docs' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
        keywords: ['ASO framework', 'cloud governance patterns', 'autonomous orchestration', 'scholarly whitepaper'],
    };
}

export default async function DocsPage() {
    const t = await getTranslations('Docs');

    return (
        <>
            <section className="snap-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', paddingTop: '1rem' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '3rem', paddingTop: '20px' }}>
                        {/* Sidebar */}
                        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <h4 style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>{t('sidebar.documentation')}</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {[
                                        { key: 'intro', label: t('sidebar.links.introduction'), href: '/docs' },
                                        { key: 'arch', label: t('sidebar.links.architecture'), href: '/docs/architecture' },
                                        { key: 'whitepaper', label: t('sidebar.links.whitepaper'), href: '/docs/whitepaper' },
                                        { key: 'security', label: t('sidebar.links.security'), href: '/docs/governance' }
                                    ].map(item => (
                                        <Link key={item.key} href={item.href} style={{
                                            fontSize: '0.8rem',
                                            fontWeight: 700,
                                            opacity: item.key === 'intro' ? 1 : 0.5,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.4rem',
                                            textDecoration: 'none',
                                            color: 'inherit'
                                        }}>
                                            {item.key === 'intro' && <div style={{ width: '4px', height: '4px', background: 'var(--primary)', borderRadius: '50%' }}></div>}
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>{t('sidebar.blueprints')}</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {['aws', 'azure', 'openshift', 'hybrid'].map(key => (
                                        <div key={key} style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.5, cursor: 'pointer' }}>{t(`sidebar.blueprint_links.${key}`)}</div>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Content */}
                        <main>
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                                    <Award size={20} color="var(--primary)" />
                                    <h1 style={{ fontSize: '1.75rem', fontWeight: 950, letterSpacing: '-0.5px' }}>{t('hero.title')}</h1>
                                </div>
                                <div className="badge badge-primary-subtle mb-4">{t('hero.badge')}</div>
                                <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6 }}>
                                    {t('hero.description')}
                                </p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div id="architecture" className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.25rem', scrollMarginTop: '120px' }}>
                                    <div style={{ background: 'var(--primary-glow)', padding: '0.5rem', borderRadius: '0.5rem', display: 'inline-block', marginBottom: '0.75rem' }}>
                                        <Layers size={18} color="var(--primary)" />
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.4rem' }}>{t('cards.architecture.title')}</h3>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.5rem' }}>{t('cards.architecture.exhibit')}</div>
                                    <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '1rem', lineHeight: 1.4 }}>
                                        {t('cards.architecture.description')}
                                    </p>
                                    <Link href="/docs/architecture" style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none' }}>
                                        {t('cards.architecture.cta')} <ChevronRight size={14} />
                                    </Link>
                                </div>
                                <div id="whitepaper" className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.25rem', scrollMarginTop: '120px' }}>
                                    <div style={{ background: 'var(--primary-glow)', padding: '0.5rem', borderRadius: '0.5rem', display: 'inline-block', marginBottom: '0.75rem' }}>
                                        <Award size={18} color="var(--primary)" />
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.4rem' }}>{t('cards.whitepaper.title')}</h3>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.5rem' }}>{t('cards.whitepaper.exhibit')}</div>
                                    <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '1rem', lineHeight: 1.4 }}>
                                        {t('cards.whitepaper.description')}
                                    </p>
                                    <Link href="/docs/whitepaper" style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none' }}>
                                        {t('cards.whitepaper.cta')} <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div id="guide" className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.25rem', scrollMarginTop: '120px' }}>
                                    <div style={{ background: 'var(--primary-glow)', padding: '0.5rem', borderRadius: '0.5rem', display: 'inline-block', marginBottom: '0.75rem' }}>
                                        <Zap size={18} color="var(--primary)" />
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.4rem' }}>{t('cards.guide.title')}</h3>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.5rem' }}>{t('cards.guide.exhibit')}</div>
                                    <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '1rem', lineHeight: 1.4 }}>
                                        {t('cards.guide.description')}
                                    </p>
                                    <Link href="/docs/guide" style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none' }}>
                                        {t('cards.guide.cta')} <ChevronRight size={14} />
                                    </Link>
                                </div>
                                <div id="api" className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.25rem', scrollMarginTop: '120px' }}>
                                    <div style={{ background: 'var(--primary-glow)', padding: '0.5rem', borderRadius: '0.5rem', display: 'inline-block', marginBottom: '0.75rem' }}>
                                        <Code size={18} color="var(--primary)" />
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.4rem' }}>{t('cards.api.title')}</h3>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.5rem' }}>{t('cards.api.exhibit')}</div>
                                    <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '1rem', lineHeight: 1.4 }}>
                                        {t('cards.api.description')}
                                    </p>
                                    <Link href="/docs/api" style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none' }}>
                                        {t('cards.api.cta')} <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </div>

                            <div className="glass-panel" style={{ marginTop: '1.5rem', padding: '1.5rem', borderRadius: '1.5rem', background: 'var(--primary-glow)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                    <ShieldCheck size={24} color="var(--primary)" />
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 950 }}>{t('banner.title')}</h3>
                                </div>
                                <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '1.25rem', lineHeight: 1.5 }}>
                                    {t('banner.description')}
                                </p>
                                <Link href="/docs/governance" className="btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.8rem', display: 'inline-block', textDecoration: 'none' }}>{t('banner.cta')}</Link>
                            </div>
                        </main>
                    </div>
                </div>
            </section>
            {/* SITEMAP / FOOTER SNAP SECTION */}
            <section id="sitemap" className="snap-section" style={{ minHeight: 'auto', background: 'var(--background)', borderTop: '1px solid var(--card-border)', paddingTop: '2.5rem' }}>
                <Footer />
            </section>
        </>
    );
}
