"use client";

import Link from "next/link";
import { PlayCircle, ShieldCheck, Zap, Cloud, Cpu, Terminal, Activity, BarChart, Settings, Globe, ArrowRight, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

import { useLocale } from 'next-intl';

export default function DemoPage() {
    const locale = useLocale();

    return (
        <div className="main-content">
            <section className="snap-section" style={{ padding: '7rem 0', minHeight: '100vh' }}>
                <div className="container">
                    <div style={{ marginBottom: '2rem' }}>
                        <Link href={`/${locale}`} className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
                            <ArrowLeft size={16} /> Back to Mission Control
                        </Link>
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>Interactive Experience</div>
                        <h1 style={{ fontSize: '4rem', fontWeight: 950, letterSpacing: '-2px', marginBottom: '1.5rem' }}>The Omni<span style={{ color: 'var(--primary)' }}>G</span>Cloud Demo</h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.7, maxWidth: '800px', margin: '0 auto' }}>
                            Experience the autonomous modernization of a global enterprise portfolio. Watch as our agents discover, map, and re-platform mission-critical workloads.
                        </p>
                    </div>

                    <div className="glass-panel" style={{ borderRadius: '3rem', overflow: 'hidden', border: '1px solid var(--primary)', background: '#050a14', boxShadow: '0 0 50px rgba(96, 239, 255, 0.15)', position: 'relative' }}>
                        {/* Background Effect */}
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url(https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1600&fit=crop)', backgroundSize: 'cover', opacity: 0.05, pointerEvents: 'none' }}></div>

                        <div style={{ background: '#1e293b', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'flex', gap: '0.6rem' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                            </div>
                            <div style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 800, fontFamily: 'monospace' }}>MIGRATION_SEQUENCE_ACTIVE.log</div>
                        </div>
                        <div style={{ padding: '3rem', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', position: 'relative', zIndex: 1 }}>
                            <div style={{ fontFamily: 'monospace', fontSize: '1rem', lineHeight: 1.6, color: '#fff' }}>
                                <div style={{ color: '#60efff', marginBottom: '1rem' }}>&gt; Initializing Global discovery in EU-WEST-1...</div>
                                <div style={{ color: '#10b981' }}>&gt; [SUCCESS] 242 legacy nodes detected.</div>
                                <div style={{ color: '#60efff' }}>&gt; Running compatibility audit for OCP 4.15...</div>
                                <div style={{ color: '#10b981' }}>&gt; [SUCCESS] 98.4% compatibility confirmed.</div>
                                <div style={{ color: '#f59e0b' }}>&gt; WARNING: 4 persistent volumes require encryption re-key.</div>
                                <div style={{ color: '#60efff' }}>&gt; Executing autonomous re-keying via Vault Agent...</div>
                                <div style={{ color: '#10b981' }}>&gt; [SUCCESS] Asset re-platforming starting.</div>
                                <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ color: 'var(--primary)' }}>PROGRESS:</span>
                                    <div style={{ flex: 1, height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                                        <div style={{ width: '72%', height: '100%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
                                    </div>
                                    <span style={{ fontWeight: 800 }}>72%</span>
                                </div>
                            </div>
                            <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '2rem', border: '1px solid var(--card-border)' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Live Simulation Controls</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {[
                                        { label: "Scale Workload", icon: <Zap size={18} /> },
                                        { label: "Inject Fault", icon: <ShieldCheck size={18} /> },
                                        { label: "Switch Region", icon: <Globe size={18} /> }
                                    ].map((c, i) => (
                                        <button key={i} className="btn-secondary" style={{ justifyContent: 'flex-start', padding: '1rem 1.5rem', gap: '1rem' }}>
                                            {c.icon} {c.label}
                                        </button>
                                    ))}
                                    <button className="btn-primary" style={{ marginTop: '1rem', padding: '1.25rem' }}>Reset Simulation</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
