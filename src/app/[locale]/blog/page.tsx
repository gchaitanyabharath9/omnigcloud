import { useTranslations } from 'next-intl';
import { Calendar, ArrowRight, Share2, Bookmark, Search, Filter, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function BlogPage() {
    const t = useTranslations('Blog');

    const posts = [
        { id: 'aso', date: "Dec 15, 2025", readTime: "25 min read", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" },
        { id: 'prompt', date: "Dec 10, 2025", readTime: "15 min read", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" },
        { id: 'latency', date: "Dec 05, 2025", readTime: "10 min read", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
        { id: 'rag', date: "Nov 30, 2025", readTime: "20 min read", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800" },
        { id: 'bench', date: "Nov 25, 2025", readTime: "12 min read", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" }
    ];

    return (
        <>
            {/* HERO */}
            <section style={{ padding: '2rem 0', background: 'var(--bg-surface-2)', borderBottom: '1px solid var(--card-border)', minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                        <div>
                            <div className="badge badge-primary-subtle mb-4">
                                <BookOpen size={14} className="mr-2" /> {t('hero.tag')}
                            </div>
                            <h1 style={{ fontSize: '3.5rem', fontWeight: 950, marginBottom: '1.5rem', lineHeight: '1.1' }}>
                                {t('hero.title')}
                            </h1>
                            <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '600px' }}>
                                {t('hero.subtitle')}
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div className="glass-panel" style={{ padding: '0.75rem 1.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Search size={18} opacity={0.5} />
                                <span style={{ opacity: 0.5 }}>{t('hero.search')}</span>
                            </div>
                            <div className="glass-panel" style={{ padding: '0.75rem 1.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Filter size={18} />
                                <span>Filter</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOG GRID */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem' }}>
                        {posts.map((post, idx) => (
                            <div key={idx} className="glass-panel h-full" style={{
                                borderRadius: '2.5rem',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                border: '1px solid var(--card-border)'
                            }}>
                                <div style={{ height: '300px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                                    <img src={post.image} alt={t(`posts.${post.id}.title`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
                                        <span className="badge" style={{ background: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(10px)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            {t(`posts.${post.id}.category`)}
                                        </span>
                                    </div>
                                    <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                                        <div className="glass-panel" style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(2,6,23,0.5)' }}>
                                            <Bookmark size={16} />
                                        </div>
                                        <div className="glass-panel" style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(2,6,23,0.5)' }}>
                                            <Share2 size={16} />
                                        </div>
                                    </div>
                                </div>
                                <div style={{ padding: '2.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', fontSize: '0.8rem', opacity: 0.5 }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={14} /> {post.date}</span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '1rem', lineHeight: '1.2' }}>{t(`posts.${post.id}.title`)}</h3>
                                    <p style={{ opacity: 0.7, marginBottom: '2rem', lineHeight: 1.6 }}>{t(`posts.${post.id}.excerpt`)}</p>

                                    <div style={{
                                        marginTop: 'auto',
                                        paddingTop: '2rem',
                                        borderTop: '1px solid var(--card-border)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '10px' }}>OG</div>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{t(`posts.${post.id}.author`)}</span>
                                        </div>
                                        <Link href={`/blog/${idx}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: 'var(--primary)', fontSize: '0.9rem' }}>
                                            Read More <ArrowRight size={16} />
                                        </Link>
                                    </div>

                                    <div style={{ marginTop: '1.5rem', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.1em' }}>
                                        {t(`posts.${post.id}.impact`)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEWSLETTER */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div className="glass-panel" style={{ padding: '4rem', borderRadius: '3rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '1rem' }}>{t('newsletter.title')}</h2>
                        <p style={{ opacity: 0.7, marginBottom: '2.5rem' }}>{t('newsletter.subtitle')}</p>
                        <form style={{ display: 'flex', gap: '1rem', justifyContent: 'center', maxWidth: '500px', margin: '0 auto' }}>
                            <input type="email" placeholder={t('newsletter.placeholder')} className="glass-panel" style={{ flexGrow: 1, padding: '1rem 1.5rem', borderRadius: '1rem', border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.05)' }} />
                            <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>{t('newsletter.button')}</button>
                        </form>
                        <p style={{ fontSize: '0.7rem', opacity: 0.4, marginTop: '1.5rem' }}>{t('newsletter.footer')}</p>
                    </div>
                </div>
            </section>
        </>
    );
}
