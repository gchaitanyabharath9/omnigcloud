import Link from 'next/link';
import { Github, Users, Terminal, Code } from 'lucide-react';

export default function CommunityCallout() {
    return (
        <section id="community-callout" className="snap-section" style={{ padding: '6rem 0', background: 'var(--bg-surface-2)', borderTop: '1px solid var(--card-border)' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <div className="badge badge-success-subtle mb-4">OPEN SCIENCE INITIATIVE</div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Built by Experts, <br />Governed by the Community</h2>
                        <p style={{ opacity: 0.8, marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                            The G-Framework is more than a platform—it's an open standard for sovereign infrastructure. Join 120+ global contributors building a resilient, provider-agnostic future.
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                <Link href="/community" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Users size={18} /> Join the Community
                                </Link>
                                <Link href="https://github.com/omnigcloud" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Github size={18} /> Contribute to Core
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '1.5rem', border: '1px solid var(--card-border)', background: 'rgba(2, 6, 23, 0.4)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                    <Terminal size={24} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Sovereign CLI v4.2</div>
                                    <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>npm install -g @omnig/cli</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                                    <Code size={24} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>200+ Plugins</div>
                                    <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>Extensible provider architecture</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                                    <Users size={24} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Global Maintainers</div>
                                    <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>Sovereign-first review process</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
