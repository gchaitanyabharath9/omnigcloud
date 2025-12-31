import React from 'react';
import { Github, Users, Star, GitFork, MessageSquare, Terminal, Code, Award } from 'lucide-react';
import Link from 'next/link';

export default function CommunityPage() {
    return (
        <>
            {/* HERO SECTION */}
            <section style={{
                padding: '2rem 0',
                background: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.08), transparent 40%)',
                position: 'relative',
                minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))',
                display: 'flex',
                alignItems: 'center'
            }}>
                <div className="container">
                    <div style={{ maxWidth: '800px' }}>
                        <div className="badge badge-primary-subtle mb-4">OPEN SCIENCE & COMMUNITY</div>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 950, marginBottom: '1.5rem', lineHeight: '1.1' }}>
                            The G-Framework <br /><span style={{ color: 'var(--primary)' }}>Open Source Core</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '2.5rem' }}>
                            Join a global community of platform engineers, security researchers, and sovereign organizations building the future of cloud-agnostic infrastructure.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link href="https://github.com/omnigcloud" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Github size={20} /> View on GitHub
                            </Link>
                            <Link href="/docs/contributing" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Code size={20} /> Build a Plugin
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTRIBUTION GRAPH SIMULATION */}
            <section style={{ padding: '4rem 0', background: 'var(--bg-surface-1)' }}>
                <div className="container">
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.5rem', border: '1px solid var(--card-border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Community Velocity</h3>
                                <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Year-to-date framework contributions</p>
                            </div>
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--primary)' }}>4.2k</div>
                                    <div style={{ fontSize: '0.6rem', fontWeight: 700, opacity: 0.5 }}>STARS</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#10b981' }}>850+</div>
                                    <div style={{ fontSize: '0.6rem', fontWeight: 700, opacity: 0.5 }}>FORKS</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#f59e0b' }}>120+</div>
                                    <div style={{ fontSize: '0.6rem', fontWeight: 700, opacity: 0.5 }}>CONTRIBUTORS</div>
                                </div>
                            </div>
                        </div>

                        {/* Simulation of GitHub contribution grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(53, 1fr)', gap: '4px', height: '100px' }}>
                            {Array.from({ length: 53 * 7 }).map((_, i) => (
                                <div key={i} style={{
                                    background: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'var(--primary)' : '#10b981') : 'rgba(255,255,255,0.05)',
                                    borderRadius: '2px',
                                    width: '100%',
                                    height: '100%',
                                    opacity: Math.random() > 0.5 ? 0.8 : 0.4
                                }}></div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem', gap: '0.5rem', fontSize: '0.65rem', color: 'var(--muted)' }}>
                            <span>Less</span>
                            <div style={{ width: '10px', height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}></div>
                            <div style={{ width: '10px', height: '10px', background: 'rgba(59, 130, 246, 0.3)', borderRadius: '2px' }}></div>
                            <div style={{ width: '10px', height: '10px', background: 'rgba(59, 130, 246, 0.6)', borderRadius: '2px' }}></div>
                            <div style={{ width: '10px', height: '10px', background: 'var(--primary)', borderRadius: '2px' }}></div>
                            <span>More</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* GETTING STARTED / CLI SECTION */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <div className="badge badge-success-subtle mb-4">DEVELOPER FIRST</div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Install the G-Framework CLI</h2>
                            <p style={{ opacity: 0.8, marginBottom: '2rem', lineHeight: 1.6 }}>
                                Bring autonomous orchestration to your local workstation. The G-CLI allows you to audit infrastructure, detect drift, and generate sovereign multi-cloud manifests in seconds.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 600 }}>
                                    <Terminal size={18} color="var(--primary)" /> Full support for AWS, Azure, OCI, and OCP.
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 600 }}>
                                    <Code size={18} color="var(--primary)" /> Extensible plugin architecture with TypeScript.
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 600 }}>
                                    <Award size={18} color="var(--primary)" /> SOC2 and GDPR audit templates included.
                                </li>
                            </ul>
                        </div>
                        <div className="glass-panel" style={{ padding: '2rem', background: '#020617', border: '1px solid var(--card-border)', borderRadius: '1.5rem', fontFamily: 'monospace' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffdb2d' }}></div>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                            </div>
                            <div style={{ color: '#94a3b8' }}># Install the core engine</div>
                            <div style={{ marginBottom: '1rem' }}><span style={{ color: '#31c7e2' }}>npm install</span> -g @omnig/cli</div>

                            <div style={{ color: '#94a3b8' }}># Initialize a sovereign zone</div>
                            <div style={{ marginBottom: '1rem' }}><span style={{ color: '#a78bfa' }}>omnig</span> init --sovereign us-east</div>

                            <div style={{ color: '#94a3b8' }}># Audit infrastructure for drift</div>
                            <div style={{ marginBottom: '1rem' }}><span style={{ color: '#a78bfa' }}>omnig</span> audit --drift-only</div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.8rem' }}>
                                <span style={{ color: '#10b981' }}>✓ Audit Complete (0 Drift)</span>
                                <span style={{ opacity: 0.4 }}>450ms</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMMUNITY LINKS */}
            <section style={{ padding: '4rem 0', background: 'var(--bg-surface-2)', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '3rem' }}>Join the Global Network</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                        {[
                            { icon: <MessageSquare size={24} />, name: "Discord", text: "8.4k members", color: "#5865F2" },
                            { icon: <Github size={24} />, name: "GitHub", text: "Open Source Core", color: "var(--foreground)" },
                            { icon: <Users size={24} />, name: "Advisory Board", text: "Industry Experts", color: "var(--primary)" },
                            { icon: <Code size={24} />, name: "Package Registry", text: "200+ Plugins", color: "#10b981" }
                        ].map((item, i) => (
                            <div key={i} className="glass-panel" style={{ padding: '2rem', borderRadius: '1.25rem', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ color: item.color }}>{item.icon}</div>
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{item.name}</div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{item.text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
