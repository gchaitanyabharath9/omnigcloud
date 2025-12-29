"use client";

import { BookOpen, Code, Cpu, ShieldCheck, Zap, Search, ChevronRight, Layers, Settings, Globe, FileText, Award } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function DocsPage() {
    return (
        <div className="main-content">
            <section className="snap-section" style={{ minHeight: '80vh' }}>
                <div className="container">
                    <div style={{ marginBottom: '1rem', paddingTop: '2rem' }}></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '3rem', paddingTop: '80px' }}>
                        {/* Sidebar */}
                        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <h4 style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Documentation</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {[
                                        { label: 'Introduction', href: '/docs' },
                                        { label: 'Architecture', href: '/docs/architecture' },
                                        { label: 'White Paper', href: '/docs/whitepaper' },
                                        { label: 'Security Model', href: '/docs/governance' }
                                    ].map(item => (
                                        <Link key={item.label} href={item.href} style={{
                                            fontSize: '0.8rem',
                                            fontWeight: 700,
                                            opacity: item.label === 'Introduction' ? 1 : 0.5,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.4rem',
                                            textDecoration: 'none',
                                            color: 'inherit'
                                        }}>
                                            {item.label === 'Introduction' && <div style={{ width: '4px', height: '4px', background: 'var(--primary)', borderRadius: '50%' }}></div>}
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Blueprints</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {['AWS Modernization', 'Azure Sovereign Hub', 'OpenShift on GCP', 'Hybrid Mesh'].map(item => (
                                        <div key={item} style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.5, cursor: 'pointer' }}>{item}</div>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Content */}
                        <main>
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                                    <BookOpen size={20} color="var(--primary)" />
                                    <h1 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.5px' }}>Documentation Hub</h1>
                                </div>
                                <p style={{ fontSize: '0.8rem', opacity: 0.7, lineHeight: 1.4 }}>
                                    Technical portal for OmniGCloud. Guides for designing, deploying, and governing multi-cloud infrastructure through architectural excellence.
                                </p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.25rem' }}>
                                    <div style={{ background: 'var(--primary-glow)', padding: '0.5rem', borderRadius: '0.5rem', display: 'inline-block', marginBottom: '0.75rem' }}>
                                        <Layers size={18} color="var(--primary)" />
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.4rem' }}>Design Patterns</h3>
                                    <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '1rem', lineHeight: 1.4 }}>
                                        Sovereign patterns for EB-1A scholarly evidence.
                                    </p>
                                    <Link href="/docs/architecture" style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none' }}>
                                        View Patterns <ChevronRight size={14} />
                                    </Link>
                                </div>
                                <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.25rem' }}>
                                    <div style={{ background: 'var(--primary-glow)', padding: '0.5rem', borderRadius: '0.5rem', display: 'inline-block', marginBottom: '0.75rem' }}>
                                        <Award size={18} color="var(--primary)" />
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.4rem' }}>Scholarly White Paper</h3>
                                    <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '1rem', lineHeight: 1.4 }}>
                                        Autonomous Sovereign Orchestration (ASO) formalization.
                                    </p>
                                    <Link href="/docs/whitepaper" style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none' }}>
                                        Read Paper <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.25rem' }}>
                                    <div style={{ background: 'var(--primary-glow)', padding: '0.5rem', borderRadius: '0.5rem', display: 'inline-block', marginBottom: '0.75rem' }}>
                                        <Zap size={18} color="var(--primary)" />
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.4rem' }}>Quick Start Guide</h3>
                                    <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '1rem', lineHeight: 1.4 }}>
                                        Get up and running with OmniGCloud in under 15 minutes.
                                    </p>
                                    <Link href="/docs/guide" style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none' }}>
                                        Read Guide <ChevronRight size={14} />
                                    </Link>
                                </div>
                                <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1.25rem' }}>
                                    <div style={{ background: 'var(--primary-glow)', padding: '0.5rem', borderRadius: '0.5rem', display: 'inline-block', marginBottom: '0.75rem' }}>
                                        <Code size={18} color="var(--primary)" />
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.4rem' }}>API Reference</h3>
                                    <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '1rem', lineHeight: 1.4 }}>
                                        Full documentation for our REST and GraphQL APIs.
                                    </p>
                                    <Link href="/docs/api" style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'none' }}>
                                        View API Docs <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </div>

                            <div className="glass-panel" style={{ marginTop: '1.5rem', padding: '1.5rem', borderRadius: '1.5rem', background: 'var(--primary-glow)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                    <ShieldCheck size={24} color="var(--primary)" />
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 950 }}>Governance Blueprints</h3>
                                </div>
                                <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '1.25rem', lineHeight: 1.5 }}>
                                    Pre-configured compliance blueprints for SOC 2, HIPAA, and GDPR with automated drift remediation.
                                </p>
                                <Link href="/docs/governance" className="btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.8rem', display: 'inline-block', textDecoration: 'none' }}>Explore Blueprints</Link>
                            </div>
                        </main>
                    </div>
                </div>
            </section>
            {/* SITEMAP / FOOTER SNAP SECTION */}
            <section id="sitemap" className="snap-section" style={{ minHeight: 'auto', background: 'var(--background)', borderTop: '1px solid var(--card-border)', paddingTop: '2.5rem' }}>
                <Footer />
            </section>
        </div>
    );
}
