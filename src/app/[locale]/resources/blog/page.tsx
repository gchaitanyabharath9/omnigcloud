import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

export default async function ResourcesBlogPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('ResourcesBlog');
    const blogT = await getTranslations('Blog');

    // Explicit list of posts that have dedicated pages under /resources/blog
    const posts = [
        { id: 'modernization-guide', slug: '/resources/blog/cloud-modernization-guide' },
        { id: 'sovereignty-framework', slug: '/resources/blog/sovereignty-framework' },
        { id: 'cio-exit-strategy', slug: '/resources/blog/cio-exit-strategy' },
        { id: 'devops-practices', slug: '/resources/blog/devops-best-practices' }
    ];

    return (
        <section style={{ padding: '8rem 0', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div className="container px-4 mx-auto">
                <div style={{ maxWidth: '1000px' }}>
                    <div className="badge badge-primary-subtle mb-4" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: '2rem', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                        <BookOpen size={14} style={{ marginRight: '0.5rem' }} /> BLOG RESOURCES
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 950, marginBottom: '1.5rem', lineHeight: '1.1', color: 'white' }}>
                        {t('title')}
                    </h1>
                    <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '600px', marginBottom: '4rem', color: 'white' }}>
                        {t('subtitle')}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {posts.map((post) => (
                            <div key={post.id} className="glass-panel" style={{
                                padding: '2.5rem',
                                borderRadius: '2.5rem',
                                border: '1px solid rgba(255,255,255,0.08)',
                                background: 'rgba(255,255,255,0.02)',
                                transition: 'transform 0.3s ease',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', color: 'white' }}>
                                    {blogT(`posts.${post.id}.title`)}
                                </h3>
                                <p style={{ opacity: 0.6, fontSize: '1rem', marginBottom: '2.5rem', lineHeight: '1.6', color: 'white', flexGrow: 1 }}>
                                    {blogT(`posts.${post.id}.excerpt`)}
                                </p>
                                <Link
                                    href={`/${locale}${post.slug}`}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        fontWeight: 800,
                                        color: '#3b82f6',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}
                                >
                                    {t('viewPost')} <ArrowRight size={18} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
