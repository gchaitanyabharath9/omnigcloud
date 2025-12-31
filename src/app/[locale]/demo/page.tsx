"use client";

import Link from "next/link";
import { PlayCircle, ShieldCheck, Zap, Cloud, Cpu, Terminal, Activity, BarChart, Settings, Globe, ArrowRight, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

import { useLocale } from 'next-intl';

export default function DemoPage() {
    const locale = useLocale();

    return (
        <>
            <section className="snap-section" style={{ minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))', display: 'flex', alignItems: 'center', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                <div className="container">

                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.75rem' }}>Interactive Experience</div>
                        <h1 style={{ fontSize: '3rem', fontWeight: 950, letterSpacing: '-1.5px', marginBottom: '1rem' }}>The Omni<span style={{ color: 'var(--primary)' }}>G</span>Cloud Demo</h1>
                        <p style={{ fontSize: '1.1rem', opacity: 0.7, maxWidth: '700px', margin: '0 auto', lineHeight: '1.4' }}>
                            Experience the autonomous modernization of a global enterprise portfolio. Watch as our agents discover, map, and re-platform mission-critical workloads.
                        </p>
                    </div>

                    <div className="glass-panel" style={{ borderRadius: '2rem', overflow: 'hidden', border: '1px solid var(--primary)', background: '#050a14', boxShadow: '0 0 50px rgba(96, 239, 255, 0.15)', position: 'relative' }}>
                        {/* Background Effect */}
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url(https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1600&fit=crop)', backgroundSize: 'cover', opacity: 0.05, pointerEvents: 'none' }}></div>

                        <div style={{ background: '#1e293b', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'flex', gap: '0.4rem' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                            </div>
                            <div style={{ color: 'var(--primary)', fontSize: '0.7rem', fontWeight: 800, fontFamily: 'monospace' }}>MIGRATION_SEQUENCE_ACTIVE.log</div>
                        </div>
                        <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '2.5rem', position: 'relative', zIndex: 1 }}>
                            <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.5, color: '#fff' }}>
                                <div style={{ color: '#60efff', marginBottom: '0.75rem' }}>&gt; Initializing Global discovery in EU-WEST-1...</div>
                                <div style={{ color: '#10b981' }}>&gt; [SUCCESS] 242 legacy nodes detected.</div>
                                <div style={{ color: '#60efff' }}>&gt; Running compatibility audit for OCP 4.15...</div>
                                <div style={{ color: '#10b981' }}>&gt; [SUCCESS] 98.4% compatibility confirmed.</div>
                                <div style={{ color: '#f59e0b' }}>&gt; WARNING: 4 persistent volumes require encryption re-key.</div>
                                <div style={{ color: '#60efff' }}>&gt; Executing autonomous re-keying via Vault Agent...</div>
                                <div style={{ color: '#10b981' }}>&gt; [SUCCESS] Asset re-platforming starting.</div>
                                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ color: 'var(--primary)', fontSize: '0.75rem' }}>PROGRESS:</span>
                                    <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                                        <div style={{ width: '72%', height: '100%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
                                    </div>
                                    <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>72%</span>
                                </div>
                            </div>
                            <div className="glass-panel" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid var(--card-border)' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1rem' }}>Live Simulation Controls</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {[
                                        { label: "Scale Workload", icon: <Zap size={14} /> },
                                        { label: "Inject Fault", icon: <ShieldCheck size={14} /> },
                                        { label: "Switch Region", icon: <Globe size={14} /> }
                                    ].map((c, i) => (
                                        <button key={i} className="btn-secondary" style={{ justifyContent: 'flex-start', padding: '0.75rem 1.25rem', gap: '0.75rem', fontSize: '0.8rem' }}>
                                            {c.icon} {c.label}
                                        </button>
                                    ))}
                                    <button className="btn-primary" style={{ marginTop: '0.5rem', padding: '0.75rem', fontSize: '0.8rem' }}>Reset Simulation</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
