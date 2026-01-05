"use client";

import Footer from "@/components/Footer";

import { Users, Globe, Target, Award, Briefcase, MapPin, Newspaper, Mail, Phone, ExternalLink } from "lucide-react";

export default function CompanyPage() {
    return (
        <div className="snap-container">
            {/* ABOUT HERO - Snap 1 */}
            <section id="about" className="snap-section container" style={{ paddingTop: 'var(--section-pt)' }}>

                <div style={{ position: 'relative', borderRadius: '2rem', overflow: 'hidden', height: '450px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&fit=crop&q=80" alt="OmniGCloud Office" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 100%)', padding: '1.5rem', textAlign: 'center' }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            background: 'var(--primary-glow)',
                            padding: '0.4rem 1rem',
                            borderRadius: '2rem',
                            border: '1px solid var(--primary)',
                            color: 'var(--primary)',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            marginBottom: '2rem',
                            textTransform: 'uppercase'
                        }}>
                            OmniGCloud Global
                        </div>
                        <h1 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1, background: 'linear-gradient(135deg, var(--foreground) 0%, var(--primary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Engineering the <br />Cloud-Agnostic Future</h1>
                        <p style={{ fontSize: '1.3rem', color: 'var(--foreground)', opacity: 0.8, maxWidth: '900px', lineHeight: 1.6 }}>
                            A team of systems architects, AI engineers, and cloud pioneers dedicated to restoring <span style={{ color: 'var(--primary)', fontWeight: 800 }}>Enterprise Sovereignty</span> through autonomous modernization.
                        </p>
                    </div>
                </div>
            </section>

            {/* LEADERSHIP - Snap 2 */}
            <section id="leadership" className="snap-section container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 900 }}>Executive Leadership</h2>
                    <p style={{ color: 'var(--foreground)', opacity: 0.6 }}>Visionaries defining the next era of sovereign cloud.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem', maxWidth: '1000px', margin: '0 auto' }}>
                    {[
                        {
                            name: "Jyothsna Devi Gopu",
                            role: "Founder & Chief Executive Officer",
                            bio: "Leading the strategic vision and global market direction. Jyothsna provides the foundational enterprise strategy required to steer the company towards becoming a global standard in sovereign cloud orchestration.",
                            placeholder: "Founder portrait coming soon"
                        },
                        {
                            name: "Chaitanya Bharath Gopu",
                            role: "Founder & Chief Technology Officer",
                            bio: "Distinguished Platform Architect providing the high-level technical direction for the G-Framework. Chaitanya defines the architectural standards and innovation roadmap that power the platform's autonomous capabilities.",
                            placeholder: "Leadership profile image to be added"
                        }
                    ].map((leader, i) => (
                        <div key={i} className="glass-panel" style={{ padding: '0', borderRadius: '2rem', overflow: 'hidden' }}>
                            <div style={{ height: '350px', width: '100%', overflow: 'hidden', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ textAlign: 'center', opacity: 0.5, padding: '2rem' }}>
                                    <Users size={48} className="mx-auto mb-3" />
                                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{leader.placeholder}</div>
                                </div>
                            </div>
                            <div style={{ padding: '2.5rem' }}>
                                <div style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>{leader.role}</div>
                                <h4 style={{ marginBottom: '1rem', fontSize: '1.8rem', fontWeight: 800 }}>{leader.name}</h4>
                                <p style={{ fontSize: '1rem', opacity: 0.7, lineHeight: 1.6 }}>{leader.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* GLOBAL OPERATIONS - Snap 3 */}
            <section id="global-operations" className="snap-section container">
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', alignItems: 'center' }}>
                    <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '3.5rem', position: 'relative', overflow: 'hidden' }}>
                        {/* Background Image Addition */}
                        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&fit=crop" alt="Global Operations" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.1 }} />

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <Globe size={40} color="var(--primary)" />
                                <h2 style={{ fontSize: '3rem', fontWeight: 900 }}>Global Ops</h2>
                            </div>
                            <p style={{ fontSize: '1.2rem', color: 'var(--foreground)', opacity: 0.7, lineHeight: 1.8, marginBottom: '1.5rem' }}>
                                Headquartered in Florida with a distributed network of enterprise architects supporting mission-critical infrastructure modernizations globally.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} color="var(--primary)" /> Corporate Headquarters</div>
                                    <div style={{ opacity: 0.7, fontSize: '0.9rem', lineHeight: 1.6 }}>
                                        3354 Jasmine Hill Rd<br />
                                        Tallahassee, Florida 32311<br />
                                        United States
                                    </div>
                                    <div style={{ marginTop: '1rem', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={16} color="var(--primary)" /> +1 (850) 443-1481</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEWSROOM - Snap 4 */}
            <section id="newsroom" className="snap-section container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <Newspaper size={40} color="var(--primary)" />
                    <h2 style={{ fontSize: '3rem', fontWeight: 900 }}>Global Newsroom</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                    {[
                        { title: "OmniGCloud Awarded 'Sovereign Provider of the Year'", date: "May 12, 2025", desc: "Recognized for breakthroughs in automated cloud re-platforming." },
                        { title: "Strategic Partnership with NeoCloud GPU", date: "April 28, 2025", desc: "Expanding high-density compute for agentic AI workloads." },
                        { title: "New AI Control Plane Released", date: "March 15, 2025", desc: "Unifying LLM orchestration with infrastructure-as-code." }
                    ].map((news, i) => (
                        <div key={i} className="glass-panel" style={{ padding: '2.5rem', borderRadius: '2rem' }}>
                            <div style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 800, marginBottom: '1rem' }}>{news.date}</div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>{news.title}</h4>
                            <p style={{ fontSize: '0.85rem', opacity: 0.6, marginBottom: '1.5rem' }}>{news.desc}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
                                Read Article <ExternalLink size={14} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* EXECUTIVE OFFICE - Snap 5 */}
            <section id="executive-office" className="snap-section container">
                <div className="glass-panel" style={{ padding: '5rem', borderRadius: '4rem', textAlign: 'center', background: 'var(--primary-glow)' }}>
                    <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Contact Chief Executive Office</h2>
                    <p style={{ fontSize: '1.2rem', opacity: 0.7, maxWidth: '700px', margin: '0 auto 3rem' }}>
                        Strategic inquiries, partnership proposals, and global modernization roadmaps.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ background: 'var(--primary)', color: 'var(--background)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}><Mail size={24} /></div>
                            <div style={{ fontWeight: 800 }}>omnigcloud@gmail.com</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ background: 'var(--primary)', color: 'var(--background)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}><Phone size={24} /></div>
                            <div style={{ fontWeight: 800 }}>+1 (850) 443-1481</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SITEMAP SNAP */}
            <section id="sitemap" className="snap-section" style={{ background: 'var(--background)' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>Global Corporate Sitemap</div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Company <span style={{ opacity: 0.3 }}>Directory</span></h2>
                    </div>
                </div>
                <Footer />
            </section>
        </div>
    );
}
