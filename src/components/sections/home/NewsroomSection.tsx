import Link from 'next/link';
import { Newspaper, ArrowRight, ExternalLink } from 'lucide-react';

export default function NewsroomSection() {
    const news = [
        {
            date: "Dec 12, 2025",
            source: "OmniG Intelligence",
            title: "Scaling ASO across 2.5PB of cross-border data for Tier-1 Banks.",
            tag: "CASE STUDY",
            img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80"
        },
        {
            date: "Nov 28, 2025",
            source: "Cloud Sovereign Report",
            title: "How Autonomous Sovereign Orchestration reduces Egress Fees by 40%.",
            tag: "RESEARCH",
            img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80"
        },
        {
            date: "Nov 15, 2025",
            source: "Global Press Wire",
            title: "Universal integration for Oracle OKE and RedHat OpenShift announced.",
            tag: "PRODUCT",
            img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80"
        }
    ];

    return (
        <section id="newsroom" className="snap-section" style={{ padding: '6rem 0', background: 'var(--background)' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                    <div>
                        <div className="badge badge-primary-subtle mb-2">SOVEREIGN INSIGHTS</div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 950 }}>Latest from the Lab</h2>
                    </div>
                    <Link href="/blog" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                        ENTER THE IMPACT HUB <ArrowRight size={16} />
                    </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
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
                                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                                    <span style={{ fontSize: '0.6rem', fontWeight: 900, background: 'rgba(59, 130, 246, 0.9)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '4px', backdropFilter: 'blur(10px)' }}>{item.tag}</span>
                                </div>
                            </div>
                            <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', marginBottom: '0.75rem' }}>{item.date}</div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, lineHeight: 1.4, marginBottom: '1.5rem', flexGrow: 1 }}>{item.title}</h4>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 600 }}>
                                    <Newspaper size={14} /> {item.source}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

