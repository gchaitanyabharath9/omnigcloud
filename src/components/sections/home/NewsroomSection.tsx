import Link from 'next/link';
import { Newspaper, ArrowRight, ExternalLink } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';

export default function NewsroomSection() {
    const t = useTranslations('Newsroom');
    const locale = useLocale();
    const news = [
        {
            id: 'bank',
            img: "https://images.unsplash.com/photo-1504711331083-9c895941bf81?w=900&auto=format&fit=crop&q=75"
        },
        {
            id: 'egress',
            img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=75"
        },
        {
            id: 'security',
            img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=75"
        },
        {
            id: 'integration',
            img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=75"
        }
    ];

    return (
        <section id="newsroom" className="snap-section">
            <div className="container">
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', marginBottom: '3rem' }}>
                    <div style={{ minWidth: '280px', flex: '1 0 0%' }}>
                        <div className="badge badge-primary-subtle mb-2">{t('badge')}</div>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: 950 }}>{t('title')}</h2>
                    </div>
                    <Link href={`/${locale}/blog`} style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                        {t('link')} <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid-3" style={{ gap: '1.5rem' }}>
                    {news.map((item, idx) => (
                        <div key={idx} className="glass-panel" style={{
                            borderRadius: '1.5rem',
                            border: '1px solid var(--card-border)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.3s ease'
                        }}>
                            <div style={{ height: '180px', width: '100%', position: 'relative' }}>
                                <Image
                                    src={item.img}
                                    alt={t(`news.${item.id}.title`)}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    unoptimized // Save Vercel Image Optimization usage
                                />
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                                    <span style={{ fontSize: '0.6rem', fontWeight: 900, background: 'rgba(59, 130, 246, 0.9)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '4px', backdropFilter: 'blur(10px)' }}>{t(`news.${item.id}.tag`)}</span>
                                </div>
                            </div>
                            <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', marginBottom: '0.75rem' }}>{t(`news.${item.id}.date`)}</div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, lineHeight: 1.4, marginBottom: '1rem', flexGrow: 0 }}>{t(`news.${item.id}.title`)}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1.5rem', lineHeight: 1.6, flexGrow: 1 }}>
                                    {t(`news.${item.id}.desc`)}
                                </p>
                                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 600 }}>
                                        <Newspaper size={14} /> {t(`news.${item.id}.source`)}
                                    </div>
                                    <Link href={`/${locale}/blog`} style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}>
                                        {t('cta')} <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

