import { Newspaper, Rss, ArrowRight, Mic, Calendar } from "lucide-react";
import Link from "next/link";

export default function NewsroomPage() {
    return (
        <div className="snap-container">
            {/* HERO - Snap 1 */}
            <section id="news-hero" className="snap-section container">
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <div style={{ background: 'rgba(96, 239, 255, 0.1)', padding: '0.4rem 1.2rem', borderRadius: '2rem', border: '1px solid rgba(96, 239, 255, 0.3)', color: '#60efff', fontSize: '0.75rem', fontWeight: 800, width: 'fit-content', margin: '0 auto 1.5rem', letterSpacing: '0.1em' }}>2025 PRESS & MEDIA</div>
                    <h1 className="text-gradient" style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>The Intelligence Stream</h1>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.4rem', maxWidth: '850px', margin: '0 auto' }}>Tracking the pulse of <span style={{ color: '#60efff', fontWeight: 700 }}>Autonomous Sovereignty</span> and multi-cloud transformation across the global sector.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
                    {[
                        { type: 'Press Release', date: 'Dec 12, 2025', title: 'OmniGCloud Partners with Google Cloud for Sovereign Expansion', icon: <Newspaper size={40} color="#60efff" />, bg: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' },
                        { type: 'Technical Note', date: 'Nov 28, 2025', title: 'The Shift to Agentic Multi-Cloud Workflows', icon: <Mic size={40} color="#8b5cf6" />, bg: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' },
                        { type: 'Event', date: 'Nov 15, 2025', title: 'OmniGCloud at AWS re:Invent 2025 - Booth #202', icon: <Calendar size={40} color="#10b981" />, bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }
                    ].map((news, i) => (
                        <div key={i} className="glass-panel" style={{ padding: '0', borderRadius: '2rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ height: '220px', background: news.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                {news.icon}
                                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.4rem 1rem', borderRadius: '0.5rem', backdropFilter: 'blur(10px)', color: 'white', fontSize: '0.75rem', fontWeight: 800 }}>{news.type}</div>
                            </div>
                            <div style={{ padding: '2rem' }}>
                                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>{news.date}</div>
                                <h3 style={{ color: 'white', fontSize: '1.4rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '1.5rem' }}>{news.title}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60efff', fontWeight: 700, fontSize: '0.9rem' }}>READ FULL ARTICLE <ArrowRight size={16} /></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SITEMAP SNAP */}
            <section id="sitemap-news" className="snap-section" style={{ minHeight: 'auto', height: 'auto', padding: '0 !important' }}>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '5rem 0', textAlign: 'center' }}>
                    <h3 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>Media & Assets Sitemap</h3>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem' }}>Access press kits, brand guidelines, and executive bios</p>
                </div>
            </section>
        </div>
    );
}
