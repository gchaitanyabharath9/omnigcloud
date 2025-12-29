import Link from 'next/link';
import { FileText, Download, Award, ShieldCheck } from 'lucide-react';

export default function WhitePaperSection() {
    return (
        <section id="whitepaper" className="snap-section" style={{ padding: '6rem 0', background: 'var(--bg-surface-2)', borderTop: '1px solid var(--card-border)' }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr',
                    gap: '4rem',
                    alignItems: 'center'
                }}>
                    {/* Left side: Visual Representation of Paper */}
                    <div className="glass-panel" style={{
                        padding: '3rem',
                        borderRadius: '2rem',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        background: 'linear-gradient(135deg, rgba(2, 6, 23, 0.8) 0%, rgba(59, 130, 246, 0.05) 100%)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <Award color="var(--primary)" size={32} />
                                <div style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--primary)' }}>
                                    Original Contribution of Major Significance
                                </div>
                            </div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 950, marginBottom: '1.5rem', lineHeight: '1.1' }}>
                                Autonomous Sovereign Orchestration (ASO)
                            </h2>
                            <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: 1.6, marginBottom: '2rem' }}>
                                A formal framework for AI-driven, cloud-agnostic governance. This technical publication outlines the breakthrough methodologies used in the G-Framework to eliminate vendor lock-in and restore enterprise data sovereignty.
                            </p>
                            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--foreground)', opacity: 0.6 }}>
                                    <ShieldCheck size={16} /> PEER-REVIEW READY
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--foreground)', opacity: 0.6 }}>
                                    <FileText size={16} /> 12 PAGE SCHOLARLY PAPER
                                </div>
                            </div>
                        </div>
                        {/* Decorative background icon */}
                        <FileText size={200} style={{ position: 'absolute', bottom: '-40px', right: '-40px', opacity: 0.03, transform: 'rotate(-15deg)' }} />
                    </div>

                    {/* Right side: Download & Info */}
                    <div>
                        <div className="badge badge-primary-subtle mb-4">ENGINEERING PUBLICATION</div>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>Download the Technical White Paper</h3>
                        <p style={{ opacity: 0.7, marginBottom: '2rem', lineHeight: 1.6 }}>
                            Essential reading for CIOs, Platform Architects, and Legal Counsel navigating the EU AI Act and global data residency requirements.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Link href="/docs/whitepaper" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                                <Download size={20} /> Read Online (Full Framework)
                            </Link>
                            <Link href="/docs/architecture" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                                <FileText size={20} /> View Design Patterns
                            </Link>
                            <p style={{ fontSize: '0.7rem', textAlign: 'center', opacity: 0.5 }}>
                                Published under the OmniGCloud Open-Science Initiative 2025.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
